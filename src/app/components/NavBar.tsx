"use client";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import HomeLogo from "../../../public/assets/logo.svg";
import { navigation } from "../utils/navbar.utils";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { classNames } from "../utils/tilwind-jit-set";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="absolute pt-10 w-full">
      <Container classes={{ container: "flex justify-between" }}>
        <Link href="/" className="flex items-center">
          <Image src={HomeLogo} className="w-full" alt="image" />
        </Link>
        <ul className="hidden sm:flex items-center justify-around text-white pt-4 bg-white bg-opacity-5 gap-10 h-[100px] px-4">
          {navigation.map(({ id, name, href }) => {
            return (
              <li
                key={id}
                className={classNames(
                  " h-10 cursor:pointer",
                  href === pathname ? "border-primary border-b-2" : ""
                )}
              >
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
        {/* Mobile */}
        <div className="flex sm:hidden items-center justify-center cursor-pointer text-3xl text-white hover:bg-white hover:bg-opacity-5 p-2">
          <GiHamburgerMenu />
        </div>
      </Container>
    </nav>
  );
};
