import React from 'react';

interface SectionProps {
    id?: string;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export function Section({ id, children, title, className = '' }: SectionProps) {
    if (title) {
        return (
            <section id={id} className={`flex flex-col scroll-mt-16 sm:scroll-mt-20 pt-8 sm:pt-10 ${className}`}>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3">
                    {title}
                </h2>
                <div>
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section id={id} className={`flex flex-col scroll-mt-16 sm:scroll-mt-20 pt-8 sm:pt-10 ${className}`}>
            <div>
                {children}
            </div>
        </section>
    );
}
