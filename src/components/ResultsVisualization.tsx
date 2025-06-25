'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { KnapsackSolution, SolverResult } from '@/types/knapsack';

interface ResultsVisualizationProps {
  solution: KnapsackSolution;
}

export default function ResultsVisualization({ solution }: ResultsVisualizationProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  
  // Find the best solution by total value
  const algorithms = Object.keys(solution.results);
  const bestAlgorithm = algorithms.reduce((best, current) => {
    const bestResult = solution.results[best];
    const currentResult = solution.results[current];
    return currentResult.total_value > bestResult.total_value ? current : best;
  }, algorithms[0]);

  // Set the initially selected algorithm to be the best one
  useState(() => {
    if (!selectedAlgorithm) {
      setSelectedAlgorithm(bestAlgorithm);
    }
  });

  const currentResult = selectedAlgorithm 
    ? solution.results[selectedAlgorithm] 
    : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Format algorithm names for display
  const formatAlgorithmName = (name: string): string => {
    switch (name) {
      case 'dp':
        return 'Dynamic Programming';
      case 'greedy':
        return 'Greedy Algorithm';
      case 'ml':
        return 'Machine Learning';
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  // If no solution or no algorithms, show message
  if (!solution || algorithms.length === 0) {
    return <div className="text-center p-5 text-gray-400">No results to display.</div>;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Solution Results
        </h2>
        <p className="text-sm text-gray-400">
          Compare different algorithm solutions and performance.
        </p>
      </div>

      {/* Algorithm selection */}
      <div className="glass-effect overflow-hidden rounded-xl">
        <div className="flex overflow-x-auto scrollbar-hide">
          {algorithms.map((algo) => {
            const isBest = algo === bestAlgorithm;
            const isSelected = algo === selectedAlgorithm;
            
            return (
              <button
                key={algo}
                onClick={() => setSelectedAlgorithm(algo)}
                className={`
                  relative px-4 py-3 min-w-max flex flex-col items-center border-b-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-purple-500 text-white' 
                    : 'border-transparent hover:border-white/20 text-gray-400 hover:text-white'}
                `}
              >
                <div className="font-medium">{formatAlgorithmName(algo)}</div>
                <div className="text-xs mt-1 opacity-80">
                  Value: {solution.results[algo].total_value}
                </div>
                
                {isBest && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="absolute top-1 right-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                )}
                
                {isSelected && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/5 rounded-none pointer-events-none"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Selected algorithm details */}
        {currentResult && (
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <motion.div 
                variants={itemVariants}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="text-sm text-gray-400">Total Value</div>
                <div className="text-xl font-bold text-white mt-1">
                  {currentResult.total_value}
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="text-sm text-gray-400">Total Weight</div>
                <div className="text-xl font-bold text-white mt-1">
                  {currentResult.total_weight}
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="text-sm text-gray-400">Items Used</div>
                <div className="text-xl font-bold text-white mt-1">
                  {currentResult.selected_items.length}
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="text-sm text-gray-400">Solve Time</div>
                <div className="text-xl font-bold text-white mt-1">
                  {currentResult.solve_time ? `${currentResult.solve_time.toFixed(3)}s` : 'N/A'}
                </div>
              </motion.div>
            </div>

            {/* Selection visualization */}
            <motion.div variants={itemVariants}>
              <div className="text-sm font-medium text-gray-300 mb-3">Items Selection</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentResult.selection.map((isSelected, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      background: isSelected 
                        ? 'linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-lg
                      relative overflow-hidden border
                      ${isSelected 
                        ? 'border-purple-500/40' 
                        : 'border-white/10'}
                    `}
                  >
                    <div className="text-sm font-medium">Item {idx + 1}</div>
                    <div className="flex flex-col items-center mt-1">
                      <span className={`text-xs ${isSelected ? 'text-purple-300' : 'text-gray-400'}`}>
                        Value: {solution.request?.values[idx] || '?'}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-blue-300' : 'text-gray-400'}`}>
                        Weight: {solution.request?.weights[idx] || '?'}
                      </span>
                    </div>
                    {isSelected ? (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-1 right-1"
                        >
                          <svg 
                            className="w-4 h-4 text-purple-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        </motion.div>
                      </>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Comparison section */}
      <motion.div variants={itemVariants} className="glass-effect p-5 rounded-xl">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Algorithm Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2 text-sm text-gray-400 font-normal">Algorithm</th>
                <th className="text-left p-2 text-sm text-gray-400 font-normal">Value</th>
                <th className="text-left p-2 text-sm text-gray-400 font-normal">Weight</th>
                <th className="text-left p-2 text-sm text-gray-400 font-normal">Items</th>
                <th className="text-left p-2 text-sm text-gray-400 font-normal">Time</th>
              </tr>
            </thead>
            <tbody>
              {algorithms.map((algo, idx) => {
                const result = solution.results[algo];
                const isBest = algo === bestAlgorithm;
                
                return (
                  <motion.tr 
                    key={algo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={`
                      border-b border-white/5 hover:bg-white/5 cursor-pointer
                      ${isBest ? 'bg-white/5' : ''}
                    `}
                    onClick={() => setSelectedAlgorithm(algo)}
                  >
                    <td className="p-2 relative">
                      {isBest && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                      )}
                      <div className="font-medium text-sm">
                        {formatAlgorithmName(algo)}
                      </div>
                    </td>
                    <td className="p-2 font-medium text-sm">
                      {isBest ? (
                        <span className="text-gradient">
                          {result.total_value}
                        </span>
                      ) : result.total_value}
                    </td>
                    <td className="p-2 text-sm">{result.total_weight}</td>
                    <td className="p-2 text-sm">{result.selected_items.length}</td>
                    <td className="p-2 text-sm">
                      {result.solve_time ? `${result.solve_time.toFixed(3)}s` : 'N/A'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
} 