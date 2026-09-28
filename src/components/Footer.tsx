"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-14 bg-black border-t border-white/[0.06] text-xs font-extralight text-[#9a9a9a]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#8052ff]" />
          <span>{footer.copyright || "© 2026 Trà Nguyễn Gia Khánh."}</span>
        </div>

        {/* Built With */}
        <div className="text-center sm:text-left text-[#9a9a9a]/70">
          <span>{footer.builtWith || "Next.js · TypeScript · shadcn/ui · Motion · GitHub Pages"}</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/25 hover:text-white transition-all cursor-pointer"
        >
          <span>{footer.top || "Về đầu trang"}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
