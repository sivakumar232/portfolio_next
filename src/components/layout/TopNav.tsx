'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const mountedRef = useRef(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            setMounted(true);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === '#' || href === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', '/');
            return;
        }
        const targetId = href.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full z-[100] transition-colors duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 ${
                scrolled ? 'shadow-xs' : ''
            }`}
        >
            {/* Content container aligned exactly with the page content column */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 h-11 sm:h-12 flex items-center justify-between">
                {/* Navigation Links */}
                <nav className="flex items-center gap-1 sm:gap-2 md:gap-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -ml-2.5 sm:-ml-3">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={(e) => scrollToSection(e, href)}
                            className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Right side: Divider & Theme Toggle */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 -mr-1 sm:-mr-1.5 ml-2">
                    <div className="w-px h-3.5 bg-zinc-200 dark:bg-zinc-800" />
                    {mounted && (
                        <button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className="p-1 sm:p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
