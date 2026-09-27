import type { Metadata } from "next";
import { getAllArticlesMeta } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Articles — Reza Peyman Amiri",
  description:
    "Writing on full-stack development, backend engineering, and building with AI — from Reza Peyman Amiri.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles — Reza Peyman Amiri",
    description: "Writing on full-stack development, backend engineering, and building with AI.",
    type: "website",
    url: `${SITE_URL}/articles`,
  },
};

export default function ArticlesPage() {
  const articles = getAllArticlesMeta();

  return (
    <main id="main" className="relative pb-24 pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-blueprint mask-radial" />

      <div className="container">
        <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
          <span>
            <span className="text-accent">SYS/06</span> — Writing
          </span>
          <span>
            {String(articles.length).padStart(2, "0")} {articles.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <Reveal className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <h1 className="text-[15vw] font-medium leading-[0.88] tracking-[-0.06em] sm:text-8xl lg:text-[8.5rem]">
            Build log<span className="text-accent">.</span>
          </h1>
          <p className="pretty text-lg leading-relaxed text-muted">
            Notes on full-stack development, backend engineering, and building real things with AI —
            written as I learn them, not after the fact.
          </p>
        </Reveal>

        {articles.length > 0 ? (
          <div className="mt-16 border-t border-fg/80">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={articles.length - i} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-muted">No entries yet — check back soon.</p>
        )}
      </div>
    </main>
  );
}
