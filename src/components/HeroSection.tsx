"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NeuralNetworkCanvas } from "./NeuralNetworkCanvas";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ArrowRight, FileText, Cpu, Database, Workflow, Target, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const { content } = useLanguage();
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden border-b border-cyber-border"
    >
      {/* Living Neural Synapse Canvas Background */}
      <NeuralNetworkCanvas />

      {/* Cyber Grid Background Ambient */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5 text-left"
          >
            {/* Status Telemetry */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="default" className="text-[11px] font-mono px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
                <span>{hero.eyebrow}</span>
              </Badge>
              <div className="flex items-center gap-1.5 border border-cyber-border bg-cyber-card/70 px-2.5 py-1 text-[11px] font-mono text-cyber-muted-fg">
                <ShieldCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>{hero.status}</span>
              </div>
            </div>

            {/* Candidate Name with Glitch / Glow Effect */}
            <div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
                <span className="text-white hover:text-cyber-accent transition-colors">
                  {hero.name}
                </span>
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-heading font-medium text-cyber-accent text-glow">
                {hero.title}
              </p>
            </div>

            {/* Intro text */}
            <p className="font-mono text-sm sm:text-base text-cyber-fg/90 leading-relaxed max-w-2xl bg-cyber-card/40 backdrop-blur-sm p-4 border-l-2 border-cyber-accent">
              {hero.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="gap-2">
                <a href="#projects">
                  <span>{hero.primary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg">
                <a href="#systems">{hero.secondary}</a>
              </Button>

              <Button asChild variant="secondary" size="lg" className="gap-2">
                <a href={hero.cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 text-cyber-accent" />
                  <span>{hero.cv}</span>
                </a>
              </Button>
            </div>

            {/* Footnote */}
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-cyber-muted-fg">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-accent" />
              <span>{hero.footnote}</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive System Map HUD Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="border border-cyber-border-bright bg-[#111119]/90 backdrop-blur-md p-5 sm:p-6 shadow-[0_0_30px_rgba(0,0,0,0.7)] cyber-chamfer relative group hover:border-cyber-accent/80 transition-all duration-300">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-accent/60 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-accent/60 pointer-events-none" />

              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-cyber-border/70 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyber-accent" />
                  <span className="text-xs font-mono font-bold tracking-widest text-cyber-accent">
                    {hero.profileLabel} // {hero.profileDirection}
                  </span>
                </div>
                <span className="text-[10px] font-mono border border-cyber-accent/30 bg-cyber-accent/10 px-2 py-0.5 text-cyber-accent">
                  ACTIVE
                </span>
              </div>

              {/* Title */}
              <div className="mb-4">
                <span className="text-xs font-mono text-cyber-muted-fg tracking-wider">
                  ARCHITECTURE SCHEMATIC
                </span>
                <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                  {hero.profileTitle}
                </h3>
              </div>

              {/* Flow Steps / Route */}
              <div className="mb-5 bg-[#0a0a0f] p-3 border border-cyber-border/60 cyber-chamfer-sm">
                <div className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-widest mb-2">
                  {hero.profileRouteLabel}
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  {hero.profileRoute.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="font-semibold text-white px-2 py-1 bg-cyber-card border border-cyber-border/80 text-[11px]">
                        {step}
                      </span>
                      {idx < hero.profileRoute.length - 1 && (
                        <span className="text-cyber-accent font-bold text-xs">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 4 Core Domains */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {hero.profileAreas.map((area, idx) => {
                  const icons = [Database, Cpu, Workflow, Target];
                  const IconComp = icons[idx % icons.length];
                  return (
                    <div
                      key={area.title}
                      className="border border-cyber-border/60 bg-cyber-card/70 p-3 hover:border-cyber-accent/60 transition-colors cyber-chamfer-sm"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComp className="w-3.5 h-3.5 text-cyber-cyan" />
                        <span className="font-heading font-bold text-xs text-white tracking-wider">
                          {area.title}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-cyber-muted-fg line-clamp-2">
                        {area.meta}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* System Metrics Strip */}
              <div className="border-t border-cyber-border/70 pt-3 flex flex-wrap gap-2 text-[10px] font-mono text-cyber-muted-fg">
                {hero.profileMetrics.map((metric) => (
                  <span
                    key={metric}
                    className="border border-cyber-border bg-[#0a0a0f] px-2 py-1"
                  >
                    ✓ {metric}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
