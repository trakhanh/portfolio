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
    <footer className="py-10 border-t border-cyber-border bg-[#050508] relative text-xs font-mono text-cyber-muted-fg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo-gk.svg"
            alt="Logo GK"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          <span>{footer.copyright || "© 2026 Trà Nguyễn Gia Khánh."}</span>
        </div>

        {/* Built With Tech Stack */}
        <div className="text-center sm:text-left text-[11px] text-cyber-muted-fg/80">
          <span>{footer.builtWith || "Next.js · TypeScript · shadcn/ui · Motion · GitHub Pages"}</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-1.5 border border-cyber-border px-3 py-1.5 hover:border-cyber-accent hover:text-cyber-accent transition-colors cyber-chamfer-sm cursor-pointer"
        >
          <span>{footer.top || "Về đầu trang"}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
