"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { TOOL_ICONS } from "@/data/ui-strings";
import { cn } from "@/lib/utils";

/** One pipeline stage word: an outline that fills in as its scroll window passes. */
function StageWord({
  word,
  index,
  total,
  progress,
  last,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  last: boolean;
}) {
  const start = 0.18 + (index / total) * 0.5;
  const fill = useTransform(progress, [start, start + 0.12], [0, 1]);
  const clip = useTransform(fill, (v) => `inset(-20% ${100 - v * 100}% -35% 0)`);

  return (
    <span className="relative inline-block">
      <span className="text-transparent [-webkit-text-stroke:1px_rgba(184,246,255,0.3)]">{word}</span>
      <motion.span
        aria-hidden
        style={{ clipPath: clip }}
        className={cn("absolute inset-0", last ? "text-signal [text-shadow:0_0_40px_rgba(62,230,212,0.45)]" : "text-white")}
      >
        {word}
      </motion.span>
    </span>
  );
}

/** Connector between stages: a hairline with a data packet travelling along it. */
function Connector({ delay }: { delay: number }) {
  return (
    // align-middle lands on the x-height centre; nudge up to sit between it and cap centre.
    <span aria-hidden className="relative mx-[max(2vw,0.9rem)] inline-block h-px w-[9vw] min-w-12 translate-y-[-0.1em] bg-mist/15 align-middle">
      <span
        className="absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_12px_2px_rgba(62,230,212,0.7)]"
        style={{ animation: `packet 2.4s ${delay}s linear infinite` }}
      />
      <span className="absolute top-1/2 right-0 size-2 -translate-y-1/2 rotate-45 border-t border-r border-mist/40" />
    </span>
  );
}

/** Resting speed in % of the (doubled) row per second: the old 60s marquee. */
const TICKER_SPEED = 50 / 60;

/**
 * Marquee that idles at a slow drift and surges with the page's scroll
 * velocity, then settles back (after React Bits' ScrollVelocity).
 */
function SkillTicker({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const paused = useRef(false);
  const base = useMotionValue(reverse ? -50 : 0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, (v) => Math.min(Math.abs(v) / 400, 6));
  const x = useTransform(base, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (!inView || paused.current || reduce) return;
    const step = (TICKER_SPEED * delta) / 1000;
    let next = base.get() + (reverse ? 1 : -1) * step * (1 + boost.get());
    if (next <= -50) next += 50;
    else if (next > 0) next -= 50;
    base.set(next);
  });

  return (
    <div
      ref={ref}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <motion.div style={{ x }} className="flex w-max shrink-0 gap-3 pr-3">
        {row.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="flex items-center gap-2.5 rounded-md border border-mist/10 bg-deep/60 px-3.5 py-2 font-mono text-[13px] whitespace-nowrap text-mist"
          >
            {TOOL_ICONS[s] ? (
              <Image src={`/img/tool-icons/${TOOL_ICONS[s]}`} alt="" width={16} height={16} className="size-4 object-contain" />
            ) : (
              <span aria-hidden className="size-1.5 bg-signal/80" />
            )}
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * The operating model as a scroll-driven pipeline: each stage lights up in
 * turn while packets flow between them, framed by two skill tickers.
 */
export function KineticBand() {
  const { content } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-38%"]);

  const stages = content.system.stages.map((s) => s.title);
  const skills = content.about.groups.flatMap((g) => g.items);
  const half = Math.ceil(skills.length / 2);

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-mist/10 bg-deep/40 py-10 select-none sm:py-14">
      <div className="flex flex-col gap-3">
        <SkillTicker items={skills.slice(0, half)} />
        <SkillTicker items={skills.slice(half)} reverse />
      </div>

      <div className="container-auros mt-10 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-slate uppercase sm:mt-14">
        <span>// data_pipeline.stream</span>
        <span className="flex items-center gap-2 text-signal">
          <span className="size-1.5 animate-pulse rounded-full bg-signal" />
          live
        </span>
      </div>

      <motion.p
        aria-label={stages.join(" → ")}
        style={{ x }}
        className="text-kinetic mt-4 whitespace-nowrap"
      >
        {stages.map((word, i) => (
          <span key={word} aria-hidden>
            <StageWord word={word} index={i} total={stages.length} progress={scrollYProgress} last={i === stages.length - 1} />
            {i < stages.length - 1 && <Connector delay={i * 0.6} />}
          </span>
        ))}
      </motion.p>
    </div>
  );
}
