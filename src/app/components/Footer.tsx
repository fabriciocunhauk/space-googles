"use client";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { navigation } from "../utils/navbar.utils";
import HomeLogo from "../../../public/assets/logo.svg";
import { FaTwitter, FaGithub, FaYoutube, FaInstagram, FaSatellite } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nebula-blue/5 blur-[100px] rounded-full pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Logo & Brand */}
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
              <Image src={HomeLogo} className="w-12 h-12" alt="Space Googles Logo" />
            </Link>
            <p className="text-nebula-blue font-Barlow text-base leading-relaxed opacity-60">
              Your gateway to the stars. Exploring the final frontier through real-time data, news, and immersive experiences.
            </p>
            <div className="flex gap-6">
              {[FaTwitter, FaGithub, FaYoutube, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="text-nebula-blue/40 hover:text-white transition-colors text-xl">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
            <h4 className="text-xs font-Barlow-Condensed tracking-[2px] text-white uppercase">Mission Control</h4>
            <ul className="space-y-4">
              {navigation.map(({ id, name, href }) => (
                <li key={id}>
                  <Link href={href} className="text-nebula-blue/60 hover:text-white transition-all text-sm font-Barlow flex items-center gap-2 group">
                    <span className="w-1.5 h-[1px] bg-nebula-blue/20 group-hover:w-4 group-hover:bg-white transition-all" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Status Widget */}
          <div className="space-y-8">
            <h4 className="text-xs font-Barlow-Condensed tracking-[2px] text-white uppercase">Live from Orbit</h4>
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute inset-0" />
                  <div className="w-2 h-2 rounded-full bg-green-500 relative" />
                </div>
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Ground Station Active</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-nebula-blue/60 text-xs">
                  <FaSatellite className="text-[10px]" />
                  <span>Next ISS Transit: 12m 45s</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-accent-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xs font-Barlow-Condensed tracking-[2px] text-white uppercase">Stay Updated</h4>
            <p className="text-xs text-nebula-blue/60 leading-relaxed">
              Subscribe to get the latest space exploration news delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Starship email..." 
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 w-full"
              />
              <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-nebula-blue/30 uppercase tracking-[2px]">
          <p>© 2026 SPACE GOOGLES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">NASA API Guidelines</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
