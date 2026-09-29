"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, PortfolioContent, CaseStudyData } from "@/types/portfolio";
import { PORTFOLIO_CONTENT } from "@/data/portfolio";
import { PROJECT_CASES } from "@/data/project-cases";
import { uiStrings, type UiStrings } from "@/data/ui-strings";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: PortfolioContent;
  cases: CaseStudyData;
  ui: UiStrings;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred_language");
      if (saved === "vi" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
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

  const content: PortfolioContent = PORTFOLIO_CONTENT[locale] ?? PORTFOLIO_CONTENT.vi;
  const cases: CaseStudyData = PROJECT_CASES[locale] ?? PROJECT_CASES.vi;
  const ui = uiStrings(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, content, cases, ui }}>
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
