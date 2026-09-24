import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import './globals.css';

const gtFlexa = localFont({
    src: [
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Light-Trial.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Light-Italic-Trial.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Regular-Trial.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Regular-Italic-Trial.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Medium-Trial.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Medium-Italic-Trial.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Bold-Trial.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Bold-Italic-Trial.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Black-Trial.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-gt-flexa',
    display: 'swap',
});

const gtFlexaMono = localFont({
    src: [
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Mono-Regular-Trial.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Mono-Medium-Trial.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/GT-Flexa/GT-Flexa-Mono-Bold-Trial.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-gt-flexa-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Siva Kumar Vemuri — AI Engineer',
    description: 'Portfolio of Siva Kumar Vemuri — AI Engineer specializing in AI agents, agentic workflows, and scalable AI applications.',
    icons: { icon: '/favicon.png' },
    openGraph: {
        title: 'Siva Kumar Vemuri — AI Engineer',
        description: 'AI Engineer specializing in AI agents, agentic workflows, and shipping production AI applications.',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${gtFlexa.variable} ${gtFlexaMono.variable}`}>
            <head />
            <body className="antialiased bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
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
