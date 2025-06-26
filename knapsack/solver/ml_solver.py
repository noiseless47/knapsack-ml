import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
from typing import List, Dict, Tuple
from knapsack.train_model import KnapsackMLModel
import time
import warnings
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class MLKnapsackSolver:
    def __init__(self, model_path: str = 'knapsack/models/rf_model.pkl'):
        """Initialize the ML-based knapsack solver.
        
        Args:
            model_path: Path to the trained model file
        """
        # Import DP solver first to avoid circular imports
        from knapsack.solver.traditional_solver import DPKnapsackSolver, GreedyKnapsackSolver
        self.dp_solver = DPKnapsackSolver()
        self.greedy_solver = GreedyKnapsackSolver()
        self.model = None
        self.max_items = 50  # Maximum number of items to consider, must match the model's max_items
        
        # Try to load the ML model, but gracefully handle errors
        try:
            with warnings.catch_warnings():
                warnings.filterwarnings("ignore", category=UserWarning)
                self.model = KnapsackMLModel.load(model_path)
                logger.info("ML model loaded successfully")
        except Exception as e:
            logger.warning(f"Failed to load ML model: {str(e)}. Will fall back to traditional solvers.")
            self.model = None
    
    def solve(self, weights: List[float], values: List[float], capacity: float) -> Dict:
        """Solve a knapsack instance using the ML model or fallback solvers if ML model loading failed.
        
        Args:
            weights: List of item weights
            values: List of item values
            capacity: Knapsack capacity
            
        Returns:
            Dictionary containing solution details
        """
        start_time = time.time()
        
        # If ML model failed to load or for small problems, use traditional solvers
        if self.model is None or len(weights) <= 15:
            # For small problems, DP is fast and optimal
            if len(weights) <= 30:  # Increased threshold for DP solver
                try:
                    dp_solution = self.dp_solver.solve(weights, values, capacity)
                    dp_solution['solve_time'] = time.time() - start_time
                    return dp_solution
                except Exception as e:
                    logger.warning(f"DP solver failed: {str(e)}. Falling back to greedy.")
            
            # If DP fails or problem is too large, use greedy
            greedy_solution = self.greedy_solver.solve(weights, values, capacity)
            greedy_solution['solve_time'] = time.time() - start_time
            return greedy_solution

        try:
            # Convert inputs to numpy arrays
            weights = np.array(weights)
            values = np.array(values)
            n_items = len(weights)
            
            # Calculate value/weight ratios
            value_weight_ratios = values / weights
            sorted_ratios = np.sort(value_weight_ratios)[::-1]  # Sort descending
            
            # Pad arrays to max_items
            padded_weights = np.pad(weights, (0, self.max_items - len(weights)), 'constant')
            padded_values = np.pad(values, (0, self.max_items - len(values)), 'constant')
            
            # Safely handle top k ratios when n_items < 5
            n_ratios = min(n_items, 5)  # Use at most 5 or as many as available
            best_ratios = sorted_ratios[:n_ratios].tolist()  # Best k ratios
            worst_ratios = sorted_ratios[-(n_ratios):].tolist()  # Worst k ratios
            
            # Pad ratios arrays to always have 5 elements
            best_ratios = best_ratios + [0.0] * (5 - len(best_ratios))
            worst_ratios = worst_ratios + [0.0] * (5 - len(worst_ratios))
            
            # Prepare features exactly as in training
            instance_features = [
                n_items,
                capacity,
                float(np.mean(weights)),
                float(np.std(weights)),
                float(np.median(weights)),
                float(np.percentile(weights, 25)),
                float(np.percentile(weights, 75)),
                float(np.mean(values)),
                float(np.std(values)),
                float(np.median(values)),
                float(np.percentile(values, 25)),
                float(np.percentile(values, 75)),
                float(np.sum(values)),
                float(np.sum(weights)),
                float(capacity / np.sum(weights)),  # capacity utilization
                float(np.max(weights) / np.min(weights)),  # weight range ratio
                float(np.max(values) / np.min(values)),    # value range ratio
                float(np.mean(value_weight_ratios)),
                float(np.std(value_weight_ratios)),
                float(np.median(value_weight_ratios)),
                float(np.max(value_weight_ratios)),
                float(np.min(value_weight_ratios)),
                # Top k value/weight ratios
                *[float(x) for x in best_ratios],  # Best 5 ratios (padded if needed)
                *[float(x) for x in worst_ratios],  # Worst 5 ratios (padded if needed)
            ]
            
            # Add padded weights and values
            instance_features.extend([float(x) for x in padded_weights])
            instance_features.extend([float(x) for x in padded_values])
            
            # Convert to numpy array and reshape for single prediction
            X = np.array([instance_features])
            
            # Scale features
            X = self.model.scaler.transform(X)
            
            # Get model prediction
            selection = self.model.model.predict(X)[0]
            
            # Convert to binary selection
            if isinstance(selection, np.ndarray):
                selection = (selection > 0.5).astype(int)
            
            # Truncate selection to actual number of items and convert to Python list
            selected_items = [i for i, selected in enumerate(selection) if selected == 1]
            total_weight = float(sum(weights[i] for i in selected_items))  # Convert to float
            total_value = float(sum(values[i] for i in selected_items))    # Convert to float
            is_feasible = bool(total_weight <= capacity)  # Convert to Python bool
            
            # If solution is infeasible, try to repair it
            if not is_feasible:
                selection, total_weight, total_value = self._repair_solution(
                    np.array(selection), weights, values, capacity
                )
                selected_items = [i for i, selected in enumerate(selection) if selected == 1]
                is_feasible = bool(total_weight <= capacity)  # Recheck feasibility after repair
            
            # Apply local search optimization to improve the solution
            improved_selection, improved_value, improved_weight = self._local_search_optimization(
                np.array(selection) if isinstance(selection, list) else selection,
                weights,
                values,
                capacity
            )
            
            # If optimization improved the solution, use it
            if improved_value > total_value:
                selection = improved_selection
                total_value = improved_value
                total_weight = improved_weight
                selected_items = [i for i, selected in enumerate(selection) if selected == 1]
            
            # Apply capacity maximization to improve capacity utilization
            selection, total_value, total_weight = self._maximize_capacity_utilization(
                selection if isinstance(selection, np.ndarray) else np.array(selection),
                weights,
                values,
                capacity,
                total_weight
            )
            selected_items = [i for i, selected in enumerate(selection) if selected == 1]

            # For medium-sized problems (15 < n ≤ 30), compare with DP and take the better solution
            if 15 < n_items <= 30:
                # Only run DP if we still have enough time budget
                elapsed_time = time.time() - start_time
                if elapsed_time < 0.5:  # If less than 500ms has elapsed
                    try:
                        dp_solution = self.dp_solver.solve(weights.tolist(), values.tolist(), capacity)
                        if dp_solution['total_value'] > total_value:
                            # DP found better solution, use it
                            dp_solution['solve_time'] = time.time() - start_time
                            return dp_solution
                    except Exception as e:
                        # If DP fails (e.g., memory issues), continue with ML solution
                        pass
            
            # Add solve time to ML solution
            solve_time = time.time() - start_time
            
            return {
                'selected_items': selected_items,
                'total_value': total_value,
                'total_weight': total_weight,
                'is_feasible': is_feasible,
                'selection': selection.tolist() if isinstance(selection, np.ndarray) else selection,
                'solve_time': solve_time
            }
            
        except Exception as e:
            # If anything fails in the ML pipeline, fall back to traditional solvers
            logger.warning(f"ML solver failed: {str(e)}. Falling back to traditional solvers.")
            
            try:
                # For problems up to 30 items, try DP first
                if len(weights) <= 30:
                    dp_solution = self.dp_solver.solve(weights, values, capacity)
                    dp_solution['solve_time'] = time.time() - start_time
                    return dp_solution
            except Exception as dp_error:
                logger.warning(f"DP solver failed: {str(dp_error)}. Falling back to greedy.")
            
            # Fall back to greedy
            greedy_solution = self.greedy_solver.solve(weights, values, capacity)
            greedy_solution['solve_time'] = time.time() - start_time
            return greedy_solution
    
    def _repair_solution(
        self,
        selection: np.ndarray,
        weights: List[float],
        values: List[float],
        capacity: float
    ) -> Tuple[np.ndarray, float, float]:
        """Repair an infeasible solution by removing items."""
        selection = selection.copy()
        selected_items = [i for i, selected in enumerate(selection) if selected == 1]
        
        # Calculate value/weight ratios
        ratios = [(i, values[i]/weights[i]) for i in selected_items]
        ratios.sort(key=lambda x: x[1])  # Sort by ratio ascending
        
        # Remove items with lowest value/weight ratio until feasible
        total_weight = sum(weights[i] for i in selected_items)
        total_value = sum(values[i] for i in selected_items)
        
        while total_weight > capacity and ratios:
            item_idx = ratios.pop(0)[0]  # Remove item with lowest ratio
            selection[item_idx] = 0
            total_weight -= weights[item_idx]
            total_value -= values[item_idx]
        
        return selection, total_weight, total_value
    
    def _local_search_optimization(
        self, 
        selection: np.ndarray,
        weights: np.ndarray, 
        values: np.ndarray, 
        capacity: float,
        max_iterations: int = 100
    ) -> Tuple[np.ndarray, float, float]:
        """Apply local search optimization to improve the solution."""
        best_selection = selection.copy()
        best_value = sum(values[i] for i, selected in enumerate(selection) if selected == 1)
        best_weight = sum(weights[i] for i, selected in enumerate(selection) if selected == 1)
        
        for _ in range(max_iterations):
            improved = False
            
            # Try removing one item and adding another
            selected_indices = [i for i, selected in enumerate(best_selection) if selected == 1]
            unselected_indices = [i for i, selected in enumerate(best_selection) if selected == 0]
            
            for remove_idx in selected_indices:
                for add_idx in unselected_indices:
                    # Skip if adding would exceed capacity
                    if best_weight - weights[remove_idx] + weights[add_idx] > capacity:
                        continue
                    
                    # Calculate new value
                    new_value = best_value - values[remove_idx] + values[add_idx]
                    if new_value > best_value:
                        # Make the swap
                        temp_selection = best_selection.copy()
                        temp_selection[remove_idx] = 0
                        temp_selection[add_idx] = 1
                        
                        # Update best solution
                        best_selection = temp_selection
                        best_value = new_value
                        best_weight = best_weight - weights[remove_idx] + weights[add_idx]
                        improved = True
                        break
                
                if improved:
                    break
            
            # If no improvement was found, stop
            if not improved:
                break
        
        return best_selection, best_value, best_weight
    
    def _maximize_capacity_utilization(
        self,
        selection: np.ndarray,
        weights: np.ndarray,
        values: np.ndarray,
        capacity: float,
        current_weight: float,
        max_iterations: int = 200
    ) -> Tuple[np.ndarray, float, float]:
        """Maximize capacity utilization by adding more items if possible."""
        best_selection = selection.copy()
        best_value = sum(values[i] for i, selected in enumerate(selection) if selected == 1)
        best_weight = current_weight
        remaining_capacity = capacity - best_weight
        
        # If we're already using most of the capacity, don't bother
        if remaining_capacity < 0.05 * capacity:
            return best_selection, best_value, best_weight
        
        # Sort unselected items by value/weight ratio
        unselected_indices = [i for i, selected in enumerate(best_selection) if selected == 0]
        if not unselected_indices:
            return best_selection, best_value, best_weight
            
        # Try to add items greedily to fill remaining capacity
        value_weight_ratios = [(i, values[i]/weights[i]) for i in unselected_indices if weights[i] <= remaining_capacity]
        value_weight_ratios.sort(key=lambda x: x[1], reverse=True)  # Sort by ratio descending
        
        for idx, _ in value_weight_ratios:
            if weights[idx] <= remaining_capacity:
                best_selection[idx] = 1
                best_weight += weights[idx]
                best_value += values[idx]
                remaining_capacity = capacity - best_weight
        
        # Try swapping combinations of items to improve capacity utilization
        for _ in range(max_iterations):
            improved = False
            selected_indices = [i for i, selected in enumerate(best_selection) if selected == 1]
            unselected_indices = [i for i, selected in enumerate(best_selection) if selected == 0]
            
            # Try combinations of swapping 1 selected item with 1 or 2 unselected items
            for remove_idx in selected_indices:
                removed_weight = weights[remove_idx]
                removed_value = values[remove_idx]
                
                # Try adding 1 unselected item
                for add_idx in unselected_indices:
                    new_weight = best_weight - removed_weight + weights[add_idx]
                    
                    # Skip if it would exceed capacity or doesn't improve capacity utilization
                    if new_weight > capacity or new_weight <= best_weight:
                        continue
                    
                    new_value = best_value - removed_value + values[add_idx]
                    
                    # Accept if it improves value or keeps same value but improves capacity utilization
                    if new_value >= best_value:
                        temp_selection = best_selection.copy()
                        temp_selection[remove_idx] = 0
                        temp_selection[add_idx] = 1
                        
                        best_selection = temp_selection
                        best_value = new_value
                        best_weight = new_weight
                        improved = True
                        break
                
                if improved:
                    break
                    
                # Try adding 2 unselected items
                for i, add_idx1 in enumerate(unselected_indices):
                    for add_idx2 in unselected_indices[i+1:]:
                        new_weight = best_weight - removed_weight + weights[add_idx1] + weights[add_idx2]
                        
                        # Skip if it would exceed capacity
                        if new_weight > capacity:
                            continue
                        
                        new_value = best_value - removed_value + values[add_idx1] + values[add_idx2]
                        
                        # Accept if it improves value or keeps same value but improves capacity utilization
                        if new_value >= best_value and new_weight > best_weight:
                            temp_selection = best_selection.copy()
                            temp_selection[remove_idx] = 0
                            temp_selection[add_idx1] = 1
                            temp_selection[add_idx2] = 1
                            
                            best_selection = temp_selection
                            best_value = new_value
                            best_weight = new_weight
                            improved = True
                            break
                    
                    if improved:
                        break
                
                if improved:
                    break
            
            # If no improvement was found, stop
            if not improved:
                break
        
        return best_selection, best_value, best_weight

if __name__ == "__main__":
    # Example usage
    weights = [10, 20, 30, 40, 50]
    values = [100, 150, 200, 250, 300]
    capacity = 100
    
    solver = MLKnapsackSolver()
    solution = solver.solve(weights, values, capacity)
    print(f"Selected items: {solution['selected_items']}")
    print(f"Total value: {solution['total_value']}")
    print(f"Total weight: {solution['total_weight']}")
    print(f"Is feasible: {solution['is_feasible']}")
    print(f"Solve time: {solution['solve_time']}") 