import { classNames } from "@/app/utils/tilwind-jit-set";
import type { ReactNode } from "react";

const Button = ({
  children,
  onClick,
  classes,
}: {
  children?: ReactNode;
  onClick?: () => void;
  classes?: { button: string };
}) => {
  return (
    <button
      className={classNames("w-20 h-20 rounded-full outline", classes?.button)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
