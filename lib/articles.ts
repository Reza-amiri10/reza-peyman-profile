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

export type Article = ArticleMeta & {
  contentHtml: string;
};

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
  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readTime: computeReadTime(content),
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
