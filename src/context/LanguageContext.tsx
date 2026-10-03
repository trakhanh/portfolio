"use client";

import React, { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";
import { Locale, PortfolioContent } from "@/types/portfolio";
import { PORTFOLIO_CONTENT } from "@/data/portfolio";
import { uiStrings, type UiStrings } from "@/data/ui-strings";
import { localeFromPath, localizePath, stripLocale } from "@/lib/i18n";
import { homeMetadata, projectMetadata, SITE_URL } from "@/lib/seo";
import { SkipEntranceContext } from "@/components/motion/Reveal";

interface LanguageContextType {
  locale: Locale;
  /** Opens the current page in the other language. */
  toggleLocale: () => void;
  /** A site path in the current language: href("/projects/x/") → "/en/projects/x/" on English pages. */
  href: (path: string) => string;
  content: PortfolioContent;
  ui: UiStrings;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** The section crossing the upper third of the screen, and how far down it sits. */
function readAnchor(): { el: HTMLElement; top: number } | null {
  let found: HTMLElement | null = null;
  for (const s of document.querySelectorAll<HTMLElement>("section[id]")) {
    if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) found = s;
  }
  return found ? { el: found, top: found.getBoundingClientRect().top } : null;
}

/** Text lengths differ per language, so put the section being read back where it was. */
function restoreAnchor(a: { el: HTMLElement; top: number } | null) {
  if (!a || !a.el.isConnected) return;
  const delta = a.el.getBoundingClientRect().top - a.top;
  if (Math.abs(delta) < 1) return;
  const y = window.scrollY + delta;
  if (window.__lenis) {
    window.__lenis.resize();
    window.__lenis.scrollTo(y, { immediate: true, force: true });
  } else window.scrollTo(0, y);
}

/** Keep the tab title and description in step with the language shown. */
function syncDocumentMeta(locale: Locale) {
  const path = stripLocale(window.location.pathname);
  const slug = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const meta = path === "/" ? homeMetadata(locale) : slug ? projectMetadata(slug, locale) : null;
  if (!meta) return;
  if (typeof meta.title === "string") document.title = meta.title;
  if (meta.description) document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  const canonical = meta.alternates?.canonical;
  if (typeof canonical === "string") document.querySelector('link[rel="canonical"]')?.setAttribute("href", new URL(canonical, SITE_URL).href);
}

/**
 * The language comes from the URL: Vietnamese at the root, English under /en,
 * both prerendered so a reload or a shared link lands on the right one. Inside
 * the page, switching is done in place: one render swaps every string, wrapped
 * in a view transition so the old frame cross-fades into the new one, and the
 * URL is rewritten to match. (A full reload for each switch was what stuttered.)
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathLocale = localeFromPath(usePathname());
  // The language the visitor picked in this tab. It outlives the URL: stepping back
  // to an older history entry must not flip the page back to the language it had then.
  const [forced, setForced] = useState<Locale | null>(null);
  // Raised for the switch so freshly swapped headings don't replay their entrance.
  const [switching, setSwitching] = useState(false);
  const locale = forced ?? pathLocale;

  // A history step can land on a URL in the other language: bring the URL in line.
  useLayoutEffect(() => {
    if (!forced || forced === localeFromPath(window.location.pathname)) return;
    const { pathname, search, hash } = window.location;
    window.history.replaceState(window.history.state, "", localizePath(pathname, forced) + search + hash);
    syncDocumentMeta(forced);
  }, [forced, pathLocale]);

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
      const { pathname, search, hash } = window.location;
      const url = localizePath(pathname, next) + search + hash;
      const anchor = readAnchor();

      const swap = () => {
        flushSync(() => {
          setSwitching(true);
          setForced(next);
        });
        window.history.replaceState(null, "", url);
        syncDocumentMeta(next);
        restoreAnchor(anchor);
      };

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !document.startViewTransition) {
        swap();
        setSwitching(false);
        return;
      }
      const root = document.documentElement;
      root.dataset.langSwitch = "1";
      const t = document.startViewTransition(swap);
      // A transition can be skipped (tab hidden, another transition running); the
      // swap callback still runs, so only the cross-fade is lost.
      t.ready.catch(() => {});
      t.finished.catch(() => {}).finally(() => {
        delete root.dataset.langSwitch;
        setSwitching(false);
      });
    };
    return {
      locale,
      toggleLocale,
      href: (path) => localizePath(path, locale),
      content: PORTFOLIO_CONTENT[locale] ?? PORTFOLIO_CONTENT.vi,
      ui: uiStrings(locale),
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      <SkipEntranceContext.Provider value={switching}>{children}</SkipEntranceContext.Provider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
