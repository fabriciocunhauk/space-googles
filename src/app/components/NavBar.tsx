"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "../utils/tilwind-jit-set";
import HomeLogo from "./Svgs/HomeLogo/HomeLogo";
import NavbarBurger from "./Svgs/NavbarBurger/NavbarBurger";
import Container from "./Container";
import { navigation } from "../utils/navbar.utils";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="absolute pt-10 w-full">
      <Container classes={{ container: "flex justify-between" }}>
        <Link href="/" className="flex items-center">
          <HomeLogo />
        </Link>
        {/* Desktop */}
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
        <div className="flex sm:hidden items-center justify-center cursor-pointer">
          <NavbarBurger />
        </div>
      </Container>
    </nav>
  );
};
