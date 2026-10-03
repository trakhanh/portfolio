import { stripLocale } from "./i18n";

/**
 * Bookkeeping for "open a project, then come back" so the return trip feels
 * like stepping back into the same page rather than reloading it.
 *
 * - When a project link is clicked on the home page, it notes where the page
 *   was scrolled and which history entry it was. SmoothScroll puts the scroll
 *   back on the way home, and the project's Back button goes straight to that
 *   entry (however many project pages were opened since).
 * - `visited` lets a re-mounted home page skip its entrance animations.
 */
let visited = false;
let saved: { path: string; y: number; entry: number | null } | null = null;
let resumeNext = false;

/** Language-neutral key for a page: "/en/" and "/" are the same home page. */
const key = (p: string) => stripLocale(p.replace(/\/+$/, "") || "/") || "/";

type NavApi = { currentEntry?: { index: number } | null; entries?: () => unknown[] };
const nav = (): NavApi | undefined => (window as unknown as { navigation?: NavApi }).navigation;

export const hasVisitedHome = () => visited;
export const markHomeVisited = () => {
  visited = true;
};

/** Called when a project link is clicked on the home page. */
export function rememberHomeScroll() {
  saved = { path: key(window.location.pathname), y: window.scrollY, entry: nav()?.currentEntry?.index ?? null };
}

/** Returns the remembered scroll for this home page once, then forgets it. */
export function takeHomeScroll(path: string): number | null {
  // Only the home page consumes it: the route change that opens the project
  // passes through here too and must leave it for the way back.
  if (!saved || saved.path !== key(path)) return null;
  const y = saved.y;
  saved = null;
  return y;
}

/**
 * Back button on a project page. Steps back to the exact home entry when the
 * browser can tell us where it is; otherwise returns false so the caller
 * navigates to home itself (and calls `requestHomeResume` first).
 */
export function goBackToHome(homePath: string): "history" | "push" | "none" {
  if (!saved || saved.path !== key(homePath)) return "none";
  const here = nav()?.currentEntry?.index;
  if (saved.entry !== null && typeof here === "number" && saved.entry < here) {
    window.history.go(saved.entry - here);
    return "history";
  }
  resumeNext = true;
  return "push";
}

/** True once after a push-style return, so SmoothScroll restores the scroll like a history return. */
export function consumeResume(): boolean {
  const r = resumeNext;
  resumeNext = false;
  return r;
}
