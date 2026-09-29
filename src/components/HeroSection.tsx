"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ParticleSphere, INTRO, INTRO_REVEAL_AT, type Glyph } from "./ParticleSphere";
import { Magnetic } from "./motion/Magnetic";
import { CountUp } from "./motion/CountUp";
import { EASE_OUT } from "./motion/Reveal";
import { useLite } from "@/lib/perf";

const INTRO_SESSION_KEY = "gk_particle_intro";

/** Decided once per page load (effects may run twice in dev). */
let introDecision: boolean | null = null;
function decideIntro(): boolean {
  if (introDecision !== null) return introDecision;
  let play = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    if (sessionStorage.getItem(INTRO_SESSION_KEY)) play = false;
    else if (play) sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {}
  introDecision = play;
  return play;
}

/** "TRÀ NGUYỄN GIA KHÁNH" → ["Trà Nguyễn", "Gia Khánh"] */
function nameLines(name: string, locale: string): [string, string] {
  const words = name
    .toLocaleLowerCase(locale)
    .split(/\s+/)
    .map((w) => w.charAt(0).toLocaleUpperCase(locale) + w.slice(1));
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

/**
 * One line of the name. In particle mode the letters simply fade in over the
 * particle lettering; otherwise they rise out of a blur, flash cyan, settle.
 */
function NameLine({
  text,
  delay,
  accent,
  ready,
  particleMode,
}: {
  text: string;
  delay: number;
  accent?: boolean;
  ready: boolean;
  particleMode: boolean;
}) {
  let n = 0;
  const settled = accent ? "#3ee6d4" : "#ffffff";
  return (
    <span data-name-line className={cn("block whitespace-nowrap", accent && "[text-shadow:0_0_60px_rgba(62,230,212,0.35)]")}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={`${word}-${wi}`} className="inline-block">
          {Array.from(word).map((ch) => {
            const i = n++;
            return particleMode ? (
              <motion.span
                key={`p${i}`}
                data-ch
                className="inline-block"
                initial={{ opacity: 0, color: "#3ee6d4" }}
                animate={ready ? { opacity: 1, color: settled } : undefined}
                transition={{
                  opacity: { duration: 0.7, delay: delay + i * 0.02, ease: "easeOut" },
                  color: { duration: 1.2, delay: delay + i * 0.02 + 0.2 },
                }}
              >
                {ch}
              </motion.span>
            ) : (
              <motion.span
                key={`n${i}`}
                data-ch
                className="inline-block"
                initial={{ opacity: 0, y: "0.35em", filter: "blur(14px)", color: "#3ee6d4" }}
                animate={
                  ready
                    ? { opacity: 1, y: "0em", filter: "blur(0px)", transitionEnd: { filter: "none" }, color: settled }
                    : undefined
                }
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

/* ------------------------------------------------------------------ orbit */

interface RingSpec {
  /** radii as a share of the hero box, capped in px */
  rx: number;
  ry: number;
  maxRx: number;
  maxRy: number;
  tilt: number; // degrees
  speed: number; // radians per second (sign = direction)
  tone: "signal" | "indigo";
}

const RINGS: RingSpec[] = [
  { rx: 0.45, ry: 0.27, maxRx: 760, maxRy: 235, tilt: -9, speed: 0.1, tone: "signal" },
  { rx: 0.37, ry: 0.19, maxRx: 620, maxRy: 165, tilt: 13, speed: -0.14, tone: "indigo" },
];

const ORBITERS = [
  { icon: "openai.svg", label: "ChatGPT", kind: "LLM", ring: 0 },
  { icon: "python.svg", label: "Python", kind: "Data", ring: 0 },
  { icon: "anthropic.svg", label: "Claude", kind: "LLM", ring: 0 },
  { icon: "n8n.svg", label: "n8n", kind: "Automation", ring: 0 },
  { icon: "googlegemini.svg", label: "Gemini", kind: "Multimodal", ring: 1 },
  { icon: "pytorch.svg", label: "PyTorch", kind: "Deep learning", ring: 1 },
  { icon: "googleappsscript.svg", label: "Apps Script", kind: "Workflow", ring: 1 },
];

const TRAIL = 16;
const TONE = { signal: "62,230,212", indigo: "124,140,255" } as const;

/**
 * Gyroscope of two inclined orbits around the orb. Each ring fades toward its
 * far side, carries a comet with a glowing tail, and ferries tool badges that
 * grow and light up on the near side, recede on the far side, and slip behind
 * the copy while crossing the centre column.
 */
function Orbit({ ready, delay }: { ready: boolean; delay: number }) {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cometRefs = useRef<(SVGCircleElement | null)[][]>(RINGS.map(() => []));
  const [size, setSize] = useState({ w: 0, h: 0 });
  // Only animate when the orbit is actually shown (lg+) and on screen.
  const activeRef = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    const mq = window.matchMedia("(min-width: 1024px)");
    let onScreen = true;
    const update = () => (activeRef.current = mq.matches && onScreen);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(el);
    mq.addEventListener("change", update);
    update();
    return () => {
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  const geo = RINGS.map((r) => ({
    rx: Math.min(size.w * r.rx, r.maxRx),
    ry: Math.min(size.h * r.ry, r.maxRy),
    rad: (r.tilt * Math.PI) / 180,
  }));
  const cy = size.h * 0.44;
  const perRing = RINGS.map((_, ri) => ORBITERS.filter((o) => o.ring === ri).length);
  const slotOf = ORBITERS.map((o, i) => ORBITERS.slice(0, i).filter((p) => p.ring === o.ring).length);

  useAnimationFrame((t) => {
    if (!activeRef.current) return;
    const time = reduce ? 0 : t / 1000;

    // Comets with trailing sparks (each ring's local, un-tilted frame)
    RINGS.forEach((ring, ri) => {
      const { rx, ry } = geo[ri];
      const head = time * ring.speed * 2.4 + ri * 2;
      cometRefs.current[ri].forEach((c, k) => {
        if (!c) return;
        const a = head - Math.sign(ring.speed) * k * 0.035;
        c.setAttribute("cx", String(Math.cos(a) * rx));
        c.setAttribute("cy", String(Math.sin(a) * ry));
      });
    });

    // Badges
    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      const ri = ORBITERS[i].ring;
      const { rx, ry, rad } = geo[ri];
      const a = time * RINGS[ri].speed + (slotOf[i] / perRing[ri]) * Math.PI * 2 + ri * 0.7;
      const ex = Math.cos(a) * rx;
      const ey = Math.sin(a) * ry;
      const x = ex * Math.cos(rad) - ey * Math.sin(rad);
      const y = ex * Math.sin(rad) + ey * Math.cos(rad);
      const depth = (Math.sin(a) + 1) / 2; // 1 = nearest the viewer
      const clear = Math.min(1, Math.max(0, (Math.abs(x) - rx * 0.42) / (rx * 0.18)));
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${0.72 + depth * 0.42})`;
      el.style.opacity = String((0.18 + depth * 0.82) * clear);
      el.style.zIndex = String(Math.round(depth * 10));
      el.style.filter = depth < 0.3 ? `blur(${(0.3 - depth) * 6}px)` : "none";
      el.style.setProperty("--lit", depth.toFixed(3));
    });
  });

  return (
    <div ref={boxRef} aria-hidden className="pointer-events-none absolute inset-0">
      {size.w > 0 && (
        <motion.svg
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, delay, ease: EASE_OUT }}
          className="absolute inset-0 hidden size-full overflow-visible lg:block"
        >
          <defs>
            {RINGS.map((ring, ri) => (
              <linearGradient
                key={ri}
                id={`orbit-depth-${ri}`}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1={-geo[ri].ry}
                x2="0"
                y2={geo[ri].ry}
              >
                <stop offset="0" stopColor={`rgb(${TONE[ring.tone]})`} stopOpacity="0.04" />
                <stop offset="0.55" stopColor={`rgb(${TONE[ring.tone]})`} stopOpacity="0.22" />
                <stop offset="1" stopColor={`rgb(${TONE[ring.tone]})`} stopOpacity="0.75" />
              </linearGradient>
            ))}
          </defs>
          {RINGS.map((ring, ri) => {
            const { rx, ry } = geo[ri];
            const rgb = TONE[ring.tone];
            return (
              <g key={ri} transform={`translate(${size.w / 2} ${cy}) rotate(${ring.tilt})`}>
                <ellipse rx={rx} ry={ry} fill="none" stroke={`url(#orbit-depth-${ri})`} strokeWidth="1.4" />
                <ellipse
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke={`url(#orbit-depth-${ri})`}
                  strokeWidth="3"
                  strokeDasharray="1 22"
                  strokeLinecap="round"
                  className="animate-orbit-dash"
                  style={{ animationDirection: ring.speed < 0 ? "reverse" : "normal" }}
                />
                <g>
                  {Array.from({ length: TRAIL }, (_, k) => (
                    <circle
                      key={k}
                      ref={(el) => {
                        cometRefs.current[ri][k] = el;
                      }}
                      r={k === 0 ? 3.2 : k === 1 ? 9 : Math.max(0.6, 2.6 - k * 0.14)}
                      fill={k === 0 ? "#ffffff" : `rgb(${rgb})`}
                      opacity={k === 0 ? 1 : k === 1 ? 0.18 : Math.max(0.05, 0.85 - k * 0.05)}
                    />
                  ))}
                </g>
              </g>
            );
          })}
        </motion.svg>
      )}

      <div className="absolute left-1/2 hidden lg:block" style={{ top: cy }}>
        {ORBITERS.map((o, i) => {
          const rgb = TONE[RINGS[o.ring].tone];
          return (
            <motion.div
              key={o.icon}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ delay: delay + 0.5 + i * 0.1, duration: 0.8 }}
              className="absolute top-0 left-0"
            >
              <div
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                style={
                  {
                    "--rgb": rgb,
                    boxShadow:
                      "0 0 0 1px rgba(var(--rgb), calc(0.12 + var(--lit, 0) * 0.35)), 0 18px 40px -16px rgba(0,0,0,0.9), 0 0 calc(var(--lit, 0) * 34px) -6px rgba(var(--rgb), calc(var(--lit, 0) * 0.55))",
                  } as React.CSSProperties
                }
                className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(18,36,48,0.96),rgba(6,14,20,0.96))] py-2 pr-4 pl-2 whitespace-nowrap will-change-transform"
              >
                {/* specular top edge */}
                <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative grid size-10 place-items-center rounded-xl bg-mist/[0.06] ring-1 ring-[rgba(var(--rgb),0.35)]">
                  <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_40%,rgba(var(--rgb),0.35),transparent_70%)] opacity-[var(--lit,0)]" />
                  <Image src={`/img/tool-icons/${o.icon}`} alt="" width={20} height={20} className="relative size-5 object-contain" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[13px] font-medium text-white">{o.label}</span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-[rgb(var(--rgb))] uppercase">{o.kind}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Phones/tablets: the orbit's tools as a slow ribbon under the CTAs. */
function ToolRibbon({ ready, delay }: { ready: boolean; delay: number }) {
  const row = [...ORBITERS, ...ORBITERS];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : undefined}
      transition={{ duration: 0.8, delay }}
      aria-hidden
      className="mt-8 w-screen max-w-[100vw] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] lg:hidden"
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-2.5">
        {row.map((o, i) => {
          const rgb = TONE[RINGS[o.ring].tone];
          return (
            <span
              key={`${o.icon}-${i}`}
              style={{ "--rgb": rgb } as React.CSSProperties}
              className="flex items-center gap-2 rounded-xl border border-[rgba(var(--rgb),0.25)] bg-deep/80 py-1.5 pr-3 pl-1.5"
            >
              <span className="grid size-7 place-items-center rounded-lg bg-mist/[0.07]">
                <Image src={`/img/tool-icons/${o.icon}`} alt="" width={16} height={16} className="size-4 object-contain" />
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="text-xs font-medium text-white">{o.label}</span>
                <span className="font-mono text-[9px] tracking-[0.08em] text-[rgb(var(--rgb))] uppercase">{o.kind}</span>
              </span>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Viewfinder corners framing the hero. */
function HudFrame({ ready, delay }: { ready: boolean; delay: number }) {
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
      transition={{ duration: 1.2, delay, ease: EASE_OUT }}
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

/* ------------------------------------------------------------------- hero */

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const { content, ui, locale } = useLanguage();
  const { hero, system } = content;
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [first, last] = nameLines(hero.name, locale);
  const roles = ui.heroRoles.split("|");

  // The particle lettering plays once per browser session.
  const [particleMode, setParticleMode] = useState<boolean | null>(null);
  useEffect(() => {
    setParticleMode(decideIntro());
  }, []);
  const go = ready && particleMode !== null;
  const intro = !!particleMode;

  /** Glyph positions of the real name, for the particles to spell out. */
  const readGlyphs = useCallback((): Glyph[] => {
    const h1 = nameRef.current;
    if (!h1) return [];
    const cs = getComputedStyle(h1);
    const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    return Array.from(h1.querySelectorAll<HTMLElement>("[data-ch]")).map((el) => {
      const line = el.closest("[data-name-line]")!.getBoundingClientRect();
      return { ch: el.textContent ?? "", x: el.getBoundingClientRect().left, lineTop: line.top, lineHeight: line.height, font };
    });
  }, []);

  // With the intro, the rest of the hero waits for the particles to settle.
  const after = intro ? INTRO_REVEAL_AT - 0.4 : 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const lite = useLite();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: go ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } } : undefined,
    transition: { duration: lite ? 0.8 : 1, delay, ease: EASE_OUT, filter: lite ? { duration: 0, delay } : undefined },
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20">
      <motion.div
        aria-hidden
        style={{ scale: sphereScale, opacity: sphereOpacity }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : undefined}
        transition={{ duration: intro ? 0.3 : 1.4, ease: EASE_OUT }}
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        {/* Below lg the copy stacks tall, so the section's centre lands behind the
            CTAs; lift the orb to halo the name instead. */}
        <div className="aspect-square h-[min(118vw,108svh)] max-lg:absolute max-lg:top-[34svh] max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2">
          {go && <ParticleSphere intro={intro ? readGlyphs : null} />}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: intro ? INTRO_REVEAL_AT : 0 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_46%_38%_at_center,rgba(5,13,20,0.6),transparent_74%)] max-lg:bg-[radial-gradient(ellipse_46%_26%_at_50%_34svh,rgba(5,13,20,0.5),transparent_74%)]"
        />
      </motion.div>

      <Orbit ready={go} delay={intro ? INTRO.form + INTRO.hold + 0.4 : 0.4} />
      <HudFrame ready={go} delay={intro ? INTRO_REVEAL_AT : 0.2} />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-auros relative z-10 flex flex-1 flex-col items-center justify-center py-6 text-center"
      >
        <motion.div {...rise(intro ? INTRO_REVEAL_AT : 0.1)} className="glass-chip">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          {hero.status}
        </motion.div>

        <h1
          ref={nameRef}
          aria-label={`${first} ${last}`}
          className="mt-7 text-[clamp(3.4rem,1rem+10vw,8.5rem)] leading-[1.08] font-medium tracking-[-0.025em] sm:mt-6"
        >
          {/* Keyed by text so a language switch replays the whole line; per-word keys
              left words shared by both locales ("Gia") frozen while the rest animated. */}
          <NameLine key={first} text={first} delay={intro ? INTRO_REVEAL_AT : 0.25} ready={go} particleMode={intro} />
          <NameLine key={last} text={last} delay={intro ? INTRO_REVEAL_AT + 0.1 : 0.55} ready={go} particleMode={intro} accent />
        </h1>

        <motion.p {...rise(after + 0.95)} className="mt-5 text-base sm:text-xl">
          <TypeRotator words={roles} start={go} />
        </motion.p>

        <motion.p {...rise(after + 1.05)} className="mt-3 max-w-[34ch] text-xl leading-snug tracking-[-0.01em] text-mist sm:text-2xl">
          {hero.title}
        </motion.p>

        <motion.div
          {...rise(after + 1.15)}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
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

        <ToolRibbon ready={go} delay={after + 1.3} />
      </motion.div>

      <motion.div {...rise(after + 1.3)} className="relative z-10 container-auros pb-6">
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
