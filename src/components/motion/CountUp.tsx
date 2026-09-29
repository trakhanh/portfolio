"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts the numeric part of a value like "80%" or "08" up from zero once visible. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || !inView || reduce) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const pad = num.length;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = decimals ? v.toFixed(decimals) : String(Math.round(v)).padStart(pad, "0");
        el.textContent = `${prefix}${n}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
