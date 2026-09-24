import { StaticImageData } from 'next/image';
import whoamiBanner from '../assets/project_banners/whoami.jpeg';
import syncaiBanner from '../assets/project_banners/syncai.jpeg';
import bushidoBanner from '../assets/project_banners/bushido.jpeg';
import backdropBanner from '../assets/project_banners/backdrop.jpeg';
import revaBanner from '../assets/project_banners/reva.jpeg';
import nebulaBanner from '../assets/project_banners/nebulasketch.jpeg';

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    highlights: string[];
    tags: string[];
    github: string;
    link: string | null;
    image?: StaticImageData;
    status: 'Live' | 'Building';
    year: string;
};

export const projects: Project[] = [
    {
        id: 'reva-ai',
        title: 'REVA AI',
        category: 'Multilingual AI & Civic Tech',
        year: '2024',
        status: 'Building',
        description: 'Complaint Intelligence Platform with multilingual voice-to-structured pipeline using Azure Speech + LLMs. Features geospatial routing across 1K+ locations and PII masking.',
        longDescription: 'REVA AI is an end-to-end civic complaint intelligence engine built to eliminate accessibility barriers in public grievance reporting. Designed for diverse communities speaking multiple vernacular languages, it allows citizens to submit voice or text complaints which are automatically transcribed, translated, and structured into actionable ticket schemas using Azure Speech Services paired with fine-tuned LLM pipelines. The system automatically masks sensitive Personally Identifiable Information (PII) to maintain strict privacy compliance, and utilizes PostGIS spatial indexing to route grievances across 1,000+ administrative wards and municipal jurisdictions.',
        highlights: [
            'Multilingual voice-to-structured ticket pipeline with high-fidelity speech transcription & intent classification',
            'Real-time PII anonymization engine that strips phone numbers, identification IDs, and private details from public logs',
            'Automated geospatial polygon routing with PostGIS to dispatch issues to over 1,000 administrative offices',
            'Administrative triage dashboard with automatic severity scoring, duplicate detection, and SLA resolution tracking',
        ],
        tags: ['Azure Speech', 'LLMs', 'PostGIS', 'JWT', 'Node.js', 'TypeScript', 'Fastify'],
        github: 'https://github.com/sivakumar232/REVA-AI/',
        link: null,
        image: revaBanner,
    },
    {
        id: 'nebulasketch',
        title: 'NebulaSketch',
        category: 'Real-Time Collaborative Web System',
        year: '2024',
        status: 'Building',
        description: 'Real-time multiplayer drawing game with WebSocket-driven low-latency interaction. Uses Redis for session management and fuzzy matching for guess validation.',
        longDescription: 'NebulaSketch is a fast-paced multiplayer drawing and social deduction web application engineered for zero-lag collaboration. Players draw prompts on an interactive HTML5 canvas while others guess the secret word in real time. The platform synchronizes vector brush strokes and canvas actions across clients using bidirectional WebSockets with sub-50ms latency. Redis powers the in-memory room state, turn rotations, and session management, while a Levenshtein-distance fuzzy string matching algorithm intelligently evaluates guesses to reward near-misses without spoiling the solution.',
        highlights: [
            'Sub-50ms bidirectional WebSocket sync streaming vector paths, brush opacity, and canvas actions',
            'Distributed in-memory room coordination and player turn rotation backed by Redis key-value storage',
            'Intelligent fuzzy string matching evaluating real-time guesses with typo tolerance and close-call hints',
            'Rich HTML5 Canvas toolset featuring customizable brush widths, color palettes, eraser physics, and undo history',
        ],
        tags: ['WebSockets', 'Redis', 'Node.js', 'Canvas API', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/sivakumar232/nebulasketch',
        link: null,
        image: nebulaBanner,
    },
    {
        id: 'whoami',
        title: 'whoami',
        category: 'Multi-Tenant Developer Platform',
        year: '2024',
        status: 'Building',
        description: 'A multi-user portfolio platform with Clerk auth, dynamic username routing, and ownership detection. Built for scalability.',
        longDescription: 'whoami is a modern multi-tenant developer profile and portfolio platform that lets engineers, creators, and students launch a sleek personal page in minutes. Utilizing Next.js dynamic routing and server-side rendering, each user receives a custom vanity URL with dedicated portfolio blocks. The application integrates Clerk for authentication, PostgreSQL and Prisma for relational persistence, and dynamic GitHub API data ingestion to automatically display pinned repositories, activity stats, and custom social link hubs.',
        highlights: [
            'Dynamic username routing with server-rendered pages and instant SEO meta tag generation',
            'Clerk-powered authentication with protected user settings, profile claims, and ownership detection',
            'Direct GitHub REST API integration to automatically display starred repositories and top technologies',
            'Clean glassmorphic and terminal-inspired UI themes with instant preview and dark mode support',
        ],
        tags: ['Next.js', 'Clerk', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/sivakumar232/whoami-core',
        link: null,
        image: whoamiBanner,
    },
    {
        id: 'bushido-quotes',
        title: 'Bushido Quotes',
        category: 'Philosophical Quotes API & Microservice',
        year: '2023',
        status: 'Live',
        description: 'A quotes API featuring wisdom from Bushido philosophy. Supports JSON and SVG embeds for easy integration into any project.',
        longDescription: 'Bushido Quotes is a developer-focused microservice and motivational API inspired by the timeless Samurai ethical code and the Seven Virtues of Bushido. It delivers curated aphorisms and historical philosophy through flexible JSON REST endpoints as well as dynamically rendered SVG markdown cards. The SVG generator was purpose-built for GitHub profile READMEs, incorporating automatic dark/light theme switching, responsive typography, and edge caching for rapid delivery.',
        highlights: [
            'Dynamic SVG card generation endpoint engineered for GitHub profile README markdown embeds',
            'REST API endpoints supporting random quote fetching, filtering by virtues, and search queries',
            'Minimalist web reader interface with dark/light mode toggle and one-click quote copying',
            'Deployed on Vercel Edge network with global cache headers for lightning-fast sub-20ms response times',
        ],
        tags: ['React', 'Node.js', 'Vercel Edge', 'REST API', 'SVG Generator', 'Tailwind CSS'],
        github: 'https://github.com/sivakumar232/Bushido',
        link: 'https://bushido-zeta.vercel.app/',
        image: bushidoBanner,
    },
    {
        id: 'backdrop-ui',
        title: 'BackdropUi',
        category: 'UI/UX Design Utility & Open Source',
        year: '2023',
        status: 'Live',
        description: 'Go-to place to find background gradients, ready to use in your projects, made with Tailwind CSS.',
        longDescription: 'BackdropUi is an open-source visual utility and design catalog dedicated to subtle background styling for modern web applications. It curates a collection of ambient gradient glows, radial dot matrices, mesh patterns, and glassmorphic card backgrounds. Frontend engineers can preview each background in real-world scenarios with live typography and components, and copy production-ready Tailwind CSS classes or CSS variables directly with a single click.',
        highlights: [
            'Interactive live playground showcasing backgrounds against real card components and typography',
            'Single-click copy utility for Tailwind CSS classes, arbitrary values, and raw CSS gradients',
            'Curated library of 30+ ambient dark-mode and light-mode background patterns and mesh gradients',
            'Zero runtime dependencies, open-source repository with active GitHub community contributions',
        ],
        tags: ['React', 'Tailwind CSS', 'Design Systems', 'CSS Mesh', 'Open Source'],
        github: 'https://github.com/sivakumar232/BackdropUI',
        link: 'https://sivakumar232.github.io/BackdropUI/',
        image: backdropBanner,
    },
    {
        id: 'sync-ai',
        title: 'Sync AI',
        category: 'Algorithmic Optimization & Scheduling Engine',
        year: '2024',
        status: 'Building',
        description: 'An AI-powered scheduling engine that uses a Genetic Algorithm to automatically generate optimized, clash-free timetables.',
        longDescription: 'Sync AI solves the complex, NP-hard academic scheduling puzzle by applying heuristic Genetic Algorithms to timetable generation. Academic institutions often struggle with overlapping professor hours, room capacity bottlenecks, and conflicting elective choices. Sync AI automates this by breeding and mutating candidate schedules across successive generations until finding a conflict-free solution that satisfies all strict constraints while maximizing user preference scores.',
        highlights: [
            'Multi-constraint Genetic Algorithm evaluating thousands of permutations to eliminate timetable clashes',
            'Custom fitness function balancing hard constraints (room limits, faculty overlaps) and soft preferences',
            'Visual timetable schedule viewer with conflict highlighting and manual override capabilities',
            'Supabase integration for cloud schedule persistence and collaborative multi-department management',
        ],
        tags: ['React', 'Genetic Algorithms', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Python'],
        github: 'https://github.com/sivakumar232/timetable-frontend',
        link: null,
        image: syncaiBanner,
    },
];
