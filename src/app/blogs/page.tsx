import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { TopNav } from '@/components/layout/TopNav';
import { BlogList } from '@/components/BlogList';
import VisitorCounter from '@/components/VisitorCounter';
import OnekoLoader from '@/components/Onekoloader';

export const metadata: Metadata = {
    title: 'Blogs — Siva Kumar Vemuri | AI Engineer',
    description: 'Articles, architectural deep dives, and thoughts on AI, LLMs, and systems engineering.',
    openGraph: {
        title: 'Blogs — Siva Kumar Vemuri',
        description: 'Articles, architectural deep dives, and thoughts on AI, LLMs, and systems engineering.',
        type: 'website',
    },
};

export default function BlogsPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">
            {/* Subtle ambient light depth for glassmorphism */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Universal TopNav */}
            <TopNav />

            {/* Main Content Container matching project layout & sizing */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                {/* Header Section */}
                <div className="pt-2 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Blogs
                    </h1>
                </div>

                {/* Articles List with hover focus effect */}
                <BlogList posts={posts} />

                {/* Footer */}
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
