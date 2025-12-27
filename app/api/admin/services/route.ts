import { NextResponse } from 'next/server';
import { ServicesRepository } from '@/lib/db/repositories/services';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;

        const services = await ServicesRepository.getAll(locale);

        return NextResponse.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Admin Services GET Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, id, data } = body;

        if (action === 'create') {
            const locale = body.locale || 'en';
            const { features, technologies, ...serviceData } = data;
            const service = await ServicesRepository.create(locale, serviceData, features, technologies);
            return NextResponse.json({ success: true, data: service });
        }

        if (action === 'update') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            const { features, technologies, ...serviceData } = data;
            const service = await ServicesRepository.update(id, serviceData, features, technologies);
            return NextResponse.json({ success: true, data: service });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await ServicesRepository.delete(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Services POST Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
