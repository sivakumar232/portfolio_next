import React from 'react';
import Image from 'next/image';
import srkrLogo from '../assets/srkr_logo.jpg';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';

const About: React.FC = () => {
    return (
        <div id="about" className="-mt-10">
            {/* About Section Text */}
            <div className="px-14 py-4">
                <div className="text-black dark:text-white flex flex-col font-hanken rounded-xl">
                    <div>

                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            <span className="font-semibold text-black dark:text-white">Full-stack developer</span> from India. I build scalable, production-ready web apps using{' '}
                            <span className="inline-flex items-center gap-1 font-semibold text-black dark:text-white align-middle">
                                <FaReact className="text-sm sm:text-base relative top-[1px]" />
                                <span>React</span>
                            </span>
                            ,{' '}
                            <span className="inline-flex items-center gap-1 font-semibold text-black dark:text-white align-middle">
                                <SiNextdotjs className="text-sm sm:text-base relative top-[1px]" />
                                <span>Next.js</span>
                            </span>
                            ,{' '}
                            <span className="inline-flex items-center gap-1 font-semibold text-black dark:text-white align-middle">
                                <SiTypescript className="text-sm sm:text-base relative top-[1px]" />
                                <span>TypeScript</span>
                            </span>
                            , and{' '}
                            <span className="inline-flex items-center gap-1 font-semibold text-black dark:text-white align-middle">
                                <FaNodeJs className="text-sm sm:text-base relative top-[1px]" />
                                <span>Node.js</span>
                            </span>
                            . Currently going deeper into backend systems and impactful projects. If you're looking to <span className="font-semibold text-black dark:text-white">collaborate</span> or need help with something, feel free to reach out.I'm always excited to work on meaningful projects.
                        </p>

                    </div>
                </div>
            </div>

            {/* Education Section - Original Style */}
            <div className="text-black dark:text-white font-hanken rounded-xl px-14 py-4">
                <h1 className="text-lg sm:text-xl font-hanken font-semibold mb-4 sm:mb-6">Education</h1>
                <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 shrink-0 border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden relative">
                        <Image
                            src={srkrLogo}
                            alt="SRKR Engineering College"
                            className="object-cover"
                            fill
                            sizes="40px"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                            <h2 className="text-sm font-bold text-black dark:text-white hover:underline transition-colors">
                                Sagi Ramakrishnam Raju Engineering College
                            </h2>
                            <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap sm:ml-4">2023 — 2027</span>
                        </div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                            Artificial Intelligence and Machine Learning
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
