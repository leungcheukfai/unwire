"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/web/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <Intro>
      <IntroTitle>404 找不到頁面</IntroTitle>

      <IntroDescription className="max-w-xl">
        抱歉，我們無法找到  {pathname} 頁面。 可能是您輸入的網址有誤，或者該頁面已經被剷除。
      </IntroDescription>

      <Button size="lg" className="mt-4" asChild>
        <Link href="/" prefetch={false}>
          返回首頁
        </Link>
      </Button>
    </Intro>
  )
}
