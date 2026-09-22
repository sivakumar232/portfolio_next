import React from 'react';
import { skills } from '../data/skills';

export function Skills() {
    return (
        <div>
            <div className="flex flex-wrap gap-1.5">
                {skills.map(({ name, icon: Icon }) => (
                    <div
                        key={name}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs font-medium text-neutral-900 dark:text-neutral-100"
                    >
                        <Icon className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;
