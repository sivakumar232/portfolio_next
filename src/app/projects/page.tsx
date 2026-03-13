import React from 'react';
import Projects from '@/components/Projects';
import { useClickSound } from "../../hooks/useClickSound";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black bg-no-repeat bg-center bg-fixed transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="px-4 py-8" style={{ maxWidth: '832px', margin: '0 auto' }}>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors "
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </a>
                <Projects />
            </div>
        </div>
    );
}
