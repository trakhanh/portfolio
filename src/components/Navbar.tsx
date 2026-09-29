"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

const SECTION_IDS = ["skills", "systems", "experience", "projects", "proof", "contact"] as const;

export function Navbar({ onHome = true }: { onHome?: boolean }) {
  const { locale, toggleLocale, content, ui } = useLanguage();
  // The page switches language as a transition; the pill answers the tap at once.
  const [pillLocale, setPillLocale] = useState<typeof locale | null>(null);
  const pill = pillLocale ?? locale;
  useEffect(() => setPillLocale(null), [locale]);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > 480 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y <= 480) setHidden(false);
  });

  const labels: Record<(typeof SECTION_IDS)[number], string> = {
    skills: ui.navSkills,
    systems: content.nav.systems,
    experience: content.nav.experience,
    projects: content.nav.projects,
    proof: content.nav.proof,
    contact: content.nav.contact,
  };

  // Scroll-spy: highlight the section crossing the upper third of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-auros flex h-20 items-center justify-between gap-4">
        <Link href={onHome ? "#top" : "/"} className="group flex items-center gap-3" aria-label="Trà Nguyễn Gia Khánh">
          <BrandMark className="size-9 transition-transform duration-500 group-hover:rotate-[-6deg]" />
          <span className="hidden text-sm font-medium text-white sm:block">Gia Khánh</span>
        </Link>

        <nav
          aria-label="Primary"
          className={cn(
            "hidden items-center gap-1 p-1.5 transition-all duration-500 lg:flex",
            scrolled ? "glass !rounded-xl" : "rounded-xl border border-transparent",
          )}
        >
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={href(id)}
              className={cn(
                "relative isolate rounded-md px-3.5 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors",
                active === id ? "text-white" : "text-silver hover:text-white",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-md bg-mist/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {labels[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPillLocale(pill === "vi" ? "en" : "vi");
              toggleLocale();
            }}
            aria-label={ui.language}
            className="glass relative isolate flex h-9 cursor-pointer items-center !rounded-md p-1 text-[12px] font-medium tracking-[0.12em]"
          >
            {/* Plain CSS slide: a layoutId pill made motion re-measure every animated
                element on the page during the language switch. */}
            <span
              aria-hidden
              className={cn(
                "bg-signal absolute top-1 bottom-1 left-1 -z-10 w-9 rounded-[4px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                pill === "en" && "translate-x-9",
              )}
            />
            {(["vi", "en"] as const).map((l) => (
              <span
                key={l}
                className={cn(
                  "grid h-full w-9 place-items-center uppercase transition-colors",
                  pill === l ? "text-abyss" : "text-silver",
                )}
              >
                {l}
              </span>
            ))}
          </button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={content.hero.cvUrl} target="_blank" rel="noopener noreferrer">
              {content.about.cv}
              <ArrowUpRight />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="size-9 lg:hidden" aria-label={ui.menu}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-mist/10 p-8 pt-24 sm:max-w-sm">
              <SheetTitle className="label-caps">Menu</SheetTitle>
              <nav className="flex flex-col">
                {SECTION_IDS.map((id, i) => (
                  <SheetClose asChild key={id}>
                    <motion.a
                      href={href(id)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                      className="border-b border-mist/10 py-4 text-2xl font-medium text-white"
                    >
                      {labels[id]}
                    </motion.a>
                  </SheetClose>
                ))}
              </nav>
              <Button asChild className="mt-auto w-full">
                <a href={content.hero.cvUrl} target="_blank" rel="noopener noreferrer">
                  {content.about.cv}
                  <ArrowUpRight />
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
