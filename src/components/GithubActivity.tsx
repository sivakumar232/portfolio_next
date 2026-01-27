import React from 'react';
import GitHubCalendar from 'react-github-calendar';

interface GithubActivityProps {
    isDarkMode: boolean;
}

const GithubActivity: React.FC<GithubActivityProps> = ({ isDarkMode }) => {
    return (
        <div id="github" className="text-black dark:text-white font-sans dark:bg-black rounded-xl px-6 py-4">
            <h1 className="text-2xl font-lato font-semibold text-center sm:text-left">GitHub Activity</h1>
            <div id="github-activity-container" className="mt-3 flex justify-center border px-10 border-dashed py-8  border-neutral-400 hover:border-neutral-600 dark:border-neutral-700 bg-white dark:bg-black text-sm font-semibold font-hanken sm:justify-start overflow-x-auto">
                <GitHubCalendar
                    username="sivakumar232"
                    blockSize={11}
                    blockMargin={4}
                    fontSize={14}
                    theme={{
                        light: ['#ebedf0', '#c4c4c8', '#9ca3af', '#6b7280', '#374151'],
                        dark: ['#0d1117', '#1a1625', '#2d1b4e', '#4c1d95', '#7c3aed'],
                    }}
                    colorScheme={isDarkMode ? 'dark' : 'light'}
                    style={{
                        color: isDarkMode ? '#fff' : '#000'
                    }}
                />
            </div>
        </div>
    );
};

export default GithubActivity;
