/**
 * Locale utilities for text direction and language detection
 */

export type Locale = 'en' | 'am';

/**
 * RTL (Right-to-Left) language codes
 * These languages require RTL layout direction
 */
const RTL_LOCALES: string[] = ['ar', 'he', 'fa', 'ur', 'yi']; // Arabic, Hebrew, Persian, Urdu, Yiddish

/**
 * Determines text direction based on locale
 * @param locale - The locale code
 * @returns 'ltr' or 'rtl'
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}

/**
 * Checks if a locale is RTL
 * @param locale - The locale code
 * @returns true if RTL, false if LTR
 */
export function isRTL(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}

/**
 * Checks if a locale is LTR
 * @param locale - The locale code
 * @returns true if LTR, false if RTL
 */
export function isLTR(locale: string): boolean {
  return !RTL_LOCALES.includes(locale);
}

