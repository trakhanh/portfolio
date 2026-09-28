"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";

export function ProjectsSection() {
  const { content } = useLanguage();
  const { projects } = content;
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: projects.filterAll || "Tất cả" },
    ...(projects.categories || []),
  ];

  // Helper to determine which category a project belongs to
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
      className="py-20 border-b border-cyber-border bg-[#090910] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left">
          <Badge variant="cyan" className="w-fit font-mono text-xs">
            <FolderGit2 className="w-3.5 h-3.5 mr-1" />
            {projects.eyebrow}
          </Badge>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide uppercase">
            {projects.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-cyber-fg/80 max-w-3xl leading-relaxed">
            {projects.intro}
          </p>
        </div>

        {/* Filter Bar with Motion Layout */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-cyber-border/60">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
                className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cyber-chamfer-sm cursor-pointer ${
                  isActive
                    ? "text-black font-bold"
                    : "text-cyber-muted-fg bg-cyber-card border border-cyber-border hover:border-cyber-accent hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 bg-cyber-accent z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((item, idx) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border border-cyber-border bg-cyber-card flex flex-col justify-between hover:border-cyber-accent transition-all duration-300 group cyber-chamfer overflow-hidden"
              >
                <div>
                  {/* Project Thumbnail with Cyber Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0c0c14] border-b border-cyber-border">
                    <Image
                      src={item.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-80" />

                    {/* Phase Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[#0a0a0f]/90 text-cyber-accent border border-cyber-accent/50 cyber-chamfer-sm">
                        {item.phase || item.phaseLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyber-accent transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-cyber-fg/80 line-clamp-3 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Result Banner */}
                    {item.result && (
                      <div className="mb-4 bg-cyber-muted/80 border-l-2 border-cyber-cyan p-2.5 text-[11px] font-mono text-cyber-cyan">
                        <strong>KẾT QUẢ:</strong> {item.result}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Tags & Actions */}
                <div className="p-5 pt-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono bg-[#0c0c14] text-cyber-muted-fg border border-cyber-border/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Case Study & External Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-cyber-border/60">
                    <Link
                      href={`/projects/${item.id}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyber-accent hover:text-white transition-colors"
                    >
                      <span>Chi tiết Case Study</span>
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
                            className="p-1.5 border border-cyber-border bg-[#0c0c14] text-cyber-muted-fg hover:text-cyber-accent hover:border-cyber-accent transition-colors"
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
