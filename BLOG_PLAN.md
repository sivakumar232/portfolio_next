# Blog System Implementation Plan

## Goal Description
Implement a fully functional, static file-based blog system within the Next.js portfolio.
- **List View (`/blog`)**: Displays a grid/list of all available blog posts with metadata (title, date, description, tags).
- **Detail View (`/blog/[slug]`)**: Renders the actual markdown content of a specific blog post.
- **Content Management**: Blog posts will be stored as `.md` files in `src/content/`.

## Dependencies
- `gray-matter`: For parsing frontmatter (metadata) from markdown files.
- `react-markdown`: For rendering markdown content to HTML.
- `date-fns`: For formatting dates.
- `@tailwindcss/typography`: For beautiful default styling of the rendered markdown (prose).

## Implementation Steps

### 1. Setup
- Install dependencies: `npm install gray-matter react-markdown date-fns`
- Install typography plugin: `npm install -D @tailwindcss/typography`
- Configure `tailwind.config.ts` to include the typography plugin.

### 2. Content Structure
- Create directory: `src/content/`
- Add sample post: `src/content/hello-world.md`

### 3. Utility Functions (`src/lib/blog.ts`)
- `getPostSlugs()`: Read file names from `src/content`.
- `getPostBySlug(slug)`: Read specific file, parse frontmatter.
- `getAllPosts()`: Get all posts sorted by date.

### 4. Pages
- **`/blog/page.tsx`**:
    - Fetch all posts.
    - Render grid of blog cards using the `Projects` styling style (clean grid).
- **`/blog/[slug]/page.tsx`**:
    - `generateStaticParams`: For static export support.
    - Fetch post data.
    - Render content wrapped in `<article className="prose dark:prose-invert">`.

