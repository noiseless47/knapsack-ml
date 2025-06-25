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
  name?: string;
  precision?: number;
  className?: string;
}

export default function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  placeholder,
  label,
  name,
  precision = 0,
  className = ''
}: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(Number(numValue));
    }
  };

  const increment = () => {
    const newValue = Math.min(max, value + step);
    onChange(Number(newValue));
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(Number(newValue));
  };

  const buttonVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.05, opacity: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
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

        <div className="relative flex-1">
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
            className={`w-full px-3 py-2 rounded-lg bg-black/30 border ${
              isFocused ? 'border-purple-500/50' : 'border-white/10'
            } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200 pr-20`}
          />
          
          <div className="absolute right-1 inset-y-1 flex">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="button"
              onClick={decrement}
              className="px-2 py-1 rounded-l-md bg-black/50 text-white border border-white/10 backdrop-blur-sm"
            >
              −
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="button"
              onClick={increment}
              className="px-2 py-1 rounded-r-md bg-black/50 text-white border-y border-r border-white/10 backdrop-blur-sm"
            >
              +
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 