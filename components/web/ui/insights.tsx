import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import {
  Fragment,
  type HTMLAttributes,
  type ReactNode,
  isValidElement,
} from "react";
import { cx } from "~/utils/cva";

type InsightsProps = HTMLAttributes<HTMLElement> & {
  insights: {
    label: string;
    value: ReactNode;
  }[];
  toolPrice?: string;
  freeTier: boolean;
};

export const Insights = ({
  className,
  toolPrice,
  insights,
  freeTier,
  ...props
}: InsightsProps) => {
  return (
    <div
      className={cx("w-full flex text-xs gap-6 items-center", className)}
      {...props}
    >
      {insights.map(({ label, value }) => {
        return value ? (
          <Fragment key={label}>
            <p className="text-secondary p-1  border-1 border-gray-700 rounded-md">
              <span className="">{value && label}</span>
            </p>
          </Fragment>
        ) : null;
      })}
        {freeTier || toolPrice ? (
          <p className="text-xs text-gray-500">
            <span className="text-green-500">{(freeTier || toolPrice) && "$ "}</span>
            {freeTier && "免費試用"}
            {freeTier && toolPrice && "+ "}
            {toolPrice && `月費由 $${toolPrice}起`}
          </p>
        ) : null}
    </div>
  );
};
