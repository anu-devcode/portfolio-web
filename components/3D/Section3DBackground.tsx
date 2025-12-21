'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ArchitecturalElements from './ArchitecturalElements';
import ThemeAwareLighting from './ThemeAwareLighting';
import Loading3D from './Loading3D';

interface Section3DBackgroundProps {
  intensity?: number;
  layerCount?: number;
  blockCount?: number;
  nodeCount?: number;
  planeCount?: number;
  className?: string;
}

/**
 * 3D Background for any section
 * Abstract architectural elements - minimal, professional system architecture feel
 */
export default function Section3DBackground({
  intensity = 0.25,
  layerCount = 3,
  blockCount = 6,
  nodeCount = 10,
  planeCount = 2,
  className = '',
}: Section3DBackgroundProps) {

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}>
      {/* Subtle gradient overlay - minimal and professional */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/2 to-purple-500/3 backdrop-blur-[0.5px] z-10 opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,102,255,0.08),transparent_70%)] z-9 opacity-35 dark:opacity-15" />
      
      {/* 3D Canvas with architectural elements */}
      <Suspense fallback={<Loading3D />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          className="w-full h-full opacity-50 dark:opacity-8 transition-opacity"
        >
          {/* Subtle lighting - calm and professional, theme-aware */}
          <ThemeAwareLighting intensity={intensity} />

          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 15]}
            fov={75}
          />

          {/* Abstract architectural elements */}
          <ArchitecturalElements
            layerCount={layerCount}
            blockCount={blockCount}
            nodeCount={nodeCount}
            planeCount={planeCount}
          />
        </Canvas>
      </Suspense>

      {/* Minimal visual accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.03),transparent_80%)] z-5 opacity-15 dark:opacity-15" />
    </div>
  );
}

