import { ServicesRepository } from '@/lib/db/repositories/services';
import { getSkillsByCategory } from '@/lib/db/repositories/skills';
import Services from './Services';
import type { Locale } from '@/lib/db/types';

export default async function ServicesSection({ locale }: { locale: Locale }) {
    const [services, skillsByCategory] = await Promise.all([
        ServicesRepository.getAll(locale),
        getSkillsByCategory(locale),
    ]);

    return (
        <Services
            services={services}
            skillsByCategory={skillsByCategory}
        />
    );
}
