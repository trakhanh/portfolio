"use client";

import React from "react";
import Image from "next/image";
import { CertificateItem } from "@/types/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateModal({
  certificate,
  open,
  onOpenChange,
}: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4 sm:p-6 bg-[#0e0e16] border border-cyber-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-cyber-accent">
            <Award className="w-5 h-5" />
            <DialogTitle className="text-base sm:text-lg">{certificate.title}</DialogTitle>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-cyber-muted-fg">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-cyber-cyan" />
              {certificate.issuer}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyber-accent" />
              {certificate.date}
            </span>
          </div>
        </DialogHeader>

        {/* Certificate Image View */}
        <div className="relative w-full max-h-[50vh] min-h-[220px] my-2 bg-[#06060a] border border-cyber-border/70 flex items-center justify-center overflow-hidden p-2">
          <Image
            src={certificate.image}
            alt={certificate.title}
            width={700}
            height={500}
            className="w-full h-auto max-h-[48vh] object-contain rounded-sm shadow-xl"
            priority
          />
        </div>

        {/* Description & Skills */}
        <div className="flex flex-col gap-3 pt-2 border-t border-cyber-border/60">
          <p className="font-mono text-xs sm:text-sm text-cyber-fg/90 leading-relaxed">
            {certificate.description}
          </p>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div>
              <span className="text-[10px] font-mono text-cyber-muted-fg uppercase tracking-wider block mb-1.5">
                Kỹ năng chứng thực:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[11px] font-mono bg-cyber-card border border-cyber-border text-cyber-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verify Link */}
          {certificate.verifyUrl && (
            <div className="pt-2 flex justify-end">
              <Button asChild size="sm" className="gap-1.5">
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Xác minh chứng chỉ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
