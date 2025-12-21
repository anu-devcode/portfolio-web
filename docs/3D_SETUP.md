# 3D System Setup Guide

## Installation

### 1. Install Dependencies

```bash
npm install @react-three/fiber @react-three/drei three
```

Or with yarn:
```bash
yarn add @react-three/fiber @react-three/drei three
```

### 2. TypeScript Types (Optional)

If using TypeScript, types are included with the packages. No additional installation needed.

## Quick Start

### Basic Integration

1. **Import the Hero 3D Scene**:

```tsx
import Hero3DScene from '@/components/3D/Hero3DScene';

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <Hero3DScene />
      {/* Your content */}
    </section>
  );
}
```

### Custom Scene

```tsx
import Scene3D from '@/components/3D/Scene3D';

<Scene3D 
  intensity={0.5}        // Light intensity
  showControls={false}   // Orbit controls
  className="opacity-40" // Tailwind classes
/>
```

### Individual Objects

```tsx
import { Canvas } from '@react-three/fiber';
import AIChip from '@/components/3D/objects/AIChip';

<Canvas>
  <AIChip position={[0, 0, 0]} rotation={[0, 0.5, 0]} />
</Canvas>
```

## Configuration

### Performance Settings

Edit `components/3D/Scene3D.tsx`:

```tsx
<Canvas
  gl={{ antialias: true, alpha: true }}
  dpr={[1, 2]}  // Device pixel ratio
  performance={{ min: 0.5 }}  // Performance threshold
>
```

### Mobile Optimization

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

{!isMobile && <Scene3D />}
```

### Reduced Motion

```tsx
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

{!prefersReducedMotion && <Scene3D />}
```

## Styling with Tailwind

### Container Classes

```tsx
<div className="absolute inset-0 w-full h-full">
  {/* 3D Canvas */}
</div>
```

### Overlay Effects

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-[1px]" />
```

### Responsive Opacity

```tsx
<div className="opacity-40 md:opacity-60 lg:opacity-80">
  <Scene3D />
</div>
```

## Customization

### Change Colors

Edit object files (e.g., `AIChip.tsx`):

```tsx
<meshStandardMaterial
  color="#00f0ff"        // Change this
  emissive="#00f0ff"     // And this
  emissiveIntensity={0.5}
/>
```

### Adjust Animation Speed

```tsx
useFrame((state) => {
  meshRef.current.rotation.y += 0.01; // Change speed
});
```

### Modify Object Positions

Edit `Scene3D.tsx`:

```tsx
<AIChip position={[-8, 4, 0]} />  // [x, y, z]
```

## Troubleshooting

### WebGL Not Supported

Add fallback:

```tsx
const [webglSupported, setWebglSupported] = useState(false);

useEffect(() => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  setWebglSupported(!!gl);
}, []);

{webglSupported ? <Scene3D /> : <Fallback2D />}
```

### Performance Issues

1. Reduce particle count:
```tsx
<FloatingParticles count={25} />  // Default: 50
```

2. Lower DPR:
```tsx
dpr={[1, 1.5]}  // Instead of [1, 2]
```

3. Disable on mobile:
```tsx
{!isMobile && <Scene3D />}
```

### Objects Not Visible

1. Check camera position
2. Verify lighting intensity
3. Check object positions (z-axis)
4. Ensure materials have emissive/color

## Next Steps

1. Customize colors to match your brand
2. Adjust object positions for your layout
3. Add more objects as needed
4. Integrate with other sections
5. Add interactive features

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)

