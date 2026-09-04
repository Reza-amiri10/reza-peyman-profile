import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="card group flex min-w-0 flex-col justify-between p-6 hover:-translate-y-1 hover:border-accent/40 sm:p-7"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <time dateTime={article.date}>
            {formatArticleDate(article.date)}
          </time>
          <span aria-hidden>·</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug">
          {article.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
