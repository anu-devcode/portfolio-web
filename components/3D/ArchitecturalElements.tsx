'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/components/layout/ThemeProvider';
import ArchitecturalLayer from './objects/ArchitecturalLayer';
import IsometricBlock from './objects/IsometricBlock';
import SystemNode from './objects/SystemNode';
import ArchitecturalPlane from './objects/ArchitecturalPlane';

interface ArchitecturalElementsProps {
  layerCount?: number;
  blockCount?: number;
  nodeCount?: number;
  planeCount?: number;
}

/**
 * Abstract architectural 3D elements
 * Creates a system architecture feel with layers, planes, nodes, and isometric blocks
 */
export default function ArchitecturalElements({
  layerCount = 3,
  blockCount = 8,
  nodeCount = 12,
  planeCount = 2,
}: ArchitecturalElementsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Opacity multiplier: adjusted for light mode visibility
  // Light mode needs significantly higher opacity to be visible on white background
  const opacityMultiplier = isLight ? 2.0 : 1;

  // Generate positions for architectural elements
  const layers = useMemo(() => {
    return Array.from({ length: layerCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (i - layerCount / 2) * 4,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      rotation: [
        Math.PI / 2 + (Math.random() - 0.5) * 0.2,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.1,
      ] as [number, number, number],
      size: 8 + Math.random() * 4,
      opacity: isLight ? (0.18 + Math.random() * 0.12) * opacityMultiplier : (0.08 + Math.random() * 0.07) * opacityMultiplier,
    }));
  }, [layerCount, opacityMultiplier]);

  const blocks = useMemo(() => {
    return Array.from({ length: blockCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 0.5,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 0.5,
      ] as [number, number, number],
      size: 0.8 + Math.random() * 0.6,
      opacity: isLight ? (0.25 + Math.random() * 0.15) * opacityMultiplier : (0.12 + Math.random() * 0.08) * opacityMultiplier,
    }));
  }, [blockCount, opacityMultiplier]);

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      size: 0.1 + Math.random() * 0.1,
      opacity: isLight ? (0.4 + Math.random() * 0.25) * opacityMultiplier : (0.25 + Math.random() * 0.15) * opacityMultiplier,
    }));
  }, [nodeCount, opacityMultiplier]);

  const planes = useMemo(() => {
    return Array.from({ length: planeCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (i - planeCount / 2) * 6,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 0.3,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.2,
      ] as [number, number, number],
      width: 6 + Math.random() * 4,
      height: 6 + Math.random() * 4,
      opacity: isLight ? (0.15 + Math.random() * 0.1) * opacityMultiplier : (0.06 + Math.random() * 0.04) * opacityMultiplier,
    }));
  }, [planeCount, opacityMultiplier]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Architectural Layers */}
      {layers.map((layer, i) => (
        <ArchitecturalLayer
          key={`layer-${i}`}
          position={layer.position}
          rotation={layer.rotation}
          size={layer.size}
          opacity={layer.opacity}
          isLight={isLight}
        />
      ))}

      {/* Isometric Blocks */}
      {blocks.map((block, i) => (
        <IsometricBlock
          key={`block-${i}`}
          position={block.position}
          rotation={block.rotation}
          size={block.size}
          opacity={block.opacity}
          isLight={isLight}
        />
      ))}

      {/* System Nodes */}
      {nodes.map((node, i) => (
        <SystemNode
          key={`node-${i}`}
          position={node.position}
          size={node.size}
          opacity={node.opacity}
          isLight={isLight}
        />
      ))}

      {/* Architectural Planes */}
      {planes.map((plane, i) => (
        <ArchitecturalPlane
          key={`plane-${i}`}
          position={plane.position}
          rotation={plane.rotation}
          width={plane.width}
          height={plane.height}
          opacity={plane.opacity}
          isLight={isLight}
        />
      ))}
    </group>
  );
}

