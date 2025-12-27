'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface DatabaseCylinderProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function DatabaseCylinder({ position, rotation = [0, 0, 0] }: DatabaseCylinderProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    }
  });

  const segments = 8;
  const dataRings = useMemo(() => [
    { y: -0.8, color: '#0066ff' },
    { y: -0.4, color: '#00d9ff' },
    { y: 0, color: '#8b5cf6' },
    { y: 0.4, color: '#ec4899' },
    { y: 0.8, color: '#00f0ff' },
  ], []);

  return (
    <group position={position} rotation={rotation}>
      {/* Main cylinder */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 2, segments]} />
        <meshStandardMaterial
          color="#0f0f0f"
          metalness={0.9}
          roughness={0.1}
          emissive="#00f0ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Data rings */}
      {dataRings.map((ring, index) => (
        <mesh
          key={index}
          position={[0, ring.y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1, 0.05, 16, 32]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Top cap */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.2, segments]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -1.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.2, segments]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0066ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2.2, segments]} />
        <meshStandardMaterial
          color="#00f0ff"
          transparent
          opacity={0.15}
          emissive="#00f0ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

