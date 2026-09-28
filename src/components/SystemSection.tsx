"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import {
  Layers,
  Database,
  BrainCircuit,
  Workflow,
  TrendingUp,
  Activity,
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
    <section
      id="systems"
      className="py-20 border-b border-cyber-border bg-[#0a0a0f] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left">
          <div className="flex items-center gap-3">
            <Badge variant="cyan" className="font-mono text-xs">
              <Activity className="w-3.5 h-3.5 mr-1" />
              {system.eyebrow}
            </Badge>
            <span className="text-xs font-mono text-cyber-accent">
              {system.status}
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide uppercase">
            {system.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-cyber-fg/80 max-w-3xl leading-relaxed">
            {system.intro}
          </p>
        </div>

        {/* 4 Pipeline Stages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {system.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border border-cyber-border bg-cyber-card/90 p-5 flex flex-col justify-between hover:border-cyber-accent transition-all duration-300 cyber-chamfer relative group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-cyber-border/60 pb-3 mb-3">
                    <span className="font-mono text-xs font-bold text-cyber-accent">
                      STAGE {stage.number}
                    </span>
                    <Icon className="w-4 h-4 text-cyber-cyan group-hover:text-cyber-accent transition-colors" />
                  </div>

                  <span className="text-[10px] font-mono text-cyber-muted-fg block uppercase tracking-wider mb-1">
                    {stage.label}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    {stage.title}
                  </h3>

                  <p className="font-mono text-xs text-cyber-fg/80 leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-border/60">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono bg-cyber-muted text-cyber-muted-fg border border-cyber-border/60"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {(system as any).metrics.map((metric: any) => (
              <div
                key={metric.label}
                className="border border-cyber-border bg-[#101018] p-5 flex items-center gap-4 cyber-chamfer-sm"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl text-cyber-accent tracking-tighter">
                  {metric.value}
                </div>
                <div className="font-mono text-xs text-cyber-fg/90 leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tool Ecosystem */}
        {system.tools && (
          <div className="border border-cyber-border bg-[#111119] p-6 sm:p-8 cyber-chamfer">
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-mono text-cyber-accent tracking-widest uppercase">
                {system.tools.eyebrow}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                {system.tools.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cyber-muted-fg max-w-3xl">
                {system.tools.intro}
              </p>
            </div>

            {/* Tool Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {((system.tools as any).groups || []).map((group: any) => (
                <div
                  key={group.index}
                  className="border border-cyber-border/70 bg-[#0c0c14] p-4 cyber-chamfer-sm"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-cyber-border/60 pb-2">
                    <span className="font-heading font-bold text-sm text-white">
                      {group.title}
                    </span>
                    <span className="font-mono text-[10px] text-cyber-cyan border border-cyber-cyan/30 px-1.5 py-0.5">
                      {group.index}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {group.items.map((toolName: string) => {
                      const iconSrc = TOOL_ICONS[toolName];
                      return (
                        <div
                          key={toolName}
                          className="flex items-center gap-2 p-2 border border-cyber-border/60 bg-cyber-card hover:border-cyber-accent/60 transition-colors"
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
                            <Layers className="w-4 h-4 text-cyber-accent" />
                          )}
                          <span className="font-mono text-xs text-cyber-fg/90 truncate">
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
              <div className="mt-6 flex items-start gap-2.5 bg-cyber-accent/5 border-l-2 border-cyber-accent p-3 text-xs font-mono text-cyber-fg/80">
                <CheckCircle2 className="w-4 h-4 text-cyber-accent shrink-0 mt-0.5" />
                <span>{(system as any).proofNote}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
