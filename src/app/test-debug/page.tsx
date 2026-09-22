import { Section } from '@/components/layout/Section';
import { TopNav } from '@/components/layout/TopNav';
import OnekoLoader from '@/components/Onekoloader';
import VisitorCounter from '@/components/VisitorCounter';

export default function DebugPage() {
    return (
        <div>
            <TopNav />
            <Section id="test" title="Test">
                <p>hello</p>
            </Section>
            <footer>
                <VisitorCounter />
            </footer>
            <OnekoLoader />
        </div>
    );
}
