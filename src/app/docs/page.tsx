'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      content: `The Knapsack Problem is a classic optimization challenge where you need to select items with given weights and values to maximize total value while staying within a weight capacity limit. Our solver provides multiple approaches to tackle this problem.`,
    },
    {
      title: 'Machine Learning Approach',
      content: `Our ML model has been trained on millions of knapsack problem instances to learn optimal solution patterns. It uses a deep neural network architecture that combines graph neural networks for item relationship understanding and transformer layers for global context.`,
    },
    {
      title: 'Dynamic Programming Solution',
      content: `The dynamic programming approach guarantees optimal solutions by systematically building up solutions for larger subproblems. It creates a table of optimal values for all possible capacities and item combinations, with time complexity O(nW) where n is the number of items and W is the capacity.`,
    },
    {
      title: 'Greedy Algorithm',
      content: `The greedy approach sorts items by their value-to-weight ratio and selects items in descending order until the capacity is reached. While not guaranteed to find the optimal solution, it's very fast with O(n log n) time complexity and often produces good approximations.`,
    },
    {
      title: 'API Reference',
      content: `Our REST API allows you to solve knapsack problems programmatically. Send a POST request to /api/solve with your problem instance in JSON format. The response includes solutions from all available methods, along with performance metrics and solution quality indicators.`,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            Documentation
          </motion.h1>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5"
              >
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-black/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5"
          >
            <h3 className="text-xl font-semibold mb-4">API Example</h3>
            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-300">
{`// Example API request
const response = await fetch('https://api.knapsackml.com/solve', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 6],
    capacity: 10,
    solver_type: 'all'
  })
});

const solution = await response.json();`}
              </code>
            </pre>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 