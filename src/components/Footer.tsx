"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { content } = useLanguage();

  return (
    <footer className="border-t border-mist/10 bg-deep/80 py-12 backdrop-blur-xl">
      <div className="container-auros flex items-center gap-3 text-sm text-silver">
        <div className="flex items-center gap-3">
          <BrandMark className="size-7" />
          <span>
            © {new Date().getFullYear()} {content.footer}
          </span>
        </div>
      </div>
    </footer>
  );
}
