import type { Metadata } from "next"
import Link from "next/link"
import { AdsPicker } from "~/components/web/ads-picker"
import { Advertisers } from "~/components/web/advertisers"
import { Stats } from "~/components/web/stats"
import { Testimonial } from "~/components/web/testimonial"
import { Button } from "~/components/web/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { config } from "~/config"
import { metadataConfig } from "~/config/metadata"
import { findAds } from "~/server/web/ads/queries"

export const metadata: Metadata = {
  title: `在${config.site.name} 推廣你的軟件或工具`,
  description: `立即在${config.site.name} 推廣你的業務或軟件，接觸廣大的香港科技愛好者。`,
  openGraph: { ...metadataConfig.openGraph, url: "/advertise" },
  alternates: { ...metadataConfig.alternates, canonical: "/advertise" },
}

export default async function AdvertisePage() {
  const ads = await findAds({})

  return (
    <>
      <Intro alignment="center">
        <IntroTitle>{`${metadata.title}`}</IntroTitle>

        <IntroDescription className="max-w-3xl">
          推廣你的業務或軟件，接觸廣大的香港科技愛好者。
          {/* Check our{" "}
          <a href={config.links.analytics} target="_blank" rel="noopener noreferrer nofollow">
            real-time analytics
          </a>{" "}
          to see what impact it could have on your business. */}
        </IntroDescription>
      </Intro>

      <AdsPicker ads={ads} className="w-full max-w-2xl mx-auto" />

      <Stats className="my-4" />

      {/* {config.ads.testimonials.map(testimonial => (
        <Testimonial key={testimonial.quote} {...testimonial} className="my-4" />
      ))} */}

      {/* <div className="flex flex-col items-center text-center gap-6 mt-4" id="advertisers">
        <p className="text-sm text-muted">
          與我們合作的品牌
        </p>

        <Advertisers />
      </div> */}

      <hr />

      <Intro alignment="center" className="md:my-4 lg:my-8">
        <IntroTitle size="h2" as="h3">
          有興趣刊登廣告？
        </IntroTitle>

        <IntroDescription className="max-w-lg">
          請提供更多關於你們公司的資料，我們會盡快聯絡你！
        </IntroDescription>

        <Button variant="fancy" className="mt-4  bg-[#01DD85] min-w-40" asChild>
          <Link href={`mailto:${config.site.email}`} target="_blank" rel="noopener noreferrer">
            聯絡我們
          </Link>
        </Button>
      </Intro>
    </>
  )
}
