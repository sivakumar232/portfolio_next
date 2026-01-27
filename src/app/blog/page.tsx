
import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-black bg-no-repeat bg-center bg-fixed transition-colors duration-300 relative bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="px-4 py-8" style={{ maxWidth: '832px', margin: '0 auto' }}>
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-hanken font-bold text-black dark:text-white">Blog</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Thoughts, updates, and tutorials.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                            <article className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold font-hanken text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <span className="text-sm text-neutral-500 dark:text-neutral-500 whitespace-nowrap shrink-0 ml-4">
                                        {format(new Date(post.date), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}

                    {posts.length === 0 && (
                        <p className="text-neutral-500 italic">No posts found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
