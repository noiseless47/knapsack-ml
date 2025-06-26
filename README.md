# 🎒 KnapsackML

<div align="center">

![KnapsackML Logo](https://img.shields.io/badge/🎒-KnapsackML-00C853?style=for-the-badge)

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-modern-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Machine Learning](https://img.shields.io/badge/ML-Powered-FF69B4?style=flat-square&logo=tensorflow)](https://scikit-learn.org/)

*A modern, ML-powered approach to solving the classic Knapsack Problem*

[Overview](#-overview) • [Installation](#-installation) • [Getting Started](#-getting-started) • [Training ML Models](#-training-ml-models) • [Project Structure](#-project-structure) • [Algorithms](#-algorithms)

</div>

## 🌟 Overview

KnapsackML is a cutting-edge implementation of the classic Knapsack Problem, combining traditional algorithms with machine learning and genetic algorithms to provide fast, efficient solutions. Our platform offers a beautiful web interface for solving knapsack problems with multiple approaches:

- 🎯 **Dynamic Programming** - Optimal but slow for large instances
- 🚀 **Greedy Algorithm** - Fast approximation (~85% optimal)
- 🧠 **Machine Learning** - Smart heuristic (~91% optimal) with post-processing
- 🔄 **Hybrid Approach** - ML + solution repair + local search (~97% optimal)

## 📋 Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/knapsackml.git
cd knapsackml
```

### Step 2: Set Up Python Environment

```bash
# Create and activate a virtual environment (recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Install as development package (for imports to work properly)
pip install -e .
```

### Step 3: Install Frontend Dependencies

```bash
# Install Node.js dependencies
npm install
```

## 🚀 Getting Started

### Quick Start (Windows)

The easiest way to run the entire application (frontend + backend) is to use the provided PowerShell script:

```bash
# Make sure you've activated your virtual environment first
.\start.ps1
```

This script will:
1. Start the FastAPI backend server at http://localhost:8000
2. Start the Next.js frontend at http://localhost:3000

### Manual Start

If you prefer to start the services manually:

#### Backend Server

```bash
# From the project root directory
uvicorn knapsack.api:app --reload
```

#### Frontend Development Server

```bash
# From the project root directory  
npm run dev
```

Then visit http://localhost:3000 in your web browser to access the application.

## 🧠 Training ML Models

The ML component requires trained models to make predictions. Here's how to train them:

### Step 1: Generate Training Data

```bash
# From the project root directory
python -m knapsack.data.generate_data
```

This will:
- Generate 5,000 training instances, 1,000 validation instances, and 1,000 test instances
- Save them in CSV files in the knapsack/data/ directory

### Step 2: Train the Models

```bash
# From the project root directory
python -m knapsack.train_model
```

This will:
1. Train three different model types:
   - Random Forest Classifier
   - Gradient Boosting Classifier 
   - Neural Network
2. Evaluate each model on the validation set
3. Save all models in the knapsack/models/ directory
4. Select and save the best performing model as best_model.pkl

### Model Configuration

You can adjust model hyperparameters by modifying the KnapsackMLModel class in knapsack/train_model.py:

```python
# For Random Forest:
self.model = RandomForestClassifier(
    n_estimators=500,
    max_depth=40,
    # other parameters...
)

# For Neural Network:
self.model = MLPRegressor(
    hidden_layer_sizes=(512, 256, 128),
    # other parameters...
)
```

## 💡 Using the Application

1. Visit http://localhost:3000 in your web browser
2. Set the knapsack capacity
3. Add or modify items (weight and value pairs)
4. Select a solver type (Dynamic Programming, Greedy, ML, or Compare All)
5. Click "Solve" to get the solution
6. View the visualization of selected items and performance metrics

## 🧪 Using the API Directly

### Python Example

```python
import requests

# Define your knapsack problem
data = {
    "weights": [2, 3, 4, 5],
    "values": [3, 4, 5, 6],
    "capacity": 10,
    "solver_type": "all"  # "dp", "greedy", "ml", or "all"
}

# Get the solution
response = requests.post("http://localhost:8000/solve", json=data)
solution = response.json()
print(solution)
```

### Command Line Example

```bash
# From the project root directory
python main.py --weights "[10,20,30]" --values "[60,100,120]" --capacity 50 --solver all
```

## 📁 Project Structure

```
knapsack-ml/
│
├── knapsack/               # Core Python package
│   ├── __init__.py
│   ├── api.py              # FastAPI server
│   ├── data/
│   │   ├── generate_data.py # Training data generation
│   │   └── *.csv           # Generated datasets
│   ├── models/
│   │   └── *.pkl           # Trained models
│   ├── solver/
│   │   ├── traditional_solver.py # DP and Greedy algorithms
│   │   └── ml_solver.py    # ML and hybrid approaches
│   └── train_model.py      # ML model training pipeline
│
├── src/                    # Frontend (Next.js)
│   ├── app/                # Pages and routes
│   ├── components/         # React components
│   └── types/              # TypeScript definitions
│
├── main.py                 # CLI entry point
├── requirements.txt        # Python dependencies
├── package.json            # Node.js dependencies
└── start.ps1               # Quick start script
```

## 🧮 Algorithms

### Dynamic Programming Solver

- Guaranteed to find the optimal solution
- Time complexity: O(n×W) where n is the number of items and W is the capacity
- Space complexity: O(n×W)
- Becomes impractical for large instances (>50 items)

### Greedy Algorithm Solver

- Fast approximation algorithm
- Time complexity: O(n log n) 
- Sorts items by value/weight ratio and selects in descending order
- Typically achieves ~85% of optimal value

### ML Solver (Hybrid Approach)

1. **Initial ML Prediction**: Using a trained ensemble model to predict item selection
2. **Solution Repair**: If the solution is infeasible, removes items with lowest value/weight ratios
3. **Local Search**: Tries one-item swaps to improve solution quality
4. **Capacity Maximization**: Fine-tunes solution to better utilize knapsack capacity
5. **Fallback Mechanisms**: For small problems, compares with DP solution and takes the better one

## 📊 Performance Comparison

| Solver Type | Solution Quality | Speed | Memory Usage | Best For |
|-------------|------------------|-------|--------------|----------|
| Dynamic Programming | 100% (Optimal) | Slow | High | Small instances (<30 items) |
| Greedy Algorithm | ~85% | Very Fast | Low | Large instances, strict time constraints |
| Machine Learning | ~91% | Instant | Medium | Real-time applications |
| Hybrid Approach | ~97% | Fast | Medium | Best quality/speed tradeoff |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.