'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface LanguageTransitionProps {
  children: ReactNode;
}

/**
 * Smooth language transition wrapper
 * Provides fade animations when language changes
 */
export default function LanguageTransition({ children }: LanguageTransitionProps) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {/* Loading overlay during transition */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/80 via-charcoal-800/80 to-charcoal-900/80 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-strong rounded-2xl p-6 border border-cyan-400/30"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
                  />
                  <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
                    Switching Language...
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with smooth fade transition */}
      <motion.div
        key={locale}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

