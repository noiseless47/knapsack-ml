'use client';

import { motion } from 'framer-motion';
import { KnapsackSolution, SolverResult } from '@/types/knapsack';

interface ResultsVisualizationProps {
  solution: KnapsackSolution;
}

const SolverCard = ({ name, result }: { name: string; result: SolverResult }) => {
  const solverColors = {
    'Dynamic Programming': 'from-green-500 to-emerald-700',
    'Greedy Algorithm': 'from-blue-500 to-indigo-700',
    'Machine Learning': 'from-purple-500 to-pink-700'
  };

  const nameMap = {
    'dp': 'Dynamic Programming',
    'greedy': 'Greedy Algorithm',
    'ml': 'Machine Learning'
  };

  const displayName = nameMap[name as keyof typeof nameMap] || name;
  const gradientColors = solverColors[displayName as keyof typeof solverColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl bg-gradient-to-br ${gradientColors} shadow-lg`}
    >
      <h3 className="text-xl font-bold mb-4">{displayName}</h3>
      <div className="space-y-2">
        <p className="text-white/90">
          Total Value: <span className="font-semibold">{result.total_value.toFixed(2)}</span>
        </p>
        <p className="text-white/90">
          Total Weight: <span className="font-semibold">{result.total_weight.toFixed(2)}</span>
        </p>
        {result.solve_time && (
          <p className="text-white/90">
            Solve Time: <span className="font-semibold">{(result.solve_time * 1000).toFixed(2)} ms</span>
          </p>
        )}
        <p className="text-white/90">
          Selected Items: <span className="font-semibold">{result.selected_items.join(', ')}</span>
        </p>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
          result.is_feasible ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
        }`}>
          {result.is_feasible ? '✓ Feasible' : '✗ Infeasible'}
        </div>
      </div>
    </motion.div>
  );
};

export default function ResultsVisualization({ solution }: ResultsVisualizationProps) {
  if (solution.status !== 'success') {
    return (
      <div className="p-6 rounded-xl bg-red-500/20 border border-red-500/50">
        <h3 className="text-xl font-bold text-red-200 mb-2">Error</h3>
        <p className="text-red-200/90">{solution.status}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Results</h2>
      
      <div className="grid gap-6">
        {Object.entries(solution.results).map(([solver, result]) => (
          <SolverCard key={solver} name={solver} result={result} />
        ))}
      </div>

      {Object.keys(solution.results).length > 1 && (
        <div className="mt-6 p-4 rounded-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-2">Comparison</h3>
          <p className="text-sm text-white/80">
            {solution.results.ml && solution.results.dp && (
              <>
                ML solution achieves {((solution.results.ml.total_value / solution.results.dp.total_value) * 100).toFixed(1)}% 
                of the optimal value
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
} 