"use client";

import React, { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Locale, PortfolioContent, CaseStudyData } from "@/types/portfolio";
import { PORTFOLIO_CONTENT } from "@/data/portfolio";
import { PROJECT_CASES } from "@/data/project-cases";
import { uiStrings, type UiStrings } from "@/data/ui-strings";
import { localeFromPath, localizePath } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  /** Opens the current page in the other language. */
  toggleLocale: () => void;
  /** A site path in the current language: href("/projects/x/") → "/en/projects/x/" on English pages. */
  href: (path: string) => string;
  content: PortfolioContent;
  cases: CaseStudyData;
  ui: UiStrings;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** The section currently on screen, so a language switch lands in the same place. */
function currentSectionHash(): string {
  let id = "";
  for (const s of document.querySelectorAll<HTMLElement>("section[id]")) {
    if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) id = s.id;
  }
  return id && id !== "top" ? `#${id}` : "";
}

/**
 * The language comes from the URL: Vietnamese at the root, English under /en.
 * Both are prerendered, so switching language loads the other static page
 * instead of re-rendering (and restyling) the whole document in place.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = localeFromPath(usePathname());

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextType>(() => {
    const toggleLocale = () => {
      const next: Locale = locale === "vi" ? "en" : "vi";
      try {
        localStorage.setItem("preferred_language", next);
      } catch {
        // Ignore localStorage errors
      }
      window.location.assign(localizePath(window.location.pathname, next) + currentSectionHash());
    };
    return {
      locale,
      toggleLocale,
      href: (path) => localizePath(path, locale),
      content: PORTFOLIO_CONTENT[locale] ?? PORTFOLIO_CONTENT.vi,
      cases: PROJECT_CASES[locale] ?? PROJECT_CASES.vi,
      ui: uiStrings(locale),
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
