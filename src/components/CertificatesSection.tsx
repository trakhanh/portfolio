"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CertificateItem } from "@/types/portfolio";
import { CertificateModal } from "./CertificateModal";
import { motion } from "motion/react";
import { Award, ArrowUpRight } from "lucide-react";

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
    <section id="proof" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Section Headline Block (Two-column asymmetrical rhythm from DESIGN.md) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-start">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-[#ffb829] block mb-3">
              {certificates.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-display text-white tracking-[-0.04em] leading-[1.08]">
              {certificates.title}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-body-light leading-relaxed">
              {certificates.intro}
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.items.map((cert, idx) => (
            <motion.div
              key={cert.id || cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-3xl bg-[#08080c] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleOpenCert(cert)}
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full bg-[#000000] overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[11px] font-mono bg-[#000000]/80 backdrop-blur-md text-[#ffb829] rounded-full border border-white/10">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider block mb-2 font-medium">
                    {cert.issuer}
                  </span>
                  <h3 className="text-xl font-display text-white mb-3 group-hover:text-[#8052ff] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-body-light line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-7 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs font-sans font-medium uppercase tracking-wider text-white group-hover:text-[#8052ff] flex items-center gap-1.5 transition-colors">
                  <span>{certificates.viewCredential || "Xem chi tiết"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-[#9a9a9a]">
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
