import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AmbientLight } from "@/components/AmbientLight";
import { SPLASH_GATE_SCRIPT } from "@/lib/splash";

const display = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const code = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.khanhtra.io.vn"),
  title: "Trà Nguyễn Gia Khánh — Applied AI × ERP",
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
      { url: "/img/logo-gk.svg?v=5", type: "image/svg+xml" },
      { url: "/icons/gk-32-v3.png?v=5", sizes: "32x32", type: "image/png" },
      { url: "/icons/gk-16-v3.png?v=5", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=5", sizes: "any" },
    ],
    apple: [{ url: "/icons/gk-180-v3.png?v=5", sizes: "180x180" }],
  },
  openGraph: {
    title: "Trà Nguyễn Gia Khánh — Applied AI × ERP",
    description: "Biến AI thành hệ thống vận hành thực tế.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gia Khanh Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trà Nguyễn Gia Khánh — Applied AI × ERP",
    description: "Biến AI thành hệ thống vận hành thực tế.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050d14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${display.variable} ${code.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <Providers>
          <AmbientLight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
