import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllArticlesMeta } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";

export function ArticlesTeaser() {
  const articles = getAllArticlesMeta().slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section
      id="articles"
      className="section-padding border-t border-border bg-elevated/40"
    >
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Writing"
            title="Articles & thoughts"
            description="Notes on full-stack development, backend engineering, and building real things with AI."
          />
          <Link
            href="/articles"
            className="btn-secondary shrink-0 self-start sm:self-auto"
          >
            View all articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
