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

        // Repositories for Services currently have limited CRUD exposure in the wrapper
        // We would expand ServicesRepository to include create/update/delete as needed.

        // For now, mirroring the structure
        return NextResponse.json({
            success: false,
            error: 'Extended CRUD for Services coming soon'
        }, { status: 501 });
    } catch (error) {
        console.error('Admin Services POST Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
