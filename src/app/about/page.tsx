'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead ML Researcher',
      description: 'Expert in deep learning and optimization algorithms.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Senior Software Engineer',
      description: 'Full-stack developer with expertise in scalable systems.',
      image: '/team/alex.jpg'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Algorithm Specialist',
      description: 'PhD in Operations Research, focusing on combinatorial optimization.',
      image: '/team/james.jpg'
    },
    {
      name: 'Emily Zhang',
      role: 'UI/UX Designer',
      description: 'Creating beautiful and intuitive user experiences.',
      image: '/team/emily.jpg'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About KnapsackML</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're combining cutting-edge machine learning with classical algorithms
              to solve complex optimization problems faster and more efficiently.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/5 mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-400">
                  Pushing the boundaries of what's possible in optimization by combining
                  traditional algorithms with modern machine learning approaches.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-gray-400">
                  Making advanced optimization techniques accessible to everyone
                  through intuitive interfaces and clear documentation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Impact</h3>
                <p className="text-gray-400">
                  Helping businesses and researchers solve real-world optimization
                  problems more efficiently and effectively.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-white/5"
                >
                  <div className="aspect-square rounded-lg bg-gray-800 mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Have questions about our technology or interested in collaboration?
              We'd love to hear from you.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 