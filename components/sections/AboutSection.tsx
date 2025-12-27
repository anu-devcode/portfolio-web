import { ProfileRepository } from '@/lib/db/repositories/profile';
import { getWorkExperiences } from '@/lib/db/repositories/work-experiences';
import About from './About';
import type { Locale } from '@/lib/db/types';

export default async function AboutSection({ locale }: { locale: Locale }) {
    const [profile, workExperiences] = await Promise.all([
        ProfileRepository.getByLocale(locale),
        getWorkExperiences(locale),
    ]);

    return (
        <About
            profile={profile}
            workExperiences={workExperiences}
        />
    );
}
