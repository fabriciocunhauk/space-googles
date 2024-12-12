"use client";
import { useState } from "react";
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
  const pathname = usePathname();

  const handleMobileMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="absolute pt-10 sm:pt-20 w-full">
        <Container classes={{ container: "flex justify-between" }}>
          <Link href="/" className="flex items-center">
            <Image src={HomeLogo} className="w-full" alt="Home Logo" />
          </Link>

          <ul className="hidden lg:flex items-center justify-around text-white pt-4 bg-white bg-opacity-5 gap-10 h-[100px] px-32">
            {navigation.map(({ id, name, href }) => (
              <li
                key={id}
                className={classNames(
                  "h-10 cursor-pointer",
                  href === pathname && "border-gray-300 border-b-2"
                )}
              >
                <Link href={href} aria-label={`Navigate to ${name}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Mobile */}
          <div className="flex lg:hidden items-center justify-center cursor-pointer text-3xl text-white hover:bg-white hover:bg-opacity-5 p-2">
            <GiHamburgerMenu
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            />
          </div>
        </Container>
      </nav>

      <div
        className={classNames(
          "flex-col fixed top-0 right-0 bottom-0 left-0 bg-white w-screen py-16 px-6",
          menuOpen ? "flex" : "hidden"
        )}
      >
        <IoMdClose
          className="self-end text-3xl cursor-pointer"
          onClick={handleMobileMenuToggle}
          aria-label="Close mobile menu"
        />
        <ul className="flex flex-col items-center justify-around gap-10 mt-10">
          {navigation.map(({ id, name, href }) => (
            <li
              key={id}
              className={classNames(
                "h-10 cursor-pointer",
                href === pathname && "border-gray-300 border-b-2"
              )}
            >
              <Link
                href={href}
                aria-label={`Navigate to ${name}`}
                onClick={handleMobileMenuToggle}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
