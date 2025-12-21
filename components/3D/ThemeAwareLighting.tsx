'use client';

import { useState, useEffect } from 'react';

interface ThemeAwareLightingProps {
  intensity?: number;
}

/**
 * Theme-aware lighting for 3D scenes
 * Adjusts light colors based on theme
 */
export default function ThemeAwareLighting({ intensity = 0.3 }: ThemeAwareLightingProps) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Theme-aware colors - darker for light mode visibility
  const primaryColor = isLight ? '#1e3a8a' : '#00f0ff';
  const secondaryColor = isLight ? '#1e40af' : '#0066ff';

  return (
    <>
      <ambientLight intensity={isLight ? intensity * 1.5 : intensity} />
      <directionalLight position={[5, 5, 5]} intensity={isLight ? 0.6 : 0.3} color={primaryColor} />
      <directionalLight position={[-5, -5, -5]} intensity={isLight ? 0.5 : 0.2} color={secondaryColor} />
    </>
  );
}

