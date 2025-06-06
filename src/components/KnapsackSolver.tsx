'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnapsackRequest, KnapsackSolution, SolverType } from '@/types/knapsack';
import NumberInput from './NumberInput';
import Select from './Select';

interface KnapsackSolverProps {
  onSolutionFound: (solution: KnapsackSolution) => void;
  initialValues?: {
    weights: number[];
    values: number[];
    capacity: number;
  };
}

const solverOptions = [
  { value: 'all' as SolverType, label: 'All Methods (Compare)' },
  { value: 'dp' as SolverType, label: 'Dynamic Programming (Optimal)' },
  { value: 'greedy' as SolverType, label: 'Greedy Algorithm' },
  { value: 'ml' as SolverType, label: 'Machine Learning' }
];

export default function KnapsackSolver({ onSolutionFound, initialValues }: KnapsackSolverProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<KnapsackRequest>({
    weights: initialValues?.weights || [],
    values: initialValues?.values || [],
    capacity: initialValues?.capacity || 0,
    solver_type: 'all'
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        weights: initialValues.weights,
        values: initialValues.values,
        capacity: initialValues.capacity
      }));
    }
  }, [initialValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'weights' || name === 'values') {
      // Handle array inputs - keep as string array initially
      const numberArray = value
        .split(',')
        .map(str => str.trim())
        .filter(str => str.length > 0);
      
      setFormData(prev => ({
        ...prev,
        [name]: numberArray
      }));
    } else {
      // Handle numeric inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (value: SolverType) => {
    setFormData(prev => ({
      ...prev,
      solver_type: value
    }));
  };

  const handleCapacityChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      capacity: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate arrays are not empty
    if (formData.weights.length === 0 || formData.values.length === 0) {
      setError('Please enter valid weights and values');
      setIsLoading(false);
      return;
    }

    // Ensure arrays have the same length
    if (formData.weights.length !== formData.values.length) {
      setError('Weights and values must have the same number of items');
      setIsLoading(false);
      return;
    }

    // Format the data - ensure arrays are properly formatted and converted to numbers
    const weights = Array.isArray(formData.weights) 
      ? formData.weights.map(w => parseFloat(String(w).trim()))
      : String(formData.weights).split(',').map(w => parseFloat(w.trim()));
    
    const values = Array.isArray(formData.values)
      ? formData.values.map(v => parseFloat(String(v).trim()))
      : String(formData.values).split(',').map(v => parseFloat(v.trim()));

    // Validate all values are valid numbers
    if (weights.some(isNaN) || values.some(isNaN)) {
      setError('All weights and values must be valid numbers');
      setIsLoading(false);
      return;
    }

    const requestData = {
      weights,
      values,
      capacity: parseFloat(String(formData.capacity)),
      solver_type: formData.solver_type
    };

    // Debug log
    console.log('Request data:', {
      ...requestData,
      weights_type: Array.isArray(requestData.weights) ? 'array' : typeof requestData.weights,
      values_type: Array.isArray(requestData.values) ? 'array' : typeof requestData.values,
      capacity_type: typeof requestData.capacity
    });

    try {
      const response = await fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(responseText || 'Failed to solve knapsack problem');
      }

      const solution = JSON.parse(responseText);
      console.log('Parsed solution:', solution);
      onSolutionFound(solution);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Problem Parameters</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Item Weights (comma-separated)
          </label>
          <input
            type="text"
            name="weights"
            value={formData.weights.join(',')}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="e.g., 2,3,4,5"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Item Values (comma-separated)
          </label>
          <input
            type="text"
            name="values"
            value={formData.values.join(',')}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="e.g., 3,4,5,6"
            required
          />
        </div>

        <NumberInput
          label="Knapsack Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleCapacityChange}
          min={0}
          step={0.1}
          placeholder="e.g., 10"
        />

        <Select
          label="Solver Method"
          name="solver_type"
          value={formData.solver_type}
          onChange={handleSelectChange}
          options={solverOptions}
        />

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-red-200"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white
            ${isLoading 
              ? 'bg-gray-800 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-white/10'
            } transition-all duration-200`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Solving...
            </div>
          ) : (
            'Solve Knapsack Problem'
          )}
        </motion.button>
      </form>
    </div>
  );
} 