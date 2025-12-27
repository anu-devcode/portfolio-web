'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage({ params }: { params: { locale: string } }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const locale = params.locale;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/${locale}/admin`);
                router.refresh();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 mb-4 border border-cyan-500/20">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-slate-400">Sign in to manage your portfolio</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push(`/${locale}`)}
                        className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                    >
                        ← Back to website
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
