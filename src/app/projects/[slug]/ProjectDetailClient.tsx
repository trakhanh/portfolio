"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProjectDetailClientProps {
  slug: string;
}

// Visual tool icon mappings matching the original high-fidelity portfolio assets
const TECHNOLOGY_VISUALS: Record<string, { icon?: string; fallback: string }[]> = {
  Python: [{ icon: "python.svg", fallback: "PY" }],
  YOLOv8: [{ icon: "ultralytics.svg", fallback: "YOLO" }],
  SORT: [{ fallback: "SORT" }],
  OpenCV: [{ icon: "opencv.svg", fallback: "CV" }],
  PyTorch: [{ icon: "pytorch.svg", fallback: "PT" }],
  BDD100K: [{ fallback: "BDD" }],
  KITTI: [{ fallback: "KITTI" }],
  "Jupyter / Kaggle": [
    { icon: "jupyter.svg", fallback: "JUP" },
    { icon: "kaggle.svg", fallback: "KG" },
  ],
  Streamlit: [{ icon: "streamlit.svg", fallback: "ST" }],
  CNN: [{ fallback: "CNN" }],
  "VGG16 / ResNet50": [{ fallback: "NN" }],
  "U-Net": [{ fallback: "U-NET" }],
  n8n: [{ icon: "n8n.svg", fallback: "n8n" }],
  "GPT / Gemini": [
    { icon: "openai.svg", fallback: "OAI" },
    { icon: "googlegemini.svg", fallback: "GM" },
  ],
  Supabase: [{ icon: "supabase.svg", fallback: "SB" }],
  "Website / Facebook": [
    { fallback: "WEB" },
    { icon: "facebook.svg", fallback: "FB" },
  ],
  "Google Apps Script": [{ icon: "googleappsscript.svg", fallback: "GAS" }],
  "Sheets API": [{ icon: "googlesheets.svg", fallback: "GS" }],
  "Calendar API": [{ icon: "googlecalendar.svg", fallback: "GC" }],
  "Email Automation": [{ icon: "gmail.svg", fallback: "MAIL" }],
  "Landing Page": [{ fallback: "WEB" }],
  "Online Payment": [{ fallback: "PAY" }],
  "Registration Form": [{ fallback: "FORM" }],
  "Responsive Web": [{ fallback: "RWD" }],
  "JavaScript / Web App": [
    { icon: "javascript.svg", fallback: "JS" },
    { fallback: "WEB" },
  ],
  "ERP / HRM Model": [{ icon: "erp.svg", fallback: "ERP" }],
  RBAC: [{ icon: "rbac.svg", fallback: "RBAC" }],
  "Workflow / API": [{ icon: "api.svg", fallback: "API" }],
  "ChatGPT / Claude": [
    { icon: "openai.svg", fallback: "OAI" },
    { icon: "anthropic.svg", fallback: "CL" },
  ],
  "Gemini / NotebookLM": [
    { icon: "googlegemini.svg", fallback: "GM" },
    { icon: "notebooklm.svg", fallback: "NLM" },
  ],
  Antigravity: [{ icon: "antigravity.svg", fallback: "AG" }],
  "AI Visual / Voice": [{ fallback: "AI" }],
};

function TechLogoItem({ name }: { name: string }) {
  const visuals = TECHNOLOGY_VISUALS[name] || [{ fallback: name.slice(0, 4).toUpperCase() }];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {visuals.map((v, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-[8px] bg-white/[0.04] border border-white/[0.1] backdrop-blur-md flex items-center justify-center p-2 shadow-inner group-hover:border-[#00e5ff]/50 transition-colors"
          title={name}
        >
          {v.icon ? (
            <Image
              src={`/img/tool-icons/${v.icon}`}
              alt={name}
              width={22}
              height={22}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <span className="text-[10px] font-mono font-bold tracking-tight text-[#00e5ff]">
              {v.fallback}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function normalizeImage(path?: string): string {
  if (!path) return "/og.png";
  if (path.startsWith("./")) return `/${path.slice(2)}`;
  return path;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { content, cases } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("challenge");

  const projectItem = content.projects.items.find((p) => p.id === slug);
  const projectCase = cases.items[slug];

  const allProjects = content.projects.items;
  const currentIndex = allProjects.findIndex((p) => p.id === slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  useEffect(() => {
    const sections = ["challenge", "role", "process", "technology", "outcome"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!projectItem || !projectCase) {
    notFound();
  }

  const sectionTabs = [
    { id: "challenge", index: "01", label: cases.labels.challenge || "Bài toán" },
    { id: "role", index: "02", label: cases.labels.roleSection || "Vai trò" },
    { id: "process", index: "03", label: cases.labels.process || "Quy trình" },
    { id: "technology", index: "04", label: cases.labels.technology || "Công nghệ" },
    { id: "outcome", index: "05", label: cases.labels.outcome || "Kết quả" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white relative overflow-hidden font-sans selection:bg-[#8052ff]/30 selection:text-white">
      {/* Background Ambient Bioluminescent Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[540px] h-[540px] rounded-full bg-[#8052ff]/10 blur-[160px] pointer-events-none fluid-blob-iris" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[#00e5ff]/8 blur-[140px] pointer-events-none fluid-blob-cyan" />

      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 relative z-10">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Kicker Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 chip-liquid text-xs uppercase tracking-[0.1em] hover:text-white hover:border-[#8052ff]/40 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:-translate-x-1" />
              <span>{cases.labels.back || "Quay lại danh sách dự án"}</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#bbc7c6]">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                <span>
                  CASE {String(currentIndex + 1).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")}
                </span>
              </div>
              <span className="chip-liquid !text-[#ffb829] border-[#ffb829]/30">
                {projectItem.phaseLabel || projectItem.phase}
              </span>
            </div>
          </div>

          {/* Hero Card: Liquid Glass Masterpiece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 liquid-glass-card p-6 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            {/* Top specular glow bar */}
            <div className="absolute top-0 left-0 w-36 h-[3px] bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Title, Summary, Action Links */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h1 className="heading-display text-3xl sm:text-5xl lg:text-[46px] tracking-[-0.03em] leading-[1.08] text-white mb-5">
                    {projectItem.title}
                  </h1>

                  <p className="text-body-auros text-base sm:text-lg lg:text-[17px] leading-relaxed text-[#bbc7c6] mb-8">
                    {projectItem.description}
                  </p>
                </div>

                {/* External Project Links in Hero */}
                {projectItem.links && projectItem.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {projectItem.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          idx === 0
                            ? "btn-primary-liquid text-xs py-2.5 px-5 group"
                            : "btn-secondary-liquid text-xs py-2.5 px-5 group"
                        }
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: High-Res Project Cover Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#000000] border border-white/[0.12] shadow-2xl group">
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#00e5ff] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                      VISUAL_DOC
                    </span>
                  </div>

                  <Image
                    src={normalizeImage(projectItem.image)}
                    alt={projectItem.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[11px] font-mono text-[#bbc7c6]/70 mt-2 text-right">
                  {cases.labels.imageCaption || "Hình ảnh đại diện dự án"} · {projectItem.title}
                </p>
              </div>
            </div>

            {/* 3-Column Specifications Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/[0.08]">
              <div className="p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.14em] block mb-1.5 font-medium">
                  01 // {cases.labels.role || "Vai trò"}:
                </span>
                <span className="text-sm sm:text-base font-medium text-white leading-snug block">
                  {projectCase.role}
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-[#ffb829]/[0.03] border border-[#ffb829]/20">
                <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-[0.14em] block mb-1.5 font-medium">
                  02 // {cases.labels.result || "Kết quả"}:
                </span>
                <span className="text-base sm:text-lg font-semibold text-[#ffb829] leading-snug block">
                  {projectItem.result}
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-[0.14em] block mb-1.5 font-medium">
                  03 // {cases.labels.scope || "Phạm vi"}:
                </span>
                <span className="text-sm sm:text-base font-medium text-white leading-snug block">
                  {projectItem.phase === "foundation"
                    ? cases.labels.academic || "Dự án học thuật"
                    : cases.labels.professional || "Dự án thực tế"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sticky Section Navigation Dock */}
          <div className="sticky top-[72px] z-30 py-3 mb-8 flex items-center justify-center">
            <nav
              aria-label="Case study sections"
              className="inline-flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#0d111b]/85 border border-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-x-auto max-w-full no-scrollbar"
            >
              {sectionTabs.map((tab) => {
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.06em] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#8052ff]/25 text-white border border-[#8052ff]/50 shadow-[0_0_16px_rgba(128,82,255,0.35)] font-semibold"
                        : "text-[#bbc7c6] hover:text-white hover:bg-white/[0.05] border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold ${
                        isActive ? "text-[#ffb829]" : "text-[#8052ff]"
                      }`}
                    >
                      {tab.index}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Case Blueprint & Tags Rail */}
          <div className="p-5 rounded-[14px] liquid-glass-card mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-[#bbc7c6]">
                <Layers className="w-4 h-4 text-[#8052ff]" />
                <span>{cases.labels.map || "Bản đồ case study"}:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {projectItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="chip-liquid !py-1 !px-3 hover:border-[#8052ff]/50 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
              <span>
                SYS_LAYER // {projectItem.phase === "foundation" ? "ACADEMIC_R&D" : "ENTERPRISE_SYSTEM"}
              </span>
            </div>
          </div>

          {/* Main Case Study Sections (Editorial 2-Column Grid on Desktop) */}
          <div className="flex flex-col gap-8">
            {/* 01. Challenge Section */}
            <section
              id="challenge"
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 liquid-glass-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-[#8052ff] uppercase tracking-[0.2em] font-semibold block mb-2">
                    01 // SECTION
                  </span>
                  <h2 className="heading-sub text-2xl sm:text-3xl text-white font-medium">
                    {cases.labels.challenge || "Bài toán"}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <div className="p-6 sm:p-8 rounded-[14px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-md">
                    <p className="text-body-auros text-base sm:text-lg lg:text-xl leading-relaxed text-[#edfffe]">
                      {projectCase.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Role & Responsibilities Section */}
            <section
              id="role"
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 liquid-glass-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-[#8052ff] uppercase tracking-[0.2em] font-semibold block mb-2">
                    02 // SECTION
                  </span>
                  <h2 className="heading-sub text-2xl sm:text-3xl text-white font-medium">
                    {cases.labels.roleSection || "Vai trò & trách nhiệm"}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-body-auros text-base sm:text-lg leading-relaxed text-white mb-6">
                    {projectCase.role}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {projectCase.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="p-4 sm:p-5 rounded-[12px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-md flex items-start gap-3.5 hover:border-[#8052ff]/40 hover:bg-white/[0.04] transition-all group"
                      >
                        <span className="w-2 h-2 rounded-[2px] bg-[#8052ff] shadow-[0_0_8px_#8052ff] mt-2 shrink-0 group-hover:bg-[#00e5ff] group-hover:shadow-[0_0_8px_#00e5ff] transition-colors" />
                        <span className="text-xs sm:text-sm text-body-auros leading-relaxed text-[#edfffe]/90">
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 03. Process Section */}
            <section
              id="process"
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 liquid-glass-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-[#ffb829] uppercase tracking-[0.2em] font-semibold block mb-2">
                    03 // SECTION
                  </span>
                  <h2 className="heading-sub text-2xl sm:text-3xl text-white font-medium">
                    {cases.labels.process || "Quy trình thực hiện"}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectCase.process.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-[14px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-md hover:border-[#ffb829]/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono text-[#8052ff] font-semibold uppercase tracking-[0.15em] group-hover:text-[#ffb829] transition-colors">
                            BƯỚC 0{idx + 1}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff]/60 group-hover:bg-[#ffb829] group-hover:shadow-[0_0_8px_#ffb829] transition-all" />
                        </div>
                        <h3 className="heading-sub text-base sm:text-lg text-white mb-2 font-medium">
                          {step.title}
                        </h3>
                        <p className="text-body-auros text-xs sm:text-sm leading-relaxed text-[#bbc7c6]">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 04. Technology Section */}
            <section
              id="technology"
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 liquid-glass-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-[0.2em] font-semibold block mb-2">
                    04 // SECTION
                  </span>
                  <h2 className="heading-sub text-2xl sm:text-3xl text-white font-medium">
                    {cases.labels.technology || "Công nghệ & cách sử dụng"}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectCase.technologies.map((tech, idx) => (
                      <div
                        key={tech.name}
                        className="p-6 rounded-[14px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-md hover:border-[#00e5ff]/40 transition-all relative overflow-hidden group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <TechLogoItem name={tech.name} />
                          <span className="text-xs font-mono font-semibold text-[#00e5ff]/70 tracking-wider">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-white mb-1.5">
                          {tech.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-body-auros leading-relaxed text-[#bbc7c6]">
                          {tech.purpose}
                        </p>
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full border border-white/[0.04] pointer-events-none group-hover:border-[#00e5ff]/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 05. Outcome & Key Learning Section */}
            <section
              id="outcome"
              className="scroll-mt-32 p-6 sm:p-10 lg:p-12 liquid-glass-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-[#ffb829] uppercase tracking-[0.2em] font-semibold block mb-2">
                    05 // SECTION
                  </span>
                  <h2 className="heading-sub text-2xl sm:text-3xl text-white font-medium">
                    {cases.labels.outcome || "Kết quả & bài học"}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-body-auros text-base sm:text-lg lg:text-xl leading-relaxed text-white mb-6">
                    {projectCase.outcome}
                  </p>

                  {/* Evidence Cards */}
                  {projectCase.evidence && projectCase.evidence.length > 0 && (
                    <div className="mb-6">
                      <span className="text-xs font-mono text-[#bbc7c6] uppercase tracking-[0.14em] font-semibold block mb-3">
                        Minh chứng &amp; kết quả thực tế:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {projectCase.evidence.map((ev, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-[10px] bg-white/[0.025] border border-white/[0.08] backdrop-blur-md flex items-start gap-3 hover:border-white/[0.18] transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#ffb829] mt-0.5 shrink-0" />
                            <span className="text-xs sm:text-sm text-[#edfffe]/90 leading-relaxed">
                              {ev}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Learning Callout */}
                  <div className="p-6 sm:p-7 rounded-[14px] bg-[#ffb829]/[0.05] border border-[#ffb829]/30 relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb829]/[0.06] rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-2.5 text-[#ffb829] mb-2.5">
                      <Lightbulb className="w-4 h-4 text-[#ffb829]" />
                      <span className="text-xs font-mono uppercase tracking-[0.14em] font-semibold">
                        {cases.labels.learning || "Điều tôi rút ra"}
                      </span>
                    </div>
                    <strong className="text-white text-base sm:text-lg font-medium leading-relaxed block">
                      {projectCase.learning}
                    </strong>
                  </div>

                  {/* Privacy / NDA Disclaimer if specified */}
                  {projectCase.privacyNote && (
                    <div className="p-4 rounded-[10px] bg-white/[0.015] border border-dashed border-white/20 flex items-start gap-3 text-xs text-[#bbc7c6] leading-relaxed mb-6">
                      <ShieldAlert className="w-4 h-4 text-[#ffb829] shrink-0 mt-0.5" />
                      <span>{projectCase.privacyNote}</span>
                    </div>
                  )}

                  {/* Source Links in Outcome Section */}
                  {projectItem.links && projectItem.links.length > 0 && (
                    <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                      {projectItem.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            idx === 0
                              ? "btn-primary-liquid text-xs py-2.5 px-5 group"
                              : "btn-secondary-liquid text-xs py-2.5 px-5 group"
                          }
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Navigation Between Projects (Pagination) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 pb-10 border-t border-white/[0.08]">
            <Link
              href={`/projects/${prevProject.id}/`}
              className="liquid-glass-card p-6 block group hover:border-[#8052ff]/50 transition-all text-left"
            >
              <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.14em] mb-2 group-hover:text-[#8052ff] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>{cases.labels.previous || "Dự án trước"}</span>
              </span>
              <h4 className="heading-sub text-lg sm:text-xl text-white group-hover:text-white transition-colors font-medium">
                {prevProject.title}
              </h4>
              <span className="inline-block mt-3 text-[10px] font-mono uppercase text-[#bbc7c6]/70">
                {prevProject.phaseLabel || prevProject.phase}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.id}/`}
              className="liquid-glass-card p-6 block group hover:border-[#00e5ff]/50 transition-all text-right"
            >
              <span className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-[0.14em] mb-2 group-hover:text-[#00e5ff] transition-colors flex items-center justify-end gap-1.5">
                <span>{cases.labels.next || "Dự án tiếp theo"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <h4 className="heading-sub text-lg sm:text-xl text-white group-hover:text-white transition-colors font-medium">
                {nextProject.title}
              </h4>
              <span className="inline-block mt-3 text-[10px] font-mono uppercase text-[#bbc7c6]/70">
                {nextProject.phaseLabel || nextProject.phase}
              </span>
            </Link>
          </div>

          {/* Project Inquiry CTA Banner */}
          <div className="liquid-glass-card p-8 sm:p-12 text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#8052ff]/15 blur-3xl pointer-events-none" />
            <span className="eyebrow-auros text-xs text-[#ffb829] justify-center mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{cases.labels.contactEyebrow || "TRAO ĐỔI VỀ DỰ ÁN"}</span>
            </span>
            <h3 className="heading-display text-2xl sm:text-3xl lg:text-4xl text-white max-w-2xl mx-auto mb-6 leading-snug">
              {cases.labels.contactTitle || "Muốn biết tôi sẽ áp dụng cách làm này vào bài toán của bạn?"}
            </h3>
            <Link
              href="/#contact"
              className="btn-primary-liquid text-xs sm:text-sm py-3.5 px-8 inline-flex items-center gap-2"
            >
              <span>{cases.labels.contactButton || "Liên hệ với tôi"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
