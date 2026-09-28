"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import {
  Database,
  BrainCircuit,
  Workflow,
  TrendingUp,
  ArrowRight,
  Layers,
} from "lucide-react";

const STAGE_ICONS = [Database, BrainCircuit, Workflow, TrendingUp];

export function SystemSection() {
  const { content } = useLanguage();
  const { system } = content;

  return (
    <section id="systems" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Ambient Fluid Aurora Blobs for Liquid Glass Refraction */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full bg-[#8052ff]/12 blur-[140px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#00e5ff]/10 blur-[130px] pointer-events-none fluid-blob-cyan" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-[#ffb829]/6 blur-[110px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block with Balanced Typography (No awkward word-splitting) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            {/* Eyebrow Pill */}
            <div className="chip-liquid mb-4 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-2 h-2 rounded-[2px] bg-[#ffb829] shadow-[0_0_8px_#ffb829] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.14em] font-medium">
                {system.eyebrow || "01 · AI × ERP OPERATING MODEL"}
              </span>
            </div>

            {/* Balanced Headline - Eliminates orphan "hành." */}
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-[52px] xl:text-[56px] text-white tracking-[-0.035em] leading-[1.12] [text-wrap:balance]">
              Từ dữ liệu đến{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-white">
                tác động vận hành.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 pt-3">
            <p className="text-body-auros text-base sm:text-lg leading-[1.55] text-[#bbc7c6]">
              {system.intro}
            </p>
          </div>
        </div>

        {/* Pipeline Connectivity Stream (Flow indicator 01 -> 02 -> 03 -> 04) */}
        <div className="hidden lg:flex items-center justify-between mb-6 px-6 py-3 rounded-[10px] bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00ffaa]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_6px_#00ffaa] animate-pulse" />
            <span>AI × ERP PIPELINE PIPESTREAM // ONLINE</span>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono text-[#bbc7c6]/70">
            <span className="text-white font-medium">01 DATA</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8052ff]" />
            <span className="text-white font-medium">02 INTELLIGENCE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="text-white font-medium">03 WORKFLOW</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8052ff]" />
            <span className="text-[#ffb829] font-medium">04 IMPACT</span>
          </div>
        </div>

        {/* 4 Pipeline Stages (High-End Liquid Glass Cards: Glistening Specular Top Edges, No Cramped Text) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="liquid-glass-card p-7 sm:p-8 flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Card Header Row: Prominent Number + Glowing Icon Button */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8052ff] to-[#00e5ff]">
                        {stage.number}
                      </span>
                      <span className="text-white/20 font-mono text-xs">//</span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#00ffaa]">
                        STAGE
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-[8px] bg-white/[0.06] border border-white/20 flex items-center justify-center text-white group-hover:border-[#8052ff] group-hover:shadow-[0_0_15px_rgba(128,82,255,0.5)] transition-all">
                      <Icon className="w-4 h-4 text-[#00e5ff]" />
                    </div>
                  </div>

                  {/* Stage Subtitle / Label: Full Width, No Clumsy Wrapping */}
                  <p className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.14em] font-medium mb-3 leading-snug">
                    {stage.label}
                  </p>

                  {/* Stage Title */}
                  <h3 className="heading-sub text-2xl text-white mb-3 group-hover:text-[#8052ff] transition-colors font-medium">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-auros text-sm sm:text-[14.5px] leading-[1.55] text-[#bbc7c6] mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Bottom Tags: High Contrast, Crisp Liquid Glass Chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-[6px] bg-white/[0.06] border border-white/15 text-white/90 group-hover:border-white/25 hover:!border-[#8052ff] hover:!text-[#00e5ff] hover:bg-white/10 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Tool Ecosystem (Liquid Glass Panel) */}
        {system.tools && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass-card p-8 sm:p-12"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-[#ffb829]" />
                <span className="text-xs font-mono text-[#ffb829] uppercase tracking-[0.15em] font-medium">
                  {system.tools.eyebrow}
                </span>
              </div>
              <h3 className="heading-sub text-2xl sm:text-3xl text-white mb-2">
                {system.tools.title}
              </h3>
              <p className="text-body-auros text-sm sm:text-base max-w-2xl">
                {system.tools.intro}
              </p>
            </div>

            {(() => {
              const toolGroups = system.tools.groups || (system.tools.categories ? system.tools.categories.map((c, i) => ({ index: `T${i+1}`, title: c.name, items: c.items })) : []);
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
                  {toolGroups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-3">
                      <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider font-medium">
                        {group.index} // {group.title}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1.5 text-xs font-mono font-medium rounded-[6px] bg-white/[0.05] border border-white/15 text-white/90 hover:border-[#8052ff] hover:text-[#00e5ff] hover:bg-white/10 transition-all flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#ffb829] shadow-[0_0_4px_#ffb829]" />
                            <span>{tool}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
}
