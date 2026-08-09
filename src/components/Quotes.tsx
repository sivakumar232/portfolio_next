'use client';

import React, { useState, useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const quotes = [
    { text: 'Man is made by his belief. As he believes, so he is.', author: 'Bhagavad Gita' },
    { text: 'The mind can be your friend or your enemy.', author: 'Bhagavad Gita' },
    { text: 'A person is elevated by the self, and degraded by the self.', author: 'Bhagavad Gita' },
    { text: 'One who has faith attains wisdom.', author: 'Bhagavad Gita' },
    { text: 'You become what you constantly think about.', author: 'Bhagavad Gita' },
    { text: 'Act without attachment, and you will be free.', author: 'Bhagavad Gita' },
    { text: 'You are what your deepest desire is.', author: 'Upanishads' },
    { text: 'As the mind is, so is the person.', author: 'Upanishads' },
    { text: 'When the self is known, all is known.', author: 'Upanishads' },
    { text: 'The self is the witness of all thoughts.', author: 'Upanishads' },
    { text: 'From truth, wisdom arises.', author: 'Upanishads' },
];

const Quotes: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(Math.floor(Math.random() * quotes.length));
    }, []);

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-6 py-5 text-center group">
            <FaQuoteLeft className="text-zinc-300 dark:text-zinc-700 text-2xl mx-auto mb-4 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2 font-medium">
                &ldquo;{quotes[current].text}&rdquo;
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
                — {quotes[current].author}
            </p>
        </div>
    );
};

export default Quotes;
