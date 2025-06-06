from knapsack_ga import KnapsackGA
import numpy as np

def main():
    # Example problem instance
    weights = [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0]
    values = [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0]
    capacity = 30.0

    # Initialize the GA solver with custom parameters
    solver = KnapsackGA(
        weights=weights,
        values=values,
        capacity=capacity,
        population_size=200,  # Larger population for better exploration
        generations=150,      # More generations for better convergence
        mutation_rate=0.15,   # Slightly higher mutation rate
        elite_size=20        # Preserve more elite solutions
    )

    # Solve the problem
    print("Solving knapsack problem...")
    solution, value, weight, selected_items = solver.solve()

    # Get detailed solution information
    solution_details = solver.get_solution_details(solution)

    # Print results
    print("\nSolution found:")
    print(f"Total value: {solution_details['total_value']:.2f}")
    print(f"Total weight: {solution_details['total_weight']:.2f}")
    print(f"Capacity: {capacity:.2f}")
    print(f"Solution is valid: {solution_details['is_valid']}")
    
    print("\nSelected items:")
    print("Item ID | Weight | Value")
    print("-" * 25)
    for item in solution_details['item_details']:
        print(f"{item['item_id']:7d} | {item['weight']:6.1f} | {item['value']:5.1f}")

if __name__ == "__main__":
    main() 