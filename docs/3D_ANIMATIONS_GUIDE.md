# 3D Animations & Effects Guide

## Overview

This guide explains how 3D features and animations work throughout the entire portfolio, inspired by the Framer Awards design style.

## Architecture

### Global 3D System

**Components:**
- `Hero3DScene` - Main hero section 3D background
- `Section3DBackground` - Reusable 3D background for all sections
- `FloatingElements` - Dynamic 3D objects that respond to scroll
- `FloatingParticles` - Particle system for depth

### Section Integration

All major sections now include 3D backgrounds:

1. **Hero Section** (`components/Hero.tsx`)
   - Full 3D scene with multiple objects
   - Floating tech icons
   - Particle system

2. **About Section** (`components/About.tsx`)
   - 3D background with 4 objects
   - 25 particles
   - Scroll-triggered animations

3. **Projects Section** (`components/Projects.tsx`)
   - 3D background with 5 objects
   - 35 particles
   - Enhanced project cards with 3D transforms

4. **Contact Section** (`components/Contact.tsx`)
   - 3D background with 4 objects
   - 30 particles
   - Smooth form animations

## Animation System

### Scroll-Based Animations

**Hook: `useScrollAnimation`**
```tsx
const { ref, isInView } = useScrollAnimation({ 
  threshold: 0.2,
  triggerOnce: false 
});
```

**Component: `ScrollReveal`**
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <YourContent />
</ScrollReveal>
```

### Parallax Effects

**Component: `ParallaxSection`**
```tsx
<ParallaxSection speed={0.5}>
  <YourContent />
</ParallaxSection>
```

### Smooth Transitions

**Component: `SmoothScroll`**
- Automatically enabled in layout
- Smooth scroll behavior throughout site
- Framer Awards-style transitions

## Design Consistency

### Color Palette

All sections use consistent colors:
- **Primary**: Cyan (#00f0ff)
- **Secondary**: Blue (#0066ff)
- **Accent**: Purple (#8b5cf6)
- **Gradients**: Cyan → Blue → Purple

### Typography

- **Headings**: Gradient text with glow effects
- **Body**: Light weight, generous spacing
- **Fonts**: Inter (body), Space Grotesk (headings)

### Glassmorphism

All sections use consistent glass effects:
- `glass` - Standard glassmorphism
- `glass-strong` - Enhanced glassmorphism
- Consistent blur and transparency

## Performance Optimization

### Mobile Optimization

- Reduced 3D complexity on mobile
- Lower particle counts
- Conditional rendering based on device

### Lazy Loading

- 3D scenes load with Suspense
- Progressive enhancement
- Fallback loading states

### Frame Rate Targets

- Desktop: 60 FPS
- Tablet: 45-60 FPS
- Mobile: 30-45 FPS

## Customization

### Adjust 3D Intensity

```tsx
<Section3DBackground 
  intensity={0.3}        // Light intensity
  particleCount={30}     // Number of particles
  objectCount={4}        // Number of 3D objects
  className="opacity-40" // Overall opacity
/>
```

### Animation Timing

Edit easing functions in components:
```tsx
ease: [0.25, 0.46, 0.45, 0.94] // Framer Awards style
```

### Object Positions

3D objects are randomly positioned but can be customized in `FloatingElements.tsx`.

## Best Practices

1. **Consistency**: Use same animation timing across sections
2. **Performance**: Monitor frame rates, reduce complexity if needed
3. **Accessibility**: Respect `prefers-reduced-motion`
4. **Mobile**: Always test on mobile devices
5. **Loading**: Provide loading states for 3D content

## Troubleshooting

### 3D Not Showing

- Check WebGL support
- Verify Three.js version (0.160.1+)
- Check browser console for errors

### Performance Issues

- Reduce particle count
- Lower object count
- Disable on mobile if needed

### Animation Not Smooth

- Check frame rate
- Reduce animation complexity
- Optimize 3D geometry

---

**Inspired by**: [Framer Awards](https://www.framer.com/awards/)
**Status**: Production Ready

