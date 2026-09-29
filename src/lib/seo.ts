import type { Metadata } from "next";
import type { Locale } from "@/types/portfolio";
import { PORTFOLIO_CONTENT } from "@/data/portfolio";
import { localizePath } from "./i18n";

export const SITE_URL = "https://portfolio.khanhtra.io.vn";

const NAME: Record<Locale, string> = { vi: "Trà Nguyễn Gia Khánh", en: "Tra Nguyen Gia Khanh" };
const OG_LOCALE: Record<Locale, string> = { vi: "vi_VN", en: "en_US" };

const HOME: Record<Locale, { title: string; description: string; tagline: string }> = {
  vi: {
    title: "Trà Nguyễn Gia Khánh — Applied AI × ERP",
    description:
      "Portfolio của Trà Nguyễn Gia Khánh — Applied AI, AI Automation, ERP & Digital Transformation với nền tảng Data Science.",
    tagline: "Biến AI thành hệ thống vận hành thực tế.",
  },
  en: {
    title: "Tra Nguyen Gia Khanh — Applied AI × ERP",
    description:
      "Portfolio of Tra Nguyen Gia Khanh — Applied AI, AI Automation, ERP and digital transformation, built on a Data Science foundation.",
    tagline: "Turning AI into real operating systems.",
  },
};

/** hreflang links for a locale-neutral path such as "/projects/x/". */
function alternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: localizePath(path, locale),
    languages: {
      vi: localizePath(path, "vi"),
      en: localizePath(path, "en"),
      "x-default": localizePath(path, "vi"),
    },
  };
}

/** Trim to a search-snippet length on a word boundary. */
function snippet(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function homeMetadata(locale: Locale): Metadata {
  const h = HOME[locale];
  return {
    title: h.title,
    description: h.description,
    alternates: alternates("/", locale),
    openGraph: {
      type: "website",
      url: localizePath("/", locale),
      siteName: NAME[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "vi" ? "en" : "vi"],
      title: h.title,
      description: h.tagline,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: h.title }],
    },
    twitter: { card: "summary_large_image", title: h.title, description: h.tagline, images: ["/og.png"] },
  };
}

export function projectIds(): string[] {
  return PORTFOLIO_CONTENT.vi.projects.items.map((p) => p.id);
}

export function projectMetadata(slug: string, locale: Locale): Metadata {
  const item = PORTFOLIO_CONTENT[locale].projects.items.find((p) => p.id === slug);
  if (!item) return { title: NAME[locale] };
  const title = `${item.title} — ${NAME[locale]}`;
  const description = snippet(item.description);
  const path = `/projects/${slug}/`;
  const image = `/og/${locale}/${slug}.jpg`;
  return {
    title,
    description,
    alternates: alternates(path, locale),
    openGraph: {
      type: "article",
      url: localizePath(path, locale),
      siteName: NAME[locale],
      locale: OG_LOCALE[locale],
      title: item.title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: item.title }],
    },
    twitter: { card: "summary_large_image", title: item.title, description, images: [image] },
  };
}
