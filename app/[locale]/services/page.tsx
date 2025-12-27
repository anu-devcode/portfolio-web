import Services from '@/components/sections/Services';
import { generateMetadata } from './metadata';
import { ServicesRepository } from '@/lib/db/repositories/services';
import { getSkillsByCategory } from '@/lib/db/repositories/skills';
import type { Locale } from '@/lib/db/types';

export { generateMetadata };

// Use Incremental Static Regeneration (ISR)
export const revalidate = 3600;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  // Fetch services and skills data in parallel
  const [services, skillsByCategory] = await Promise.all([
    ServicesRepository.getAll(l),
    getSkillsByCategory(l)
  ]);

  return <Services services={services} skillsByCategory={skillsByCategory} />;
}

