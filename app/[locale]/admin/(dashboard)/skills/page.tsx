'use client';

import React, { useState, useEffect } from 'react';
import {
    Code,
    Terminal,
    Cpu,
    Globe,
    Star,
    Plus,
    Loader2,
    Zap
} from 'lucide-react';

export default function SkillsManagement({ params }: { params: { locale: string } }) {
    const [skills, setSkills] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const locale = params.locale;

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [skillsRes, servicesRes] = await Promise.all([
                    fetch(`/api/skills?locale=${locale}`), // Note: using existing public API for now
                    fetch(`/api/services?locale=${locale}`)
                ]);

                const skillsData = await skillsRes.json();
                const servicesData = await servicesRes.json();

                if (skillsData.success) setSkills(skillsData.data);
                if (servicesData.success) setServices(servicesData.data);
            } catch (err) {
                console.error('Failed to fetch skills/services');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [locale]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Skills & Services</h1>
                    <p className="text-slate-400">View and manage the core expertise displayed on your site.</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-purple-500/10">
                    <Plus size={20} />
                    Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Services Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-xl">
                            <Zap size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Services Offered</h2>
                    </div>

                    <div className="space-y-4">
                        {services.map((service) => (
                            <div key={service.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-white font-bold">{service.title}</h4>
                                    <div className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500">
                                        Order: {service.order_index}
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm line-clamp-2">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl">
                            <Terminal size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Technical Skills</h2>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 overflow-hidden">
                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-500">
                                        <Code size={16} />
                                    </div>
                                    <div>
                                        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                                        <div className="flex text-amber-500">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={8} fill={s <= (skill.level / 20) ? 'currentColor' : 'none'} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
