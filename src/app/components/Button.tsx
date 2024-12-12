import Link from "next/link";
import { classNames } from "../utils/tilwind-jit-set";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "submit" | "button";
  classes?: { button?: string; link?: string };
  onClick?: (...args: any) => void;
  [key: string]: any;
};

export const Button = ({
  children,
  href,
  type,
  classes,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={classNames(
            "flex items-center justify-center rounded-full bg-white w-52 h-52",
            classes?.link
          )}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          type={type}
          className={classNames(
            "flex items-center justify-center rounded-full bg-white w-52 h-52",
            classes?.button
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};
