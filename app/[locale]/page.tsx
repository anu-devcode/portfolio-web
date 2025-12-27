import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { HeroSkeleton, SectionSkeleton } from '@/components/ui/Skeletons';
import type { Locale } from '@/lib/db/types';

// Use Incremental Static Regeneration (ISR) with a 1-hour revalidation time
export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection locale={l} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection locale={l} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection locale={l} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection locale={l} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection locale={l} />
      </Suspense>
    </>
  );
}
