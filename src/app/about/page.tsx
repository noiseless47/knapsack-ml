'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
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
  }

  const team = [
    {
      name: 'Aaditya S Rao',
      role: 'Full-Stack Developer',
      bio: 'Develops the web platform and API integrations, creating intuitive visualizations for optimization processes. Leads the user experience design.',
      image: 'https://github.com/identicons/aaditya.png'
    },
    {
      name: 'Aditi Shastri',
      role: 'Algorithm Designer',
      bio: 'Expert in optimization algorithms with focus on genetic algorithms and local search techniques. Responsible for the hybrid solution repair mechanisms.',
      image: 'https://github.com/identicons/aditi.png'
    },
    {
      name: 'Asish Kumar Yeleti',
      role: 'ML Architect',
      bio: 'Specializes in machine learning for combinatorial optimization with expertise in ensemble methods and neural networks. Leads the KnapsackML research initiative.',
      image: 'https://github.com/identicons/asish.png'
    }
  ]

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
                About <span className="text-gradient">KnapsackML</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                We're a dedicated team from the Department of Information Science and Engineering at R. V. College of Engineering,
                working at the intersection of operations research and machine learning to solve complex optimization problems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  custom={0}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    KnapsackML aims to democratize access to advanced optimization techniques 
                    that traditionally required specialized knowledge. By integrating machine 
                    learning with classic algorithms, we're creating tools that are more efficient, 
                    more accessible, and easier to use.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Our research focuses on developing machine learning models and genetic algorithms 
                    that can learn from optimal solution patterns and approximate them with near-instant inference times,
                    making complex optimization practical for time-sensitive applications.
                    <a href="/about/research" className="text-purple-400 hover:text-purple-300 ml-1 font-medium hover:underline">
                      Learn more about our research &rarr;
                    </a>
                  </p>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl overflow-hidden"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white">Vision</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Where We're Headed</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">●</span>
                        <span>Expanding our ML models to handle multi-constraint problems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">●</span>
                        <span>Building enterprise-scale optimization solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">●</span>
                        <span>Pioneering research in transferable optimization learning</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Meet Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-xl text-gray-300">
                The brilliant minds behind KnapsackML
              </p>
              <p className="text-md text-gray-400 mt-2">
                Department of Information Science and Engineering, R. V. College of Engineering
              </p>
            </motion.div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="glass-card overflow-hidden"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-purple-400 mb-4">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-8 md:p-12 rounded-2xl"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Get in <span className="text-gradient-alt">Touch</span>
                </h2>
                <p className="text-gray-300 text-center mb-8">
                  Interested in our research or have questions about implementing our solutions?
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-gradient px-8 py-3"
                    >
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 