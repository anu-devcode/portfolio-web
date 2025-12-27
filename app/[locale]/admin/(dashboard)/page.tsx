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
import { getSkills } from '@/lib/db/repositories/skills';
import { getWorkExperiences } from '@/lib/db/repositories/work-experiences';
import { ContactRepository } from '@/lib/db/repositories/contact';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const user = await getCurrentUser();

    // Fetch comprehensive summary data
    const [projects, services, skills, experiences, submissions] = await Promise.all([
        ProjectsRepository.getAll(locale as Locale),
        ServicesRepository.getAll(locale as Locale),
        getSkills(locale as Locale),
        getWorkExperiences(locale as Locale),
        ContactRepository.getAll(100)
    ]);

    const stats = [
        { name: 'Projects', value: projects.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Services', value: services.length, icon: Code, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { name: 'Experience', value: experiences.length, icon: User, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { name: 'Messages', value: submissions.length, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome back, <span className="text-cyan-500">{user?.email.split('@')[0]}</span></h1>
                    <p className="text-slate-400 font-medium">Your portfolio control center is ready.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    System Active
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-slate-600 transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-cyan-500/5">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <TrendingUp size={20} className="text-slate-700" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-tighter">{stat.name}</p>
                        <h3 className="text-3xl font-black text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Recent Projects</h2>
                        <button className="text-cyan-500 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4 flex-grow">
                        {projects.slice(0, 4).map((project) => (
                            <div key={project.id} className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700/50 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform" />
                                <div className="flex-grow">
                                    <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                                    <p className="text-slate-500 text-xs mt-1 font-medium">{new Date(project.created_at || '').toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest ${project.locale === 'en' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-pink-500/10 text-pink-500 border-pink-500/20'
                                    } border`}>
                                    {project.locale}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System & Tips */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden group h-full flex flex-col">
                        <div className="relative z-10">
                            <div className="bg-cyan-500/20 w-12 h-12 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 shadow-inner">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-white mb-4 tracking-tight">AI Strategy</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                                Leverage the built-in AI chatbot stats to understand what potential clients are asking most frequently.
                            </p>
                            <button className="w-full bg-cyan-500 text-slate-950 font-black px-6 py-4 rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 mt-auto">
                                Analysis Hub
                                <TrendingUp size={18} />
                            </button>
                        </div>
                    </div>
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
