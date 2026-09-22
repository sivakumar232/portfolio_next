import { Section } from '@/components/layout/Section';
import { TopNav } from '@/components/layout/TopNav';
import { Banner } from '@/components/Banner';
import { Hero } from '@/components/Hero';
import Education from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import GithubActivity from '@/components/GithubActivity';
import Contact from '@/components/Contact';
import Quotes from '@/components/Quotes';
import OnekoLoader from '@/components/Onekoloader';
import VisitorCounter from '@/components/VisitorCounter';

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300 overflow-x-hidden">

            {/* Subtle ambient light depth for glassmorphism */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/25 dark:to-transparent rounded-full blur-3xl" />
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-t from-zinc-200/40 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-full blur-3xl" />
            </div>

            {/* Fixed navbar */}
            <TopNav />

            {/* ── Main Content Container ── */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 flex flex-col z-10 relative">
                
                {/* ── Banner ── */}
                <div className="relative mb-0">
                    <Banner />
                </div>

                {/* ── Hero ── */}
                <Hero />

                {/* ── Content sections ── */}
                <Section id="education" title="Education">
                    <Education />
                </Section>

                <Section id="projects" title="Projects">
                    <Projects limit={4} />
                </Section>

                <Section id="skills" title="Skills & Tools">
                    <Skills />
                </Section>

                <Section id="github" title="GitHub Activity">
                    <GithubActivity />
                </Section>

                <Section id="contact" title="Contact">
                    <Contact />
                </Section>

                <Section>
                    <Quotes />
                </Section>

                {/* ── Footer ── */}
                <footer className="pt-8 pb-12 mt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            &copy; {new Date().getFullYear()} Siva Kumar. All rights reserved.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <VisitorCounter />
                    </div>
                </footer>

            </main>

            <OnekoLoader />

        </div>
    );
}
