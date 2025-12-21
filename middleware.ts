import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getLanguageFromCookie, detectLanguageFromHeader } from './lib/language-preference';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Get language preference from cookie
  const cookieHeader = request.headers.get('cookie');
  const preferredLocale = getLanguageFromCookie(cookieHeader);
  
  // If no cookie, try to detect from Accept-Language header
  if (!preferredLocale) {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLanguageFromHeader(acceptLanguage);
    
    // Set cookie for future requests
    const response = intlMiddleware(request);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    return response;
  }
  
  // Use the preferred locale from cookie
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - files with extensions (e.g., .ico, .png)
    '/((?!api|_next|.*\\..*).*)',
    // Also match root path
    '/',
  ],
};

