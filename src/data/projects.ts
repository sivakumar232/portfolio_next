import { StaticImageData } from 'next/image';
import whoamiBanner from '../assets/project_banners/whoami.jpeg';
import syncaiBanner from '../assets/project_banners/syncai.jpeg';
import bushidoBanner from '../assets/project_banners/bushido.jpeg';
import backdropBanner from '../assets/project_banners/backdrop.jpeg';

export type Project = {
    title: string;
    description: string;
    tags: string[];
    github: string;
    link: string | null;
    image?: StaticImageData;
    status: 'Live' | 'Building';
};

export const projects: Project[] = [
    {
        title: 'REVA AI',
        description: 'Complaint Intelligence Platform with multilingual voice-to-structured pipeline using Azure Speech + LLMs. Features geospatial routing across 1K+ locations and PII masking.',
        tags: ['Azure Speech', 'LLMs', 'PostGIS', 'JWT', 'Node.js'],
        github: 'https://github.com/sivakumar232/REVA-AI/',
        link: null,
        status: 'Building',
    },
    {
        title: 'NebulaSketch',
        description: 'Real-time multiplayer drawing game with WebSocket-driven low-latency interaction. Uses Redis for session management and fuzzy matching for guess validation.',
        tags: ['WebSockets', 'Redis', 'Node.js', 'Canvas API'],
        github: 'https://github.com/sivakumar232/nebulasketch',
        link: null,
        status: 'Building',
    },
    {
        title: 'whoami',
        description: 'A multi-user portfolio platform with Clerk auth, dynamic username routing, and ownership detection. Built for scalability.',
        tags: ['Next.js', 'Clerk', 'Prisma', 'PostgreSQL'],
        github: 'https://github.com/sivakumar232/whoami-core',
        link: null,
        image: whoamiBanner,
        status: 'Building',
    },
    {
        title: 'Bushido Quotes',
        description: 'A quotes API featuring wisdom from Bushido philosophy. Supports JSON and SVG embeds for easy integration into any project.',
        tags: ['React', 'Node.js', 'Vercel'],
        github: 'https://github.com/sivakumar232/Bushido',
        link: 'https://bushido-zeta.vercel.app/',
        image: bushidoBanner,
        status: 'Live',
    },
    {
        title: 'BackdropUi',
        description: 'Go-to place to find background gradients, ready to use in your projects, made with Tailwind CSS.',
        tags: ['React', 'Tailwind CSS'],
        github: 'https://github.com/sivakumar232/BackdropUI',
        link: 'https://sivakumar232.github.io/BackdropUI/',
        image: backdropBanner,
        status: 'Live',
    },
    {
        title: 'Sync AI',
        description: 'An AI-powered scheduling engine that uses a Genetic Algorithm to automatically generate optimized, clash-free timetables.',
        tags: ['React', 'Tailwind CSS', 'Supabase'],
        github: 'https://github.com/sivakumar232/timetable-frontend',
        link: null,
        image: syncaiBanner,
        status: 'Building',
    },
];
