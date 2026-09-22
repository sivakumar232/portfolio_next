import React from 'react';
import Image from 'next/image';
import mobImage from '../assets/mob.jpg';
import { socials } from '../data/socials';
import WarmTooltip, { WarmTooltipGroup } from './WarmTooltip';

export function Hero() {
    return (
        <div className="pb-6 pt-0">
            {/* Avatar row */}
            <div className="flex mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden relative shadow-sm -mt-8 sm:-mt-10">
                    <Image
                        src={mobImage}
                        alt="Siva Kumar"
                        fill
                        className="object-cover"
                        priority
                        sizes="80px"
                    />
                </div>
            </div>

            {/* Name + subtitle */}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Siva Kumar
            </h1>
            <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 mb-3">
                AI Engineer · India
            </p>

            {/* Bio */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                Building intelligent systems, fine-tuning LLMs, and shipping production AI applications.
                Specializing in AI agents, agentic workflows, and scalable architectures.{' '}
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Open to collaborate.</span>
            </p>

            {/* Socials section */}
            <div className="mt-5">
                <h2 className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-2.5">
                    Here are my <span className="font-bold text-zinc-900 dark:text-zinc-100">socials</span>
                </h2>
                <WarmTooltipGroup delay={250} warmWindow={300} travel={280}>
                    <div className="flex items-center gap-2 pt-1">
                        {socials.map(({ name, href, icon: Icon }) => (
                            <WarmTooltip
                                key={name}
                                content={name}
                                side="top"
                                size="sm"
                                radius={6}
                                gap={8}
                                arrow
                            >
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                                >
                                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                </a>
                            </WarmTooltip>
                        ))}
                    </div>
                </WarmTooltipGroup>
            </div>
        </div>
    );
}
