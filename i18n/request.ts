import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { cookies, headers } from 'next/headers';
import { getLanguageFromCookie, detectLanguageFromHeader } from '@/lib/language-preference';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // If no locale from routing, try to get from cookie
  if (!locale || !routing.locales.includes(locale as any)) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const preferredLocale = getLanguageFromCookie(cookieHeader);
    
    if (preferredLocale && routing.locales.includes(preferredLocale as any)) {
      locale = preferredLocale;
    } else {
      // Try to detect from Accept-Language header
      const headersList = await headers();
      const acceptLanguage = headersList.get('accept-language');
      const detectedLocale = detectLanguageFromHeader(acceptLanguage);
      
      if (routing.locales.includes(detectedLocale as any)) {
        locale = detectedLocale;
      } else {
        locale = routing.defaultLocale;
      }
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

