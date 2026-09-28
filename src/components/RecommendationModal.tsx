"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, FileCheck2, Columns2, FileText } from "lucide-react";

interface RecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecommendationModal({
  open,
  onOpenChange,
}: RecommendationModalProps) {
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<"dual" | "p1" | "p2">("dual");

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[96vw] max-h-[92vh] flex flex-col p-4 sm:p-7 rounded-[16px] bg-[#0c0c14] border border-white/15 text-white shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="border-b border-white/[0.08] pb-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#8052ff] mb-1">
                <FileCheck2 className="w-5 h-5 text-[#ffb829]" />
                <DialogTitle className="text-lg sm:text-xl font-medium text-white">
                  Thư giới thiệu chính thức — Bông Trà Co., Ltd
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs sm:text-sm text-[#bbc7c6]">
                Văn bản có mộc đỏ pháp lý xác nhận đóng góp thực tế trong dự án ERP, HRM &amp; Tự động hóa quy trình.
              </DialogDescription>
            </div>

            {/* Quick PDF Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="/files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-liquid !py-2 !px-3.5 text-xs uppercase"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Mở PDF ↗</span>
              </a>

              <a
                href="/files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-primary-liquid !py-2 !px-3.5 text-xs uppercase"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về ↓</span>
              </a>
            </div>
          </div>
        </DialogHeader>

        {/* View Mode & Zoom Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-white/[0.08] shrink-0 text-xs font-mono">
          {/* Mode Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-[6px] bg-white/[0.04] border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode("dual")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === "dual" ? "bg-[#8052ff] text-white font-medium" : "text-[#bbc7c6] hover:text-white"
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Xem 2 trang</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("p1")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === "p1" ? "bg-[#8052ff] text-white font-medium" : "text-[#bbc7c6] hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Trang 01</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("p2")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === "p2" ? "bg-[#8052ff] text-white font-medium" : "text-[#bbc7c6] hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Trang 02</span>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-white/[0.04] border border-white/10">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-[#bbc7c6] hover:text-white transition-colors cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 text-[#ffb829] font-medium min-w-[48px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-[#bbc7c6] hover:text-white transition-colors cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 ml-1 text-[#bbc7c6] hover:text-white border-l border-white/10 transition-colors cursor-pointer"
              title="Đặt lại zoom 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Pages Area (Completely uncropped, full height, crystal clear) */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 rounded-[12px] bg-[#050508] border border-white/[0.06] mt-3">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
            className={`transition-transform duration-200 w-full ${
              viewMode === "dual"
                ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
                : "flex flex-col items-center gap-6"
            }`}
          >
            {/* Page 1 */}
            {(viewMode === "dual" || viewMode === "p1") && (
              <figure className="w-full flex flex-col items-center">
                <figcaption className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-wider mb-2 self-start">
                  // TRANG 01 — XÁC NHẬN NĂNG LỰC &amp; ĐÓNG GÓP THỰC TẾ
                </figcaption>
                <div className="w-full rounded-[8px] overflow-hidden bg-white shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/20">
                  <Image
                    src="/img/recommendation-letter-page-1-hd.jpg"
                    alt="Thư giới thiệu Trang 1 — Bông Trà Co., Ltd"
                    width={1200}
                    height={1698}
                    className="w-full h-auto object-contain block"
                    priority
                  />
                </div>
              </figure>
            )}

            {/* Page 2 */}
            {(viewMode === "dual" || viewMode === "p2") && (
              <figure className="w-full flex flex-col items-center">
                <figcaption className="text-[11px] font-mono text-[#bbc7c6] uppercase tracking-wider mb-2 self-start">
                  // TRANG 02 — MỘC ĐỎ PHÁP LÝ &amp; CHỮ KÝ BAN GIÁM ĐỐC
                </figcaption>
                <div className="w-full rounded-[8px] overflow-hidden bg-white shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/20">
                  <Image
                    src="/img/recommendation-letter-page-2-hd.jpg"
                    alt="Thư giới thiệu Trang 2 — Bông Trà Co., Ltd"
                    width={1200}
                    height={1698}
                    className="w-full h-auto object-contain block"
                    priority
                  />
                </div>
              </figure>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
