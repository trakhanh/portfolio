"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ExternalLink, Globe } from "lucide-react";

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

  // Prevent background scroll when mobile menu is open
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
    { id: "systems", label: content.nav.systems, num: "01" },
    { id: "experience", label: content.nav.experience, num: "02" },
    { id: "projects", label: content.nav.projects, num: "03" },
    { id: "proof", label: content.nav.proof, num: "04" },
    { id: "contact", label: content.nav.contact, num: "05" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-cyber-border py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/#top"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Trang chủ Gia Khánh"
          >
            <div className="w-9 h-9 relative flex items-center justify-center border border-cyber-border group-hover:border-cyber-accent transition-colors bg-cyber-card cyber-chamfer-sm">
              <Image
                src="/img/logo-gk.svg"
                alt="Logo GK"
                width={24}
                height={24}
                className="w-6 h-6 object-contain group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] transition-all"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wider group-hover:text-cyber-accent transition-colors">
                Gia Khánh
              </span>
              <span className="text-[10px] font-mono text-cyber-muted-fg tracking-widest uppercase">
                AI · ERP · R&amp;D
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 border border-cyber-border bg-[#101018]/80 backdrop-blur-md px-3 py-1.5 cyber-chamfer-sm">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="px-3 py-1.5 text-xs font-mono tracking-wider text-cyber-muted-fg hover:text-cyber-accent hover:bg-cyber-accent/10 transition-all cyber-chamfer-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language & CV & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLocale}
              type="button"
              className="relative flex items-center border border-cyber-border bg-cyber-card px-2 py-1 text-xs font-mono text-cyber-muted-fg hover:border-cyber-accent transition-colors cyber-chamfer-sm cursor-pointer"
              title="Đổi ngôn ngữ / Switch language"
            >
              <Globe className="w-3 h-3 mr-1.5 text-cyber-accent" />
              <span
                className={`px-1 py-0.5 font-bold transition-colors ${
                  locale === "vi"
                    ? "text-black bg-cyber-accent cyber-chamfer-sm"
                    : "text-cyber-muted-fg"
                }`}
              >
                VI
              </span>
              <span className="mx-0.5 text-cyber-subtle">/</span>
              <span
                className={`px-1 py-0.5 font-bold transition-colors ${
                  locale === "en"
                    ? "text-black bg-cyber-accent cyber-chamfer-sm"
                    : "text-cyber-muted-fg"
                }`}
              >
                EN
              </span>
            </button>

            {/* Desktop CV Button */}
            <a
              href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 border border-cyber-accent/40 bg-cyber-accent/10 px-3.5 py-1.5 text-xs font-mono text-cyber-accent hover:bg-cyber-accent hover:text-black transition-all cyber-chamfer-sm"
            >
              <span>{content.hero.cv}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 border border-cyber-border bg-cyber-card text-cyber-fg hover:border-cyber-accent hover:text-cyber-accent transition-colors cyber-chamfer-sm cursor-pointer"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Cyberpunk HUD Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#050508]/90 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-20"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-accent animate-ping" />
                <span className="text-xs font-mono text-cyber-accent tracking-widest">
                  // ROUTER // SYS_NODES [ONLINE]
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                type="button"
                className="p-2 border border-cyber-border text-cyber-muted-fg hover:text-cyber-accent hover:border-cyber-accent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex flex-col gap-4 py-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="flex items-center justify-between p-3.5 border border-cyber-border/70 bg-cyber-card/70 hover:border-cyber-accent hover:bg-cyber-accent/10 transition-all cyber-chamfer-sm group"
                >
                  <span className="font-heading text-lg font-semibold text-white group-hover:text-cyber-accent transition-colors">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-cyber-muted-fg group-hover:text-cyber-accent">
                    {item.num} //
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Footer Drawer */}
            <div className="border-t border-cyber-border pt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyber-muted-fg">
                <span>LOC // HCMC, VN</span>
                <span>PORTFOLIO v2026</span>
              </div>

              <a
                href="https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-accent text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#33ff9f] cyber-chamfer-sm"
              >
                <span>{content.hero.cv}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
