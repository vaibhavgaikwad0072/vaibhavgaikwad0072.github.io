"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Brain, Rocket } from 'lucide-react';

const stats = [
    { label: 'Core Skills', value: 'DS, DBMS, OOPS', icon: Code2 },
    { label: 'Backend', value: 'FastAPI, JWT', icon: Database },
    { label: 'AI/ML', value: 'LLMs, RAG', icon: Brain },
    { label: 'Focus', value: 'Scalability', icon: Rocket },
];

export const About = () => {
    return (
        <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Background</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                            Engineering <span className="text-gradient">Intelligent</span> Systems.
                        </h3>
                        <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                            <p>
                                I am a Software Engineer with a deep focus on building scalable backend architectures integrated
                                with cutting-edge AI capabilities. My approach combines robust engineering principles with
                                modern machine learning workflows.
                            </p>
                            <p>
                                Beyond just writing code, I design systems. Whether it's a SaaS-style mess management platform or
                                a RAG-based AI teaching assistant, my focus remains on modularity, security (JWT/RBAC),
                                and production-readiness.
                            </p>
                            <p>
                                With a strong foundation in <span className="text-white font-semibold">Data Structures, DBMS, and OOPS</span>,
                                I bridge the gap between complex AI research and practical, high-performance applications.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-card p-8 group hover:border-indigo-500/50 transition-all">
                                <stat.icon className="w-10 h-10 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white text-xl font-bold mb-2">{stat.value}</h4>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
