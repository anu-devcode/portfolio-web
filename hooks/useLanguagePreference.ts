'use client';

import { useState, useEffect, useCallback, useTransition, startTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { setLanguagePreference, getLanguageFromStorage, type Locale } from '@/lib/language-preference';

/**
 * Hook for managing language preferences
 * Provides seamless language switching with smooth transitions
 */
export function useLanguagePreference() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startLangTransition] = useTransition();
  const [isChanging, setIsChanging] = useState(false);

  // Initialize from storage on mount
  useEffect(() => {
    const stored = getLanguageFromStorage();
    if (stored && stored !== currentLocale) {
      // Language preference exists but doesn't match current route
      // This will be handled by middleware on next navigation
    }
  }, [currentLocale]);

  /**
   * Switch language with smooth transition
   */
  const switchLanguage = useCallback((newLocale: Locale) => {
    if (newLocale === currentLocale || isChanging) return;
    
    setIsChanging(true);
    
    // Save preference immediately
    setLanguagePreference(newLocale);
    
    // Use React's startTransition for smooth, non-blocking navigation
    startLangTransition(() => {
      // Small delay for smooth visual transition
      setTimeout(() => {
        // Navigate to new locale
        router.push(pathname, { locale: newLocale });
        
        // Reset state after navigation
        setTimeout(() => {
          setIsChanging(false);
        }, 400);
      }, 100);
    });
  }, [currentLocale, pathname, router, isChanging, startLangTransition]);

  return {
    currentLocale,
    switchLanguage,
    isChanging: isChanging || isPending,
  };
}

