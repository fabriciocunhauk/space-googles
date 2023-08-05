import { classNames } from "@/app/utils/tilwind-jit-set";
import type { ReactNode } from "react";
import React from "react";

const Container = ({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: { container: string };
}) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 lg:grid-cols-2 w-screen",
        classes?.container
      )}
    >
      {children}
    </div>
  );
};

export default Container;
