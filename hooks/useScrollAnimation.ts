'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook for scroll-based animations
 * Triggers animations when element enters viewport
 */
export function useScrollAnimation(options?: {
  threshold?: number;
  triggerOnce?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: options?.triggerOnce ?? false,
    amount: options?.threshold ?? 0.3,
  });

  return { ref, isInView };
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

/**
 * Hook for smooth scroll reveal
 */
export function useScrollReveal() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, revealed };
}

