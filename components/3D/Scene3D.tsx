'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import AIChip from './objects/AIChip';
import ServerStack from './objects/ServerStack';
import NeuralNode from './objects/NeuralNode';
import DatabaseCylinder from './objects/DatabaseCylinder';
import CodeBlock from './objects/CodeBlock';
import FloatingParticles from './FloatingParticles';

interface Scene3DProps {
  className?: string;
  intensity?: number;
  showControls?: boolean;
}

export default function Scene3D({ 
  className = '', 
  intensity = 0.5,
  showControls = false 
}: Scene3DProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={intensity} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#0066ff" />
          <spotLight
            position={[0, 20, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#8b5cf6"
          />

          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 15]}
            fov={75}
          />

          {/* 3D Objects */}
          <AIChip position={[-8, 4, 0]} rotation={[0, 0.5, 0]} />
          <ServerStack position={[8, -3, -2]} rotation={[0, -0.3, 0]} />
          <NeuralNode position={[-5, -5, 2]} />
          <DatabaseCylinder position={[6, 3, -1]} rotation={[0, 0.5, 0]} />
          <CodeBlock position={[-3, 2, -3]} rotation={[0.2, -0.2, 0]} />
          <NeuralNode position={[4, -4, 1]} />
          <AIChip position={[-6, -2, -2]} rotation={[0, -0.5, 0]} />
          <CodeBlock position={[3, 5, -1]} rotation={[-0.2, 0.3, 0]} />

          {/* Floating Particles */}
          <FloatingParticles count={50} />

          {/* Controls (optional) */}
          {showControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

