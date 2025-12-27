import { query } from '../index';
import { WorkExperience } from '../types';
import type { Locale } from '../types';

export async function getWorkExperiences(locale: Locale = 'en'): Promise<WorkExperience[]> {
  return await query<WorkExperience>(
    'SELECT * FROM work_experiences WHERE locale = $1 ORDER BY order_index ASC, start_date DESC',
    [locale]
  );
}

export async function createExperience(locale: Locale, exp: Omit<WorkExperience, 'id' | 'created_at' | 'updated_at' | 'locale'>): Promise<WorkExperience> {
  const result = await query<WorkExperience>(
    `INSERT INTO work_experiences (locale, company, position, description, start_date, end_date, current, location, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [locale, exp.company, exp.position, exp.description, exp.start_date, exp.end_date, exp.current, exp.location, exp.order_index]
  );
  return result[0];
}

export async function updateExperience(id: string, exp: Partial<WorkExperience>): Promise<WorkExperience> {
  const result = await query<WorkExperience>(
    `UPDATE work_experiences SET
      company = COALESCE($1, company),
      position = COALESCE($2, position),
      description = COALESCE($3, description),
      start_date = COALESCE($4, start_date),
      end_date = COALESCE($5, end_date),
      current = COALESCE($6, current),
      location = COALESCE($7, location),
      order_index = COALESCE($8, order_index)
    WHERE id = $9
    RETURNING *`,
    [exp.company, exp.position, exp.description, exp.start_date, exp.end_date, exp.current, exp.location, exp.order_index, id]
  );
  return result[0];
}

export async function deleteExperience(id: string): Promise<boolean> {
  const result = await query('DELETE FROM work_experiences WHERE id = $1', [id]);
  return result.length > 0;
}

