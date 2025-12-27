import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { Locale } from '@/lib/db/types';

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const user = await getCurrentUser();

    // Protect dashboard routes
    if (!user) {
        redirect(`/${locale}/admin/login`);
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
            <Sidebar locale={locale as Locale} />
            <main className="flex-grow p-4 md:p-8 overflow-y-auto max-h-screen custom-scrollbar">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
