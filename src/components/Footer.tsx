import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Examples', href: '/examples' },
        { name: 'API', href: '/docs/api' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'GitHub', href: 'https://github.com/noiseless47/knapsack-ml' },
        { name: 'Discord', href: '#' },
        { name: 'Twitter', href: '#' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Team', href: '/about' },
        { name: 'Research', href: '/about/research' },
        { name: 'Contact', href: '/about/contact' },
      ],
    },
  ];

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Tagline */}
          <motion.div 
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  K
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Knapsack<span className="text-white">ML</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Next-generation knapsack solving with machine learning optimization techniques.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="https://github.com/noiseless47/knapsack-ml"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KnapsackML. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 