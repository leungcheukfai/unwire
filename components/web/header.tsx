"use client";

import {
  CalendarDaysIcon,
  ChevronDownIcon,
  CodeXmlIcon,
  CopyrightIcon,
  GalleryHorizontalEndIcon,
  SearchIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes, Suspense, useEffect, useState } from "react";
import { Stack } from "~/components/common/stack";
import { SearchForm } from "~/components/web/search-form";
import { Button } from "~/components/web/ui/button";
import { Container } from "~/components/web/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/web/ui/dropdown-menu";
import { Logo } from "~/components/web/ui/logo";
import {
  NavigationLink,
  navigationLinkVariants,
} from "~/components/web/ui/navigation-link";
import { config } from "~/config";
import { cx } from "~/utils/cva";
import { BrandFacebookIcon } from "../common/icons/brand-facebook";
import { BrandInstagramIcon } from "../common/icons/brand-instagram";
import { BrandThreadsIcon } from "../common/icons/brand-threads";

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);

  // Close the mobile navigation when the user presses the "Escape" key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <Container
      className={cx(
        "group/menu sticky top-[var(--header-top)] inset-x-0 z-50 duration-300",
        "max-lg:data-[state=open]:bg-background/90",
        className
      )}
      id="header"
      role="banner"
      data-state={isNavOpen ? "open" : "close"}
      {...props}
    >
      <div className="absolute top-0 inset-x-0 h-[calc(var(--header-top)+var(--header-height)+2rem)] pointer-events-none bg-linear-to-b from-background via-background to-transparent lg:h-[calc(var(--header-top)+var(--header-height)+3rem)]" />

      <div className="relative flex flex-nowrap items-center py-3.5 gap-x-3 text-sm h-[var(--header-height)] isolate duration-300 lg:gap-4">
        <button
          type="button"
          onClick={() => setNavOpen(!isNavOpen)}
          className="block -m-1 lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            className="size-7 duration-300 select-none will-change-transform group-data-[state=open]/menu:rotate-45"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Toggle navigation icon"
          >
            <path
              className="fill-none duration-300 stroke-current stroke-5 [stroke-linecap:round] [stroke-dasharray:40_121] group-data-[state=open]/menu:[stroke-dashoffset:-68px]"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            />
            <path
              className="fill-none duration-300 stroke-current stroke-5 [stroke-linecap:round]"
              d="m 55,50 h -25"
            />
            <path
              className="fill-none duration-300 stroke-current stroke-5 [stroke-linecap:round] [stroke-dasharray:40_121] group-data-[state=open]/menu:[stroke-dashoffset:-68px]"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            />
          </svg>
        </button>

        {/* TODO: Add breadcrumbs */}
        {/* <Breadcrumbs className="mr-auto flex-1" /> */}
        {/* https://www.openstatus.dev/blog/dynamic-breadcrumb-nextjs */}
        <Logo className="mr-auto" />

        <nav className="contents max-lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cx(navigationLinkVariants({ className: "gap-1" }))}
            >
              瀏覽{" "}
              <ChevronDownIcon className="group-data-[state=open]:-rotate-180 duration-200" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <NavigationLink href="/?sort=publishedAt.desc">
                  <CalendarDaysIcon className="shrink-0 size-4 opacity-75" />{" "}
                  最新工具
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavigationLink href="/categories">
                  <GalleryHorizontalEndIcon className="shrink-0 size-4 opacity-75" />{" "}
                  工具分類
                </NavigationLink>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <NavigationLink href="/languages">
                  <CodeXmlIcon className="shrink-0 size-4 opacity-75" />{" "}
                  Languages
                </NavigationLink>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem asChild>
                <NavigationLink href="/topics">
                  <TagIcon className="shrink-0 size-4 opacity-75" /> Topics
                </NavigationLink>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem asChild>
                <NavigationLink href="/licenses">
                  <CopyrightIcon className="shrink-0 size-4 opacity-75" />{" "}
                  Licenses
                </NavigationLink>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavigationLink href="/alternatives">工具選擇</NavigationLink>
          <NavigationLink href="/advertise">推廣合作</NavigationLink>
        </nav>

        <Stack size="sm" className="max-sm:hidden">
          <Suspense fallback={<SearchIcon className="size-4" />}>
            <SearchForm />
          </Suspense>



          <NavigationLink
            href={config.links.instagram}
            target="_blank"
            rel="nofollow noreferrer"
            title="追蹤我們的Instagram專頁"
          >
            <BrandInstagramIcon className="size-4" />
          </NavigationLink>
          <NavigationLink
            href={config.links.facebook}
            target="_blank"
            rel="nofollow noreferrer"
            title="追蹤我們的Facebook專頁"
          >
            <BrandFacebookIcon className="size-4" />
          </NavigationLink>
        </Stack>

        <Button size="sm" variant="secondary" asChild>
          <Link href="/submit" prefetch={false}>
            新增工具
          </Link>
        </Button>
      </div>

      <nav
        className={cx(
          "absolute top-full inset-x-0 h-[calc(100dvh-var(--header-top)-var(--header-height))] -mt-px py-4 px-6 grid grid-cols-2 place-items-start place-content-start gap-x-4 gap-y-6 bg-background/90 backdrop-blur-lg transition-opacity lg:hidden",
          isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <NavigationLink href="/?sort=publishedAt.desc" className="text-base">
          最新
        </NavigationLink>
        <NavigationLink href="/categories" className="text-base">
          工具分類
        </NavigationLink>
        <NavigationLink href="/alternatives" className="text-base">
          工具選擇
        </NavigationLink>
        {/* <NavigationLink href="/languages" className="text-base">
          Languages
        </NavigationLink>
        <NavigationLink href="/topics" className="text-base">
          Topics
        </NavigationLink> */}
        <NavigationLink href="/submit" className="text-base">
          提交工具
        </NavigationLink>
        <NavigationLink href="/advertise" className="text-base">
          推廣合作
        </NavigationLink>
        <NavigationLink href="/about" className="text-base">
          關於我們
        </NavigationLink>

        <Suspense fallback={<SearchIcon className="size-4 sm:hidden" />}>
          <SearchForm className="sm:hidden" />
        </Suspense>
      </nav>
    </Container>
  );
};
