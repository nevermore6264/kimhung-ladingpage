import type { MetadataRoute } from "next";
import { categories, posts, products } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/gioi-thieu"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/san-pham"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/dich-vu"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/tin-tuc"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/lien-he"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/dang-ky"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...categories.map((category) => ({
      url: absoluteUrl(category.href),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/san-pham/${product.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/tin-tuc/${post.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
