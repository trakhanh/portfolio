"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLite } from "@/lib/perf";

/**
 * Fixed bioluminescent light field under every glass pane. The glows are
 * radial gradients (no CSS blur filter), and they only drift with scroll on
 * desktop, so nothing here repaints on idle frames.
 */
export function AmbientLight() {
  const lite = useLite();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0vw", "-25vw"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss">
      <motion.div
        style={lite ? undefined : { y: y1 }}
        className="absolute -top-[30vh] -left-[20vw] h-[100vh] w-[85vw] bg-[radial-gradient(closest-side,rgba(10,108,138,0.42),rgba(10,108,138,0.12)_55%,transparent)]"
      />
      <motion.div
        style={lite ? undefined : { y: y2 }}
        className="absolute top-[30vh] -right-[25vw] h-[95vh] w-[80vw] bg-[radial-gradient(closest-side,rgba(124,140,255,0.13),rgba(124,140,255,0.04)_55%,transparent)]"
      />
      <motion.div
        style={lite ? undefined : { x: x3 }}
        className="absolute -bottom-[35vh] left-[10vw] h-[90vh] w-[85vw] bg-[radial-gradient(closest-side,rgba(184,246,255,0.08),rgba(184,246,255,0.02)_55%,transparent)]"
      />
      {/* Film grain: breaks up gradient banding and gives the glass something to refract */}
      <div className="bg-grain absolute inset-0 opacity-[0.055] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_40%,#000_30%,transparent_95%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,8,13,0.75)_100%)]" />
    </div>
  );
}
