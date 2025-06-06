'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnapsackSolver from '@/components/KnapsackSolver';
import ResultsVisualization from '@/components/ResultsVisualization';
import { KnapsackSolution } from '@/types/knapsack';

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [solution, setSolution] = useState<KnapsackSolution | null>(null);

  const examples = [
    {
      title: 'Small Instance',
      description: 'A simple example with 5 items to understand the basics.',
      weights: [2, 3, 4, 5, 6],
      values: [3, 4, 5, 6, 7],
      capacity: 10,
    },
    {
      title: 'Medium Instance',
      description: 'A moderate-sized problem showing algorithm performance differences.',
      weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
      capacity: 20,
    },
    {
      title: 'Large Instance',
      description: 'A challenging problem where ML shines.',
      weights: Array.from({ length: 20 }, (_, i) => i + 1),
      values: Array.from({ length: 20 }, (_, i) => (i + 1) * 2),
      capacity: 50,
    },
    {
      title: 'Tricky Case',
      description: 'A case where greedy algorithm performs poorly.',
      weights: [1, 2, 3, 4, 5],
      values: [5, 4, 3, 2, 1],
      capacity: 10,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            Example Problems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Explore different types of knapsack problems and see how various algorithms perform.
            Click on an example to load it into the solver.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedExample(index)}
                className={`
                  cursor-pointer p-6 rounded-xl border transition-all duration-200
                  ${selectedExample === index
                    ? 'bg-white/10 border-white/20 scale-105'
                    : 'bg-black/30 border-white/5 hover:bg-white/5'
                  }
                `}
              >
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{example.description}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-500">Weights: [{example.weights.join(', ')}]</p>
                  <p className="text-gray-500">Values: [{example.values.join(', ')}]</p>
                  <p className="text-gray-500">Capacity: {example.capacity}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedExample !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5">
                <KnapsackSolver
                  onSolutionFound={setSolution}
                  initialValues={{
                    weights: examples[selectedExample].weights,
                    values: examples[selectedExample].values,
                    capacity: examples[selectedExample].capacity,
                  }}
                />
              </div>

              <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5">
                {solution ? (
                  <ResultsVisualization solution={solution} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p className="text-center">
                      Click "Solve Knapsack Problem" to see results
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 