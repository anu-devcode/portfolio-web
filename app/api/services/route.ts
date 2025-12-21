import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

// Track service page views and interactions
interface ServiceView {
  id: string;
  service: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
}

interface SkillView {
  id: string;
  skill: string;
  category: string;
  timestamp: number;
  ip?: string;
}

// In-memory storage (for production, use a database)
const serviceViews: ServiceView[] = [];
const skillViews: SkillView[] = [];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const limit = rateLimit(`services-${clientId}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 20, // 20 requests per minute
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
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
          },
        }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    if (type === 'service_view') {
      const view: ServiceView = {
        id: `view-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        service: data.service || 'unknown',
        timestamp: Date.now(),
        ip: clientId,
        userAgent: request.headers.get('user-agent') || undefined,
      };
      serviceViews.push(view);
      
      // Keep only last 1000 views
      if (serviceViews.length > 1000) {
        serviceViews.shift();
      }

      logger.info('Service view tracked', {
        service: view.service,
        viewId: view.id,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Service view tracked',
          viewId: view.id,
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': limit.remaining.toString(),
            'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
          },
        }
      );
    }

    if (type === 'skill_view') {
      const view: SkillView = {
        id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        skill: data.skill || 'unknown',
        category: data.category || 'unknown',
        timestamp: Date.now(),
        ip: clientId,
      };
      skillViews.push(view);
      
      // Keep only last 1000 views
      if (skillViews.length > 1000) {
        skillViews.shift();
      }

      logger.info('Skill view tracked', {
        skill: view.skill,
        category: view.category,
        viewId: view.id,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Skill view tracked',
          viewId: view.id,
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': limit.remaining.toString(),
            'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
          },
        }
      );
    }

    return NextResponse.json(
      { error: 'Invalid request type' },
      { status: 400 }
    );
  } catch (error) {
    logger.error('Services API error', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics (admin only)
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

    const type = request.nextUrl.searchParams.get('type') || 'all';

    if (type === 'services') {
      // Aggregate service views
      const serviceStats = serviceViews.reduce((acc, view) => {
        acc[view.service] = (acc[view.service] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({
        success: true,
        totalViews: serviceViews.length,
        serviceStats,
        recentViews: serviceViews.slice(-10),
      });
    }

    if (type === 'skills') {
      // Aggregate skill views
      const skillStats = skillViews.reduce((acc, view) => {
        const key = `${view.category}:${view.skill}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({
        success: true,
        totalViews: skillViews.length,
        skillStats,
        recentViews: skillViews.slice(-10),
      });
    }

    return NextResponse.json({
      success: true,
      services: {
        totalViews: serviceViews.length,
        recentViews: serviceViews.slice(-10),
      },
      skills: {
        totalViews: skillViews.length,
        recentViews: skillViews.slice(-10),
      },
    });
  } catch (error) {
    console.error('Services GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

