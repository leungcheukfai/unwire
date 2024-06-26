import { Prisma } from "@prisma/client"

// Alternatives
export const alternativeOnePayload = Prisma.validator<Prisma.AlternativeInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
})

export const alternativeManyPayload = Prisma.validator<Prisma.AlternativeInclude>()({
  _count: { select: { tools: { where: { tool: { publishedAt: { lte: new Date() } } } } } },
})

export type AlternativeOne = Prisma.AlternativeGetPayload<{ include: typeof alternativeOnePayload }>
export type AlternativeMany = Prisma.AlternativeGetPayload<{
  include: typeof alternativeManyPayload
}>

// Categories
export const categoryOnePayload = Prisma.validator<Prisma.CategoryInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
})

export const categoryManyPayload = Prisma.validator<Prisma.CategoryInclude>()({
  _count: { select: { tools: { where: { tool: { publishedAt: { lte: new Date() } } } } } },
})

export type CategoryOne = Prisma.CategoryGetPayload<{ include: typeof categoryOnePayload }>
export type CategoryMany = Prisma.CategoryGetPayload<{ include: typeof categoryManyPayload }>

// Topics
export const topicOnePayload = Prisma.validator<Prisma.TopicInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
})

export const topicManyPayload = Prisma.validator<Prisma.TopicInclude>()({
  _count: { select: { tools: { where: { tool: { publishedAt: { lte: new Date() } } } } } },
})

export type TopicOne = Prisma.TopicGetPayload<{ include: typeof topicOnePayload }>
export type TopicMany = Prisma.TopicGetPayload<{ include: typeof topicManyPayload }>

// Languages
export const languageOnePayload = Prisma.validator<Prisma.LanguageInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
})

export const languageManyPayload = Prisma.validator<Prisma.LanguageInclude>()({
  _count: { select: { tools: { where: { tool: { publishedAt: { lte: new Date() } } } } } },
})

export type LanguageOne = Prisma.LanguageGetPayload<{ include: typeof languageOnePayload }>
export type LanguageMany = Prisma.LanguageGetPayload<{ include: typeof languageManyPayload }>

// Tools
export const toolOnePayload = Prisma.validator<Prisma.ToolInclude>()({})
export const toolManyPayload = Prisma.validator<Prisma.ToolInclude>()({})

export type ToolOne = Prisma.ToolGetPayload<{ include: typeof toolOnePayload }>
export type ToolMany = Prisma.ToolGetPayload<{ include: typeof toolManyPayload }>

export const languageToToolManyPayload = Prisma.validator<Prisma.LanguageToToolInclude>()({
  language: true,
})

export type LanguageToToolMany = Prisma.LanguageToToolGetPayload<{
  include: typeof languageToToolManyPayload
}>

// Sponsoring
export const sponsoringOnePayload = Prisma.validator<Prisma.SponsoringSelect>()({
  name: true,
  description: true,
  website: true,
  faviconUrl: true,
})

export type SponsoringOne = Prisma.SponsoringGetPayload<{ select: typeof sponsoringOnePayload }>
