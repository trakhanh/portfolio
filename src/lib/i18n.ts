import type { Locale } from "@/types/portfolio";

/** Vietnamese lives at the root, English under /en. URLs keep their trailing slash. */
export const LOCALES: readonly Locale[] = ["vi", "en"];

export function localeFromPath(path: string | null | undefined): Locale {
  return path === "/en" || path?.startsWith("/en/") ? "en" : "vi";
}

/** "/en/projects/x/" → "/projects/x/", "/en/" → "/" */
export function stripLocale(path: string): string {
  if (path === "/en" || path === "/en/") return "/";
  return path.startsWith("/en/") ? path.slice(3) : path;
}

/** The same page in another language: localizePath("/projects/x/", "en") → "/en/projects/x/" */
export function localizePath(path: string, locale: Locale): string {
  const base = stripLocale(path);
  return locale === "en" ? `/en${base}` : base;
}

/**
 * Runs in <head> before first paint: visitors who picked English earlier are
 * sent to the /en version of whatever page they opened. Crawlers have no
 * saved choice, so every URL still indexes as itself.
 */
export const LANG_GATE_SCRIPT = `(function(){try{var p=location.pathname,en=p==="/en"||p.indexOf("/en/")===0;if(localStorage.getItem("preferred_language")==="en"&&!en){location.replace("/en"+p+location.search+location.hash);}else if(en){document.documentElement.lang="en";}}catch(e){}})();`;
