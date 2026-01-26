import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa6';
import Image from 'next/image';
import Image1 from '../assets/image.png';
import timetableimg from '../assets/timtable.png';
import whoamiBanner from '../assets/whoami_full.jpg';
import bushidoBanner from '../assets/bushido_full.png';

interface ProjectsProps {
    limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
    const projects = [
        {
            title: "whoami",
            description: "A multi-user portfolio platform featuring Clerk authentication, dynamic username routing, and ownership detection. Built for scalability.",
            tags: ["Next.js", "Clerk", "Prisma", "PostgreSQL"],
            image: whoamiBanner,
            github: "https://github.com/sivakumar232/whoami-core",
            link: null
        },
        {
            title: "Bushido Quotes",
            description: "A quotes API featuring wisdom from Bushido philosophy. Supports JSON and SVG embeds for easy integration.",
            tags: ["React", "Node.js", "Vercel"],
            image: bushidoBanner,
            github: "https://github.com/sivakumar232/Bushido",
            link: "https://bushido-zeta.vercel.app/"
        },
        {
            title: "BackdropUi",
            description: "Go-to place to find background gradients, ready to use in your projects, made with Tailwind.",
            tags: ["React", "Tailwind CSS"],
            image: Image1,
            github: "https://github.com/sivakumar232/BackdropUI",
            link: "https://sivakumar232.github.io/BackdropUI/"
        },
        {
            title: "Sync AI",
            description: "An AI-powered scheduling engine that uses a Genetic Algorithm to automatically generate optimized, clash-free timetables.",
            tags: ["React", "Tailwind CSS", "Supabase"],
            image: timetableimg,
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

            <div className="space-y-6">
                {displayedProjects.map((project, index) => (
                    <div key={index} className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all relative">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative h-48 md:h-auto">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                            </div>
                            <div className="md:w-3/5 p-4 md:p-6 flex flex-col">
                                <div className="flex items-start justify-between mb-3">
                                    <h2 className="text-xl font-bold text-black dark:text-white">{project.title}</h2>
                                    <div className="flex gap-2">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors" title="Live">
                                                <FaLink className="text-base text-neutral-600 dark:text-neutral-400" />
                                            </a>
                                        )}
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors" title="GitHub">
                                            <BsGithub className="text-base text-neutral-600 dark:text-neutral-400" />
                                        </a>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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
