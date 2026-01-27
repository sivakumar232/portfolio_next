"use client";

import React from 'react';
import Image from 'next/image';
import { BsGithub } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa6';
import whoamiBanner from '../assets/project_banners/whoami.jpeg';
import syncaiBanner from '../assets/project_banners/syncai.jpeg';
import bushidoBanner from '../assets/project_banners/bushido.jpeg';
import backdropBanner from '../assets/project_banners/backdrop.jpeg';

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
            link: null,
            image: whoamiBanner
        },
        {
            title: "Bushido Quotes",
            description: "A quotes API featuring wisdom from Bushido philosophy. Supports JSON and SVG embeds for easy integration.",
            tags: ["React", "Node.js", "Vercel"],
            github: "https://github.com/sivakumar232/Bushido",
            link: "https://bushido-zeta.vercel.app/",
            image: bushidoBanner
        },
        {
            title: "BackdropUi",
            description: "Go-to place to find background gradients, ready to use in your projects, made with Tailwind.",
            tags: ["React", "Tailwind CSS"],
            github: "https://github.com/sivakumar232/BackdropUI",
            link: "https://sivakumar232.github.io/BackdropUI/",
            image: backdropBanner
        },
        {
            title: "Sync AI",
            description: "An AI-powered scheduling engine that uses a Genetic Algorithm to automatically generate optimized, clash-free timetables.",
            tags: ["React", "Tailwind CSS", "Supabase"],
            github: "https://github.com/sivakumar232/timetable-frontend",
            link: null,
            image: syncaiBanner
        }
    ];

    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <div id="projects" className="text-black dark:text-white rounded-xl px-2 md:px-14 py-4">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-xs font-hanken font-semibold text-neutral-400">Featured</h1>
                    <h1 className="text-xl font-hanken font-semibold">Projects</h1>
                </div>
                {limit && (
                    <a href="/projects" className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        View All &rarr;
                    </a>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {displayedProjects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex flex-col md:flex-row bg-white dark:bg-black border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all relative overflow-hidden p-5 gap-4 rounded-xl"
                        >
                            {/* Project Image */}
                            <div className="flex items-center justify-center shrink-0">
                                <div className="relative w-full md:w-80 h-40 rounded-lg overflow-hidden">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="rounded-lg object-cover"
                                            sizes="(max-width: 768px) 100vw, 320px"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="relative z-10 flex flex-col flex-1 py-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-base font-bold font-hanken text-black dark:text-white">
                                        {project.title}
                                    </h2>
                                    <div className="flex gap-3 shrink-0">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-700 border-dashed px-2.5 py-1 rounded-md text-black dark:text-white text-[10px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                                            >
                                                <FaLink size={14} /> Live
                                            </a>
                                        )}
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-700 border-dashed px-2.5 py-1 rounded-md text-black dark:text-white text-[10px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                                        >
                                            <BsGithub size={16} /> GitHub
                                        </a>
                                    </div>
                                </div>

                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed font-hanken">
                                    {project.description}
                                </p>

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-black dark:text-white font-semibold text-[10px] uppercase tracking-wide">Technologies Used:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-[9px] font-medium bg-neutral-100 dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-800"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
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
