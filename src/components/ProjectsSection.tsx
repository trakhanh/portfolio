"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { asset } from "@/data/ui-strings";
import type { ProjectItem } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./motion/GlassCard";
import { Reveal, EASE_OUT } from "./motion/Reveal";
import { CarouselDeck } from "./motion/CarouselDeck";
import { FadeImage } from "./motion/FadeImage";

type Filter = "all" | "foundation" | "professional";

function ProjectSlide({ item, index }: { item: ProjectItem; index: number }) {
  const { ui } = useLanguage();
  return (
    <GlassCard variant="solid" className="group h-full overflow-hidden">
      <Link
        href={`/projects/${item.id}/`}
        draggable={false}
        className="flex h-full flex-col"
        aria-label={`${ui.openCase}: ${item.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-mist/10">
          <div data-parallax className="absolute inset-y-0 -right-[5%] -left-[5%]">
            <FadeImage
              src={asset(item.image)}
              alt=""
              fill
              draggable={false}
              sizes="(min-width: 1280px) 40vw, (min-width: 640px) 62vw, 90vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">
            {String(index + 1).padStart(2, "0")} · {item.phaseLabel}
          </p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="text-xl leading-tight tracking-[-0.02em] sm:text-2xl">{item.title}</h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[rgba(20,56,76,0.5)] transition-all duration-300 group-hover:bg-signal group-hover:text-abyss">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-silver">{item.description}</p>
          <div className="mt-auto pt-6">
            <p className="font-mono text-[11px] tracking-[0.12em] text-slate uppercase">{ui.result}</p>
            <p className="mt-1 text-sm font-medium text-lavender">{item.result}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}

export function ProjectsSection() {
  const { content } = useLanguage();
  const { projects } = content;
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: projects.filters.all, count: projects.items.length },
    { id: "professional", label: projects.filters.professional, count: projects.items.filter((p) => p.phase === "professional").length },
    { id: "foundation", label: projects.filters.foundation, count: projects.items.filter((p) => p.phase === "foundation").length },
  ];
  const items = projects.items.filter((p) => filter === "all" || p.phase === filter);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="container-auros">
        <SectionHeading eyebrow={projects.eyebrow} title={projects.title} intro={projects.intro} />

        <Reveal className="mt-12">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="glass h-auto w-full gap-1 !rounded-xl bg-transparent p-1.5 sm:w-fit">
              {filters.map((f) => (
                <TabsTrigger
                  key={f.id}
                  value={f.id}
                  className="relative isolate h-10 cursor-pointer px-2 text-[11px] tracking-[0.12em] text-silver uppercase data-[state=active]:bg-transparent data-[state=active]:text-abyss data-[state=active]:shadow-none sm:px-4 sm:text-[12px]"
                >
                  {filter === f.id && (
                    <motion.span
                      layoutId="project-filter"
                      className="bg-signal absolute inset-0 -z-10 rounded-md"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <span className="hidden text-[11px] opacity-60 sm:inline">{String(f.count).padStart(2, "0")}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="mt-8"
        >
          <CarouselDeck
            label="projects"
            items={items}
            getKey={(p) => p.id}
            slideClassName="basis-[86%] sm:basis-[62%] lg:basis-[44%] xl:basis-[38%]"
            renderSlide={(item, i) => <ProjectSlide item={item} index={i} />}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
