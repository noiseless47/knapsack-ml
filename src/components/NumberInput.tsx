import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  label?: string;
  name: string;
  precision?: number;
}

export default function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 0.1,
  placeholder,
  label,
  name,
  precision = 1
}: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value.toFixed(precision));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value.toFixed(precision));
  }, [value, precision]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(Number(numValue.toFixed(precision)));
    }
  };

  const increment = () => {
    const newValue = Math.min(max, value + step);
    onChange(Number(newValue.toFixed(precision)));
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(Number(newValue.toFixed(precision)));
  };

  const buttonVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.05, opacity: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="space-y-2">
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
        className="relative flex items-center"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <style jsx global>{`
          /* Hide browser arrows for number input */
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}</style>

        <motion.div
          className="relative flex-1"
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <input
            type="number"
            name={name}
            value={localValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300 pr-20"
          />
          
          <motion.div
            className="absolute right-1 inset-y-1 flex"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="button"
              onClick={decrement}
              className="px-2 py-1 rounded-l-md bg-black/30 text-white border border-white/10 backdrop-blur-sm"
            >
              <motion.span
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                −
              </motion.span>
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="button"
              onClick={increment}
              className="px-2 py-1 rounded-r-md bg-black/30 text-white border-y border-r border-white/10 backdrop-blur-sm"
            >
              <motion.span
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 