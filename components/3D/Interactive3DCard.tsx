'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface Interactive3DCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

/**
 * Interactive 3D Card Component
 * Combines Tailwind styling with React Three Fiber 3D elements
 */
export default function Interactive3DCard({
  position,
  title,
  description,
  color = '#00f0ff',
  onClick,
}: Interactive3DCardProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (hovered) {
        meshRef.current.position.y = position[1] + 0.3;
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.position.y = position[1];
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      {/* Main card mesh */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4, 2.5, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[4.2, 2.7, 0.1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Text labels (using HTML overlay instead of 3D text for compatibility) */}
      <mesh position={[0, 0.5, 0.2]}>
        <planeGeometry args={[3, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

