"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CertificateItem } from "@/types/portfolio";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CertificateModal } from "./CertificateModal";
import { motion } from "motion/react";
import { Award, Eye, ExternalLink, Calendar } from "lucide-react";

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
      className="py-20 border-b border-cyber-border bg-[#08080e] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left">
          <Badge variant="default" className="w-fit font-mono text-xs">
            <Award className="w-3.5 h-3.5 mr-1" />
            {certificates.eyebrow}
          </Badge>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide uppercase">
            {certificates.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-cyber-fg/80 max-w-3xl leading-relaxed">
            {certificates.intro}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.items.map((cert, idx) => (
            <motion.div
              key={cert.id || cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="border border-cyber-border bg-cyber-card flex flex-col justify-between hover:border-cyber-accent transition-all duration-200 group cyber-chamfer overflow-hidden cursor-pointer"
              onClick={() => handleOpenCert(cert)}
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full bg-[#050508] border-b border-cyber-border overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-60" />

                  {/* Date badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#08080c]/90 text-cyber-muted-fg border border-cyber-border/60">
                      <Calendar className="w-3 h-3 text-cyber-cyan" />
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <span className="text-[11px] font-mono text-cyber-accent font-semibold block mb-1">
                    {cert.issuer}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2 group-hover:text-cyber-accent transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-cyber-fg/70 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0 border-t border-cyber-border/40 mt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-cyber-accent group-hover:underline flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{certificates.viewCredential || "Xem chi tiết"}</span>
                </span>
                <span className="text-[10px] font-mono text-cyber-muted-fg border border-cyber-border px-1.5 py-0.5">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
