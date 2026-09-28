"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";

export function Navbar() {
  const { locale, toggleLocale, content } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: "systems", label: content.nav.systems },
    { id: "projects", label: content.nav.projects },
    { id: "experience", label: content.nav.experience },
    { id: "proof", label: content.nav.proof },
    { id: "contact", label: content.nav.contact },
  ];

  return (
    <>
      {/* Floating Liquid Glass Island / Capsule Header */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1120px] liquid-glass-nav py-2 px-4 sm:px-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="/#top"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Gia Khánh Portfolio"
          >
            <div className="w-8 h-8 relative flex items-center justify-center rounded-full bg-white/[0.08] border border-white/20 group-hover:border-[#8052ff] group-hover:shadow-[0_0_15px_rgba(128,82,255,0.6)] transition-all">
              <Image
                src="/img/logo-gk.svg"
                alt="Gia Khánh Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-sans font-medium text-white tracking-tight leading-tight">
                Gia Khánh
              </span>
              <span className="text-[10px] font-mono text-[#ffb829] uppercase tracking-wider">
                AI · ERP
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="text-[13px] font-sans font-medium uppercase tracking-[0.05em] text-[#a0a0aa] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language & Liquid CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#a0a0aa] hover:text-white border border-white/15 bg-white/[0.06] hover:bg-white/10 transition-all cursor-pointer"
              title="Đổi ngôn ngữ / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#ffb829]" />
              <span className={locale === "vi" ? "text-white font-bold" : "text-[#777]"}>
                VI
              </span>
              <span className="text-white/20">/</span>
              <span className={locale === "en" ? "text-white font-bold" : "text-[#777]"}>
                EN
              </span>
            </button>

            {/* Liquid Primary Pill CTA */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-liquid-primary !py-2 !px-4 text-xs uppercase tracking-wider"
            >
              <span>{content.hero.cv}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-white/10 text-white hover:border-[#8052ff] transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Liquid Glass Menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#000000]/90 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-[#ffb829] tracking-widest uppercase">
                // NAVIGATION
              </span>
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display text-white hover:text-[#8052ff] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
              <a
                href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 btn-liquid-primary text-center"
              >
                <span>{content.hero.cv}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
