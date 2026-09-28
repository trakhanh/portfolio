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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Download, ZoomIn, ZoomOut, RotateCcw, FileCheck2 } from "lucide-react";

interface RecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecommendationModal({
  open,
  onOpenChange,
}: RecommendationModalProps) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6 sm:p-8 bg-[#08080c] border border-white/10 rounded-3xl text-white">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#8052ff]">
            <FileCheck2 className="w-5 h-5" />
            <DialogTitle className="text-xl font-display text-white">
              Thư giới thiệu chính thức — Bông Trà Co., Ltd
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-body-light pt-1">
            Văn bản có mộc đỏ xác nhận đóng góp thực tế trong dự án ERP, HRM &amp; Tự động hóa quy trình.
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar */}
        <Tabs defaultValue="p1" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 pt-2">
            <TabsList className="bg-white/5 border border-white/10 rounded-full p-1">
              <TabsTrigger value="p1" className="rounded-full data-[state=active]:bg-[#8052ff] data-[state=active]:text-white">
                Trang 01
              </TabsTrigger>
              <TabsTrigger value="p2" className="rounded-full data-[state=active]:bg-[#8052ff] data-[state=active]:text-white">
                Trang 02
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-white/10 rounded-full px-2 py-1 bg-white/5">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 text-[#9a9a9a] hover:text-white"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 text-white">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 text-[#9a9a9a] hover:text-white"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1 ml-1 text-[#9a9a9a] hover:text-white border-l border-white/10"
                  title="Đặt lại"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="/files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-pill-primary inline-flex items-center gap-1.5 text-xs uppercase"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải PDF</span>
              </a>
            </div>
          </div>

          {/* Letter Image Viewport */}
          <div className="mt-4 overflow-auto max-h-[64vh] rounded-2xl bg-[#000000] border border-white/5 flex items-center justify-center p-4">
            <TabsContent value="p1" className="m-0 focus:outline-none">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
                className="transition-transform duration-150"
              >
                <Image
                  src="/img/recommendation-letter-page-1-hd.jpg"
                  alt="Thư giới thiệu Bông Trà - Trang 1"
                  width={800}
                  height={1130}
                  className="rounded-lg max-w-full h-auto object-contain mx-auto shadow-2xl"
                  priority
                />
              </div>
            </TabsContent>

            <TabsContent value="p2" className="m-0 focus:outline-none">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
                className="transition-transform duration-150"
              >
                <Image
                  src="/img/recommendation-letter-page-2-hd.jpg"
                  alt="Thư giới thiệu Bông Trà - Trang 2"
                  width={800}
                  height={1130}
                  className="rounded-lg max-w-full h-auto object-contain mx-auto shadow-2xl"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
