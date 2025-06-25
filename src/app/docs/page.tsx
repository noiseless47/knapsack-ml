'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Docs() {
  const [activeTab, setActiveTab] = useState<string>('getting-started');
  
  const sections = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'installation', name: 'Installation' },
    { id: 'api-reference', name: 'API Reference' },
    { id: 'examples', name: 'Code Examples' },
    { id: 'ml-training', name: 'ML Training' },
  ];

  const tabVariants = {
    inactive: { opacity: 0.6 },
    active: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <motion.div
            key="getting-started"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">Getting Started with KnapsackML</h2>
            <p>
              KnapsackML is a Python library that provides efficient solutions to the classic knapsack problem
              using both traditional algorithms and machine learning approaches. This guide will help you
              understand the basics and get started quickly.
            </p>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Quick Overview</h3>
              <p className="mb-4">
                The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with 
                a weight and a value, determine which items to include in a collection so that the total weight 
                is less than or equal to a given limit and the total value is as large as possible.
              </p>
              <p>
                KnapsackML offers three main approaches to solving this problem:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Dynamic Programming (optimal but slow for large instances)</li>
                <li>Greedy Algorithm (fast but sub-optimal)</li>
                <li>Machine Learning (near-optimal with fast inference)</li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Python 3.8 or higher</li>
                <li>Basic understanding of optimization problems</li>
                <li>Familiarity with NumPy and basic ML concepts (for ML approach)</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setActiveTab('installation')}
                className="btn-gradient"
              >
                Next: Installation Guide
              </button>
            </div>
          </motion.div>
        );
        
      case 'installation':
        return (
          <motion.div
            key="installation"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">Installation</h2>
            <p>
              Installing KnapsackML is straightforward with pip. The library has minimal dependencies for the core
              functionality, with optional dependencies for the ML components.
            </p>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Basic Installation</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  pip install knapsack-ml
                </pre>
              </div>
              <p className="mt-3">
                This will install the core library with traditional algorithms.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">With ML Components</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  pip install knapsack-ml[ml]
                </pre>
              </div>
              <p className="mt-3">
                This will install additional dependencies like PyTorch for the machine learning components.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">From Source</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  git clone https://github.com/noiseless47/knapsack-ml.git<br/>
                  cd knapsack-ml<br/>
                  pip install -e .
                </pre>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Verification</h3>
              <p>
                To verify your installation, run a simple test:
              </p>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto mt-3">
                <pre className="text-green-400 font-mono">
                  python -c "import knapsack; print(knapsack.__version__)"
                </pre>
              </div>
              <p className="mt-3">
                This should print the version of KnapsackML that you installed.
              </p>
            </div>
          </motion.div>
        );
        
      case 'api-reference':
        return (
          <motion.div
            key="api-reference"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            <p>
              This section provides a comprehensive reference for the KnapsackML API, including class
              and function descriptions, parameters, and return values.
            </p>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Core Module</h3>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-lg font-medium">solve_knapsack(weights, values, capacity, solver_type='all')</h4>
                  <p className="text-gray-400 mt-1">
                    Solves a knapsack problem using the specified solver type (or all solvers for comparison).
                  </p>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-purple-400">Parameters:</h5>
                    <ul className="text-sm text-gray-300 mt-1 space-y-1">
                      <li><span className="text-white">weights</span>: List[float] - Weights of the items</li>
                      <li><span className="text-white">values</span>: List[float] - Values of the items</li>
                      <li><span className="text-white">capacity</span>: float - Maximum capacity of the knapsack</li>
                      <li><span className="text-white">solver_type</span>: str - Type of solver ('all', 'dp', 'greedy', or 'ml')</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-purple-400">Returns:</h5>
                    <p className="text-sm text-gray-300 mt-1">
                      A dictionary containing solution information for each solver type.
                    </p>
                  </div>
                </div>
                
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-lg font-medium">KnapsackSolver</h4>
                  <p className="text-gray-400 mt-1">
                    Base class for all knapsack solvers.
                  </p>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-purple-400">Methods:</h5>
                    <ul className="text-sm text-gray-300 mt-1 space-y-1">
                      <li><span className="text-white">solve(weights, values, capacity)</span>: Solve the knapsack problem</li>
                      <li><span className="text-white">get_solution()</span>: Get the solution details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">ML Module</h3>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-lg font-medium">MLKnapsackSolver</h4>
                  <p className="text-gray-400 mt-1">
                    Machine learning-based knapsack solver.
                  </p>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-purple-400">Methods:</h5>
                    <ul className="text-sm text-gray-300 mt-1 space-y-1">
                      <li><span className="text-white">solve(weights, values, capacity)</span>: Solve using ML model</li>
                      <li><span className="text-white">train(dataset, epochs=100)</span>: Train the ML model</li>
                      <li><span className="text-white">save_model(path)</span>: Save the trained model</li>
                      <li><span className="text-white">load_model(path)</span>: Load a trained model</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'examples':
        return (
          <motion.div
            key="examples"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">Code Examples</h2>
            <p>
              The following examples demonstrate how to use KnapsackML for various scenarios.
            </p>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Basic Usage</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  {`import knapsack

# Define problem
weights = [10, 20, 30, 40, 50]
values = [60, 100, 120, 140, 160]
capacity = 100

# Solve using all available methods
result = knapsack.solve_knapsack(
    weights=weights,
    values=values,
    capacity=capacity,
    solver_type='all'
)

print(result)`}
                </pre>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Using the Dynamic Programming Solver</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  {`from knapsack.solver import DPKnapsackSolver

# Create solver
solver = DPKnapsackSolver()

# Define problem
weights = [10, 20, 30, 40, 50]
values = [60, 100, 120, 140, 160]
capacity = 100

# Solve
solver.solve(weights, values, capacity)
solution = solver.get_solution()

print(f"Selected items: {solution['selected_items']}")
print(f"Total value: {solution['total_value']}")
print(f"Total weight: {solution['total_weight']}")
print(f"Is feasible: {solution['is_feasible']}")`}
                </pre>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Using the ML Solver</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  {`from knapsack.solver import MLKnapsackSolver

# Create solver with a pre-trained model
solver = MLKnapsackSolver(model_path='path/to/model.pt')

# Define problem
weights = [10, 20, 30, 40, 50]
values = [60, 100, 120, 140, 160]
capacity = 100

# Solve
solver.solve(weights, values, capacity)
solution = solver.get_solution()

print(f"Solution: {solution}")
print(f"Inference time: {solution['solve_time']:.6f} seconds")`}
                </pre>
              </div>
            </div>
          </motion.div>
        );
        
      case 'ml-training':
        return (
          <motion.div
            key="ml-training"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">ML Training Guide</h2>
            <p>
              This guide explains how to train custom machine learning models for the knapsack problem
              using KnapsackML's training framework.
            </p>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Training Overview</h3>
              <p>
                KnapsackML uses a supervised learning approach to train models that can quickly predict near-optimal
                solutions for knapsack instances. The training process involves:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Generating a dataset of knapsack problems and their optimal solutions</li>
                <li>Training a neural network to predict item selection</li>
                <li>Evaluating the model on test instances</li>
                <li>Saving the trained model for future use</li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Training Code Example</h3>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto">
                <pre className="text-green-400 font-mono">
                  {`from knapsack.solver import MLKnapsackSolver
from knapsack.data import KnapsackDataset

# Generate training data
dataset = KnapsackDataset.generate(
    num_instances=1000,
    max_items=50,
    min_items=5,
    max_weight=100,
    max_value=100
)

# Create a new ML solver (without loading a pre-trained model)
solver = MLKnapsackSolver()

# Train the model
solver.train(
    dataset=dataset,
    epochs=100,
    batch_size=32,
    learning_rate=0.001,
    validation_split=0.2
)

# Save the trained model
solver.save_model('my_trained_model.pt')

# Test the model
test_dataset = KnapsackDataset.generate(num_instances=100)
accuracy, avg_value_ratio = solver.evaluate(test_dataset)
print(f"Test accuracy: {accuracy:.2f}")
print(f"Average value ratio to optimal: {avg_value_ratio:.2f}")`}
                </pre>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Model Architecture</h3>
              <p>
                KnapsackML uses a specialized neural network architecture designed for combinatorial optimization:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Input features include normalized weights, values, and capacity</li>
                <li>Multiple transformer layers to capture item interactions</li>
                <li>Binary classification head for item selection</li>
                <li>Post-processing to ensure feasibility of solutions</li>
              </ul>
              <p className="mt-3">
                You can customize the architecture by modifying the model parameters:
              </p>
              <div className="bg-black/40 p-4 rounded-lg overflow-auto mt-2">
                <pre className="text-green-400 font-mono">
                  {`solver = MLKnapsackSolver(
    hidden_dim=128,
    num_layers=4,
    num_heads=4,
    dropout=0.1
)`}
                </pre>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-10 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="text-gradient">Documentation</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Everything you need to know about using KnapsackML in your projects
              </p>
            </motion.div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-10 relative">
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto scrollbar-hide mb-10 pb-2 border-b border-white/10">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    variants={tabVariants}
                    initial="inactive"
                    animate={activeTab === section.id ? "active" : "inactive"}
                    whileHover={{ opacity: 1 }}
                    className={`
                      px-5 py-3 whitespace-nowrap text-lg font-medium
                      ${activeTab === section.id ? "text-white border-b-2 border-purple-500" : "text-gray-400"}
                    `}
                  >
                    {section.name}
                  </motion.button>
                ))}
              </div>

              {/* Content Area */}
              <div className="glass-effect p-8 min-h-[600px]">
                {renderContent()}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-effect p-8 md:p-12 rounded-2xl text-center"
              >
                <h2 className="text-3xl font-bold mb-4">
                  Ready to <span className="text-gradient-alt">Contribute</span>?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  KnapsackML is an open-source project. We welcome contributions from the community
                  to help improve the library for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/noiseless47/knapsack-ml"
                    target="_blank"
                    className="btn-gradient px-8 py-3"
                  >
                    GitHub Repository
                  </a>
                  <a
                    href="https://github.com/noiseless47/knapsack-ml/issues"
                    target="_blank"
                    className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Open Issues
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 