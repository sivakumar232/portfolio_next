import React from 'react';
import { skills } from '../data/skills';

export function Skills() {
    return (
        <div>
            <div className="flex flex-wrap gap-1.5">
                {skills.map(({ name, icon: Icon, color }) => (
                    <div
                        key={name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        <Icon className={`text-sm ${color}`} />
                        {name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;
