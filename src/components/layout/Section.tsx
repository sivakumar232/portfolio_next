import React from 'react';

interface SectionProps {
    id?: string;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

/** Small square marker at every grid intersection */
function CornerDot({ side, position = 'top' }: { side: 'left' | 'right'; position?: 'top' | 'bottom' }) {
    return (
        <span
            className={`absolute ${position === 'top' ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2'} ${side === 'left' ? '-left-5 -translate-x-1/2' : '-right-5 translate-x-1/2'} w-[2px] h-[2px] rounded-none bg-zinc-400 dark:bg-zinc-700 z-20 hidden md:block`}
        />
    );
}

export function Section({ id, children, title, className = '' }: SectionProps) {
    if (title) {
        return (
            <div id={id} className={`relative flex flex-col scroll-mt-24 ${className}`}>
                {/* 1. Heading row */}
                <div className="relative py-2 mt-1">
                    {/* Top horizontal border */}
                    <div className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    
                    {/* Intersection Dots */}
                    <CornerDot side="left" />
                    <CornerDot side="right" />

                    <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {title}
                    </h2>

                    {/* Bottom horizontal border */}
                    <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    <CornerDot side="left" position="bottom" />
                    <CornerDot side="right" position="bottom" />
                </div>

                {/* 2. Content row */}
                <div className="relative pt-6 pb-6">
                    {children}
                </div>
            </div>
        );
    }

    // If no title, just render the content block with its top border and corner dots
    return (
        <div id={id} className={`relative flex flex-col ${className}`}>
            <div className="relative pt-6 pb-6">
                {/* Top horizontal border */}
                <div className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                
                <CornerDot side="left" />
                <CornerDot side="right" />

                {children}
            </div>
        </div>
    );
}
