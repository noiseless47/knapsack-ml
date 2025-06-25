'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Research() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };

  const approaches = [
    {
      name: "Machine Learning Models",
      description: "We've developed various supervised learning models (Random Forest, Gradient Boosting, Neural Networks) that learn from optimal solutions to predict item selections.",
      highlights: [
        "Feature engineering with statistical properties and value-to-weight ratios",
        "Gradient Boosting models achieved 92% accuracy in predicting optimal selections",
        "Ensemble techniques to improve generalization across problem instances"
      ],
      icon: "🧠"
    },
    {
      name: "Genetic Algorithms",
      description: "Our evolutionary computation approach evolves populations of solutions through selection, crossover, and mutation operations.",
      highlights: [
        "Customized fitness function with adaptive penalty for constraint violations",
        "Tournament selection with adaptive mutation rates",
        "Achieves over 90% of optimal solution quality across problem distributions"
      ],
      icon: "🧬"
    },
    {
      name: "Hybrid Approach",
      description: "Our novel hybrid methodology combines machine learning predictions with solution repair and local search optimization.",
      highlights: [
        "Solution repair ensures 100% feasibility while improving quality",
        "Local search systematically explores neighboring solutions",
        "Achieves up to 96.8% of optimal solution quality with minimal computational overhead"
      ],
      icon: "🔄"
    }
  ];

  const results = [
    {
      metric: "96.8%",
      description: "of optimal solution quality achieved by our hybrid approach on small instances"
    },
    {
      metric: "93.9%",
      description: "of optimal solution quality maintained even on large problem instances"
    },
    {
      metric: "Milliseconds",
      description: "to solve large instances that would take minutes or hours with exact methods"
    }
  ];

  const publications = [
    {
      title: "Approximating Solutions to the Knapsack Problem Using Machine Learning and Genetic Algorithms",
      authors: "Aaditya S Rao, Aditi Shastri, Asish Kumar Yeleti",
      status: "Under review - IEEE Transactions on Evolutionary Computation",
      year: "2023",
      abstract: "The knapsack problem is a classic combinatorial optimization challenge with applications across numerous domains. While traditional algorithms provide exact solutions, they often become computationally intensive for large problem instances. This paper presents multiple machine learning approaches to efficiently approximate optimal solutions to the knapsack problem. We explore the effectiveness of supervised learning models (Random Forest, Gradient Boosting, and Neural Networks) as well as evolutionary computation through Genetic Algorithms. Our hybrid approach combines ML predictions with solution repair mechanisms and local search optimization to maintain solution feasibility and quality. Experimental results demonstrate that our models achieve near-optimal solutions with significantly reduced computational overhead compared to exact algorithms."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-glow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Our <span className="text-gradient">Research</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Exploring the intersection of machine learning and combinatorial optimization 
                to develop efficient approximation algorithms for the knapsack problem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Research Overview */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                custom={0}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">Research Overview</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  The knapsack problem is a fundamental combinatorial optimization challenge with applications spanning 
                  finance, logistics, resource allocation, and computational biology. As problem sizes grow, traditional 
                  exact algorithms become computationally prohibitive, necessitating efficient approximation methods.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our research explores three complementary approaches to the knapsack problem: supervised machine learning,
                  genetic algorithms, and a novel hybrid methodology. By integrating predictions from machine learning models
                  with solution repair mechanisms and local search optimization, we achieve near-optimal solutions with 
                  significantly reduced computational overhead.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This work contributes to the growing field of learning-based approaches to combinatorial optimization,
                  with insights that may extend to other NP-hard problems where hybrid approaches could balance solution 
                  quality and computational efficiency.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {results.map((result, i) => (
                  <motion.div
                    key={i}
                    custom={i + 1}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-card p-6 rounded-xl text-center"
                  >
                    <h3 className="text-4xl font-bold text-gradient-alt mb-3">{result.metric}</h3>
                    <p className="text-gray-300">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Approaches */}
        <section className="py-20 relative bg-black">
          <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
          <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="text-gradient">Approaches</span>
              </h2>
              <p className="text-xl text-gray-300">
                We've developed multiple methodologies to solve the knapsack problem efficiently
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto space-y-12">
              {approaches.map((approach, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-xl"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
                      <div className="text-5xl">{approach.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{approach.name}</h3>
                      <p className="text-gray-300 mb-6">{approach.description}</p>
                      <ul className="space-y-2">
                        {approach.highlights.map((highlight, j) => (
                          <li key={j} className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            <span className="text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-gradient-alt">Publications</span>
                </h2>
                <p className="text-xl text-gray-300">
                  Our research contributions to the scientific community
                </p>
              </motion.div>

              <div className="space-y-8">
                {publications.map((pub, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-card p-8 rounded-xl"
                  >
                    <h3 className="text-2xl font-semibold mb-2">{pub.title}</h3>
                    <p className="text-purple-400 mb-1">{pub.authors}</p>
                    <p className="text-sm text-gray-400 mb-4">{pub.status} • {pub.year}</p>
                    <p className="text-gray-300 border-t border-white/10 pt-4">{pub.abstract}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                custom={3}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <a 
                  href="/papers/knapsack_ml_research.pdf" 
                  target="_blank" 
                  className="inline-block btn-gradient px-8 py-4 rounded-lg font-medium"
                >
                  Read Our Latest Paper
                </a>
                <a 
                  href="https://github.com/noiseless47/knapsack-ml/blob/main/paper.tex" 
                  target="_blank" 
                  className="inline-block ml-4 px-8 py-4 rounded-lg font-medium bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  View LaTeX Source
                </a>
                <p className="mt-4 text-gray-400 text-sm">
                  Full text access to our research publications
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Further Research */}
        <section className="py-20 relative bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                custom={0}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Future Directions</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Several promising directions for future research have emerged from our work:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Expanded Problem Variants</h3>
                    <p className="text-gray-300 mb-4">
                      Extending our approach to multiple knapsack and multidimensional knapsack problems, which appear
                      frequently in real-world applications but introduce additional constraints.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Reinforcement Learning</h3>
                    <p className="text-gray-300 mb-4">
                      Exploring reinforcement learning as an alternative to supervised learning, enabling agents to learn
                      effective solution policies through interaction with the problem environment.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Transfer Learning</h3>
                    <p className="text-gray-300 mb-4">
                      Developing transfer learning techniques to enable models trained on one problem distribution to adapt
                      to new distributions with minimal retraining, addressing distribution shift challenges.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Advanced Neural Architectures</h3>
                    <p className="text-gray-300 mb-4">
                      Integrating attention-based neural networks to improve feature extraction and enable end-to-end learning
                      directly from raw problem data, potentially eliminating manual feature engineering.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-8 md:p-12 rounded-2xl text-center"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Collaborate With <span className="text-gradient">Us</span>
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Interested in our research or have ideas for collaboration? We're open to partnerships with
                  academic institutions, research organizations, and industry professionals.
                </p>
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gradient px-8 py-3 inline-block"
                >
                  Contact Our Team
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 