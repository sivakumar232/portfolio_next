'use client';

import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import type { BlogPost } from '@/lib/blog';

interface BlogListProps {
    posts: BlogPost[];
}

function formatDisplayDate(dateStr: string): string {
    try {
        const parsed = parseISO(dateStr);
        if (!isNaN(parsed.getTime())) {
            return format(parsed, 'MMM d, yyyy');
        }
    } catch {
        // Fallback
    }
    return dateStr;
}

export function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    No blogs yet. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {posts.map((post) => (
                <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group block py-5 px-4 -mx-4 rounded-xl border border-transparent hover:border-zinc-200/70 dark:hover:border-zinc-800/70 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(0,0,0,0.4)] transition-all duration-200"
                >
                    <article>
                        <div className="flex items-center gap-2.5 text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                            <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                        </div>

                        <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {post.title}
                        </h2>

                        {post.description && (
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                                {post.description}
                            </p>
                        )}
                    </article>
                </Link>
            ))}
        </div>
    );
}

export default BlogList;
