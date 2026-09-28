"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import { GraduationCap, Video, Building2, CheckCircle2 } from "lucide-react";

export function ProfileJourneySection() {
  const { content } = useLanguage();
  const journey = (content as any).journey;

  if (!journey) return null;

  const pillarIcons = [GraduationCap, Video, Building2];

  return (
    <section
      id="profile"
      className="py-28 bg-[#000000] relative border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Headline Block (Two-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="text-[13px] font-semibold tracking-[0.025em] text-[#ffb829] uppercase block mb-4">
              {journey.eyebrow || "HỒ SƠ NĂNG LỰC CÁ NHÂN"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              {journey.title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg font-extralight text-[#bdbdbd] leading-[1.6]">
              {journey.intro}
            </p>
          </div>
        </div>

        {/* Profile Card & 3 Journey Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Signature Dala Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Portrait Photo (24px radius, pure floating on black) */}
            <div className="relative aspect-[4/5] w-full max-w-[420px] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl mb-6 group">
              <Image
                src="/img/profile-enhanced.png"
                alt="Trà Nguyễn Gia Khánh"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              {/* Verified Thesis Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-xs font-light text-white">Đồ án Tốt nghiệp HUFLIT</span>
                <span className="text-xs font-medium text-[#ffb829]">9.5 / 10 · Xuất sắc</span>
              </div>
            </div>

            {/* Role label in 12px uppercase #8052ff */}
            <span className="text-xs font-medium tracking-[0.025em] text-[#8052ff] uppercase block mb-1">
              APPLIED AI · ERP &amp; DIGITAL SYSTEMS
            </span>

            {/* Name in large white display type */}
            <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-2">
              Trà Nguyễn Gia Khánh
            </h3>

            <p className="text-sm font-extralight text-[#9a9a9a] leading-relaxed max-w-sm">
              Cử nhân Khoa học Dữ liệu (Data Science) định hướng nghiên cứu và phát triển giải pháp AI thực chiến cho doanh nghiệp.
            </p>
          </motion.div>

          {/* Right Column: 3 Distinct Value Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {(journey.items || []).map((item: any, idx: number) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              return (
                <motion.div
                  key={item.number || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-white/[0.02] border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                    <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-2xl font-normal tracking-tight text-white mb-3">
                    {item.title}
                  </h4>

                  <p className="text-sm sm:text-base font-extralight text-[#bdbdbd] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}

            {/* Distinct Core Statement Card */}
            <div className="p-8 rounded-3xl bg-[#8052ff]/10 border border-[#8052ff]/25 mt-2">
              <span className="text-xs font-medium tracking-[0.025em] text-[#ffb829] uppercase block mb-2">
                TRIẾT LÝ VẬN HÀNH CỦA TÔI
              </span>
              <p className="text-base sm:text-lg font-light text-white leading-relaxed italic">
                &ldquo;Điểm mạnh của tôi là đi cùng bài toán từ khảo sát, dựng demo, kiểm thử đến tài liệu hướng dẫn và chuyển giao — không dừng ở ý tưởng hoặc prompt.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
