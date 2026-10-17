'use client';

import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaRandom } from 'react-icons/fa';
import { quotes, Quote } from '@/data/quotes';

const Quotes: React.FC = () => {
    // Default to the first quote for initial SSR to prevent hydration mismatch
    const [quote, setQuote] = useState<Quote>(quotes[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const pickRandomQuote = (excludeIndex?: number) => {
        if (quotes.length <= 1) return;
        let nextIndex = Math.floor(Math.random() * quotes.length);
        if (typeof excludeIndex === 'number' && nextIndex === excludeIndex) {
            nextIndex = (nextIndex + 1) % quotes.length;
        }
        setIsAnimating(true);
        setTimeout(() => {
            setQuote(quotes[nextIndex]);
            try {
                sessionStorage.setItem('last_quote_index', nextIndex.toString());
            } catch {
                // Ignore storage errors in private browsing/restricted environments
            }
            setIsAnimating(false);
        }, 150);
    };

    useEffect(() => {
        // Pick a random quote on mount / every refresh
        try {
            const lastIndexStr = sessionStorage.getItem('last_quote_index');
            const lastIndex = lastIndexStr !== null ? parseInt(lastIndexStr, 10) : -1;
            pickRandomQuote(isNaN(lastIndex) ? undefined : lastIndex);
        } catch {
            pickRandomQuote();
        }
    }, []);

    const handleShuffle = () => {
        const currentIndex = quotes.findIndex((q) => q.text === quote.text);
        pickRandomQuote(currentIndex !== -1 ? currentIndex : undefined);
    };

    return (
        <div className="glass-panel relative rounded-xl px-6 py-5 text-center group transition-all duration-300">
            {/* Shuffle button on hover for quick interaction */}
            <button
                type="button"
                onClick={handleShuffle}
                aria-label="Get another quote"
                title="Shuffle quote"
                className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 opacity-60 group-hover:opacity-100 cursor-pointer"
            >
                <FaRandom className="text-xs" />
            </button>

            <FaQuoteLeft className="text-neutral-300 dark:text-neutral-700 text-2xl mx-auto mb-4 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />

            <div
                className={`transition-opacity duration-200 ease-in-out ${
                    isAnimating ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
                }`}
            >
                <p className="text-sm leading-relaxed mb-2 font-medium shiny-text inline-block">
                    &ldquo;{quote.text}&rdquo;
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    — {quote.author}
                </p>
            </div>
        </div>
    );
};

export default Quotes;
