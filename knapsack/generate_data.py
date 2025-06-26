import numpy as np
import pandas as pd
from typing import Tuple, List
import os
from tqdm import tqdm

def solve_knapsack_dp(weights: List[float], values: List[float], capacity: float) -> Tuple[float, List[int]]:
    """Solve knapsack using dynamic programming to generate optimal labels."""
    n = len(weights)
    dp = np.zeros((n + 1, int(capacity) + 1))
    keep = np.zeros((n + 1, int(capacity) + 1), dtype=int)
    
    # Show progress for large instances
    if n > 100:
        iterator = tqdm(range(1, n + 1), desc="DP Progress", leave=False)
    else:
        iterator = range(1, n + 1)
    
    for i in iterator:
        for w in range(int(capacity) + 1):
            if weights[i-1] <= w:
                val_with_item = dp[i-1][w-int(weights[i-1])] + values[i-1]
                val_without_item = dp[i-1][w]
                if val_with_item > val_without_item:
                    dp[i][w] = val_with_item
                    keep[i][w] = 1
                else:
                    dp[i][w] = val_without_item
            else:
                dp[i][w] = dp[i-1][w]
    
    # Backtrack to find selected items
    selected = []
    w = int(capacity)
    for i in range(n, 0, -1):
        if keep[i][w] == 1:
            selected.append(i-1)
            w = w - int(weights[i-1])
    
    return dp[n][int(capacity)], selected

def generate_dataset(
    num_instances: int,
    min_items: int = 10,
    max_items: int = 50,
    min_weight: float = 1.0,
    max_weight: float = 100.0,
    min_value: float = 1.0,
    max_value: float = 100.0,
    capacity_factor: float = 0.5
) -> pd.DataFrame:
    """Generate random knapsack instances with optimal solutions."""
    data = []
    
    print(f"\nGenerating {num_instances} instances...")
    for _ in tqdm(range(num_instances), desc="Generating instances"):
        # Random number of items
        n_items = np.random.randint(min_items, max_items + 1)
        
        # Generate weights and values
        weights = np.random.uniform(min_weight, max_weight, n_items)
        values = np.random.uniform(min_value, max_value, n_items)
        
        # Set capacity as a fraction of total weight
        capacity = capacity_factor * np.sum(weights)
        
        # Solve using DP to get optimal solution
        optimal_value, selected_items = solve_knapsack_dp(weights.tolist(), values.tolist(), capacity)
        
        # Create binary selection vector
        selection = np.zeros(n_items)
        selection[selected_items] = 1
        
        # Store instance
        data.append({
            'n_items': n_items,
            'weights': weights.tolist(),
            'values': values.tolist(),
            'capacity': capacity,
            'optimal_value': optimal_value,
            'selection': selection.tolist()
        })
    
    return pd.DataFrame(data)

if __name__ == "__main__":
    print("Starting data generation...")
    
    # Generate larger training dataset
    print("\nGenerating training data...")
    train_data = generate_dataset(num_instances=5000)  # Increased from 1000
    
    # Generate validation data
    print("\nGenerating validation data...")
    val_data = generate_dataset(num_instances=1000)  # Increased from 200
    
    # Generate test data
    print("\nGenerating test data...")
    test_data = generate_dataset(num_instances=1000)  # Increased from 200
    
    # Save datasets
    print("\nSaving datasets...")
    os.makedirs('data', exist_ok=True)
    
    print("Saving training data...")
    train_data.to_csv('data/train_data.csv', index=False)
    
    print("Saving validation data...")
    val_data.to_csv('data/val_data.csv', index=False)
    
    print("Saving test data...")
    test_data.to_csv('data/test_data.csv', index=False)
    
    print("\nData generation complete!")
    print(f"Generated {len(train_data)} training instances")
    print(f"Generated {len(val_data)} validation instances")
    print(f"Generated {len(test_data)} test instances") 