import { classNames } from "@/app/utils/tilwind-jit-set";
import type { ReactNode } from "react";

const Card = ({
  children,
  onClick,
  classes,
}: {
  children: ReactNode;
  onClick?: () => void;
  classes?: { card?: string };
}) => {
  return (
    <div
      className={classNames(
        "glass-card",
        classes?.card
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
