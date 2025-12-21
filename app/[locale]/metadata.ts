import { getTranslations } from 'next-intl/server';
import { defaultConfig } from '@/config/site.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'config' });
  const baseConfig = defaultConfig;
  
  // Get localized config from i18n messages
  const config = {
    ...baseConfig,
    personalInfo: {
      ...baseConfig.personalInfo,
      name: t('personalInfo.name'),
      title: t('personalInfo.title'),
      email: t('personalInfo.email'),
      location: t('personalInfo.location'),
      bio: t('personalInfo.bio'),
    },
    seo: {
      ...baseConfig.seo,
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t('seo.keywords').split(', '),
    },
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com';
  const currentUrl = `${baseUrl}/${locale}`;

  return {
    title: {
      default: config.seo.title,
      template: `%s | ${config.seo.title}`,
    },
    description: config.seo.description,
    keywords: config.seo.keywords,
    authors: [{ name: config.seo.author }],
    openGraph: {
      type: 'website',
      locale: locale === 'am' ? 'am_ET' : 'en_US',
      url: currentUrl,
      title: config.seo.title,
      description: config.seo.description,
      siteName: config.seo.title,
      images: config.seo.ogImage ? [{ url: config.seo.ogImage }] : [],
      alternateLocale: locale === 'en' ? 'am_ET' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seo.title,
      description: config.seo.description,
      images: config.seo.ogImage ? [config.seo.ogImage] : [],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'am': `${baseUrl}/am`,
        'x-default': `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

