import { NextRequest, NextResponse } from 'next/server';
import { ServicesRepository } from '@/lib/db/repositories';
import type { Locale } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as Locale;

    const services = await ServicesRepository.getAll(locale);
    return NextResponse.json(services);
  } catch (error) {
    console.error('Services GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle tracking/analytics requests
    if (body.type === 'service_view') {
      // Logic for tracking can be added here (e.g., logging to DB)
      return NextResponse.json({ success: true, message: 'View tracked' });
    }

    // Handle service creation requests
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as Locale;
    const { service, features = [], technologies = [] } = body;

    if (!service || !service.title) {
      return NextResponse.json({ error: 'Missing service data' }, { status: 400 });
    }

    const newService = await ServicesRepository.create(locale, service, features, technologies);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Services POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}