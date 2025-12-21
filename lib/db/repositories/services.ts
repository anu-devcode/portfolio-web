/**
 * Services Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { Service, ServiceFeature, ServiceTechnology } from '../types';
import type { Locale } from '../types';

export async function getServices(locale: Locale = 'en'): Promise<Service[]> {
  const services = await query<Service>(
    'SELECT * FROM services WHERE locale = $1 ORDER BY order_index ASC',
    [locale]
  );

  // Fetch features and technologies for each service
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

export async function getServiceBySectionId(sectionId: string): Promise<Service | null> {
  const results = await query<Service>(
    'SELECT * FROM services WHERE section_id = $1 LIMIT 1',
    [sectionId]
  );
  
  if (results[0]) {
    const service = results[0];
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
  
  return null;
}

