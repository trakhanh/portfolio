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
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  FileCheck2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

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
      <DialogContent className="max-w-4xl p-6 sm:p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#8052ff]">
            <FileCheck2 className="w-5 h-5" />
            <DialogTitle>Thư giới thiệu chính thức — Bông Trà Co., Ltd</DialogTitle>
          </div>
          <DialogDescription>
            Tài liệu có mộc đỏ xác nhận đóng góp thực tế trong dự án ERP, HRM &amp; Tự động hóa quy trình.
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar: Tabs & Zoom & Download */}
        <Tabs defaultValue="p1" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <TabsList className="bg-white/[0.04] border border-white/10 rounded-full p-1">
              <TabsTrigger value="p1" className="rounded-full px-5 py-1.5 text-xs">
                Trang 01
              </TabsTrigger>
              <TabsTrigger value="p2" className="rounded-full px-5 py-1.5 text-xs">
                Trang 02
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-white/10 bg-white/[0.03] rounded-full px-3 py-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 text-[#9a9a9a] hover:text-white"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs px-2 text-[#ffb829] font-medium">
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

              <Button asChild size="sm" variant="secondary" className="gap-2 rounded-full">
                <a
                  href="/files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Letter Image Viewers */}
          <div className="mt-6 overflow-auto max-h-[65vh] border border-white/10 bg-black rounded-2xl flex items-center justify-center p-4">
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
