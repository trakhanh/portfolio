"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import { Mail, Check, Copy, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const { content } = useLanguage();
  const { contact } = content;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
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
        {/* Recessed Liquid Glass Well Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-card p-8 sm:p-14 lg:p-16"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="chip-liquid mb-4 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span className="text-[12px] font-medium tracking-[0.12em]">{contact.eyebrow}</span>
            </div>

            {/* Display Headline (61px, weight 500, line-height 1.0, tracking -0.04em) */}
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0] mb-6">
              {contact.title}
            </h2>

            {/* Body */}
            <p className="text-body-auros text-base sm:text-lg leading-[1.4] mb-10 max-w-xl">
              {contact.intro}
            </p>

            {/* Email Actions: Liquid Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href={`mailto:${contact.email}`}
                className="btn-primary-liquid"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary-liquid cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#ffb829]" />
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

            {/* Social Ghost Links: Liquid Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-white/[0.08]">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-liquid hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-liquid hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 group"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-liquid hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 group"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
