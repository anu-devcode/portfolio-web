'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface ServerStackProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function ServerStack({ position, rotation = [0, 0, 0] }: ServerStackProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const servers = [
    { y: 0, color: '#0066ff' },
    { y: 1.2, color: '#00d9ff' },
    { y: 2.4, color: '#8b5cf6' },
  ];

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {servers.map((server, index) => (
        <group key={index} position={[0, server.y, 0]}>
          {/* Server unit */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 0.8, 1.5]} />
            <meshStandardMaterial
              color={server.color}
              emissive={server.color}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* LED indicators */}
          {[-0.7, 0, 0.7].map((x, i) => (
            <mesh key={i} position={[x, 0.5, 0.8]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color="#10b981"
                emissive="#10b981"
                emissiveIntensity={2}
              />
            </mesh>
          ))}

          {/* Ventilation slots */}
          {[-0.4, 0, 0.4].map((x, i) => (
            <mesh key={`vent-${i}`} position={[x, -0.3, 0.8]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial
                color="#1a1a1a"
                emissive="#00f0ff"
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Base platform */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.2, 2]} />
        <meshStandardMaterial
          color="#0f0f0f"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

