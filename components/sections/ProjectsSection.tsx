import { ProjectsRepository } from '@/lib/db/repositories/projects';
import Projects from './Projects';
import type { Locale } from '@/lib/db/types';

export default async function ProjectsSection({ locale }: { locale: Locale }) {
    const projects = await ProjectsRepository.getAll(locale, true);

    return (
        <Projects
            projects={projects}
        />
    );
}
