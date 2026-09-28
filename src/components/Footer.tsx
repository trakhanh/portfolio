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
    <footer className="py-12 border-t border-white/10 bg-[#000000] text-xs font-mono text-[#9a9a9a]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo-gk.svg"
            alt="Logo GK"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          <span className="text-white/80">
            {footer.copyright || "© 2026 Trà Nguyễn Gia Khánh."}
          </span>
        </div>

        {/* Tech attribution */}
        <div className="text-center sm:text-left text-[#666]">
          <span>AI × ERP Operating System · Constellation on Black Velvet</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#9a9a9a] hover:text-white transition-colors cursor-pointer"
        >
          <span>{footer.top || "Về đầu trang"}</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#ffb829]" />
        </button>
      </div>
    </footer>
  );
}
