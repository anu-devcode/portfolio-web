'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect current theme (light/dark)
 * Returns true for light mode, false for dark mode
 */
export function useTheme(): boolean {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isLightMode = document.documentElement.classList.contains('light');
      setIsLight(isLightMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isLight;
}

