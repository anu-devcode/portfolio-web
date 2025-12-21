/**
 * Database Migration Script
 * Run this to set up the database schema
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { query } from '../lib/db';

async function migrate() {
  try {
    console.log('🚀 Starting database migration...');
    
    // Read schema file
    const schemaPath = join(process.cwd(), 'lib/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      try {
        await query(statement);
      } catch (error: any) {
        // Ignore "already exists" errors
        if (!error.message?.includes('already exists')) {
          console.error('Migration error:', error.message);
        }
      }
    }
    
    console.log('✅ Database migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();

