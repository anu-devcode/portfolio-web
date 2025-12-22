/**
 * Services Repository
 */

import { query, transaction, queryWithClient } from '../index';
import type { Service, ServiceFeature, ServiceTechnology, Locale } from '../types';

export class ServicesRepository {
  static async getAll(locale: Locale): Promise<Service[]> {
    const services = await query<Service>(
      'SELECT * FROM services WHERE locale = $1 ORDER BY order_index ASC',
      [locale]
    );

    // Get features and technologies for each service
    for (const service of services) {
      service.features = await query<ServiceFeature>(
        'SELECT * FROM service_features WHERE service_id = $1 ORDER BY order_index ASC',
        [service.id]
      );
      service.technologies = await query<ServiceTechnology>(
        'SELECT * FROM service_technologies WHERE service_id = $1 ORDER BY order_index ASC',
        [service.id]
      );
    }

    return services;
  }

  static async getById(id: string): Promise<Service | null> {
    const result = await query<Service>(
      'SELECT * FROM services WHERE id = $1',
      [id]
    );
    
    if (result.length === 0) return null;
    
    const service = result[0];
    service.features = await query<ServiceFeature>(
      'SELECT * FROM service_features WHERE service_id = $1 ORDER BY order_index ASC',
      [service.id]
    );
    service.technologies = await query<ServiceTechnology>(
      'SELECT * FROM service_technologies WHERE service_id = $1 ORDER BY order_index ASC',
      [service.id]
    );
    
    return service;
  }

  static async create(locale: Locale, service: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'locale' | 'features' | 'technologies'>, features: string[] = [], technologies: string[] = []): Promise<Service> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      const result = await q<Service>(
        `INSERT INTO services (locale, title, description, icon, section_id, gradient, border_color, glow_color, icon_gradient, order_index)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          locale,
          service.title,
          service.description,
          service.icon,
          service.section_id,
          service.gradient,
          service.border_color,
          service.glow_color,
          service.icon_gradient,
          service.order_index,
        ]
      );
      
      const newService = result[0];
      
      // Add features
      for (let i = 0; i < features.length; i++) {
        await q(
          'INSERT INTO service_features (service_id, feature_text, order_index) VALUES ($1, $2, $3)',
          [newService.id, features[i], i]
        );
      }
      
      // Add technologies
      for (let i = 0; i < technologies.length; i++) {
        await q(
          'INSERT INTO service_technologies (service_id, technology_name, order_index) VALUES ($1, $2, $3)',
          [newService.id, technologies[i], i]
        );
      }
      
      return await this.getById(newService.id) as Service;
    });
  }

  static async update(id: string, service: Partial<Service>, features?: string[], technologies?: string[]): Promise<Service> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      const result = await q<Service>(
        `UPDATE services SET
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          icon = COALESCE($3, icon),
          gradient = COALESCE($4, gradient),
          border_color = COALESCE($5, border_color),
          glow_color = COALESCE($6, glow_color),
          icon_gradient = COALESCE($7, icon_gradient),
          order_index = COALESCE($8, order_index)
        WHERE id = $9
        RETURNING *`,
        [
          service.title,
          service.description,
          service.icon,
          service.gradient,
          service.border_color,
          service.glow_color,
          service.icon_gradient,
          service.order_index,
          id,
        ]
      );
      
      if (features !== undefined) {
        await q('DELETE FROM service_features WHERE service_id = $1', [id]);
        for (let i = 0; i < features.length; i++) {
          await q(
            'INSERT INTO service_features (service_id, feature_text, order_index) VALUES ($1, $2, $3)',
            [id, features[i], i]
          );
        }
      }
      
      if (technologies !== undefined) {
        await q('DELETE FROM service_technologies WHERE service_id = $1', [id]);
        for (let i = 0; i < technologies.length; i++) {
          await q(
            'INSERT INTO service_technologies (service_id, technology_name, order_index) VALUES ($1, $2, $3)',
            [id, technologies[i], i]
          );
        }
      }
      
      return await this.getById(id) as Service;
    });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM services WHERE id = $1', [id]);
    return result.length > 0;
  }
}