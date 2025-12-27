'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';
import AIChip from './objects/AIChip';
import NeuralNode from './objects/NeuralNode';
import CodeBlock from './objects/CodeBlock';

interface FloatingElement {
  type: 'chip' | 'node' | 'code';
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
}

/**
 * Floating 3D elements that move with scroll
 * Creates dynamic background throughout the site
 */
export default function FloatingElements({ count = 5 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const elements: FloatingElement[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      type: ['chip', 'node', 'code'][i % 3] as 'chip' | 'node' | 'code',
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      // Access window.scrollY directly for better performance
      if (typeof window !== 'undefined') {
        groupRef.current.position.y = window.scrollY * 0.0005;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => {
        if (element.type === 'chip') {
          return (
            <AIChip
              key={`chip-${index}`}
              position={element.position}
              rotation={element.rotation}
            />
          );
        } else if (element.type === 'node') {
          return (
            <NeuralNode
              key={`node-${index}`}
              position={element.position}
            />
          );
        } else {
          return (
            <CodeBlock
              key={`code-${index}`}
              position={element.position}
              rotation={element.rotation}
            />
          );
        }
      })}
    </group>
  );
}

