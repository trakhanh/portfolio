"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ParticleSphere } from "./ParticleSphere";
import { Magnetic } from "./motion/Magnetic";
import { CountUp } from "./motion/CountUp";
import { EASE_OUT } from "./motion/Reveal";

/** "TRÀ NGUYỄN GIA KHÁNH" → ["Trà Nguyễn", "Gia Khánh"] */
function nameLines(name: string, locale: string): [string, string] {
  const words = name
    .toLocaleLowerCase(locale)
    .split(/\s+/)
    .map((w) => w.charAt(0).toLocaleUpperCase(locale) + w.slice(1));
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

/** Letters rise out of a blur, flash signal-cyan, then settle. */
function NameLine({ text, delay, accent, ready }: { text: string; delay: number; accent?: boolean; ready: boolean }) {
  let n = 0;
  return (
    <span className={cn("block whitespace-nowrap", accent && "[text-shadow:0_0_60px_rgba(62,230,212,0.35)]")}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={`${word}-${wi}`} className="inline-block">
          {Array.from(word).map((ch) => {
            const i = n++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: "0.35em", filter: "blur(14px)", color: "#3ee6d4" }}
                animate={ready ? { opacity: 1, y: "0em", filter: "blur(0px)", transitionEnd: { filter: "none" }, color: accent ? "#3ee6d4" : "#ffffff" } : undefined}
                transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE_OUT, color: { duration: 1.4, delay: delay + i * 0.045 + 0.3 } }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < arr.length - 1 && <span className="inline-block w-[0.26em]" />}
        </span>
      ))}
    </span>
  );
}

/** Types each role, holds, deletes, moves to the next — like a live terminal. */
function TypeRotator({ words, start }: { words: string[]; start: boolean }) {
  const reduce = useReducedMotion();
  const [wi, setWi] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setText(words[0]);
      return;
    }
    const word = words[wi % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text === "") {
      setDeleting(false);
      setWi((v) => v + 1);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 32 : 65,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, wi, words, start, reduce]);

  return (
    <span className="font-mono">
      <span className="text-slate">{">"} </span>
      <span className="text-signal">{text}</span>
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-signal"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
      />
    </span>
  );
}

const ORBITERS = [
  { icon: "openai.svg", label: "ChatGPT" },
  { icon: "anthropic.svg", label: "Claude" },
  { icon: "python.svg", label: "Python" },
  { icon: "n8n.svg", label: "n8n" },
  { icon: "googlegemini.svg", label: "Gemini" },
  { icon: "pytorch.svg", label: "PyTorch" },
  { icon: "googleappsscript.svg", label: "Apps Script" },
];

/**
 * Tool badges travelling an inclined elliptical orbit around the orb.
 * Badges on the near side grow and brighten; the far side recedes.
 */
function Orbit({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rx = Math.min(size.w * 0.45, 760);
  const ry = Math.min(size.h * 0.26, 230);
  const tilt = (-9 * Math.PI) / 180;

  useAnimationFrame((t) => {
    const time = reduce ? 0 : t / 1000;
    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      const a = time * 0.11 + (i / ORBITERS.length) * Math.PI * 2;
      const ex = Math.cos(a) * rx;
      const ey = Math.sin(a) * ry;
      const x = ex * Math.cos(tilt) - ey * Math.sin(tilt);
      const y = ex * Math.sin(tilt) + ey * Math.cos(tilt);
      const depth = (Math.sin(a) + 1) / 2; // 1 = nearest the viewer
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${0.72 + depth * 0.36})`;
      // Fade out while crossing the central text column so badges never cover copy or buttons.
      const clear = Math.min(1, Math.max(0, (Math.abs(x) - rx * 0.42) / (rx * 0.18)));
      el.style.opacity = String((0.25 + depth * 0.75) * clear);
      el.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 5}px)` : "none";
    });
  });

  return (
    <div ref={boxRef} aria-hidden className="pointer-events-none absolute inset-0">
      {size.w > 0 && (
        <motion.svg
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE_OUT }}
          className="absolute inset-0 hidden size-full overflow-visible lg:block"
        >
          <g transform={`translate(${size.w / 2} ${size.h * 0.44}) rotate(-9)`}>
            <ellipse rx={rx} ry={ry} fill="none" stroke="rgba(62,230,212,0.16)" strokeWidth="1" />
            <ellipse
              rx={rx}
              ry={ry}
              fill="none"
              stroke="rgba(62,230,212,0.55)"
              strokeWidth="1.2"
              strokeDasharray="2 14"
              className="animate-orbit-dash"
            />
            <ellipse rx={rx * 0.78} ry={ry * 0.78} fill="none" stroke="rgba(124,140,255,0.12)" strokeWidth="1" strokeDasharray="1 8" />
          </g>
        </motion.svg>
      )}
      <div className="absolute top-[44%] left-1/2 hidden lg:block">
        {ORBITERS.map((o, i) => (
          <motion.div
            key={o.icon}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
            className="absolute top-0 left-0"
          >
            <div
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              className="flex items-center gap-2 rounded-xl border border-mist/12 bg-deep/85 py-1.5 pr-3 pl-1.5 whitespace-nowrap shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] will-change-transform"
            >
              <span className="grid size-7 place-items-center rounded-lg bg-mist/[0.06]">
                <Image src={`/img/tool-icons/${o.icon}`} alt="" width={16} height={16} className="size-4 object-contain" />
              </span>
              <span className="font-mono text-[11px] text-mist">{o.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Viewfinder corners framing the hero. */
function HudFrame({ ready }: { ready: boolean }) {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 1.04 }}
      animate={ready ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
      className="pointer-events-none absolute inset-x-5 top-24 bottom-4 hidden sm:inset-x-8 md:block lg:inset-x-12"
    >
      {corners.map((c) => (
        <span key={c} className={cn("absolute size-5 border-signal/50", c)} />
      ))}
      <span className="absolute top-3 left-8 font-mono text-[10px] tracking-[0.14em] text-slate uppercase">sys.profile / 2026</span>
      <span className="absolute top-3 right-8 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-signal uppercase">
        <span className="size-1.5 animate-pulse rounded-full bg-signal" />
        online
      </span>
      <span className="absolute bottom-3 left-8 font-mono text-[10px] tracking-[0.14em] text-slate">10.7769° N · 106.7009° E</span>
      <span className="absolute right-8 bottom-3 font-mono text-[10px] tracking-[0.14em] text-slate uppercase">ho chi minh city</span>
    </motion.div>
  );
}

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const { content, ui, locale } = useLanguage();
  const { hero, system } = content;
  const ref = useRef<HTMLElement>(null);
  const [first, last] = nameLines(hero.name, locale);
  const roles = ui.heroRoles.split("|");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } } : undefined,
    transition: { duration: 1, delay, ease: EASE_OUT },
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20">
      <motion.div
        aria-hidden
        style={{ scale: sphereScale, opacity: sphereOpacity }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ready ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE_OUT }}
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="aspect-square h-[min(118vw,108svh)]">
          <ParticleSphere />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_46%_38%_at_center,rgba(5,13,20,0.6),transparent_74%)]" />
      </motion.div>

      <Orbit ready={ready} />
      <HudFrame ready={ready} />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-auros relative z-10 flex flex-1 flex-col items-center justify-center py-6 text-center"
      >
        <motion.div {...rise(0.1)} className="glass-chip">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          {hero.status}
        </motion.div>

        <h1
          aria-label={`${first} ${last}`}
          className="mt-7 text-[clamp(3.4rem,1rem+10vw,8.5rem)] leading-[1.08] font-medium tracking-[-0.025em] sm:mt-6"
        >
          <NameLine text={first} delay={0.25} ready={ready} />
          <NameLine text={last} delay={0.55} ready={ready} accent />
        </h1>

        <motion.p {...rise(0.95)} className="mt-5 text-base sm:text-xl">
          <TypeRotator words={roles} start={ready} />
        </motion.p>

        <motion.p {...rise(1.05)} className="mt-3 max-w-[34ch] text-xl leading-snug tracking-[-0.01em] text-mist sm:text-2xl">
          {hero.title}
        </motion.p>

        <motion.div {...rise(1.15)} className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Magnetic className="flex sm:inline-flex">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#projects">
                {hero.primary}
                <ArrowUpRight />
              </a>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="glass" className="w-full sm:w-auto">
            <a href="#skills">{ui.navSkills}</a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div {...rise(1.3)} className="relative z-10 container-auros pb-6">
        <div className="glass grid grid-cols-3 divide-x divide-mist/10 !rounded-2xl">
          {system.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5 px-2 py-4 text-center sm:items-start sm:gap-2 sm:px-8 sm:py-6 sm:text-left">
              <CountUp value={m.value} className="text-[28px] leading-none font-medium tracking-[-0.04em] text-lavender sm:text-5xl" />
              <span className="text-[10px] leading-snug tracking-[0.06em] text-mist uppercase sm:text-[13px] sm:tracking-[0.08em]">{m.label}</span>
            </div>
          ))}
        </div>
        <a href="#skills" className="mx-auto mt-5 flex w-fit items-center gap-2 font-mono text-xs tracking-[0.12em] text-silver uppercase hover:text-white">
          {ui.scroll}
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="size-3.5" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
