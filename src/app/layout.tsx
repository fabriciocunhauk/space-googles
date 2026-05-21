import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Bellefair, Barlow_Condensed } from "next/font/google";
import { Navbar } from "./components/NavBar";
import Footer from "./components/Footer";
import { classNames } from "./utils/classNames";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const bellefair = Bellefair({ subsets: ["latin"], weight: '400', variable: '--font-bellefair' });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ['300', '400', '700'], variable: '--font-barlow-condensed' });

export const metadata: Metadata = {
  metadataBase: new URL("https://space-googles.co.uk"),
  title: "Space Googles | Interstellar Dashboard",
  description: "A premium dashboard for exploring launches, planets, and real-time space news.",
  keywords: ["space", "spacex", "nasa", "planets", "launches", "iss"],
  openGraph: {
    title: "Space Googles | Interstellar Dashboard",
    description: "A premium dashboard for exploring launches, planets, and real-time space news.",
    url: "https://space-googles.co.uk",
    siteName: "Space Googles",
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Googles | Interstellar Dashboard",
    description: "A premium dashboard for exploring launches, planets, and real-time space news.",
  },
  other: {
    "google-adsense-account": "ca-pub-7386584956005563",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7386584956005563"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={classNames(
        inter.className, 
        bellefair.variable, 
        barlowCondensed.variable,
        "relative bg-black min-h-screen overflow-x-hidden"
      )}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
