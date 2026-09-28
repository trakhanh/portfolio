"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Lightbulb,
  Cpu,
  Layers,
  FileCode,
  ShieldAlert,
} from "lucide-react";

interface ProjectDetailClientProps {
  slug: string;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { content, cases } = useLanguage();

  // Find project in content.projects.items
  const projectItem = content.projects.items.find((p) => p.id === slug);
  const projectCase = cases.items[slug];

  if (!projectItem || !projectCase) {
    notFound();
  }

  // Determine prev and next projects
  const allProjects = content.projects.items;
  const currentIndex = allProjects.findIndex((p) => p.id === slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-fg">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb & Back */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyber-muted-fg hover:text-cyber-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{cases.labels.back || "Quay lại danh sách dự án"}</span>
            </Link>

            <span className="text-[11px] font-mono text-cyber-accent border border-cyber-accent/40 bg-cyber-accent/10 px-2.5 py-1 cyber-chamfer-sm">
              CASE // {slug}
            </span>
          </div>

          {/* Hero Banner Card */}
          <div className="border border-cyber-border bg-[#0d0d16] p-6 sm:p-8 cyber-chamfer mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="cyan" className="text-xs font-mono">
                {projectItem.phase || projectItem.phaseLabel}
              </Badge>
              <span className="text-xs font-mono text-cyber-muted-fg">
                // SYSTEM REPORT
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-4">
              {projectItem.title}
            </h1>

            <p className="font-mono text-sm sm:text-base text-cyber-fg/90 leading-relaxed mb-6">
              {projectItem.description}
            </p>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-cyber-border/70 pt-4 mb-6">
              <div>
                <span className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-wider block">
                  {cases.labels.role || "Vai trò"}:
                </span>
                <span className="font-mono text-xs sm:text-sm text-white font-medium">
                  {projectCase.role}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-wider block">
                  {cases.labels.result || "Kết quả"}:
                </span>
                <span className="font-mono text-xs sm:text-sm text-cyber-accent font-medium">
                  {projectItem.result}
                </span>
              </div>
            </div>

            {/* Project Hero Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#06060a] border border-cyber-border">
              <Image
                src={projectItem.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                alt={projectItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          </div>

          {/* 5 Core Case Sections */}
          <div className="flex flex-col gap-10">
            {/* 01. Challenge */}
            <section className="border border-cyber-border bg-cyber-card p-6 cyber-chamfer-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-cyber-accent">01 //</span>
                <h2 className="font-heading font-bold text-xl text-white">
                  {cases.labels.challenge || "Bài toán"}
                </h2>
              </div>
              <p className="font-mono text-sm text-cyber-fg/90 leading-relaxed">
                {projectCase.challenge}
              </p>
            </section>

            {/* 02. Role & Responsibilities */}
            <section className="border border-cyber-border bg-cyber-card p-6 cyber-chamfer-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-cyber-cyan">02 //</span>
                <h2 className="font-heading font-bold text-xl text-white">
                  {cases.labels.roleSection || "Vai trò & trách nhiệm"}
                </h2>
              </div>
              <ul className="flex flex-col gap-2.5 font-mono text-sm text-cyber-fg/90">
                {projectCase.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-cyber-cyan font-bold mt-0.5">›</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03. Process */}
            <section className="border border-cyber-border bg-cyber-card p-6 cyber-chamfer-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono font-bold text-cyber-accent">03 //</span>
                <h2 className="font-heading font-bold text-xl text-white">
                  {cases.labels.process || "Quy trình thực hiện"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectCase.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="border border-cyber-border/70 bg-[#0c0c14] p-4 cyber-chamfer-sm"
                  >
                    <span className="text-[10px] font-mono text-cyber-muted-fg block mb-1">
                      STEP 0{idx + 1}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-mono text-xs text-cyber-fg/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Technology */}
            <section className="border border-cyber-border bg-cyber-card p-6 cyber-chamfer-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono font-bold text-cyber-cyan">04 //</span>
                <h2 className="font-heading font-bold text-xl text-white">
                  {cases.labels.technology || "Công nghệ & cách sử dụng"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectCase.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="border border-cyber-border/70 bg-[#0c0c14] p-3 flex items-start gap-3 cyber-chamfer-sm"
                  >
                    <Cpu className="w-4 h-4 text-cyber-cyan mt-1 shrink-0" />
                    <div>
                      <span className="font-heading font-bold text-sm text-white block">
                        {tech.name}
                      </span>
                      <span className="font-mono text-xs text-cyber-muted-fg leading-tight block">
                        {tech.purpose}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Outcome & Learning */}
            <section className="border border-cyber-border bg-cyber-card p-6 cyber-chamfer-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-cyber-accent">05 //</span>
                <h2 className="font-heading font-bold text-xl text-white">
                  {cases.labels.outcome || "Kết quả & bài học"}
                </h2>
              </div>

              <p className="font-mono text-sm text-cyber-fg/90 leading-relaxed mb-4">
                {projectCase.outcome}
              </p>

              {/* Evidence */}
              <div className="border-t border-cyber-border/60 pt-4 mb-4">
                <span className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-wider block mb-2">
                  Minh chứng &amp; kết quả thực tế:
                </span>
                <ul className="flex flex-col gap-2 font-mono text-xs sm:text-sm text-cyber-fg/90">
                  {projectCase.evidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-accent mt-0.5 shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning takeaway */}
              <div className="bg-cyber-accent/5 border-l-2 border-cyber-accent p-3.5 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-cyber-accent mt-0.5 shrink-0" />
                <div className="font-mono text-xs text-cyber-fg/90 leading-relaxed">
                  <strong className="text-white block mb-0.5">
                    {cases.labels.learning || "Điều tôi rút ra"}:
                  </strong>
                  <span>{projectCase.learning}</span>
                </div>
              </div>

              {/* Source code / Demo links */}
              {projectItem.links && projectItem.links.length > 0 && (
                <div className="mt-6 pt-4 border-t border-cyber-border/60 flex flex-wrap items-center gap-3">
                  {projectItem.links.map((link) => (
                    <Button asChild key={link.url} variant="outline" size="sm" className="gap-2">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>{link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Previous / Next Case Navigation */}
          <div className="flex items-center justify-between border-t border-cyber-border pt-8 mt-12">
            <Link
              href={`/projects/${prevProject.id}/`}
              className="group flex flex-col items-start"
            >
              <span className="text-[10px] font-mono text-cyber-muted-fg uppercase flex items-center gap-1 group-hover:text-cyber-accent">
                <ArrowLeft className="w-3 h-3" />
                {cases.labels.previous || "Dự án trước"}
              </span>
              <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-cyber-accent transition-colors line-clamp-1">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.id}/`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-[10px] font-mono text-cyber-muted-fg uppercase flex items-center gap-1 group-hover:text-cyber-accent">
                {cases.labels.next || "Dự án tiếp theo"}
                <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-cyber-accent transition-colors line-clamp-1">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
