# Language Preferences & SEO Implementation

## Overview

This document describes the persistent language preference system with SEO-friendly routing for English and Amharic languages.

## Features

### ✅ Persistent Language Preferences
- **localStorage**: Client-side preference storage
- **Cookies**: Server-side preference detection
- **Browser Detection**: Automatic language detection from Accept-Language header
- **1-Year Expiration**: Long-term preference persistence

### ✅ SEO-Friendly Routing
- **Locale Prefix**: Always includes locale in URL (`/en`, `/am`)
- **Canonical URLs**: Proper canonical tags for each language
- **Alternate Links**: hreflang tags for language alternatives
- **Sitemap**: Multi-language sitemap with alternates
- **Metadata**: Localized SEO metadata per language

### ✅ Enhanced Accuracy
- **Middleware Integration**: Automatic language detection and routing
- **Cookie Sync**: Server and client preference synchronization
- **Fallback Handling**: Graceful fallback to default language
- **Config Support**: Multilingual configuration files

## Architecture

### Components

#### 1. Language Preference Library (`lib/language-preference.ts`)
- Cookie management (server-side)
- localStorage management (client-side)
- Browser language detection
- Preference persistence

#### 2. Language Preference Hook (`hooks/useLanguagePreference.ts`)
- React hook for language switching
- Router integration
- Loading states
- Preference persistence

#### 3. Middleware (`middleware.ts`)
- Automatic language detection
- Cookie-based preference handling
- Accept-Language header parsing
- Route redirection

#### 4. Request Config (`i18n/request.ts`)
- Server-side locale resolution
- Cookie preference reading
- Message loading
- Fallback handling

## Usage

### Switching Languages

```tsx
import { useLanguagePreference } from '@/hooks/useLanguagePreference';

function MyComponent() {
  const { currentLocale, switchLanguage, isChanging } = useLanguagePreference();
  
  return (
    <button onClick={() => switchLanguage('am')}>
      Switch to Amharic
    </button>
  );
}
```

### Accessing Localized Config

```tsx
import { getLocalizedConfig } from '@/config/site.config.i18n';

const config = getLocalizedConfig('am');
// Returns Amharic configuration
```

## SEO Implementation

### Metadata

Each page includes:
- **Title**: Localized page titles
- **Description**: Language-specific descriptions
- **Keywords**: Localized keywords
- **Open Graph**: Language-specific OG tags
- **Alternate Links**: hreflang tags for all languages
- **Canonical URLs**: Proper canonical tags

### Sitemap

- Includes all routes for both languages
- Proper alternates for each URL
- Priority and change frequency settings
- Last modified dates

### Robots.txt

- Allows all search engines
- Disallows API routes
- Points to sitemap

## Configuration

### Adding New Languages

1. Add locale to `i18n/routing.ts`:
```ts
locales: ['en', 'am', 'new-locale']
```

2. Create message file: `messages/new-locale.json`

3. Add config: `config/site.config.i18n.ts`

4. Update metadata in `app/[locale]/metadata.ts`

### Multilingual Config

Edit `config/site.config.i18n.ts`:

```ts
export const siteConfigI18n: Record<string, Partial<SiteConfig>> = {
  en: {
    personalInfo: { ... },
    seo: { ... },
  },
  am: {
    personalInfo: { ... },
    seo: { ... },
  },
};
```

## Storage

### localStorage
- Key: `preferred-language`
- Value: `'en'` or `'am'`
- Expires: Never (until cleared)

### Cookies
- Name: `NEXT_LOCALE`
- Value: `'en'` or `'am'`
- Expires: 1 year
- Path: `/`
- SameSite: `Lax`

## Detection Priority

1. **URL Locale**: Current route locale
2. **Cookie**: Stored preference
3. **Accept-Language**: Browser header
4. **Default**: English (`en`)

## Testing

### Manual Testing

1. **Switch Language**: Use language switcher in navbar
2. **Refresh Page**: Language should persist
3. **Clear Storage**: Should detect from browser
4. **Direct URL**: `/am` should show Amharic
5. **SEO**: Check metadata in page source

### Automated Testing

```bash
# Test language switching
npm run test:language

# Test SEO metadata
npm run test:seo
```

## Browser Support

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Performance

- **No Extra Requests**: Language detection happens server-side
- **Fast Switching**: Client-side navigation with router
- **Cached Preferences**: localStorage for instant access
- **Optimized**: Minimal overhead

## Security

- **SameSite Cookies**: Prevents CSRF
- **Path Restriction**: Cookies only for site root
- **Validation**: Strict locale validation
- **Sanitization**: Input sanitization for locale values

## Troubleshooting

### Language Not Persisting

1. Check localStorage: `localStorage.getItem('preferred-language')`
2. Check cookies: `document.cookie`
3. Clear cache and try again
4. Check browser console for errors

### SEO Issues

1. Verify metadata in page source
2. Check sitemap: `/sitemap.xml`
3. Validate hreflang tags
4. Test with Google Search Console

### Routing Issues

1. Check middleware configuration
2. Verify locale routing setup
3. Check Next.js config
4. Review server logs

---

**Status**: Production Ready
**Last Updated**: 2025
**Supported Languages**: English (en), Amharic (am)

