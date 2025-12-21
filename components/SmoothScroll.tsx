'use client';

import { useEffect } from 'react';

/**
 * Enhanced smooth scroll behavior
 * Creates a continuous, calm scrolling experience
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Enhanced smooth scroll with better easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll padding for anchor links
    document.documentElement.style.scrollPaddingTop = '80px';
    
    // Enhanced smooth scroll handler for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href*="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      // Extract anchor from href (handles both /#section and #section)
      const anchorMatch = href.match(/#(.+)$/);
      if (!anchorMatch) return;

      const anchorId = anchorMatch[1];
      const targetElement = document.getElementById(anchorId);
      
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 100; // Account for navbar
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth',
        });
        
        // Update URL without triggering scroll
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', `/#${anchorId}`);
        }
      }
    };

    // Add event listener to document for better coverage
    document.addEventListener('click', handleAnchorClick, true);

    // Handle direct navigation to anchor links (e.g., /#about)
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchorId = hash.substring(1);
        const targetElement = document.getElementById(anchorId);
        if (targetElement) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
              top: Math.max(0, offsetTop),
              behavior: 'smooth',
            });
          }, 100);
        }
      }
    };

    // Handle initial hash navigation
    handleHashNavigation();

    // Handle hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollPaddingTop = '0';
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return null;
}

