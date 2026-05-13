"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { navigation } from "../utils/navbar.utils";
import { classNames } from "../utils/tilwind-jit-set";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import HomeLogo from "../../../public/assets/logo.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav 
        className={classNames(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled ? "py-4 glass border-b border-white/10" : "py-10 sm:py-16 bg-transparent"
        )}
      >
        <Container classes={{ container: "flex justify-between items-center" }}>
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
            <Image src={HomeLogo} className="w-10 h-10 md:w-12 md:h-12" alt="Space Googles Logo" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-12 px-12 py-4 glass rounded-full border border-white/10 backdrop-blur-xl">
            {navigation.map(({ id, name, href }) => (
              <li
                key={id}
                className={classNames(
                  "relative group cursor-pointer font-Barlow-Condensed tracking-[2.7px] text-base uppercase transition-all",
                  href === pathname ? "text-white" : "text-nebula-blue hover:text-white"
                )}
              >
                <Link href={href} aria-label={`Navigate to ${name}`}>
                  <span className="mr-2 font-bold opacity-50">0{id}</span>
                  {name}
                </Link>
                {/* Active Indicator */}
                <div 
                  className={classNames(
                    "absolute -bottom-4 left-0 right-0 h-[3px] bg-white transition-all duration-300",
                    href === pathname ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )} 
                />
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-3xl text-white transition-colors hover:text-nebula-blue"
            onClick={handleMobileMenuToggle}
            aria-label="Open mobile menu"
          >
            <GiHamburgerMenu />
          </button>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={classNames(
          "fixed inset-0 z-[60] glass backdrop-blur-2xl transition-all duration-500 lg:hidden",
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex flex-col h-full p-8">
          <button
            className="self-end text-4xl text-white p-2 hover:rotate-90 transition-transform duration-300"
            onClick={handleMobileMenuToggle}
            aria-label="Close mobile menu"
          >
            <IoMdClose />
          </button>
          
          <ul className="flex flex-col gap-10 mt-20">
            {navigation.map(({ id, name, href }) => (
              <li
                key={id}
                className={classNames(
                  "text-2xl font-Barlow-Condensed tracking-[2.7px] uppercase transition-all",
                  href === pathname ? "text-white border-r-4 border-white pr-4" : "text-nebula-blue"
                )}
              >
                <Link
                  href={href}
                  aria-label={`Navigate to ${name}`}
                  onClick={handleMobileMenuToggle}
                  className="flex items-center"
                >
                  <span className="mr-4 font-bold opacity-50">0{id}</span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
