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
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Section Headline Block (Two-column asymmetrical rhythm from DESIGN.md) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829] block mb-3">
              {projects.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-display text-white tracking-[-0.04em] leading-[1.08]">
              {projects.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-body-light leading-relaxed">
              {projects.intro}
            </p>
          </div>
        </div>

        {/* Category Pill Switcher with Motion LayoutId */}
        <div className="flex flex-wrap items-center gap-2 mb-14">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
                className={`relative px-5 py-2 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "text-white font-medium"
                    : "text-[#9a9a9a] hover:text-white bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDalaFilter"
                    className="absolute inset-0 rounded-full bg-[#8052ff] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between rounded-3xl bg-[#08080c] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Thumbnail Image Container */}
                  <Link
                    href={`/projects/${item.id}/`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-[#000000]"
                  >
                    <Image
                      src={item.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />

                    {/* Phase Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[11px] font-sans font-medium bg-[#000000]/80 backdrop-blur-md text-white rounded-full border border-white/10">
                        {item.phase || item.phaseLabel}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-display text-white mb-2.5 group-hover:text-[#8052ff] transition-colors">
                      <Link href={`/projects/${item.id}/`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-body-light line-clamp-3 mb-5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Metric Highlight */}
                    {item.result && (
                      <div className="text-xs font-mono text-[#ffb829] mb-4">
                        <span className="text-[#9a9a9a]">RESULT // </span>
                        {item.result}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Tags & CTA */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-mono text-[#9a9a9a] bg-white/[0.03] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/projects/${item.id}/`}
                      className="text-xs font-sans font-medium uppercase tracking-wider text-white group-hover:text-[#8052ff] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Xem Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
