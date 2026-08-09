import {
    FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub,
} from 'react-icons/fa';
import {
    SiTailwindcss, SiNextdotjs, SiExpress, SiPostgresql, SiMongodb,
    SiSupabase, SiPrisma, SiTypescript, SiPostman, SiVercel,
    SiDocker, SiLinux,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export type Skill = {
    name: string;
    icon: IconType;
    color: string;
};

export const skills: Skill[] = [
    { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
    { name: 'React.js', icon: FaReact, color: 'text-[#61DAFB]' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-[#38BDF8]' },
    { name: 'HTML', icon: FaHtml5, color: 'text-[#E34F26]' },
    { name: 'CSS', icon: FaCss3Alt, color: 'text-[#1572B6]' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-[#339933]' },
    { name: 'Express', icon: SiExpress, color: 'text-zinc-600 dark:text-white' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169E1]' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
    { name: 'Supabase', icon: SiSupabase, color: 'text-[#3ECF8E]' },
    { name: 'Prisma', icon: SiPrisma, color: 'text-[#2D3748] dark:text-white' },
    { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
    { name: 'GitHub', icon: FaGithub, color: 'text-black dark:text-white' },
    { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
    { name: 'Linux', icon: SiLinux, color: 'text-black dark:text-white' },
    { name: 'Postman', icon: SiPostman, color: 'text-[#FF6C37]' },
    { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
];
