import type { MetadataRoute } from "next";
import { allDocs, routeFor } from "@/lib/docs-catalog";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/docs", ...allDocs.map((doc) => routeFor(doc.slug))].map((pathname) => ({ url: `${siteUrl}${pathname}` }));
}
