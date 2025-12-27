'use client';

import React from 'react';
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    ExternalLink,
    LogOut,
    Code,
    Sparkles,
    User,
    Zap,
    Layers,
    History,
    MessageSquare,
    Bot
} from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/db/types';

interface SidebarProps {
    locale: Locale;
}

export default function Sidebar({ locale }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'Profile', icon: User, href: '/admin/profile' },
        { name: 'Hero Section', icon: Zap, href: '/admin/hero' },
        { name: 'Services', icon: Layers, href: '/admin/services' },
        { name: 'Skills', icon: Code, href: '/admin/skills' },
        { name: 'Experience', icon: History, href: '/admin/experience' },
        { name: 'Projects', icon: Briefcase, href: '/admin/projects' },
        { name: 'Chatbot', icon: Bot, href: '/admin/chatbot' },
        { name: 'Messages', icon: MessageSquare, href: '/admin/messages' },
        { name: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push(`/${locale}/admin/login`);
        router.refresh();
    };

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 hide-scrollbar overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center gap-3 text-cyan-500 font-bold text-xl mb-1">
                    <Sparkles size={24} />
                    <span>AdminPanel</span>
                </div>
                <p className="text-slate-500 text-xs px-1">Portfolio v1.0</p>
            </div>

            <nav className="flex-grow px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-cyan-500 text-slate-950 font-semibold'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full"
                >
                    <ExternalLink size={20} />
                    View Site
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full text-left"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
