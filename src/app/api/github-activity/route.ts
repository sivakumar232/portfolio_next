import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'sivakumar232';
const GITHUB_API = 'https://api.github.com';

interface CommitActivity {
    repo: string;
    repoUrl: string;
    commitsUrl: string;
    count: number;
}

interface RepoActivity {
    name: string;
    url: string;
    language: string | null;
    createdAt: string;
    description: string | null;
}

interface PullRequest {
    number: number;
    title: string;
    url: string;
    repo: string;
    repoUrl: string;
    state: string;
    merged: boolean;
    createdAt: string;
    branch: string;
}

export interface GithubActivityData {
    month: string;
    year: number;
    commits: {
        total: number;
        byRepo: CommitActivity[];
    };
    repos: RepoActivity[];
    pullRequests: {
        total: number;
        byRepo: { repo: string; repoUrl: string; prs: PullRequest[] }[];
    };
    fetchedAt: string;
}

// In-memory cache to save GitHub rate limits
let cachedData: GithubActivityData | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getMonthName(date: Date) {
    return date.toLocaleString('default', { month: 'long' });
}

function formatBranchTitle(branch: string, prNumber: number) {
    if (!branch) return `PR #${prNumber}`;
    // E.g. "feature/reflectionloop" -> "Feature/reflectionloop"
    const parts = branch.split('/');
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('/');
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    const now = Date.now();
    if (!forceRefresh && cachedData && now - lastCacheTime < CACHE_TTL_MS) {
        return NextResponse.json(cachedData, {
            headers: {
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
                'X-Cache': 'HIT',
            },
        });
    }

    try {
        const headers: HeadersInit = {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'portfolio-nextjs',
        };

        const token = process.env.GITHUB_TOKEN;
        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        // 1. Fetch public events (last 100 events)
        const eventsRes = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
            headers,
            next: { revalidate: 900 },
        });

        if (!eventsRes.ok) {
            if (cachedData) {
                return NextResponse.json(cachedData, {
                    headers: { 'Cache-Control': 'public, s-maxage=300' },
                });
            }
            return NextResponse.json(
                { error: `GitHub API error: ${eventsRes.status} ${eventsRes.statusText}` },
                { status: eventsRes.status }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const events: any[] = await eventsRes.json();
        if (!Array.isArray(events) || events.length === 0) {
            if (cachedData) return NextResponse.json(cachedData);
            return NextResponse.json({ error: 'No GitHub events found' }, { status: 404 });
        }

        // Determine target month & year from latest event
        const latestDate = new Date(events[0].created_at);
        const targetYear = latestDate.getFullYear();
        const targetMonth = latestDate.getMonth(); // 0-indexed
        const monthPrefix = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}`;
        const monthStartIso = `${monthPrefix}-01T00:00:00Z`;

        const monthEvents = events.filter((e) => typeof e.created_at === 'string' && e.created_at.startsWith(monthPrefix));

        // ── 2. Commits ─────────────────────────────────────────────────────────────
        const pushReposCount: Record<string, number> = {};
        for (const e of monthEvents) {
            if (e.type === 'PushEvent' && e.repo?.name) {
                const rname = e.repo.name;
                pushReposCount[rname] = (pushReposCount[rname] || 0) + 1;
            }
        }

        const pushRepoNames = Object.keys(pushReposCount);
        const commitsByRepo: CommitActivity[] = await Promise.all(
            pushRepoNames.map(async (repoName) => {
                const repoUrl = `https://github.com/${repoName}`;
                const commitsUrl = `https://github.com/${repoName}/commits?author=${GITHUB_USERNAME}`;
                try {
                    const cRes = await fetch(
                        `${GITHUB_API}/repos/${repoName}/commits?author=${GITHUB_USERNAME}&since=${monthStartIso}&per_page=100`,
                        { headers, next: { revalidate: 900 } }
                    );
                    if (cRes.ok) {
                        const commitsList = await cRes.json();
                        if (Array.isArray(commitsList)) {
                            return {
                                repo: repoName,
                                repoUrl,
                                commitsUrl,
                                count: commitsList.length,
                            };
                        }
                    }
                } catch {
                    // ignore error and fallback
                }
                return {
                    repo: repoName,
                    repoUrl,
                    commitsUrl,
                    count: pushReposCount[repoName] || 1,
                };
            })
        );

        commitsByRepo.sort((a, b) => b.count - a.count);
        const totalCommits = commitsByRepo.reduce((s, r) => s + r.count, 0);

        // ── 3. Repos Created ───────────────────────────────────────────────────────
        const createdRepos: RepoActivity[] = [];
        try {
            const userReposRes = await fetch(
                `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=created&direction=desc&per_page=15`,
                { headers, next: { revalidate: 900 } }
            );
            if (userReposRes.ok) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const userRepos: any[] = await userReposRes.json();
                if (Array.isArray(userRepos)) {
                    for (const r of userRepos) {
                        if (typeof r.created_at === 'string' && r.created_at.startsWith(monthPrefix)) {
                            createdRepos.push({
                                name: r.full_name,
                                url: r.html_url,
                                language: r.language ?? null,
                                createdAt: r.created_at,
                                description: r.description ?? null,
                            });
                        }
                    }
                }
            }
        } catch {
            // fallback gracefully
        }

        // ── 4. Pull Requests ───────────────────────────────────────────────────────
        const prMap = new Map<string, PullRequest>();
        for (const e of monthEvents) {
            if (e.type !== 'PullRequestEvent') continue;
            const payload = e.payload ?? {};
            const prObj = payload.pull_request ?? {};
            const prNum = payload.number ?? prObj.number ?? 1;
            const repoName = e.repo?.name;
            if (!repoName) continue;

            const prKey = `${repoName}#${prNum}`;
            const isMerged =
                payload.action === 'merged' ||
                Boolean(prObj.merged_at) ||
                prObj.merged === true;

            if (prMap.has(prKey)) {
                if (isMerged) {
                    const existing = prMap.get(prKey)!;
                    existing.merged = true;
                    existing.state = 'closed';
                }
                continue;
            }

            const branch = prObj.head?.ref ?? '';
            const rawTitle = prObj.title ?? formatBranchTitle(branch, prNum);
            const prUrl = prObj.html_url || `https://github.com/${repoName}/pull/${prNum}`;

            prMap.set(prKey, {
                number: prNum,
                title: rawTitle,
                url: prUrl,
                repo: repoName,
                repoUrl: `https://github.com/${repoName}`,
                state: isMerged || payload.action === 'closed' ? 'closed' : 'open',
                merged: isMerged,
                createdAt: e.created_at,
                branch,
            });
        }

        const prList = Array.from(prMap.values());
        prList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Group PRs by repo
        const groupedMap = new Map<string, PullRequest[]>();
        for (const pr of prList) {
            const list = groupedMap.get(pr.repo) ?? [];
            list.push(pr);
            groupedMap.set(pr.repo, list);
        }

        const pullRequestsByRepo = Array.from(groupedMap.entries()).map(([repo, prs]) => ({
            repo,
            repoUrl: prs[0]?.repoUrl || `https://github.com/${repo}`,
            prs,
        }));

        const result: GithubActivityData = {
            month: getMonthName(latestDate),
            year: targetYear,
            commits: {
                total: totalCommits,
                byRepo: commitsByRepo,
            },
            repos: createdRepos,
            pullRequests: {
                total: prList.length,
                byRepo: pullRequestsByRepo,
            },
            fetchedAt: new Date().toISOString(),
        };

        cachedData = result;
        lastCacheTime = Date.now();

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
                'X-Cache': 'MISS',
            },
        });
    } catch (err) {
        console.error('GitHub activity fetch error:', err);
        if (cachedData) {
            return NextResponse.json(cachedData);
        }
        return NextResponse.json({ error: 'Failed to fetch GitHub activity' }, { status: 500 });
    }
}
