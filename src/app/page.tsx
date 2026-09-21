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
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300">

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
                <footer className="pt-8 pb-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs text-zinc-400 dark:text-zinc-600">
                            &copy; {new Date().getFullYear()} Siva Kumar. All rights reserved.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                        <VisitorCounter />
                    </div>
                </footer>

            </main>

            <OnekoLoader />

        </div>
    );
}
