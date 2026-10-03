"use client";

import { useContext, useEffect, useState } from "react";
import { SplashLoader } from "./SplashLoader";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { SkillsSection } from "./SkillsSection";
import { KineticBand } from "./KineticBand";
import { SystemSection } from "./SystemSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProjectsSection } from "./ProjectsSection";
import { CertificatesSection } from "./CertificatesSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { ContactFab } from "./ContactFab";
import { SkipEntranceContext } from "./motion/Reveal";
import { hasVisitedHome, markHomeVisited, rememberHomeScroll } from "@/lib/home-return";

export function HomeClient() {
  const [ready, setReady] = useState(false);
  // Coming back from a case study: this is the same page the visitor already saw,
  // so it should reappear in place instead of replaying every entrance.
  const [returning] = useState(hasVisitedHome);
  const switching = useContext(SkipEntranceContext);

  useEffect(() => {
    markHomeVisited();
    // Note where we were when a project opens, so Back can return to this spot.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a && /\/projects\//.test(a.getAttribute("href") ?? "")) rememberHomeScroll();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <SkipEntranceContext.Provider value={returning || switching}>
      <SplashLoader
        onDone={() => {
          // Back from a case study with the hero far above the viewport: building its
          // particle sphere right now only delays the return transition, so wait
          // until the browser is idle (the hero is ready long before it's scrolled to).
          if (returning && window.scrollY > window.innerHeight * 1.5) {
            const go = () => setReady(true);
            if ("requestIdleCallback" in window) window.requestIdleCallback(go, { timeout: 1500 });
            else setTimeout(go, 900);
          } else setReady(true);
        }}
      />
      <Navbar />
      <main>
        <HeroSection ready={ready} />
        <SkillsSection />
        <KineticBand />
        <SystemSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
      <ContactFab />
      <ScrollToTop />
    </SkipEntranceContext.Provider>
  );
}
