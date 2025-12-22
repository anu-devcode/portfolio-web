/**
 * Projects Repository
 */

import { query, transaction, queryWithClient } from '../index';
import { Project, ProjectTechnology, Locale } from '../types';

export class ProjectsRepository {
  static async getAll(locale: Locale, featuredOnly: boolean = false): Promise<Project[]> {
    let sql = 'SELECT * FROM projects WHERE locale = $1';
    const params: any[] = [locale];
    
    if (featuredOnly) {
      sql += ' AND featured = $2';
      params.push(true);
    }
    
    sql += ' ORDER BY order_index ASC';
    
    const projects = await query<Project>(sql, params);

    for (const project of projects) {
      project.technologies = await query<ProjectTechnology>(
        'SELECT * FROM project_technologies WHERE project_id = $1 ORDER BY order_index ASC',
        [project.id]
      );
    }

    return projects;
  }

  static async getById(id: string): Promise<Project | null> {
    const results = await query<Project>(
      'SELECT * FROM projects WHERE id = $1',
      [id]
    );
    
    if (results.length === 0) return null;
    
    const project = results[0];
    project.technologies = await query<ProjectTechnology>(
      'SELECT * FROM project_technologies WHERE project_id = $1 ORDER BY order_index ASC',
      [project.id]
    );
    return project;
  }

  static async create(locale: Locale, project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'locale' | 'technologies'>, technologies: string[] = []): Promise<Project> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      const result = await q<Project>(
        `INSERT INTO projects (locale, title, description, long_description, image_url, demo_url, github_url, featured, category, status, order_index)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [locale, project.title, project.description, project.long_description, project.image_url, project.demo_url, project.github_url, project.featured, project.category, project.status, project.order_index]
      );
      
      const newProject = result[0];
      
      for (let i = 0; i < technologies.length; i++) {
        await q(
          'INSERT INTO project_technologies (project_id, technology_name, order_index) VALUES ($1, $2, $3)',
          [newProject.id, technologies[i], i]
        );
      }
      
      return await this.getById(newProject.id) as Project;
    });
  }

  static async update(id: string, project: Partial<Project>, technologies?: string[]): Promise<Project> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      await q(
        `UPDATE projects SET
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          long_description = COALESCE($3, long_description),
          image_url = COALESCE($4, image_url),
          demo_url = COALESCE($5, demo_url),
          github_url = COALESCE($6, github_url),
          featured = COALESCE($7, featured),
          category = COALESCE($8, category),
          status = COALESCE($9, status),
          order_index = COALESCE($10, order_index)
        WHERE id = $11`,
        [project.title, project.description, project.long_description, project.image_url, project.demo_url, project.github_url, project.featured, project.category, project.status, project.order_index, id]
      );
      
      if (technologies !== undefined) {
        await q('DELETE FROM project_technologies WHERE project_id = $1', [id]);
        for (let i = 0; i < technologies.length; i++) {
          await q(
            'INSERT INTO project_technologies (project_id, technology_name, order_index) VALUES ($1, $2, $3)',
            [id, technologies[i], i]
          );
        }
      }
      
      return await this.getById(id) as Project;
    });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM projects WHERE id = $1', [id]);
    return result.length > 0;
  }
}

// Legacy exports for backward compatibility
export const getProjects = ProjectsRepository.getAll;
export const getProjectById = ProjectsRepository.getById;

