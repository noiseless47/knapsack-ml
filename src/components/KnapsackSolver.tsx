'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KnapsackSolution, SolverType } from '@/types/knapsack';
import NumberInput from '@/components/NumberInput';
import Select from '@/components/Select';

interface Item {
  id: number;
  weight: number;
  value: number;
}

interface KnapsackSolverProps {
  onSolutionFound: (solution: KnapsackSolution) => void;
  initialItems?: Item[];
  initialCapacity?: number;
  exampleId?: number;
}

export default function KnapsackSolver({ 
  onSolutionFound, 
  initialItems, 
  initialCapacity, 
  exampleId = -1 
}: KnapsackSolverProps) {
  const [items, setItems] = useState<Item[]>(
    initialItems || [
      { id: 0, weight: 10, value: 60 },
      { id: 1, weight: 20, value: 100 },
      { id: 2, weight: 30, value: 120 },
    ]
  );
  const [capacity, setCapacity] = useState<number>(initialCapacity || 50);
  const [solverType, setSolverType] = useState<SolverType>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update items and capacity when example changes
  useEffect(() => {
    if (initialItems && initialCapacity) {
      setItems(initialItems);
      setCapacity(initialCapacity);
    }
  }, [initialItems, initialCapacity, exampleId]);

  const animatePresenceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const addItem = useCallback(() => {
    setItems(prevItems => [
      ...prevItems, 
      { 
        id: prevItems.length, 
        weight: Math.floor(Math.random() * 30) + 5, 
        value: Math.floor(Math.random() * 100) + 50 
      }
    ]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateItemValue = useCallback((id: number, value: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, value } : item
      )
    );
  }, []);

  const updateItemWeight = useCallback((id: number, weight: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, weight } : item
      )
    );
  }, []);

  const handleSolve = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Change API endpoint to use the actual Python backend
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weights: items.map(item => item.weight),
          values: items.map(item => item.value),
          capacity: capacity,
          solver_type: solverType,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: KnapsackSolution = await response.json();
      onSolutionFound(data);
    } catch (err) {
      console.error('Failed to solve knapsack problem:', err);
      setError('Failed to solve the problem. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomItems = () => {
    const numItems = Math.floor(Math.random() * 5) + 5; // 5-10 items
    const newItems: Item[] = [];
    
    for (let i = 0; i < numItems; i++) {
      newItems.push({
        id: i,
        weight: Math.floor(Math.random() * 30) + 5, // 5-35
        value: Math.floor(Math.random() * 150) + 50, // 50-200
      });
    }
    
    setItems(newItems);
    setCapacity(Math.floor(Math.random() * 100) + 50); // 50-150
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animatePresenceVariants}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Knapsack Parameters
        </h2>
        <p className="text-sm text-gray-400">
          Configure your problem instance below or generate a random one.
        </p>
      </div>

      {/* Knapsack Capacity */}
      <div className="glass-effect p-4 rounded-xl">
        <label className="block text-lg font-semibold text-white mb-2">
          Knapsack Capacity
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <NumberInput
              value={capacity}
              onChange={setCapacity}
              min={1}
              className="w-full"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateRandomItems}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Random
          </motion.button>
        </div>
      </div>

      {/* Solver Type */}
      <div className="glass-effect p-4 rounded-xl solver-type-container">
        <label className="block text-lg font-semibold text-white mb-2">
          Solver Type
        </label>
        <Select
          value={solverType}
          onChange={(value) => setSolverType(value as SolverType)}
          options={[
            { value: 'all', label: 'Compare All' },
            { value: 'dp', label: 'Dynamic Programming' },
            { value: 'greedy', label: 'Greedy Algorithm' },
            { value: 'ml', label: 'Machine Learning' },
          ]}
          className="w-full"
        />
      </div>

      {/* Items */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-lg font-semibold text-white">
            Items ({items.length})
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addItem}
            className="text-sm bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded-lg transition-all duration-200"
          >
            + Add Item
          </motion.button>
        </div>
        
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 pb-1">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 p-3 bg-black/30 rounded-lg group border border-white/5"
            >
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white text-base font-bold shrink-0 border border-purple-500/40">
                {index + 1}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full"></span>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white font-medium mb-1">Value</label>
                  <NumberInput
                    value={item.value}
                    onChange={(value) => updateItemValue(item.id, value)}
                    min={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white font-medium mb-1">Weight</label>
                  <NumberInput
                    value={item.weight}
                    onChange={(value) => updateItemWeight(item.id, value)}
                    min={1}
                    className="w-full"
                  />
                </div>
              </div>
              
              {items.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove item"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Solve Button */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSolve}
          disabled={isLoading}
          className="w-full btn-gradient flex items-center justify-center py-3 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Solving...
            </>
          ) : (
            'Solve Knapsack Problem'
          )}
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
} 