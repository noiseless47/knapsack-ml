# Knapsack Problem Solver using Genetic Algorithm

This implementation provides a solution to the 0/1 Knapsack Problem using a Genetic Algorithm approach. The solution is implemented in Python and includes both a standalone solver and a REST API interface.

## Features

- Genetic Algorithm implementation for solving the 0/1 Knapsack Problem
- Configurable parameters (population size, generations, mutation rate, etc.)
- FastAPI-based REST API for easy integration
- Detailed solution reporting
- Example usage script

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Standalone Solver

You can use the solver directly in your Python code:

```python
from knapsack_ga import KnapsackGA

# Define your problem
weights = [2.0, 3.0, 4.0, 5.0]
values = [3.0, 4.0, 5.0, 6.0]
capacity = 10.0

# Initialize solver
solver = KnapsackGA(
    weights=weights,
    values=values,
    capacity=capacity,
    population_size=100,
    generations=100,
    mutation_rate=0.1,
    elite_size=10
)

# Solve the problem
solution, value, weight, selected_items = solver.solve()

# Get detailed solution information
solution_details = solver.get_solution_details(solution)
```

### Running the Example

To run the example script:

```bash
python example.py
```

### Using the API

1. Start the API server:
```bash
uvicorn api:app --reload
```

2. The API will be available at `http://localhost:8000`

3. API Endpoints:
   - `GET /`: API information
   - `POST /solve`: Solve knapsack problem

Example API request using curl:
```bash
curl -X POST "http://localhost:8000/solve" \
     -H "Content-Type: application/json" \
     -d '{
           "weights": [2.0, 3.0, 4.0, 5.0],
           "values": [3.0, 4.0, 5.0, 6.0],
           "capacity": 10.0,
           "population_size": 100,
           "generations": 100,
           "mutation_rate": 0.1,
           "elite_size": 10
         }'
```

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Implementation Details

The Genetic Algorithm implementation includes:

1. **Population Initialization**: Random binary strings representing potential solutions
2. **Fitness Function**: Evaluates solutions based on total value and weight constraints
3. **Selection**: Tournament selection for choosing parent solutions
4. **Crossover**: Single-point crossover for creating offspring
5. **Mutation**: Random bit flipping to maintain diversity
6. **Elitism**: Preservation of best solutions across generations

## Parameters

- `population_size`: Number of solutions in each generation (default: 100)
- `generations`: Number of generations to evolve (default: 100)
- `mutation_rate`: Probability of mutation (default: 0.1)
- `elite_size`: Number of best solutions to preserve (default: 10)

## License

This project is open source and available under the MIT License. 