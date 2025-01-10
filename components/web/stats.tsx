import type { HTMLAttributes } from "react"
import { MDXComponents } from "~/components/web/mdx-components"
import { Stat } from "~/components/web/ui/stat"
import { config } from "~/config"
import { cx } from "~/utils/cva"

export const Stats = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const stats = [
    { value: config.stats.pageviews, label: "每月瀏覽量" },
    { value: config.stats.tools, label: "軟件及工具" },
    { value: config.stats.subscribers, label: "電子報訂閱者" },
    { value: config.stats.stars, label: "社交媒體追蹤者" },
  ]

  return (
    <div
      className={cx("flex flex-wrap items-center justify-around gap-x-4 gap-y-8", className)}
      {...props}
    >
      {stats.map(({ value, label }, index) => (
        <MDXComponents.a
          key={`${index}-${label}`}
          className="flex flex-col items-center gap-1 basis-[12rem] hover:[&[href]]:opacity-80"
        >
          <Stat
            value={value}
            format={{ notation: "compact" }}
            locales="en-US"
            // @ts-ignore
            style={{ "--number-flow-char-height": "0.75em" }}
            className="text-5xl font-semibold tabular-nums"
          />
          <p className="text-muted">{label}</p>
        </MDXComponents.a>
      ))}
    </div>
  )
}
