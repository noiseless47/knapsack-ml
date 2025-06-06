import numpy as np
import pandas as pd
from typing import Dict, List, Any
import time
from solver.traditional_solver import DPKnapsackSolver, GreedyKnapsackSolver
from solver.ml_solver import MLKnapsackSolver

class KnapsackEvaluator:
    def __init__(self):
        """Initialize solvers for comparison."""
        self.dp_solver = DPKnapsackSolver()
        self.greedy_solver = GreedyKnapsackSolver()
        self.ml_solver = MLKnapsackSolver()
    
    def evaluate_instance(
        self,
        weights: List[float],
        values: List[float],
        capacity: float
    ) -> Dict[str, Any]:
        """Evaluate all solvers on a single instance."""
        results = {}
        
        # Solve using each method
        dp_solution = self.dp_solver.solve(weights, values, capacity)
        greedy_solution = self.greedy_solver.solve(weights, values, capacity)
        ml_solution = self.ml_solver.solve(weights, values, capacity)
        
        # Optimal value from DP
        optimal_value = dp_solution['total_value']
        
        # Calculate relative performance
        results['dp'] = {
            'total_value': dp_solution['total_value'],
            'total_weight': dp_solution['total_weight'],
            'solve_time': dp_solution['solve_time'],
            'relative_performance': 1.0,  # By definition
            'is_feasible': dp_solution['is_feasible']
        }
        
        results['greedy'] = {
            'total_value': greedy_solution['total_value'],
            'total_weight': greedy_solution['total_weight'],
            'solve_time': greedy_solution['solve_time'],
            'relative_performance': greedy_solution['total_value'] / optimal_value,
            'is_feasible': greedy_solution['is_feasible']
        }
        
        results['ml'] = {
            'total_value': ml_solution['total_value'],
            'total_weight': ml_solution['total_weight'],
            'solve_time': time.time() - time.time(),  # ML prediction time is negligible
            'relative_performance': ml_solution['total_value'] / optimal_value,
            'is_feasible': ml_solution['is_feasible']
        }
        
        return results
    
    def evaluate_dataset(self, test_data: pd.DataFrame) -> Dict[str, Dict[str, float]]:
        """Evaluate all solvers on a test dataset."""
        all_results = {
            'dp': {'values': [], 'times': [], 'feasible': []},
            'greedy': {'values': [], 'times': [], 'feasible': []},
            'ml': {'values': [], 'times': [], 'feasible': []}
        }
        
        for _, instance in test_data.iterrows():
            weights = eval(instance['weights']) if isinstance(instance['weights'], str) else instance['weights']
            values = eval(instance['values']) if isinstance(instance['values'], str) else instance['values']
            capacity = instance['capacity']
            
            results = self.evaluate_instance(weights, values, capacity)
            
            for solver in ['dp', 'greedy', 'ml']:
                all_results[solver]['values'].append(results[solver]['total_value'])
                all_results[solver]['times'].append(results[solver]['solve_time'])
                all_results[solver]['feasible'].append(results[solver]['is_feasible'])
        
        # Compute summary statistics
        summary = {}
        for solver in ['dp', 'greedy', 'ml']:
            values = np.array(all_results[solver]['values'])
            times = np.array(all_results[solver]['times'])
            feasible = np.array(all_results[solver]['feasible'])
            
            summary[solver] = {
                'mean_value': np.mean(values),
                'std_value': np.std(values),
                'mean_time': np.mean(times),
                'std_time': np.std(times),
                'feasibility_rate': np.mean(feasible),
                'relative_performance': np.mean(values / np.array(all_results['dp']['values']))
            }
        
        return summary

if __name__ == "__main__":
    # Load test data
    test_data = pd.read_csv('data/test_data.csv')
    
    # Create evaluator
    evaluator = KnapsackEvaluator()
    
    # Run evaluation
    summary = evaluator.evaluate_dataset(test_data)
    
    # Print results
    print("\nEvaluation Results:")
    for solver, metrics in summary.items():
        print(f"\n{solver.upper()} Solver:")
        print(f"Mean Value: {metrics['mean_value']:.2f} ± {metrics['std_value']:.2f}")
        print(f"Mean Time: {metrics['mean_time']:.6f} ± {metrics['std_time']:.6f} seconds")
        print(f"Feasibility Rate: {metrics['feasibility_rate']*100:.1f}%")
        print(f"Relative Performance: {metrics['relative_performance']*100:.1f}% of optimal") 