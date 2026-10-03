"use client";

import { Fragment, useContext } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SkipEntranceContext } from "./Reveal";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll-into-view. */
  immediate?: boolean;
}

/** Word-by-word masked rise: each word swings up from behind its own clip line, no blur or fade. */
export function SplitText({ text, as = "h2", className, delay = 0, stagger = 0.045, immediate = false }: SplitTextProps) {
  const Tag = motion[as];
  const skip = useContext(SkipEntranceContext);
  const words = text.split(" ");
  const trigger = immediate
    ? { initial: skip ? false : "hidden", animate: "show" }
    : { initial: skip ? false : "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    // Keyed by text: the words only rise when their parent enters view, which
    // happens once. Without a fresh parent, a language switch left the new
    // words stuck in "hidden" and headings vanished.
    <Tag
      key={text}
      className={cn(className)}
      aria-label={text}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* Padded top and bottom so Vietnamese tone marks aren't clipped by the mask. */}
          <span aria-hidden className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
            <motion.span
              className="inline-block origin-bottom-left"
              variants={{
                hidden: { y: "118%", rotate: 5 },
                show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE_OUT } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* A real space between the clipped words, so word-spacing and tracking apply to it. */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
