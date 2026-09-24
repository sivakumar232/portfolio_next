import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { TopNav } from '@/components/layout/TopNav';
import VisitorCounter from '@/components/VisitorCounter';
import OnekoLoader from '@/components/Onekoloader';
import { FaArrowLeft } from 'react-icons/fa6';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Blog Not Found — Siva Kumar Vemuri',
        };
    }

    return {
        title: `${post.title} — Siva Kumar Vemuri | AI Engineer`,
        description: post.description || `Read ${post.title} on Siva Kumar Vemuri's blog.`,
        openGraph: {
            title: `${post.title} — Siva Kumar Vemuri`,
            description: post.description,
            type: 'article',
        },
    };
}

function formatDisplayDate(dateStr: string): string {
    try {
        const parsed = parseISO(dateStr);
        if (!isNaN(parsed.getTime())) {
            return format(parsed, 'MMMM d, yyyy');
        }
    } catch {
        // Fallback
    }
    return dateStr;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">
            {/* Ambient light glow */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Universal TopNav */}
            <TopNav />

            {/* Main Content Container matching project layout & sizing */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                {/* Back Link */}
                <div className="pt-2 pb-4">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        <span>Back to Blogs</span>
                    </Link>
                </div>

                {/* Article Header */}
                <header className="pt-2 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 mb-2.5">
                        <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                        {post.title}
                    </h1>
                </header>

                {/* Article Body */}
                <article className="mt-8 prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-7 mb-3">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-6 mb-2">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 my-4 pl-2">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 my-4 pl-2">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 py-1 my-4 italic text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                                    {children}
                                </blockquote>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target={href?.startsWith('http') ? '_blank' : undefined}
                                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-500"
                                >
                                    {children}
                                </a>
                            ),
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-xs sm:text-sm">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 font-semibold">
                                    {children}
                                </thead>
                            ),
                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-black/40">
                                    {children}
                                </tbody>
                            ),
                            tr: ({ children }) => (
                                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                                    {children}
                                </tr>
                            ),
                            th: ({ children }) => (
                                <th className="px-3.5 py-2.5 text-left text-xs font-semibold tracking-wider text-zinc-800 dark:text-zinc-200">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="px-3.5 py-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                                    {children}
                                </td>
                            ),
                            img: ({ src, alt }) => (
                                <img
                                    src={src}
                                    alt={alt || ''}
                                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 my-6 max-w-full h-auto"
                                />
                            ),
                            code: ({ className, children, ...props }) => {
                                const isInline = !className && typeof children === 'string' && !children.includes('\n');
                                if (isInline) {
                                    return (
                                        <code
                                            className="px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-700/50"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }
                                return (
                                    <code className="text-xs font-mono leading-relaxed" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ children }) => (
                                <pre className="p-4 rounded-lg my-5 overflow-x-auto bg-zinc-950 text-zinc-100 border border-zinc-800 text-xs sm:text-sm font-mono leading-relaxed">
                                    {children}
                                </pre>
                            ),
                            hr: () => (
                                <hr className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Bottom Back Button */}
                <div className="mt-12 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        <span>Back to All Blogs</span>
                    </Link>
                </div>

                {/* Footer */}
                <footer className="pt-8 pb-12 mt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            &copy; {new Date().getFullYear()} Siva Kumar Vemuri. All rights reserved.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <VisitorCounter />
                    </div>
                </footer>
            </main>

            <OnekoLoader />
        </div>
    );
}
