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
    <section id="systems" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block (Two-column asymmetrical rhythm) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow-auros mb-3 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span>{system.eyebrow}</span>
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

        {/* 4 Pipeline Stages (Auros Surface Cards: 16px radius, 36px padding, no drop shadows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="surface-card p-8 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Kicker + 32x32 6px Arrow Icon Button */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-[0.12em]">
                      {stage.number} // {stage.label}
                    </span>
                    <div className="btn-arrow-icon">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="heading-sub text-xl sm:text-2xl text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-body-auros text-sm leading-[1.4] mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* 6px Radius Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="chip-auros">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Tool Ecosystem (Auros Surface Card) */}
        {system.tools && (
          <div className="surface-card p-8 sm:p-12">
            <div className="mb-8">
              <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.15em] block mb-2">
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
                            className="chip-auros flex items-center gap-1.5"
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
          </div>
        )}
      </div>
    </section>
  );
}
