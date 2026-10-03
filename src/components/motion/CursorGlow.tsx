"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SIZE = 560;

/**
 * A pool of light that follows a fine pointer, rendered as a surface rather than
 * a glow: it doesn't tint the page, it brightens the film grain and lays a
 * faint cool-white sheen under the cursor, like a lamp raking across paper.
 *
 * One small layer moved with transform (composited on the GPU) with a fixed
 * mask, rather than a full-screen layer whose mask changes every frame, which
 * would repaint the whole viewport on each pointer move.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-2000);
  const y = useMotionValue(-2000);
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, width: SIZE, height: SIZE, willChange: "transform" }}
      className="pointer-events-none fixed top-0 left-0 -z-[5] [mask-image:radial-gradient(circle_closest-side,#000_0%,rgba(0,0,0,0.55)_45%,transparent_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_closest-side,rgba(214,238,255,0.035),transparent)]" />
      <div className="bg-grain absolute inset-0 opacity-[0.07]" />
    </motion.div>
  );
}
