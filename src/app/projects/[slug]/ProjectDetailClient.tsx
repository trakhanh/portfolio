"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Lightbulb, Cpu } from "lucide-react";

interface ProjectDetailClientProps {
  slug: string;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { content, cases } = useLanguage();

  const projectItem = content.projects.items.find((p) => p.id === slug);
  const projectCase = cases.items[slug];

  if (!projectItem || !projectCase) {
    notFound();
  }

  const allProjects = content.projects.items;
  const currentIndex = allProjects.findIndex((p) => p.id === slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white relative overflow-hidden">
      {/* Background fluid glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8052ff]/10 blur-[150px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#00e5ff]/8 blur-[130px] pointer-events-none fluid-blob-cyan" />

      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 relative z-10">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-8">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-tag text-xs font-sans uppercase tracking-wider text-[#a0a0aa] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ffb829]" />
              <span>{cases.labels.back || "Quay lại danh sách dự án"}</span>
            </Link>
          </div>

          {/* Hero Header in Liquid Glass */}
          <div className="mb-14 liquid-glass-card p-8 sm:p-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3.5 py-1 text-xs font-mono text-[#ffb829] liquid-glass-tag">
                {projectItem.phase || projectItem.phaseLabel}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display text-white tracking-[-0.04em] leading-[1.08] mb-6">
              {projectItem.title}
            </h1>

            <p className="text-lg sm:text-xl text-body-light leading-relaxed max-w-3xl mb-8">
              {projectItem.description}
            </p>

            {/* Role & Result Pill Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-white/10 mb-10">
              <div>
                <span className="text-xs font-mono text-[#a0a0aa] uppercase tracking-wider block mb-1 font-medium">
                  {cases.labels.role || "Vai trò"}:
                </span>
                <span className="text-base font-sans text-white">
                  {projectCase.role}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-[#a0a0aa] uppercase tracking-wider block mb-1 font-medium">
                  {cases.labels.result || "Kết quả"}:
                </span>
                <span className="text-base font-sans text-[#ffb829] font-medium">
                  {projectItem.result}
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#000000] border border-white/10">
              <Image
                src={projectItem.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                alt={projectItem.title}
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Case Study Sections in Liquid Glass */}
          <div className="flex flex-col gap-12">
            {/* 01. Challenge */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider block mb-3 font-medium">
                01 // {cases.labels.challenge || "Bài toán"}
              </span>
              <p className="text-base sm:text-lg text-body-light leading-relaxed">
                {projectCase.challenge}
              </p>
            </section>

            {/* 02. Responsibilities */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider block mb-4 font-medium">
                02 // {cases.labels.roleSection || "Vai trò & trách nhiệm"}
              </span>
              <ul className="flex flex-col gap-3.5 font-sans text-base text-body-light leading-relaxed">
                {projectCase.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#8052ff] mt-2.5 shrink-0 shadow-[0_0_8px_#8052ff]" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03. Process */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider block mb-6 font-medium">
                03 // {cases.labels.process || "Quy trình thực hiện"}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectCase.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl liquid-glass-tag"
                  >
                    <span className="text-[11px] font-mono text-[#a0a0aa] block mb-1">
                      BƯỚC 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-display text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-body-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Technology */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider block mb-6 font-medium">
                04 // {cases.labels.technology || "Công nghệ & cách sử dụng"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectCase.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-5 rounded-2xl liquid-glass-tag flex items-start gap-4"
                  >
                    <Cpu className="w-5 h-5 text-[#8052ff] mt-1 shrink-0" />
                    <div>
                      <span className="text-base font-sans font-medium text-white block">
                        {tech.name}
                      </span>
                      <span className="text-xs text-body-light leading-relaxed block">
                        {tech.purpose}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Outcome & Learning */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider block mb-4 font-medium">
                05 // {cases.labels.outcome || "Kết quả & bài học"}
              </span>

              <p className="text-base sm:text-lg text-body-light leading-relaxed mb-6">
                {projectCase.outcome}
              </p>

              {/* Evidence */}
              <div className="pt-4 border-t border-white/10 mb-6">
                <span className="text-xs font-mono text-[#a0a0aa] uppercase tracking-wider block mb-3 font-medium">
                  Minh chứng &amp; kết quả thực tế:
                </span>
                <ul className="flex flex-col gap-2.5 text-sm text-body-light">
                  {projectCase.evidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#ffb829] mt-0.5 shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning */}
              <div className="p-5 rounded-2xl liquid-glass-tag flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-[#8052ff] mt-0.5 shrink-0" />
                <div className="text-sm text-body-light leading-relaxed">
                  <strong className="text-white block mb-1">
                    {cases.labels.learning || "Điều tôi rút ra"}:
                  </strong>
                  <span>{projectCase.learning}</span>
                </div>
              </div>

              {/* Source & Demo links */}
              {projectItem.links && projectItem.links.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                  {projectItem.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid-primary text-xs uppercase"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Previous / Next Project Navigation in Liquid Glass */}
          <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16">
            <Link
              href={`/projects/${prevProject.id}/`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs font-mono text-[#a0a0aa] uppercase flex items-center gap-1 group-hover:text-white">
                <ArrowLeft className="w-3.5 h-3.5 text-[#ffb829]" />
                {cases.labels.previous || "Dự án trước"}
              </span>
              <span className="text-lg font-display text-white group-hover:text-[#8052ff] transition-colors">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.id}/`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs font-mono text-[#a0a0aa] uppercase flex items-center gap-1 group-hover:text-white">
                {cases.labels.next || "Dự án tiếp theo"}
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
              </span>
              <span className="text-lg font-display text-white group-hover:text-[#8052ff] transition-colors">
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
