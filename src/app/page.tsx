'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import KnapsackSolver from '@/components/KnapsackSolver';
import ResultsVisualization from '@/components/ResultsVisualization';
import { KnapsackSolution } from '@/types/knapsack';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [solution, setSolution] = useState<KnapsackSolution | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400"
          >
            ML-Based Knapsack Solver
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Solve the classic 0/1 Knapsack Problem using Machine Learning, Dynamic Programming, or Greedy approaches.
            Compare different solution methods and visualize their performance.
          </motion.p>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Solver Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5"
            >
              <KnapsackSolver onSolutionFound={setSolution} />
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/5"
            >
              {solution ? (
                <ResultsVisualization solution={solution} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p className="text-center">
                    Enter problem parameters and solve to see results and comparisons
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Fast inference using trained models, with solution quality between greedy and optimal.
              </p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 className="text-xl font-bold mb-3">Dynamic Programming</h3>
              <p className="text-gray-400">
                Guaranteed optimal solutions using classic DP approach, but slower for large instances.
              </p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 className="text-xl font-bold mb-3">Greedy Algorithm</h3>
              <p className="text-gray-400">
                Fast approximate solutions using value/weight ratios, suitable for large-scale problems.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
