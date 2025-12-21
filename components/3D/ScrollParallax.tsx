'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
}

/**
 * Scroll-based parallax wrapper for 3D elements
 * Creates smooth parallax effect as user scrolls
 */
export default function ScrollParallax({ children, speed = 0.5 }: ScrollParallaxProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div style={{ transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

/**
 * 3D Object with scroll-based animation
 */
export function ScrollAnimated3D({ 
  children, 
  scrollSpeed = 0.5,
  rotationSpeed = 0.01 
}: { 
  children: React.ReactNode;
  scrollSpeed?: number;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.position.y = scrollY * scrollSpeed * 0.01;
    }
  });

  return <group ref={meshRef}>{children}</group>;
}

