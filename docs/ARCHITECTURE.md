# Backend Architecture Documentation

## Overview

This portfolio has been refactored to use a **data-driven architecture** with PostgreSQL, Next.js App Router, Server Components, and Server Actions.

## Architecture Principles

1. **Feature-based organization** - Code organized by feature, not by type
2. **Server Components for reads** - All data fetching happens server-side
3. **Server Actions for writes** - All mutations require authentication
4. **Clean separation** - Clear boundaries between data, logic, and UI
5. **Type safety** - Full TypeScript coverage
6. **Performance** - Optimized with caching and connection pooling

## Directory Structure

```
lib/
  db/
    index.ts              # Database connection pool
    types.ts              # TypeScript types for all models
    schema.sql            # Database schema
    repositories/         # Read operations (Server Components)
      profile.ts
      hero.ts
      services.ts
      skills.ts
      projects.ts
      work-experiences.ts
      certificates.ts
      blog.ts

app/
  actions/               # Write operations (Server Actions)
    profile.ts
    hero.ts
    services.ts
    projects.ts
    skills.ts

  [locale]/
    page.tsx             # Server Component (reads from DB)
    components/          # Client Components (interactive UI)
```

## Data Flow

### Reading Data (Server Components)

```typescript
// app/[locale]/page.tsx
import { getProfile } from '@/lib/db/repositories/profile';
import { getHeroData } from '@/lib/db/repositories/hero';

export default async function HomePage({ params }: { params: { locale: string } }) {
  // Server Component - fetches data on server
  const profile = await getProfile(params.locale as Locale);
  const heroData = await getHeroData(params.locale as Locale);
  
  return (
    <div>
      <Hero data={heroData} />
      <About profile={profile} />
    </div>
  );
}
```

### Writing Data (Server Actions)

```typescript
// app/actions/profile.ts
'use server';

import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';

export async function updateProfile(locale: Locale, data: Partial<Profile>) {
  await requireAuth(); // Requires admin authentication
  
  return await query(
    'UPDATE profile SET ... WHERE locale = $1',
    [locale]
  );
}
```

### Using Server Actions in Client Components

```typescript
// components/AdminProfileForm.tsx
'use client';

import { updateProfile } from '@/app/actions/profile';

export function AdminProfileForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await updateProfile('en', {
      name: formData.get('name'),
      // ...
    });
  };
  
  return <form action={handleSubmit}>...</form>;
}
```

## Database Schema

### Core Tables

1. **users** - Admin authentication
2. **profile** - Personal information (multilingual)
3. **hero_data** - Hero section content
4. **hero_services** - Hero service cards
5. **services** - Service offerings
6. **service_features** - Service features (one-to-many)
7. **service_technologies** - Service technologies (one-to-many)
8. **skills** - Skills and expertise
9. **projects** - Portfolio projects
10. **project_technologies** - Project technologies (one-to-many)
11. **work_experiences** - Work history
12. **certificates** - Certifications
13. **blog_posts** - Blog articles
14. **blog_tags** - Blog tags (many-to-many)
15. **contact_submissions** - Contact form submissions
16. **chat_sessions** - Chatbot sessions
17. **chat_messages** - Chat messages

### Multilingual Support

All content tables support multiple locales:
- `locale` column (VARCHAR(10)) - 'en', 'am', etc.
- Unique constraint on `(locale)` for single-language records
- Separate records per locale

## Authentication

### Admin Authentication

- Password hashing with bcrypt (12 rounds)
- Session management via secure cookies
- `requireAuth()` middleware for Server Actions

### Session Flow

1. Admin logs in via `/admin/login`
2. Server validates credentials
3. Creates session cookie
4. Server Actions check session via `requireAuth()`

## Performance Optimizations

### 1. Connection Pooling

```typescript
const pool = new Pool({
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
});
```

### 2. Database Indexes

All foreign keys and frequently queried columns are indexed:
- `locale` columns
- `section_id` for services
- `slug` for blog posts
- `published_at` for blog posts

### 3. Next.js Caching

Server Components are automatically cached by Next.js:
- Static pages cached indefinitely
- Dynamic pages cached per request
- Revalidation on demand

### 4. Query Optimization

- Batch queries where possible
- Use transactions for related operations
- Limit results with pagination

## Migration Strategy

### Development

```bash
npm run migrate  # Run schema migrations
npm run seed     # Seed initial data
```

### Production

1. Run migrations as part of deployment
2. Use database migration tools (e.g., Flyway, Knex)
3. Backup before migrations

## Converting Components

### Before (Client Component with Static Data)

```typescript
'use client';

export default function Hero() {
  const config = useLocalizedConfig(); // Static config
  
  return <h1>{config.personalInfo.name}</h1>;
}
```

### After (Server Component with Database)

```typescript
// app/[locale]/page.tsx (Server Component)
import { getProfile } from '@/lib/db/repositories/profile';
import { getHeroData } from '@/lib/db/repositories/hero';
import Hero from '@/components/Hero'; // Client Component for interactivity

export default async function HomePage({ params }: { params: { locale: string } }) {
  const profile = await getProfile(params.locale as Locale);
  const heroData = await getHeroData(params.locale as Locale);
  
  return <Hero profile={profile} heroData={heroData} />;
}
```

```typescript
// components/Hero.tsx (Client Component)
'use client';

interface HeroProps {
  profile: Profile;
  heroData: HeroData;
}

export default function Hero({ profile, heroData }: HeroProps) {
  // Interactive UI only
  return <h1>{profile.name}</h1>;
}
```

## Admin Panel (Coming Soon)

The admin panel will provide:
- Content management for all sections
- User authentication
- Real-time preview
- Bulk operations
- Analytics

## Next Steps

1. ✅ Database schema created
2. ✅ Repositories for reads
3. ✅ Server Actions for writes
4. ✅ Authentication system
5. ⏳ Convert components to Server Components
6. ⏳ Create admin panel
7. ⏳ Add caching layer
8. ⏳ Performance testing

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Testing

```bash
# Test database connection
npm run migrate

# Seed test data
npm run seed

# Start development server
npm run dev
```

## Support

For issues or questions:
1. Check `README_DATABASE.md` for setup
2. Review `lib/db/schema.sql` for schema
3. Check repository functions in `lib/db/repositories/`

