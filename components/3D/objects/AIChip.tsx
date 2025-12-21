'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface AIChipProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function AIChip({ position, rotation = [0, 0, 0] }: AIChipProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Main chip body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.3, 2]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Circuit lines */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[-0.8 + (i * 0.5), 0.2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.1, 1.5]} />
          <meshStandardMaterial
            color="#0066ff"
            emissive="#0066ff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Corner indicators */}
      {[
        [-0.9, 0.2, -0.9],
        [0.9, 0.2, -0.9],
        [-0.9, 0.2, 0.9],
        [0.9, 0.2, 0.9],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Glow effect */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.1, 2.2]} />
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

