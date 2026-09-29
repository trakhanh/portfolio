"use client";

import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CursorGlow } from "@/components/motion/CursorGlow";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
      <SmoothScroll />
      <CursorGlow />
      <LanguageProvider>
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
