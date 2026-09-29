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
    const hash = window.location.hash;
    const y = back || hash ? window.scrollY : 0;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    if (back || !hash) return;

    // Landing on a section (e.g. "Contact" from a case study): on a slow phone
    // the page can still shift after Next's first jump, leaving the section
    // off screen. Re-aim a few times while the layout settles, unless the
    // visitor has started scrolling themselves.
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    let cancelled = false;
    const cancel = () => (cancelled = true);
    const aim = () => {
      if (cancelled) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - pad;
      if (Math.abs(target.getBoundingClientRect().top - pad) < 2) return;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });
    const raf = requestAnimationFrame(aim);
    const timers = [150, 400, 900].map((ms) => window.setTimeout(aim, ms));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, [pathname]);

  return null;
}

/** Scroll to top through Lenis when present so the easing matches. */
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
