import type { Category } from "@prisma/client"
import { AwardIcon } from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"
import { SmilePlusIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { Fragment, cache } from "react"
import { AlternativeCardExternal } from "~/components/web/alternatives/alternative-card-external"
import { AlternativePreview } from "~/components/web/alternatives/alternative-preview"
import { InlineMenu } from "~/components/web/inline-menu"
import { ShareButtons } from "~/components/web/share-buttons"
import { ToolEntry } from "~/components/web/tools/tool-entry"
import { BackButton } from "~/components/web/ui/back-button"
import { Button } from "~/components/web/ui/button"
import { FaviconImage } from "~/components/web/ui/favicon"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Prose } from "~/components/web/ui/prose"
import { Section } from "~/components/web/ui/section"
import { metadataConfig } from "~/config/metadata"
import type { AlternativeOne } from "~/server/web/alternatives/payloads"
import { findAlternativeBySlug, findAlternativeSlugs } from "~/server/web/alternatives/queries"
import { findToolsWithCategories } from "~/server/web/tools/queries"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

const getAlternative = cache(async ({ params }: PageProps) => {
  const { slug } = await params
  const alternative = await findAlternativeBySlug(slug)

  if (!alternative) {
    notFound()
  }

  return alternative
})

const getMetadata = (alternative: AlternativeOne): Metadata => {
  const year = 2025
  const count = alternative._count.tools

  return {
    title: `${count > 1 ? `${count} ` : ""}Best Open Source ${alternative.name} Alternatives in ${year}`,
    description: `A curated collection of the best open source alternatives to ${alternative.name}. Each listing includes a website screenshot along with a detailed review of its features.`,
  }
}

export const generateStaticParams = async () => {
  const alternatives = await findAlternativeSlugs({})
  return alternatives.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const alternative = await getAlternative(props)
  const url = `/alternatives/${alternative.slug}`

  return {
    ...getMetadata(alternative),
    alternates: { ...metadataConfig.alternates, canonical: url },
    openGraph: { url, type: "website" },
  }
}

export default async function AlternativePage(props: PageProps) {
  const [alternative, tools] = await Promise.all([
    getAlternative(props),

    findToolsWithCategories({
      where: { alternatives: { some: { alternative: { slug: (await props.params).slug } } } },
      orderBy: [{ isFeatured: "desc" }, { score: "desc" }],
    }),
  ])

  const medalColors = ["text-amber-500", "text-slate-400", "text-orange-700"]
  const { title } = getMetadata(alternative)

  // Sort the categories by count
  const categories = Object.values(
    tools.reduce<Record<string, { count: number; category: Category }>>((acc, { categories }) => {
      for (const { category } of categories) {
        if (!acc[category.name]) {
          acc[category.name] = { count: 0, category }
        }
        acc[category.name].count += 1
      }
      return acc
    }, {}),
  ).sort((a, b) => b.count - a.count)

  // Pick the top 5 tools
  const bestTools = tools.slice(0, 5).map(tool => (
    <Link key={tool.slug} href={`/${tool.slug}`} prefetch={false}>
      {tool.name}
    </Link>
  ))

  // Pick the top categories
  const bestCategories = categories.slice(0, 3).map(({ category }) => (
    <Link key={category.slug} href={`/categories/${category.slug}`} prefetch={false}>
      {category.label || category.name}
    </Link>
  ))

  return (
    <>
      <Intro>
        <IntroTitle>{alternative.name}的其他推薦選擇</IntroTitle>

        <IntroDescription className="max-w-4xl">
          {alternative._count.tools
            ? `為你挑選的 ${alternative._count.tools}個${alternative.name} 替代方案。`
            : `沒有找到與 ${alternative.name} 的其他方案。`}
        </IntroDescription>
      </Intro>

      {!!tools.length && (
        <Section>
          <Section.Content className="gap-12 md:gap-14 lg:gap-16">
            <Prose>
              <p>
                {alternative.name} 最佳的替代方案是 {bestTools.shift()}。如果那不適合您， 
                我們已經編制了一個 <Link href="/about#how-are-rankings-calculated">排名列表</Link>， 
                收錄了其他的 {alternative.name} 替代方案，以幫助您找到合適的替代品。
                {!!bestTools.length && (
                  <>
                    {" "}
                    其他不錯的工具選擇
                    {bestTools.length === 1
                      ? ` alternative to ${alternative.name} is `
                      : ` alternatives to ${alternative.name} are: `}
                    {bestTools.map((alt, index) => (
                      <Fragment key={index}>
                        {index > 0 && index !== bestTools.length - 1 && ", "}
                        {index > 0 && index === bestTools.length - 1 && " and "}
                        {alt}
                      </Fragment>
                    ))}
                    .
                  </>
                )}
              </p>

              {!!bestCategories.length && (
                <p>
                  {alternative.name}的替代方案主要是{bestCategories.shift()}
                  {!!bestCategories.length && " but may also be "}
                  {bestCategories.map((category, index) => (
                    <Fragment key={index}>
                      {index > 0 && index !== bestCategories.length - 1 && ", "}
                      {index > 0 && index === bestCategories.length - 1 && " or "}
                      {category}
                    </Fragment>
                  ))}
                  . 如果您想要更好的替代方案列表，或正在尋找某種特定功能的話，可以瀏覽以下選項 {alternative.name}.
                </p>
              )}

              <ShareButtons title={`${title}`} className="not-prose" />
            </Prose>

            {tools.map(tool => (
              <ToolEntry key={tool.slug} id={tool.slug} tool={tool} className="scroll-m-20" />
            ))}

            <BackButton href="/alternatives" />
          </Section.Content>

          <Section.Sidebar className="order-first md:order-last md:max-h-[calc(100vh-5rem)]">
            <AlternativeCardExternal alternative={alternative} />

            <InlineMenu
              items={tools.map(({ slug, name, faviconUrl }, index) => ({
                id: slug,
                title: name,
                prefix: <FaviconImage src={faviconUrl} title={name} />,
                suffix: index < 3 && <AwardIcon className={medalColors[index]} />,
              }))}
              className="flex-1 mx-5 max-md:hidden"
            >
              <Button
                variant="ghost"
                prefix={<SmilePlusIcon />}
                suffix={<ArrowUpRightIcon />}
                className="font-normal text-muted ring-0!"
                asChild
              >
                <Link href="/submit" prefetch={false}>
                  Suggest an alternative
                </Link>
              </Button>
            </InlineMenu>
          </Section.Sidebar>
        </Section>
      )}

      <AlternativePreview />
    </>
  )
}
