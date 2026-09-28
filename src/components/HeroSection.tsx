"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AiNeuralCore } from "./AiNeuralCore";
import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative min-h-[94vh] pt-32 sm:pt-36 pb-20 flex items-center bg-[#000000] overflow-hidden"
    >
      {/* Liquid Aurora Ambient Meshes (Floating behind the glass) */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-[#8052ff]/15 blur-[120px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#00e5ff]/10 blur-[110px] pointer-events-none fluid-blob-cyan" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#ffb829]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Monolithic Minimalist Copy (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col text-left z-10"
          >
            {/* Liquid Glass Amber Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 liquid-glass-tag w-fit">
              <span className="w-2 h-2 rounded-full bg-[#ffb829] shadow-[0_0_10px_#ffb829] animate-pulse" />
              <span className="text-xs sm:text-[13px] font-sans font-semibold uppercase tracking-[0.14em] text-[#ffb829]">
                {hero.eyebrow || "APPLIED AI · AUTOMATION · ERP OS"}
              </span>
            </div>

            {/* Candidate Identity */}
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#9a9a9a] mb-3">
              {hero.name}
            </span>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-display text-white tracking-[-0.035em] leading-[1.12] mb-6">
              Biến AI thành{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-white">
                hệ thống vận hành
              </span>{" "}
              thực tế.
            </h1>

            {/* Value Proposition Body */}
            <p className="text-base sm:text-lg text-body-light leading-relaxed max-w-xl mb-8">
              {hero.intro}
            </p>

            {/* Liquid Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="btn-liquid-primary"
              >
                <span>{hero.primary || "Xem 08 case study"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#systems"
                className="btn-liquid-secondary"
              >
                <span>{hero.secondary || "Mô hình AI × ERP"}</span>
              </a>

              <a
                href={hero.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-secondary text-[#ffb829] border-[#ffb829]/30 hover:border-[#ffb829] hover:bg-[#ffb829]/10"
              >
                <FileText className="w-4 h-4" />
                <span>{hero.cv}</span>
              </a>
            </div>

            {/* Liquid Glass Status Strip */}
            <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl liquid-glass-tag w-fit text-xs font-mono text-[#9a9a9a]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffaa] shadow-[0_0_8px_#00ffaa]" />
                <span className="text-white/90">{hero.status}</span>
              </div>
              <div className="text-white/20">|</div>
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Holographic AI Neural Core (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full h-[500px] sm:h-[580px] lg:h-[660px] flex items-center justify-center"
          >
            {/* Liquid radial caustics */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-[#8052ff]/15 blur-[100px] pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00e5ff]/12 blur-[80px] pointer-events-none" />

            {/* 3D Holographic AI Neural Brain */}
            <AiNeuralCore className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
