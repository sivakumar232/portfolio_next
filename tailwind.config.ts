import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'hanken': ['"Hanken Grotesk"', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],
                'bebas_neue': ['Bebas_Neue', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
                'lato': ['Lato', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
                'roboto-mono': ['"Roboto Mono"', 'monospace'],
                'ubuntu': ['Ubuntu', 'sans-serif'],
                'orbitron': ['Orbitron', 'monospace'],
            },
        },
    },
    plugins: [],
};

export default config;
