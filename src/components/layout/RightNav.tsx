'use client';

import React, { useEffect, useRef, useState } from 'react';

const sections = [
    { id: 'education',    label: 'Education'    },
    { id: 'projects', label: 'Projects' },
    { id: 'skills',   label: 'Skills'   },
    { id: 'github',   label: 'GitHub'   },
    { id: 'contact',  label: 'Contact'  },
];

/**
 * Fixed right nav — anchored immediately beside the content column (340px from center).
 * Uses a smooth sliding pill indicator for the active section.
 */
export function RightNav() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sections.findIndex(s => s.id === entry.target.id);
                        if (idx !== -1) setActiveIndex(idx);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Update sliding indicator position when active changes
    useEffect(() => {
        const el = linkRefs.current[activeIndex];
        if (!el) return;
        const parent = el.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        setIndicatorStyle({
            top: rect.top - parentRect.top,
            height: rect.height,
            opacity: 1,
        });
    }, [activeIndex]);

    return (
        <nav
            className="hidden xl:flex flex-col fixed top-1/2 -translate-y-1/2 z-50"
            style={{ left: 'calc(50% + 356px)' }}
        >
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-3 pl-3">
                Index
            </p>

            <div className="relative flex flex-col">
                {/* Sliding pill indicator */}
                <div
                    className="absolute left-0 w-0.5 rounded-full bg-zinc-900 dark:bg-white transition-all duration-300 ease-out"
                    style={{
                        top: indicatorStyle.top,
                        height: indicatorStyle.height,
                        opacity: indicatorStyle.opacity,
                    }}
                />

                {sections.map(({ id, label }, i) => {
                    const isActive = activeIndex === i;
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            ref={el => { linkRefs.current[i] = el; }}
                            className={`pl-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-300 ease-out ${
                                isActive
                                    ? 'text-zinc-900 dark:text-zinc-100 translate-x-1'
                                    : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-400 translate-x-0'
                            }`}
                        >
                            {label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
