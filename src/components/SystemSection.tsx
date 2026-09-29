"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GlassCard } from "./motion/GlassCard";
import { Reveal } from "./motion/Reveal";
import { SplitText } from "./motion/SplitText";

/* Node positions for the molecular pipeline diagram (viewBox 400x440) */
const NODES = [
  { x: 150, y: 60 },
  { x: 250, y: 170 },
  { x: 150, y: 280 },
  { x: 250, y: 390 },
];
const SATELLITES = [
  { x: 230, y: 20, r: 4, link: 0 },
  { x: 60, y: 120, r: 5, link: 0 },
  { x: 350, y: 120, r: 6, link: 1 },
  { x: 330, y: 240, r: 4, link: 1 },
  { x: 60, y: 350, r: 6, link: 2 },
  { x: 60, y: 230, r: 4, link: 2 },
  { x: 350, y: 430, r: 5, link: 3 },
];
const PATH = `M ${NODES.map((n) => `${n.x} ${n.y}`).join(" L ")}`;

export function SystemSection() {
  const { content, ui } = useLanguage();
  const { system } = content;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(system.stages.length - 1, Math.max(0, Math.floor(p * system.stages.length))));
  });

  return (
    <section id="systems" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky narrative + diagram */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="label-caps flex items-center gap-2 !text-signal"><span aria-hidden className="size-1.5 bg-signal" />{ui.pipelineEyebrow}</p>
              </Reveal>
              <SplitText text={system.title} className="mt-5 text-heading-lg" />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[52ch] text-silver sm:text-lg">{system.intro}</p>
              </Reveal>

              <div className="mt-10 hidden max-w-[400px] lg:block">
                <svg viewBox="0 0 400 440" className="w-full" aria-hidden>
                  {SATELLITES.map((s, i) => (
                    <line
                      key={`l${i}`}
                      x1={s.x}
                      y1={s.y}
                      x2={NODES[s.link].x}
                      y2={NODES[s.link].y}
                      stroke="rgba(232,246,255,0.18)"
                      strokeWidth="1"
                    />
                  ))}
                  <path d={PATH} fill="none" stroke="rgba(232,246,255,0.14)" strokeWidth="1.5" />
                  <motion.path
                    d={PATH}
                    fill="none"
                    stroke="#3ee6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength: progress }}
                  />
                  {SATELLITES.map((s, i) => (
                    <circle
                      key={`s${i}`}
                      cx={s.x}
                      cy={s.y}
                      r={s.r}
                      fill={s.link <= active ? "#e8f6ff" : "rgba(232,246,255,0.25)"}
                      className="transition-[fill] duration-700"
                    />
                  ))}
                  {NODES.map((n, i) => (
                    <g key={`n${i}`}>
                      <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r={26}
                        fill="none"
                        stroke="#b8f6ff"
                        strokeWidth="1"
                        animate={{ opacity: i === active ? [0.6, 0] : 0, scale: i === active ? [1, 1.6] : 1 }}
                        transition={{ duration: 1.8, repeat: i === active ? Infinity : 0 }}
                        style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={18}
                        fill={i <= active ? "#3ee6d4" : "#0b1a24"}
                        stroke="rgba(232,246,255,0.35)"
                        className="transition-[fill] duration-700"
                      />
                      <text
                        x={n.x}
                        y={n.y + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="500"
                        fill={i <= active ? "#050d14" : "#93a8b4"}
                        className="transition-[fill] duration-700"
                      >
                        {system.stages[i]?.number}
                      </text>
                      <text
                        x={n.x < 200 ? n.x - 28 : n.x + 28}
                        y={n.y + 4}
                        textAnchor={n.x < 200 ? "end" : "start"}
                        fontSize="12"
                        letterSpacing="1.4"
                        fill="#93a8b4"
                      >
                        {system.stages[i]?.title.toUpperCase()}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Stage cards with a scroll-filled rail */}
          <div className="relative lg:col-span-7">
            <div aria-hidden className="absolute top-0 bottom-0 left-[19px] hidden w-px bg-mist/10 sm:block">
              <motion.div style={{ scaleY: railScale }} className="bg-signal h-full w-full origin-top" />
            </div>
            <ol className="flex flex-col gap-6">
              {system.stages.map((stage, i) => (
                <li key={stage.number} className="relative sm:pl-16">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-10 left-0 hidden size-10 place-items-center rounded-full border text-sm font-medium transition-colors duration-500 sm:grid",
                      i <= active ? "border-transparent bg-signal text-abyss" : "border-mist/20 bg-deep text-silver",
                    )}
                  >
                    {stage.number}
                  </span>
                  <Reveal>
                    <GlassCard
                      className={cn(
                        "p-8 transition-opacity duration-500 sm:p-10",
                        i === active ? "opacity-100" : "opacity-70",
                      )}
                    >
                      <p className="label-caps">{stage.label}</p>
                      <h3 className="mt-4 text-4xl leading-none tracking-[-0.02em]">{stage.title}</h3>
                      <p className="mt-4 max-w-[56ch] text-silver">{stage.description}</p>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {stage.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-4xl text-center text-2xl leading-snug tracking-[-0.02em] text-mist sm:text-[34px]">
            {system.proofNote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
