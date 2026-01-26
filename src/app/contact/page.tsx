import React from 'react';
import TopNav from '@/components/TopNav';
import Contact from '@/components/Contact';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black bg-no-repeat bg-center bg-fixed transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
            <TopNav />
            <div className="px-4 py-8 pt-24" style={{ maxWidth: '832px', margin: '0 auto' }}>
                <Contact />
            </div>
        </div>
    );
}
