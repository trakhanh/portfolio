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
  ArrowUpRight,
} from "lucide-react";

const STAGE_ICONS = [Database, BrainCircuit, Workflow, TrendingUp];

export function SystemSection() {
  const { content } = useLanguage();
  const { system } = content;

  return (
    <section id="systems" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Ambient Aurora Blob */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#8052ff]/8 blur-[140px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-[#00e5ff]/6 blur-[130px] pointer-events-none fluid-blob-cyan" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block (Two-column asymmetrical rhythm) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="chip-liquid mb-3 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span className="text-[12px] font-medium tracking-[0.12em]">{system.eyebrow}</span>
            </div>
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0]">
              {system.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-body-auros text-base sm:text-lg leading-[1.4]">
              {system.intro}
            </p>
          </div>
        </div>

        {/* 4 Pipeline Stages (Liquid Glass Cards: 16px radius, frosted blur, specular top highlight) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-8 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Kicker + Liquid Arrow Icon Button */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-[0.12em] px-2.5 py-1 rounded-[6px] bg-white/[0.04] border border-white/10">
                      {stage.number} // {stage.label}
                    </span>
                    <div className="btn-arrow-liquid">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="heading-sub text-xl sm:text-2xl text-white mb-3 group-hover:text-[#8052ff] transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-body-auros text-sm leading-[1.4] mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* 6px Radius Liquid Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="chip-liquid">
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
              <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.15em] block mb-2 font-medium">
                {system.tools.eyebrow}
              </span>
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
                      <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider font-medium">
                        {group.index} // {group.title}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((tool) => (
                          <span
                            key={tool}
                            className="chip-liquid flex items-center gap-1.5 hover:border-[#8052ff]/40 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#ffb829]" />
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
