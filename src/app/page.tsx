'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import KnapsackSolver from '@/components/KnapsackSolver';
import ResultsVisualization from '@/components/ResultsVisualization';
import { KnapsackSolution } from '@/types/knapsack';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Home() {
  const [solution, setSolution] = useState<KnapsackSolution | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 300);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse-glow"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          
          <motion.div
            style={{ y }}
            className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-purple-400"
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
            className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-blue-400"
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
            className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-cyan-400"
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center max-w-5xl mx-auto"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="text-gradient">KnapsackML</span> 
                <br />
                <span className="text-4xl md:text-6xl lg:text-7xl">Next-Gen Optimization</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants} 
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12"
              >
                Harness the power of machine learning to solve complex knapsack problems faster and more efficiently than ever before
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/examples" className="btn-gradient px-8 py-3 text-lg">
                  Explore Examples
                </Link>
                <Link 
                  href="#solver" 
                  className="px-8 py-3 text-lg border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                >
                  Try It Now
                </Link>
              </motion.div>
              
              {/* Animated Arrow */}
              <motion.div 
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  delay: 2,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-dot-pattern"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Cutting Edge <span className="text-gradient">Features</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  Our platform combines traditional algorithms with machine learning to deliver unparalleled performance
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Machine Learning",
                    description: "Trained models deliver near-optimal solutions at a fraction of the computational cost",
                    icon: "🧠",
                    delay: 0
                  },
                  {
                    title: "Algorithm Comparison",
                    description: "Compare different approaches side by side and visualize performance differences",
                    icon: "📊",
                    delay: 0.1
                  },
                  {
                    title: "Interactive Interface",
                    description: "User-friendly controls make it easy to configure and solve complex problems instantly",
                    icon: "🔧",
                    delay: 0.2
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Solver Section */}
        <section id="solver" className="py-20 relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Try <span className="text-gradient-alt">Knapsack Solver</span> Now
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  Configure your problem parameters and compare different solution approaches
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-8">
                {/* Solver Form */}
                <div className="glass-effect p-6">
                  <KnapsackSolver onSolutionFound={setSolution} />
                </div>
                
                {/* Results */}
                <div className="glass-effect p-6">
                  {solution ? (
                    <ResultsVisualization solution={solution} />
                  ) : (
                    <div className="h-full flex items-center justify-center flex-col text-center p-8">
                      <div className="text-6xl mb-4 animate-pulse">✨</div>
                      <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
                      <p className="text-gray-400">
                        Configure your knapsack problem parameters and click "Solve" to see results here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to <span className="text-gradient">Optimize</span>?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Take your optimization problems to the next level with our cutting-edge algorithms and intuitive interface
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/docs" className="btn-gradient px-8 py-3 text-lg">
                    Read the Docs
                  </Link>
                  <Link
                    href="https://github.com/noiseless47/knapsack-ml"
                    target="_blank"
                    className="px-8 py-3 text-lg border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                  >
                    GitHub Repository
                  </Link>
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
