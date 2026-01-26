"use client";

import React, { useState, useEffect } from "react";

interface DarkThemeToggleProps {
    isDarkMode?: boolean;
    toggleTheme?: () => void;
}

const DarkThemeToggle: React.FC<DarkThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
    // If props are missing (e.g. initial render/safety), we fallback to local state reading,
    // but ideally we rely on parent. For now assume parent handles state.

    // We don't need local state for 'isDarkMode' anymore if passed from parent.
    // We only need local state if props are undefined.
    // For simplicity, let's assume always passed.

    const handleClick = () => {
        if (toggleTheme) {
            toggleTheme();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 rounded-full bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 group relative"
            aria-label="Toggle theme"
            style={{ viewTransitionName: 'theme-toggle-btn' }}
        >
            {isDarkMode ? (
                <div className="text-yellow-500 group-hover:rotate-90 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                </div>
            ) : (
                <div className="text-neutral-600 group-hover:-rotate-12 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                </div>
            )}
        </button>
    );
};

export default DarkThemeToggle;
