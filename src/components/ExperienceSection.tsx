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
      {/* Background Ambient Aurora Blob */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#15846e]/8 blur-[140px] pointer-events-none fluid-blob-cyan" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="chip-liquid mb-3 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span className="text-[12px] font-medium tracking-[0.12em]">{experience.eyebrow}</span>
            </div>
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0]">
              {experience.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-body-auros text-base sm:text-lg leading-[1.4]">
              {experience.intro}
            </p>
          </div>
        </div>

        {/* Experience List (Liquid Glass Cards: 16px radius, frosted blur) */}
        <div className="flex flex-col gap-6">
          {experience.items.map((item, idx) => {
            const isBongTra = item.company.toLowerCase().includes("bông trà");

            return (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-8 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left Column: Period & Company */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <span className="chip-liquid !text-[#ffb829] w-fit font-medium">
                      {(item as any).date || item.period}
                    </span>
                    <h3 className="heading-sub text-2xl sm:text-3xl text-white mt-1">
                      {item.company}
                    </h3>
                    <span className="text-sm font-medium text-[#8052ff] uppercase tracking-wider">
                      {item.role}
                    </span>
                  </div>

                  {/* Right Column: Highlights & Verification */}
                  <div className="lg:col-span-8 flex flex-col gap-5">
                    <ul className="flex flex-col gap-3 text-body-auros text-sm sm:text-base leading-[1.4]">
                      {(item.highlights || []).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#8052ff] shadow-[0_0_6px_#8052ff] mt-2 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Recommendation Letter Action Button (Liquid Secondary) */}
                    {isBongTra && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setRecommendationModalOpen(true)}
                          className="btn-secondary-liquid text-[12px] tracking-[0.08em] group cursor-pointer"
                        >
                          <span>Thư giới thiệu có mộc đỏ xác nhận</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
