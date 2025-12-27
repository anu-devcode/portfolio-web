# Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in production build
- [ ] Linting passes (`npm run lint`)

### ✅ Environment Variables
- [ ] `.env.example` file created with all required variables
- [ ] Sensitive data removed from code
- [ ] Database connection string ready
- [ ] OpenAI API key obtained (if using chatbot)
- [ ] Admin credentials chosen

### ✅ Database
- [ ] PostgreSQL database created
- [ ] Database schema migrated
- [ ] Initial data seeded (optional)
- [ ] Database accessible from deployment platform

### ✅ Performance
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Lazy loading implemented
- [ ] Caching configured

### ✅ Security
- [ ] Strong admin password set
- [ ] API keys secured in environment variables
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled

## Vercel Deployment Steps

### 1. Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Create Database

#### Option A: Vercel Postgres (Recommended)

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Copy the connection string

#### Option B: External Database (Supabase, Neon, Railway)

1. Create account on chosen platform
2. Create new PostgreSQL database
3. Copy connection string
4. Ensure database allows connections from Vercel IPs

### 3. Deploy to Vercel

#### Via Vercel Dashboard:

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
4. Add environment variables (see below)
5. Click "Deploy"

#### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 4. Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

#### Required Variables:

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
DB_SSL=true
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Optional Variables:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

**Important**: Set these for all environments (Production, Preview, Development)

### 5. Run Database Migrations

After first deployment:

```bash
# Pull environment variables
vercel env pull .env.local

# Run migrations
npm run migrate

# (Optional) Seed data
npm run seed
```

Or use Vercel's serverless function to run migrations on first deploy.

### 6. Verify Deployment

1. Visit your deployed URL
2. Check homepage loads correctly
3. Test language switching
4. Verify 3D scenes load
5. Test admin panel login
6. Test chatbot (if configured)

## Post-Deployment

### Custom Domain Setup

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

### Monitoring

1. Enable Vercel Analytics:
   - Go to Analytics tab
   - Enable Web Analytics
   - Monitor Core Web Vitals

2. Set up error tracking:
   - Consider Sentry integration
   - Monitor Vercel logs

### Performance Optimization

1. Check Lighthouse scores
2. Monitor bundle size
3. Review database query performance
4. Enable Vercel Edge Caching if needed

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
```bash
# Solution: Add all required env vars in Vercel dashboard
```

**Error: TypeScript compilation failed**
```bash
# Solution: Run locally first
npm run build
# Fix all TypeScript errors before deploying
```

### Database Connection Issues

**Error: Connection timeout**
- Check `DATABASE_URL` format
- Ensure database allows Vercel IP ranges
- Verify `DB_SSL=true` for production

**Error: SSL required**
```env
# Add to DATABASE_URL:
?sslmode=require
```

### Runtime Errors

**500 Internal Server Error**
- Check Vercel logs (Dashboard → Deployments → Function Logs)
- Verify all environment variables are set
- Check database connectivity

**Chatbot not working**
- Verify `OPENAI_API_KEY` is set
- Check API key has credits
- Chatbot will fallback to basic responses if API fails

## Maintenance

### Updating Content

1. Log in to admin panel: `your-domain.com/admin`
2. Update content through UI
3. Changes are immediate (no redeployment needed)

### Code Updates

```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push origin main

# Vercel auto-deploys on push to main
```

### Database Backups

- Set up automated backups on your database provider
- Export data regularly
- Test restore procedures

## Scaling Considerations

### High Traffic

- Enable Vercel Pro for better performance
- Consider database connection pooling
- Implement Redis caching for sessions
- Use CDN for static assets

### Database Optimization

- Add indexes for frequently queried fields
- Monitor slow queries
- Consider read replicas for high read loads

## Security Best Practices

1. **Regular Updates**
   ```bash
   npm audit
   npm update
   ```

2. **Environment Variables**
   - Never commit `.env.local`
   - Rotate API keys periodically
   - Use strong admin passwords

3. **Database Security**
   - Use connection pooling
   - Limit database user permissions
   - Enable SSL connections

4. **Monitoring**
   - Set up uptime monitoring
   - Enable security headers
   - Monitor for suspicious activity

## Support

For issues:
1. Check Vercel logs
2. Review database logs
3. Test locally with production env vars
4. Contact support if needed

---

**Deployment Checklist Complete** ✅

Your portfolio is now live and optimized for performance!
