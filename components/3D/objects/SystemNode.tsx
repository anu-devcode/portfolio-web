'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface SystemNodeProps {
  position?: [number, number, number];
  size?: number;
  opacity?: number;
}

/**
 * System node - abstract connection point
 * Minimal dot representing system nodes
 */
export default function SystemNode({
  position = [0, 0, 0],
  size = 0.15,
  opacity = 0.4,
}: SystemNodeProps) {
  const meshRef = useRef<Mesh>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0] * 10) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  // Theme-aware color - darker for light mode visibility
  const color = isLight ? '#1e3a8a' : '#00f0ff';

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        color={color}
      />
    </mesh>
  );
}

