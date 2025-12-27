import { NextResponse } from 'next/server';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/db/repositories/skills';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;
        const skills = await getSkills(locale);
        return NextResponse.json({ success: true, data: skills });
    } catch (error) {
        console.error('Admin Skills GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, id, data } = body;

        if (action === 'create') {
            const locale = body.locale || 'en';
            const skill = await createSkill(locale, data);
            return NextResponse.json({ success: true, data: skill });
        }

        if (action === 'update') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            const skill = await updateSkill(id, data);
            return NextResponse.json({ success: true, data: skill });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await deleteSkill(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Skills POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
