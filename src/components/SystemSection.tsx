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
} from "lucide-react";

const TOOL_ICONS: Record<string, string> = {
  Python: "/img/tool-icons/python.svg",
  PyTorch: "/img/tool-icons/pytorch.svg",
  OpenCV: "/img/tool-icons/opencv.svg",
  Jupyter: "/img/tool-icons/jupyter.svg",
  ChatGPT: "/img/tool-icons/openai.svg",
  Claude: "/img/tool-icons/anthropic.svg",
  Gemini: "/img/tool-icons/googlegemini.svg",
  NotebookLM: "/img/tool-icons/notebooklm.svg",
  n8n: "/img/tool-icons/n8n.svg",
  "Google Apps Script": "/img/tool-icons/googleappsscript.svg",
  Supabase: "/img/tool-icons/supabase.svg",
  ERP: "/img/tool-icons/erp.svg",
};

const STAGE_ICONS = [Database, BrainCircuit, Workflow, TrendingUp];

export function SystemSection() {
  const { content } = useLanguage();
  const { system } = content;

  return (
    <section id="systems" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background subtle fluid glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#8052ff]/8 blur-[140px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-[#00e5ff]/6 blur-[130px] pointer-events-none fluid-blob-cyan" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block (Two-column asymmetrical rhythm) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 liquid-glass-tag">
              <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829]">
                {system.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-display text-white tracking-[-0.04em] leading-[1.08]">
              {system.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-body-light leading-relaxed">
              {system.intro}
            </p>
          </div>
        </div>

        {/* 4 Pipeline Stages (Liquid Glass Cards with Frosted Blur) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="liquid-glass-card flex flex-col justify-between p-7 sm:p-8 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#8052ff] tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {stage.number} //
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#9a9a9a] group-hover:text-[#8052ff] group-hover:border-[#8052ff]/40 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-wider block mb-2 font-medium">
                    {stage.label}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-display text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-body-light leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-[#a0a0aa] liquid-glass-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Impact Numbers (Liquid Glass Banner) */}
        {(system as any).metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 p-8 sm:p-10 liquid-glass-card">
            {(system as any).metrics.map((metric: any) => (
              <div key={metric.label} className="flex flex-col gap-2">
                <span className="text-4xl sm:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#c0c0c0] tracking-[-0.04em]">
                  {metric.value}
                </span>
                <span className="text-sm font-sans text-body-light">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tool Ecosystem (Liquid Glass Panels) */}
        {system.tools && (
          <div className="py-6">
            <div className="mb-10">
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-widest block mb-2 font-medium">
                {system.tools.eyebrow}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display text-white mb-2">
                {system.tools.title}
              </h3>
              <p className="text-sm sm:text-base text-body-light max-w-2xl">
                {system.tools.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {((system.tools as any).groups || []).map((group: any) => (
                <div
                  key={group.index}
                  className="p-7 liquid-glass-card"
                >
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                    <span className="text-base font-display text-white">
                      {group.title}
                    </span>
                    <span className="text-[11px] font-mono text-[#8052ff] px-2 py-0.5 rounded-full bg-[#8052ff]/10 border border-[#8052ff]/30">
                      {group.index}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {group.items.map((toolName: string) => {
                      const iconSrc = TOOL_ICONS[toolName];
                      return (
                        <div
                          key={toolName}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl liquid-glass-tag hover:border-white/30 transition-colors"
                        >
                          {iconSrc && (
                            <Image
                              src={iconSrc}
                              alt={toolName}
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain opacity-85"
                            />
                          )}
                          <span className="text-xs font-sans text-white/90 truncate">
                            {toolName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
