'use client';

import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const quote = {
    text: 'One who has faith attains wisdom.',
    author: 'Bhagavad Gita',
};

const Quotes: React.FC = () => {
    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-6 py-5 text-center group">
            <FaQuoteLeft className="text-zinc-300 dark:text-zinc-700 text-2xl mx-auto mb-4 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
            <p className="text-sm leading-relaxed mb-2 font-medium shiny-text inline-block">
                &ldquo;{quote.text}&rdquo;
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
                — {quote.author}
            </p>
        </div>
    );
};

export default Quotes;


