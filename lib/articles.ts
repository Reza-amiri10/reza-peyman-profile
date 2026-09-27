import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
};

export type TocItem = { id: string; text: string; level: 2 | 3 };

export type Article = ArticleMeta & {
  contentHtml: string;
  toc: TocItem[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function decodeEntities(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Gives every h2/h3 an id (for deep links) and collects a table of contents. */
function addHeadingAnchors(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, inner: string) => {
    let id = slugify(inner) || "section";
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n) id = `${id}-${n}`;
    const level = Number(lvl) as 2 | 3;
    toc.push({ id, text: decodeEntities(inner), level });
    return `<h${lvl} id="${id}"><a href="#${id}" class="heading-anchor" aria-hidden="true" tabindex="-1">#</a>${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

function computeReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function getSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllArticlesMeta(): ArticleMeta[] {
  const slugs = getSlugs();

  const articles = slugs.map((slug) => {
    const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      readTime: computeReadTime(content),
    };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const { html: contentHtml, toc } = addHeadingAnchors(
    marked.parse(content, { async: false }) as string
  );

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readTime: computeReadTime(content),
    contentHtml,
    toc,
  };
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

/** Newer / older neighbours of an article, for the "keep reading" links. */
export function getAdjacentArticles(slug: string): {
  newer: ArticleMeta | null;
  older: ArticleMeta | null;
} {
  const all = getAllArticlesMeta();
  const i = all.findIndex((a) => a.slug === slug);
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}

export function formatArticleDate(iso: string): string {
  // Dates are plain YYYY-MM-DD; format in UTC so they never shift a day.
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
