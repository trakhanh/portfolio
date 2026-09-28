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
      <DialogContent className="max-w-4xl p-6 sm:p-8 rounded-[16px] bg-[#0c0c14] border border-white/10 text-white">
        <DialogHeader className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 text-[#8052ff]">
            <FileCheck2 className="w-5 h-5" />
            <DialogTitle className="text-xl font-medium text-white">
              Thư giới thiệu chính thức — Bông Trà Co., Ltd
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-body-auros pt-1">
            Văn bản có mộc đỏ xác nhận đóng góp thực tế trong dự án ERP, HRM &amp; Tự động hóa quy trình.
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar */}
        <Tabs defaultValue="p1" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3 pt-2">
            <TabsList className="p-1 rounded-[6px] bg-[#0f0f18] border border-white/[0.08]">
              <TabsTrigger value="p1" className="rounded-[4px] text-xs uppercase data-[state=active]:bg-[#8052ff] data-[state=active]:text-white">
                Trang 01
              </TabsTrigger>
              <TabsTrigger value="p2" className="rounded-[4px] text-xs uppercase data-[state=active]:bg-[#8052ff] data-[state=active]:text-white">
                Trang 02
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-[6px] bg-[#0f0f18] border border-white/[0.08] px-2 py-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 text-[#bbc7c6] hover:text-white cursor-pointer"
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
                  className="p-1 text-[#bbc7c6] hover:text-white cursor-pointer"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1 ml-1 text-[#bbc7c6] hover:text-white border-l border-white/10 cursor-pointer"
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
                className="btn-primary-auros !py-2 !px-4 text-xs uppercase"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải PDF</span>
              </a>
            </div>
          </div>

          <div className="max-h-[68vh] overflow-auto mt-4 p-4 rounded-[12px] bg-[#000000] border border-white/[0.06] flex items-center justify-center">
            <TabsContent value="p1" className="m-0 focus:outline-none flex justify-center">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
                className="transition-transform duration-200"
              >
                <Image
                  src="/img/recommendation-letter-page-1-hd.jpg"
                  alt="Thư giới thiệu Trang 1"
                  width={800}
                  height={1132}
                  className="rounded-[6px] shadow-lg max-w-full h-auto"
                />
              </div>
            </TabsContent>

            <TabsContent value="p2" className="m-0 focus:outline-none flex justify-center">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
                className="transition-transform duration-200"
              >
                <Image
                  src="/img/recommendation-letter-page-2-hd.jpg"
                  alt="Thư giới thiệu Trang 2"
                  width={800}
                  height={1132}
                  className="rounded-[6px] shadow-lg max-w-full h-auto"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
