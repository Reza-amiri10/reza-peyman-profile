import type { MetadataRoute } from "next";
import { getAllArticlesMeta } from "@/lib/articles";

const SITE_URL = "https://peymanamiri.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticlesMeta();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: articles[0]?.date ? new Date(articles[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articleEntries,
  ];
}
