import { revalidateTag } from "next/cache";
import { config } from "~/config";
import EmailToolScheduled from "~/emails/tool-scheduled";
import { sendEmails } from "~/lib/email";
import { generateContent } from "~/lib/generate-content";
import { uploadFavicon, uploadScreenshot } from "~/lib/media";
import { firecrawlClient } from "~/services/firecrawl";
import { inngest } from "~/services/inngest";
import { prisma } from "~/services/prisma";

export const toolScheduled = inngest.createFunction(
  { id: "tool.scheduled", concurrency: { limit: 2 } },
  { event: "tool.scheduled" },

  async ({ event, step, logger }) => {
    const tool = await step.run("find-tool", async () => {
      return prisma.tool.findUniqueOrThrow({
        where: { slug: event.data.slug },
      });
    });

    // Scrape website
    // const scrapedData = await step.run("scrape-website", async () => {
    //   const data = await firecrawlClient.scrapeUrl(tool.website, {
    //     formats: ["markdown"],
    //     headers: { "User-Agent": "Mozilla/5.0 (compatible; MyApp/1.0)" },
    //   });

    //   if (!data.success) {
    //     throw new Error(data.error);
    //   }

    //   logger.info(`Scraped website for ${tool.name}`, { data });

    //   return data;
    // });

    // Run steps in parallel
    step.run("generate-content", async () => {
      const { categories, alternatives, ...content } = await generateContent({
        success: true,
        markdown:
          "Personnaliser les témoins\n\n## Nous utilisons des témoins\n\nLe respect de votre vie privée compte pour nous. Nous utilisons des témoins (ex. : _cookies_) pour personnaliser nos contenus et faciliter votre expérience numérique. Certains témoins peuvent être recueillis avec votre consentement.\n\nShow this message in English\n\nTout accepter\n\nPersonnaliser vos choix\n\n![](https://cdn.cookielaw.org/logos/static/ot_company_logo.png)\n\n## Personnaliser vos choix\n\nLes témoins (ex. : _cookies_) sont de petits fichiers déposés sur votre appareil. Ils nous permettent de mémoriser des informations sur vos préférences et vos interactions avec notre site. Si vous les autorisez, les informations recueillies seront conservées pour vos prochaines visites.\n\n\n[Lire notre politique](https://www.desjardins.com/confidentialite/politique-utilisation-temoins/index.jsp)\n\n### Catégories de témoins\n\n#### Témoins nécessaires\n\nCes témoins sont obligatoires.\n\nCes témoins vous permettent d’apprécier toutes les fonctionnalités de notre site et d’y naviguer de manière optimale et sécuritaire. Ils nous servent aussi à vous demander votre opinion et à évaluer votre satisfaction.\n\n#### Performance\n\nPerformance\n\nCes témoins nous permettent d’analyser la navigation sur nos sites pour en améliorer le fonctionnement.\n\n#### Personnalisation\n\nPersonnalisation\n\nCes témoins nous permettent de mémoriser vos préférences et de personnaliser les contenus qui vous sont proposés en fonction de votre navigation et de vos choix antérieurs.\n\n#### Publicité ciblée\n\nPublicité ciblée\n\nCes témoins nous aident à limiter le nombre de fois que vous voyez une publicité, à personnaliser nos offres et services en fonction de vos centres d’intérêts, à mesurer l’efficacité d’une campagne publicitaire, etc. Ceux-ci peuvent être partagés avec nos partenaires.\n\nBack Button\n\n### Liste des cookies\n\nSearch Icon\n\nFilter Icon\n\nClear\n\ncheckbox labellabel\n\nApplyCancel\n\nConsentLeg.Interest\n\ncheckbox labellabel\n\ncheckbox labellabel\n\ncheckbox labellabel\n\nTout refuserConfirmer la sélection\n\n[![Powered by Onetrust](https://cdn.cookielaw.org/logos/static/powered_by_logo.svg)](https://www.onetrust.com/products/cookie-consent/)",
        metadata: {
          title: "Back ButtonSearch IconFilter Icon",
          language: "fr",
          ogLocaleAlternate: [],
          viewport: "width=device-width",
          "next-head-count": "8",
          sourceURL: "https://desjardins-workplace.relevance.studio/fr",
          url: "https://desjardins-workplace.relevance.studio/fr",
          statusCode: 200,
        },
      });

      return prisma.tool.update({
        where: { id: tool.id },
        data: {
          ...content,

          categories: {
            connectOrCreate: categories.map(({ id }) => ({
              where: {
                toolId_categoryId: { toolId: tool.id, categoryId: id },
              },
              create: { category: { connect: { id } } },
            })),
          },

          alternatives: {
            connectOrCreate: alternatives.map(({ id }) => ({
              where: {
                toolId_alternativeId: { toolId: tool.id, alternativeId: id },
              },
              create: { alternative: { connect: { id } } },
            })),
          },
        },
      });
    }),
      // step.run("upload-favicon", async () => {
      //   const { id, slug, website } = tool;
      //   const faviconUrl = await uploadFavicon(
      //     website,
      //     `tools/${slug}/favicon`
      //   );

      //   return prisma.tool.update({
      //     where: { id },
      //     data: { faviconUrl },
      //   });
      // }),

      // step.run("upload-screenshot", async () => {
      //   const { id, slug, website } = tool;
      //   const screenshotUrl = await uploadScreenshot(
      //     website,
      //     `tools/${slug}/screenshot`
      //   );

      //   return prisma.tool.update({
      //     where: { id },
      //     data: { screenshotUrl },
      //   });
      // }),

      // Disconnect from DB
      await step.run("disconnect-from-db", async () => {
        return prisma.$disconnect();
      });

    // Revalidate cache
    await step.run("revalidate-cache", async () => {
      revalidateTag("admin-tools");
      revalidateTag("schedule");
      revalidateTag(`tool-${tool.slug}`);
    });

    // Send email
    await step.run("send-email", async () => {
      if (!tool.submitterEmail) return;

      const to = tool.submitterEmail;
      const subject = `Great news! ${tool.name} is scheduled for publication on ${config.site.name} 🎉`;

      return sendEmails({
        to,
        subject,
        react: EmailToolScheduled({ to, subject, tool }),
      });
    });
  }
);
