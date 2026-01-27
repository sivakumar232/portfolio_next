"use client";

import React from 'react';
import DarkThemeToggle from './DarkThemeToggle';

interface TopNavProps {
    isDarkMode?: boolean;
    toggleTheme?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ isDarkMode, toggleTheme }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-5xl mx-auto px-2 md:px-14 h-16 flex items-center justify-end">
                {/* Theme Toggle Only */}
                <DarkThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
        </nav>
    );
};

export default TopNav;
