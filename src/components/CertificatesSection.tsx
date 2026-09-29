"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Expand } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { certImage } from "@/data/ui-strings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal, EASE_OUT } from "./motion/Reveal";
import { FadeImage } from "./motion/FadeImage";
import { CertificateModal } from "./CertificateModal";

const AUTOPLAY_MS = 6000;
const NAV_BTN =
  "grid size-10 cursor-pointer place-items-center rounded-full border border-mist/15 bg-deep/70 text-mist transition-colors hover:border-signal/60 hover:text-signal";

export function CertificatesSection() {
  const { content, ui } = useLanguage();
  const { certificates } = content;
  const items = certificates.items;
  const [[active, dir], setState] = useState<[number, number]>([0, 1]);
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { margin: "-20% 0px -20% 0px" });
  const cert = items[active];
  const paused = hover || !inView || modal !== null;

  const go = (next: number, d = next > active ? 1 : -1) => setState([(next + items.length) % items.length, d]);

  return (
    <section id="proof" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <SectionHeading eyebrow={certificates.eyebrow} title={certificates.title} intro={certificates.intro} />

        <Reveal className="mt-14">
          <div
            ref={boxRef}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            className="grid gap-6 lg:grid-cols-12"
          >
            {/* Featured viewer */}
            <div className="glass-solid overflow-hidden lg:col-span-7">
              <div className="relative bg-[linear-gradient(180deg,#0e2130,#07121a)] p-3 sm:p-7">
                <div aria-hidden className="absolute inset-0 [background-image:linear-gradient(rgba(62,230,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(62,230,212,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="relative aspect-[3300/2550] [perspective:1400px]">
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.button
                      key={active}
                      type="button"
                      custom={dir}
                      onTap={() => setModal(active)}
                      aria-label={`${ui.zoomIn}: ${cert.title}`}
                      drag="x"
                      dragDirectionLock
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={(_, info) => {
                        // A short flick counts as much as a long drag.
                        const swipe = info.offset.x + info.velocity.x * 0.2;                        if (swipe < -60) go(active + 1, 1);
                        else if (swipe > 60) go(active - 1, -1);
                      }}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, x: d * 90, rotateY: d * -14, scale: 0.94 }),
                        center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
                        exit: (d: number) => ({ opacity: 0, x: d * -90, rotateY: d * 14, scale: 0.94 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                      className="group absolute inset-0 cursor-grab overflow-hidden rounded-lg shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] ring-1 ring-white/10 active:cursor-grabbing"
                    >
                      <FadeImage
                        src={certImage(cert.image)}
                        alt={cert.title}
                        fill
                        draggable={false}
                        priority={active === 0}
                        sizes="(min-width: 1024px) 55vw, 95vw"
                        wrapperClassName="bg-white"
                        className="pointer-events-none object-contain"
                      />
                      <span className="absolute right-2 bottom-2 flex items-center gap-1.5 rounded-md bg-deep/85 p-1.5 font-mono text-[11px] text-mist transition-opacity sm:right-3 sm:bottom-3 lg:px-2.5 lg:opacity-0 lg:group-hover:opacity-100">
                        <Expand className="size-3.5" />
                        <span className="hidden lg:inline">{ui.zoomIn}</span>
                      </span>
                    </motion.button>
                  </AnimatePresence>
                </div>

                {/* Phones/tablets: position + controls sit right under the image */}
                <div className="relative mt-3 flex items-center gap-3 lg:hidden">
                  <p className="w-14 font-mono text-xs text-silver tabular-nums">
                    <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
                  </p>
                  <div className="flex flex-1 items-center justify-center gap-1.5">
                    {items.map((c, i) => (
                      <button
                        key={c.title}
                        type="button"
                        aria-label={c.title}
                        aria-current={i === active}
                        onClick={() => go(i)}
                        className="grid h-6 cursor-pointer place-items-center"
                      >
                        <span
                          className={cn(
                            "block h-1.5 rounded-full transition-[width,background-color] duration-300",
                            i === active ? "w-5 bg-signal" : "w-1.5 bg-mist/25",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" aria-label={ui.prev} onClick={() => go(active - 1, -1)} className={NAV_BTN}>
                      <ArrowLeft className="size-4" />
                    </button>
                    <button type="button" aria-label={ui.next} onClick={() => go(active + 1, 1)} className={NAV_BTN}>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Enter-only swap: no empty exit phase, so the page doesn't jump. */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="p-5 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.1em] uppercase">
                  <span className="text-slate">{cert.issuer}</span>
                  <span className="flex items-center gap-1 rounded-md bg-signal/12 px-2 py-0.5 text-signal">
                    <BadgeCheck className="size-3.5" />
                    {cert.date}
                  </span>
                </div>
                <h3 className="mt-3 text-xl leading-tight tracking-[-0.02em] sm:text-[28px]">{cert.title}</h3>
                <p className="mt-3 max-w-[60ch] text-silver">{cert.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cert.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                  {cert.verifyUrl && (
                    <Button asChild size="sm" className="max-sm:flex-1">
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                        {ui.verify}
                        <ArrowUpRight />
                      </a>
                    </Button>
                  )}
                  {cert.courseUrl && (
                    <Button asChild size="sm" variant="glass" className="max-sm:flex-1">
                      <a href={cert.courseUrl} target="_blank" rel="noopener noreferrer">
                        {ui.course}
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="max-lg:hidden" onClick={() => setModal(active)}>
                    <Expand />
                    {ui.zoomIn}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Index rail */}
            <div className="flex min-w-0 flex-col lg:col-span-5">
              <div className="mb-3 hidden items-center justify-between lg:flex">
                <p className="font-mono text-xs text-silver tabular-nums">
                  <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label={ui.prev}
                    onClick={() => go(active - 1, -1)}
                    className={NAV_BTN}
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={ui.next}
                    onClick={() => go(active + 1, 1)}
                    className={NAV_BTN}
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* lg+ only. Its progress bar drives autoplay, so hiding it also stops
                  autoplay on phones, where the swap would shift the page mid-read. */}
              <ul className="hidden flex-col gap-2 lg:flex">
                {items.map((c, i) => {
                  const on = i === active;
                  return (
                    <li key={c.title}>
                      <button
                        type="button"
                        onClick={() => go(i)}
                        aria-current={on}
                        className={cn(
                          "relative isolate flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-xl border p-2.5 pr-4 text-left transition-colors",
                          on ? "border-signal/35" : "border-mist/10 hover:border-mist/25",
                        )}
                      >
                        {on && (
                          <motion.span
                            layoutId="cert-active"
                            className="absolute inset-0 -z-10 bg-mist/[0.05]"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        <span className="relative aspect-[3300/2550] w-24 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-white/10">
                          <Image src={certImage(c.image)} alt="" fill sizes="96px" className="object-contain" />
                        </span>
                        <span className="min-w-0">
                          <span className={cn("line-clamp-2 text-sm leading-snug font-medium", on ? "text-white" : "text-silver")}>{c.title}</span>
                          <span className="mt-1 block font-mono text-[11px] text-slate">{c.date}</span>
                        </span>
                        {on && (
                          <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-mist/10">
                            <span
                              key={active}
                              onAnimationEnd={() => go(active + 1, 1)}
                              className="block h-full origin-left bg-signal"
                              style={{
                                animation: `cert-progress ${AUTOPLAY_MS}ms linear forwards`,
                                animationPlayState: paused ? "paused" : "running",
                              }}
                            />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto lg:pt-6">
                <div className="rounded-xl border border-mist/10 bg-deep/60 p-5">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{certificates.moreLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {certificates.moreItems.map((m) => (
                      <Badge key={m.code} className="!py-1.5 !text-sm">
                        <span className="text-lavender">{m.code}</span>
                        {m.title !== m.code && <span>{m.title}</span>}
                        <span className="text-silver">· {m.issuer}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <CertificateModal items={items} index={modal} onIndexChange={setModal} />
    </section>
  );
}
