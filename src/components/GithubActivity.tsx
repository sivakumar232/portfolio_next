'use client';

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from 'next-themes';

const GithubActivity: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === 'dark';

    return (
        <div>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4">
                {mounted ? (
                    <GitHubCalendar
                        username="sivakumar232"
                        blockSize={11}
                        blockMargin={4}
                        fontSize={12}
                        theme={{
                            light: ['#f4f4f5', '#e4e4e7', '#a1a1aa', '#71717a', '#18181b'],
                            dark: ['#18181b', '#27272a', '#52525b', '#a1a1aa', '#e4e4e7'],
                        }}
                        colorScheme={isDark ? 'dark' : 'light'}
                        style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
                    />
                ) : (
                    <div className="h-[120px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-900/50 rounded-lg" />
                )}
            </div>
        </div>
    );
};

export default GithubActivity;

