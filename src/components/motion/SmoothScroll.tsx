"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { consumeResume, takeHomeScroll } from "@/lib/home-return";
import { stripLocale } from "@/lib/i18n";

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
  const prevPath = useRef(pathname);
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
    // Switching language rewrites the URL but it's the same page: leave the scroll alone.
    const before = prevPath.current;
    prevPath.current = pathname;
    if (before !== pathname && stripLocale(before) === stripLocale(pathname)) return;
    const lenis = window.__lenis;
    // Lenis clamps to the page height it last measured, which is still the previous
    // page's until its observer fires: re-measure before every jump.
    const jump = (y: number) => {
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(y, { immediate: true, force: true });
      } else window.scrollTo(0, y);
    };
    const back = popped.current;
    popped.current = false;
    // New page without a hash starts at the top; hash and back/forward keep
    // wherever Next and the browser put them.
    const hash = window.location.hash;
    // Coming back to the home page from a project: land where the visitor left off.
    const resumed = takeHomeScroll(pathname);
    const resume = consumeResume() || back;
    const y = resume && resumed !== null ? resumed : back || hash ? window.scrollY : 0;
    jump(y);

    // The page is still settling right after it mounts (fonts, images, sections
    // growing), so a position set once can end up clamped or shifted: a return
    // trip could land at the bottom, a hash landing short of its section. Keep
    // putting the view back for a moment, until the visitor scrolls themselves.
    const pin = (want: () => number | null) => {
      let stop = false;
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      const cancel = () => (stop = true);
      events.forEach((e) => window.addEventListener(e, cancel, { passive: true, once: true }));
      const t0 = performance.now();
      let raf = 0;
      const tick = () => {
        if (stop || performance.now() - t0 > 2200) return;
        const target = want();
        if (target !== null && Math.abs(window.scrollY - target) > 1.5) jump(target);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => {
        stop = true;
        cancelAnimationFrame(raf);
        events.forEach((e) => window.removeEventListener(e, cancel));
      };
    };

    // Back to the home page from a project: hold the spot the visitor left.
    if (resume && resumed !== null) return pin(() => resumed);
    if (back || !hash) return;

    // Landing on a section (e.g. "Contact" from a case study): follow it as the layout settles.
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    const pad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    return pin(() => target.getBoundingClientRect().top + window.scrollY - pad());
  }, [pathname]);

  return null;
}

/** Scroll to top through Lenis when present so the easing matches. */
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
