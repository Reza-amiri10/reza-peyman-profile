import type { Metadata } from "next";
import { getAllArticlesMeta } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Articles — Reza Peyman Amiri",
  description:
    "Writing on full-stack development, backend engineering, and building with AI — from Reza Peyman Amiri.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles — Reza Peyman Amiri",
    description:
      "Writing on full-stack development, backend engineering, and building with AI.",
    type: "website",
    url: "https://peymanamiri.com/articles",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticlesMeta();

  return (
    <main>
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container">
          <SectionHeading
            eyebrow="Writing"
            title="Articles & thoughts"
            description="Notes on full-stack development, backend engineering, and building real things with AI — written as I learn them, not after the fact."
            align="center"
          />

          {articles.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="mt-14 text-center text-muted">
              No articles published yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
