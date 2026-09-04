import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getAllSlugs,
  getArticleBySlug,
  formatArticleDate,
} from "@/lib/articles";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/lib/data";

const SITE_URL = "https://peymanamiri.com";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} — Reza Peyman Amiri`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [profile.name],
      url: `${SITE_URL}/articles/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}/articles/${article.slug}`,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <article className="section-padding pt-32 sm:pt-40">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-[rgb(var(--fg))]"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              <span aria-hidden>·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="balance mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {article.title}
            </h1>

            {article.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline prose-a:transition-colors hover:prose-a:text-accent-dark hover:prose-a:underline prose-blockquote:border-accent/40 prose-strong:text-[rgb(var(--fg))] prose-code:rounded prose-code:bg-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:text-accent-teal prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-elevated prose-hr:border-border prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-border bg-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-sm font-semibold">
                  Have a project in mind?
                </p>
                <p className="mt-1 text-sm text-muted">
                  I&apos;m always interested in challenging technical
                  problems.
                </p>
              </div>
              <Link href="/#contact" className="btn-primary shrink-0">
                Get In Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
