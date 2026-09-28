"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CertificateItem } from "@/types/portfolio";
import { CertificateModal } from "./CertificateModal";
import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Award } from "lucide-react";

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
    <section
      id="proof"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {certificates.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {certificates.title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {certificates.intro}
            </p>
          </div>
        </div>

        {/* Certificates Grid (Spacious 24px Radius Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.items.map((cert, idx) => (
            <motion.div
              key={cert.id || cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-3xl flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              onClick={() => handleOpenCert(cert)}
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                  {/* Date badge */}
                  <div className="absolute bottom-3 left-4">
                    <span className="px-3 py-1 text-[11px] font-light bg-black/80 backdrop-blur-md text-[#bdbdbd] rounded-full border border-white/10">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <span className="text-xs font-medium text-[#8052ff] uppercase tracking-wider block mb-2">
                    {cert.issuer}
                  </span>
                  <h3 className="text-xl font-normal tracking-tight text-white mb-3 group-hover:text-[#8052ff] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-extralight text-[#9a9a9a] line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-7 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.025em] text-white/90 group-hover:text-[#8052ff] flex items-center gap-1.5 transition-colors">
                  <span>{certificates.viewCredential || "Xem chi tiết"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-medium text-[#15846e] px-2.5 py-0.5 rounded-full bg-[#15846e]/15 border border-[#15846e]/30">
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
