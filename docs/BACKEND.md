# Backend Implementation Guide

This document describes the fully functional backend system integrated into the portfolio website.

## 🏗️ Architecture

The backend is built using Next.js API Routes, providing a serverless architecture that scales automatically.

### Core Components

1. **API Routes** (`app/api/`)
   - `/api/contact` - Contact form submissions
   - `/api/chat` - AI chatbot interactions
   - `/api/health` - Health check endpoint

2. **Libraries** (`lib/`)
   - `validation.ts` - Input validation and sanitization
   - `rateLimit.ts` - Rate limiting to prevent abuse
   - `email.ts` - Email service abstraction (SendGrid, Resend, Console)
   - `storage.ts` - Data persistence (file-based for dev, easily replaceable)
   - `logger.ts` - Structured logging

## 📧 Email Service Configuration

The backend supports multiple email providers:

### Option 1: SendGrid (Recommended for Production)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create an API key
3. Add to `.env.local`:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
```

### Option 2: Resend (Modern Alternative)

1. Sign up at [Resend](https://resend.com)
2. Create an API key
3. Add to `.env.local`:
```env
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=noreply@yourdomain.com
```

### Option 3: Console Mode (Development)

No configuration needed. Emails are logged to console instead of being sent.

## 🤖 AI Chatbot Configuration

### Option 1: OpenAI (Enhanced Responses)

1. Get API key from [OpenAI](https://platform.openai.com)
2. Add to `.env.local`:
```env
OPENAI_API_KEY=sk-your_key_here
OPENAI_MODEL=gpt-3.5-turbo  # Optional, defaults to gpt-3.5-turbo
```

### Option 2: Local AI (Built-in)

Works without any API key. Uses intelligent pattern matching and predefined responses.

## 🔒 Security Features

### Rate Limiting

- **Contact Form**: 5 requests per 15 minutes per IP
- **Chatbot**: 20 requests per minute per IP

### Input Validation

- Email format validation
- Message length limits (10-2000 chars for contact, 1-500 for chat)
- HTML sanitization
- XSS protection

### Data Sanitization

All user inputs are sanitized before processing:
- HTML tag removal
- Length limits
- Trim whitespace

## 💾 Data Storage

### Development Mode

Data is stored in JSON files in the `data/` directory:
- `data/contacts.json` - Contact form submissions
- `data/chats.json` - Chatbot conversations

**Note**: The `data/` directory is gitignored for privacy.

### Production Mode

For production, replace the storage implementation in `lib/storage.ts` with:
- PostgreSQL
- MongoDB
- Supabase
- Any other database

## 📡 API Endpoints

### POST `/api/contact`

Submit contact form.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in working together."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "submissionId": "contact-1234567890-abc123",
  "emailSent": true
}
```

**Rate Limit Headers:**
- `X-RateLimit-Limit`: Maximum requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time (ISO string)

### POST `/api/chat`

Send message to AI chatbot.

**Request:**
```json
{
  "message": "Tell me about your projects",
  "sessionId": "session-1234567890" // Optional
}
```

**Response:**
```json
{
  "response": "This portfolio showcases various projects...",
  "sessionId": "session-1234567890"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "services": {
    "contact": "operational",
    "chat": "operational",
    "email": "configured",
    "ai": "openai"
  }
}
```

### GET `/api/contact` (Admin Only)

Retrieve contact submissions (requires authentication).

**Headers:**
```
Authorization: Bearer your_admin_api_key
```

**Query Parameters:**
- `limit` - Number of submissions to return (default: 10)

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Service (choose one)
SENDGRID_API_KEY=your_key_here
# OR
RESEND_API_KEY=re_your_key_here
EMAIL_FROM=noreply@yourdomain.com

# AI Chatbot (optional)
OPENAI_API_KEY=sk-your_key_here
OPENAI_MODEL=gpt-3.5-turbo

# Admin API (optional)
ADMIN_API_KEY=your_secure_key_here
```

## 🚀 Deployment Considerations

### Vercel

1. Add environment variables in Vercel dashboard
2. Deploy - everything works automatically

### Docker

The Dockerfile is already configured. Just set environment variables:
```bash
docker run -e SENDGRID_API_KEY=xxx -e OPENAI_API_KEY=xxx portfolio
```

### Other Platforms

All environment variables should be set in your platform's configuration.

## 📊 Monitoring

### Logs

All API requests are logged with:
- Timestamp
- Log level (info, warn, error)
- Request details
- Error stack traces (if applicable)

### Health Check

Monitor `/api/health` endpoint to ensure services are operational.

## 🔄 Upgrading to Production Database

To use a real database instead of file storage:

1. Install database client (e.g., `pg` for PostgreSQL)
2. Update `lib/storage.ts`:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class ContactStorage {
  async save(submission) {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message, ip) VALUES ($1, $2, $3, $4) RETURNING *',
      [submission.name, submission.email, submission.message, submission.ip]
    );
    return result.rows[0];
  }
  // ... other methods
}
```

## 🧪 Testing

### Test Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Chatbot

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello"
  }'
```

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

## 🐛 Troubleshooting

### Emails not sending

1. Check API key is set correctly
2. Verify `EMAIL_FROM` domain is verified with provider
3. Check console logs for error messages
4. In development, emails are logged to console

### Rate limit errors

- Wait for the rate limit window to reset
- Check `X-RateLimit-Reset` header for reset time
- Adjust limits in API routes if needed

### Storage errors

- Ensure `data/` directory has write permissions
- Check disk space
- For production, use a proper database

## 📝 Notes

- All API routes are server-side only
- Data is persisted between requests
- Rate limiting is in-memory (resets on server restart)
- For production scale, consider Redis for rate limiting
- File storage is for development only - use a database in production

