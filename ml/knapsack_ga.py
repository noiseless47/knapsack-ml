import numpy as np
from typing import List, Tuple, Optional
import random

class KnapsackGA:
    def __init__(
        self,
        weights: List[float],
        values: List[float],
        capacity: float,
        population_size: int = 100,
        generations: int = 100,
        mutation_rate: float = 0.1,
        elite_size: int = 10
    ):
        """
        Initialize the Genetic Algorithm solver for the Knapsack Problem.
        
        Args:
            weights: List of item weights
            values: List of item values
            capacity: Maximum knapsack capacity
            population_size: Size of the population
            generations: Number of generations to evolve
            mutation_rate: Probability of mutation
            elite_size: Number of best solutions to preserve
        """
        self.weights = np.array(weights)
        self.values = np.array(values)
        self.capacity = capacity
        self.population_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.elite_size = elite_size
        self.n_items = len(weights)
        
        # Validate inputs
        if len(weights) != len(values):
            raise ValueError("Weights and values must have the same length")
        if any(w <= 0 for w in weights) or any(v <= 0 for v in values):
            raise ValueError("Weights and values must be positive")
        if capacity <= 0:
            raise ValueError("Capacity must be positive")

    def _initialize_population(self) -> np.ndarray:
        """Initialize a random population of solutions."""
        return np.random.randint(0, 2, size=(self.population_size, self.n_items))

    def _calculate_fitness(self, population: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Calculate fitness for each solution in the population.
        Returns both fitness scores and total weights.
        """
        total_values = np.dot(population, self.values)
        total_weights = np.dot(population, self.weights)
        
        # Penalize solutions that exceed capacity
        fitness = np.where(total_weights <= self.capacity, total_values, 0)
        return fitness, total_weights

    def _select_parents(self, population: np.ndarray, fitness: np.ndarray) -> np.ndarray:
        """Select parents using tournament selection."""
        parents = np.zeros((self.population_size, self.n_items), dtype=int)
        
        for i in range(self.population_size):
            # Tournament selection
            tournament_size = 5
            tournament_idx = np.random.choice(
                self.population_size, 
                size=tournament_size, 
                replace=False
            )
            tournament_fitness = fitness[tournament_idx]
            winner_idx = tournament_idx[np.argmax(tournament_fitness)]
            parents[i] = population[winner_idx]
            
        return parents

    def _crossover(self, parents: np.ndarray) -> np.ndarray:
        """Perform single-point crossover between parents."""
        offspring = np.zeros_like(parents)
        
        for i in range(0, self.population_size, 2):
            if i + 1 < self.population_size:
                # Single-point crossover
                crossover_point = np.random.randint(1, self.n_items)
                offspring[i] = np.concatenate([
                    parents[i][:crossover_point],
                    parents[i+1][crossover_point:]
                ])
                offspring[i+1] = np.concatenate([
                    parents[i+1][:crossover_point],
                    parents[i][crossover_point:]
                ])
            else:
                offspring[i] = parents[i]
                
        return offspring

    def _mutate(self, population: np.ndarray) -> np.ndarray:
        """Apply mutation to the population."""
        mutation_mask = np.random.random(population.shape) < self.mutation_rate
        population[mutation_mask] = 1 - population[mutation_mask]
        return population

    def _elitism(self, population: np.ndarray, fitness: np.ndarray) -> np.ndarray:
        """Preserve the best solutions."""
        elite_idx = np.argsort(fitness)[-self.elite_size:]
        return population[elite_idx]

    def solve(self) -> Tuple[np.ndarray, float, float, List[int]]:
        """
        Solve the knapsack problem using genetic algorithm.
        
        Returns:
            Tuple containing:
            - Best solution (binary array)
            - Best solution value
            - Best solution weight
            - List of selected item indices
        """
        # Initialize population
        population = self._initialize_population()
        best_solution = None
        best_fitness = -float('inf')
        
        for generation in range(self.generations):
            # Calculate fitness
            fitness, weights = self._calculate_fitness(population)
            
            # Update best solution
            max_fitness_idx = np.argmax(fitness)
            if fitness[max_fitness_idx] > best_fitness:
                best_fitness = fitness[max_fitness_idx]
                best_solution = population[max_fitness_idx].copy()
            
            # Select parents
            parents = self._select_parents(population, fitness)
            
            # Create offspring through crossover
            offspring = self._crossover(parents)
            
            # Apply mutation
            offspring = self._mutate(offspring)
            
            # Preserve elite solutions
            elite = self._elitism(population, fitness)
            
            # Create new population
            population = np.vstack([offspring, elite])
            
            # Ensure population size remains constant
            if len(population) > self.population_size:
                population = population[:self.population_size]
        
        # Get final best solution
        final_fitness, final_weights = self._calculate_fitness(population)
        best_idx = np.argmax(final_fitness)
        best_solution = population[best_idx]
        best_value = final_fitness[best_idx]
        best_weight = final_weights[best_idx]
        
        # Get selected item indices
        selected_items = [i for i, x in enumerate(best_solution) if x == 1]
        
        return best_solution, best_value, best_weight, selected_items

    def get_solution_details(self, solution: np.ndarray) -> dict:
        """Get detailed information about a solution."""
        total_value = np.dot(solution, self.values)
        total_weight = np.dot(solution, self.weights)
        selected_items = [i for i, x in enumerate(solution) if x == 1]
        
        return {
            "selected_items": selected_items,
            "total_value": float(total_value),
            "total_weight": float(total_weight),
            "is_valid": total_weight <= self.capacity,
            "item_details": [
                {
                    "item_id": i,
                    "weight": float(self.weights[i]),
                    "value": float(self.values[i])
                }
                for i in selected_items
            ]
        } 