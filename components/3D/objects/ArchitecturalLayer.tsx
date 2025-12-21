'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface ArchitecturalLayerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  opacity?: number;
}

/**
 * Abstract architectural layer - represents system layers
 * Minimal, professional grid plane
 */
export default function ArchitecturalLayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 10,
  opacity = 0.15,
}: ArchitecturalLayerProps) {
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
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Theme-aware color - darker for light mode visibility
  const color = isLight ? '#1e3a8a' : '#00f0ff';

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[size, size, 32, 32]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        color={color}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

