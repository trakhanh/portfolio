"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { RecommendationModal } from "./RecommendationModal";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, FileCheck2 } from "lucide-react";

export function ExperienceSection() {
  const { content } = useLanguage();
  const { experience } = content;
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);

  return (
    <section
      id="experience"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Headline Block (Two-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {experience.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {experience.title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {experience.intro}
            </p>
          </div>
        </div>

        {/* Experience Timeline Rows (Floating Spaciously on Black) */}
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
                className="bg-white/[0.02] border border-white/10 hover:border-white/20 p-8 sm:p-10 rounded-3xl transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Role & Company & Date */}
                  <div className="lg:col-span-4 flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider">
                      {(item as any).date || item.period}
                    </span>
                    <h3 className="text-2xl font-normal tracking-tight text-white mt-1">
                      {item.role}
                    </h3>
                    <span className="text-sm font-light text-[#9a9a9a]">
                      {item.company}
                    </span>

                    {/* Recommendation Letter CTA for Bông Trà */}
                    {isBongTra && (
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => setRecommendationModalOpen(true)}
                          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.025em] px-4 py-2 rounded-full bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30 hover:bg-[#8052ff] hover:text-white transition-all cursor-pointer"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Thư giới thiệu có mộc đỏ ↗</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Highlights & Tags */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    <ul className="flex flex-col gap-3">
                      {(item.highlights || []).map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="text-sm sm:text-base font-extralight text-[#bdbdbd] leading-relaxed flex items-start gap-3"
                        >
                          <span className="text-[#ffb829] mt-1 shrink-0">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    {(item as any).tags && (item as any).tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {((item as any).tags as string[]).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-light text-[#9a9a9a] bg-white/[0.03] rounded-full border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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
