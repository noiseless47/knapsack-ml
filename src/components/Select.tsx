import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  name: string;
}

export default function Select<T extends string>({
  options,
  value,
  onChange,
  label,
  name
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    if (option) {
      setSelectedLabel(option.label);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    }),
    exit: { opacity: 0, x: -10 }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <AnimatePresence>
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="block text-sm font-medium text-gray-400"
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setIsFocused(!isOpen);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !isOpen && setIsFocused(false)}
          className={`
            w-full px-4 py-2 rounded-lg border text-white
            transition-all duration-300 flex items-center justify-between
            ${isFocused
              ? 'bg-black/30 border-white/20 ring-1 ring-white/20'
              : 'bg-black/20 border-white/5 hover:bg-black/25'
            }
          `}
        >
          <span className="block truncate">{selectedLabel}</span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-white' : 'text-gray-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute z-10 w-full mt-1 bg-black/90 border border-white/10 rounded-lg shadow-xl overflow-hidden backdrop-blur-lg"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-h-60 overflow-auto"
              >
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    custom={index}
                    variants={optionVariants}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full px-4 py-2 text-left text-white transition-all duration-300
                      ${option.value === value
                        ? 'bg-white/10'
                        : 'hover:bg-white/5'
                      }
                    `}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
} 