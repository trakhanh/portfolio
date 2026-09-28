"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";

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
    const cat = getProjectCategory(item.id, item.tags);
    return cat === activeFilter;
  });

  return (
    <section
      id="projects"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {projects.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {projects.title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {projects.intro}
            </p>
          </div>
        </div>

        {/* Filter Pills with Motion Layout */}
        <div className="flex flex-wrap items-center gap-2 mb-16 pb-6 border-b border-white/10">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
                className={`relative px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.025em] transition-all cursor-pointer ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-[#9a9a9a] hover:text-white bg-white/[0.03] border border-white/5 hover:border-white/15"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid (Spacious 24px Radius Cards) */}
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
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-3xl flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Aspect Video Image with Subtle Mask */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <Image
                      src={item.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                    {/* Phase Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[11px] font-medium tracking-[0.025em] uppercase rounded-full bg-black/75 backdrop-blur-md text-[#ffb829] border border-[#ffb829]/30">
                        {item.phase || item.phaseLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-3 group-hover:text-[#8052ff] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm font-extralight text-[#9a9a9a] line-clamp-3 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Key Result Banner */}
                    {item.result && (
                      <div className="mb-6 p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-light text-[#bdbdbd] flex items-baseline gap-2">
                        <span className="text-[#ffb829] font-medium text-[11px] uppercase tracking-wider shrink-0">
                          KẾT QUẢ:
                        </span>
                        <span className="truncate">{item.result}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Tags & Actions */}
                <div className="p-7 pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-extralight text-[#9a9a9a] bg-white/[0.03] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <Link
                      href={`/projects/${item.id}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.025em] text-[#8052ff] hover:text-white transition-colors"
                    >
                      <span>Xem Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {item.links && item.links.length > 0 && (
                      <div className="flex items-center gap-2">
                        {item.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.1] flex items-center justify-center text-[#9a9a9a] hover:text-white transition-colors"
                            title={link.label}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
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
