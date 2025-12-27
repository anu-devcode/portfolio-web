'use client';

import React, { useState, useEffect } from 'react';
import {
    Zap,
    Code2,
    Lightbulb,
    Rocket,
    BarChart,
    Save,
    Loader2,
    Plus,
    Trash2,
    Edit3,
    Hash
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';

export default function HeroManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    const [heroData, setHeroData] = useState({
        status_text: '',
        slogan_code: '',
        slogan_learn: '',
        slogan_innovate: '',
        slogan_grow: '',
        cta_text: '',
        contact_text: '',
        scroll_text: ''
    });

    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        fetchHeroData();
    }, [locale]);

    const fetchHeroData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/hero?locale=${locale}`);
            const result = await res.json();
            if (result.success) {
                if (result.data.hero) setHeroData(result.data.hero);
                if (result.data.services) setServices(result.data.services);
            }
        } catch (err) {
            console.error('Failed to fetch hero data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveHero = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'upsertHero',
                    locale,
                    data: heroData
                })
            });
            const data = await res.json();
            if (data.success) {
                setToast({ show: true, message: 'Hero content updated!', type: 'success' });
            } else {
                setToast({ show: true, message: 'Failed to update hero content.', type: 'error' });
            }
        } catch (err) {
            setToast({ show: true, message: 'An error occurred.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Hero Management</h1>
                <p className="text-slate-400">Manage the slogans, status, and animated services of your landing page.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Form */}
                <form onSubmit={handleSaveHero} className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6 text-white font-medium">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="text-amber-500" size={24} />
                            <h2 className="text-xl font-bold">Main Content</h2>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Status Headline</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={heroData.status_text || ''}
                                onChange={e => setHeroData({ ...heroData, status_text: e.target.value })}
                                placeholder="Currently focused on..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Code2 size={14} className="text-blue-500" /> Slogan: Code
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.slogan_code || ''}
                                    onChange={e => setHeroData({ ...heroData, slogan_code: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Lightbulb size={14} className="text-cyan-500" /> Slogan: Learn
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.slogan_learn || ''}
                                    onChange={e => setHeroData({ ...heroData, slogan_learn: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Rocket size={14} className="text-purple-500" /> Slogan: Innovate
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.slogan_innovate || ''}
                                    onChange={e => setHeroData({ ...heroData, slogan_innovate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <BarChart size={14} className="text-emerald-500" /> Slogan: Grow
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.slogan_grow || ''}
                                    onChange={e => setHeroData({ ...heroData, slogan_grow: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">CTA Text</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.cta_text || ''}
                                    onChange={e => setHeroData({ ...heroData, cta_text: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Contact Anchor Text</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    value={heroData.contact_text || ''}
                                    onChange={e => setHeroData({ ...heroData, contact_text: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-amber-500/20"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                {isSaving ? 'Saving...' : 'Save Hero Content'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Hero Services List */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6 h-full">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <Plus className="text-cyan-500" size={24} />
                                <h2 className="text-xl font-bold text-white">Hero Services</h2>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500">These appear as floating badges in the Hero section.</p>

                        <div className="space-y-3">
                            {services.map((service) => (
                                <div key={service.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${service.gradient || 'bg-slate-800'} flex items-center justify-center text-white`}>
                                            <Hash size={14} />
                                        </div>
                                        <span className="text-white text-sm font-medium">{service.title}</span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-slate-500 hover:text-white"><Edit3 size={16} /></button>
                                        <button className="p-1.5 text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-slate-800 text-slate-500 hover:text-cyan-500 hover:border-cyan-500/50 transition-all text-sm font-bold mt-4">
                                <Plus size={18} />
                                Add Floating Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <StatusToast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
