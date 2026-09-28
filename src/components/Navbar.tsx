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
      {/* Site Header: 80px height, instrument border, transparent/obsidian canvas */}
      <header
        className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-colors duration-200 ${
          scrolled
            ? "bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08]"
            : "bg-[#000000]/60 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/#top"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Gia Khánh Portfolio"
          >
            <div className="w-8 h-8 rounded-[6px] bg-[#0f0f18] border border-white/10 flex items-center justify-center group-hover:border-[#8052ff] transition-colors">
              <Image
                src="/img/logo-gk.svg"
                alt="Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-white tracking-[0.04em] uppercase">
                Gia Khánh
              </span>
              <span className="text-[10px] font-mono text-[#ffb829] uppercase tracking-[0.15em]">
                AI · ERP OS
              </span>
            </div>
          </Link>

          {/* Center Ghost Navigation Links: 12px Matter 500, uppercase, tracking 0.12em */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#bbc7c6] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Language & Signature CTA Button (6px radius) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] text-[11px] font-mono text-[#bbc7c6] hover:text-white border border-white/10 bg-[#0f0f18] hover:bg-[#141420] transition-colors cursor-pointer"
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

            {/* Signature Primary CTA (6px border-radius) */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary-auros !py-2 !px-4 text-[12px] tracking-[0.1em]"
            >
              <span>{content.hero.cv}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-[6px] border border-white/10 bg-[#0f0f18] text-white hover:border-[#8052ff] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#000000]/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono text-[#ffb829] tracking-[0.15em] uppercase">
                // AUROS_TERMINAL_NAVIGATION
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
                className="btn-primary-auros w-full justify-center"
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
