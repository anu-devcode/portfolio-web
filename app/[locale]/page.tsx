import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

// Repositories
import { ProfileRepository } from '@/lib/db/repositories/profile';
import { HeroRepository } from '@/lib/db/repositories/hero';
import { ServicesRepository } from '@/lib/db/repositories/services';
import { ProjectsRepository } from '@/lib/db/repositories/projects';
import { getSkillsByCategory } from '@/lib/db/repositories/skills';
import { getWorkExperiences } from '@/lib/db/repositories/work-experiences';
import type { Locale } from '@/lib/db/types';

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  // Fetch all data in parallel
  const [
    profile,
    heroData,
    heroServices,
    services,
    projects,
    skillsByCategory,
    workExperiences
  ] = await Promise.all([
    ProfileRepository.getByLocale(locale),
    HeroRepository.getHeroData(locale),
    HeroRepository.getHeroServices(locale),
    ServicesRepository.getAll(locale),
    ProjectsRepository.getAll(locale, true), // Featured projects only
    getSkillsByCategory(locale),
    getWorkExperiences(locale)
  ]);

  return (
    <>
      <Hero
        profile={profile}
        data={heroData}
        heroServices={heroServices}
      />
      <About
        profile={profile}
        workExperiences={workExperiences}
      />
      <Services
        services={services}
        skillsByCategory={skillsByCategory}
      />
      <Projects
        projects={projects}
      />
      <Contact
        profile={profile}
      />
    </>
  );
}

