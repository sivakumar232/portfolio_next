import React from 'react';
import Image from 'next/image';
import srkrLogo from '../assets/srkr_logo.jpg';

const Education: React.FC = () => {
    return (
        <div>
            <div className="flex items-start border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl gap-3 bg-white dark:bg-neutral-950">
                <div className="w-9 h-9 shrink-0 border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden relative">
                    <Image
                        src={srkrLogo}
                        alt="SRKR Engineering College"
                        className="object-cover"
                        fill
                        sizes="36px"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 break-words min-w-0">
                            Sagi Ramakrishnam Raju Engineering College
                        </h3>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap sm:ml-4">
                            2023 — 2027
                        </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Artificial Intelligence and Machine Learning
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Education;
