"use client";

import { useEffect, useState } from "react";

/** Phones, tablets and other touch-first screens get the lighter render path. */
export const LITE_QUERY = "(max-width: 767px), (pointer: coarse)";

export function isLite(): boolean {
  return typeof window !== "undefined" && window.matchMedia(LITE_QUERY).matches;
}

/** True on touch / small screens. Starts false so SSR and hydration agree. */
export function useLite(): boolean {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(LITE_QUERY);
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return lite;
}
