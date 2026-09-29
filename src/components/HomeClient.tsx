"use client";

import { useState } from "react";
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

export function HomeClient() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <SplashLoader onDone={() => setReady(true)} />
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
      <ScrollToTop />
    </>
  );
}
