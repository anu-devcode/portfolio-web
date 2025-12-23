import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '@/lib/validation';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { getEmailService, formatContactEmail } from '@/lib/email';
import { ContactRepository } from '@/lib/db/repositories/contact';
import { logger } from '@/lib/logger';
import { defaultConfig } from '@/config/site.config';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const limit = rateLimit(`contact-${clientId}`, {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // 5 requests per 15 minutes
    });

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((limit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, email, message } = body;

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name || ''),
      email: sanitizeInput(email || ''),
      message: sanitizeInput(message || ''),
    };

    // Validate form data
    const validation = validateContactForm(sanitizedData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Save to database
    // Note: The repository expects just the fields, no ID as it's generated
    const submission = await ContactRepository.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
      ip_address: clientId,
    });

    logger.info('Contact form submission received', {
      submissionId: submission.id,
      email: sanitizedData.email,
    });

    // Send email notification
    const emailService = getEmailService();
    // Use default config for now, ideally this should come from DB config too
    const emailData = formatContactEmail({
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
      config: {
        name: defaultConfig.personalInfo.name,
        email: defaultConfig.personalInfo.email,
      },
    });

    const emailResult = await emailService.send(emailData);
    
    if (emailResult.success) {
      logger.info('Contact form email sent successfully', {
        submissionId: submission.id,
        messageId: emailResult.messageId,
      });
    } else {
      logger.warn('Contact form email failed to send', {
        submissionId: submission.id,
        error: emailResult.error,
      });
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        submissionId: submission.id,
        emailSent: emailResult.success,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    logger.error('Contact API error', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication here
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    // Using default offset 0
    const submissions = await ContactRepository.getAll(limit, 0);

    return NextResponse.json({
      success: true,
      submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error('Contact GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
