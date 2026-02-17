"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Brain, Zap } from 'lucide-react';

const stack = [
    {
        title: "Programming",
        icon: Code2,
        skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"]
    },
    {
        title: "Backend & Web",
        icon: Server,
        skills: ["FastAPI", "React", "Next.js", "REST APIs", "JWT Auth", "PostgreSQL", "SQLAlchemy"]
    },
    {
        title: "AI / ML & LLM",
        icon: Brain,
        skills: ["LangChain", "LLMs", "RAG", "TensorFlow", "EfficientNet", "FAISS", "Prompt Engineering"]
    },
    {
        title: "Tools & DevOps",
        icon: Zap, // Using Zap as placeholder, will fix with correct icon if needed
        skills: ["Git", "GitHub", "Streamlit", "Postman", "Keras Tuner", "VS Code"]
    }
];


export const TechStack = () => {
    return (
        <section className="py-24 bg-slate-950 relative border-y border-slate-900">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Capabilities</h2>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-16">
                    The <span className="text-gradient">Tech</span> Stack.
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stack.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 text-left border-t-2 border-t-indigo-500/10 hover:border-t-indigo-500 transition-all"
                        >
                            <item.icon className="w-8 h-8 text-indigo-500 mb-6" />
                            <h4 className="text-white text-lg font-bold mb-4">{item.title}</h4>
                            <div className="flex flex-wrap gap-2">
                                {item.skills.map((skill, index) => (
                                    <span key={index} className="text-slate-400 text-sm">
                                        {skill}{index !== item.skills.length - 1 && " •"}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
