'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Section transition wrapper
 * Creates seamless flow between sections with subtle parallax
 */
export default function SectionTransition({ children, className = '' }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax effect for depth
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

