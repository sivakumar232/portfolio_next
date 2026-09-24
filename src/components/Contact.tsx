'use client';

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import WarmTooltip from './WarmTooltip';

const Contact: React.FC = () => {
    return (
        <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">
                I&apos;m always open to new projects, creative ideas, or opportunities. Feel free to reach out.
            </p>

            {/* Schedule */}
            <a
                href="https://cal.com/siva-kumar-vdv1fl/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 mb-5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a 15-min Call
            </a>

            {/* Email */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-5">
                <svg className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sivakamarr3105@gmail.com" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    sivakamarr3105@gmail.com
                </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
                {[
                    { href: 'https://github.com/sivakumar232', icon: FaGithub, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/sivakumarvemuri', icon: FaLinkedin, label: 'LinkedIn' },
                    { href: 'https://x.com/sivakumarr3105', icon: FaXTwitter, label: 'Twitter / X' },
                ].map(({ href, icon: Icon, label }) => (
                    <WarmTooltip key={label} content={label} side="top" size="sm">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                        >
                            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </a>
                    </WarmTooltip>
                ))}
            </div>
        </div>
    );
};

export default Contact;
