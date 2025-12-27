import { NextResponse } from 'next/server';
import { SettingsRepository } from '@/lib/db/repositories/settings';
import type { Locale } from '@/lib/db/types';

/**
 * GET SITE SETTINGS
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = (searchParams.get('locale') || 'en') as Locale;

        const settings = await SettingsRepository.getSettings(locale);
        const metadata = await SettingsRepository.getMetadata(locale);

        return NextResponse.json({
            success: true,
            data: {
                settings,
                metadata
            }
        });
    } catch (error) {
        console.error('Admin Settings GET Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * UPDATE SITE SETTINGS/METADATA
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { locale, settings, metadata } = body;

        if (!locale) {
            return NextResponse.json(
                { success: false, error: 'Locale is required' },
                { status: 400 }
            );
        }

        let updatedSettings = null;
        let updatedMetadata = null;

        if (settings) {
            updatedSettings = await SettingsRepository.upsertSettings(locale, settings);
        }

        if (metadata) {
            updatedMetadata = await SettingsRepository.upsertMetadata(locale, metadata);
        }

        return NextResponse.json({
            success: true,
            data: {
                settings: updatedSettings,
                metadata: updatedMetadata
            }
        });
    } catch (error) {
        console.error('Admin Settings POST Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
