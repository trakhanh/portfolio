"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ConstellationCanvas } from "./ConstellationCanvas";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Ambient Constellation Particle Canvas */}
      <ConstellationCanvas className="opacity-90" />

      {/* Main Content Container (Spacious Two-Column Rhythm) */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          {/* Left Column: Monolithic Sculptural Typography + Violet Pill CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small uppercase label in #ffb829 Saffron Spark */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829]" />
              <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase">
                {hero.eyebrow} · TRÀ NGUYỄN GIA KHÁNH
              </span>
            </div>

            {/* Monolithic Display Headline (Weight 400 with aggressive negative tracking) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-normal tracking-tight text-white leading-[1.05] mb-8">
              {hero.title}
            </h1>

            {/* Signature ultra-light weight-200 body copy */}
            <p className="text-base sm:text-lg lg:text-xl font-extralight text-[#bdbdbd] max-w-[540px] leading-[1.65] mb-10">
              {hero.intro}
            </p>

            {/* Action Row: Sole Violet Pill Button + Ghost Link */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 bg-[#8052ff] hover:bg-[#9269ff] text-white text-[13px] font-medium tracking-[0.025em] uppercase px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(128,82,255,0.3)] hover:shadow-[0_4px_35px_rgba(128,82,255,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{hero.primary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#systems"
                className="text-[13px] font-medium tracking-[0.025em] text-[#9a9a9a] hover:text-white uppercase transition-colors inline-flex items-center gap-1.5"
              >
                <span>{hero.secondary}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quiet Footer Note */}
            <div className="mt-14 pt-6 border-t border-white/10 flex items-center gap-3 text-xs font-light text-[#9a9a9a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15846e]" />
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Focal Area (Floating Constellation Focal + Telemetry) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px] lg:min-h-[500px]"
          >
            {/* Soft Ambient Radial Glow Behind Constellation Center */}
            <div className="absolute w-72 h-72 rounded-full bg-[#8052ff]/10 blur-[80px] pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full bg-[#ffb829]/5 blur-[60px] translate-x-12 translate-y-12 pointer-events-none" />

            {/* Architecture Pipeline Floating Glass Badge */}
            <div className="mt-auto border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl p-5 w-full max-w-[420px] transition-all hover:border-white/20">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#9a9a9a] mb-3 pb-2 border-b border-white/5">
                <span className="text-[#ffb829] font-medium">{hero.profileLabel}</span>
                <span>{hero.profileDirection}</span>
              </div>

              {/* 4 Steps Flow */}
              <div className="flex items-center justify-between text-xs text-white">
                {hero.profileRoute.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="font-light text-[#ffffff] px-2 py-1 bg-white/[0.04] rounded-lg text-[11px]">
                      {step}
                    </span>
                    {idx < hero.profileRoute.length - 1 && (
                      <span className="text-[#8052ff] text-xs">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* 4 Focus Domains */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5">
                {hero.profileAreas.map((area) => (
                  <div key={area.title} className="text-left">
                    <span className="text-[10px] font-medium text-white block uppercase tracking-wider">
                      {area.title}
                    </span>
                    <span className="text-[11px] text-[#9a9a9a] font-extralight block truncate">
                      {area.meta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
