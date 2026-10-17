'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { GithubActivityData } from '@/app/api/github-activity/route';

// ── Icons ────────────────────────────────────────────────────────────────────
const CommitIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.5 7.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm1.43.75a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 1 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 1 1 0 1.5h-3.32Z" />
    </svg>
);

const RepoIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
    </svg>
);

const PullRequestIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
);

const GitBranchIcon = () => (
    <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
);

const CollapseIcon = ({ open }: { open: boolean }) => (
    <svg
        className={`w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-transform duration-200 ${open ? '' : 'rotate-180'}`}
        viewBox="0 0 16 16"
        fill="currentColor"
    >
        <path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.823 15.323l-2.896-2.896a.25.25 0 0 1 .177-.427h2.146v-1.25a.75.75 0 0 1 1.5 0v1.25h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0Z" />
    </svg>
);

const RefreshIcon = ({ spinning }: { spinning: boolean }) => (
    <svg
        className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`}
        viewBox="0 0 16 16"
        fill="currentColor"
    >
        <path d="M8 3a5 5 0 1 0 4.546 2.914.75.75 0 0 1 1.357-.636A6.5 6.5 0 1 1 8 1.5v1.5Z" />
        <path d="M6.5 1.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" />
    </svg>
);

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString('default', { month: 'short', day: 'numeric' });
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Rust: '#dea584',
    Go: '#00ADD8',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Shell: '#89e051',
};

// ── Skeleton Loader ──────────────────────────────────────────────────────────
const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse rounded bg-neutral-200 dark:bg-neutral-800 ${className}`} />
);

const ActivitySkeleton = () => (
    <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-4 w-24" />
            <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="relative pl-7 sm:pl-9 ml-3 sm:ml-4 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-7 pb-2">
            {[0, 1, 2].map((i) => (
                <div key={`skeleton-${i}`} className="relative">
                    <div className="absolute -left-[39px] sm:-left-[47px] top-0 w-6 h-6 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900" />
                    <Skeleton className="h-4 w-48 mb-3" />
                    <div className="space-y-2 mt-3">
                        <Skeleton className="h-3 w-40" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ── Section Component ────────────────────────────────────────────────────────
function ActivitySection({
    icon,
    title,
    open,
    onToggle,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <div className="absolute -left-[40px] sm:-left-[48px] top-0 w-6 h-6 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shadow-xs">
                {icon}
            </div>
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
                <button
                    onClick={onToggle}
                    aria-label="Toggle section"
                    className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 p-1 cursor-pointer transition-colors"
                >
                    <CollapseIcon open={open} />
                </button>
            </div>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────
const GithubActivity: React.FC = () => {
    const [data, setData] = useState<GithubActivityData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const [openCommits, setOpenCommits] = useState(true);
    const [openRepos, setOpenRepos] = useState(true);
    const [openPRs, setOpenPRs] = useState(true);

    const fetchActivity = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);
        try {
            const endpoint = isRefresh ? '/api/github-activity?refresh=true' : '/api/github-activity';
            const res = await fetch(endpoint, {
                cache: isRefresh ? 'no-store' : 'default',
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json: GithubActivityData = await res.json();
            setData(json);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to load activity');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchActivity();
    }, [fetchActivity]);

    if (loading) return <ActivitySkeleton />;

    if (error) {
        return (
            <div className="w-full flex flex-col items-center gap-3 py-8 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{error}</p>
                <button
                    onClick={() => fetchActivity(true)}
                    className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!data) return null;

    const { month, year, commits, repos, pullRequests } = data;
    const hasActivity = commits.total > 0 || repos.length > 0 || pullRequests.total > 0;

    return (
        <div className="w-full text-neutral-900 dark:text-neutral-100 font-sans">
            {/* ── Month Header ── */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {month}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{year}</span>
                </div>
                <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
                <button
                    onClick={() => fetchActivity(true)}
                    disabled={refreshing}
                    aria-label="Refresh activity"
                    title="Refresh GitHub activity"
                    className="shrink-0 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-0.5 disabled:opacity-40 cursor-pointer"
                >
                    <RefreshIcon spinning={refreshing} />
                </button>
            </div>

            {!hasActivity ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 py-4">
                    No public activity found for this month.
                </p>
            ) : (
                <div className="relative pl-7 sm:pl-9 ml-3 sm:ml-4 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-7 pb-2">

                    {/* ── Commits ── */}
                    {commits.total > 0 && (
                        <ActivitySection
                            icon={<CommitIcon />}
                            title={`Created ${commits.total} commit${commits.total !== 1 ? 's' : ''} in ${commits.byRepo.length} repositor${commits.byRepo.length !== 1 ? 'ies' : 'y'}`}
                            open={openCommits}
                            onToggle={() => setOpenCommits((v) => !v)}
                        >
                            <div className="space-y-2.5">
                                {commits.byRepo.map((r, rIdx) => {
                                    const pct = Math.max(8, Math.round((r.count / commits.total) * 100));
                                    return (
                                        <div key={r.repo || `commit-${rIdx}`} className="flex items-center justify-between gap-4 text-xs">
                                            <div className="flex items-baseline gap-2 min-w-0">
                                                <a
                                                    href={r.commitsUrl || r.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-neutral-900 dark:text-neutral-100 hover:underline font-medium truncate"
                                                >
                                                    {r.repo}
                                                </a>
                                                <span className="text-neutral-500 dark:text-neutral-400 whitespace-nowrap text-xs font-mono">
                                                    {r.count} commit{r.count !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <div className="w-24 sm:w-40 h-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-full overflow-hidden shrink-0">
                                                <div
                                                    className="h-full bg-neutral-800 dark:bg-neutral-200 rounded-full transition-all duration-500"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ActivitySection>
                    )}

                    {/* ── Repositories Created ── */}
                    {repos.length > 0 && (
                        <ActivitySection
                            icon={<RepoIcon />}
                            title={`Created ${repos.length} repositor${repos.length !== 1 ? 'ies' : 'y'}`}
                            open={openRepos}
                            onToggle={() => setOpenRepos((v) => !v)}
                        >
                            <div className="space-y-2.5">
                                {repos.map((r, rIdx) => (
                                    <div key={r.url || r.name || `repo-${rIdx}`} className="flex items-center justify-between text-xs gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-neutral-400 dark:text-neutral-500 shrink-0">
                                                <RepoIcon />
                                            </span>
                                            <a
                                                href={r.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neutral-900 dark:text-neutral-100 hover:underline font-medium truncate"
                                            >
                                                {r.name}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 shrink-0 text-xs font-mono">
                                            {r.language && (
                                                <div className="flex items-center gap-1.5">
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{
                                                            backgroundColor: LANG_COLORS[r.language] ?? '#888',
                                                        }}
                                                    />
                                                    <span>{r.language}</span>
                                                </div>
                                            )}
                                            <span>{formatDate(r.createdAt)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActivitySection>
                    )}

                    {/* ── Pull Requests ── */}
                    {pullRequests.total > 0 && (
                        <ActivitySection
                            icon={<PullRequestIcon />}
                            title={`Opened ${pullRequests.total} pull request${pullRequests.total !== 1 ? 's' : ''} in ${pullRequests.byRepo.length} repositor${pullRequests.byRepo.length !== 1 ? 'ies' : 'y'}`}
                            open={openPRs}
                            onToggle={() => setOpenPRs((v) => !v)}
                        >
                            <div className="space-y-4">
                                {pullRequests.byRepo.map((group, groupIdx) => (
                                    <div key={group.repo || `pr-group-${groupIdx}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <a
                                                href={group.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors truncate font-mono"
                                            >
                                                {group.repo}
                                            </a>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                {group.prs.some((pr) => pr.merged) && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium font-mono bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:purple-300 border border-purple-200 dark:border-purple-900/50">
                                                        <span className="flex items-center justify-center w-3 h-3 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-[9px] font-bold">
                                                            {group.prs.filter((pr) => pr.merged).length}
                                                        </span>
                                                        merged
                                                    </span>
                                                )}
                                                {group.prs.some((pr) => !pr.merged && pr.state === 'open') && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                                                        <span className="flex items-center justify-center w-3 h-3 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold">
                                                            {group.prs.filter((pr) => !pr.merged && pr.state === 'open').length}
                                                        </span>
                                                        open
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {group.prs.map((pr, prIdx) => (
                                                <div
                                                    key={pr.url || `${group.repo}-${pr.number || pr.branch || prIdx}`}
                                                    className="flex items-center justify-between gap-2 text-xs"
                                                >
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <GitBranchIcon />
                                                        <a
                                                            href={pr.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-neutral-900 dark:text-neutral-100 hover:underline truncate"
                                                        >
                                                            {pr.title}
                                                        </a>
                                                    </div>
                                                    <span className="text-neutral-500 dark:text-neutral-400 shrink-0 text-xs font-mono">
                                                        {formatDate(pr.createdAt)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActivitySection>
                    )}
                </div>
            )}

            {/* ── Footer ── */}
            <div className="mt-4 pt-2">
                <a
                    href="https://github.com/sivakumar232"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-colors"
                >
                    Show more activity on GitHub
                </a>
            </div>
        </div>
    );
};

export default GithubActivity;
