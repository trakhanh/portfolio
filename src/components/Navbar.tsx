"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Globe } from "lucide-react";

export function Navbar() {
  const { locale, toggleLocale, content } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: "systems", label: content.nav.systems },
    { id: "experience", label: content.nav.experience },
    { id: "projects", label: content.nav.projects },
    { id: "proof", label: content.nav.proof },
    { id: "contact", label: content.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo Lockup */}
          <Link
            href="/#top"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Gia Khánh"
          >
            {/* Triangular glyph brand mark */}
            <div className="w-7 h-7 relative flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300"
              >
                <defs>
                  <linearGradient id="dalaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8052ff" />
                    <stop offset="100%" stopColor="#15846e" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 22,20 2,20"
                  fill="none"
                  stroke="url(#dalaLogoGrad)"
                  strokeWidth="2.5"
                />
                <circle cx="12" cy="13" r="2.5" fill="#8052ff" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-normal text-base text-white tracking-tight">
                Gia Khánh
              </span>
              <span className="text-[11px] font-extralight text-[#9a9a9a] hidden sm:inline">
                / AI × ERP
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Ghost text) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="text-[13px] font-medium tracking-[0.025em] text-[#9a9a9a] hover:text-white uppercase transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Language + Electric Iris Pill Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#9a9a9a] hover:text-white border border-white/10 hover:border-white/25 transition-all cursor-pointer"
              title="Đổi ngôn ngữ / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#8052ff]" />
              <span className={locale === "vi" ? "text-white font-bold" : "text-[#9a9a9a]"}>
                VI
              </span>
              <span className="text-white/20">/</span>
              <span className={locale === "en" ? "text-white font-bold" : "text-[#9a9a9a]"}>
                EN
              </span>
            </button>

            {/* Electric Iris Pill CTA */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#8052ff] hover:bg-[#9269ff] text-white text-[13px] font-medium tracking-[0.025em] uppercase px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(128,82,255,0.25)] hover:shadow-[0_4px_25px_rgba(128,82,255,0.45)] transition-all hover:-translate-y-0.5"
            >
              <span>{content.hero.cv}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/10 hover:border-white/30 transition-colors"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Minimal Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#ffb829] font-medium">
                MENU NAVIGATION
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6 py-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="text-3xl font-normal tracking-tight text-white hover:text-[#8052ff] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <a
                href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#8052ff] text-white py-3.5 rounded-full font-medium text-sm uppercase tracking-wider"
              >
                <span>{content.hero.cv}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-[#9a9a9a] text-center font-extralight">
                Trà Nguyễn Gia Khánh · Applied AI &amp; ERP 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
