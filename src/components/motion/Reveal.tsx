"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useLite } from "@/lib/perf";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

/** Rises out of a soft blur the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  // On phones the blur is dropped instantly (filter animation is costly there).
  const lite = useLite();
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: lite ? 0.7 : 0.9, delay, ease: EASE_OUT, filter: lite ? { duration: 0 } : undefined }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
