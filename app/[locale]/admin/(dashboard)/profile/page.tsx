'use client';

import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    Save,
    Loader2,
    Github,
    Linkedin,
    Twitter,
    Globe2
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';

export default function ProfileManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    const [profile, setProfile] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        avatar_url: '',
        status: 'available',
        social_links: {
            github: '',
            linkedin: '',
            twitter: '',
            website: ''
        } as Record<string, string>
    });

    useEffect(() => {
        fetchProfile();
    }, [locale]);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/profile?locale=${locale}`);
            const data = await res.json();
            if (data.success && data.data) {
                setProfile({
                    ...data.data,
                    social_links: typeof data.data.social_links === 'string'
                        ? JSON.parse(data.data.social_links)
                        : (data.data.social_links || {})
                });
            }
        } catch (err) {
            console.error('Failed to fetch profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'upsert',
                    locale,
                    data: profile
                })
            });
            const data = await res.json();
            if (data.success) {
                setToast({ show: true, message: 'Profile updated successfully!', type: 'success' });
            } else {
                setToast({ show: true, message: 'Failed to update profile.', type: 'error' });
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
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile Management</h1>
                <p className="text-slate-400">Update your public identity and contact information ({locale.toUpperCase()}).</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <User className="text-cyan-500" size={24} />
                        <h2 className="text-xl font-bold text-white">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.name}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Professional Title</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.title}
                                onChange={e => setProfile({ ...profile, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Bio</label>
                        <textarea
                            rows={4}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                            value={profile.bio}
                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Mail className="text-blue-500" size={24} />
                        <h2 className="text-xl font-bold text-white">Contact & Availability</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Mail size={14} /> Email
                            </label>
                            <input
                                type="email"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.email}
                                onChange={e => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Phone size={14} /> Phone
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.phone}
                                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <MapPin size={14} /> Location
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.location}
                                onChange={e => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                Status
                            </label>
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.status}
                                onChange={e => setProfile({ ...profile, status: e.target.value })}
                            >
                                <option value="available">Available for Work</option>
                                <option value="busy">Busy / Employed</option>
                                <option value="not_available">Not Available</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe className="text-purple-500" size={24} />
                        <h2 className="text-xl font-bold text-white">Social Links</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="GitHub URL"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.social_links.github}
                                onChange={e => setProfile({
                                    ...profile,
                                    social_links: { ...profile.social_links, github: e.target.value }
                                })}
                            />
                        </div>
                        <div className="relative">
                            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="LinkedIn URL"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.social_links.linkedin}
                                onChange={e => setProfile({
                                    ...profile,
                                    social_links: { ...profile.social_links, linkedin: e.target.value }
                                })}
                            />
                        </div>
                        <div className="relative">
                            <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.social_links.twitter}
                                onChange={e => setProfile({
                                    ...profile,
                                    social_links: { ...profile.social_links, twitter: e.target.value }
                                })}
                            />
                        </div>
                        <div className="relative">
                            <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Personal Website"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                value={profile.social_links.website}
                                onChange={e => setProfile({
                                    ...profile,
                                    social_links: { ...profile.social_links, website: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-cyan-500/20"
                    >
                        {isSaving ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} />
                        )}
                        {isSaving ? 'Saving Changes...' : 'Save Profile Settings'}
                    </button>
                </div>
            </form>

            <StatusToast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
