"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Mail,
  Check,
  Copy,
  Send,
  Terminal,
} from "lucide-react";

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
      className="py-20 border-b border-cyber-border bg-[#07070c] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Terminal Shell Container */}
        <div className="border border-cyber-border-bright bg-[#0d0d16] p-6 sm:p-10 cyber-chamfer relative overflow-hidden">
          {/* Decorative Corner LEDs */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
          </div>

          <div className="mt-4 flex flex-col gap-4 text-left max-w-3xl">
            <Badge variant="cyan" className="w-fit font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 mr-1" />
              {contact.eyebrow}
            </Badge>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide uppercase">
              {contact.title}
            </h2>

            <p className="font-mono text-sm sm:text-base text-cyber-fg/80 leading-relaxed">
              {contact.intro}
            </p>

            {/* Email Console Box */}
            <div className="my-4 p-4 border border-cyber-border bg-[#06060a] flex flex-wrap items-center justify-between gap-4 cyber-chamfer-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-cyber-accent/40 bg-cyber-accent/10 flex items-center justify-center text-cyber-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-wider block">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono font-bold text-sm sm:text-lg text-white hover:text-cyber-accent transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Copy & Send CTAs */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyber-accent" />
                      <span>{contact.copied || "Đã sao chép!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{contact.cta || "Sao chép"}</span>
                    </>
                  )}
                </Button>

                <Button asChild size="sm" className="gap-1.5">
                  <a href={`mailto:${contact.email}`}>
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi thư</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Social Network Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-cyber-border bg-cyber-card px-3.5 py-2 text-xs font-mono text-cyber-fg hover:border-cyber-accent hover:text-cyber-accent transition-colors cyber-chamfer-sm"
                >
                  <Image
                    src="/img/tool-icons/linkedin.svg"
                    alt="LinkedIn"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                  <span>LinkedIn</span>
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-cyber-border bg-cyber-card px-3.5 py-2 text-xs font-mono text-cyber-fg hover:border-cyber-accent hover:text-cyber-accent transition-colors cyber-chamfer-sm"
                >
                  <Image
                    src="/img/tool-icons/github.svg"
                    alt="GitHub"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain invert"
                  />
                  <span>GitHub</span>
                </a>
              )}

              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-cyber-border bg-cyber-card px-3.5 py-2 text-xs font-mono text-cyber-fg hover:border-cyber-accent hover:text-cyber-accent transition-colors cyber-chamfer-sm"
                >
                  <Image
                    src="/img/tool-icons/facebook.svg"
                    alt="Facebook"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
