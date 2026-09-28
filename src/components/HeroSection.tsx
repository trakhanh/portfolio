"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NeuralConstellation } from "./NeuralConstellation";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center bg-[#000000] overflow-hidden"
    >
      {/* 3D Brain Particle Constellation Canvas */}
      <NeuralConstellation className="opacity-80 md:opacity-100" />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Monolithic Minimalist Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col text-left pointer-events-auto"
          >
            {/* Amber Spark Eyebrow Label (DESIGN.md specification) */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] animate-pulse" />
              <span className="text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829]">
                {hero.eyebrow || "APPLIED AI · AUTOMATION · ERP OS"}
              </span>
            </div>

            {/* Candidate Name / Subtitle */}
            <span className="text-sm sm:text-base font-mono uppercase tracking-[0.15em] text-[#9a9a9a] mb-2">
              {hero.name}
            </span>

            {/* Monumental Weightless Headline (DESIGN.md style: 78-113px, weight 400, negative tracking) */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-display text-white tracking-[-0.04em] leading-[1.04] mb-6">
              {hero.title}
            </h1>

            {/* Ultra-light body text (DESIGN.md signature: 18px, weight 200, silver mist) */}
            <p className="text-base sm:text-lg text-body-light max-w-[540px] mb-8">
              {hero.intro}
            </p>

            {/* CTA Pills */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="btn-pill-primary inline-flex items-center gap-2 group"
              >
                <span>{hero.primary || "Xem 08 case study"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#systems"
                className="btn-pill-secondary inline-flex items-center gap-2"
              >
                <span>{hero.secondary || "Mô hình AI × ERP"}</span>
              </a>
            </div>

            {/* Status & Direction Metadata */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs font-mono text-[#9a9a9a]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15846e]" />
                <span className="text-white/80">{hero.status}</span>
              </div>
              <div className="text-[#666]">|</div>
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center pointer-events-none">
            {/* The 3D brain canvas animates into this zone and radiates outward */}
            <div className="w-full aspect-square max-w-[480px] relative flex items-center justify-center">
              {/* Subtle ambient rings */}
              <div className="w-[340px] h-[340px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="w-[440px] h-[440px] rounded-full border border-[#8052ff]/10 absolute animate-[spin_90s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
