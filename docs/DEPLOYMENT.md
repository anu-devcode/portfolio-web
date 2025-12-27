# Deployment Guide

This guide covers various deployment options for the Professional Portfolio website.

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git
- Docker (for containerized deployment)

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables (if needed)
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add any required variables (e.g., `NEXT_PUBLIC_SITE_URL`)

4. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### 2. Docker Deployment

#### Build and Run Locally

```bash
# Build the Docker image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio
```

#### Using Docker Compose

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

#### Deploy to Cloud Platforms

**AWS ECS/Fargate:**
1. Build and push image to ECR
2. Create ECS task definition
3. Deploy to Fargate

**Google Cloud Run:**
```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT-ID/portfolio

# Deploy to Cloud Run
gcloud run deploy portfolio --image gcr.io/PROJECT-ID/portfolio --platform managed
```

**Azure Container Instances:**
1. Build and push to Azure Container Registry
2. Create container instance using Azure CLI or portal

### 3. Traditional VPS/Server

#### Using PM2

1. **SSH into your server**
   ```bash
   ssh user@your-server.com
   ```

2. **Install Node.js and dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and build**
   ```bash
   git clone <your-repo-url>
   cd professional-portfolio
   npm install
   npm run build
   ```

4. **Install PM2**
   ```bash
   npm install -g pm2
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx (Reverse Proxy)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 4. Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add in Netlify dashboard under Site Settings > Environment Variables

3. **Deploy**
   - Connect GitHub repository
   - Configure build settings
   - Deploy

### 5. AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**
   - Save and deploy

## Environment Variables

Create a `.env.production` file or set in your deployment platform:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test all pages and routes
- [ ] Verify multilingual routing works
- [ ] Test chatbot functionality
- [ ] Check mobile responsiveness
- [ ] Verify SEO metadata
- [ ] Test contact form (if integrated)
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure custom domain
- [ ] Set up monitoring/analytics
- [ ] Configure backup strategy

## Performance Optimization

1. **Enable CDN** (if not automatic)
2. **Optimize Images** (use Next.js Image component)
3. **Enable Compression** (gzip/brotli)
4. **Set up Caching** headers
5. **Monitor Performance** (Lighthouse, WebPageTest)

## Troubleshooting

### Build Errors
- Check Node.js version (should be 20.x+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors: `npm run lint`

### Runtime Errors
- Check server logs
- Verify environment variables
- Check database connections (if applicable)
- Verify API endpoints

### Performance Issues
- Enable static generation where possible
- Optimize images
- Check bundle size
- Use production build: `npm run build && npm start`

## Monitoring

Consider setting up:
- **Error Tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Plausible
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: Vercel Analytics, Web Vitals

## Security

- Use HTTPS (SSL/TLS)
- Set secure headers
- Keep dependencies updated
- Use environment variables for secrets
- Enable rate limiting (if applicable)
- Regular security audits

## Support

For deployment issues, please:
1. Check the logs
2. Review this guide
3. Open an issue on GitHub
4. Check Next.js deployment documentation

# open ai api key= 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