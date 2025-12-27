import { getTranslations } from 'next-intl/server';
import { SettingsRepository } from '@/lib/db/repositories/settings';
import type { Locale } from '@/lib/db/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Fetch metadata from database
  const dbMetadata = await SettingsRepository.getMetadata(locale as Locale);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com';
  const currentUrl = `${baseUrl}/${locale}`;

  const title = dbMetadata?.title || 'Professional Portfolio';
  const description = dbMetadata?.description || 'A professional portfolio website showcasing my work and expertise.';
  const keywords = dbMetadata?.keywords || ["portfolio", "software engineer", "web developer"];
  const author = dbMetadata?.author || 'Anwar Hussen';
  const ogImage = dbMetadata?.og_image || '';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: author }],
    openGraph: {
      type: 'website',
      locale: locale === 'am' ? 'am_ET' : 'en_US',
      url: currentUrl,
      title: title,
      description: description,
      siteName: title,
      images: ogImage ? [{ url: ogImage }] : [],
      alternateLocale: locale === 'en' ? 'am_ET' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
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
