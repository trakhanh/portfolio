"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const LOGS = [
    { text: "> [SYS_INIT] Loading core kernel registers...", status: "[OK]" },
    { text: "> [AI_MOUNT] Linking Applied AI & CV modules...", status: "[OK]" },
    { text: "> [ERP_EXEC] Initializing Automation Pipelines...", status: "[OK]" },
    { text: "> [AUTH_SYNC] Clearance verified: ACCESS GRANTED.", status: "[READY]" },
  ];

  useEffect(() => {
    // Check if user already saw splash in this session
    const seen = sessionStorage.getItem("splash_seen");
    if (seen === "true") {
      setVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem("splash_seen", "true");
            setVisible(false);
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 6;
        return next > 100 ? 100 : next;
      });
    }, 65);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 15 && logIndex === 0) setLogIndex(1);
    if (progress > 45 && logIndex === 1) setLogIndex(2);
    if (progress > 75 && logIndex === 2) setLogIndex(3);
    if (progress >= 100 && logIndex === 3) setLogIndex(4);
  }, [progress, logIndex]);

  const handleSkip = () => {
    sessionStorage.setItem("splash_seen", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[999999] bg-[#000000] flex items-center justify-center p-4 sm:p-6 cursor-pointer select-none"
        >
          {/* Ambient Caustics behind Terminal */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#8052ff]/15 blur-[120px] pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-[#00e5ff]/12 blur-[100px] pointer-events-none" />

          {/* Liquid Glass Terminal Box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[620px] rounded-[16px] bg-[#0c0c14]/90 border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
          >
            {/* Top Border Glow Specular Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8052ff] to-[#00e5ff]" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-6 font-mono text-[11px] tracking-[0.1em]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366] shadow-[0_0_6px_#ff3366]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000] shadow-[0_0_6px_#ffd000]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
              </div>
              <span className="text-[#bbc7c6] uppercase">
                TERMINAL // KERNEL v4.19-GK // BOOT SEQUENCE
              </span>
              <span className="text-[#00e5ff] font-medium animate-pulse">
                [LIVE FEED]
              </span>
            </div>

            {/* Center Block: Holographic Rotating Reticle + GK Logo */}
            <div className="text-center py-2 mb-6">
              <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                {/* Concentric Rotating Reticle Rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#8052ff]/60 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-dotted border-[#00e5ff]/60 animate-[spin_5s_linear_infinite_reverse]" />
                
                {/* Logo Core */}
                <div className="relative w-16 h-16 rounded-full bg-white/[0.05] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(128,82,255,0.4)]">
                  <Image
                    src="/img/logo-gk.svg"
                    alt="Logo GK"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
                  />
                </div>
              </div>

              <h2 className="heading-display text-xl sm:text-2xl text-white tracking-[0.08em] mb-1">
                TRÀ NGUYỄN GIA KHÁNH
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#ffb829]">
                APPLIED AI · AI AUTOMATION · ERP R&amp;D
              </p>
            </div>

            {/* Terminal Log Feed */}
            <div className="rounded-[8px] bg-[#000000]/70 border border-white/[0.08] p-4 font-mono text-[11px] leading-relaxed mb-6 min-h-[105px] flex flex-col justify-center">
              {LOGS.map((log, i) => (
                <div
                  key={i}
                  className={`transition-all duration-200 flex items-center justify-between ${
                    i <= logIndex
                      ? "opacity-100 translate-x-0 text-white"
                      : "opacity-20 -translate-x-1 text-[#4a4f66]"
                  }`}
                >
                  <span className="truncate">{log.text}</span>
                  <span
                    className={`ml-2 shrink-0 ${
                      i <= logIndex ? "text-[#00ffaa] font-bold" : "text-transparent"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar & Percentage */}
            <div className="font-mono">
              <div className="flex justify-between items-center text-[11px] text-[#bbc7c6] mb-2 tracking-[0.08em]">
                <span>INITIALIZING_RUNTIME...</span>
                <span className="text-[#ffb829] font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#8052ff] via-[#00e5ff] to-[#ffb829] shadow-[0_0_12px_#00e5ff] transition-all duration-75 ease-out rounded-full"
                />
              </div>
            </div>

            {/* Skip hint */}
            <div className="mt-4 text-center">
              <span className="font-mono text-[10px] text-[#707777] uppercase tracking-[0.14em]">
                Nhấp chuột để bỏ qua sequence ↵
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
