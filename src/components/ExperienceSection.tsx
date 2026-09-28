"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RecommendationModal } from "./RecommendationModal";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  const { content } = useLanguage();
  const { experience } = content;
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background fluid glow */}
      <div className="absolute top-1/2 left-1/4 w-[480px] h-[480px] rounded-full bg-[#15846e]/8 blur-[140px] pointer-events-none fluid-blob-cyan" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 liquid-glass-tag">
              <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829]">
                {experience.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-display text-white tracking-[-0.04em] leading-[1.08]">
              {experience.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-body-light leading-relaxed">
              {experience.intro}
            </p>
          </div>
        </div>

        {/* Experience List (Liquid Glass Floating Cards) */}
        <div className="flex flex-col gap-8">
          {experience.items.map((item, idx) => {
            const isBongTra = item.company.toLowerCase().includes("bông trà");

            return (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="liquid-glass-card p-8 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left Column: Period & Company */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider px-3 py-1 rounded-full liquid-glass-tag w-fit font-medium">
                      {(item as any).date || item.period}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display text-white mt-1">
                      {item.company}
                    </h3>
                    <span className="text-sm font-sans text-[#8052ff] font-medium">
                      {item.role}
                    </span>
                  </div>

                  {/* Right Column: Highlights & Verification */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <ul className="flex flex-col gap-3 font-sans text-sm sm:text-base text-body-light leading-relaxed">
                      {(item.highlights || []).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#8052ff] mt-2.5 shrink-0 shadow-[0_0_8px_#8052ff]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Recommendation Letter Button */}
                    {isBongTra && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setRecommendationModalOpen(true)}
                          className="btn-liquid-secondary text-xs uppercase tracking-wider"
                        >
                          <span>Thư giới thiệu có mộc đỏ xác nhận</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <RecommendationModal
        open={recommendationModalOpen}
        onOpenChange={setRecommendationModalOpen}
      />
    </section>
  );
}
