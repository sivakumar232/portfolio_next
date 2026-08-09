import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
    title: 'Siva Kumar — Full Stack Developer',
    description: 'Portfolio of Siva Kumar — Full-stack developer building scalable web applications with React, Next.js, TypeScript, and Node.js.',
    icons: { icon: '/favicon.png' },
    openGraph: {
        title: 'Siva Kumar — Full Stack Developer',
        description: 'Full-stack developer building scalable, production-ready web apps.',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange={false}
                >
                    {children}
                    {/* Bottom gradient fade-out blur mask */}
                    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-50 backdrop-blur-[1.5px]" />
                </ThemeProvider>
            </body>
        </html>
    );
}
