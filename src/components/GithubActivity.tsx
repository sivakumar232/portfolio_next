'use client';

import React, { useState } from 'react';

// GitHub Octicons
const CommitIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.5 7.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm1.43.75a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 1 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 1 1 0 1.5h-3.32Z" />
    </svg>
);

const RepoIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
    </svg>
);

const PullRequestIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
);

const CollapseIcon = () => (
    <svg className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" viewBox="0 0 16 16" fill="currentColor">
        <path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.823 15.323l-2.896-2.896a.25.25 0 0 1 .177-.427h2.146v-1.25a.75.75 0 0 1 1.5 0v1.25h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0Z" />
    </svg>
);

const GitBranchIcon = () => (
    <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-[#848d97] shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
);

const GithubActivity: React.FC = () => {
    const [openCommits, setOpenCommits] = useState(true);
    const [openRepos, setOpenRepos] = useState(true);
    const [openPRs, setOpenPRs] = useState(true);

    return (
        <div className="w-full text-zinc-900 dark:text-zinc-100 font-sans">
            {/* ── Month & Year Header ── */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        September
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                        2026
                    </span>
                </div>
                <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* ── Vertical Timeline Container ── */}
            <div className="relative pl-7 sm:pl-9 ml-3 sm:ml-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-7 pb-2">

                {/* ── Event 1: Commits ── */}
                <div className="relative">
                    {/* Circle Node Icon */}
                    <div className="absolute -left-[43px] sm:-left-[51px] top-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-xs">
                        <CommitIcon />
                    </div>

                    {/* Event Header */}
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            Created 39 commits in 2 repositories
                        </h3>
                        <button
                            onClick={() => setOpenCommits(!openCommits)}
                            aria-label="Toggle commits"
                            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 p-1 cursor-pointer transition-colors"
                        >
                            <CollapseIcon />
                        </button>
                    </div>

                    {/* Commits List */}
                    {openCommits && (
                        <div className="mt-3 space-y-2.5">
                            {/* clg-chatbot */}
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div className="flex items-baseline gap-2 min-w-0">
                                    <a
                                        href="https://github.com/sivakumar232/clg-chatbot"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline font-medium truncate"
                                    >
                                        sivakumar232/clg-chatbot
                                    </a>
                                    <span className="text-zinc-400 dark:text-zinc-500 whitespace-nowrap text-[11px] font-mono">
                                        37 commits
                                    </span>
                                </div>
                                <div className="w-28 sm:w-44 h-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-full overflow-hidden shrink-0">
                                    <div className="w-[95%] h-full bg-zinc-800 dark:bg-zinc-200 rounded-full" />
                                </div>
                            </div>

                            {/* portfolio_next */}
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div className="flex items-baseline gap-2 min-w-0">
                                    <a
                                        href="https://github.com/sivakumar232/portfolio_next"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline font-medium truncate"
                                    >
                                        sivakumar232/portfolio_next
                                    </a>
                                    <span className="text-zinc-400 dark:text-zinc-500 whitespace-nowrap text-[11px] font-mono">
                                        2 commits
                                    </span>
                                </div>
                                <div className="w-28 sm:w-44 h-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-full overflow-hidden shrink-0">
                                    <div className="w-[12%] h-full bg-zinc-500 dark:bg-zinc-400 rounded-full" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Event 2: Created Repository ── */}
                <div className="relative">
                    {/* Circle Node Icon */}
                    <div className="absolute -left-[43px] sm:-left-[51px] top-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-xs">
                        <RepoIcon />
                    </div>

                    {/* Event Header */}
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            Created 1 repository
                        </h3>
                        <button
                            onClick={() => setOpenRepos(!openRepos)}
                            aria-label="Toggle repositories"
                            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 p-1 cursor-pointer transition-colors"
                        >
                            <CollapseIcon />
                        </button>
                    </div>

                    {/* Repo Details */}
                    {openRepos && (
                        <div className="mt-3 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-zinc-400 dark:text-zinc-500">
                                    <RepoIcon />
                                </span>
                                <a
                                    href="https://github.com/sivakumar232/clg-chatbot"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline font-medium truncate"
                                >
                                    sivakumar232/clg-chatbot
                                </a>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 shrink-0 text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                                    <span>Python</span>
                                </div>
                                <span className="text-zinc-400 dark:text-zinc-500">Sep 4</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Event 3: Pull Requests ── */}
                <div className="relative">
                    {/* Circle Node Icon */}
                    <div className="absolute -left-[43px] sm:-left-[51px] top-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-xs">
                        <PullRequestIcon />
                    </div>

                    {/* Event Header */}
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            Opened 4 pull requests in 1 repository
                        </h3>
                        <button
                            onClick={() => setOpenPRs(!openPRs)}
                            aria-label="Toggle pull requests"
                            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 p-1 cursor-pointer transition-colors"
                        >
                            <CollapseIcon />
                        </button>
                    </div>

                    {/* PRs Details */}
                    {openPRs && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-2.5">
                                <a
                                    href="https://github.com/sivakumar232/clg-chatbot"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors truncate"
                                >
                                    sivakumar232/clg-chatbot
                                </a>

                                <div className="flex items-center gap-1.5">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                                        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-[9px] font-bold">
                                            4
                                        </span>
                                        merged
                                    </span>
                                </div>
                            </div>

                            {/* PR Items List */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <GitBranchIcon />
                                        <a
                                            href="https://github.com/sivakumar232/clg-chatbot"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline truncate"
                                        >
                                            Feature/interface
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 dark:text-zinc-500 shrink-0 text-xs font-mono">
                                        Sep 13
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <GitBranchIcon />
                                        <a
                                            href="https://github.com/sivakumar232/clg-chatbot"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline truncate"
                                        >
                                            Feature/agenticrag
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 dark:text-zinc-500 shrink-0 text-xs font-mono">
                                        Sep 13
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <GitBranchIcon />
                                        <a
                                            href="https://github.com/sivakumar232/clg-chatbot"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline truncate"
                                        >
                                            Feature/retreivalv1
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 dark:text-zinc-500 shrink-0 text-xs font-mono">
                                        Sep 9
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <GitBranchIcon />
                                        <a
                                            href="https://github.com/sivakumar232/clg-chatbot"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline truncate"
                                        >
                                            refactor(ingestion): optimize document processing and chunking quality
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 dark:text-zinc-500 shrink-0 text-xs font-mono">
                                        Sep 8
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* ── Show more activity button (Matching theme) ── */}
            <div className="mt-4 pt-2">
                <a
                    href="https://github.com/sivakumar232"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-center text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                >
                    Show more activity
                </a>
            </div>
        </div>
    );
};

export default GithubActivity;

