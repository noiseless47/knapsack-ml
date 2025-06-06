# 🎒 KnapsackML

<div align="center">

![KnapsackML Logo](https://img.shields.io/badge/🎒-KnapsackML-00C853?style=for-the-badge)

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-modern-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Machine Learning](https://img.shields.io/badge/ML-Powered-FF69B4?style=flat-square&logo=tensorflow)](https://scikit-learn.org/)

*A modern, ML-powered approach to solving the classic Knapsack Problem*

[Demo](#demo) • [Features](#✨-features) • [Installation](#🚀-installation) • [Usage](#💡-usage) • [Documentation](#📚-documentation)

</div>

## 🌟 Overview

KnapsackML is a cutting-edge implementation of the classic Knapsack Problem, combining traditional algorithms with machine learning to provide fast, efficient solutions. Our platform offers a beautiful web interface for solving knapsack problems with three different approaches:

- 🎯 **Dynamic Programming** (Optimal Solution)
- 🚀 **Greedy Algorithm** (Fast Approximation)
- 🧠 **Machine Learning** (Smart Heuristic)

## ✨ Features

- **Multi-Algorithm Support**
  - Dynamic Programming for optimal solutions
  - Greedy Algorithm for quick approximations
  - ML-powered solver for intelligent heuristics

- **Modern Web Interface**
  - Sleek, responsive design
  - Real-time solution visualization
  - Interactive problem input
  - Performance comparison charts

- **Advanced ML Capabilities**
  - Pre-trained on thousands of knapsack instances
  - Achieves ~90% of optimal solution quality
  - Significantly faster than exact methods
  - Automatic solution repair for feasibility

- **Developer-Friendly**
  - RESTful API with FastAPI
  - TypeScript/React frontend
  - Comprehensive documentation
  - Easy-to-extend architecture

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/knapsackml.git
cd knapsackml

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
```

## 💡 Usage

### Starting the Backend

```bash
# From the root directory
uvicorn knapsack.api:app --reload
```

### Starting the Frontend

```bash
# From the frontend directory
npm run dev
```

Visit `http://localhost:3000` to access the web interface.

### API Example

```python
import requests

# Define your knapsack problem
data = {
    "weights": [2, 3, 4, 5],
    "values": [3, 4, 5, 6],
    "capacity": 10,
    "solver_type": "all"  # Try "dp", "greedy", "ml", or "all"
}

# Get the solution
response = requests.post("http://localhost:8000/solve", json=data)
solution = response.json()
```

## 📊 Performance Comparison

| Solver Type | Solution Quality | Speed | Memory Usage |
|-------------|-----------------|-------|--------------|
| Dynamic Programming | 100% (Optimal) | Slow (O(nW)) | High |
| Greedy Algorithm | ~80-90% | Very Fast (O(n log n)) | Low |
| Machine Learning | ~90% | Instant (O(1)) | Medium |

## 🧪 Example Problems

1. **Basic Example**
   - 5 items to understand the basics
   - Weights: [2, 3, 4, 5, 6]
   - Values: [3, 4, 5, 6, 7]
   - Capacity: 10

2. **Moderate Problem**
   - 10 items showing algorithm differences
   - Weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   - Values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
   - Capacity: 20

3. **ML Showcase**
   - 20 items where ML shines
   - See `examples/` directory for data

## 📚 Documentation

- [API Documentation](http://localhost:8000/docs)
- [Algorithm Details](./docs/algorithms.md)
- [ML Model Architecture](./docs/ml_model.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic optimization problems
- ML model trained on thousands of real-world instances
- Built with modern web technologies and ML frameworks

---

<div align="center">
Made with ❤️ by Asish Kumar Yeleti

[![Star History](https://img.shields.io/github/stars/yourusername/knapsackml?style=social)](https://github.com/yourusername/knapsackml/stargazers)
[![Follow](https://img.shields.io/github/followers/yourusername?style=social)](https://github.com/yourusername)
</div>
