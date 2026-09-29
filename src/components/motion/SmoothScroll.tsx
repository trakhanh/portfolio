"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertial page scrolling. Skipped entirely when the user prefers reduced motion.
 * Render it after the page content: its route-change layout effect must run after
 * Next's own scroll handling (effects run in sibling order).
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstRoute = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
    });
    window.__lenis = lenis;
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // A smooth scroll still easing out when a link is tapped (e.g. after "View
  // projects") kept pulling the new page to the old offset, so project pages
  // opened at their bottom. Settle Lenis on every route change instead.
  useLayoutEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const lenis = window.__lenis;
    const back = popped.current;
    popped.current = false;
    // New page without a hash starts at the top; hash and back/forward keep
    // wherever Next and the browser put them.
    const y = back || window.location.hash ? window.scrollY : 0;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  }, [pathname]);

  return null;
}

/** Scroll to top through Lenis when present so the easing matches. */
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
