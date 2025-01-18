import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { AlternativeListing } from "~/app/(web)/alternatives/(alternatives)/listing"
import { AlternativeQuerySkeleton } from "~/components/web/alternatives/alternative-query"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { metadataConfig } from "~/config/metadata"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "熱門工具及軟件方案",
  description: "探索最優秀的專業工具及軟件，挑選最適合你的方案！",
  openGraph: { ...metadataConfig.openGraph, url: "/alternatives" },
  alternates: { ...metadataConfig.alternates, canonical: "/alternatives" },
}

export default function Alternatives({ searchParams }: PageProps) {
  return (
    <>
      <Intro>
        <IntroTitle>{`${metadata.title}`}</IntroTitle>
        <IntroDescription>{metadata.description}</IntroDescription>
      </Intro>

      <Suspense fallback={<AlternativeQuerySkeleton />}>
        <AlternativeListing searchParams={searchParams} />
      </Suspense>
    </>
  )
}
