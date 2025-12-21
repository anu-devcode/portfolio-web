/**
 * Language Preference Management
 * Handles persistent language preferences using localStorage and cookies
 */

export type Locale = 'en' | 'am';

const LANGUAGE_COOKIE_NAME = 'NEXT_LOCALE';
const LANGUAGE_STORAGE_KEY = 'preferred-language';

/**
 * Get language preference from cookie (server-side)
 */
export function getLanguageFromCookie(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const locale = cookies[LANGUAGE_COOKIE_NAME];
  return locale === 'en' || locale === 'am' ? locale : null;
}

/**
 * Get language preference from localStorage (client-side)
 */
export function getLanguageFromStorage(): Locale | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'en' || stored === 'am' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Set language preference in both localStorage and cookie
 */
export function setLanguagePreference(locale: Locale): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Save to localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    
    // Save to cookie (expires in 1 year)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
}

/**
 * Get preferred language with fallback
 */
export function getPreferredLanguage(fallback: Locale = 'en'): Locale {
  if (typeof window === 'undefined') return fallback;
  
  // Try localStorage first
  const stored = getLanguageFromStorage();
  if (stored) return stored;
  
  // Try browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'am' || browserLang === 'en') {
    return browserLang;
  }
  
  return fallback;
}

/**
 * Detect language from Accept-Language header (server-side)
 */
export function detectLanguageFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';
  
  // Check for Amharic (am) first
  if (acceptLanguage.includes('am')) return 'am';
  
  // Default to English
  return 'en';
}

