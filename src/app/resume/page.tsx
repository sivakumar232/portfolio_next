import React from 'react';
import type { Metadata } from 'next';
import { TopNav } from '@/components/layout/TopNav';
import VisitorCounter from '@/components/VisitorCounter';
import OnekoLoader from '@/components/Onekoloader';
import ResumeViewer from '@/components/ResumeViewer';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Resume — Siva Kumar Vemuri | AI Engineer',
    description: 'Resume and experience of Siva Kumar Vemuri. Specializing in AI agents, LLMs, and scalable systems.',
    openGraph: {
        title: 'Resume — Siva Kumar Vemuri',
        description: 'Resume and experience of Siva Kumar Vemuri.',
        type: 'website',
    },
};

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">
            {/* Subtle ambient light depth */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Universal TopNav */}
            <TopNav />

            {/* Main Content Container matching exactly other pages layout & sizing */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                {/* Header Section matching blogs & projects */}
                <div className="pt-2 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Resume
                    </h1>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5">
                        <a
                            href="/res_portfolio.pdf"
                            download="Siva_Kumar_Vemuri_Resume.pdf"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download PDF
                        </a>
                    </div>
                </div>

                {/* Embedded PDF Viewer */}
                <div className="pt-6">
                    <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                        <ResumeViewer />
                    </div>
                </div>

                {/* Mobile Fallback Note */}
                <div className="mt-4 text-center sm:text-left">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Having trouble previewing?{' '}
                        <a
                            href="/res_portfolio.pdf"
                            download="Siva_Kumar_Vemuri_Resume.pdf"
                            className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            Click here to download the PDF directly
                        </a>
                        .
                    </p>
                </div>

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
