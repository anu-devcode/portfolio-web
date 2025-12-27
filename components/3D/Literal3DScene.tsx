'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import AIChip from './objects/AIChip';
import ServerStack from './objects/ServerStack';
import NeuralNode from './objects/NeuralNode';
import DatabaseCylinder from './objects/DatabaseCylinder';
import CodeBlock from './objects/CodeBlock';
import FloatingParticles from './FloatingParticles';
import ThemeAwareLighting from './ThemeAwareLighting';
import Loading3D from './Loading3D';

/**
 * Literal Hero 3D Scene
 * Features recognizable system objects in a professional layout
 */
export default function Literal3DScene() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5 backdrop-blur-[0.5px] z-10 opacity-40 dark:opacity-20" />

            <Suspense fallback={<Loading3D />}>
                <Canvas
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 1.5]} // Optimized DPR
                    className="w-full h-full opacity-60 dark:opacity-15 transition-opacity"
                >
                    <ThemeAwareLighting intensity={0.4} />

                    <PerspectiveCamera
                        makeDefault
                        position={[0, 0, 15]}
                        fov={75}
                    />

                    <group>
                        {/* Carefully placed objects for hero section */}
                        <AIChip position={[-6, 3, 0]} rotation={[0.4, 0.5, 0]} />
                        <ServerStack position={[7, -4, -2]} rotation={[0, -0.4, 0]} />
                        <NeuralNode position={[-4, -5, 2]} />
                        <DatabaseCylinder position={[5, 4, -1]} rotation={[0, 0.6, 0]} />
                        <CodeBlock position={[-2, 1, -3]} rotation={[0.2, -0.3, 0]} />
                    </group>

                    {/* Optimized particle count */}
                    <FloatingParticles count={30} />
                </Canvas>
            </Suspense>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.05),transparent_80%)] z-5" />
        </div>
    );
}
