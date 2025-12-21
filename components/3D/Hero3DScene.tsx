'use client';

import { Suspense } from 'react';
import Scene3D from './Scene3D';
import Loading3D from './Loading3D';

/**
 * Hero Section 3D Scene
 * High-fidelity 3D background with floating tech objects
 * Uses Tailwind for container styling and React Three Fiber for 3D rendering
 */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Tailwind-styled container with glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-[1px] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,102,255,0.1),transparent_60%)] z-9" />
      
      {/* 3D Canvas */}
      <Suspense fallback={<Loading3D />}>
        <Scene3D 
          intensity={0.4}
          showControls={false}
          className="opacity-40"
        />
      </Suspense>

      {/* Additional visual effects layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_70%)] z-5" />
    </div>
  );
}

