"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  const { content } = useLanguage();
  const { projects } = content;
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: projects.filterAll || "Tất cả" },
    ...(projects.categories || []),
  ];

  const getProjectCategory = (id: string, tags: string[] = []): string => {
    const text = (id + " " + tags.join(" ")).toLowerCase();
    if (
      text.includes("video") ||
      text.includes("creative") ||
      text.includes("content") ||
      text.includes("genai")
    ) {
      return "ai";
    }
    if (
      text.includes("erp") ||
      text.includes("hrm") ||
      text.includes("apps script") ||
      text.includes("internal")
    ) {
      return "erp";
    }
    return "vision";
  };

  const filteredProjects = projects.items.filter((item) => {
    if (activeFilter === "all") return true;
    return getProjectCategory(item.id, item.tags) === activeFilter;
  });

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow-auros mb-3 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span>{projects.eyebrow}</span>
            </div>
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0]">
              {projects.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-body-auros text-base sm:text-lg leading-[1.4]">
              {projects.intro}
            </p>
          </div>
        </div>

        {/* Category Filter Pills: 6px radius (Auros small element radius) */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
                className={`px-4 py-2 rounded-[6px] text-[12px] font-medium uppercase tracking-[0.1em] transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#8052ff] text-white"
                    : "bg-[#0f0f18] text-[#bbc7c6] hover:text-white border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects Gallery Grid (Surface Cards: 16px radius, no drop shadows) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="surface-card group flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail Image */}
                  <Link
                    href={`/projects/${item.id}/`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-[#000000] border-b border-white/[0.08]"
                  >
                    <Image
                      src={item.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Phase Chip: 6px radius */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="chip-auros !bg-[#000000]/80 !border-white/20 !text-white">
                        {item.phase || item.phaseLabel}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content: 36px padding */}
                  <div className="p-8">
                    {/* Header: Category + 32x32 6px Arrow Button */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="heading-sub text-xl text-white group-hover:text-[#8052ff] transition-colors leading-[1.2]">
                        <Link href={`/projects/${item.id}/`}>
                          {item.title}
                        </Link>
                      </h3>
                      <Link
                        href={`/projects/${item.id}/`}
                        className="btn-arrow-icon"
                        aria-label={`Xem dự án ${item.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>

                    <p className="text-body-auros text-sm leading-[1.4] mb-6 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Metric Highlight (Lavender / Saffron) */}
                    <div className="p-3.5 rounded-[6px] bg-[#000000]/50 border border-white/[0.06] mb-6">
                      <span className="text-[10px] font-mono text-[#bbc7c6] uppercase tracking-[0.12em] block mb-1">
                        KẾT QUẢ ĐẠT ĐƯỢC
                      </span>
                      <span className="text-sm font-medium text-[#ffb829] leading-snug block">
                        {item.result}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Tags: 6px radius chips */}
                <div className="p-8 pt-0 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip-auros">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
