"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { certImage } from "@/data/ui-strings";
import type { CertificateItem } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CertificateModalProps {
  items: readonly CertificateItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function CertificateModal({ items, index, onIndexChange }: CertificateModalProps) {
  const { content, ui } = useLanguage();
  const cert = index !== null ? items[index] : null;
  const go = (d: number) => index !== null && onIndexChange((index + d + items.length) % items.length);

  return (
    <Dialog open={cert !== null} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent
        className="flex max-h-[92dvh] flex-col overflow-hidden p-0 sm:max-w-3xl"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Only this inner part scrolls, so the close button in the frame stays visible. */}
        <div className="min-h-0 overflow-y-auto overscroll-contain">
        {cert && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="p-5 pr-14 text-left sm:p-8 sm:pr-16">
                <p className="label-caps">{cert.issuer}</p>
                <DialogTitle className="text-2xl">{cert.title}</DialogTitle>
                <DialogDescription>
                  {content.certificates.modalDateLabel}: <span className="text-lavender">{cert.date}</span>
                </DialogDescription>
              </DialogHeader>

              <motion.div
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  const swipe = info.offset.x + info.velocity.x * 0.2;
                  if (swipe < -60) go(1);
                  else if (swipe > 60) go(-1);
                }}
                className="mx-4 cursor-grab overflow-hidden rounded-xl border border-mist/10 bg-white active:cursor-grabbing sm:mx-8"
              >
                <Image
                  src={certImage(cert.image)}
                  alt={cert.title}
                  width={1200}
                  height={900}
                  draggable={false}
                  className="pointer-events-none h-auto max-h-[46dvh] w-full object-contain"
                />
              </motion.div>

              <div className="flex flex-col gap-6 p-5 sm:p-8">
                <p className="text-silver">{cert.description}</p>
                <div>
                  <p className="label-caps mb-3">{ui.skillsVerified}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mist/10 pt-6">
                  <div className="flex gap-2">
                    <Button variant="glass" size="icon" className="size-10" onClick={() => go(-1)} aria-label="Previous">
                      <ChevronLeft />
                    </Button>
                    <Button variant="glass" size="icon" className="size-10" onClick={() => go(1)} aria-label="Next">
                      <ChevronRight />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.courseUrl && (
                      <Button asChild variant="glass" size="sm">
                        <a href={cert.courseUrl} target="_blank" rel="noopener noreferrer">
                          {ui.course}
                        </a>
                      </Button>
                    )}
                    {cert.verifyUrl && (
                      <Button asChild size="sm">
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          {ui.verify}
                          <ArrowUpRight />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
