"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AiNeuralCore } from "./AiNeuralCore";
import { motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  // Auros Signature Statistics
  const stats = [
    { value: "99.2%", label: "Độ chính xác kiểm tra thị giác AI" },
    { value: "70%", label: "Tiết kiệm thời gian xử lý vận hành" },
    { value: "100+", label: "Báo cáo tự động hóa đa kênh / ngày" },
    { value: "24/7", label: "Hệ thống AI × ERP vận hành ổn định" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-20 flex flex-col justify-center bg-[#000000] overflow-hidden"
    >
      {/* Subtle Bioluminescent Background Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8052ff]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#00e5ff]/6 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center mb-16 lg:mb-24">
          {/* Left Column: Monolithic Minimalist Type (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col text-left z-10"
          >
            {/* Uppercase Section Label / Eyebrow (12px, weight 500, tracking 0.12em) */}
            <div className="eyebrow-auros mb-4 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829] shadow-[0_0_8px_#ffb829]" />
              <span>{hero.eyebrow || "APPLIED AI · AUTOMATION · ERP OS"}</span>
            </div>

            {/* Candidate Identity */}
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#bbc7c6] mb-3">
              {hero.name}
            </span>

            {/* Hero Headline: 61–86px, weight 500, line-height 1.0, tracking -0.04em */}
            <h1 className="heading-display text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.04em] leading-[1.0] text-white mb-6">
              Biến AI thành{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] via-[#a855f7] to-[#00e5ff]">
                hệ thống vận hành
              </span>{" "}
              thực tế.
            </h1>

            {/* Subtext: 16px, weight 400, line-height 1.4, silver mist text */}
            <p className="text-body-auros text-base sm:text-lg leading-[1.4] max-w-xl mb-8">
              {hero.intro}
            </p>

            {/* Action Buttons: 6px border-radius */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="btn-primary-auros"
              >
                <span>{hero.primary || "Xem 08 case study"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#systems"
                className="btn-secondary-auros"
              >
                <span>{hero.secondary || "Mô hình AI × ERP"}</span>
              </a>

              <a
                href={hero.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-auros text-[#ffb829] border-[#ffb829]/30 hover:border-[#ffb829] hover:bg-[#ffb829]/10"
              >
                <FileText className="w-4 h-4" />
                <span>{hero.cv}</span>
              </a>
            </div>

            {/* Status Strip: 6px radius, terminal style */}
            <div className="flex flex-wrap items-center gap-4 px-3.5 py-2 rounded-[6px] bg-[#0f0f18] border border-white/10 w-fit text-[11px] font-mono text-[#bbc7c6]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-[#00ffaa] shadow-[0_0_6px_#00ffaa]" />
                <span className="text-white">{hero.status}</span>
              </div>
              <div className="text-white/20">|</div>
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Bioluminescent Particle Sphere Visual (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center rounded-[16px] bg-[#0f0f18]/40 border border-white/[0.06]"
          >
            {/* Bioluminescent Data Sphere Canvas */}
            <AiNeuralCore className="w-full h-full" />
          </motion.div>
        </div>

        {/* Auros Signature Statistics Counter Block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-white/[0.08]">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col gap-2"
            >
              <span className="stat-number-auros text-4xl sm:text-5xl lg:text-[61px]">
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
