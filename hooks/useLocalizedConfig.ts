'use client';

import { useTranslations } from 'next-intl';
import { defaultConfig } from '@/config/site.config';
import type { SiteConfig } from '@/config/site.config';

/**
 * Hook to get localized configuration
 * Merges default config with i18n translations
 */
export function useLocalizedConfig(): SiteConfig {
  const t = useTranslations('config');
  
  return {
    ...defaultConfig,
    personalInfo: {
      ...defaultConfig.personalInfo,
      name: t('personalInfo.name'),
      title: t('personalInfo.title'),
      email: t('personalInfo.email'),
      location: t('personalInfo.location'),
      bio: t('personalInfo.bio'),
    },
    seo: {
      ...defaultConfig.seo,
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t('seo.keywords').split(', '),
    },
  };
}

