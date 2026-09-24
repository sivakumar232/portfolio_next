import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { TopNav } from '@/components/layout/TopNav';
import { Projects } from '@/components/Projects';
import VisitorCounter from '@/components/VisitorCounter';
import OnekoLoader from '@/components/Onekoloader';

export const metadata: Metadata = {
    title: 'Projects — Siva Kumar Vemuri | AI Engineer',
    description: 'All engineering projects and systems built by Siva Kumar Vemuri.',
    openGraph: {
        title: 'Projects — Siva Kumar Vemuri | AI Engineer',
        description: 'All engineering projects and systems built by Siva Kumar Vemuri.',
        type: 'website',
    },
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">
            {/* Subtle ambient light depth for glassmorphism */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Universal TopNav */}
            <TopNav />

            {/* Main Content Container matching exactly home page layout & sizing */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                {/* Full version of #projects */}
                <Section title="Projects">
                    <Projects />
                </Section>

                {/* Footer matching root layout */}
                <footer className="pt-8 pb-12 mt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            &copy; {new Date().getFullYear()} Siva Kumar Vemuri. All rights reserved.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <VisitorCounter />
                    </div>
                </footer>
            </main>

            <OnekoLoader />
        </div>
    );
}
