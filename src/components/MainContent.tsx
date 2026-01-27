"use client";

import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import OnekoLoader from './Onekoloader';
import VisitorCounter from './VisitorCounter';
import DarkThemeToggle from './DarkThemeToggle';
import Banner from './Banner';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import GithubActivity from './GithubActivity';
import Contact from './Contact';
import Quotes from './Quotes';

import { flushSync } from 'react-dom';

const MainContent: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null); // Initialize as null for hydration mismatch avoidance
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Initialize state after mount to avoid hydration mismatch
    useEffect(() => {
        setTime(new Date());
        if (typeof window !== 'undefined') {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDarkMode;
        setIsDarkMode(nextTheme);
        if (nextTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        } as any);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    // Removed the MutationObserver since we control the state now! 
    // Or keep it for external changes transparency, but removing avoids loops.
    // Keeping it simple: We control it.

    return (
        <div className="overflow-x-hidden bg-white dark:bg-black bg-no-repeat bg-center bg-fixed min-h-screen transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">

            {/* Theme Toggle - Fixed Top Right */}
            <div className="fixed top-6 right-6 z-50">
                <DarkThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>

            <div className="px-4 py-8 space-y-6 pt-8" style={{ maxWidth: '832px', margin: '0 auto' }}>

                <Banner />

                <About />

                <Projects limit={2} />

                <Skills />

                <GithubActivity isDarkMode={isDarkMode} />

                <Contact />

                <Quotes />

                {/* Footer */}
                <div className="w-full flex justify-between items-center border-t border-neutral-300 dark:border-neutral-700 py-4 text-sm">
                    <div className="text-left">
                        <div>
                            <span className="text-neutral-500 dark:text-neutral-500">Designed and Developed by </span>
                            <span className="font-bold text-black dark:text-white">Siva Kumar</span>
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-500 text-xs mt-1">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="text-neutral-500 dark:text-neutral-500 font-mono">
                            <VisitorCounter />
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-500 font-mono">
                            {time ? (
                                <>
                                    {time.getHours() % 12 || 12}:{time.getMinutes().toString().padStart(2, '0')} {time.getHours() >= 12 ? 'PM' : 'AM'}
                                </>
                            ) : (
                                // Placeholder for server-side render / initial client render
                                <span>--:-- --</span>
                            )}
                        </div>
                    </div>
                </div>

            </div >

            {/* Oneko Cat Animation */}
            < OnekoLoader />
        </div >
    );
};

export default MainContent;
