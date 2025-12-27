import { NextResponse } from 'next/server';
import { HeroRepository } from '@/lib/db/repositories/hero';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;
        const data = await HeroRepository.getHeroData(locale);
        const services = await HeroRepository.getHeroServices(locale);
        return NextResponse.json({ success: true, data: { hero: data, services } });
    } catch (error) {
        console.error('Admin Hero GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, id, locale, data } = body;

        if (action === 'upsertHero') {
            const l = locale || 'en';
            const hero = await HeroRepository.upsertHeroData(l, data);
            return NextResponse.json({ success: true, data: hero });
        }

        if (action === 'createService') {
            const l = locale || 'en';
            const service = await HeroRepository.createHeroService(l, data);
            return NextResponse.json({ success: true, data: service });
        }

        if (action === 'updateService') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            const service = await HeroRepository.updateHeroService(id, data);
            return NextResponse.json({ success: true, data: service });
        }

        if (action === 'deleteService') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await HeroRepository.deleteHeroService(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Hero POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
