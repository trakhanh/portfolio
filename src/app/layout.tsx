import type { Metadata, Viewport } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.khanhtra.io.vn"),
  title: "Trà Nguyễn Gia Khánh — AI × ERP Operating System",
  description:
    "Portfolio của Trà Nguyễn Gia Khánh — ứng viên Applied AI, AI Automation, ERP/Digital Transformation và R&D với nền tảng Data Science.",
  keywords: [
    "Trà Nguyễn Gia Khánh",
    "AI Engineer",
    "ERP Specialist",
    "Digital Transformation",
    "Automation",
    "Data Science",
    "Computer Vision",
    "n8n",
  ],
  authors: [{ name: "Trà Nguyễn Gia Khánh" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=4" },
      { url: "/icons/gk-32-v2.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/icons/gk-16-v2.png?v=4", sizes: "16x16", type: "image/png" },
      { url: "/img/logo-gk.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/gk-180-v2.png?v=4", sizes: "180x180" }],
  },
  openGraph: {
    title: "Trà Nguyễn Gia Khánh — AI × ERP Operating System",
    description: "Từ dữ liệu đến trí tuệ nhân tạo và vận hành doanh nghiệp thực tế.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gia Khanh Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trà Nguyễn Gia Khánh — AI × ERP Operating System",
    description: "Từ dữ liệu đến trí tuệ nhân tạo và vận hành doanh nghiệp thực tế.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="dark" className={`${chakraPetch.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-cyber-bg text-cyber-fg min-h-screen antialiased selection:bg-cyber-accent selection:text-black scanlines relative">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
