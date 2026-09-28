"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Lightbulb, Cpu } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#000000] text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-28">
        <div className="max-w-[1040px] mx-auto px-6">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.025em] text-[#9a9a9a] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{cases.labels.back || "Quay lại danh sách dự án"}</span>
            </Link>

            <span className="text-[11px] font-medium tracking-[0.025em] uppercase px-3 py-1 rounded-full bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30">
              CASE // {slug}
            </span>
          </div>

          {/* Hero Header Block */}
          <div className="mb-16">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {projectItem.phase || projectItem.phaseLabel}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] mb-6">
              {projectItem.title}
            </h1>

            <p className="text-base sm:text-xl font-extralight text-[#bdbdbd] leading-[1.65] max-w-3xl mb-10">
              {projectItem.description}
            </p>

            {/* Quick Meta Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-white/10 mb-10">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#9a9a9a] block mb-1">
                  {cases.labels.role || "Vai trò"}:
                </span>
                <span className="text-base font-light text-white">
                  {projectCase.role}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#9a9a9a] block mb-1">
                  {cases.labels.result || "Kết quả"}:
                </span>
                <span className="text-base font-light text-[#ffb829]">
                  {projectItem.result}
                </span>
              </div>
            </div>

            {/* Project Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black border border-white/10 shadow-2xl">
              <Image
                src={projectItem.image || "/img/projects-v3/computer-vision-inspection.jpg"}
                alt={projectItem.title}
                fill
                priority
                sizes="(max-width: 1040px) 100vw, 1040px"
                className="object-cover"
              />
            </div>
          </div>

          {/* 5 Core Case Sections (Floating Dala Cards with 24px Radius) */}
          <div className="flex flex-col gap-10">
            {/* 01. Challenge */}
            <section className="bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-3xl">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest block mb-2">
                01 // {cases.labels.challenge || "Bài toán"}
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-4">
                Vấn đề cốt lõi cần giải quyết
              </h2>
              <p className="text-base font-extralight text-[#bdbdbd] leading-relaxed">
                {projectCase.challenge}
              </p>
            </section>

            {/* 02. Role & Responsibilities */}
            <section className="bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-3xl">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest block mb-2">
                02 // {cases.labels.roleSection || "Vai trò & trách nhiệm"}
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-6">
                Phạm vi công việc thực tế
              </h2>
              <ul className="flex flex-col gap-3.5">
                {projectCase.responsibilities.map((resp, i) => (
                  <li key={i} className="text-base font-extralight text-[#bdbdbd] flex items-start gap-3 leading-relaxed">
                    <span className="text-[#ffb829] mt-1 shrink-0">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03. Process */}
            <section className="bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-3xl">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest block mb-2">
                03 // {cases.labels.process || "Quy trình thực hiện"}
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-8">
                Từng bước triển khai
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectCase.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-xs font-mono text-[#9a9a9a] uppercase block mb-1">
                      BƯỚC 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-normal text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm font-extralight text-[#9a9a9a] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Technology */}
            <section className="bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-3xl">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest block mb-2">
                04 // {cases.labels.technology || "Công nghệ & cách sử dụng"}
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-8">
                Hệ sinh thái công nghệ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectCase.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-[#8052ff] shrink-0 mt-0.5">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-base font-normal text-white block">
                        {tech.name}
                      </span>
                      <span className="text-xs font-extralight text-[#9a9a9a] leading-relaxed block mt-0.5">
                        {tech.purpose}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Outcome & Learning */}
            <section className="bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-3xl">
              <span className="text-xs font-mono text-[#8052ff] uppercase tracking-widest block mb-2">
                05 // {cases.labels.outcome || "Kết quả & bài học"}
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-4">
                Tác động và giá trị thực tế
              </h2>
              <p className="text-base font-extralight text-[#bdbdbd] leading-relaxed mb-8">
                {projectCase.outcome}
              </p>

              {/* Evidence */}
              <div className="border-t border-white/10 pt-6 mb-8">
                <span className="text-[11px] font-medium text-[#9a9a9a] uppercase tracking-wider block mb-4">
                  Minh chứng &amp; kết quả nghiệm thu:
                </span>
                <ul className="flex flex-col gap-3">
                  {projectCase.evidence.map((ev, i) => (
                    <li key={i} className="text-sm font-extralight text-white flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#ffb829] mt-0.5 shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning takeaway */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-4">
                <Lightbulb className="w-5 h-5 text-[#ffb829] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-medium text-white block mb-1">
                    {cases.labels.learning || "Bài học kinh nghiệm"}:
                  </strong>
                  <p className="text-sm font-extralight text-[#bdbdbd] leading-relaxed">
                    {projectCase.learning}
                  </p>
                </div>
              </div>

              {/* External source / demo links */}
              {projectItem.links && projectItem.links.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                  {projectItem.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#8052ff] hover:bg-[#9269ff] text-white px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.025em] shadow-[0_4px_20px_rgba(128,82,255,0.25)] transition-all hover:-translate-y-0.5"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Previous / Next Case Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 pt-10 mt-16">
            <Link
              href={`/projects/${prevProject.id}/`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs uppercase tracking-wider text-[#9a9a9a] group-hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                {cases.labels.previous || "Dự án trước"}
              </span>
              <span className="text-lg font-normal text-white group-hover:text-[#8052ff] transition-colors mt-1">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.id}/`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs uppercase tracking-wider text-[#9a9a9a] group-hover:text-white flex items-center gap-1 transition-colors">
                {cases.labels.next || "Dự án tiếp theo"}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-lg font-normal text-white group-hover:text-[#8052ff] transition-colors mt-1">
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
