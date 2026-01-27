import React from 'react';

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black bg-no-repeat bg-center bg-fixed transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="px-4 py-8" style={{ maxWidth: '832px', margin: '0 auto' }}>
                <h1 className="text-3xl font-hanken font-bold text-black dark:text-white mb-6">Playground</h1>
                <p className="text-neutral-600 dark:text-neutral-400">Coming soon...</p>
            </div>
        </div>
    );
}
