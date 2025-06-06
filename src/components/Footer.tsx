import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Resources',
      links: [
        { href: '/docs', label: 'Documentation' },
        { href: '/examples', label: 'Examples' },
        { href: '/api', label: 'API Reference' },
        { href: '/blog', label: 'Blog' },
      ],
    },
    {
      title: 'Community',
      links: [
        { href: '/discord', label: 'Discord' },
        { href: '/github', label: 'GitHub' },
        { href: '/twitter', label: 'Twitter' },
        { href: '/youtube', label: 'YouTube' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/careers', label: 'Careers' },
        { href: '/contact', label: 'Contact' },
        { href: '/privacy', label: 'Privacy' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-black/20 backdrop-blur-md border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-2xl font-bold text-white"
            >
              Knapsack<span className="text-gray-400">ML</span>
            </motion.div>
            <p className="text-gray-400 text-sm">
              Solve complex optimization problems with the power of machine learning.
              Our advanced algorithms help you find optimal solutions faster.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                    >
                      <motion.span className="inline-block relative">
                        {link.label}
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300 ease-out"
                          initial={false}
                        />
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} KnapsackML. All rights reserved.
            </motion.p>
            <div className="flex space-x-6">
              {['GitHub', 'Twitter', 'LinkedIn', 'Discord'].map((platform) => (
                <motion.a
                  key={platform}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  href={`#${platform.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
} 