import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-hanken',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Siva Kumar — AI Engineer',
    description: 'Portfolio of Siva Kumar — AI Engineer specializing in AI agents, agentic workflows, and scalable AI applications.',
    icons: { icon: '/favicon.png' },
    openGraph: {
        title: 'Siva Kumar — AI Engineer',
        description: 'AI Engineer specializing in AI agents, agentic workflows, and shipping production AI applications.',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={hankenGrotesk.variable}>
            <head />
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
