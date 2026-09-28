"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CertificateItem } from "@/types/portfolio";
import { CertificateModal } from "./CertificateModal";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function CertificatesSection() {
  const { content } = useLanguage();
  const { certificates } = content;
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCert = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  return (
    <section id="proof" className="py-24 sm:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Ambient Aurora Blob */}
      <div className="absolute top-1/2 right-1/4 w-[480px] h-[480px] rounded-full bg-[#8052ff]/8 blur-[140px] pointer-events-none fluid-blob-iris" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="chip-liquid mb-3 w-fit flex items-center gap-2 border-[#ffb829]/30 text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#ffb829]" />
              <span className="text-[12px] font-medium tracking-[0.12em]">{certificates.eyebrow}</span>
            </div>
            <h2 className="heading-display text-3xl sm:text-5xl lg:text-[61px] text-white tracking-[-0.04em] leading-[1.0]">
              {certificates.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-body-auros text-base sm:text-lg leading-[1.4]">
              {certificates.intro}
            </p>
          </div>
        </div>

        {/* Certificates Grid (Liquid Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.items.map((cert, idx) => (
            <motion.div
              key={cert.id || cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass-card group flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => handleOpenCert(cert)}
            >
              <div>
                {/* Thumbnail Image with Glass Sheen */}
                <div className="relative aspect-[16/10] w-full bg-[#000000] overflow-hidden border-b border-white/[0.08]">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3.5 right-3.5">
                    <span className="chip-liquid !bg-[#000000]/75 !border-white/20 !text-[#ffb829]">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Content: 36px padding */}
                <div className="p-8">
                  <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-[0.12em] block mb-2 font-medium">
                    {cert.issuer}
                  </span>
                  <h3 className="heading-sub text-xl text-white mb-3 group-hover:text-[#8052ff] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-body-auros text-sm line-clamp-2 leading-[1.4]">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="p-8 pt-0 border-t border-white/[0.08] mt-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-white group-hover:text-[#8052ff] flex items-center gap-1.5 transition-colors">
                  <span>{certificates.viewCredential || "Xem chi tiết"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-[#bbc7c6]">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCert}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
