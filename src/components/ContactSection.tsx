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
    <section id="contact" className="py-28 sm:py-36 bg-[#000000] relative overflow-hidden">
      {/* Background fluid glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] rounded-full bg-[#8052ff]/10 blur-[150px] pointer-events-none fluid-blob-iris" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-3xl liquid-glass-card p-8 sm:p-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 liquid-glass-tag">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829]">
              {contact.eyebrow}
            </span>
          </div>

          {/* Monumental Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-display text-white tracking-[-0.04em] leading-[1.08] mb-6">
            {contact.title}
          </h2>

          {/* Ultra-light body */}
          <p className="text-base sm:text-lg text-body-light leading-relaxed mb-10 max-w-xl">
            {contact.intro}
          </p>

          {/* Direct Email Action Box in Liquid Glass */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href={`mailto:${contact.email}`}
              className="btn-liquid-primary"
            >
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-liquid-secondary"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#ffb829]" />
                  <span>{contact.copied || "Đã sao chép!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#a0a0aa]" />
                  <span>{contact.cta || "Sao chép email"}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Liquid Ghost Chips */}
          <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/10">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-[#a0a0aa] hover:text-white liquid-glass-tag hover:border-white/30 flex items-center gap-1.5 transition-all"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
              </a>
            )}

            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-[#a0a0aa] hover:text-white liquid-glass-tag hover:border-white/30 flex items-center gap-1.5 transition-all"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
              </a>
            )}

            {contact.facebook && (
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-[#a0a0aa] hover:text-white liquid-glass-tag hover:border-white/30 flex items-center gap-1.5 transition-all"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
