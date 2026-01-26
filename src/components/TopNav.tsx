"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import DarkThemeToggle from './DarkThemeToggle';

interface TopNavProps {
    isDarkMode?: boolean;
    toggleTheme?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ isDarkMode, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Playground', href: '/playground' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="font-hanken font-bold text-xl text-black dark:text-white">
                    Siva Kumar
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                                pathname === item.href
                                    ? "text-black dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <DarkThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <DarkThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black dark:text-white"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-4 shadow-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                                "text-base font-medium py-2 px-4 rounded-md transition-colors",
                                pathname === item.href
                                    ? "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default TopNav;
