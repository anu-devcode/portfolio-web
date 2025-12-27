import { ProfileRepository } from '@/lib/db/repositories/profile';
import Contact from './Contact';
import type { Locale } from '@/lib/db/types';

export default async function ContactSection({ locale }: { locale: Locale }) {
    const profile = await ProfileRepository.getByLocale(locale);

    return (
        <Contact
            profile={profile}
        />
    );
}
