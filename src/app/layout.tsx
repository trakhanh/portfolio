import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.khanhtra.io.vn"),
  title: "Trà Nguyễn Gia Khánh — AI × ERP Operating System",
  description:
    "Portfolio của Trà Nguyễn Gia Khánh — Applied AI, AI Automation, ERP & Digital Transformation với nền tảng Data Science.",
  keywords: [
    "Trà Nguyễn Gia Khánh",
    "Applied AI",
    "AI Automation",
    "ERP Specialist",
    "Digital Transformation",
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
    description: "Constellation of intelligence on black velvet.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gia Khanh Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trà Nguyễn Gia Khánh — AI × ERP Operating System",
    description: "Constellation of intelligence on black velvet.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#000000] text-[#ffffff] min-h-screen font-sans antialiased selection:bg-[#8052ff] selection:text-white relative overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
