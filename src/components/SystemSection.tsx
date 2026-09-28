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
  Layers,
  ArrowRight,
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
    <section
      id="systems"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Headline Block (Two-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {system.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {system.title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {system.intro}
            </p>
          </div>
        </div>

        {/* 4 Pipeline Stages (Spacious Dala Cards with 24px Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/[0.02] border border-white/10 hover:border-white/20 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest">
                      0{idx + 1} // STAGE
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-normal tracking-tight text-white mb-3">
                    {stage.title}
                  </h3>

                  <p className="text-sm font-extralight text-[#9a9a9a] leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-light text-[#bdbdbd] bg-white/[0.03] rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Metrics Bar */}
        {(system as any).metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 py-8 border-y border-white/10">
            {(system as any).metrics.map((metric: any) => (
              <div key={metric.label} className="flex flex-col gap-2">
                <span className="text-5xl sm:text-6xl font-normal tracking-tighter text-white">
                  {metric.value}
                </span>
                <span className="text-sm font-extralight text-[#9a9a9a] max-w-[240px]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tool Ecosystem */}
        {system.tools && (
          <div className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-5">
                <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-3">
                  {system.tools.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
                  {system.tools.title}
                </h3>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-sm sm:text-base font-extralight text-[#9a9a9a]">
                  {system.tools.intro}
                </p>
              </div>
            </div>

            {/* Groups */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {((system.tools as any).groups || []).map((group: any) => (
                <div
                  key={group.index}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                    <span className="text-base font-normal text-white">
                      {group.title}
                    </span>
                    <span className="text-xs text-[#8052ff] uppercase tracking-wider">
                      {group.index}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {group.items.map((toolName: string) => {
                      const iconSrc = TOOL_ICONS[toolName];
                      return (
                        <div
                          key={toolName}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                        >
                          {iconSrc ? (
                            <Image
                              src={iconSrc}
                              alt={toolName}
                              width={18}
                              height={18}
                              className="w-4 h-4 object-contain opacity-80"
                            />
                          ) : (
                            <Layers className="w-4 h-4 text-[#8052ff]" />
                          )}
                          <span className="text-xs font-light text-[#bdbdbd] truncate">
                            {toolName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Proof Note */}
            {(system as any).proofNote && (
              <p className="mt-8 text-xs sm:text-sm font-extralight text-[#9a9a9a] italic max-w-2xl">
                ✦ {(system as any).proofNote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
