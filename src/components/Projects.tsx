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
        <div id="projects">
            <div className="relative">
                {/* Vertical dashed line in between 2 projects */}
                <div className="absolute top-0 bottom-[-4px] left-1/2 w-0 border-r border-solid border-zinc-400 dark:border-zinc-700 border-dashed-v -translate-x-1/2 pointer-events-none" />

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {displayed.map((project) => (
                        <div
                            key={project.title}
                            className="group flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full h-28 bg-zinc-100 dark:bg-zinc-900 shrink-0">
                                {project.image ? (
                                    <>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 300px"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">
                                                In Progress
                                            </span>
                                        </div>
                                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                            {project.title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-3 gap-2">
                                <div className="flex items-start justify-between gap-1">
                                    <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                                        {project.title}
                                    </h3>

                                </div>

                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mt-auto">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-1.5 py-0.5 text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="text-[9px] text-zinc-400">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        <BsGithub size={10} /> GitHub
                                    </a>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                        >
                                            <FaArrowUpRightFromSquare size={9} /> Live
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
                            className="inline-block px-5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-300"
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
