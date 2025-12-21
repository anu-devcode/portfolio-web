# 3D Components with React Three Fiber

This directory contains high-fidelity 3D components using React Three Fiber and Tailwind CSS.

## Structure

```
components/3D/
├── Scene3D.tsx              # Main 3D scene container
├── Hero3DScene.tsx          # Hero section 3D background
├── Loading3D.tsx            # Loading state for 3D
├── FloatingParticles.tsx    # Particle system
├── Interactive3DCard.tsx    # Interactive 3D card component
└── objects/
    ├── AIChip.tsx           # AI processor chip
    ├── ServerStack.tsx      # Server rack stack
    ├── NeuralNode.tsx       # Neural network node
    ├── DatabaseCylinder.tsx # Database cylinder
    └── CodeBlock.tsx        # Code block representation
```

## Usage

### Basic 3D Scene

```tsx
import Scene3D from '@/components/3D/Scene3D';

<Scene3D 
  intensity={0.5}
  showControls={false}
  className="opacity-40"
/>
```

### Hero Section Integration

```tsx
import Hero3DScene from '@/components/3D/Hero3DScene';

<section className="relative min-h-screen">
  <Hero3DScene />
  {/* Your content here */}
</section>
```

### Individual 3D Objects

```tsx
import AIChip from '@/components/3D/objects/AIChip';

<Canvas>
  <AIChip position={[0, 0, 0]} rotation={[0, 0.5, 0]} />
</Canvas>
```

## Styling with Tailwind

All 3D components are wrapped in Tailwind-styled containers:

- **Glassmorphism**: `glass`, `glass-strong` classes
- **Gradients**: `bg-gradient-to-*` utilities
- **Glow effects**: Custom `glow-cyan`, `glow-blue` classes
- **Responsive**: Tailwind breakpoints for mobile optimization

## Performance

- Uses `Suspense` for code splitting
- Lazy loading for 3D assets
- Optimized geometry and materials
- Conditional rendering based on viewport

## Customization

### Colors

Modify colors in each component:
- `#00f0ff` - Cyan (primary)
- `#0066ff` - Blue
- `#8b5cf6` - Purple
- `#ec4899` - Magenta

### Animation Speed

Adjust `useFrame` rotation speeds:
```tsx
meshRef.current.rotation.y += 0.01; // Speed multiplier
```

### Object Positions

Configure in `Scene3D.tsx`:
```tsx
<AIChip position={[-8, 4, 0]} />
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (WebGL 2.0)
- Mobile: Optimized for performance

## Dependencies

- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers and abstractions
- `three`: 3D library

