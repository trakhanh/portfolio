"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Mail, Check, Copy, ArrowUpRight, ArrowRight } from "lucide-react";

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
    <section
      id="contact"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#8052ff]/10 blur-[100px] pointer-events-none" />

          <div className="max-w-3xl flex flex-col gap-6 text-left relative z-10">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase">
              {contact.eyebrow}
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {contact.title}
            </h2>

            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {contact.intro}
            </p>

            {/* Email Action Pill Box */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 bg-[#8052ff] hover:bg-[#9269ff] text-white px-8 py-4 rounded-full text-sm font-medium tracking-[0.025em] uppercase shadow-[0_4px_25px_rgba(128,82,255,0.3)] hover:shadow-[0_4px_35px_rgba(128,82,255,0.5)] transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-white px-6 py-4 rounded-full text-xs font-medium uppercase tracking-[0.025em] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#ffb829]" />
                    <span className="text-[#ffb829]">{contact.copied || "Đã sao chép!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9a9a9a]" />
                    <span>{contact.cta || "Sao chép email"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Network Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-white/10">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-light text-[#bdbdbd] hover:text-white transition-colors"
                >
                  <Image
                    src="/img/tool-icons/linkedin.svg"
                    alt="LinkedIn"
                    width={15}
                    height={15}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9a9a9a]" />
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-light text-[#bdbdbd] hover:text-white transition-colors"
                >
                  <Image
                    src="/img/tool-icons/github.svg"
                    alt="GitHub"
                    width={15}
                    height={15}
                    className="w-3.5 h-3.5 object-contain invert"
                  />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9a9a9a]" />
                </a>
              )}

              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-light text-[#bdbdbd] hover:text-white transition-colors"
                >
                  <Image
                    src="/img/tool-icons/facebook.svg"
                    alt="Facebook"
                    width={15}
                    height={15}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9a9a9a]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
