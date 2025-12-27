'use client';

import React, { useState, useEffect } from 'react';
import {
    Save,
    Settings as SettingsIcon,
    Globe,
    Search,
    Layout,
    Bot,
    Loader2,
    CheckCircle,
    AlertCircle,
    Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage({ params }: { params: { locale: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [settings, setSettings] = useState<any>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const locale = params.locale;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/admin/settings?locale=${locale}`);
                const data = await res.json();
                if (data.success) {
                    setSettings(data.data.settings);
                    setMetadata(data.data.metadata);
                }
            } catch (err) {
                console.error('Failed to fetch settings');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [locale]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    locale,
                    settings,
                    metadata
                }),
            });

            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Settings saved successfully' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
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
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
                    <p className="text-slate-400">Manage feature flags and SEO metadata for your portfolio.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
                        <Globe size={14} />
                        <span className="uppercase">{locale}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Feature Flags */}
                <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
                            <Layout size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Feature Visibility</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { id: 'feature_ai_chatbot', label: 'AI Chatbot', icon: Bot, desc: 'Enable/disable the smart assistant' },
                            { id: 'feature_projects', label: 'Projects Section', icon: Globe, desc: 'Show/hide your portfolio works' },
                            { id: 'feature_blog', label: 'Blog Section', icon: Search, desc: 'Enable the internal blog system' },
                            { id: 'feature_contact', label: 'Contact Form', icon: Search, desc: 'Enable user inquiries' },
                        ].map((f) => (
                            <label key={f.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 cursor-pointer hover:border-slate-700 transition-colors">
                                <div className="pt-1">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50"
                                        checked={settings?.[f.id]}
                                        onChange={(e) => setSettings({ ...settings, [f.id]: e.target.checked })}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <f.icon size={16} className="text-slate-500" />
                                        {f.label}
                                    </div>
                                    <p className="text-slate-500 text-xs mt-1">{f.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* 3D Visuals */}
                <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-xl">
                            <Box size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">3D Hero Visuals</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { id: 'abstract', label: 'Abstract Architectural', desc: 'Futuristic geometric layers and connections' },
                            { id: 'literal', label: 'Literal System Objects', desc: '3D components like AI chips, servers, and nodes' },
                        ].map((scene) => (
                            <div
                                key={scene.id}
                                onClick={() => setSettings({ ...settings, hero_3d_scene: scene.id })}
                                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${settings?.hero_3d_scene === scene.id
                                    ? 'bg-cyan-500/10 border-cyan-500 text-white'
                                    : 'bg-slate-950/50 border-slate-800/50 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="pt-1">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${settings?.hero_3d_scene === scene.id ? 'border-cyan-500' : 'border-slate-700'}`}>
                                        {settings?.hero_3d_scene === scene.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-white">{scene.label}</div>
                                    <p className="text-slate-500 text-xs mt-1">{scene.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEO Metadata */}
                <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Search size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">SEO & Metadata</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Site Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-white"
                                    value={metadata?.title || ''}
                                    onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Author Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-white"
                                    value={metadata?.author || ''}
                                    onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Meta Description</label>
                            <textarea
                                rows={3}
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-white resize-none"
                                value={metadata?.description || ''}
                                onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Keywords (comma separated)</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-white"
                                value={metadata?.keywords?.join(', ') || ''}
                                onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value.split(',').map((s: string) => s.trim()) })}
                            />
                        </div>
                    </div>
                </section>

                <div className="fixed bottom-8 right-8 z-50">
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl mb-4 border ${message.type === 'success'
                                    ? 'bg-emerald-500/90 border-emerald-400 text-white'
                                    : 'bg-red-500/90 border-red-400 text-white'
                                    } backdrop-blur-md`}
                            >
                                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
