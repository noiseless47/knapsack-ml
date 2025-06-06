import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
from typing import List, Dict, Tuple
from knapsack.models.train_model import KnapsackMLModel

class MLKnapsackSolver:
    def __init__(self, model_path: str = 'knapsack/models/rf_model.pkl'):
        """Initialize the ML-based knapsack solver.
        
        Args:
            model_path: Path to the trained model file
        """
        self.model = KnapsackMLModel.load(model_path)
        self.max_items = 50  # Maximum number of items to consider, must match the model's max_items
    
    def solve(self, weights: List[float], values: List[float], capacity: float) -> Dict:
        """Solve a knapsack instance using the ML model.
        
        Args:
            weights: List of item weights
            values: List of item values
            capacity: Knapsack capacity
            
        Returns:
            Dictionary containing solution details
        """
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
            *[float(x) for x in sorted_ratios[:5]],  # Best 5 ratios
            *[float(x) for x in sorted_ratios[-5:]],  # Worst 5 ratios
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
        
        return {
            'selected_items': selected_items,
            'total_value': total_value,
            'total_weight': total_weight,
            'is_feasible': is_feasible,
            'selection': selection if isinstance(selection, list) else selection.tolist()
        }
    
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

if __name__ == "__main__":
    # Example usage
    weights = [10, 20, 30, 40, 50]
    values = [100, 150, 200, 250, 300]
    capacity = 100
    
    solver = MLKnapsackSolver()
    solution = solver.solve(weights, values, capacity)
    
    print("\nML Solver Solution:")
    print(f"Selected items: {solution['selected_items']}")
    print(f"Total value: {solution['total_value']}")
    print(f"Total weight: {solution['total_weight']}")
    print(f"Is feasible: {solution['is_feasible']}") 