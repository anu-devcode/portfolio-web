'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ArchitecturalElements from './ArchitecturalElements';
import ThemeAwareLighting from './ThemeAwareLighting';
import Loading3D from './Loading3D';

/**
 * Hero Section 3D Scene
 * Abstract architectural elements - minimal, professional system architecture feel
 */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Subtle gradient overlay - minimal and professional */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/2 to-purple-500/3 backdrop-blur-[0.5px] z-10 opacity-45 dark:opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,102,255,0.1),transparent_70%)] z-9 opacity-40 dark:opacity-18" />
      
      {/* 3D Canvas with architectural elements */}
      <Suspense fallback={<Loading3D />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          className="w-full h-full opacity-55 dark:opacity-10 transition-opacity"
        >
          {/* Subtle lighting - calm and professional, theme-aware */}
          <ThemeAwareLighting intensity={0.3} />

          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 18]}
            fov={75}
          />

          {/* Abstract architectural elements - more elements for hero */}
          <ArchitecturalElements
            layerCount={4}
            blockCount={10}
            nodeCount={15}
            planeCount={3}
          />
        </Canvas>
      </Suspense>

      {/* Minimal visual accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.04),transparent_80%)] z-5 opacity-18 dark:opacity-18" />
    </div>
  );
}

