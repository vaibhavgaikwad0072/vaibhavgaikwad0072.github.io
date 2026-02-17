"use client";

import React from 'react';

export const Footer = () => {
    return (
        <footer className="py-12 bg-slate-950 border-t border-slate-900">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Vaibhav Gaikwad. Built with Next.js, FastAPI mindset, and Indigo gradients.
                </p>
                <div className="flex gap-8 text-sm font-medium text-slate-400">
                    <a href="#about" className="hover:text-indigo-400">About</a>
                    <a href="#projects" className="hover:text-indigo-400">Projects</a>
                    <a href="#experience" className="hover:text-indigo-400">Experience</a>
                    <a href="mailto:vaibhavgaikwad3746@gmail.com" className="hover:text-indigo-400">Contact</a>
                </div>
            </div>
        </footer>
    );
};
