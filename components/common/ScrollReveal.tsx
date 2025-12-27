'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  amount?: number;
}

/**
 * Enhanced scroll reveal animation component
 * Creates calm, continuous reveal animations
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount, margin: '-50px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: direction === 'fade' ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Calm, smooth easing
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

