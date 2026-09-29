"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, BadgeCheck, Download, ExternalLink, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { asset } from "@/data/ui-strings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./motion/Reveal";

interface RecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Page scans: a readable WebP for the viewer, a small one for thumbnails. */
const PAGES = [
  { view: "/img/thumbs/letter-page-1-view.webp", thumb: "/img/thumbs/letter-page-1.webp", w: 1400, h: 2088 },
  { view: "/img/thumbs/letter-page-2-view.webp", thumb: "/img/thumbs/letter-page-2.webp", w: 1400, h: 1957 },
];

export function RecommendationModal({ open, onOpenChange }: RecommendationModalProps) {
  const { content, ui } = useLanguage();
  const rec = content.experience.recommendation;
  const [[page, dir], setPage] = useState<[number, number]>([0, 1]);
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  const goTo = (p: number) => {
    const next = Math.max(0, Math.min(PAGES.length - 1, p));
    if (next === page) return;
    setPage([next, next > page ? 1 : -1]);
    setZoom(1);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.5));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.5));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pdf = asset(rec.file);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setZoom(1);
      }}
    >
      <DialogContent className="flex h-[94dvh] w-[97vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-[1280px] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="flex flex-col border-b border-mist/10 bg-deep/70 p-4 lg:border-r lg:border-b-0 lg:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-signal uppercase">
            <BadgeCheck className="size-4" />
            {ui.verifiedLetter}
          </div>
          <DialogTitle className="mt-2 pr-10 text-lg leading-snug lg:mt-3 lg:text-2xl">{rec.modalTitle}</DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-relaxed">
            <span className="text-white">{rec.issuer}</span>
            <span className="hidden lg:inline">
              <br />
              {rec.issuerRole}
            </span>
          </DialogDescription>
          <p className="mt-3 hidden font-mono text-xs text-silver lg:block">{rec.date}</p>

          <ul className="mt-6 hidden space-y-2.5 lg:block">
            {rec.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-mist">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-7 hidden font-mono text-[11px] tracking-[0.12em] text-slate uppercase lg:block">{ui.letterPages}</p>
          <div className="mt-3 hidden gap-3 lg:flex">
            {PAGES.map((p, i) => (
              <button
                key={p.thumb}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${ui.letterPage} ${i + 1}`}
                className={cn(
                  "relative w-[104px] cursor-pointer overflow-hidden rounded-md bg-white ring-2 transition-all",
                  page === i ? "ring-signal" : "opacity-60 ring-transparent hover:opacity-100",
                )}
              >
                <Image src={p.thumb} alt="" width={180} height={260} className="h-auto w-full" />
                <span className="absolute right-1 bottom-1 rounded bg-deep/85 px-1.5 font-mono text-[10px] text-mist">{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2 lg:mt-auto lg:pt-6">
            <Button asChild size="sm" className="flex-1">
              <a href={pdf} download>
                <Download />
                {ui.downloadPdf}
              </a>
            </Button>
            <Button asChild size="sm" variant="glass">
              <a href={pdf} target="_blank" rel="noopener noreferrer" aria-label={ui.openPdf}>
                <ExternalLink />
              </a>
            </Button>
          </div>
        </aside>

        {/* Viewer */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-mist/10 px-4 py-2.5 pr-16 sm:px-5 sm:pr-20">
            <div className="flex items-center gap-1 lg:hidden">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn("h-8 cursor-pointer rounded-md px-3 font-mono text-xs", page === i ? "bg-signal text-abyss" : "text-silver")}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="hidden font-mono text-xs text-silver lg:block">
              {ui.letterPage} <span className="text-white">{page + 1}</span> / {PAGES.length}
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8" aria-label={ui.zoomOut} onClick={() => setZoom((z) => Math.max(1, z - 0.5))}>
                <ZoomOut />
              </Button>
              <span className="w-12 text-center font-mono text-xs text-lavender tabular-nums">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="icon" className="size-8" aria-label={ui.zoomIn} onClick={() => setZoom((z) => Math.min(3, z + 0.5))}>
                <ZoomIn />
              </Button>
              <Button variant="ghost" size="sm" className="h-8" onClick={() => setZoom(1)}>
                <Maximize2 />
                <span className="hidden sm:inline">{ui.letterFit}</span>
              </Button>
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle,rgba(232,246,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [perspective:1800px]"
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={page}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, rotateY: d * -35, x: d * 120, scale: 0.92 }),
                  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, rotateY: d * 35, x: d * -120, scale: 0.92 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: EASE_OUT }}
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
              >
                <motion.div
                  drag={zoom > 1}
                  dragConstraints={stageRef}
                  dragElastic={0.08}
                  animate={{ scale: zoom, ...(zoom === 1 ? { x: 0, y: 0 } : {}) }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2))}
                  className={cn("h-full", zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in")}
                >
                  <Image
                    src={PAGES[page].view}
                    alt={`${rec.modalTitle} — ${ui.letterPage} ${page + 1}`}
                    width={PAGES[page].w}
                    height={PAGES[page].h}
                    priority
                    draggable={false}
                    className="h-full w-auto max-w-none rounded-sm bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] select-none"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {page > 0 && (
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                aria-label={ui.prev}
                className="absolute top-1/2 left-4 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-mist/15 bg-deep/85 text-mist transition-colors hover:border-signal/60 hover:text-signal"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            {page < PAGES.length - 1 && (
              <button
                type="button"
                onClick={() => goTo(page + 1)}
                aria-label={ui.next}
                className="absolute top-1/2 right-4 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-mist/15 bg-deep/85 text-mist transition-colors hover:border-signal/60 hover:text-signal"
              >
                <ArrowRight className="size-4" />
              </button>
            )}
            <p className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-md bg-deep/80 px-3 py-1 font-mono text-[11px] text-slate sm:block">
              {ui.letterHint}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
