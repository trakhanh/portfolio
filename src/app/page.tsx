import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SystemSection } from "@/components/SystemSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-fg">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SystemSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
