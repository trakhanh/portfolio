"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Check, FileCheck2, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { asset } from "@/data/ui-strings";
import type { ExperienceItem } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./motion/GlassCard";
import { Reveal, EASE_OUT } from "./motion/Reveal";
import { RecommendationModal } from "./RecommendationModal";

const MONTHS_EN = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Parses "Tháng 7/2025" or "Jul 2025" into a month index; null for "present". */
function monthIndex(part: string): number | null {
  const vi = part.match(/(\d{1,2})\/(\d{4})/);
  if (vi) return +vi[2] * 12 + (+vi[1] - 1);
  const en = part.toLowerCase().match(/([a-z]{3})[a-z]*\s+(\d{4})/);
  if (en && MONTHS_EN.includes(en[1])) return +en[2] * 12 + MONTHS_EN.indexOf(en[1]);
  return null;
}

function duration(item: ExperienceItem): number | null {
  if (item.current) return null;
  const [from, to] = item.date.split("—").map((s) => s.trim());
  const a = monthIndex(from);
  const b = to ? monthIndex(to) : null;
  return a !== null && b !== null ? b - a + 1 : null;
}

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function DetailPanel({ item, index, total }: { item: ExperienceItem; index: number; total: number }) {
  const { ui, content, cases } = useLanguage();
  const related = item.key ? content.projects.items.filter((p) => p.orgKey === item.key) : [];
  const months = duration(item);

  return (
    <GlassCard className="relative h-full overflow-hidden p-5 sm:p-10">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-4 font-mono text-[140px] leading-none font-medium text-transparent [-webkit-text-stroke:1px_rgba(62,230,212,0.14)] sm:text-[180px]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="relative">
        <motion.div variants={rise} className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.1em] text-silver uppercase">
          <span>{item.date}</span>
          {months && (
            <span className="rounded-md border border-mist/15 px-2 py-0.5 text-mist normal-case">
              {months} {ui.months}
            </span>
          )}
          {item.current && (
            <span className="flex items-center gap-1.5 rounded-md bg-signal/15 px-2 py-0.5 text-signal">
              <span className="size-1.5 animate-pulse rounded-full bg-signal" />
              {ui.current}
            </span>
          )}
        </motion.div>

        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" }, transition: { duration: 0.6, ease: EASE_OUT } },
          }}
          className="mt-5 max-w-[22ch] text-3xl leading-[1.05] tracking-[-0.03em] sm:text-[42px]"
        >
          {item.role}
        </motion.h3>
        <motion.p variants={rise} className="mt-3 text-mist">
          {item.company}
        </motion.p>

        <motion.p variants={rise} className="mt-8 font-mono text-[11px] tracking-[0.12em] text-slate uppercase">
          {ui.highlights} · {String(item.highlights.length).padStart(2, "0")}
        </motion.p>
        <ul className="mt-4 grid gap-2">
          {item.highlights.map((h) => (
            <motion.li
              key={h}
              variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } } }}
              className="flex gap-3 rounded-lg border border-transparent p-2 text-silver transition-colors hover:border-mist/10 hover:bg-mist/[0.03] hover:text-mist"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-signal/12 text-signal">
                <Check className="size-3" />
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">{h}</span>
            </motion.li>
          ))}
        </ul>

        {related.length > 0 && (
          <motion.div variants={rise} className="mt-8">
            <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">
              {cases.labels.related} · {String(related.length).padStart(2, "0")}
            </p>
            <ul className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.id} className="min-w-0">
                  <Link
                    href={`/projects/${p.id}/`}
                    className="group flex h-full items-center gap-3 rounded-xl border border-mist/12 bg-deep/60 p-2.5 pr-4 transition-all hover:-translate-y-0.5 hover:border-signal/45 hover:bg-signal/[0.05]"
                  >
                    <span className="relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
                      <Image src={asset(p.image)} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-snug font-medium text-white">{p.title}</span>
                      <span className="mt-0.5 line-clamp-2 text-xs text-lavender sm:line-clamp-1">{p.result}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-slate transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {item.links && item.links.length > 0 && (
          <motion.div variants={rise} className="mt-8">
            <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{ui.liveProducts}</p>
            <ul className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              {item.links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start gap-3 rounded-xl border border-mist/12 bg-deep/60 p-4 transition-all hover:-translate-y-0.5 hover:border-signal/45 hover:bg-signal/[0.05]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-signal/25 bg-signal/10 text-signal">
                      <Globe className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-mono text-sm text-white">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                        </span>
                        {l.label}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-silver">{l.note}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-slate transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <p className="mt-8 font-mono text-xs text-slate">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </motion.div>
    </GlassCard>
  );
}

export function ExperienceSection() {
  const { content, ui } = useLanguage();
  const { experience } = content;
  const rec = experience.recommendation;
  const [active, setActive] = useState("0");
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.title} intro={experience.intro} />

        <Reveal className="mt-14">
          <Tabs value={active} onValueChange={setActive} orientation="vertical" className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
            {/* Company rail */}
            <TabsList className="relative flex h-auto w-full min-w-0 justify-start gap-2 overflow-x-auto bg-transparent p-0 pb-1 [scrollbar-width:none] max-lg:!flex-row max-lg:!items-stretch lg:col-span-4 lg:flex-col lg:gap-1 lg:overflow-visible">
              <span aria-hidden className="absolute top-8 bottom-8 left-[19px] hidden w-px bg-mist/10 lg:block" />
              {experience.items.map((item, i) => {
                const on = active === String(i);
                return (
                  <TabsTrigger
                    key={item.company}
                    value={String(i)}
                    className="relative isolate h-auto w-[80%] max-w-[320px] shrink-0 grow-0 max-lg:!w-[78%] max-lg:!flex-none lg:w-full lg:max-w-none cursor-pointer flex-col items-start justify-start gap-1 rounded-xl border border-mist/10 px-4 py-4 text-left whitespace-normal data-[state=active]:border-signal/30 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:min-w-0 lg:border-transparent lg:py-5 lg:pl-14 lg:data-[state=active]:border-mist/10"
                  >
                    {on && (
                      <motion.span
                        layoutId="exp-active"
                        className="absolute inset-0 -z-10 rounded-xl bg-mist/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1/2 left-[12px] hidden size-4 -translate-y-1/2 rounded-full border-2 transition-all duration-500 lg:block",
                        on ? "border-signal bg-signal shadow-[0_0_14px_rgba(62,230,212,0.8)]" : "border-mist/30 bg-abyss",
                      )}
                    />
                    <span className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">{item.date}</span>
                    <span className={cn("text-sm leading-snug font-medium transition-colors", on ? "text-white" : "text-silver")}>
                      {item.company}
                    </span>
                    <span className={cn("text-xs transition-colors", on ? "text-signal" : "text-slate")}>{item.role}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* overflow-x-clip: the panel slides in from x:30, which otherwise nudges the page sideways on phones */}
            <div className="min-w-0 overflow-x-clip lg:col-span-8">
              <AnimatePresence mode="wait">
                {experience.items.map((item, i) =>
                  active === String(i) ? (
                    <TabsContent key={item.company} value={String(i)} forceMount asChild>
                      <motion.div
                        initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                        exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="h-full"
                      >
                        <DetailPanel item={item} index={i} total={experience.items.length} />
                      </motion.div>
                    </TabsContent>
                  ) : null,
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </Reveal>

        {/* Signed recommendation */}
        <Reveal className="mt-10">
          <GlassCard variant="deep" className="grid grid-cols-[minmax(0,1fr)] gap-10 overflow-hidden p-6 sm:p-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md bg-[rgba(20,56,76,0.5)]">
                  <FileCheck2 className="size-4 text-signal" />
                </span>
                <p className="label-caps">{rec.eyebrow}</p>
              </div>
              <h3 className="mt-6 text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">{rec.title}</h3>
              <p className="mt-5 max-w-[62ch] text-silver">{rec.description}</p>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {rec.highlights.map((h) => (
                  <li key={h} className="glass-chip !text-sm">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button onClick={() => setLetterOpen(true)}>
                  {ui.viewLetter}
                  <ArrowUpRight />
                </Button>
                <p className="text-sm text-silver">
                  <span className="text-white">{rec.issuer}</span> · {rec.issuerRole}
                </p>
              </div>
            </div>
            <motion.button
              type="button"
              onClick={() => setLetterOpen(true)}
              aria-label={ui.viewLetter}
              initial="rest"
              animate="rest"
              whileHover="spread"
              whileFocus="spread"
              className="group relative mx-auto h-[380px] w-full max-w-[380px] cursor-pointer sm:h-[440px] lg:col-span-5"
            >
              {[
                { src: "/img/thumbs/letter-page-2.webp", rest: { rotate: 7, x: 34, y: 10 }, spread: { rotate: 12, x: 92, y: 18 } },
                { src: "/img/thumbs/letter-page-1.webp", rest: { rotate: -3, x: -10, y: 0 }, spread: { rotate: -8, x: -52, y: -8 } },
              ].map((pg, i) => (
                <motion.span
                  key={pg.src}
                  variants={{ rest: pg.rest, spread: pg.spread }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="absolute top-1/2 left-1/2 -mt-[190px] -ml-[134px] block w-[268px] overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-black/10 sm:-mt-[215px] sm:-ml-[150px] sm:w-[300px]"
                  style={{ zIndex: i }}
                >
                  <Image src={pg.src} alt={i === 1 ? rec.previewAlt : ""} width={360} height={520} className="h-auto w-full" />
                </motion.span>
              ))}
              <motion.span
                variants={{ rest: { scale: 1, rotate: -8 }, spread: { scale: 1.08, rotate: 0 } }}
                className="absolute right-2 bottom-6 z-10 flex items-center gap-1.5 rounded-full border border-signal/40 bg-deep/90 px-3.5 py-2 font-mono text-[11px] tracking-[0.08em] text-signal uppercase shadow-[0_10px_30px_-10px_rgba(62,230,212,0.6)] sm:right-0"
              >
                <BadgeCheck className="size-4" />
                {ui.verifiedLetter}
              </motion.span>
              <span className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rounded-md bg-deep/85 px-3 py-1.5 font-mono text-[11px] text-mist opacity-0 transition-opacity group-hover:opacity-100">
                {ui.viewLetter} ↗
              </span>
            </motion.button>
          </GlassCard>
        </Reveal>
      </div>

      <RecommendationModal open={letterOpen} onOpenChange={setLetterOpen} />
    </section>
  );
}
