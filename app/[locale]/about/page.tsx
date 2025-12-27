import About from '@/components/sections/About';
import { generateMetadata } from './metadata';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import { getWorkExperiences } from '@/lib/db/repositories/work-experiences';
import type { Locale } from '@/lib/db/types';

export { generateMetadata };

export const revalidate = 3600;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  const [profile, workExperiences] = await Promise.all([
    ProfileRepository.getByLocale(l),
    getWorkExperiences(l)
  ]);

  return <About profile={profile} workExperiences={workExperiences} />;
}

