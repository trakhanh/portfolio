"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, FileText, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/ui-strings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SOCIAL_ICONS } from "./icons/SocialIcons";
import { Magnetic } from "./motion/Magnetic";
import { Reveal } from "./motion/Reveal";
import { useLite } from "@/lib/perf";

const ROLES = ["Applied AI", "AI Automation", "ERP / Digital Transformation", "AI Video Production", "R&D"];

type Seg = { t: string; c: string; href?: string };

/** Types the contact object out character by character once it scrolls into view. */
function useTypewriter(total: number, start: boolean, speed = 16) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setN(total);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const next = Math.min(total, Math.floor((now - t0) / speed));
      setN(next);
      if (next < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, total, speed, reduce]);
  return n;
}

/** The typing terminal — isolated so each typed character re-renders only this card. */
function ContactTerminal() {
  const { content, ui } = useLanguage();
  const { hero } = content;
  const [copied, setCopied] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const inView = useInView(termRef, { once: true, margin: "0px 0px -20% 0px" });
  const location = hero.footnote.split(" · ")[0];
  const tel = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  const lines: Seg[][] = useMemo(
    () => [
      [{ t: `// ${ui.channels}`, c: "text-slate" }],
      [
        { t: "const ", c: "text-orchid" },
        { t: "contact", c: "text-white" },
        { t: " = {", c: "text-silver" },
      ],
      [
        { t: "  email: ", c: "text-silver" },
        { t: `"${CONTACT.email}"`, c: "text-signal", href: `mailto:${CONTACT.email}` },
        { t: ",", c: "text-silver" },
      ],
      [
        { t: "  phone: ", c: "text-silver" },
        { t: `"${CONTACT.phone}"`, c: "text-signal", href: tel },
        { t: ",", c: "text-silver" },
      ],
      [
        { t: "  location: ", c: "text-silver" },
        { t: `"${location}"`, c: "text-signal" },
        { t: ",", c: "text-silver" },
      ],
      [
        { t: "  status: ", c: "text-silver" },
        { t: `"${hero.status}"`, c: "text-lavender" },
        { t: ",", c: "text-silver" },
      ],
      [{ t: "};", c: "text-silver" }],
    ],
    [ui.channels, tel, location, hero.status],
  );
  const total = lines.reduce((a, l) => a + l.reduce((b, s) => b + s.t.length, 0) + 1, 0);
  const typed = useTypewriter(total, inView);
  const done = typed >= total;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  // Spend the typed-character budget across lines and segments.
  let budget = typed;
  const rendered = lines.map((line) => {
    const segs = line.map((seg) => {
      const take = Math.max(0, Math.min(seg.t.length, budget));
      budget -= take;
      return { ...seg, shown: seg.t.slice(0, take) };
    });
    const visible = segs.some((s) => s.shown.length > 0);
    budget -= 1; // newline
    return { segs, visible };
  });
  let cursorLine = 0;
  rendered.forEach((l, i) => {
    if (l.visible) cursorLine = i;
  });

  return (
    <div
      ref={termRef}
      className="overflow-hidden rounded-xl border border-mist/12 bg-[#02070b]/95 font-mono text-xs shadow-[0_40px_90px_-40px_rgba(62,230,212,0.45)] sm:text-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-mist/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-mist/20" />
          <span className="size-2.5 rounded-full bg-mist/20" />
          <span className="size-2.5 rounded-full bg-signal" />
        </div>
        <span className="text-xs text-silver">
          <span className="hidden sm:inline">~/gia-khanh/</span>contact.ts
        </span>
        <span className="flex items-center gap-1.5 text-[11px] whitespace-nowrap text-signal">
          <span className="size-1.5 animate-pulse rounded-full bg-signal" />
          {ui.online}
        </span>
      </div>

      <div className="relative min-h-[236px] p-4 leading-7 break-words sm:p-6">
        <p className="sr-only">
          {CONTACT.email} · {CONTACT.phone} · {location}
        </p>
        {rendered.map((line, li) =>
          line.visible || li === cursorLine ? (
            <div key={li} aria-hidden className="flex min-h-7 items-center justify-between gap-3">
              <p className="min-w-0 whitespace-pre-wrap">
                <span className="mr-3 inline-block w-3 text-right text-slate/60 select-none sm:mr-4 sm:w-4">{li + 1}</span>
                {line.segs.map((s, si) =>
                  s.href && done ? (
                    <a key={si} href={s.href} className={cn(s.c, "underline-offset-4 hover:underline")}>
                      {s.shown}
                    </a>
                  ) : (
                    <span key={si} className={s.c}>
                      {s.shown}
                    </span>
                  ),
                )}
                {li === cursorLine && (
                  <motion.span
                    className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-signal"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                  />
                )}
              </p>
              {li === 2 && done && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  type="button"
                  onClick={copy}
                  aria-label={copied ? ui.copied : ui.copyEmail}
                  className="flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-mist/12 px-2 text-[11px] text-silver transition-colors hover:border-signal/50 hover:text-white"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "y" : "n"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5"
                    >
                      {copied ? <Check className="size-3.5 text-signal" /> : <Copy className="size-3.5" />}
                      <span className="hidden sm:inline">{copied ? ui.copied : ui.copyEmail}</span>
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          ) : null,
        )}
      </div>

      <div className="border-t border-mist/10 p-3 sm:p-4">
        <p className="px-2 pb-2 text-[11px] tracking-[0.12em] text-slate uppercase">$ {ui.socials}</p>
        <ul className="grid grid-cols-3 gap-2">
          {CONTACT.socials.map((s, i) => {
            const Icon = SOCIAL_ICONS[s.name];
            return (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                animate={done ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-lg border border-mist/10 bg-mist/[0.03] p-3 text-center transition-all sm:flex-row sm:gap-3 sm:text-left hover:-translate-y-0.5 hover:border-signal/45 hover:bg-signal/[0.06]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-mist/12 bg-abyss text-mist transition-colors group-hover:border-signal/50 group-hover:text-signal">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="w-full min-w-0 flex-1 font-sans">
                    <span className="block text-sm font-medium text-white">{s.name}</span>
                    <span className="hidden truncate font-mono text-[11px] text-silver sm:block">@{s.handle}</span>
                  </span>
                  <ArrowUpRight className="hidden size-4 shrink-0 text-slate transition-all sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function ContactSection() {
  const { content, ui } = useLanguage();
  const { contact, hero } = content;
  const lite = useLite();
  const tel = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <div className="relative overflow-hidden rounded-2xl border border-mist/10 bg-deep/85">
          {/* Travelling border beam */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
            <rect
              x="0.5"
              y="0.5"
              rx="16"
              pathLength={100}
              fill="none"
              stroke="#3ee6d4"
              strokeWidth="1.5"
              strokeDasharray="12 88"
              className={lite ? undefined : "animate-border-beam"}
              style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
            />
          </svg>
          {/* Blueprint grid + glows */}
          <div
            aria-hidden
            className="absolute inset-0 [background-image:linear-gradient(rgba(62,230,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(62,230,212,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_80%_at_75%_50%,#000_25%,transparent_100%)]"
          />
          <div aria-hidden className="absolute -top-60 right-[-5%] h-[720px] w-[820px] bg-[radial-gradient(closest-side,rgba(62,230,212,0.13),transparent)]" />
          <div aria-hidden className="absolute -bottom-72 left-[-10%] h-[680px] w-[780px] bg-[radial-gradient(closest-side,rgba(124,140,255,0.11),transparent)]" />

          <div className="relative grid gap-10 px-5 py-10 sm:gap-12 sm:px-12 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:px-16">
            {/* Pitch */}
            <div className="flex min-w-0 flex-col lg:col-span-6">
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-signal uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-signal" />
                  </span>
                  {contact.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 max-w-[16ch] text-heading-lg">{contact.title}</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[52ch] text-silver sm:text-lg">{contact.intro}</p>
              </Reveal>

              <Reveal delay={0.18} className="mt-8">
                <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{ui.openTo}</p>
                <motion.ul
                  className="mt-3 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
                >
                  {ROLES.map((r) => (
                    <motion.li
                      key={r}
                      variants={{ hidden: { opacity: 0, y: 8, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                      className="rounded-md border border-signal/25 bg-signal/[0.06] px-3 py-1.5 text-sm text-mist"
                    >
                      {r}
                    </motion.li>
                  ))}
                </motion.ul>
              </Reveal>

              <Reveal delay={0.25} className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Magnetic className="col-span-2 flex sm:inline-flex">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a href={`mailto:${CONTACT.email}`}>
                      <Mail />
                      {contact.emailLabel}
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="glass" className="max-sm:h-12 max-sm:px-3">
                  <a href={hero.cvUrl} target="_blank" rel="noopener noreferrer">
                    <FileText />
                    {ui.viewCv}
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost" className="border border-mist/10 max-sm:h-12 max-sm:px-3 max-sm:text-[13px]">
                  <a href={tel}>
                    <Phone />
                    {CONTACT.phone}
                  </a>
                </Button>
              </Reveal>
            </div>

            {/* Terminal */}
            <Reveal delay={0.1} className="min-w-0 lg:col-span-6">
              <ContactTerminal />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
