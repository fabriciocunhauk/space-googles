"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HomeLogo from "./Svgs/HomeLogo/HomeLogo";
import NavbarBurger from "./Svgs/NavbarBurger/NavbarBurger";
import { useWindowDimensions } from "@/app/hooks/useDimension";
import Container from "./Container";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 507) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <nav className="absolute pt-10 w-full">
      <Container className="flex justify-between">
        <Link href="/" className="flex items-center">
          <HomeLogo />
        </Link>
        {isMobile ? (
          <ul className="flex items-center justify-around text-white pt-4 bg-white bg-opacity-5 gap-10 h-[100px] px-4">
            <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
              <Link href="/">00 HOME</Link>
            </li>
            <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
              <Link href="/destination">01 DESTINATION</Link>
            </li>
            <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
              <Link href="/crew">02 CREW</Link>
            </li>
            <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
              <Link href="/launch">03 LAUNCH</Link>
            </li>
          </ul>
        ) : (
          <div className="flex items-center justify-center cursor-pointer">
            <NavbarBurger />
          </div>
        )}
      </Container>
    </nav>
  );
};
