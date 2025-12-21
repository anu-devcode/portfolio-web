/**
 * Profile Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { Profile } from '../types';
import type { Locale } from '../types';

export async function getProfile(locale: Locale = 'en'): Promise<Profile | null> {
  const results = await query<Profile>(
    'SELECT * FROM profile WHERE locale = $1 LIMIT 1',
    [locale]
  );
  return results[0] || null;
}

export async function getAllProfiles(): Promise<Profile[]> {
  return await query<Profile>('SELECT * FROM profile ORDER BY locale');
}

