import { NextResponse } from 'next/server';
import { getWorkExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/db/repositories/work-experiences';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;
        const experience = await getWorkExperiences(locale);
        return NextResponse.json({ success: true, data: experience });
    } catch (error) {
        console.error('Admin Experience GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, id, data } = body;

        if (action === 'create') {
            const locale = body.locale || 'en';
            const experience = await createExperience(locale, data);
            return NextResponse.json({ success: true, data: experience });
        }

        if (action === 'update') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            const experience = await updateExperience(id, data);
            return NextResponse.json({ success: true, data: experience });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await deleteExperience(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Experience POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
