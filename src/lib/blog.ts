import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
}

export function getPostSlugs() {
    // Create directory if it doesn't exist to prevent errors
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        content,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
    } as BlogPost;
}

export function getAllPosts() {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
