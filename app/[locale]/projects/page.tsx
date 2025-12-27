import Projects from '@/components/sections/Projects';
import { generateMetadata } from './metadata';
import { ProjectsRepository } from '@/lib/db/repositories/projects';
import type { Locale } from '@/lib/db/types';

export { generateMetadata };

// Use Incremental Static Regeneration (ISR)
export const revalidate = 3600;

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  // Fetch all projects for the current locale
  const projects = await ProjectsRepository.getAll(l);

  return <Projects projects={projects} />;
}

