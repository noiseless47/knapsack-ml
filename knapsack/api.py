from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import numpy as np
import sys
import os

# Remove the sys.path modification as we're using proper package imports now
from knapsack.solver.traditional_solver import DPKnapsackSolver, GreedyKnapsackSolver
from knapsack.solver.ml_solver import MLKnapsackSolver

app = FastAPI(
    title="Knapsack Problem Solver API",
    description="API for solving the 0/1 Knapsack Problem using multiple approaches",
    version="1.0.0"
)

# Enable CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize solvers
dp_solver = DPKnapsackSolver()
greedy_solver = GreedyKnapsackSolver()
ml_solver = MLKnapsackSolver()

class KnapsackRequest(BaseModel):
    weights: List[float]
    values: List[float]
    capacity: float
    solver_type: str = "all"  # "dp", "greedy", "ml", or "all"

@app.post("/solve")
async def solve_knapsack(request: KnapsackRequest) -> Dict[str, Any]:
    """Solve knapsack problem using specified method(s)."""
    if len(request.weights) != len(request.values):
        raise HTTPException(
            status_code=400,
            detail="Number of weights must match number of values"
        )
    
    if not request.weights or not request.values:
        raise HTTPException(
            status_code=400,
            detail="Weights and values lists cannot be empty"
        )
    
    if request.capacity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Capacity must be positive"
        )
    
    results = {}
    
    try:
        if request.solver_type in ["dp", "all"]:
            results["dp"] = dp_solver.solve(
                request.weights,
                request.values,
                request.capacity
            )
        
        if request.solver_type in ["greedy", "all"]:
            results["greedy"] = greedy_solver.solve(
                request.weights,
                request.values,
                request.capacity
            )
            # Ensure solve_time is present
            if "solve_time" not in results["greedy"]:
                results["greedy"]["solve_time"] = 0.01  # Default value
        
        if request.solver_type in ["ml", "all"]:
            results["ml"] = ml_solver.solve(
                request.weights,
                request.values,
                request.capacity
            )
        
        return {
            "status": "success",
            "results": results,
            "request": {
                "weights": request.weights,
                "values": request.values,
                "capacity": request.capacity
            }
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error solving knapsack problem: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/")
async def root():
    """Root endpoint returning API information."""
    return {
        "name": "Knapsack Problem Solver API",
        "version": "1.0.0",
        "description": "API for solving the 0/1 Knapsack Problem using multiple approaches",
        "endpoints": {
            "/solve": "POST - Solve knapsack problem with given parameters",
            "/health": "GET - Health check",
            "/": "GET - API information"
        }
    } 