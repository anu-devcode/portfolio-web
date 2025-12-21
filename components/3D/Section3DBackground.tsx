'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import FloatingParticles from './FloatingParticles';
import FloatingElements from './FloatingElements';
import Loading3D from './Loading3D';

interface Section3DBackgroundProps {
  intensity?: number;
  particleCount?: number;
  objectCount?: number;
  className?: string;
}

/**
 * 3D Background for any section
 * Provides consistent 3D elements throughout the site
 */
export default function Section3DBackground({
  intensity = 0.3,
  particleCount = 30,
  objectCount = 3,
  className = '',
}: Section3DBackgroundProps) {

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}>
      {/* Gradient overlay - enhanced for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-[1px] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,102,255,0.08),transparent_60%)] z-9" />
      
      {/* 3D Canvas */}
      <Suspense fallback={<Loading3D />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          className="w-full h-full opacity-30"
        >
          {/* Lighting */}
          <ambientLight intensity={intensity} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0066ff" />

          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 12]}
            fov={75}
          />

          {/* Floating 3D Elements */}
          <FloatingElements count={objectCount} />

          {/* Floating Particles */}
          <FloatingParticles count={particleCount} />
        </Canvas>
      </Suspense>

      {/* Additional visual effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.08),transparent_70%)] z-5" />
    </div>
  );
}

