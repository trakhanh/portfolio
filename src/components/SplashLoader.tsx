"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { EASE_OUT } from "./motion/Reveal";
import { BrandMark } from "./BrandMark";
import { SPLASH_KEY } from "@/lib/splash";

/**
 * First-visit intro: the GK mark resolves out of blur while a signal line
 * fills, then the panel lifts away and hands off to the hero.
 */
export function SplashLoader({ onDone }: { onDone: () => void }) {
  const { content, ui } = useLanguage();
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  const handOff = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (document.documentElement.dataset.splash === "off") {
      // Already hidden by CSS before paint — just start the hero.
      setVisible(false);
      handOff();
      return;
    }
    // Record now, so a reload mid-intro doesn't replay it.
    try {
      localStorage.setItem(SPLASH_KEY, String(Date.now()));
    } catch {}
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={handOff}>
      {visible && (
        <motion.div
          key="splash"
          data-splash-root
          role="status"
          aria-label={ui.booting}
          onClick={() => setVisible(false)}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-abyss"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <BrandMark className="size-20" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: EASE_OUT }}
              className="label-caps mt-8 text-mist"
            >
              {content.hero.name}
            </motion.p>
            <div className="mt-6 h-px w-48 overflow-hidden bg-mist/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="bg-signal h-full origin-left"
              />
            </div>
            <p className="mt-6 text-[11px] tracking-[0.12em] text-slate uppercase">{ui.skip}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
