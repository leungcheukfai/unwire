import { env } from "~/env"

export const siteConfig = {
  name: "UNWIRE LIST",
  tagline: "搜羅適合香港的軟件及工具",
  description:
    "精選最適合香港市場的軟件、工具及服務，助你提升生活與工作效率。無論是個人、企業還是初創公司，都能在這裡找到合適的解決方案。",
  email: env.NEXT_PUBLIC_SITE_EMAIL,
  url: env.NEXT_PUBLIC_SITE_URL,

  alphabet: "abcdefghijklmnopqrstuvwxyz",
  toolsPerPage: 35,
  alternativesPerPage: 54,

  affiliateUrl: "https://go.openalternative.co",
}
