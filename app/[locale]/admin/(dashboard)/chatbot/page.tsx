'use client';

import React, { useState, useEffect } from 'react';
import {
    Bot,
    MessageSquare,
    Save,
    Loader2,
    Sparkles,
    Shield,
    Cpu,
    Zap
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';

export default function ChatbotManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        chatbot_system_prompt: '',
        chatbot_model: 'gpt-3.5-turbo'
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchSettings();
    }, [locale]);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/settings?locale=${locale}`);
            const data = await res.json();
            if (data.success) {
                setSettings({
                    chatbot_system_prompt: data.data.chatbot_system_prompt || '',
                    chatbot_model: data.data.chatbot_model || 'gpt-3.5-turbo'
                });
            }
        } catch (err) {
            console.error('Failed to fetch settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    locale,
                    ...settings
                })
            });
            if (res.ok) {
                setToast({ show: true, message: 'Chatbot settings updated!', type: 'success' });
            }
        } catch (err) {
            setToast({ show: true, message: 'Failed to save.', type: 'error' });
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
        <div className="max-w-4xl space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-cyan-500/10 text-cyan-500 rounded-2xl shadow-inner">
                        <Bot size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">AI Assistant Configuration</h1>
                        <p className="text-slate-400">Fine-tune the intelligence and personality of your portfolio's agent.</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-cyan-500/20 disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Apply Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* System Prompt Section */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-cyan-400" size={20} />
                                <h2 className="text-xl font-bold text-white">Personality & Instructions</h2>
                            </div>
                            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                                Define how the AI should behave. This prompt acts as the foundation for its knowledge and professional tone.
                            </p>
                            <textarea
                                className="w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-sm leading-relaxed"
                                placeholder="Example: You are a friendly technical advisor..."
                                value={settings.chatbot_system_prompt}
                                onChange={(e) => setSettings({ ...settings, chatbot_system_prompt: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Model Settings */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Cpu className="text-cyan-400" size={20} />
                            <h2 className="text-xl font-bold text-white">Model Selection</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Fast & Cost-efficient', icon: Zap },
                                { id: 'gpt-4o', name: 'GPT-4o', desc: 'Smarter & Multimodal', icon: Sparkles },
                                { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Optimized intelligence', icon: Cpu }
                            ].map((model) => (
                                <button
                                    key={model.id}
                                    onClick={() => setSettings({ ...settings, chatbot_model: model.id })}
                                    className={`flex items-start gap-4 p-5 rounded-2xl border transition-all text-left ${settings.chatbot_model === model.id
                                            ? 'bg-cyan-500/10 border-cyan-500 shadow-inner'
                                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl ${settings.chatbot_model === model.id ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                        <model.icon size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{model.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">{model.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Tips */}
                <div className="space-y-6">
                    <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-3xl p-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Shield className="text-cyan-400" size={16} />
                            Safe Prompting
                        </h3>
                        <ul className="text-xs text-slate-400 space-y-4 leading-relaxed">
                            <li>• Instruct the AI to never share personal contact numbers.</li>
                            <li>• Direct users to the contact form for serious inquiries.</li>
                            <li>• Maintain a professional "Software Engineer" persona.</li>
                        </ul>
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
