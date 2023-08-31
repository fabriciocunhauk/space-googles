import { ReactNode } from "react";
import { classNames } from "../utils/tilwind-jit-set";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: string;
};

export default function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  const sizeMap: any = {
    xs: "max-w-md",
    sm: "max-w-xl",
    md: "max-w-6xl",
    lg: "max-w-7xl",
  };

  const classes = classNames("mx-auto px-4 sm:px-6", sizeMap[size], className);

  return <div className={classes}>{children}</div>;
}
