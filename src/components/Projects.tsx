'use client';

import React from 'react';
import Link from 'next/link';
import { projects } from '../data/projects';
import { FaArrowRight } from 'react-icons/fa6';

interface ProjectsProps {
    limit?: number;
    showSeeMore?: boolean;
}

export function Projects({ limit, showSeeMore = false }: ProjectsProps = {}) {
    const displayed = limit ? projects.slice(0, limit) : projects;
    return (
        <div className="flex flex-col gap-3">
            {displayed.map((project) => (
                <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="glass-panel group flex flex-col p-4 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200"
                >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                            {project.title}
                        </h3>
                        <FaArrowRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 shrink-0" />
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {project.description}
                    </p>
                </Link>
            ))}

            {(showSeeMore || (limit !== undefined && limit < projects.length)) && (
                <div className="pt-1">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
                    >
                        <span>See more</span>
                        <FaArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Projects;
