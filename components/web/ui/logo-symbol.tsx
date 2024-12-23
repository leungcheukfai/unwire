import type { ComponentProps } from "react";
import { cx } from "~/utils/cva";

export const LogoSymbol = ({ className, ...props }: ComponentProps<"svg">) => {
  return (
    <img
      src="https://cdn.unwire.hk/wp-content/uploads/2016/12/push.png"
      alt="logo"
      className="h-6"
    />
  );
};
