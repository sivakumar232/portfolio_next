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

function CornerDot({ side, position = 'top' }: { side: 'left' | 'right'; position?: 'top' | 'bottom' }) {
    return (
        <span
            className={`absolute ${position === 'top' ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2'} ${side === 'left' ? '-left-5 -translate-x-1/2' : '-right-5 translate-x-1/2'} w-[2px] h-[2px] rounded-none bg-zinc-400 dark:bg-zinc-700 z-20 hidden md:block`}
        />
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300">

            {/* Fixed navbar */}
            <TopNav />

            {/* ── Page-Level Vertical Grid Lines ── */}
            <div className="absolute top-0 bottom-0 left-[30%] w-0 border-r border-solid border-zinc-400 dark:border-zinc-700 border-dashed-v pointer-events-none hidden md:block" />
            <div className="absolute top-0 bottom-0 right-[30%] w-0 border-r border-solid border-zinc-400 dark:border-zinc-700 border-dashed-v pointer-events-none hidden md:block" />

            {/* ── Centered Content Flow Column (40% width) ── */}
            <div className="ml-0 mr-0 md:ml-[30%] md:mr-[30%] pt-16 pb-20 sm:pb-28 px-5 flex flex-col z-10 relative min-h-screen">
                
                {/* ── Banner + Hero: uses negative margins to span exactly to the vertical lines ── */}
                <div className="relative -mx-5">
                    {/* Top horizontal border */}
                    <div className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-solid border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    
                    {/* Corner Dots at top edge of Banner (aligned with -mx-5) */}
                    <span className="absolute top-0 -translate-y-1/2 left-0 -translate-x-1/2 w-[2px] h-[2px] rounded-none bg-zinc-900 dark:bg-zinc-100 z-20 hidden md:block" />
                    <span className="absolute top-0 -translate-y-1/2 right-0 translate-x-1/2 w-[2px] h-[2px] rounded-none bg-zinc-900 dark:bg-zinc-100 z-20 hidden md:block" />
                    
                    {/* Banner and Hero components take up full width including padding */}
                    <div className="px-5">
                        <Banner />
                        <Hero />
                    </div>
                </div>

                {/* ── Content sections — each with title in its own grid row ── */}
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

                <Section id="contact">
                    <Contact />
                </Section>

                <Section>
                    <Quotes />
                </Section>

                {/* ── Footer ── */}
                <div className="relative py-4 flex justify-between items-center mt-6">
                    {/* Top horizontal border */}
                    <div className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-solid border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    <CornerDot side="left" />
                    <CornerDot side="right" />
                    <div>
                        <p className="text-xs text-zinc-500">
                            Designed &amp; built by{' '}
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Siva Kumar</span>
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                        <VisitorCounter />
                    </div>
                </div>

                {/* Bottom cap */}
                <div className="relative h-4">
                    {/* Top horizontal border */}
                    <div className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-solid border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    <CornerDot side="left" />
                    <CornerDot side="right" />
                </div>

                {/* Bottom-most horizontal border */}
                <div className="relative h-4">
                    <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-solid border-zinc-400 dark:border-zinc-700 border-dashed-h pointer-events-none" />
                    <CornerDot side="left" position="bottom" />
                    <CornerDot side="right" position="bottom" />
                </div>

            </div>

            <OnekoLoader />

        </div>
    );
}
