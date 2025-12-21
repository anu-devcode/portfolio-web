'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface ArchitecturalPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  opacity?: number;
}

/**
 * Architectural plane - represents system boundaries
 * Clean, minimal plane with subtle grid
 */
export default function ArchitecturalPlane({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 8,
  height = 8,
  opacity = 0.08,
}: ArchitecturalPlaneProps) {
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
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.01;
    }
  });

  // Theme-aware color - darker for light mode visibility
  const color = isLight ? '#5b21b6' : '#8b5cf6';

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[width, height, 16, 16]} />
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

