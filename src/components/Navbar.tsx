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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Liquid Glass Header: 80px height, frosted glass with specular highlight */}
      <header
        className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? "liquid-glass-nav"
            : "bg-[#000000]/60 backdrop-blur-md border-b border-white/[0.06]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/#top"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Gia Khánh Portfolio"
          >
            <div className="w-8 h-8 rounded-[6px] bg-white/[0.06] border border-white/15 flex items-center justify-center group-hover:border-[#8052ff] group-hover:shadow-[0_0_15px_rgba(128,82,255,0.5)] transition-all">
              <Image
                src="/img/logo-gk.svg"
                alt="Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-white tracking-[0.04em] uppercase group-hover:text-white transition-colors">
                Gia Khánh
              </span>
              <span className="text-[10px] font-mono text-[#ffb829] uppercase tracking-[0.15em]">
                AI · ERP OS
              </span>
            </div>
          </Link>

          {/* Center Ghost Navigation Links with Liquid Hover Pill */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 p-1.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="relative px-3.5 py-1.5 rounded-[6px] text-[12px] font-medium uppercase tracking-[0.12em] text-[#bbc7c6] hover:text-white transition-all hover:bg-white/[0.06]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Language & Liquid Primary Button (6px radius) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher in Liquid Glass */}
            <button
              onClick={toggleLocale}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[11px] font-mono text-[#bbc7c6] hover:text-white border border-white/15 bg-white/[0.05] hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
              title="Switch language / Đổi ngôn ngữ"
            >
              <Globe className="w-3 h-3 text-[#ffb829]" />
              <span className={locale === "vi" ? "text-white font-medium" : "text-[#707777]"}>
                VI
              </span>
              <span className="text-white/20">/</span>
              <span className={locale === "en" ? "text-white font-medium" : "text-[#707777]"}>
                EN
              </span>
            </button>

            {/* Signature Liquid Primary CTA */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary-liquid !py-2 !px-4 text-[12px] tracking-[0.08em]"
            >
              <span>{content.hero.cv}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-[6px] border border-white/15 bg-white/[0.06] text-white hover:border-[#8052ff] transition-all cursor-pointer backdrop-blur-md"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Liquid Glass backdrop blur) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#000000]/92 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono text-[#ffb829] tracking-[0.15em] uppercase">
                // AUROS_LIQUID_NAVIGATION
              </span>
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-medium text-white hover:text-[#8052ff] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <a
                href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-liquid w-full justify-center"
              >
                <span>{content.hero.cv}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-[#707777] text-center">
                AI × ERP OPERATING SYSTEM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
