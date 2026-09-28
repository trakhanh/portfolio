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
  CheckCircle2,
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
    <section id="systems" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Section Headline Block (Two-column asymmetrical rhythm from DESIGN.md) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-start">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829] block mb-3">
              {system.eyebrow}
            </span>
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

        {/* 4 Pipeline Stages (Spacious, borderless, floating on black velvet) */}
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
                className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#08080c] border border-white/5 hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#8052ff] tracking-wider">
                      {stage.number} //
                    </span>
                    <Icon className="w-5 h-5 text-[#9a9a9a] group-hover:text-[#8052ff] transition-colors" />
                  </div>

                  <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-wider block mb-2">
                    {stage.label}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-display text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-body-light leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-[#9a9a9a] bg-white/[0.03] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Impact Numbers */}
        {(system as any).metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 py-12 border-y border-white/10">
            {(system as any).metrics.map((metric: any) => (
              <div key={metric.label} className="flex flex-col gap-2">
                <span className="text-4xl sm:text-6xl font-display text-white tracking-[-0.04em]">
                  {metric.value}
                </span>
                <span className="text-sm font-sans text-body-light">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tool Ecosystem */}
        {system.tools && (
          <div className="py-6">
            <div className="mb-10">
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-widest block mb-2">
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
                  className="p-6 rounded-3xl bg-[#08080c] border border-white/5"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <span className="text-base font-display text-white">
                      {group.title}
                    </span>
                    <span className="text-[11px] font-mono text-[#8052ff]">
                      {group.index}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {group.items.map((toolName: string) => {
                      const iconSrc = TOOL_ICONS[toolName];
                      return (
                        <div
                          key={toolName}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors"
                        >
                          {iconSrc && (
                            <Image
                              src={iconSrc}
                              alt={toolName}
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain opacity-80"
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
