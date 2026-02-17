"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
    {
        role: "Data Science Intern",
        company: "YBI Foundation",
        period: "2024",
        points: [
            "Developed ML-based signature recognition system using deep learning techniques.",
            "Built end-to-end preprocessing and training pipeline for robustness.",
            "Optimized model performance for real-world document verification."
        ]
    },
    {
        role: "Club Secretary",
        company: "Institute Technical Club",
        period: "2023 - 2024",
        points: [
            "Led event planning and technical coordination for 500+ participants.",
            "Managed communication with faculty, stakeholders, and team members.",
            "Oversaw budget allocation and technical workshop organization."
        ]
    }
];

const education = [
    {
        degree: "B.E. Artificial Intelligence & Data Science",
        school: "Dr. D. Y. Patil Institute of Technology",
        location: "Maharashtra, India",
        period: "2022 - 2026",
        grade: "CGPA: 8.26 / 10"
    },
    {
        degree: "Higher Secondary Certificate (12th)",
        school: "MES Waghire Junior College, Saswad",
        location: "MSBSHSE | Maharashtra, India",
        period: "2020 - 2022",
        grade: "Percentage: 76.17 / 100"
    },
    {
        degree: "Secondary School Certificate (10th)",
        school: "SHRI SADGURU SAMARTH HAMBIRBABA VIDYALAYA TAKALI BHIMA, Pune",
        location: "MSBSHSE | Maharashtra, India",
        period: "2019 - 2020",
        grade: "Percentage: 90.20 / 100"
    }
];

export const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Experience Column */}
                    <div>
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Journey</h2>
                        <h3 className="text-4xl font-extrabold text-white mb-12">Professional <span className="text-gradient">Experience</span></h3>

                        <div className="space-y-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l border-slate-800"
                                >
                                    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-indigo-500 rounded-full" />
                                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold mb-2">
                                        <Calendar size={14} /> {exp.period}
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-1">{exp.role}</h4>
                                    <p className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                                        <Briefcase size={16} /> {exp.company}
                                    </p>
                                    <ul className="space-y-3">
                                        {exp.points.map((point, index) => (
                                            <li key={index} className="text-slate-400 text-sm flex gap-3">
                                                <span className="text-indigo-500 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">Academics</h2>
                        <h3 className="text-4xl font-extrabold text-white mb-12">Formal <span className="text-gradient">Education</span></h3>

                        <div className="space-y-8">
                            {education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-8 border-l-4 border-l-indigo-600"
                                >
                                    <div className="flex items-center gap-3 text-indigo-400 mb-6">
                                        <GraduationCap size={32} />
                                        <div>
                                            <h4 className="text-xl font-bold text-white leading-tight">{edu.degree}</h4>
                                            <p className="text-sm text-slate-500">{edu.period}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-300 font-semibold">{edu.school}</p>
                                        <p className="text-slate-500 text-sm">{edu.location}</p>
                                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                            <span className="text-slate-400 text-sm uppercase font-bold tracking-wider">Academic Standing</span>
                                            <span className="text-white font-black text-xl">{edu.grade}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
