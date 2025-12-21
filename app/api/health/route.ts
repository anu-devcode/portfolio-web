import { NextResponse } from 'next/server';
import { defaultConfig } from '@/config/site.config';

export async function GET() {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        contact: 'operational',
        chat: 'operational',
        email: process.env.SENDGRID_API_KEY || process.env.RESEND_API_KEY 
          ? 'configured' 
          : 'console-mode',
        ai: process.env.OPENAI_API_KEY ? 'openai' : 'local',
      },
      config: {
        name: defaultConfig.personalInfo.name,
        email: defaultConfig.personalInfo.email ? 'configured' : 'not-set',
      },
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

