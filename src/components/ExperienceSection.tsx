"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { RecommendationModal } from "./RecommendationModal";
import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle, FileBadge, ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  const { content } = useLanguage();
  const { experience } = content;
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);

  return (
    <section
      id="experience"
      className="py-20 border-b border-cyber-border bg-[#07080d] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left">
          <Badge variant="default" className="w-fit font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            {experience.eyebrow}
          </Badge>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide uppercase">
            {experience.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-cyber-fg/80 max-w-3xl leading-relaxed">
            {experience.intro}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-cyber-border ml-3 sm:ml-6 pl-6 sm:pl-8 flex flex-col gap-10">
          {experience.items.map((item, idx) => {
            const isBongTra = item.company.toLowerCase().includes("bông trà");

            return (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-cyber-bg border-2 border-cyber-accent group-hover:scale-125 group-hover:bg-cyber-accent transition-all duration-200" />

                {/* Card Container */}
                <div className="border border-cyber-border bg-cyber-card/90 p-5 sm:p-6 hover:border-cyber-accent/70 transition-all cyber-chamfer">
                  {/* Top Bar: Company & Period */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-border/70 pb-3 mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs text-cyber-accent">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted-fg bg-[#0a0a0f] border border-cyber-border px-2.5 py-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{(item as any).date || item.period}</span>
                    </div>
                  </div>

                  {/* Highlights / Responsibilities */}
                  <ul className="flex flex-col gap-2 mb-4 font-mono text-xs sm:text-sm text-cyber-fg/90">
                    {(item.highlights || []).map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-cyber-accent font-bold mt-0.5">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Verified Note & Recommendation Button */}
                  {(item.verifiedNote || isBongTra) && (
                    <div className="mt-4 pt-3 border-t border-cyber-border/60 flex flex-wrap items-center justify-between gap-3">
                      {item.verifiedNote && (
                        <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent">
                          <CheckCircle className="w-4 h-4" />
                          <span>{item.verifiedNote}</span>
                        </div>
                      )}

                      {isBongTra && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setRecommendationModalOpen(true)}
                          className="gap-1.5"
                        >
                          <FileBadge className="w-4 h-4 text-cyber-accent" />
                          <span>Thư giới thiệu có mộc đỏ ↗</span>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {(item as any).tags && (item as any).tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-cyber-border/40">
                      {((item as any).tags as string[]).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-mono bg-cyber-muted text-cyber-muted-fg border border-cyber-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recommendation Letter Modal */}
      <RecommendationModal
        open={recommendationModalOpen}
        onOpenChange={setRecommendationModalOpen}
      />
    </section>
  );
}
