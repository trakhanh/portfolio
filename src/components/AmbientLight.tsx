"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Fixed bioluminescent light field under every glass pane. It only moves with
 * scroll (never on its own), so backdrop-filtered glass above it is not forced
 * to re-blur on every idle frame.
 */
export function AmbientLight() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0vw", "-25vw"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss">
      <motion.div style={{ y: y1 }} className="absolute -top-[20vh] -left-[10vw] h-[70vh] w-[60vw] rounded-full bg-biolume/35 blur-[120px]" />
      <motion.div style={{ y: y2 }} className="absolute top-[40vh] -right-[15vw] h-[65vh] w-[55vw] rounded-full bg-orchid/[0.09] blur-[140px]" />
      <motion.div style={{ x: x3 }} className="absolute -bottom-[25vh] left-[20vw] h-[60vh] w-[60vw] rounded-full bg-aqua/[0.07] blur-[130px]" />
      {/* Faint engineering grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(62,230,212,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(62,230,212,0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_20%,transparent_85%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,8,13,0.75)_100%)]" />
    </div>
  );
}
