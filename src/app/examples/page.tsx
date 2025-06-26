'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnapsackSolver from '@/components/KnapsackSolver';
import ResultsVisualization from '@/components/ResultsVisualization';
import { KnapsackSolution } from '@/types/knapsack';

interface Item {
  id: number;
  weight: number;
  value: number;
}

interface ExampleProblem {
  title: string;
  description: string;
  difficulty: string;
  items: Item[];
  capacity: number;
}

export default function Examples() {
  const [activeExample, setActiveExample] = useState<number>(0);
  const [solution, setSolution] = useState<KnapsackSolution | null>(null);

  // Example problems with predefined data
  const examples: ExampleProblem[] = [
    {
      title: "Small Knapsack",
      description: "A simple knapsack problem with 5 items, demonstrating the basics of the algorithm.",
      difficulty: "Beginner",
      items: [
        { id: 0, weight: 10, value: 60 },
        { id: 1, weight: 20, value: 100 },
        { id: 2, weight: 30, value: 120 },
        { id: 3, weight: 15, value: 80 },
        { id: 4, weight: 25, value: 110 }
      ],
      capacity: 50
    },
    {
      title: "Medium Capacity",
      description: "A more challenging problem with 10 items and medium capacity constraints.",
      difficulty: "Intermediate",
      items: [
        { id: 0, weight: 5, value: 50 },
        { id: 1, weight: 10, value: 60 },
        { id: 2, weight: 15, value: 90 },
        { id: 3, weight: 20, value: 120 },
        { id: 4, weight: 25, value: 150 },
        { id: 5, weight: 30, value: 170 },
        { id: 6, weight: 8, value: 75 },
        { id: 7, weight: 12, value: 80 },
        { id: 8, weight: 18, value: 100 },
        { id: 9, weight: 22, value: 130 }
      ],
      capacity: 80
    },
    {
      title: "High-Value Items",
      description: "Problem with varied value-to-weight ratios to test algorithm efficiency.",
      difficulty: "Advanced",
      items: [
        { id: 0, weight: 10, value: 500 },
        { id: 1, weight: 20, value: 100 },
        { id: 2, weight: 30, value: 300 },
        { id: 3, weight: 40, value: 350 },
        { id: 4, weight: 50, value: 400 },
        { id: 5, weight: 5, value: 70 },
        { id: 6, weight: 15, value: 250 },
      ],
      capacity: 100
    },
    {
      title: "Large-Scale Optimization",
      description: "A complex example with many items to demonstrate ML advantage at scale.",
      difficulty: "Expert",
      items: [
        { id: 0, weight: 10, value: 100 },
        { id: 1, weight: 15, value: 150 },
        { id: 2, weight: 20, value: 180 },
        { id: 3, weight: 25, value: 200 },
        { id: 4, weight: 30, value: 250 },
        { id: 5, weight: 5, value: 80 },
        { id: 6, weight: 12, value: 120 },
        { id: 7, weight: 18, value: 160 },
        { id: 8, weight: 22, value: 190 },
        { id: 9, weight: 28, value: 220 },
        { id: 10, weight: 14, value: 140 },
        { id: 11, weight: 16, value: 155 },
        { id: 12, weight: 24, value: 195 },
        { id: 13, weight: 32, value: 260 },
        { id: 14, weight: 9, value: 90 }
      ],
      capacity: 150
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          <div className="absolute -bottom-20 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Example <span className="text-gradient">Problems</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Explore pre-configured knapsack problems to see how different algorithms perform
              </p>
            </motion.div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="py-10 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Select an Example Problem
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {examples.map((example, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`
                        glass-card cursor-pointer p-5 relative overflow-hidden
                        ${activeExample === index ? 'ring-2 ring-purple-500' : ''}
                      `}
                      onClick={() => setActiveExample(index)}
                    >
                      <div className="absolute top-0 left-0 w-full h-1">
                        <div 
                          className={`h-full ${
                            index === 0 ? 'bg-green-500' : 
                            index === 1 ? 'bg-blue-500' : 
                            index === 2 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                        />
                      </div>
                      <h3 className="text-lg font-medium mb-2">{example.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{example.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                          {example.difficulty}
                        </span>
                        {activeExample === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-purple-500"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Solution Area */}
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-8">
                {/* Solver Form */}
                <motion.div
                  variants={itemVariants}
                  className="glass-effect p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gradient">
                      {examples[activeExample].title}
                    </h3>
                    <span className={`
                      text-xs font-medium px-2 py-1 rounded-full
                      ${activeExample === 0 ? 'bg-green-500/20 text-green-300' : 
                        activeExample === 1 ? 'bg-blue-500/20 text-blue-300' : 
                        activeExample === 2 ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-red-500/20 text-red-300'}
                    `}>
                      {examples[activeExample].difficulty}
                    </span>
                  </div>
                  <KnapsackSolver 
                    onSolutionFound={setSolution}
                    initialItems={examples[activeExample].items}
                    initialCapacity={examples[activeExample].capacity}
                    exampleId={activeExample}
                  />
                </motion.div>
                
                {/* Results */}
                <motion.div
                  variants={itemVariants}
                  className="glass-effect p-6"
                >
                  {solution ? (
                    <ResultsVisualization solution={solution} />
                  ) : (
                    <div className="h-full flex items-center justify-center flex-col text-center p-8">
                      <div className="text-6xl mb-4 animate-pulse">📊</div>
                      <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
                      <p className="text-gray-400">
                        Configure your knapsack problem parameters and click "Solve" to see results here
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Comparison */}
        <section className="py-20 relative">
          <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">
                  Algorithm <span className="text-gradient-alt">Comparison</span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Understanding the tradeoffs between different approaches
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Dynamic Programming",
                    pros: ["Guarantees optimal solution", "Well-understood algorithm", "Predictable performance"],
                    cons: ["Slow for large instances", "Memory intensive", "O(nW) complexity"],
                    icon: "🧮"
                  },
                  {
                    title: "Greedy Algorithm",
                    pros: ["Very fast execution", "Low memory usage", "Simple implementation"],
                    cons: ["Suboptimal solutions", "Performance varies by problem", "Can miss better solutions"],
                    icon: "⚡"
                  },
                  {
                    title: "Machine Learning",
                    pros: ["Near-instant inference", "Scales well to large problems", "Learns from previous solutions"],
                    cons: ["Training overhead", "Quality depends on training data", "Not guaranteed optimal"],
                    icon: "🧠"
                  }
                ].map((algo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <div className="text-4xl mb-4">{algo.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{algo.title}</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-green-400 mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {algo.pros.map((pro, j) => (
                          <li key={j} className="text-sm text-gray-300 flex items-start">
                            <span className="text-green-500 mr-2">✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">Limitations</h4>
                      <ul className="space-y-1">
                        {algo.cons.map((con, j) => (
                          <li key={j} className="text-sm text-gray-300 flex items-start">
                            <span className="text-red-500 mr-2">✗</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect p-8 md:p-12 rounded-2xl"
              >
                <h2 className="text-3xl font-bold mb-4">
                  Ready to <span className="text-gradient">Implement</span>?
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Dive deeper into implementation details and learn how to use our API in your own projects
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/docs"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-gradient px-8 py-3"
                  >
                    View Documentation
                  </motion.a>
                  <motion.a
                    href="https://github.com/noiseless47/knapsack-ml"
                    target="_blank"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                  >
                    GitHub Repository
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
} 