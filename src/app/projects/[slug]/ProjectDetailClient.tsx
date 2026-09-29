"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lightbulb, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { asset } from "@/data/ui-strings";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Reveal, EASE_OUT } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

/* Icons for each technology entry in the case data */
const TECH_ICONS: Record<string, string[]> = {
  Python: ["python.svg"],
  YOLOv8: ["ultralytics.svg"],
  OpenCV: ["opencv.svg"],
  PyTorch: ["pytorch.svg"],
  "Jupyter / Kaggle": ["jupyter.svg", "kaggle.svg"],
  Streamlit: ["streamlit.svg"],
  n8n: ["n8n.svg"],
  "GPT / Gemini": ["openai.svg", "googlegemini.svg"],
  Supabase: ["supabase.svg"],
  "Website / Facebook": ["webapp.svg", "facebook.svg"],
  "Google Apps Script": ["googleappsscript.svg"],
  "Sheets API": ["googlesheets.svg"],
  "Calendar API": ["googlecalendar.svg"],
  "Email Automation": ["gmail.svg"],
  "Landing Page": ["webapp.svg"],
  "Responsive Web": ["webapp.svg"],
  "JavaScript / Web App": ["javascript.svg", "webapp.svg"],
  "ERP / HRM Model": ["erp.svg", "hrm.svg"],
  RBAC: ["rbac.svg"],
  "Workflow / API": ["api.svg"],
  "ChatGPT / Claude": ["openai.svg", "anthropic.svg"],
  "Gemini / NotebookLM": ["googlegemini.svg", "notebooklm.svg"],
  Antigravity: ["antigravity.svg"],
  "AI Visual / Voice": ["visual.svg", "voice.svg"],
  CNN: ["dl.svg"],
  "VGG16 / ResNet50": ["dl.svg"],
  "U-Net": ["vision.svg"],
  "Remotion / React": ["video.svg", "javascript.svg"],
  "Node.js / FFmpeg": ["javascript.svg", "video.svg"],
  Gemini: ["googlegemini.svg"],
  "Groq Whisper": ["voice.svg"],
  "Python / PyQt6": ["python.svg"],
  "faster-whisper / CTranslate2": ["voice.svg"],
  "Demucs / NLLB-200": ["dl.svg", "api.svg"],
  "Edge-TTS / Gemini TTS": ["voice.svg", "googlegemini.svg"],
  "Python / FastAPI": ["python.svg", "api.svg"],
  "EPUB / BeautifulSoup": ["data.svg"],
};

const SECTIONS = ["challenge", "role", "process", "technology", "outcome"] as const;
type SectionId = (typeof SECTIONS)[number];

/** Reading section: small index + heading, then comfortable body copy. */
function Section({ id, index, title, children }: { id: SectionId; index: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-mist/10 py-14 first:border-t-0 first:pt-0 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.12em] text-signal">{String(index + 1).padStart(2, "0")}</p>
        <h2 className="mt-2 text-3xl leading-tight tracking-[-0.02em] sm:text-[34px]">{title}</h2>
      </Reveal>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-md bg-signal/12 text-signal">
        <Check className="size-3" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function ProjectDetailClient({ slug }: { slug: string }) {
  const { content, cases, ui } = useLanguage();
  const [active, setActive] = useState<SectionId>("challenge");

  const all = content.projects.items;
  const idx = all.findIndex((p) => p.id === slug);
  const item = all[idx];
  const data = cases.items[slug];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [slug]);

  if (!item || !data) notFound();

  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const L = cases.labels;
  const titles: Record<SectionId, string> = {
    challenge: L.challenge,
    role: L.roleSection,
    process: L.process,
    technology: L.technology,
    outcome: L.outcome,
  };
  const facts = [
    { label: L.role, value: data.role },
    { label: L.result, value: item.result, accent: true },
    { label: L.scope, value: item.phase === "foundation" ? L.academic : item.phase === "product" ? L.product : L.professional },
  ];

  return (
    <>
      <Navbar onHome={false} />

      <main className="pt-28 sm:pt-32">
        {/* Header */}
        <header className="container-auros max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
            <Button asChild variant="ghost" size="sm" className="-ml-3.5">
              <Link href="/#projects">
                <ArrowLeft />
                {L.back}
              </Link>
            </Button>
            <p className="font-mono text-xs tracking-[0.1em] text-silver uppercase">
              <span className="text-signal">{String(idx + 1).padStart(2, "0")}</span> / {String(all.length).padStart(2, "0")} · {item.phaseLabel}
            </p>
          </motion.div>

          <SplitText as="h1" immediate delay={0.1} text={item.title} className="mt-10 max-w-[22ch] text-heading-lg" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT }}
            className="mt-6 max-w-[64ch] text-lg leading-relaxed text-silver"
          >
            {item.description}
          </motion.p>
          {item.links && item.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE_OUT }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {item.links.map((link, i) => (
                <Button key={link.url} asChild variant={i === 0 ? "default" : "glass"}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label.replace(" ↗", "")}
                    <ArrowUpRight />
                  </a>
                </Button>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.45, duration: 1.1, ease: EASE_OUT }}
            className="mt-12 overflow-hidden rounded-2xl border border-mist/10"
          >
            <Image
              src={asset(item.image)}
              alt={`${L.imageCaption} — ${item.title}`}
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 1200px) 1150px, 100vw"
              className="h-auto w-full"
            />
          </motion.div>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="bg-deep px-6 py-5">
                <dt className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{f.label}</dt>
                <dd className={cn("mt-2 leading-snug font-medium", f.accent ? "text-lavender" : "text-white")}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Body: sticky contents + reading column */}
        <div className="container-auros mt-16 grid max-w-[1200px] gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label={L.map} className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{L.map}</p>
              <ol className="relative mt-5 border-l border-mist/10">
                {SECTIONS.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "relative block py-2.5 pl-5 text-sm transition-colors",
                        active === id ? "text-white" : "text-silver hover:text-white",
                      )}
                    >
                      {active === id && (
                        <motion.span
                          layoutId="toc-active"
                          className="absolute top-0 bottom-0 -left-px w-0.5 bg-signal"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="mr-2 font-mono text-xs text-slate">{String(i + 1).padStart(2, "0")}</span>
                      {titles[id]}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[760px] text-[17px] leading-[1.75] text-mist/90">
            <Section id="challenge" index={0} title={titles.challenge}>
              <Reveal>
                <p className="border-l-2 border-signal pl-6 text-xl leading-relaxed text-white sm:text-[22px]">{data.challenge}</p>
              </Reveal>
            </Section>

            <Section id="role" index={1} title={titles.role}>
              <Reveal>
                <p className="text-white">{data.role}</p>
              </Reveal>
              <ul className="mt-6 space-y-4">
                {data.responsibilities.map((r) => (
                  <CheckItem key={r}>{r}</CheckItem>
                ))}
              </ul>
            </Section>

            <Section id="process" index={2} title={titles.process}>
              <ol className="relative space-y-8 border-l border-mist/12 pl-9">
                {data.process.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span className="absolute top-0.5 -left-[50px] grid size-7 place-items-center rounded-full border border-signal/50 bg-abyss font-mono text-xs text-signal">
                      {i + 1}
                    </span>
                    <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">
                      {ui.step} {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl leading-snug">{step.title}</h3>
                    <p className="mt-2 text-silver">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="technology" index={3} title={titles.technology}>
              <ul className="divide-y divide-mist/10 rounded-2xl border border-mist/10">
                {data.technologies.map((t) => (
                  <li key={t.name} className="flex gap-5 p-5 transition-colors hover:bg-mist/[0.03]">
                    <div className="flex shrink-0 gap-1.5">
                      {(TECH_ICONS[t.name] ?? []).map((ic) => (
                        <span key={ic} className="grid size-10 place-items-center rounded-lg bg-mist/95">
                          <Image src={`/img/tool-icons/${ic}`} alt="" width={20} height={20} className="size-5 object-contain" />
                        </span>
                      ))}
                      {!TECH_ICONS[t.name] && (
                        <span className="grid size-10 place-items-center rounded-lg border border-mist/10 bg-deep font-mono text-[10px] text-signal">
                          {t.name.slice(0, 4)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">{t.name}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-silver">{t.purpose}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="outcome" index={4} title={titles.outcome}>
              <Reveal>
                <p className="text-white">{data.outcome}</p>
              </Reveal>
              {data.evidence.length > 0 && (
                <>
                  <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{ui.evidence}</p>
                  <ul className="mt-3 space-y-3">
                    {data.evidence.map((e) => (
                      <CheckItem key={e}>{e}</CheckItem>
                    ))}
                  </ul>
                </>
              )}
              <Reveal className="mt-10">
                <div className="rounded-2xl border border-lavender/25 bg-lavender/[0.05] p-6 sm:p-7">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-lavender uppercase">
                    <Lightbulb className="size-4" />
                    {L.learning}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-white">{data.learning}</p>
                </div>
              </Reveal>
              {data.privacyNote && (
                <p className="mt-6 flex gap-3 rounded-xl border border-dashed border-mist/20 p-4 text-sm leading-relaxed text-silver">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0" />
                  {data.privacyNote}
                </p>
              )}
            </Section>
          </article>
        </div>

        {/* Prev / next + CTA */}
        <div className="container-auros mt-10 max-w-[1200px]">
          <div className="grid gap-4 border-t border-mist/10 py-14 sm:grid-cols-2">
            {[
              { p: prev, label: L.previous, dir: "prev" as const },
              { p: next, label: L.next, dir: "next" as const },
            ].map(({ p, label, dir }) => (
              <Link
                key={dir}
                href={`/projects/${p.id}/`}
                className={cn(
                  "group flex items-center gap-5 overflow-hidden rounded-2xl border border-mist/10 bg-deep/60 p-4 transition-colors hover:border-signal/40",
                  dir === "next" && "sm:flex-row-reverse sm:text-right",
                )}
              >
                <span className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image src={asset(p.image)} alt="" fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="min-w-0">
                  <span className={cn("flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-slate uppercase", dir === "next" && "sm:justify-end")}>
                    {dir === "prev" && <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />}
                    {label}
                    {dir === "next" && <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />}
                  </span>
                  <span className="mt-2 block text-lg leading-tight font-medium text-white">{p.title}</span>
                </span>
              </Link>
            ))}
          </div>

          <Reveal className="pb-24">
            <div className="glass-deep flex flex-col items-center px-6 py-16 text-center sm:py-20">
              <p className="label-caps !text-signal">{L.contactEyebrow}</p>
              <h2 className="mt-5 max-w-[24ch] text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">{L.contactTitle}</h2>
              <Button asChild size="lg" className="mt-8">
                <Link href="/#contact">
                  {L.contactButton}
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
