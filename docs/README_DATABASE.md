# Database Setup Guide

## Overview

This portfolio uses PostgreSQL with a feature-based, maintainable architecture. All content is data-driven and manageable through an admin panel.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up PostgreSQL

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
```sql
CREATE DATABASE portfolio_db;
```

#### Option B: Use a Cloud Service

- [Supabase](https://supabase.com) (Recommended - free tier available)
- [Neon](https://neon.tech) (Serverless PostgreSQL)
- [Railway](https://railway.app)
- [Vercel Postgres](https://vercel.com/storage/postgres)

### 3. Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Admin (for seeding)
ADMIN_PASSWORD=your_secure_password_here

# Existing variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Migrations

```bash
npm run migrate
```

This will create all necessary tables and indexes.

### 5. Seed Initial Data

```bash
npm run seed
```

This creates:
- Admin user (admin@example.com / password from ADMIN_PASSWORD)
- Default profile data
- Hero section data

## Database Schema

### Core Tables

- **users** - Admin authentication
- **profile** - Personal information (multilingual)
- **hero_data** - Hero section content (multilingual)
- **hero_services** - Hero service cards
- **services** - Service offerings with features and technologies
- **skills** - Skills and expertise
- **projects** - Portfolio projects
- **work_experiences** - Work history
- **certificates** - Certifications
- **blog_posts** - Blog articles
- **contact_submissions** - Contact form submissions
- **chat_sessions** - Chatbot sessions

## Architecture

### Server Components (Reads)

All data fetching happens in Server Components using repository functions:

```typescript
import { getProfile } from '@/lib/db/repositories/profile';

export default async function AboutPage() {
  const profile = await getProfile('en');
  // Render with data
}
```

### Server Actions (Writes)

All write operations use Server Actions with authentication:

```typescript
'use server';
import { updateProfile } from '@/app/actions/profile';

export async function handleUpdate(data) {
  await updateProfile('en', data);
}
```

### Repositories

Feature-based repositories in `lib/db/repositories/`:
- `profile.ts` - Profile data
- `hero.ts` - Hero section
- `services.ts` - Services
- `skills.ts` - Skills
- `projects.ts` - Projects
- `work-experiences.ts` - Work history
- `certificates.ts` - Certificates
- `blog.ts` - Blog posts

### Server Actions

Admin-only write operations in `app/actions/`:
- `profile.ts` - Profile management
- `hero.ts` - Hero section management
- `services.ts` - Services management
- `projects.ts` - Projects management
- `skills.ts` - Skills management

## Admin Panel

Access the admin panel at `/admin` (coming soon).

All Server Actions require authentication via `requireAuth()`.

## Performance

- **Caching**: Server Components are cached by Next.js
- **Indexes**: All foreign keys and frequently queried columns are indexed
- **Connection Pooling**: Database connection pool configured for optimal performance

## Migration Strategy

1. **Development**: Run migrations manually with `npm run migrate`
2. **Production**: Run migrations as part of deployment process
3. **Schema Changes**: Update `lib/db/schema.sql` and re-run migrations

## Backup

Regular backups recommended:
- Daily automated backups for production
- Manual backups before major changes

## Security

- Passwords hashed with bcrypt (12 rounds)
- SQL injection protection via parameterized queries
- Authentication required for all write operations
- Session management via secure cookies

