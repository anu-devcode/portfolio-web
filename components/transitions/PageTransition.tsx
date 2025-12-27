'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Enhanced page transition wrapper
 * Creates smooth, calm transitions between pages and language changes
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const key = `${locale}-${pathname}`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1], // Calm, smooth easing
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
