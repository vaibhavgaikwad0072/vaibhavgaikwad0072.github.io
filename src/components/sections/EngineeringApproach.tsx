"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, Cog } from 'lucide-react';

const principles = [
    {
        title: "Modular Backend Design",
        desc: "Building decoupled services using FastAPI and SQLAlchemy for maximum maintainability and testability.",
        icon: Layers
    },
    {
        title: "AI Integration Strategy",
        desc: "Moving beyond chat interfaces to integrate ML/LLM models directly into business logic and workflows.",
        icon: Brain
    },
    {
        title: "Security & Performance",
        desc: "Implementing JWT-based security and optimizing database queries for production-grade speed.",
        icon: ShieldCheck
    },
    {
        title: "Product-Driven Development",
        desc: "Focusing on building end-to-end solutions that solve specific user problems with clean engineering.",
        icon: Rocket
    }
];

import { Brain, Rocket } from 'lucide-react'; // Fix missing icons

export const EngineeringApproach = () => {
    return (
        <section id="approach" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Methodology</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Engineering <span className="text-gradient">Mindset</span>.
                    </h3>
                    <p className="text-slate-400 text-lg">
                        I don't just write scripts; I architect systems that are stable, secure, and scalable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {principles.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-6 items-start"
                        >
                            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 shrink-0">
                                <p.icon size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-3">{p.title}</h4>
                                <p className="text-slate-400 leading-relaxed italic border-l-2 border-slate-800 pl-4">
                                    "{p.desc}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
