'use client';

import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition wrapper for smooth language switching
 * Prevents page "reverting" with smooth fade animations
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const locale = useLocale();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={locale}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
