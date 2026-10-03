"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Download, FileCheck2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { asset } from "@/data/ui-strings";
import { Button } from "@/components/ui/button";
import { GlassCard } from "./motion/GlassCard";
import { Reveal } from "./motion/Reveal";

/** "Nguyễn Lê Thùy Dương" -> "ND": first and last word, so it reads as a monogram. */
function monogram(name: string) {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

const PAGES = [
  // back page first so the front page paints over it
  { src: "/img/thumbs/letter-page-2.webp", rest: { rotate: 5, x: 0, y: 0 }, spread: { rotate: 9, x: 34, y: 6 }, className: "top-[9%] right-[2%]" },
  { src: "/img/thumbs/letter-page-1.webp", rest: { rotate: -2.5, x: 0, y: 0 }, spread: { rotate: -6, x: -22, y: -4 }, className: "top-[2%] left-[4%]" },
];

/**
 * The signed recommendation letter: who signed it and what it vouches for on
 * the left, the two pages as a paper stack on the right. The stack fans out
 * on hover and opens the full-size viewer.
 */
export function RecommendationCard({ onOpen }: { onOpen: () => void }) {
  const { content, ui } = useLanguage();
  const rec = content.experience.recommendation;

  return (
    <Reveal className="mt-10">
      <GlassCard variant="deep" className="grid grid-cols-[minmax(0,1fr)] gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:p-12 xl:p-14">
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="label-caps flex items-center gap-2.5">
              <FileCheck2 className="size-4 text-signal" />
              {rec.eyebrow}
            </p>
            <p className="font-mono text-[11px] tracking-[0.1em] text-slate uppercase">{rec.date}</p>
          </div>

          <h3 className="mt-7 max-w-[20ch] text-3xl leading-[1.15] tracking-[-0.02em] sm:text-4xl">{rec.title}</h3>
          <p className="mt-5 max-w-[62ch] text-silver">{rec.description}</p>

          <ol className="mt-8 grid border-t border-mist/10 sm:grid-cols-2 sm:gap-x-8">
            {rec.highlights.map((h, i) => (
              <li key={h} className="flex items-baseline gap-4 border-b border-mist/10 py-3.5">
                <span className="font-mono text-[11px] tracking-[0.1em] text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-snug text-mist">{h}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-full border border-mist/15 bg-mist/[0.05] font-mono text-sm tracking-[0.04em] text-mist"
            >
              {monogram(rec.issuer)}
            </span>
            <p className="min-w-0 text-sm leading-snug text-silver">
              <span className="block text-base font-medium text-white">{rec.issuer}</span>
              {rec.issuerRole}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onOpen}>
              {ui.viewLetter}
              <ArrowUpRight />
            </Button>
            <Button asChild variant="ghost" className="border border-mist/10">
              <a href={asset(rec.file)} target="_blank" rel="noopener noreferrer">
                <Download />
                {rec.download}
              </a>
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center lg:justify-center">
          <motion.button
            type="button"
            onClick={onOpen}
            aria-label={ui.viewLetter}
            initial="rest"
            animate="rest"
            whileHover="spread"
            whileFocus="spread"
            className="relative aspect-[5/6] w-full max-w-[340px] cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-signal/60"
          >
            {PAGES.map((pg, i) => (
              <motion.span
                key={pg.src}
                variants={{ rest: pg.rest, spread: pg.spread }}
                transition={{ type: "spring", stiffness: 170, damping: 20 }}
                className={`absolute block w-[66%] overflow-hidden rounded-md bg-white shadow-[0_24px_50px_-18px_rgba(0,0,0,0.8)] ring-1 ring-black/10 ${pg.className}`}
                style={{ zIndex: i }}
              >
                <Image src={pg.src} alt={i === 1 ? rec.previewAlt : ""} width={360} height={520} className="h-auto w-full" />
              </motion.span>
            ))}
          </motion.button>

          <p className="mt-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-signal uppercase">
            <BadgeCheck className="size-4" />
            {ui.verifiedLetter}
          </p>
        </div>
      </GlassCard>
    </Reveal>
  );
}
