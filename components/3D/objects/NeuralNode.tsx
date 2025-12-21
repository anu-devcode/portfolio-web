'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface NeuralNodeProps {
  position: [number, number, number];
  size?: number;
}

export default function NeuralNode({ position, size = 1 }: NeuralNodeProps) {
  const meshRef = useRef<Mesh>(null);
  const connectionsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (connectionsRef.current) {
      connectionsRef.current.rotation.z += 0.005;
    }
  });

  // Connection lines to other nodes
  const connections = [
    { angle: 0, length: 2 },
    { angle: Math.PI / 3, length: 1.8 },
    { angle: (2 * Math.PI) / 3, length: 2.2 },
    { angle: Math.PI, length: 1.9 },
    { angle: (4 * Math.PI) / 3, length: 2.1 },
    { angle: (5 * Math.PI) / 3, length: 2 },
  ];

  return (
    <group position={position}>
      {/* Main node sphere */}
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[size * 0.4, 16, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Connection lines */}
      <group ref={connectionsRef}>
        {connections.map((conn, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(conn.angle) * conn.length * 0.5,
              Math.sin(conn.angle) * conn.length * 0.5,
              0,
            ]}
            rotation={[0, 0, conn.angle]}
          >
            <cylinderGeometry args={[0.02, 0.02, conn.length]} />
            <meshStandardMaterial
              color="#0066ff"
              emissive="#0066ff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Pulse rings */}
      {[1, 1.5, 2].map((radius, i) => (
        <mesh
          key={`ring-${i}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[radius, radius + 0.05, 32]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.3 - i * 0.1}
            transparent
            opacity={0.2 - i * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

