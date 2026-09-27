import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllArticlesMeta } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function ArticlesTeaser() {
  const all = getAllArticlesMeta();
  const articles = all.slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="section">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Writing"
          meta="changelog of ideas"
          title="Notes from the build log."
          description="On full-stack development, backend engineering, and building real things with AI."
        />

        <Reveal className="mt-14 border-t border-line">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={all.length - i} />
          ))}
        </Reveal>

        <div className="mt-8">
          <Link href="/articles" className="btn-ghost group">
            Full log
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
