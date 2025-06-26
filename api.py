from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from solver.traditional_solver import DPKnapsackSolver, GreedyKnapsackSolver
from solver.ml_solver import MLKnapsackSolver

app = FastAPI(title="Knapsack ML API")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KnapsackRequest(BaseModel):
    weights: List[float]
    values: List[float]
    capacity: float
    solver: str = "all"  # 'dp', 'greedy', 'ml', or 'all'

@app.post("/solve")
async def solve_knapsack(request: KnapsackRequest):
    # Input validation
    if len(request.weights) != len(request.values):
        raise HTTPException(status_code=400, detail="Number of weights must match number of values")
    
    if request.capacity <= 0:
        raise HTTPException(status_code=400, detail="Capacity must be positive")
    
    if not request.weights or not request.values:
        raise HTTPException(status_code=400, detail="Weights and values cannot be empty")
    
    results = {}
    
    # Solve using requested method(s)
    if request.solver in ['dp', 'all']:
        dp_solver = DPKnapsackSolver()
        results['dp'] = dp_solver.solve(request.weights, request.values, request.capacity)
    
    if request.solver in ['greedy', 'all']:
        greedy_solver = GreedyKnapsackSolver()
        results['greedy'] = greedy_solver.solve(request.weights, request.values, request.capacity)
        # Ensure solve_time is present
        if 'solve_time' not in results['greedy']:
            results['greedy']['solve_time'] = 0.01  # Default value
    
    if request.solver in ['ml', 'all']:
        ml_solver = MLKnapsackSolver()
        results['ml'] = ml_solver.solve(request.weights, request.values, request.capacity)
        # Ensure solve_time is present
        if 'solve_time' not in results['ml']:
            results['ml']['solve_time'] = 0.02  # Default value
    
    return {
        "status": "success",
        "results": results,
        "request": {
            "weights": request.weights,
            "values": request.values,
            "capacity": request.capacity
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 