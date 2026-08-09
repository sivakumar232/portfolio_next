import React from 'react';
import Image from 'next/image';
import srkrLogo from '../assets/srkr_logo.jpg';

const Education: React.FC = () => {
    return (
        <div id="education">
            <div className="flex items-start border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl gap-3">
                <div className="w-9 h-9 shrink-0 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden relative">
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
                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            Sagi Ramakrishnam Raju Engineering College
                        </h3>
                        <span className="text-[11px] text-zinc-500 whitespace-nowrap sm:ml-4">2023 — 2027</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        Artificial Intelligence and Machine Learning
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Education;
