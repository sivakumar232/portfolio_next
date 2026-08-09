import React from 'react';
import Image from 'next/image';
import mobImage from '../assets/mob.jpg';
import { socials } from '../data/socials';

export function Hero() {
    return (
        <div className="px-4 pb-5 pt-0">
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
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-0.5">
                Siva Kumar
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3">
                Full-stack Developer · India
            </p>

            {/* Bio */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                I build scalable, production-ready web apps. Currently going deeper into backend systems,
                DevOps, and impactful side projects.{' '}
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Open to collaborate.</span>
            </p>

            {/* Socials section */}
            <div className="mt-5">
                <h2 className="text-[10px] font-mono tracking-widest uppercase text-zinc-700 dark:text-zinc-500 mb-2.5">
                    Here are my <span className="font-bold text-zinc-900 dark:text-zinc-100">socials</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {socials.map(({ name, href, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
