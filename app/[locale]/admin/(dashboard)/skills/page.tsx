'use client';

import React, { useState, useEffect } from 'react';
import {
    Code,
    Terminal,
    Star,
    Plus,
    Loader2,
    Search,
    Trash2,
    Edit3,
    Hash,
    Filter
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkillsManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [skills, setSkills] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchSkills();
    }, [locale]);

    const fetchSkills = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/skills?locale=${locale}`);
            const data = await res.json();
            if (data.success) {
                setSkills(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch skills');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const res = await fetch('/api/admin/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            if (res.ok) {
                setSkills(skills.filter(s => s.id !== id));
                setToast({ show: true, message: 'Skill removed!', type: 'success' });
            }
        } catch (err) {
            setToast({ show: true, message: 'Delete failed.', type: 'error' });
        }
    };

    const filteredSkills = skills.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Skills Management</h1>
                    <p className="text-slate-400">Manage your technical stack and expertise levels ({locale.toUpperCase()}).</p>
                </div>
                <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-pink-500/10">
                    <Plus size={20} />
                    New Skill
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search skills by name or category..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 hover:text-white transition-colors">
                    <Filter size={20} />
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={skill.id}
                            className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 hover:border-pink-500/30 transition-all"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-pink-500 border border-slate-700/50">
                                        <Code size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm">{skill.name}</h4>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{skill.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-500 hover:text-white"><Edit3 size={14} /></button>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="p-1.5 text-slate-500 hover:text-red-500"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-0.5 text-amber-500/80">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={10} fill={s <= (skill.level / 20) ? 'currentColor' : 'none'} strokeWidth={2.5} />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-600">ID: {skill.order_index}</span>
                                </div>
                                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        className="h-full bg-pink-500/50"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredSkills.length === 0 && (
                <div className="text-center py-20 bg-slate-950/20 rounded-3xl border border-dashed border-slate-800">
                    <Terminal size={40} className="text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-500">No matching skills found.</p>
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
