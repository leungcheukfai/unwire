import { siteConfig } from "~/config/site"

export const linksConfig = {
  author: "https://ericleung.hk",
  twitter: "https://x.com/unwirelife",
  bluesky: "https://www.instagram.com/unwirehk",
  linkedin: "https://www.linkedin.com/company/unwire.hk",
  github: "https://www.instagram.com/unwirehk",
  analytics: "https://www.linkedin.com/company/unwire.hk",
  facebook: "https://www.facebook.com/unwirehk",
  instagram: "https://www.instagram.com/unwirehk",
  feeds: [
    { title: "UNWIRE LIST", url: `${siteConfig.url}/rss/tools.xml` },
    { title: "UWNIRE LIST 工具選擇", url: `${siteConfig.url}/rss/alternatives.xml` },
  ],
  family: [
    {
      title: "UNWIRE.HK",
      href: "https://unwire.hk",
      description: "UNWIRE.HK 玩生活‧樂科技 | 有趣科技產品新聞、評測",
    },
    {
      title: "UNWIRE.PRO",
      href: "https://unwire.pro",
      description: "Unwire.Pro 是一個為不同崗位的 IT 人提供 IT 企業及職場資訊的網站",
    },
    // {
    //   title: "Chipmunk Theme",
    //   href: "https://chipmunktheme.com",
    //   description: "Build directory websites in WordPress",
    // },
  ],
  toolsUsed: [
    {
      title: "ScreenshotOne",
      href: "https://kulp.in/screenshotone",
      description: "The screenshot API for developers",
    },
    {
      title: "Typefully",
      href: "https://kulp.in/typefully",
      description: "Twitter scheduling/analytics",
    },
    {
      title: "Beehiiv",
      href: "https://kulp.in/beehiiv",
      description: "Newsletter",
    },
    {
      title: "Airtable",
      href: "https://kulp.in/airtable",
      description: "Database",
    },
    {
      title: "Screen Studio",
      href: "https://kulp.in/screenstudio",
      description: "Screen recording for marketing videos",
    },
  ],
  featured: [
    {
      name: "Hacker News",
      url: "https://news.ycombinator.com/item?id=39639386",
      icon: "/hackernews.svg",
    },
    {
      name: "Indie Hackers",
      url: "https://www.indiehackers.com/post/how-i-grew-a-side-project-to-100k-unique-visitors-in-7-days-with-0-audience-15d48ea192",
      icon: "/indiehackers.svg",
    },
    {
      name: "Product Hunt",
      url: "https://www.producthunt.com/posts/openalternative",
      icon: "/producthunt.svg",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/steventey/status/1765841867017437599",
      icon: "/twitter.svg",
    },
  ],
}
