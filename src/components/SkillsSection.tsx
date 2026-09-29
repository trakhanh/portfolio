"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TOOL_ICONS } from "@/data/ui-strings";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./motion/GlassCard";
import { Reveal, EASE_OUT } from "./motion/Reveal";
import { useLite } from "@/lib/perf";

export function SkillsSection() {
  const { content, ui } = useLanguage();
  const { work, system } = content;
  // Phones render the chips/icons in place instead of ~40 staggered animations.
  const lite = useLite();

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <SectionHeading eyebrow={ui.skillsEyebrow} title={ui.skillsTitle} intro={ui.skillsIntro} />

        {/* Two AI directions */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {work.areas.map((area, i) => (
            <Reveal key={area.index} delay={i * 0.12}>
              <GlassCard tilt={4} className="flex h-full flex-col p-6 sm:p-12">
                <span className="text-[86px] leading-none font-medium tracking-[-0.046em] text-lavender">{area.index}</span>
                <h3 className="mt-8 text-3xl leading-none tracking-[-0.02em] sm:text-4xl">{area.title}</h3>
                <p className="label-caps mt-4">{area.note}</p>
                <p className="mt-5 max-w-[62ch] text-silver">{area.description}</p>
                <motion.ul
                  className="mt-auto flex flex-wrap gap-2 pt-10"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={lite ? { duration: 0 } : { staggerChildren: 0.05, delayChildren: 0.2 }}
                >
                  {area.capabilities.map((cap) => (
                    <motion.li
                      key={cap}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.96 },
                        show: { opacity: 1, y: 0, scale: 1, transition: lite ? { duration: 0.25 } : { duration: 0.5, ease: EASE_OUT } },
                      }}
                    >
                      <Badge>{cap}</Badge>
                    </motion.li>
                  ))}
                </motion.ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Tool stack + education */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <GlassCard className="h-full p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-2xl tracking-[-0.02em]">{ui.stackTitle}</h3>
                <p className="label-caps">{system.tools.eyebrow}</p>
              </div>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {system.tools.groups.map((group, gi) => (
                  <div key={group.title}>
                    <p className="label-caps text-mist">{group.title}</p>
                    <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-2">
                      {group.items.map((tool, ti) => (
                        <motion.li
                          key={tool}
                          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={lite ? { duration: 0.3 } : { type: "spring", stiffness: 260, damping: 18, delay: gi * 0.12 + ti * 0.06 }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                whileHover={{ y: -4, scale: 1.06 }}
                                className="glass-deep flex aspect-square flex-col items-center justify-center gap-2 !rounded-xl p-2"
                                tabIndex={0}
                              >
                                {TOOL_ICONS[tool] ? (
                                  <Image src={`/img/tool-icons/${TOOL_ICONS[tool]}`} alt="" width={28} height={28} className="size-7 object-contain" />
                                ) : (
                                  <span className="text-sm font-medium text-aqua">{tool.slice(0, 3)}</span>
                                )}
                                <span className="hidden text-center text-[11px] leading-tight text-silver sm:block">{tool}</span>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent className="sm:hidden">{tool}</TooltipContent>
                          </Tooltip>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <GlassCard variant="deep" className="flex h-full flex-col p-5 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-3">
                <p className="label-caps flex items-center gap-2">
                  <GraduationCap className="size-4 text-signal" />
                  {ui.education}
                </p>
                <span className="flex items-center gap-1.5 rounded-md bg-signal/12 px-2 py-1 font-mono text-[11px] text-signal">
                  <BadgeCheck className="size-3.5" />
                  {work.education.status.split(" · ").pop()}
                </span>
              </div>

              {/* Logo + degree: side by side on phones, stacked on wide cards */}
              <div className="mt-5 flex items-center gap-4 sm:gap-5 lg:mt-7 lg:mb-6 lg:flex-col lg:items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
                  className="shrink-0 rounded-xl border border-mist/10 bg-white/[0.04] p-2 sm:p-3"
                >
                  <Image
                    src="/img/huflit-logo.svg"
                    alt="Logo HUFLIT — Trường Đại học Ngoại ngữ – Tin học TP.HCM"
                    width={210}
                    height={140}
                    className="h-auto w-[84px] sm:w-[120px] lg:w-[150px]"
                  />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-lg leading-snug tracking-[-0.01em] sm:text-xl lg:text-2xl lg:leading-tight">{work.education.degree}</h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-silver sm:text-sm">{work.education.school}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-mist/10 pt-4 lg:mt-auto lg:pt-5">
                <p className="font-mono text-[11px] tracking-[0.1em] text-slate uppercase">{work.education.focusLabel}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {work.education.focus.map((f) => (
                    <li key={f} className="rounded-md border border-mist/10 bg-mist/[0.04] px-2 py-1 text-xs text-mist">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
