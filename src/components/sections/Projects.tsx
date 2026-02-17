"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Server, Bot, Database, Zap, Brain } from 'lucide-react';

const projects = [
    {
        title: "Hostel Mess Management System",
        category: "Full Stack / SaaS",
        description: "SaaS-style platform with RBAC, weekly menu management, and real-time feedback. Built with a scalable REST API architecture.",
        tech: ["React", "FastAPI", "SQLAlchemy", "JWT", "Tailwind"],
        icon: Server,
        github: "https://github.com/vaibhavgaikwad0072/Mess_Managment_System/",
        color: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "RAG AI Teaching Assistant",
        category: "AI / LLM",
        description: "Retrieval-Augmented Generation pipeline combining vector-based semantic search with LLMs for context-aware academic support.",
        tech: ["Python", "LangChain", "LLMs", "FAISS", "Streamlit"],
        icon: Bot,
        github: "https://github.com/vaibhavgaikwad0072/RAG-Based-AI-Teaching-Assistant",
        color: "from-indigo-500/20 to-purple-500/20"
    },
    {
        title: "Text-to-SQL AI System",
        category: "AI / Database",
        description: "Intelligent natural language to SQL converter using ReAct agent architecture with structured error handling.",
        tech: ["LangChain", "Gemini 2.0", "SQLAlchemy", "Streamlit"],
        icon: Database,
        github: "https://github.com/vaibhavgaikwad0072/Text-To-SQL",
        color: "from-teal-500/20 to-blue-500/20"
    },
    {
        title: "Solar Defect Classification",
        category: "Computer Vision",
        description: "Transfer learning pipeline using EfficientNetB0 to classify solar panel faults with 83% validation accuracy.",
        tech: ["TensorFlow", "EfficientNet", "Keras Tuner", "OpenCV"],
        icon: Zap,
        github: "https://github.com/vaibhavgaikwad0072/Solar-Panel-Defect-Classification/tree/main",
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "Movie Recommendation System",
        category: "Machine Learning",
        description: "Personalized content-based filtering system using TMDB dataset to suggest movies based on similarity metrics.",
        tech: ["Python", "Pandas", "Scikit-Learn", "NLTK", "API"],
        icon: Brain,
        github: "https://github.com/vaibhavgaikwad0072/Moive-Recommendation-system",
        color: "from-pink-500/20 to-rose-500/20"
    }
];

export const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Portfolio</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                            Selected <span className="text-gradient">Engineering</span> Works.
                        </h3>
                    </div>
                    <motion.a
                        href="https://github.com/vaibhavgaikwad0072"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold transition-colors"
                    >
                        All Repositories <ExternalLink size={18} />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group glass-card flex flex-col hover:border-indigo-500/30 transition-all cursor-pointer relative"
                        >
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-20"
                                aria-label={`View ${project.title} on GitHub`}
                            />
                            <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                                <project.icon size={64} className="text-indigo-400/50 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 flex gap-2 z-30">
                                    <div className="p-2 bg-slate-900/80 rounded-lg text-slate-400 group-hover:text-white transition-colors backdrop-blur-sm">
                                        <Github size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col relative z-10">
                                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</span>
                                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">{project.title}</h4>
                                <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-tight">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
