'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Toggle between light and dark (not system)
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (!mounted) {
    // Return a placeholder to prevent hydration mismatch
    return (
      <div className="p-2 rounded-full border border-cyan-400/30 w-[36px] h-[36px] flex items-center justify-center">
        <Moon className="w-4 h-4 text-gray-300" />
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full border border-cyan-400/30 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all relative overflow-hidden"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="w-4 h-4 text-cyan-400" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
