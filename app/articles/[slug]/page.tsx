import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getAdjacentArticles,
  getAllSlugs,
  getArticleBySlug,
} from "@/lib/articles";
import { JsonLd } from "@/components/JsonLd";
import { ArticleMetaLine } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButton } from "@/components/ShareButton";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} — Reza Peyman Amiri`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [profile.name],
      tags: article.tags,
      url: `${SITE_URL}/articles/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const { newer, older } = getAdjacentArticles(article.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}/articles/${article.slug}`,
    keywords: article.tags.join(", "),
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    publisher: { "@type": "Person", name: profile.name, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/articles/${article.slug}` },
  };

  return (
    <main id="main">
      <ReadingProgress />
      <JsonLd data={articleJsonLd} />

      <article className="relative pb-24 pt-24 sm:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-blueprint mask-radial" />

        <div className="container">
          <div className="mx-auto max-w-5xl">
          <header className="max-w-3xl">
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
              <Link href="/articles" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Build log
              </Link>
              <span>
                <span className="text-accent">LOG</span> / {article.date}
              </span>
            </div>

            <h1 className="balance mt-10 text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              {article.title}
            </h1>
            <p className="pretty mt-6 text-lg leading-relaxed text-muted">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-fg font-mono text-[10px] font-semibold">
                  RA
                </span>
                <div>
                  <p className="text-sm font-medium">{profile.name}</p>
                  <ArticleMetaLine article={article} />
                </div>
              </div>
              <ShareButton title={article.title} />
            </div>
          </header>

          <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(0,1fr)_210px]">
            <div
              className="article-prose prose prose-lg w-full max-w-3xl dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={article.toc} />
              </div>
            </aside>
          </div>

          <footer className="mt-16 max-w-3xl space-y-10">
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="chip">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {(newer || older) && (
              <nav aria-label="More articles" className="grid gap-3 sm:grid-cols-2">
                {older ? (
                  <Link
                    href={`/articles/${older.slug}`}
                    className="card group p-5 transition-colors hover:border-accent/30"
                  >
                    <span className="flex items-center gap-1.5 text-xs text-subtle">
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                      Previous
                    </span>
                    <span className="mt-2 block font-medium leading-snug">{older.title}</span>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {newer && (
                  <Link
                    href={`/articles/${newer.slug}`}
                    className="card group p-5 text-right transition-colors hover:border-accent/30"
                  >
                    <span className="flex items-center justify-end gap-1.5 text-xs text-subtle">
                      Next
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 block font-medium leading-snug">{newer.title}</span>
                  </Link>
                )}
              </nav>
            )}

            <div className="reg-marks relative border border-line bg-surface p-8 sm:p-10">
                            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-2xl font-medium tracking-[-0.03em]">Have a project in mind?</p>
                  <p className="mt-1 text-sm text-muted">
                    I&apos;m always interested in challenging technical problems.
                  </p>
                </div>
                <Link href="/#contact" className="btn-accent group shrink-0">
                  Get in touch
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
