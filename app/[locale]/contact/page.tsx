import Contact from '@/components/sections/Contact';
import { generateMetadata } from './metadata';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import type { Locale } from '@/lib/db/types';

export { generateMetadata };

export const revalidate = 3600;

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const profile = await ProfileRepository.getByLocale(l);

  return <Contact profile={profile} />;
}

