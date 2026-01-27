"use client";

import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa6';

interface ProjectsProps {
    limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
    const projects = [
        {
            title: "whoami",
            description: "A multi-user portfolio platform featuring Clerk authentication, dynamic username routing, and ownership detection. Built for scalability.",
            tags: ["Next.js", "Clerk", "Prisma", "PostgreSQL"],
            github: "https://github.com/sivakumar232/whoami-core",
            link: null
        },
        {
            title: "Bushido Quotes",
            description: "A quotes API featuring wisdom from Bushido philosophy. Supports JSON and SVG embeds for easy integration.",
            tags: ["React", "Node.js", "Vercel"],
            github: "https://github.com/sivakumar232/Bushido",
            link: "https://bushido-zeta.vercel.app/"
        },
        {
            title: "BackdropUi",
            description: "Go-to place to find background gradients, ready to use in your projects, made with Tailwind.",
            tags: ["React", "Tailwind CSS"],
            github: "https://github.com/sivakumar232/BackdropUI",
            link: "https://sivakumar232.github.io/BackdropUI/"
        },
        {
            title: "Sync AI",
            description: "An AI-powered scheduling engine that uses a Genetic Algorithm to automatically generate optimized, clash-free timetables.",
            tags: ["React", "Tailwind CSS", "Supabase"],
            github: "https://github.com/sivakumar232/timetable-frontend",
            link: null
        }
    ];

    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <div id="projects" className="text-black dark:text-white rounded-xl px-6 py-4">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-sm font-hanken font-semibold text-neutral-400 ">Featured</h1>
                    <h1 className="text-2xl font-hanken font-semibold">Projects</h1>
                </div>
                {limit && (
                    <a href="/projects" className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        View All &rarr;
                    </a>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {displayedProjects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex flex-col md:flex-row bg-transparent border border-dashed border-neutral-400 hover:border-neutral-600 dark:border-neutral-700   transition-all relative overflow-hidden"
                        >
                            {/* Project Image - Left Side */}
                            <div className="p-4 flex items-center justify-center">
                                <div className="relative w-full md:w-56 h-40 md:h-40 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-pink-900/30 rounded-lg overflow-hidden">
                                    {/* Placeholder for project image - you can replace this later */}
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section - Right Side */}
                            <div className="relative z-10 flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-xl font-bold font-hanken text-black dark:text-white pr-4">{project.title}</h2>
                                    <div className="flex gap-2 shrink-0">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors" title="Live">
                                                <FaLink size={18} />
                                            </a>
                                        )}
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors" title="GitHub">
                                            <BsGithub size={18} />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed font-hanken">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {limit && (
                <div className="mt-8 text-center">
                    <a
                        href="/projects"
                        className="inline-block px-6 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
                    >
                        Show More Projects
                    </a>
                </div>
            )}
        </div>
    );
};

export default Projects;
