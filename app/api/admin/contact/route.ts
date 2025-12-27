import { NextResponse } from 'next/server';
import { ContactRepository } from '@/lib/db/repositories/contact';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');
        const submissions = await ContactRepository.getAll(limit, offset);
        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        console.error('Admin Contact GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, id } = body;

        if (action === 'markRead') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await ContactRepository.markAsRead(id);
            return NextResponse.json({ success: true });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
            await ContactRepository.delete(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Admin Contact POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
