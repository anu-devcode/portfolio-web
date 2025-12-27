import { unstable_cache } from 'next/cache';
import { ProfileRepository } from './repositories/profile';
import { SettingsRepository } from './repositories/settings';
import type { Locale } from './types';

/**
 * Cached profile data with 1-hour revalidation
 * Used in layout to prevent redundant DB calls
 */
export const getCachedProfile = unstable_cache(
    async (locale: Locale) => {
        return await ProfileRepository.getByLocale(locale);
    },
    ['profile'],
    {
        revalidate: 3600, // 1 hour
        tags: ['profile'],
    }
);

/**
 * Cached settings data with 1-hour revalidation
 * Used in layout and multiple components
 */
export const getCachedSettings = unstable_cache(
    async (locale: Locale) => {
        return await SettingsRepository.getSettings(locale);
    },
    ['settings'],
    {
        revalidate: 3600, // 1 hour
        tags: ['settings'],
    }
);

/**
 * Cached metadata with 1-hour revalidation
 */
export const getCachedMetadata = unstable_cache(
    async (locale: Locale) => {
        return await SettingsRepository.getMetadata(locale);
    },
    ['metadata'],
    {
        revalidate: 3600, // 1 hour
        tags: ['metadata'],
    }
);
