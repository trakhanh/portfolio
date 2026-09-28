"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "motion/react";
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
      {/* Background Ambient Aurora Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8052ff]/10 blur-[150px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#00e5ff]/8 blur-[130px] pointer-events-none fluid-blob-cyan" />

      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 relative z-10">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-8">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 chip-liquid text-xs uppercase tracking-[0.1em] hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:-translate-x-0.5" />
              <span>{cases.labels.back || "Quay lại danh sách dự án"}</span>
            </Link>
          </div>

          {/* Hero Header: Liquid Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 liquid-glass-card p-8 sm:p-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="chip-liquid !text-[#ffb829] border-[#ffb829]/30">
                {projectItem.phase || projectItem.phaseLabel}
              </span>
            </div>

            <h1 className="heading-display text-3xl sm:text-5xl lg:text-[54px] tracking-[-0.04em] leading-[1.0] text-white mb-6">
              {projectItem.title}
            </h1>

            <p className="text-body-auros text-lg sm:text-xl leading-[1.4] max-w-3xl mb-8">
              {projectItem.description}
            </p>

            {/* Role & Result Pill Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-white/[0.08] mb-10">
              <div>
                <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.12em] block mb-1">
                  {cases.labels.role || "Vai trò"}:
                </span>
                <span className="text-base font-medium text-white">
                  {projectCase.role}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.12em] block mb-1">
                  {cases.labels.result || "Kết quả"}:
                </span>
                <span className="text-base font-medium text-[#ffb829]">
                  {projectItem.result}
                </span>
              </div>
            </div>

            {/* Hero Image with Glass Border */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px] bg-[#000000] border border-white/[0.08]">
              <Image
                src={projectItem.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                alt={projectItem.title}
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Case Study Sections: Liquid Glass Cards */}
          <div className="flex flex-col gap-8">
            {/* 01. Challenge */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.15em] block mb-3 font-medium">
                01 // {cases.labels.challenge || "Bài toán"}
              </span>
              <p className="text-body-auros text-base sm:text-lg leading-[1.4]">
                {projectCase.challenge}
              </p>
            </section>

            {/* 02. Responsibilities */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-[0.15em] block mb-4 font-medium">
                02 // {cases.labels.roleSection || "Vai trò & trách nhiệm"}
              </span>
              <ul className="flex flex-col gap-3.5 text-body-auros text-base leading-[1.4]">
                {projectCase.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#8052ff] shadow-[0_0_6px_#8052ff] mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03. Process */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.15em] block mb-6 font-medium">
                03 // {cases.labels.process || "Quy trình thực hiện"}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectCase.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[8px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md"
                  >
                    <span className="text-[10px] font-mono text-[#8052ff] uppercase tracking-wider block mb-1">
                      BƯỚC 0{idx + 1}
                    </span>
                    <h3 className="heading-sub text-lg text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body-auros text-sm leading-[1.4]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Technology */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-[0.15em] block mb-6 font-medium">
                04 // {cases.labels.technology || "Công nghệ & cách sử dụng"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectCase.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-5 rounded-[8px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex items-start gap-4"
                  >
                    <Cpu className="w-5 h-5 text-[#8052ff] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-base font-medium text-white block mb-1">
                        {tech.name}
                      </span>
                      <span className="text-xs text-body-auros leading-[1.4] block">
                        {tech.purpose}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Outcome & Learning */}
            <section className="p-8 sm:p-10 liquid-glass-card">
              <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.15em] block mb-4 font-medium">
                05 // {cases.labels.outcome || "Kết quả & bài học"}
              </span>

              <p className="text-body-auros text-base sm:text-lg leading-[1.4] mb-6">
                {projectCase.outcome}
              </p>

              {/* Evidence */}
              <div className="pt-4 border-t border-white/[0.08] mb-6">
                <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.12em] block mb-3 font-medium">
                  Minh chứng &amp; kết quả thực tế:
                </span>
                <ul className="flex flex-col gap-2.5 text-sm text-body-auros">
                  {projectCase.evidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#ffb829] mt-0.5 shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lessons */}
              <div className="p-6 rounded-[8px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2 text-[#8052ff]">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-[0.12em] font-medium">
                    Bài học kinh nghiệm:
                  </span>
                </div>
                <p className="text-sm text-body-auros leading-[1.4]">
                  {projectCase.learning}
                </p>
              </div>
            </section>

            {/* Navigation Between Projects */}
            <div className="flex items-center justify-between pt-8 border-t border-white/[0.08]">
              <Link
                href={`/projects/${prevProject.id}/`}
                className="btn-secondary-liquid text-xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Dự án trước: {prevProject.title}</span>
              </Link>

              <Link
                href={`/projects/${nextProject.id}/`}
                className="btn-secondary-liquid text-xs group"
              >
                <span>Dự án tiếp: {nextProject.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
