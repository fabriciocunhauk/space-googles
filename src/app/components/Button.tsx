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
  const baseClasses = "flex items-center justify-center rounded-full transition-all duration-300";

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={classNames(
            baseClasses,
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
            baseClasses,
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
