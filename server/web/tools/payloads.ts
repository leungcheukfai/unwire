import { Prisma } from "@prisma/client";

export const toolAlternativesPayload =
  Prisma.validator<Prisma.Tool$alternativesArgs>()({
    include: { alternative: true },
    orderBy: [
      { alternative: { tools: { _count: "desc" } } },
      { alternative: { name: "asc" } },
    ],
  });

export const toolCategoriesPayload =
  Prisma.validator<Prisma.Tool$categoriesArgs>()({
    include: { category: true },
    orderBy: { category: { name: "asc" } },
  });

export const toolLanguagesPayload =
  Prisma.validator<Prisma.Tool$languagesArgs>()({
    include: { language: true },
    orderBy: [{ percentage: "desc" }],
  });

export const toolTopicsPayload = Prisma.validator<Prisma.Tool$topicsArgs>()({
  include: { topic: true },
  orderBy: { topic: { slug: "asc" } },
});

export const toolOnePayload = Prisma.validator<Prisma.ToolSelect>()({
  name: true,
  slug: true,
  website: true,
  tagline: true,
  description: true,
  content: true,
  faviconUrl: true,
  screenshotUrl: true,
  isFeatured: true,
  chinese: true,
  freeTier: true,
  aiPowered: true,
  hostingUrl: true,
  discountCode: true,
  discountAmount: true,
  price: true,
  publishedAt: true,
  updatedAt: true,
  license: true,
  alternatives: toolAlternativesPayload,
  categories: toolCategoriesPayload,
  languages: toolLanguagesPayload,
  topics: toolTopicsPayload,
});

export const toolManyPayload = Prisma.validator<Prisma.ToolSelect>()({
  name: true,
  slug: true,
  tagline: true,
  faviconUrl: true,
  aiPowered: true,
  isFeatured: true,
  chinese: true,
  freeTier: true,
  price: true,
  discountAmount: true,
  publishedAt: true,
  updatedAt: true,
});

export const toolManyExtendedPayload = Prisma.validator<Prisma.ToolSelect>()({
  name: true,
  slug: true,
  description: true,
  content: true,
  faviconUrl: true,
  screenshotUrl: true,
  discountCode: true,
  discountAmount: true,
  publishedAt: true,
  updatedAt: true,
  categories: { include: { category: true } },
});

export type ToolOne = Prisma.ToolGetPayload<{ select: typeof toolOnePayload }>;
export type ToolMany = Prisma.ToolGetPayload<{
  select: typeof toolManyPayload;
}>;
export type ToolManyExtended = Prisma.ToolGetPayload<{
  select: typeof toolManyExtendedPayload;
}>;
