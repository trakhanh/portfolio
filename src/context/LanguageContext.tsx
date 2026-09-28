"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, PortfolioContent, CaseStudyData } from "@/types/portfolio";
import { PORTFOLIO_CONTENT } from "@/data/portfolio";
import { PROJECT_CASES } from "@/data/project-cases";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: PortfolioContent;
  cases: CaseStudyData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("preferred_language");
      if (saved === "vi" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("preferred_language", newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore localStorage errors
    }
  };

  const toggleLocale = () => {
    const next = locale === "vi" ? "en" : "vi";
    setLocale(next);
  };

  const content = (PORTFOLIO_CONTENT as unknown as Record<Locale, PortfolioContent>)[locale] || (PORTFOLIO_CONTENT as unknown as Record<Locale, PortfolioContent>).vi;
  const cases = (PROJECT_CASES as unknown as Record<Locale, CaseStudyData>)[locale] || (PROJECT_CASES as unknown as Record<Locale, CaseStudyData>).vi;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, content, cases }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
