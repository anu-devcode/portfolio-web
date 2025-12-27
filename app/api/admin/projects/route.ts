import { NextResponse } from 'next/server';
import { ProjectsRepository } from '@/lib/db/repositories/projects';
import type { Locale } from '@/lib/db/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;
        const featuredOnly = searchParams.get('featured') === 'true';

        const projects = await ProjectsRepository.getAll(locale, featuredOnly);

        return NextResponse.json({
            success: true,
            data: projects
        });
    } catch (error) {
        console.error('Admin Projects GET Error:', error);
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
            const { technologies, ...projectData } = data;
            const project = await ProjectsRepository.create(locale, projectData, technologies);
            return NextResponse.json({ success: true, data: project });
        }

        if (action === 'update') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            const { technologies, ...projectData } = data;
            const project = await ProjectsRepository.update(id, projectData, technologies);
            return NextResponse.json({ success: true, data: project });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await ProjectsRepository.delete(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Projects POST Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
