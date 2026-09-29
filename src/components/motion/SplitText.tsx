"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./Reveal";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll-into-view. */
  immediate?: boolean;
}

/** Word-by-word masked rise — each word slides up from behind its own clip line. */
export function SplitText({ text, as = "h2", className, delay = 0, stagger = 0.05, immediate = false }: SplitTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={cn(className)}
      aria-label={text}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
              show: { y: "0%", opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" }, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
