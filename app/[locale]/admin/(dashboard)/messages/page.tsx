'use client';

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Search,
    Loader2,
    Trash2,
    Mail,
    User,
    Clock,
    CheckCircle,
    Eye,
    ChevronRight
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/contact');
            const data = await res.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch messages');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            const res = await fetch('/api/admin/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markRead', id })
            });
            if (res.ok) {
                setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
                if (selectedMessage?.id === id) {
                    setSelectedMessage({ ...selectedMessage, read: true });
                }
            }
        } catch (err) {
            console.error('Failed to mark as read');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this message permanently?')) return;

        try {
            const res = await fetch('/api/admin/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
                setToast({ show: true, message: 'Message deleted.', type: 'success' });
            }
        } catch (err) {
            setToast({ show: true, message: 'Delete failed.', type: 'error' });
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-120px)]">
            {/* List Section */}
            <div className="lg:col-span-1 border border-slate-800 bg-slate-900/30 rounded-3xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            <MessageSquare className="text-blue-500" size={20} />
                            Messages
                        </h1>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                            {messages.filter(m => !m.read).length} New
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search inbox..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto hide-scrollbar">
                    {filteredMessages.map((msg) => (
                        <button
                            key={msg.id}
                            onClick={() => {
                                setSelectedMessage(msg);
                                if (!msg.read) handleMarkRead(msg.id);
                            }}
                            className={`w-full text-left p-6 border-b border-slate-800/50 transition-all hover:bg-slate-800/30 flex gap-4 ${selectedMessage?.id === msg.id ? 'bg-blue-500/5 border-l-4 border-l-blue-500' : ''
                                }`}
                        >
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-bold ${msg.read ? 'text-slate-400' : 'text-white'}`}>
                                        {msg.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <Clock size={10} /> {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={`text-xs truncate ${msg.read ? 'text-slate-500' : 'text-slate-300 font-medium'}`}>
                                    {msg.message}
                                </p>
                            </div>
                            <ChevronRight size={16} className="text-slate-700 mt-1" />
                        </button>
                    ))}

                    {filteredMessages.length === 0 && (
                        <div className="p-12 text-center">
                            <Mail size={32} className="text-slate-800 mx-auto mb-3" />
                            <p className="text-slate-600 text-sm italic font-medium">Your inbox is empty.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col relative">
                {selectedMessage ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="p-8 border-b border-slate-800 flex items-start justify-between bg-slate-900/80">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedMessage.name}</h2>
                                    <p className="text-slate-400 flex items-center gap-2 mt-1">
                                        <Mail size={14} className="text-blue-500" />
                                        {selectedMessage.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    title="Delete Message"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-10 flex-grow overflow-y-auto space-y-6">
                            <div className="bg-slate-950/50 rounded-3xl p-8 border border-slate-800/50 shadow-inner">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-widest font-bold">
                                <span className="flex items-center gap-2">
                                    <Clock size={12} /> Received: {new Date(selectedMessage.created_at).toLocaleString()}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Eye size={12} /> IP: {selectedMessage.ip_address || 'Unknown'}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900/80 border-t border-slate-800 flex justify-end">
                            <a
                                href={`mailto:${selectedMessage.email}`}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-xl shadow-blue-600/20 inline-flex items-center gap-2"
                            >
                                <Mail size={18} />
                                Reply via Email
                            </a>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="p-6 bg-slate-950 rounded-full border border-slate-800 animate-pulse">
                            <MessageSquare size={48} className="text-slate-700" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-500">Select a message</h3>
                            <p className="text-slate-600 mt-1 max-w-xs">Choose a conversation from the sidebar to read the full content.</p>
                        </div>
                    </div>
                )}
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
