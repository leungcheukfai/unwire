// import { formatNumber } from "@curiousleaf/utils";
// import { formatDistanceToNowStrict } from "date-fns";
// import { GitForkIcon, StarIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { H4 } from "~/components/common/heading";
import { Skeleton } from "~/components/common/skeleton";
import { Stack } from "~/components/common/stack";
import { ToolBadges } from "~/components/web/tools/tool-badges";
import { Badge } from "~/components/web/ui/badge";
import { Card, CardDescription, CardHeader } from "~/components/web/ui/card";
import { Favicon } from "~/components/web/ui/favicon";
import { Insights } from "~/components/web/ui/insights";
import type { ToolMany } from "~/server/web/tools/payloads";

type ToolCardProps = ComponentProps<typeof Card> & {
  tool: ToolMany;

  /**
   * Disables the view transition.
   */
  isRelated?: boolean;
};

const ToolCard = ({ className, tool, isRelated, ...props }: ToolCardProps) => {
  const insights = [
    { label: "Free Tier", value: tool.freeTier },
    {
      label: "Chinese",
      value: tool.chinese,
    },
    {
      label: "Ai Powered ",
      value: tool.aiPowered,
    },
  ];

  return (
    <Card asChild {...props} className="min-h-[200px]">
      <Link href={`/${tool.slug}`} prefetch={false} className="!pt-6">
        <CardHeader>
          <Favicon src={tool.faviconUrl} title={tool.name} />

          <H4 as="h3" className="truncate">
            {tool.name}
          </H4>

          <ToolBadges tool={tool} size="sm" className="ml-auto text-base">
            {tool.discountAmount && (
              <Badge variant="success">Get {tool.discountAmount}!</Badge>
            )}
          </ToolBadges>
        </CardHeader>

        {tool.tagline && <CardDescription>{tool.tagline}</CardDescription>}

        {/* <Insights insights={insights} className="mt-auto" /> */}
        {tool.freeTier || tool.price ? (
          <p className="text-xs text-gray-500 pt-10">
            <span className="text-green-500">
              {(tool.freeTier || tool.price) && "$ "}
            </span>
            {tool.freeTier && "free "}
            {tool.freeTier && tool.price && "+"}
            {tool.price && ` from $${tool.price}/mo`}
          </p>
        ) : null}
      </Link>
    </Card>
  );
};

const ToolCardSkeleton = () => {
  return (
    <Card hover={false} className="items-stretch select-none">
      <CardHeader>
        <Favicon src="/favicon.png" className="animate-pulse opacity-50" />

        <H4 className="w-2/3">
          <Skeleton>&nbsp;</Skeleton>
        </H4>
      </CardHeader>

      <CardDescription className="flex flex-col gap-0.5">
        <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
        <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
      </CardDescription>
    </Card>
  );
};

export { ToolCard, ToolCardSkeleton };
