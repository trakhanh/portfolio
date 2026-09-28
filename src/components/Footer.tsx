"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 sm:py-20 border-t border-white/[0.08] bg-[#08080d] text-xs font-mono text-[#bbc7c6]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-[4px] bg-[#0f0f18] border border-white/10 flex items-center justify-center">
            <Image
              src="/img/logo-gk.svg"
              alt="Logo GK"
              width={16}
              height={16}
              className="w-3.5 h-3.5 object-contain"
            />
          </div>
          <span className="text-white/90">
            {footer.copyright || "© 2026 Trà Nguyễn Gia Khánh."}
          </span>
        </div>

        {/* Tech attribution */}
        <div className="text-center sm:text-left text-[#707777] uppercase tracking-[0.12em]">
          <span>AI × ERP OPERATING SYSTEM · TERMINAL SPECIFICATION</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#bbc7c6] hover:text-white transition-colors cursor-pointer"
        >
          <span>{footer.top || "Về đầu trang"}</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#ffb829]" />
        </button>
      </div>
    </footer>
  );
}
