'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll progress indicator
 * Creates a continuous visual connection as user scrolls
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}

