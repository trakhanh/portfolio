"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./motion/Reveal";
import { SplitText } from "./motion/SplitText";
import { ScrambleText } from "./motion/ScrambleText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  align?: "split" | "center";
}

/** Auros section header: tracked label, medium-weight display title, silver intro. */
export function SectionHeading({ eyebrow, title, intro, className, align = "split" }: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={cn("mx-auto flex max-w-3xl flex-col items-center text-center", className)}>
        <Reveal>
          <p className="label-caps flex items-center gap-2 !text-signal"><span aria-hidden className="size-1.5 bg-signal" /><ScrambleText text={eyebrow} /></p>
        </Reveal>
        <SplitText text={title} className="mt-5 text-heading-lg" />
        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[60ch] text-base text-silver sm:text-lg">{intro}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16", className)}>
      <div className="lg:col-span-7">
        <Reveal>
          <p className="label-caps flex items-center gap-2 !text-signal"><span aria-hidden className="size-1.5 bg-signal" /><ScrambleText text={eyebrow} /></p>
        </Reveal>
        <SplitText text={title} className="mt-5 text-heading-lg" />
      </div>
      {intro && (
        <Reveal delay={0.15} className="lg:col-span-5">
          <p className="max-w-[60ch] text-base text-silver sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
