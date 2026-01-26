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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProjects.map((project, index) => {
                    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                        const { currentTarget, clientX, clientY } = e;
                        const { left, top } = currentTarget.getBoundingClientRect();
                        const x = clientX - left;
                        const y = clientY - top;
                        currentTarget.style.setProperty("--mouse-x", `${x}px`);
                        currentTarget.style.setProperty("--mouse-y", `${y}px`);
                    };

                    return (
                        <div
                            key={index}
                            onMouseMove={handleMouseMove}
                            className="group flex flex-col p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-all relative h-full overflow-hidden"
                        >
                            {/* Hover Glow Effect */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(13, 178, 255, 0.08), transparent 40%)`
                                }}
                            />
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:block hidden"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)`
                                }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
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

                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed flex-grow font-hanken">
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
