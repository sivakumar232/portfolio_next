'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { projects } from '../data/projects';

interface ProjectsProps {
    limit?: number;
}

export function Projects({ limit }: ProjectsProps) {
    const displayed = limit ? projects.slice(0, limit) : projects;

    return (
        <div>
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {displayed.map((project) => (
                        <div
                            key={project.title}
                            className="group flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full h-28 bg-neutral-100 dark:bg-neutral-900 shrink-0">
                                {project.image ? (
                                    <>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 300px"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent pointer-events-none z-10" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
                                            <span className="text-xs font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                                                In Progress
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {project.title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-3 gap-2">
                                <div className="flex items-start justify-between gap-1">
                                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-tight">
                                        {project.title}
                                    </h3>
                                </div>

                                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mt-auto">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 rounded border border-neutral-200 dark:border-neutral-800"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                    >
                                        <BsGithub size={11} /> GitHub
                                    </a>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            <FaArrowUpRightFromSquare size={10} /> Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {limit && (
                    <div className="mt-6 text-center relative z-10">
                        <Link
                            href="/projects"
                            className="inline-block px-5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-xs font-medium text-neutral-900 dark:text-neutral-100"
                        >
                            Show More Projects
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;
