/**
 * Projects Server Actions
 * Admin-only write operations
 */

'use server';

import { requireAuth } from '@/lib/auth';
import { query, transaction } from '@/lib/db';
import type { Project, Locale } from '@/lib/db/types';

export async function createProject(
  locale: Locale,
  data: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'locale' | 'technologies'>,
  technologies: string[] = []
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    const projectResult = await client.query(
      `INSERT INTO projects (locale, title, description, image_url, gradient, border_color, glow_color, live_url, github_url, featured, order_index)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        locale,
        data.title,
        data.description,
        data.image_url,
        data.gradient,
        data.border_color,
        data.glow_color,
        data.live_url,
        data.github_url,
        data.featured,
        data.order_index,
      ]
    );
    
    const project = projectResult.rows[0];
    
    // Add technologies
    for (let i = 0; i < technologies.length; i++) {
      await client.query(
        'INSERT INTO project_technologies (project_id, technology_name, order_index) VALUES ($1, $2, $3)',
        [project.id, technologies[i], i]
      );
    }
    
    return project;
  });
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at' | 'locale' | 'technologies'>>,
  technologies?: string[]
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'technologies') {
        updates.push(`${key} = $${paramIndex++}`);
        values.push(value);
      }
    });
    
    if (updates.length > 0) {
      values.push(id);
      await client.query(
        `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
        values
      );
    }
    
    if (technologies !== undefined) {
      await client.query('DELETE FROM project_technologies WHERE project_id = $1', [id]);
      for (let i = 0; i < technologies.length; i++) {
        await client.query(
          'INSERT INTO project_technologies (project_id, technology_name, order_index) VALUES ($1, $2, $3)',
          [id, technologies[i], i]
        );
      }
    }
    
    const result = await client.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  });
}

export async function deleteProject(id: string) {
  await requireAuth();
  
  return await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
}

