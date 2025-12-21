'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface IsometricBlockProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  opacity?: number;
}

/**
 * Isometric block - abstract architectural element
 * Represents system components in a minimal way
 */
export default function IsometricBlock({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  opacity = 0.2,
}: IsometricBlockProps) {
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
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  // Theme-aware color - darker for light mode visibility
  const color = isLight ? '#1e40af' : '#0066ff';

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        color={color}
        wireframe
      />
    </mesh>
  );
}

