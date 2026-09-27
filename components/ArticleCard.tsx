import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";

export function ArticleMetaLine({ article }: { article: ArticleMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
      <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
      <span aria-hidden className="text-line">/</span>
      <span>{article.readTime}</span>
    </div>
  );
}

/** One entry in the writing log. */
export function ArticleCard({ article, index }: { article: ArticleMeta; index?: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative grid grid-cols-1 gap-3 border-b border-line py-8 transition-colors hover:bg-surface sm:grid-cols-[150px_1fr_auto] sm:gap-8 sm:px-4 sm:py-10"
    >
      <div className="font-mono text-[12px] text-subtle">
        <time dateTime={article.date} className="block text-fg/80">
          {article.date}
        </time>
        {index !== undefined && (
          <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-accent">
            Log/{String(index).padStart(3, "0")}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="balance text-2xl font-medium leading-[1.1] tracking-[-0.035em] transition-colors group-hover:text-accent sm:text-[1.9rem]">
          {article.title}
        </h3>
        <p className="pretty mt-3 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">{article.readTime}</span>
        <span className="flex h-10 w-10 items-center justify-center border border-line transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export { formatArticleDate };
