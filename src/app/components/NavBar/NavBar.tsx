"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HomeLogo from "../Svgs/HomeLogo/HomeLogo";
import NavbarBurger from "../Svgs/NavbarBurger/NavbarBurger";
import { useWindowDimensions } from "@/app/hooks/useDimension";

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
    <nav className="w-11/12 h-52 flex items-center justify-between bg-transparent">
      <Link
        href="/"
        className="flex items-center justify-around sm:ml-10 lg:ml-0"
      >
        <HomeLogo />
      </Link>
      {isMobile ? (
        <ul className="flex items-center justify-around text-white pt-4 bg-white bg-opacity-5 w-1/2 h-[100px]">
          <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
            <Link href="/">00 HOME</Link>
          </li>
          <li className="border-primary hover:border-b-2 h-10 cursor:pointer">
            <Link href="/destination?search=Mercury">01 DESTINATION</Link>
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
    </nav>
  );
};
