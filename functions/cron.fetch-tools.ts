import { ToolStatus } from "@prisma/client"
import { revalidateTag } from "next/cache"
import { getMilestoneReached } from "~/lib/milestones"
import { getPostMilestoneTemplate, getPostTemplate, sendSocialPost } from "~/lib/socials"
import { isToolPublished } from "~/lib/tools"
import { findRandomTool } from "~/server/web/tools/queries"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const fetchTools = inngest.createFunction(
  { id: "fetch-tools" },
  { cron: "TZ=Europe/Warsaw 0 0 * * *" }, // Every day at midnight

  async ({ step, logger }) => {
    const tools = await step.run("fetch-tools", async () => {
      return prisma.tool.findMany({
        where: { status: { in: [ToolStatus.Published, ToolStatus.Scheduled] } },
      })
    })


    // Post on Socials about a random tool
    // await step.run("post-on-socials", async () => {
    //   const tool = await findRandomTool()

    //   if (tool) {
    //     const template = await getPostTemplate(tool)
    //     return sendSocialPost(template, tool)
    //   }
    // })

    // Disconnect from DB
    await step.run("disconnect-from-db", async () => {
      return prisma.$disconnect()
    })

    // Revalidate cache
    await step.run("revalidate-cache", async () => {
      revalidateTag("tools")
      revalidateTag("tool")
    })
  },
)
