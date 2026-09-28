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
      setScrolled(window.scrollY > 24);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#000000]/80 backdrop-blur-lg border-b border-white/10 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="/#top"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Gia Khánh Portfolio"
          >
            <div className="w-8 h-8 relative flex items-center justify-center rounded-full bg-[#121216] border border-white/15 group-hover:border-[#8052ff] transition-all">
              <Image
                src="/img/logo-gk.svg"
                alt="Gia Khánh Logo"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-sans font-medium text-white tracking-tight">
                Gia Khánh
              </span>
              <span className="text-[11px] font-mono text-[#9a9a9a] uppercase tracking-wider">
                AI × ERP
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="text-[13px] font-sans font-medium uppercase tracking-[0.06em] text-[#9a9a9a] hover:text-[#ffffff] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#9a9a9a] hover:text-white border border-white/10 bg-white/5 transition-all cursor-pointer"
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

            {/* Filled Violet Pill CTA Button (From DESIGN.md) */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 btn-pill-primary text-xs uppercase tracking-wider"
            >
              <span>{content.hero.cv}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 text-white hover:border-[#8052ff] transition-all cursor-pointer"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#000000]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28"
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
                className="w-full flex items-center justify-center gap-2 btn-pill-primary text-center"
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
