"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTop } from "./motion/SmoothScroll";

/** Floating back-to-top control; its ring fills with scroll progress. */
export function ScrollToTop() {
  const { ui } = useLanguage();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 640));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="to-top"
          type="button"
          aria-label={ui.backToTop}
          title={ui.backToTop}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="group fixed right-5 bottom-5 z-50 grid size-13 cursor-pointer place-items-center rounded-full bg-deep/85 text-mist backdrop-blur-xl sm:right-8 sm:bottom-8"
        >
          <svg viewBox="0 0 52 52" className="absolute inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(232,246,255,0.12)" strokeWidth="1.5" />
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="#3ee6d4"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-signal" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
