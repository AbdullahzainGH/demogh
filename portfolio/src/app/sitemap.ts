import type { MetadataRoute } from "next";
import { allPosts, allProjects } from ".contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticRoutes: MetadataRoute.Sitemap = ["/", "/blog", "/projects", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(post.date),
  }));

  const projectRoutes: MetadataRoute.Sitemap = allProjects.map((p) => ({
    url: `${baseUrl}${p.url}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}

