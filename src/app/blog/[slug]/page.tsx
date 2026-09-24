import { redirect } from 'next/navigation';
import { getPostSlugs } from '@/lib/blog';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function BlogSlugRedirect({ params }: PageProps) {
    const { slug } = await params;
    redirect(`/blogs/${slug}`);
}
