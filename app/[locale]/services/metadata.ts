import { getTranslations } from 'next-intl/server';
import { defaultConfig } from '@/config/site.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const baseConfig = defaultConfig;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com';
  const currentUrl = `${baseUrl}/${locale}/services`;

  return {
    title: t('title'),
    description: t('subtitle'),
    keywords: ['services', 'skills', 'web development', 'software engineering', 'portfolio'],
    authors: [{ name: baseConfig.personalInfo.name }],
    openGraph: {
      type: 'website',
      locale: locale === 'am' ? 'am_ET' : 'en_US',
      url: currentUrl,
      title: t('title'),
      description: t('subtitle'),
      siteName: baseConfig.seo.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en/services`,
        'am': `${baseUrl}/am/services`,
        'x-default': `${baseUrl}/en/services`,
      },
    },
  };
}

