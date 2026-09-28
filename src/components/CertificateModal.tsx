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
import { Award, ArrowUpRight, Calendar, Building2 } from "lucide-react";

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
      <DialogContent className="max-w-2xl p-6 sm:p-8 liquid-glass-card !bg-[#0c0c14]/92 !backdrop-blur-3xl border border-white/20 text-white max-h-[90vh] overflow-y-auto shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#8052ff]">
            <Award className="w-5 h-5" />
            <DialogTitle className="text-xl font-display text-white">
              {certificate.title}
            </DialogTitle>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#a0a0aa]">
            <span className="flex items-center gap-1.5 text-white/90">
              <Building2 className="w-3.5 h-3.5 text-[#ffb829]" />
              {certificate.issuer}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8052ff]" />
              {certificate.date}
            </span>
          </div>
        </DialogHeader>

        {/* Certificate Image View */}
        <div className="relative w-full max-h-[48vh] min-h-[220px] my-3 bg-[#000000]/60 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden p-2">
          <Image
            src={certificate.image}
            alt={certificate.title}
            width={700}
            height={500}
            className="w-full h-auto max-h-[46vh] object-contain rounded-lg"
            priority
          />
        </div>

        {/* Description & Skills */}
        <div className="flex flex-col gap-4 pt-3 border-t border-white/10">
          <p className="text-sm text-body-light leading-relaxed">
            {certificate.description}
          </p>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div>
              <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider block mb-2 font-medium">
                Kỹ năng chứng thực:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono liquid-glass-tag text-white/90"
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
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-primary !py-2 !px-4 text-xs uppercase"
              >
                <span>Xác minh chứng chỉ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
