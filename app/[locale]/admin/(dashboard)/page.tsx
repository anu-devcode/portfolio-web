import React from 'react';
import {
    Briefcase,
    Code,
    Settings,
    Eye,
    MessageSquare,
    TrendingUp,
    User
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import type { Locale } from '@/lib/db/types';
import { ProjectsRepository } from '@/lib/db/repositories/projects';
import { ServicesRepository } from '@/lib/db/repositories/services';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const user = await getCurrentUser();

    // Fetch some summary data
    const projects = await ProjectsRepository.getAll(locale as Locale);
    const services = await ServicesRepository.getAll(locale as Locale);

    const stats = [
        { name: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Skills/Services', value: services.length, icon: Code, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { name: 'Site Views', value: '1,240', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { name: 'Submissions', value: '12', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.email.split('@')[0]}</h1>
                <p className="text-slate-400">Here's what's happening with your portfolio today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <TrendingUp size={20} className="text-slate-600" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions / Recent Activity */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Projects</h2>
                    <div className="space-y-4">
                        {projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h4 className="text-white font-medium">{project.title}</h4>
                                    <p className="text-slate-500 text-xs">{new Date(project.created_at || '').toLocaleDateString()}</p>
                                </div>
                                <div className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                                    {project.locale}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-white mb-4">Pro Tip: SEO Optimization</h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Adding detailed keywords and clear descriptions to your site settings can significantly improve your search engine rankings.
                        </p>
                        <button className="bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors inline-flex items-center gap-2">
                            Optimize Settings
                            <TrendingUp size={18} />
                        </button>
                    </div>
                    <Sparkles className="absolute -right-4 -bottom-4 text-cyan-500/10 w-48 h-48 -rotate-12 group-hover:scale-110 transition-transform" />
                </div>
            </div>
        </div>
    );
}

function Sparkles(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}
