import { ImageResponse } from "next/og";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { OgFrame } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function ArticleOpengraphImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? "Reza Peyman Amiri";
  const meta = article ? `${article.date} / ${article.readTime.toUpperCase()}` : "WRITING";

  return new ImageResponse(
    (
      <OgFrame code={article ? `LOG/${article.date}` : "SYS/06"} footer={meta}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 74 : 88,
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </OgFrame>
    ),
    { ...size }
  );
}
