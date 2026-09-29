import type { MetadataRoute } from "next";
import { LOCALES, localizePath } from "@/lib/i18n";
import { SITE_URL, projectIds } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...projectIds().map((id) => `/projects/${id}/`)];
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: SITE_URL + localizePath(path, locale),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: { vi: SITE_URL + localizePath(path, "vi"), en: SITE_URL + localizePath(path, "en") } },
    })),
  );
}
