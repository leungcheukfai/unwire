import type { Metadata } from "next"
import Link from "next/link"
import { Featured } from "~/components/web/featured"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Prose } from "~/components/web/ui/prose"
import { config } from "~/config"
import { metadataConfig } from "~/config/metadata"
import { addUTMTracking } from "~/utils/helpers"
import { updateUrlWithSearchParams } from "~/utils/queryString"

export const metadata: Metadata = {
  title: "關於我們",
  description: `${config.site.name} 是一個社群驅動的平台，專為香港市場搜羅開源和專有軟件的替代方案。`,
  openGraph: { ...metadataConfig.openGraph, url: "/about" },
  alternates: { ...metadataConfig.alternates, canonical: "/about" },
}

export default function AboutPage() {
  return (
    <>
      <Intro alignment="start">
        <IntroTitle>{`${metadata.title}`}</IntroTitle>
        <IntroDescription>{metadata.description}</IntroDescription>
      </Intro>

      {/* <Featured /> */}

      <Prose>
        <h2>關於 UNWIRE LIST</h2>
        <p>
          UNWIRE LIST 是一個社群驅動的平台，專為香港市場搜羅開源和專有軟件的替代方案。
          我們致力於幫助個人、企業和初創公司找到最適合的軟件、工具和服務，以提升生活與工作效率。
        </p>

        <h2>UNWIRE LIST 是什麼？</h2>
        <p>
          UNWIRE LIST 是一個為香港市場設計的軟件和工具目錄。我們的目標是成為您尋找新服務的第一站，
          無論您是希望探索替代工具，還是尋找當前使用產品的詳細評測，這裡都能滿足您的需求。
        </p>

        <h2>UNWIRE LIST 的起源</h2>
        <p>
          我們發現自己在尋找優秀軟件時有著強烈的需求，因此我們嘗試並測試了許多不同的軟件工具。
          在這個過程中，我們累積了豐富的經驗，並希望將這些發現分享給更多人。
          同時，我們也希望這些優秀的軟件能在香港市場獲得更多的曝光機會，幫助更多用戶提升生活與工作的效率。
        </p>

        <h2>UNWIRE LIST 的排名如何計算？</h2>
        <p>
          UNWIRE LIST 使用一套獨特的算法來確定工具和軟件替代方案的排名，確保排名反映真實用戶需求和使用價值。
          我們的算法考慮了以下因素：
        </p>
        <ul>
          <li>
            <strong>社群關注度：</strong>
            工具在 UNWIRE LIST 上的點讚、評論和點擊量，優先顯示受用戶歡迎的選項。
          </li>
          <li>
            <strong>與分類的相關性：</strong>
            每個工具根據其是否符合分類需求進行評估，滿足多項分類需求的工具將獲得更高排名。
          </li>
          <li>
            <strong>易用性與可及性：</strong>
            工具的使用門檻、界面友好度和文檔完整性是重要考量，讓用戶能快速上手。
          </li>
          <li>
            <strong>創新功能：</strong>
            具備獨特功能或創新設計的工具將在排名中獲得提升。
          </li>
          <li>
            <strong>社群回饋：</strong>
            來自 UNWIRE LIST 社群的正面評價，例如高滿意度或實用性評論，會影響工具的排名。
          </li>
        </ul>
        <p>
          我們的排名方式不僅僅依賴傳統的打星或數據記錄，而是強調真實世界的實用性與社群驅動的洞察，
          讓最具影響力的工具脫穎而出。
        </p>

        <h2>UNWIRE LIST 的目標</h2>
        <p>
          我們致力於為香港的用戶提供最具價值的軟件和工具選擇。不論您是個人用戶，
          還是需要提升商業效率的企業，UNWIRE LIST 都能成為您探索新技術的最佳伴侶。
        </p>

        <h2>關於我們</h2>
        <p>
          我們是 UNWIRE.HK，一個熱愛科技的團隊，致力於報導最新的科技新聞，同時回饋社群。我們始終關注技術的應用與創新，並不斷推出更多實用且有趣的項目，例如：
        </p>
        <ul>
          <li>
            <Link href="https://unwire.hk" target="_blank">
              UNWIRE.HK
            </Link>{" "}
            – 玩生活‧樂科技：有趣科技產品新聞、評測
          </li>
          <li>
            <Link href="https://unwire.pro" target="_blank">
              UNWIRE.PRO
            </Link>{" "}
            – 為 IT 人提供專業企業及職場資訊的網站
          </li>
        </ul>
        <p>如果您有任何問題或合作建議，隨時與我們聯繫！</p>
        <p>– UNWIRE.HK 團隊</p>
      </Prose>
    </>
  )
}
