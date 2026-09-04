import { ImageResponse } from "next/og";
import {
  getAllSlugs,
  getArticleBySlug,
  formatArticleDate,
} from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function ArticleOpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? "Reza Peyman Amiri";
  const meta = article
    ? `${formatArticleDate(article.date)} · ${article.readTime}`
    : "peymanamiri.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #05070d 0%, #0a0e17 55%, #0d1220 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 26,
            fontWeight: 700,
            color: "#7c9dff",
          }}
        >
          <span>{"<"}</span>
          <span style={{ color: "#f4f5f8" }}>Reza.dev</span>
          <span>{" />"}</span>
          <span
            style={{
              marginLeft: 16,
              fontSize: 20,
              fontWeight: 500,
              color: "#4b5468",
            }}
          >
            Articles
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#f4f5f8",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 24,
              color: "#9aa3b8",
            }}
          >
            {meta}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#4b5468" }}>
          By Reza Peyman Amiri · peymanamiri.com
        </div>
      </div>
    ),
    { ...size }
  );
}
