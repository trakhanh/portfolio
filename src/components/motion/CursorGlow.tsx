"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Soft signal-cyan light that trails a fine pointer across the page. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 -z-[5] -mt-[260px] -ml-[260px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(62,230,212,0.10),rgba(62,230,212,0.03)_40%,transparent_70%)]"
    />
  );
}
