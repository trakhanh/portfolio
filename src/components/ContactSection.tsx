"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <section id="contact" className="py-28 sm:py-36 bg-[#000000] relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829] block mb-4">
            {contact.eyebrow}
          </span>

          {/* Monumental Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-display text-white tracking-[-0.04em] leading-[1.04] mb-6">
            {contact.title}
          </h2>

          {/* Ultra-light body */}
          <p className="text-base sm:text-lg text-body-light leading-relaxed mb-10 max-w-xl">
            {contact.intro}
          </p>

          {/* Direct Email Action Box (Minimalist pill on black velvet) */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href={`mailto:${contact.email}`}
              className="btn-pill-primary inline-flex items-center gap-2.5 text-sm uppercase tracking-wider"
            >
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-pill-secondary inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#ffb829]" />
                  <span>{contact.copied || "Đã sao chép!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#9a9a9a]" />
                  <span>{contact.cta || "Sao chép email"}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Ghost Links */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans uppercase tracking-wider text-[#9a9a9a] hover:text-white flex items-center gap-1.5 transition-colors"
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
                className="text-sm font-sans uppercase tracking-wider text-[#9a9a9a] hover:text-white flex items-center gap-1.5 transition-colors"
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
                className="text-sm font-sans uppercase tracking-wider text-[#9a9a9a] hover:text-white flex items-center gap-1.5 transition-colors"
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
