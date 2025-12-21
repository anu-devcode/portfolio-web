'use client';

import { useEffect } from 'react';

/**
 * Smooth scroll behavior component
 * Enhances scroll experience similar to Framer Awards
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll polyfill for better browser support
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.scrollBehavior = 'auto';
      }
    };
  }, []);

  return null;
}

