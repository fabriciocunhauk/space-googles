import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bellefair, Barlow_Condensed } from "next/font/google";
import { Navbar } from "./components/NavBar";
import Footer from "./components/Footer";
import { classNames } from "./utils/classNames";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const bellefair = Bellefair({ subsets: ["latin"], weight: '400', variable: '--font-bellefair' });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ['300', '400', '700'], variable: '--font-barlow-condensed' });

export const metadata: Metadata = {
  title: "Space Googles | Interstellar Dashboard",
  description: "A premium dashboard for exploring launches, planets, and real-time space news.",
  keywords: ["space", "spacex", "nasa", "planets", "launches", "iss"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(
        inter.className, 
        bellefair.variable, 
        barlowCondensed.variable,
        "relative bg-black min-h-screen overflow-x-hidden"
      )}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
