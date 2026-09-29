"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Phones only: a "Contact" pill once the hero is behind you, hidden again when
 * the contact section itself is on screen. The page is long on a phone and
 * most visitors never scroll to the bottom.
 */
export function ContactFab() {
  const { content } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    let pastHero = false;
    let atContact = false;
    const update = () => setShow(pastHero && !atContact);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.9;
      update();
    };
    const io = new IntersectionObserver(([e]) => {
      atContact = e.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="bg-signal fixed bottom-5 left-5 z-50 flex h-13 items-center gap-2 rounded-full px-5 text-[13px] font-medium tracking-[0.08em] text-abyss uppercase shadow-[0_10px_30px_-8px_rgba(62,230,212,0.6)] lg:hidden"
        >
          <Mail className="size-4" />
          {content.nav.contact}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
