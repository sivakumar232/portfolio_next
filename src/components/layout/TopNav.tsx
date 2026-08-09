'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const navLinks = [
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = navLinks.map(l => l.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
            <div
                className={`flex items-center gap-4 px-4 py-2 rounded-full transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border border-zinc-200/80 dark:border-zinc-800/80'
                        : 'bg-transparent border border-transparent'
                }`}
            >
                {navLinks.map(({ label, href }) => {
                    const isActive = activeSection === href.slice(1);
                    return (
                        <a
                            key={label}
                            href={href}
                            className={`text-[12px] font-medium tracking-wide transition-colors duration-200 ${
                                isActive
                                    ? 'text-zinc-900 dark:text-zinc-100'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                            }`}
                        >
                            {label}
                        </a>
                    );
                })}
                <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
                {mounted && (
                    <button
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {resolvedTheme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}
