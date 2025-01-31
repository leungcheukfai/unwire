import { type Prisma, ToolStatus } from "@prisma/client"
import { cache } from "~/lib/cache"
import { categoryManyPayload, categoryOnePayload } from "~/server/web/categories/payloads"
import { prisma } from "~/services/prisma"

export const findCategories =
  async ({ where, orderBy, ...args }: Prisma.CategoryFindManyArgs) => {
    return prisma.category.findMany({
      ...args,
      orderBy: orderBy ?? { name: "asc" },
      where: { tools: { some: { tool: { status: ToolStatus.Published } } }, ...where },
      select: categoryManyPayload,
    })
  }

export const findCategorySlugs = async ({
  where,
  orderBy,
  ...args
}: Prisma.CategoryFindManyArgs) => {
  return prisma.category.findMany({
    ...args,
    orderBy: orderBy ?? { name: "asc" },
    where: { tools: { some: { tool: { status: ToolStatus.Published } } }, ...where },
    select: { slug: true, updatedAt: true },
  })
}

export const findCategoryBySlug = (
  slug: string,
  { where, ...args }: Prisma.CategoryFindFirstArgs = {},
) =>
  cache(
    async (slug: string) => {
      return prisma.category.findFirst({
        ...args,
        where: { slug, ...where },
        select: categoryOnePayload,
      })
    },
    ["category", `category-${slug}`],
  )(slug)
