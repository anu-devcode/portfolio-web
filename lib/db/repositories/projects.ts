/**
 * Projects Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { Project, ProjectTechnology } from '../types';
import type { Locale } from '../types';

export async function getProjects(locale: Locale = 'en', featuredOnly: boolean = false): Promise<Project[]> {
  let sql = 'SELECT * FROM projects WHERE locale = $1';
  const params: any[] = [locale];
  
  if (featuredOnly) {
    sql += ' AND featured = $2';
    params.push(true);
  }
  
  sql += ' ORDER BY order_index ASC';
  
  const projects = await query<Project>(sql, params);

  // Fetch technologies for each project
  for (const project of projects) {
    project.technologies = await query<ProjectTechnology>(
      'SELECT * FROM project_technologies WHERE project_id = $1 ORDER BY order_index ASC',
      [project.id]
    );
  }

  return projects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const results = await query<Project>(
    'SELECT * FROM projects WHERE id = $1 LIMIT 1',
    [id]
  );
  
  if (results[0]) {
    const project = results[0];
    project.technologies = await query<ProjectTechnology>(
      'SELECT * FROM project_technologies WHERE project_id = $1 ORDER BY order_index ASC',
      [project.id]
    );
    return project;
  }
  
  return null;
}

