import React from 'react';
import TopNav from '@/components/TopNav';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black bg-no-repeat bg-center bg-fixed transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
            <TopNav />
            <div className="px-4 py-8 pt-24" style={{ maxWidth: '832px', margin: '0 auto' }}>
                <h1 className="text-3xl font-hanken font-bold text-black dark:text-white mb-6">Blog</h1>
                <p className="text-neutral-600 dark:text-neutral-400">Coming soon...</p>
            </div>
        </div>
    );
}
