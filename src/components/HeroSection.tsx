"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AiNeuralCore } from "./AiNeuralCore";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown, FileText, Database, BrainCircuit, Workflow, TrendingUp } from "lucide-react";

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

  const profileIcons = [Database, BrainCircuit, Workflow, TrendingUp];

  return (
    <section
      id="top"
      className="relative min-h-[96vh] pt-32 sm:pt-36 pb-16 flex flex-col justify-center bg-[#000000] overflow-hidden"
    >
      {/* Ambient Fluid Aurora Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[540px] h-[540px] rounded-full bg-[#8052ff]/12 blur-[130px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[#00e5ff]/10 blur-[120px] pointer-events-none fluid-blob-cyan" />
      <div className="absolute top-1/2 right-1/3 w-[340px] h-[340px] rounded-full bg-[#ffb829]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start mb-16">
          {/* Left Column: Monolithic Minimalist Type & Core Identity (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col text-left z-10"
          >
            {/* Eyebrow & Live Availability Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="chip-liquid flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829] shadow-[0_0_8px_#ffb829] animate-pulse" />
                <span className="text-[12px] font-medium tracking-[0.12em]">
                  {hero.eyebrow || "SYSTEM PROFILE / 2026"}
                </span>
              </div>

              <div className="chip-liquid flex items-center gap-2 text-[#00ffaa]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_8px_#00ffaa]" />
                <span className="text-[11px] font-mono text-white/90">
                  {hero.status || "Sẵn sàng cho cơ hội AI · ERP · R&D"}
                </span>
              </div>
            </div>

            {/* High-tech Telemetry Bracket Tag */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#bbc7c6]/70 uppercase tracking-[0.18em] mb-2">
              <span className="text-[#8052ff]">[</span>
              <span>SYS_ID // 2026.GK_KERNEL</span>
              <span className="text-[#8052ff]">]</span>
              <span className="w-1 h-1 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff] animate-ping" />
            </div>

            {/* Candidate Identity */}
            <h2 className="text-2xl sm:text-3xl font-mono uppercase tracking-[0.18em] text-white font-medium mb-3">
              {hero.name}
            </h2>

            {/* Monumental Headline */}
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-[64px] tracking-[-0.04em] leading-[1.0] text-white mb-6">
              Biến AI thành{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-white">
                hệ thống vận hành
              </span>{" "}
              thực tế.
            </h1>

            {/* Value Proposition Subtext */}
            <p className="text-body-auros text-base sm:text-lg leading-[1.4] max-w-xl mb-8">
              {hero.intro}
            </p>

            {/* Action Buttons: Liquid Sheen */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
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

            {/* Hero Pipeline Flow Strip (DATA -> INTELLIGENCE -> WORKFLOW -> IMPACT) */}
            <div className="flex items-center gap-2 sm:gap-3 p-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md w-fit mb-6 text-[11px] font-mono text-[#bbc7c6]">
              <span className="text-white font-medium">DATA</span>
              <span className="text-[#8052ff]">→</span>
              <span className="text-white font-medium">INTELLIGENCE</span>
              <span className="text-[#8052ff]">→</span>
              <span className="text-white font-medium">WORKFLOW</span>
              <span className="text-[#8052ff]">→</span>
              <span className="text-[#ffb829] font-medium">IMPACT</span>
            </div>

            {/* Hero Footer Meta */}
            <div className="flex items-center justify-between text-xs font-mono text-[#bbc7c6]/70 max-w-xl pt-2">
              <span>{hero.footnote || "TP. Hồ Chí Minh · Sẵn sàng trao đổi"}</span>
              <a href="#systems" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>Scroll ↓</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D AI Neural Core & Profile Blueprint (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* 3D Bioluminescent Sphere Canvas Box */}
            <div className="relative w-full h-[380px] sm:h-[420px] rounded-[16px] liquid-glass-card overflow-hidden flex items-center justify-center">
              <AiNeuralCore className="w-full h-full" />
            </div>

            {/* Operating System Blueprint Panel (matching GitHub master components) */}
            <div className="liquid-glass-card p-6 sm:p-7">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider font-medium">
                    {hero.profileLabel || "SYSTEM MAP"} // 2026 / HCMC
                  </span>
                </div>
                <span className="chip-liquid !py-1 !px-2.5 !text-[10px] !text-[#00e5ff]">
                  {hero.profileDirection || "AI × ERP"}
                </span>
              </div>

              {/* 4 Profile Core Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {(hero.profileAreas || []).map((area, i) => {
                  const Icon = profileIcons[i % profileIcons.length];
                  return (
                    <div
                      key={area.title}
                      className="p-3.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 hover:border-white/20 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-[4px] bg-[#8052ff]/15 border border-[#8052ff]/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#00e5ff]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-white block truncate">
                          0{i + 1} {area.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#bbc7c6] block truncate">
                          {area.meta}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom 3 Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] text-center">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-medium text-white">03</span>
                  <span className="text-[10px] font-mono text-[#bbc7c6] uppercase">Năm kinh nghiệm</span>
                </div>
                <div className="flex flex-col border-x border-white/[0.08]">
                  <span className="text-xl sm:text-2xl font-medium text-[#ffb829]">08</span>
                  <span className="text-[10px] font-mono text-[#bbc7c6] uppercase">Dự án tiêu biểu</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-medium text-[#00e5ff]">80%</span>
                  <span className="text-[10px] font-mono text-[#bbc7c6] uppercase">Tác động vận hành</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Synaptic Neural Conduit Bridge (connecting Hero to Systems) */}
        <div className="py-6 flex items-center justify-center">
          <a
            href="#systems"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-[8px] liquid-glass-card hover:border-[#8052ff]/60 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#bbc7c6] group-hover:text-white transition-colors">
              <span className="text-[#8052ff] font-medium">AI NEURAL CORE</span> // SYNAPTIC UPLINK → <span className="text-[#ffb829] font-medium">OPERATING SYSTEM</span>
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#ffb829] group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4-Column Statistic Counter Block */}
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
