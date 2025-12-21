/**
 * Services Server Actions
 * Admin-only write operations
 */

'use server';

import { requireAuth } from '@/lib/auth';
import { query, transaction } from '@/lib/db';
import type { Service, Locale } from '@/lib/db/types';

export async function createService(
  locale: Locale,
  data: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'locale' | 'features' | 'technologies'>,
  features: string[] = [],
  technologies: string[] = []
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    // Create service
    const serviceResult = await client.query(
      `INSERT INTO services (locale, title, description, icon, section_id, gradient, border_color, glow_color, icon_gradient, order_index)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        locale,
        data.title,
        data.description,
        data.icon,
        data.section_id,
        data.gradient,
        data.border_color,
        data.glow_color,
        data.icon_gradient,
        data.order_index,
      ]
    );
    
    const service = serviceResult.rows[0];
    
    // Add features
    for (let i = 0; i < features.length; i++) {
      await client.query(
        'INSERT INTO service_features (service_id, feature_text, order_index) VALUES ($1, $2, $3)',
        [service.id, features[i], i]
      );
    }
    
    // Add technologies
    for (let i = 0; i < technologies.length; i++) {
      await client.query(
        'INSERT INTO service_technologies (service_id, technology_name, order_index) VALUES ($1, $2, $3)',
        [service.id, technologies[i], i]
      );
    }
    
    return service;
  });
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at' | 'locale' | 'features' | 'technologies'>>,
  features?: string[],
  technologies?: string[]
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    // Update service
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.icon !== undefined) {
      updates.push(`icon = $${paramIndex++}`);
      values.push(data.icon);
    }
    if (data.gradient !== undefined) {
      updates.push(`gradient = $${paramIndex++}`);
      values.push(data.gradient);
    }
    if (data.border_color !== undefined) {
      updates.push(`border_color = $${paramIndex++}`);
      values.push(data.border_color);
    }
    if (data.glow_color !== undefined) {
      updates.push(`glow_color = $${paramIndex++}`);
      values.push(data.glow_color);
    }
    if (data.icon_gradient !== undefined) {
      updates.push(`icon_gradient = $${paramIndex++}`);
      values.push(data.icon_gradient);
    }
    if (data.order_index !== undefined) {
      updates.push(`order_index = $${paramIndex++}`);
      values.push(data.order_index);
    }
    
    if (updates.length > 0) {
      values.push(id);
      await client.query(
        `UPDATE services SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
        values
      );
    }
    
    // Update features if provided
    if (features !== undefined) {
      await client.query('DELETE FROM service_features WHERE service_id = $1', [id]);
      for (let i = 0; i < features.length; i++) {
        await client.query(
          'INSERT INTO service_features (service_id, feature_text, order_index) VALUES ($1, $2, $3)',
          [id, features[i], i]
        );
      }
    }
    
    // Update technologies if provided
    if (technologies !== undefined) {
      await client.query('DELETE FROM service_technologies WHERE service_id = $1', [id]);
      for (let i = 0; i < technologies.length; i++) {
        await client.query(
          'INSERT INTO service_technologies (service_id, technology_name, order_index) VALUES ($1, $2, $3)',
          [id, technologies[i], i]
        );
      }
    }
    
    const result = await client.query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0];
  });
}

export async function deleteService(id: string) {
  await requireAuth();
  
  return await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
}

