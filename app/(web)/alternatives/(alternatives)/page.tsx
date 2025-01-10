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
  description: "瀏覽頂尖專工具及軟件，搵出最適合你嘅軟件工具。",
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
