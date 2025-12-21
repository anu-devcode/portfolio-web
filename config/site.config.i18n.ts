import { SiteConfig } from './site.config';

/**
 * Multilingual site configuration
 * Supports English and Amharic translations
 */
export const siteConfigI18n: Record<string, Partial<SiteConfig>> = {
  en: {
    personalInfo: {
      name: "Anwar Hussen",
      title: "Software Engineer",
      email: "anwarhussen3683@gmail.com",
      location: "Addis Ababa, Ethiopia",
      bio: "Junior Software Engineer focused on backend systems and AI, building scalable solutions that solve real-world problems.",
    },
    seo: {
      title: "Anwar Hussen - Software Engineer Portfolio",
      description: "Professional portfolio of Anwar Hussen, a Software Engineer specializing in backend systems, AI, and modern web development.",
      keywords: ["software engineer", "backend developer", "AI developer", "web developer", "portfolio", "Ethiopia"],
      author: "Anwar Hussen",
    },
  },
  am: {
    personalInfo: {
      name: "አንዋር ሁሴን",
      title: "የሶፍትዌር ምህንድስና",
      email: "anwarhussen3683@gmail.com",
      location: "አዲስ አበባ, ኢትዮጵያ",
      bio: "በቤክኤንድ ስርዓቶች እና AI ላይ ያተኮረ የጀማሪ የሶፍትዌር ምህንድስና፣ እውነተኛ የዓለም ችግሮችን የሚፈቱ ማስፋፊያ መፍትሄዎችን መገንባት።",
    },
    seo: {
      title: "አንዋር ሁሴን - የሶፍትዌር ምህንድስና ፖርትፎሊዮ",
      description: "የአንዋር ሁሴን ሙያዊ ፖርትፎሊዮ፣ በቤክኤንድ ስርዓቶች፣ AI እና ዘመናዊ የድር ልማት ላይ የተለዩ የሶፍትዌር ምህንድስና።",
      keywords: ["የሶፍትዌር ምህንድስና", "ቤክኤንድ ልማት", "AI ልማት", "የድር ልማት", "ፖርትፎሊዮ", "ኢትዮጵያ"],
      author: "አንዋር ሁሴን",
    },
  },
};

/**
 * Get localized config
 */
export function getLocalizedConfig(locale: string): Partial<SiteConfig> {
  return siteConfigI18n[locale] || siteConfigI18n.en;
}

