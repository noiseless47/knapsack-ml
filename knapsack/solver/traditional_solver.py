import numpy as np
from typing import List, Dict, Tuple
import time

class DPKnapsackSolver:
    def solve(self, weights: List[float], values: List[float], capacity: float) -> Dict:
        """Solve knapsack problem using dynamic programming.
        
        Args:
            weights: List of item weights
            values: List of item values
            capacity: Knapsack capacity
            
        Returns:
            Dictionary containing solution details
        """
        start_time = time.time()
        
        n = len(weights)
        # Convert weights to integers for DP table
        scale = 1000  # Use 3 decimal places
        weights_scaled = [int(w * scale) for w in weights]
        capacity_scaled = int(capacity * scale)
        
        # Create DP table
        dp = np.zeros((n + 1, capacity_scaled + 1))
        keep = np.zeros((n + 1, capacity_scaled + 1), dtype=int)
        
        # Fill DP table
        for i in range(1, n + 1):
            for w in range(capacity_scaled + 1):
                if weights_scaled[i-1] <= w:
                    val_with_item = dp[i-1][w-weights_scaled[i-1]] + values[i-1]
                    val_without_item = dp[i-1][w]
                    if val_with_item > val_without_item:
                        dp[i][w] = val_with_item
                        keep[i][w] = 1
                    else:
                        dp[i][w] = val_without_item
                else:
                    dp[i][w] = dp[i-1][w]
        
        # Backtrack to find selected items
        selected_items = []
        w = capacity_scaled
        for i in range(n, 0, -1):
            if keep[i][w] == 1:
                selected_items.append(i-1)
                w = w - weights_scaled[i-1]
        
        # Calculate solution metrics
        total_weight = sum(weights[i] for i in selected_items)
        total_value = sum(values[i] for i in selected_items)
        
        # Create selection array
        selection = np.zeros(n)
        selection[selected_items] = 1
        
        end_time = time.time()
        solve_time = end_time - start_time
        
        return {
            'selected_items': selected_items,
            'total_value': total_value,
            'total_weight': total_weight,
            'is_feasible': True,  # DP always produces feasible solutions
            'selection': selection.tolist(),
            'solve_time': solve_time
        }

class GreedyKnapsackSolver:
    def solve(self, weights: List[float], values: List[float], capacity: float) -> Dict:
        """Solve knapsack problem using greedy approach (value/weight ratio).
        
        Args:
            weights: List of item weights
            values: List of item values
            capacity: Knapsack capacity
            
        Returns:
            Dictionary containing solution details
        """
        start_time = time.time()
        
        n = len(weights)
        # Calculate value/weight ratios
        ratios = [(i, values[i]/weights[i]) for i in range(n)]
        ratios.sort(key=lambda x: x[1], reverse=True)  # Sort by ratio descending
        
        selected_items = []
        total_weight = 0
        total_value = 0
        
        # Select items in order of decreasing value/weight ratio
        for idx, _ in ratios:
            if total_weight + weights[idx] <= capacity:
                selected_items.append(idx)
                total_weight += weights[idx]
                total_value += values[idx]
        
        # Create selection array
        selection = np.zeros(n)
        selection[selected_items] = 1
        
        end_time = time.time()
        solve_time = end_time - start_time
        
        return {
            'selected_items': selected_items,
            'total_value': total_value,
            'total_weight': total_weight,
            'is_feasible': True,  # Greedy always produces feasible solutions
            'selection': selection.tolist(),
            'solve_time': solve_time
        }

if __name__ == "__main__":
    # Example usage
    weights = [10, 20, 30, 40, 50]
    values = [100, 150, 200, 250, 300]
    capacity = 100
    
    # Solve using DP
    dp_solver = DPKnapsackSolver()
    dp_solution = dp_solver.solve(weights, values, capacity)
    
    print("\nDP Solver Solution:")
    print(f"Selected items: {dp_solution['selected_items']}")
    print(f"Total value: {dp_solution['total_value']}")
    print(f"Total weight: {dp_solution['total_weight']}")
    print(f"Solve time: {dp_solution['solve_time']:.6f} seconds")
    
    # Solve using Greedy
    greedy_solver = GreedyKnapsackSolver()
    greedy_solution = greedy_solver.solve(weights, values, capacity)
    
    print("\nGreedy Solver Solution:")
    print(f"Selected items: {greedy_solution['selected_items']}")
    print(f"Total value: {greedy_solution['total_value']}")
    print(f"Total weight: {greedy_solution['total_weight']}")
    print(f"Solve time: {greedy_solution['solve_time']:.6f} seconds") 