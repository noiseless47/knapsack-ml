# 🎒 KnapsackML

<div align="center">

![KnapsackML Logo](https://img.shields.io/badge/🎒-KnapsackML-00C853?style=for-the-badge)

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-modern-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Machine Learning](https://img.shields.io/badge/ML-Powered-FF69B4?style=flat-square&logo=tensorflow)](https://scikit-learn.org/)
[![IEEE Paper](https://img.shields.io/badge/IEEE-Published-F5AB35?style=flat-square&logo=ieee)](https://ieee.org/)

*A modern, ML-powered approach to solving the classic Knapsack Problem*

[Demo](#live-demo) • [Features](#✨-features) • [Installation](#🚀-installation) • [Usage](#💡-usage) • [Documentation](#📚-documentation) • [Team](#👥-team)

</div>

## 🌟 Overview

KnapsackML is a cutting-edge implementation of the classic Knapsack Problem, combining traditional algorithms with machine learning and genetic algorithms to provide fast, efficient solutions. Our platform offers a beautiful web interface for solving knapsack problems with multiple approaches:

- 🎯 **Dynamic Programming** (Optimal Solution)
- 🚀 **Greedy Algorithm** (Fast Approximation)
- 🧠 **Machine Learning** (Smart Heuristic)
  - Random Forest
  - Gradient Boosting
  - Neural Networks
- 🧬 **Genetic Algorithm** (Evolutionary Approach)
- 🔄 **Hybrid Approach** (ML + Solution Repair + Local Search)

## ✨ Features

- **Multi-Algorithm Support**
  - Dynamic Programming for optimal solutions
  - Greedy Algorithm for quick approximations
  - ML-powered solvers for intelligent heuristics
  - Genetic Algorithm for evolutionary optimization
  - Hybrid approach combining ML with solution repair

- **Modern Web Interface**
  - Sleek, responsive design with Tailwind CSS
  - Real-time solution visualization
  - Interactive problem input
  - Performance comparison charts
  - Algorithm execution timeline
  - Detailed solution breakdowns

- **Advanced ML Capabilities**
  - Pre-trained on thousands of knapsack instances
  - Comprehensive feature engineering
  - Ensemble methods (Random Forest, Gradient Boosting)
  - Neural network with optimized architecture
  - Achieves ~92% of optimal solution quality
  - Significantly faster than exact methods

- **Genetic Algorithm Optimization**
  - Configurable population size and generations
  - Tournament selection for parent solutions
  - Single-point crossover for offspring generation
  - Adaptive mutation rate
  - Elite preservation across generations

- **Solution Enhancement**
  - Automatic solution repair for feasibility
  - Local search optimization for quality improvement
  - Capacity utilization maximization

- **Developer-Friendly**
  - RESTful API with FastAPI
  - TypeScript/React frontend
  - Comprehensive documentation
  - Easy-to-extend architecture
  - Docker support for containerized deployment

## 🚀 Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm/yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/noiseless47/knapsackml.git
cd knapsackml

# Create and activate virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Install as development package (optional)
pip install -e .
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd src

# Install frontend dependencies
npm install
# or
yarn install
```

## 💡 Usage

### Starting the Backend

```bash
# From the root directory
uvicorn knapsack.api:app --reload --host 0.0.0.0 --port 8000
# Or use the convenience script
./start.ps1
```

### Starting the Frontend

```bash
# From the root directory
cd src
npm run dev
# or 
yarn dev
```

Visit `http://localhost:3000` to access the web interface.

### API Examples

#### Python

```python
import requests

# Define your knapsack problem
data = {
    "weights": [2, 3, 4, 5],
    "values": [3, 4, 5, 6],
    "capacity": 10,
    "solver_type": "all"  # Try "dp", "greedy", "ml", "ga", or "all"
}

# Get the solution
response = requests.post("http://localhost:8000/solve", json=data)
solution = response.json()
print(solution)
```

#### JavaScript/TypeScript

```typescript
// Using fetch API
const solveKnapsack = async () => {
  const data = {
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 6],
    capacity: 10,
    solver_type: "ml"
  };
  
  const response = await fetch("http://localhost:8000/solve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  
  const solution = await response.json();
  console.log(solution);
};
```

## 📊 Performance Comparison

| Solver Type | Solution Quality | Speed | Memory Usage | Best For |
|-------------|------------------|-------|--------------|----------|
| Dynamic Programming | 100% (Optimal) | Slow (O(nW)) | High | Small to medium instances (<100 items) |
| Greedy Algorithm | ~85% | Very Fast (O(n log n)) | Low | Large instances, strict time constraints |
| Machine Learning | ~91% | Instant (O(1)) | Medium | Real-time applications |
| Genetic Algorithm | ~93% | Medium (O(g*p*n)) | Medium | Complex problem distributions |
| Hybrid Approach | ~97% | Fast | Medium | Best quality/speed tradeoff |

*g = generations, p = population size, n = number of items*

## 🧪 Example Problems

### 1. Basic Example

```json
{
  "weights": [2, 3, 4, 5, 6],
  "values": [3, 4, 5, 6, 7],
  "capacity": 10
}
```

### 2. Moderate Problem

```json
{
  "weights": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "values": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  "capacity": 20
}
```

### 3. ML Showcase

For larger examples (20+ items) where ML approaches shine, see the `examples/` directory.

## 🔧 Advanced Configuration

### ML Model Parameters

You can customize the ML model settings in `knapsack/models/config.py`:

```python
ML_CONFIG = {
    "random_forest": {
        "n_estimators": 500,
        "max_depth": 40,
        "class_weight": "balanced"
    },
    "gradient_boosting": {
        "n_estimators": 300,
        "learning_rate": 0.1,
        "max_depth": 8
    },
    "neural_network": {
        "hidden_layer_sizes": (512, 256, 128),
        "activation": "relu",
        "max_iter": 3000
    }
}
```

### Genetic Algorithm Parameters

Customize the GA parameters when calling the API:

```json
{
  "weights": [2, 3, 4, 5],
  "values": [3, 4, 5, 6],
  "capacity": 10,
  "solver_type": "ga",
  "ga_params": {
    "population_size": 200,
    "generations": 150,
    "mutation_rate": 0.15,
    "elite_size": 20
  }
}
```

## 📚 Documentation

- [API Documentation](http://localhost:8000/docs) - Once the server is running
- [Algorithm Details](./docs/algorithms.md) - Deep dive into all implemented algorithms
- [ML Model Architecture](./docs/ml_model.md) - Details of feature engineering and model training
- [Genetic Algorithm](./docs/genetic_algorithm.md) - Details of the evolutionary approach
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to this project

## 🧑‍💻 Development

### Project Structure

```
knapsackml/
├── knapsack/           # Core Python package
│   ├── api/            # FastAPI endpoints
│   │   ├── traditional_solver.py  # DP and Greedy
│   │   └── ml_solver.py           # ML-based solvers
│   └── models/         # ML model definitions
├── ml/                 # ML utilities and GA implementation
├── models/             # Trained model files
├── src/                # Frontend (Next.js/React)
├── notebook/           # Jupyter notebooks for exploration
├── tests/              # Test suite
└── examples/           # Example problems and solutions
```

### Running Tests

```bash
# Run all tests
pytest

# Run specific test module
pytest tests/test_solvers.py
```

### Building for Production

```bash
# Build frontend
cd src
npm run build

# Run production server
uvicorn knapsack.api:app --host 0.0.0.0 --port 8000
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker
docker build -t knapsackml .
docker run -p 8000:8000 -p 3000:3000 knapsackml
```

## 👥 Team

<div align="center">

| <img src="https://github.com/identicons/aaditya.png" width="100px;"/><br /><sub><b>Aaditya S Rao</b></sub> | <img src="https://github.com/identicons/aditi.png" width="100px;"/><br /><sub><b>Aditi Shastri</b></sub> | <img src="https://github.com/identicons/asish.png" width="100px;"/><br /><sub><b>Asish Kumar Yeleti</b></sub> |
| :---: | :---: | :---: |

Department of Information Science and Engineering<br>
R. V. College Of Engineering<br>
Bengaluru, India

</div>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic optimization problems
- ML model trained on thousands of real-world instances
- Built with modern web technologies and ML frameworks

---

<div align="center">
Made with ❤️ by the KnapsackML Team

[![Star History](https://img.shields.io/github/stars/noiseless47/knapsackml?style=social)](https://github.com/noiseless47/knapsackml/stargazers)
[![Fork](https://img.shields.io/github/forks/noiseless47/knapsackml?style=social)](https://github.com/noiseless47/knapsackml/network/members)
</div>