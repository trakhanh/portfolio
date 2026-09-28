"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import { Mail, Phone, Check, Copy, ArrowUpRight, Cpu } from "lucide-react";

export function ContactSection() {
  const { content } = useLanguage();
  const { contact } = content;
  const [copied, setCopied] = useState(false);

  const email = contact.email || "khanhtra229@gmail.com";
  const phone = contact.phone || "0792 661 744";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Ambient Aurora Blob */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] rounded-full bg-[#8052ff]/10 blur-[150px] pointer-events-none fluid-blob-iris" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Recessed Liquid Glass Well Card with Master Dossier Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-card p-8 sm:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Invitation (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="chip-liquid mb-4 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
                <span className="text-[12px] font-medium tracking-[0.12em]">{contact.eyebrow}</span>
              </div>

              <h2 className="heading-display text-3xl sm:text-5xl lg:text-[56px] text-white tracking-[-0.04em] leading-[1.05] mb-6">
                {contact.title}
              </h2>

              <p className="text-body-auros text-base sm:text-lg leading-[1.4] mb-8 max-w-xl">
                {contact.intro}
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  href={`mailto:${email}`}
                  className="btn-primary-liquid"
                >
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="btn-secondary-liquid text-[#ffb829] border-[#ffb829]/30 hover:border-[#ffb829]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-secondary-liquid cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#00ffaa]" />
                      <span>{contact.copied || "Đã sao chép!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#bbc7c6]" />
                      <span>{contact.cta || "Sao chép email"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Transmission Dossier Card (6 Cols - Matching GitHub master) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="p-6 sm:p-8 rounded-[14px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5 font-mono text-[11px] tracking-[0.12em]">
                  <span className="text-white font-medium">TRANSMISSION DOSSIER</span>
                  <span className="text-[#00ffaa] flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_6px_#00ffaa] animate-pulse" />
                    ONLINE // READY
                  </span>
                </div>

                {/* Channels List */}
                <div className="flex flex-col gap-3 mb-6">
                  {/* Channel: Email */}
                  <a
                    href={`mailto:${email}`}
                    className="p-3.5 rounded-[8px] bg-black/40 border border-white/[0.08] hover:border-[#8052ff]/50 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-[#8052ff]/15 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <small className="font-mono text-[10px] text-[#bbc7c6] uppercase tracking-wider">
                          DIRECT INBOX
                        </small>
                        <strong className="text-xs sm:text-sm font-medium text-white group-hover:text-[#8052ff] transition-colors">
                          {email}
                        </strong>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#bbc7c6] group-hover:text-white transition-colors" />
                  </a>

                  {/* Channel: Phone / Zalo */}
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="p-3.5 rounded-[8px] bg-black/40 border border-white/[0.08] hover:border-[#ffb829]/50 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-[#ffb829]/15 border border-[#ffb829]/30 flex items-center justify-center text-[#ffb829]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <small className="font-mono text-[10px] text-[#bbc7c6] uppercase tracking-wider">
                          HOTLINE / ZALO
                        </small>
                        <strong className="text-xs sm:text-sm font-medium text-white group-hover:text-[#ffb829] transition-colors">
                          {phone}
                        </strong>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#bbc7c6] group-hover:text-white transition-colors" />
                  </a>

                  {/* Channel: Core Stack */}
                  <div className="p-3.5 rounded-[8px] bg-black/40 border border-white/[0.08] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <small className="font-mono text-[10px] text-[#bbc7c6] uppercase tracking-wider">
                        CORE CAPABILITIES
                      </small>
                      <strong className="text-xs sm:text-sm font-medium text-[#00e5ff]">
                        Applied AI · AI Automation · ERP
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Social Chips Grid */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <span className="font-mono text-[10px] text-[#bbc7c6] uppercase tracking-[0.14em] block mb-3">
                    MẠNG XÃ HỘI &amp; KÊNH CHUYÊN MÔN
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {contact.github && (
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip-liquid hover:bg-white/10 hover:text-white flex items-center justify-between p-2.5 transition-all group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">GitHub</span>
                          <span className="text-[10px] font-mono text-[#bbc7c6]">trakhanh</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}

                    {contact.linkedin && (
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip-liquid hover:bg-white/10 hover:text-white flex items-center justify-between p-2.5 transition-all group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">LinkedIn</span>
                          <span className="text-[10px] font-mono text-[#bbc7c6]">khanhtra229</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}

                    {contact.facebook && (
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip-liquid hover:bg-white/10 hover:text-white flex items-center justify-between p-2.5 transition-all group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">Facebook</span>
                          <span className="text-[10px] font-mono text-[#bbc7c6]">kthietkek</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
