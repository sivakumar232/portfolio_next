import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Primary location is the root 'blogs' folder
const ROOT_BLOGS_DIR = path.join(process.cwd(), 'blogs');
// Fallback location is 'src/content'
const FALLBACK_BLOGS_DIR = path.join(process.cwd(), 'src/content');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
    content: string;
}

/**
 * Format a slug into a clean, human-readable title fallback.
 * (e.g. "llm1" -> "LLM 1", "my-first-post" -> "My First Post")
 */
function formatSlugToTitle(slug: string): string {
    return slug
        .replace(/([a-zA-Z])(\d+)/g, '$1 $2')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
}

/**
 * Calculate reading time based on standard 200 words per minute
 */
function calculateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

/**
 * Extract clean description/excerpt from the first paragraph of markdown
 */
function extractExcerpt(markdown: string): string {
    const lines = markdown.split('\n');
    for (const rawLine of lines) {
        const line = rawLine.trim();
        // Skip headings, horizontal rules, code fences, blockquotes, empty lines, and images
        if (
            !line ||
            line.startsWith('#') ||
            line.startsWith('---') ||
            line.startsWith('```') ||
            line.startsWith('>') ||
            line.startsWith('!')
        ) {
            continue;
        }
        // Clean basic markdown formatting from preview
        const cleaned = line
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
            .replace(/[*_`~]/g, '') // remove formatting symbols
            .trim();

        if (cleaned.length > 10) {
            return cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned;
        }
    }
    return '';
}

function isBlogFile(fileName: string): boolean {
    if (!fileName.endsWith('.md') && !fileName.endsWith('.markdown')) {
        return false;
    }
    if (fileName.startsWith('.')) {
        return false;
    }
    const lower = fileName.toLowerCase();
    // Exclude templates, readmes, and plan docs
    if (
        lower.startsWith('template') ||
        lower.startsWith('readme') ||
        lower.startsWith('blog_plan')
    ) {
        return false;
    }
    return true;
}

/**
 * Get all available blog post slugs.
 * Scans 'blogs/' directory first. If 'blogs/' has markdown files, uses them exclusively.
 * Otherwise falls back to 'src/content/'.
 */
export function getPostSlugs(): string[] {
    const slugs: string[] = [];

    const readFromDir = (dir: string) => {
        if (!fs.existsSync(dir)) return [];
        try {
            return fs
                .readdirSync(dir)
                .filter(isBlogFile)
                .map((file) => file.replace(/\.(md|markdown)$/, ''));
        } catch {
            return [];
        }
    };

    // 1. Primary: check 'blogs/'
    const rootSlugs = readFromDir(ROOT_BLOGS_DIR);
    if (rootSlugs.length > 0) {
        return rootSlugs;
    }

    // 2. Fallback: check 'src/content/'
    const fallbackSlugs = readFromDir(FALLBACK_BLOGS_DIR);
    if (fallbackSlugs.length > 0) {
        return fallbackSlugs;
    }

    return slugs;
}

export function getPostBySlug(slug: string): BlogPost | null {
    const realSlug = slug.replace(/\.(md|markdown)$/, '');

    const candidatePaths = [
        path.join(ROOT_BLOGS_DIR, `${realSlug}.md`),
        path.join(ROOT_BLOGS_DIR, `${realSlug}.markdown`),
        path.join(FALLBACK_BLOGS_DIR, `${realSlug}.md`),
        path.join(FALLBACK_BLOGS_DIR, `${realSlug}.markdown`),
    ];

    let fullPath: string | null = null;
    for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
            fullPath = p;
            break;
        }
    }

    if (!fullPath) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const stats = fs.statSync(fullPath);
    const { data, content } = matter(fileContents);

    // 1. Determine Title:
    //    Use frontmatter title -> first # H1 in content -> formatted slug
    let title = data.title;
    if (!title) {
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match && h1Match[1]) {
            title = h1Match[1].trim();
        } else {
            title = formatSlugToTitle(realSlug);
        }
    }

    // 2. Determine Date:
    //    Use frontmatter date -> file modified timestamp
    let date = data.date;
    if (!date) {
        try {
            date = stats.mtime.toISOString().split('T')[0];
        } catch {
            date = new Date().toISOString().split('T')[0];
        }
    } else if (date instanceof Date) {
        date = date.toISOString().split('T')[0];
    } else {
        date = String(date);
    }

    // 3. Determine Description:
    //    Use frontmatter description -> first text paragraph
    let description = data.description;
    if (!description) {
        description = extractExcerpt(content);
    }

    // 4. Calculate reading time
    const readingTime = calculateReadingTime(content);

    // 5. Clean Content:
    //    If the content starts with an H1 heading (e.g. `# My Post Title`),
    //    strip that first H1 so it is not duplicated on the page since the
    //    header already renders the title prominently.
    let cleanContent = content.trim();
    const leadingH1 = cleanContent.match(/^#\s+[^\n]+(?:\r?\n|$)/);
    if (leadingH1 && cleanContent.startsWith(leadingH1[0])) {
        cleanContent = cleanContent.slice(leadingH1[0].length).trim();
    }

    return {
        slug: realSlug,
        title,
        date,
        description,
        readingTime,
        content: cleanContent,
    };
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs();
    const posts: BlogPost[] = [];

    for (const slug of slugs) {
        const post = getPostBySlug(slug);
        if (post) {
            posts.push(post);
        }
    }

    // Sort posts chronologically (newest first)
    return posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        return dateB - dateA;
    });
}
