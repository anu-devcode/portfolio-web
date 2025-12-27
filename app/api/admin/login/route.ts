import { NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const result = await signIn(email, password);

        if (result.success) {
            return NextResponse.json({ success: true, user: result.user });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
