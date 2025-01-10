import { env } from "~/env"

export const siteConfig = {
  name: "UNWIRE LIST",
  tagline: "搜羅適合香港嘅軟件及工具",
  description:
    "精選最適合香港市場嘅軟件、工具及服務，助你提升生活及工作效率。無論係個人、企業定初創，都可以喺呢度搵到啱用嘅解決方案。",
  email: env.NEXT_PUBLIC_SITE_EMAIL,
  url: env.NEXT_PUBLIC_SITE_URL,

  alphabet: "abcdefghijklmnopqrstuvwxyz",
  toolsPerPage: 35,
  alternativesPerPage: 54,

  affiliateUrl: "https://go.openalternative.co",
}
