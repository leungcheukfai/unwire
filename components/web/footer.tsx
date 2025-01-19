import { formatNumber } from "@curiousleaf/utils"
import { AtSignIcon, RssIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import { H5, H6 } from "~/components/common/heading"
import { BrandLinkedInIcon } from "~/components/common/icons/brand-linkedin"
import { BrandXIcon } from "~/components/common/icons/brand-x"
import { Stack } from "~/components/common/stack"
import { NewsletterForm } from "~/components/web/newsletter-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/web/ui/dropdown-menu"
import { Logo } from "~/components/web/ui/logo"
import { NavigationLink } from "~/components/web/ui/navigation-link"
import { Tooltip, TooltipProvider } from "~/components/web/ui/tooltip"
import { config } from "~/config"
import { cx } from "~/utils/cva"
import { updateUrlWithSearchParams } from "~/utils/queryString"
import { BrandFacebookIcon } from "../common/icons/brand-facebook"
import { BrandInstagramIcon } from "../common/icons/brand-instagram"

type FooterProps = HTMLAttributes<HTMLElement> & {
  hideNewsletter?: boolean
}

export const Footer = ({ children, className, hideNewsletter, ...props }: FooterProps) => {
  return (
    <footer className="flex flex-col gap-y-8 mt-auto pt-8 border-t border-muted/15 md:pt-10 lg:pt-12">
      <div
        className={cx(
          "grid grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 md:grid-cols-[repeat(16,minmax(0,1fr))]",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-start gap-4 col-span-full md:col-span-6">
          {hideNewsletter ? (
            <Stack direction="column" className="text-sm/normal">
              <Stack size="sm" className="group/link" asChild>
                <Link href="/" prefetch={false}>
                  <Logo className="size-5 shrink-0" />
                  <span className="font-display font-medium text-sm">{config.site.name}</span>
                </Link>
              </Stack>

              <p className="text-foreground/65 max-w-80">{config.site.description}</p>
            </Stack>
          ) : (
            <Stack size="lg" direction="column" className="min-w-0 max-w-64">
              <H5 as="strong" className="px-0.5 font-medium">
                UNWIRE科技電子報
              </H5>

              <p className="-mt-2 px-0.5 text-sm text-muted first:mt-0">
              已經超過 {formatNumber(config.stats.subscribers, "standard")}人訂閱
              </p>

              <NewsletterForm medium="footer_form" />
            </Stack>
          )}

          <Stack className="text-sm/normal">
            <TooltipProvider delayDuration={500} disableHoverableContent>
              <DropdownMenu modal={false}>
                <Tooltip tooltip="RSS Feeds">
                  <DropdownMenuTrigger aria-label="RSS Feeds" {...props}>
                    <RssIcon className="size-[1.44em] stroke-[1.25] text-muted hover:text-foreground" />
                  </DropdownMenuTrigger>
                </Tooltip>

                <DropdownMenuContent align="start" side="top">
                  {config.links.feeds.map(({ url, title }) => (
                    <DropdownMenuItem key={url} asChild>
                      <Link href={url} target="_blank" rel="nofollow noreferrer" prefetch={false}>
                        RSS &raquo; {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip tooltip="Contact us">
                <NavigationLink
                  href={`mailto:${config.site.email}`}
                  target="_blank"
                  rel="nofollow noreferrer"
                  aria-label="Contact us"
                >
                  <AtSignIcon className="size-[1.44em] stroke-[1.25]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="Follow us on X/Twitter">
                <NavigationLink
                  href={config.links.twitter}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandXIcon className="size-[1.44em] stroke-[1.25]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="Follow us on Bluesky">
                <NavigationLink
                  href={config.links.bluesky}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandInstagramIcon className="size-[1.44em] stroke-[1.25]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="Follow us on LinkedIn">
                <NavigationLink
                  href={config.links.linkedin}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandLinkedInIcon className="size-[1.44em] stroke-[1.25]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="View source code">
                <NavigationLink
                  href={config.links.github}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <BrandFacebookIcon className="size-[1.44em] stroke-[1.25]" />
                </NavigationLink>
              </Tooltip>
            </TooltipProvider>
          </Stack>
        </div>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3 md:col-start-8">
          <H6 as="strong">瀏覽:</H6>

          <NavigationLink href="/alternatives">工具選擇</NavigationLink>
          <NavigationLink href="/categories">工具分類</NavigationLink>
          {/* <NavigationLink href="/languages">Languages</NavigationLink> */}
          {/* <NavigationLink href="/topics">工具列表</NavigationLink> */}
          {/* <NavigationLink href="/licenses">Licenses</NavigationLink> */}
        </Stack>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3">
          <H6 as="strong">快速連結:</H6>

          <NavigationLink href="/advertise">與我們合作</NavigationLink>
          <NavigationLink href="/submit">免費新增工具</NavigationLink>
          <NavigationLink href="/about">關於我們</NavigationLink>
          {/* <NavigationLink href="/blog">BLOG</NavigationLink> */}
        </Stack>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3">
          <H6 as="strong">其他連結:</H6>

          {config.links.family.map(({ href, title, description }) => (
            <NavigationLink
              key={href}
              href={updateUrlWithSearchParams(href, { ref: config.site.name.toLowerCase() })}
              target="_blank"
              rel="noreferrer noopener"
              title={description}
            >
              {title}
            </NavigationLink>
          ))}
        </Stack>
      </div>

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-2 w-full">
        <NavigationLink
          href={config.links.author}
          className="text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <img
            src="/authors/piotrkulpinski.webp"
            alt="Piotr Kulpinski"
            loading="lazy"
            width="16"
            height="16"
            decoding="async"
            className="max-sm:hidden size-4 rounded-full"
          /> */}
          {/* Made by Piotr Kulpinski */}
        </NavigationLink>

        <p className="text-xs text-muted">此網站可能包含推廣連結</p>
      </div>

      {children}
    </footer>
  )
}
