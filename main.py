import argparse
import json
from typing import List
import numpy as np
from solver.traditional_solver import DPKnapsackSolver, GreedyKnapsackSolver
from solver.ml_solver import MLKnapsackSolver
from utils.evaluation import KnapsackEvaluator

def parse_list(s: str) -> List[float]:
    """Parse a comma-separated string into a list of floats."""
    return [float(x.strip()) for x in s.strip('[]').split(',')]

def main():
    parser = argparse.ArgumentParser(description='Knapsack Problem Solver')
    parser.add_argument('--weights', type=str, required=True,
                      help='Comma-separated list of weights')
    parser.add_argument('--values', type=str, required=True,
                      help='Comma-separated list of values')
    parser.add_argument('--capacity', type=float, required=True,
                      help='Knapsack capacity')
    parser.add_argument('--solver', type=str, choices=['dp', 'greedy', 'ml', 'all'],
                      default='all', help='Solver to use')
    parser.add_argument('--output', type=str, default=None,
                      help='Output file for JSON results')
    
    args = parser.parse_args()
    
    # Parse inputs
    weights = parse_list(args.weights)
    values = parse_list(args.values)
    
    if len(weights) != len(values):
        raise ValueError("Number of weights must match number of values")
    
    results = {}
    
    # Solve using requested method(s)
    if args.solver in ['dp', 'all']:
        dp_solver = DPKnapsackSolver()
        results['dp'] = dp_solver.solve(weights, values, args.capacity)
    
    if args.solver in ['greedy', 'all']:
        greedy_solver = GreedyKnapsackSolver()
        results['greedy'] = greedy_solver.solve(weights, values, args.capacity)
    
    if args.solver in ['ml', 'all']:
        ml_solver = MLKnapsackSolver()
        results['ml'] = ml_solver.solve(weights, values, args.capacity)
    
    # Print results
    for solver_name, solution in results.items():
        print(f"\n{solver_name.upper()} Solver Solution:")
        print(f"Selected items: {solution['selected_items']}")
        print(f"Total value: {solution['total_value']}")
        print(f"Total weight: {solution['total_weight']}")
        if 'solve_time' in solution:
            print(f"Solve time: {solution['solve_time']:.6f} seconds")
        print(f"Is feasible: {solution['is_feasible']}")
    
    # Save results if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)

if __name__ == "__main__":
    main() 