"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AiNeuralCore } from "./AiNeuralCore";
import { motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  // 4 Signature Statistics
  const stats = [
    { value: "99.2%", label: "Độ chính xác kiểm tra thị giác AI" },
    { value: "70%", label: "Tiết kiệm thời gian xử lý vận hành" },
    { value: "100+", label: "Báo cáo tự động hóa đa kênh / ngày" },
    { value: "24/7", label: "Hệ thống AI × ERP vận hành ổn định" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-[94vh] pt-32 sm:pt-36 pb-20 flex flex-col justify-center bg-[#000000] overflow-hidden"
    >
      {/* Ambient Fluid Aurora Meshes (Morphing slowly behind the liquid glass) */}
      <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full bg-[#8052ff]/12 blur-[130px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] rounded-full bg-[#00e5ff]/10 blur-[120px] pointer-events-none fluid-blob-cyan" />
      <div className="absolute top-1/2 right-1/3 w-[320px] h-[320px] rounded-full bg-[#ffb829]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center mb-16 lg:mb-20">
          {/* Left Column: Monolithic Minimalist Type (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col text-left z-10"
          >
            {/* Liquid Glass Eyebrow Badge (12px, weight 500, tracking 0.12em) */}
            <div className="chip-liquid mb-4 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829] shadow-[0_0_8px_#ffb829] animate-pulse" />
              <span className="text-[12px] font-medium tracking-[0.12em]">
                {hero.eyebrow || "APPLIED AI · AUTOMATION · ERP OS"}
              </span>
            </div>

            {/* Candidate Identity */}
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#bbc7c6] mb-3">
              {hero.name}
            </span>

            {/* Hero Headline: 61–86px, weight 500, line-height 1.0, tracking -0.04em */}
            <h1 className="heading-display text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.04em] leading-[1.0] text-white mb-6">
              Biến AI thành{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-white">
                hệ thống vận hành
              </span>{" "}
              thực tế.
            </h1>

            {/* Subtext: 16px, weight 400, line-height 1.4, silver mist text */}
            <p className="text-body-auros text-base sm:text-lg leading-[1.4] max-w-xl mb-8">
              {hero.intro}
            </p>

            {/* Action Buttons: 6px border-radius with Liquid Sheen */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="btn-primary-liquid group"
              >
                <span>{hero.primary || "Xem 08 case study"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#systems"
                className="btn-secondary-liquid"
              >
                <span>{hero.secondary || "Mô hình AI × ERP"}</span>
              </a>

              <a
                href={hero.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-liquid text-[#ffb829] border-[#ffb829]/30 hover:border-[#ffb829] hover:bg-[#ffb829]/10"
              >
                <FileText className="w-4 h-4" />
                <span>{hero.cv}</span>
              </a>
            </div>

            {/* Liquid Glass Status Strip (6px radius) */}
            <div className="flex flex-wrap items-center gap-4 px-3.5 py-2 chip-liquid w-fit text-[11px] font-mono text-[#bbc7c6]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-[#00ffaa] shadow-[0_0_8px_#00ffaa]" />
                <span className="text-white">{hero.status}</span>
              </div>
              <div className="text-white/20">|</div>
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Bioluminescent Data Sphere (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center liquid-glass-card"
          >
            {/* Bioluminescent Data Sphere Canvas */}
            <AiNeuralCore className="w-full h-full" />
          </motion.div>
        </div>

        {/* 4-Column Statistic Counter Block in Liquid Glass */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/[0.08]">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass-card p-6 flex flex-col justify-between group hover:border-[#8052ff]/40"
            >
              <span className="stat-number-auros text-4xl sm:text-5xl lg:text-[54px] mb-2 group-hover:text-white transition-colors">
                {s.value}
              </span>
              <span className="stat-label-auros">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
