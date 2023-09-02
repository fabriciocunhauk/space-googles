import { classNames } from "@/app/utils/tilwind-jit-set";
import Link from "next/link";
import type { ReactNode } from "react";

const Button = ({
  children,
  onClick,
  classes,
  href,
}: {
  children?: ReactNode;
  onClick?: () => void;
  classes?: { button: string };
  href?: string;
}) => {
  return href ? (
    <div className="w-96 h-96 mt-20 bg-primary flex items-center justify-center rounded-full hover:w-flex  hover:bg-opacity-5  bg-opacity-0 ease-in-out duration-500">
      <Link
        href={href}
        className={classNames(
          "bg-primary w-64 h-64 rounded-full flex items-center justify-center",
          classes?.button
        )}
        onClick={onClick}
      >
        <p className="text-3xl font-Bellefair">{children}</p>
      </Link>
    </div>
  ) : (
    <div className="w-96 h-96 mt-20 bg-primary flex items-center justify-center rounded-full hover:w-flex  hover:bg-opacity-5  bg-opacity-0 ease-in-out duration-500">
      <button
        className={classNames(
          "bg-primary w-64 h-64 rounded-full flex items-center justify-center",
          classes?.button
        )}
        onClick={onClick}
      >
        <p className="text-3xl font-Bellefair">{children}</p>
      </button>
    </div>
  );
};

export default Button;
