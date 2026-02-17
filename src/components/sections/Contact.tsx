"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        formData.append("access_key", "b6b50bdf-47a4-477d-a7be-01d5f6b944e0");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Connect</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                            Let's Build Something <span className="text-gradient">Intelligent</span>.
                        </h3>
                        <p className="text-slate-400 text-lg mb-12 max-w-md">
                            I'm always open to discussing backend system design, AI integration, or new engineering opportunities.
                            Let's connect and push the boundaries of what's possible.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:vaibhavgaikwad3746@gmail.com" className="text-xl font-bold text-white hover:text-indigo-400 transition-colors underline decoration-indigo-500/30">vaibhavgaikwad3746@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                                    <p className="text-xl font-bold text-white">Maharashtra, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-12">
                            <a href="https://github.com/vaibhavgaikwad0072" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl glass-card bg-slate-900/50 hover:bg-slate-800 transition-all text-slate-300 hover:text-white">
                                <Github size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/vaibhav-gaikwad-50a1b4257/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl glass-card bg-slate-900/50 hover:bg-slate-800 transition-all text-slate-300 hover:text-white">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 border-indigo-500/20"
                    >
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle2 size={64} className="text-green-500 mb-6" />
                                <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                                <p className="text-slate-400">Thanks for reaching out, Vaibhav will get back to you soon.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-indigo-400 font-bold hover:text-indigo-300"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                                    <input
                                        required
                                        name="subject"
                                        type="text"
                                        placeholder="Project Collaboration"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows={4}
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-lg">
                                        <AlertCircle size={16} />
                                        <span>Something went wrong. Please try again or email directly.</span>
                                    </div>
                                )}

                                <button
                                    disabled={status === 'loading'}
                                    type="submit"
                                    className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 mt-4 group"
                                >
                                    {status === 'loading' ? "Sending..." : "Send Message"}
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
