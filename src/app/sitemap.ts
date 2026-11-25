import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { SITE_URL } from "@/components/shared/osmash";

// Cached so the build date is frozen into a static sitemap; a bare `new Date()` makes the route dynamic.
async function homeEntries(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

// The legal pages are noindex (see the (legal) layout), so only the home page is listed.
export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return homeEntries();
}
