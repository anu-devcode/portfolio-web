import { HeroRepository } from '@/lib/db/repositories/hero';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import Hero from './Hero';
import type { Locale } from '@/lib/db/types';

export default async function HeroSection({ locale }: { locale: Locale }) {
    const [profile, data, heroServices] = await Promise.all([
        ProfileRepository.getByLocale(locale),
        HeroRepository.getHeroData(locale),
        HeroRepository.getHeroServices(locale),
    ]);

    return (
        <Hero
            profile={profile}
            data={data}
            heroServices={heroServices}
        />
    );
}
