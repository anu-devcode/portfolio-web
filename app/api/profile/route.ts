import { NextRequest, NextResponse } from 'next/server';
import { ProfileRepository } from '@/lib/db/repositories';
import type { Locale } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as Locale;
    
    const profile = await ProfileRepository.getByLocale(locale);
    
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'en') as Locale;
    const data = await request.json();
    
    const profile = await ProfileRepository.upsert(locale, data);
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}