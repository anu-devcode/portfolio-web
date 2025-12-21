/**
 * Work Experiences Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { WorkExperience } from '../types';
import type { Locale } from '../types';

export async function getWorkExperiences(locale: Locale = 'en'): Promise<WorkExperience[]> {
  return await query<WorkExperience>(
    'SELECT * FROM work_experiences WHERE locale = $1 ORDER BY order_index ASC, start_date DESC',
    [locale]
  );
}

