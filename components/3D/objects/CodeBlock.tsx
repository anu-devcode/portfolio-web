'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface CodeBlockProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function CodeBlock({ position, rotation = [0, 0, 0] }: CodeBlockProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  const lines = [
    { y: 0.6, width: 0.8 },
    { y: 0.2, width: 0.6 },
    { y: -0.2, width: 0.9 },
    { y: -0.6, width: 0.5 },
  ];

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main block */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
          emissive="#00f0ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Code lines */}
      {lines.map((line, index) => (
        <mesh
          key={index}
          position={[-0.8 + line.width / 2, line.y, 0.2]}
        >
          <boxGeometry args={[line.width, 0.08, 0.05]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? '#00f0ff' : '#0066ff'}
            emissive={index % 2 === 0 ? '#00f0ff' : '#0066ff'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Syntax highlights */}
      {[
        { x: -0.7, y: 0.6, color: '#8b5cf6' },
        { x: -0.5, y: 0.2, color: '#ec4899' },
        { x: 0.3, y: -0.2, color: '#10b981' },
      ].map((highlight, i) => (
        <mesh key={i} position={[highlight.x, highlight.y, 0.2]}>
          <boxGeometry args={[0.15, 0.08, 0.05]} />
          <meshStandardMaterial
            color={highlight.color}
            emissive={highlight.color}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Glow border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.1, 1.6, 0.1]} />
        <meshStandardMaterial
          color="#00f0ff"
          transparent
          opacity={0.2}
          emissive="#00f0ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

