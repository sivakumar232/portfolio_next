import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BsGithub, BsCheck2 } from 'react-icons/bs';
import { FaArrowUpRightFromSquare, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { projects } from '@/data/projects';
import { Section } from '@/components/layout/Section';
import { TopNav } from '@/components/layout/TopNav';
import VisitorCounter from '@/components/VisitorCounter';
import OnekoLoader from '@/components/Onekoloader';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({
        id: p.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return {
            title: 'Project Not Found — Siva Kumar Vemuri',
        };
    }

    return {
        title: `${project.title} — Siva Kumar Vemuri | AI Engineer`,
        description: project.description,
        openGraph: {
            title: `${project.title} — Case Study & Architecture`,
            description: project.description,
            type: 'website',
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const currentIndex = projects.findIndex((p) => p.id === id);

    if (currentIndex === -1) {
        notFound();
    }

    const project = projects[currentIndex];
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">
            {/* Subtle ambient light depth for glassmorphism */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Universal TopNav */}
            <TopNav />

            {/* Main Content Container matching exactly home page layout & sizing */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                {/* Project Title & Short summary */}
                <div className="pt-2 pb-1">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {project.title}
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 mb-4 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Banner preview image */}
                {project.image && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm mt-1 mb-2">
                        <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, 672px"
                        />
                    </div>
                )}

                {/* Overview Section */}
                <Section title="Overview">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {project.longDescription}
                    </p>
                </Section>

                {/* Key Architecture & Highlights Section */}
                <Section title="Key Architecture & Highlights">
                    <div className="flex flex-col gap-2.5">
                        {project.highlights.map((highlight, idx) => (
                            <div
                                key={idx}
                                className="glass-panel flex items-start p-3 rounded-xl gap-3"
                            >
                                <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                                    <BsCheck2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    {highlight}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Technologies & Tools Section */}
                <Section title="Technologies & Tools">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-md border border-neutral-200 dark:border-neutral-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Links & Repository Section */}
                <Section title="Source & Links">
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
                        >
                            <BsGithub size={13} />
                            <span>View on GitHub</span>
                        </a>

                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                            >
                                <FaArrowUpRightFromSquare size={11} />
                                <span>Live Demo</span>
                            </a>
                        ) : null}
                    </div>
                </Section>

                {/* Next & Previous Projects Navigation */}
                <Section title="Browse More Projects">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link
                            href={`/project/${prevProject.id}`}
                            className="glass-panel group flex flex-col p-3 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
                        >
                            <span className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500 mb-1">
                                <FaArrowLeft className="w-2.5 h-2.5 transition-transform group-hover:-translate-x-1" />
                                <span>Previous</span>
                            </span>
                            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white">
                                {prevProject.title}
                            </span>
                        </Link>

                        <Link
                            href={`/project/${nextProject.id}`}
                            className="glass-panel group flex flex-col p-3 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors sm:text-right"
                        >
                            <span className="flex items-center sm:justify-end gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500 mb-1">
                                <span>Next</span>
                                <FaArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white">
                                {nextProject.title}
                            </span>
                        </Link>
                    </div>
                </Section>

                {/* Footer matching root layout */}
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
