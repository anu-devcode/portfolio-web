import { NextResponse } from 'next/server';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;
        const profile = await ProfileRepository.getByLocale(locale);
        return NextResponse.json({ success: true, data: profile });
    } catch (error) {
        console.error('Admin Profile GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, locale, data } = body;

        if (action === 'upsert') {
            const l = locale || 'en';
            const profile = await ProfileRepository.upsert(l, data);
            return NextResponse.json({ success: true, data: profile });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Profile POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
