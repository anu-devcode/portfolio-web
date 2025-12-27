'use client';

import React, { useState, useEffect } from 'react';
import {
    History,
    Plus,
    Search,
    Loader2,
    Briefcase,
    Calendar,
    MapPin,
    Trash2,
    Edit3,
    CheckCircle2
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [experience, setExperience] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchExperience();
    }, [locale]);

    const fetchExperience = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/experience?locale=${locale}`);
            const data = await res.json();
            if (data.success) {
                setExperience(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch experience');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        try {
            const res = await fetch('/api/admin/experience', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            if (res.ok) {
                setExperience(experience.filter(e => e.id !== id));
                setToast({ show: true, message: 'Experience record deleted.', type: 'success' });
            }
        } catch (err) {
            setToast({ show: true, message: 'Delete failed.', type: 'error' });
        }
    };

    const filteredExperience = experience.filter(e =>
        e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Work Experience</h1>
                    <p className="text-slate-400">Manage your career timeline and professional history ({locale.toUpperCase()}).</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-500/10">
                    <Plus size={20} />
                    Add Experience
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                    type="text"
                    placeholder="Search by company or position..."
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {filteredExperience.map((exp) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            key={exp.id}
                            className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 border border-emerald-500/20">
                                    <Briefcase size={32} />
                                </div>
                                <div className="flex-grow space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                                            <div className="flex items-center gap-2 text-emerald-500 font-medium mt-1">
                                                <span>{exp.company}</span>
                                                {exp.current && (
                                                    <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                                                        <CheckCircle2 size={10} /> Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all">
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {new Date(exp.start_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} -
                                            {exp.current ? ' Present' : new Date(exp.end_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {exp.location}
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredExperience.length === 0 && (
                <div className="text-center py-24 bg-slate-950/30 rounded-3xl border border-dashed border-slate-800">
                    <History size={48} className="text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-slate-400">No experience records</h3>
                    <p className="text-slate-600 mt-2">Start building your professional timeline.</p>
                </div>
            )}

            <StatusToast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
