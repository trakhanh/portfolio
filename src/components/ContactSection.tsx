"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
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
    <section id="contact" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Recessed Well Surface Card: Level 1 (#08080d), 16px radius, generous padding */}
        <div className="rounded-[16px] bg-[#08080d] border border-white/[0.08] p-8 sm:p-14 lg:p-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="eyebrow-auros mb-4 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span>{contact.eyebrow}</span>
            </div>

            {/* Display Headline (61px, weight 500, line-height 1.0, tracking -0.04em) */}
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0] mb-6">
              {contact.title}
            </h2>

            {/* Body */}
            <p className="text-body-auros text-base sm:text-lg leading-[1.4] mb-10 max-w-xl">
              {contact.intro}
            </p>

            {/* Email Actions: 6px border-radius */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href={`mailto:${contact.email}`}
                className="btn-primary-auros"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary-auros cursor-pointer"
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

            {/* Social Ghost Links: 6px radius */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-white/[0.08]">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip-auros hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
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
                  className="chip-auros hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
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
                  className="chip-auros hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb829]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
