import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import Page from "~/pages/psm-ai-essentials-guide.vue";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";

const { seoMeta } = vi.hoisted(() => ({
  seoMeta: vi.fn(),
}));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Master™ - AI Essentials 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "認定資格の全体像",
  "Module 1: AI基礎知識(AI Fundamentals)",
  "Module 2: Scrum MasterとAI",
  "Module 3: Scrum チームとAI",
  "Module 4: 責任あるAI利用と倫理",
  "発展: エージェント時代のScrum Master像",
  "試験対策チェックリスト",
  "用語集(Glossary)",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "対象読者",
  "このガイドの読み方",
  "1.1 PSM-AI Essentialsとは",
  "1.2 対象者・受験要件",
  "1.3 試験概要",
  "1.4 学習の進め方",
  "2.1 AIとは何か",
  "2.2 機械学習(Machine Learning)",
  "2.3 深層学習(Deep Learning)",
  "2.4 生成AI(Generative AI)",
  "2.5 エージェンティックAI(Agentic AI)とAIエージェント",
  "2.6 AIモデルとは",
  "2.7 概念の関係性(全体像)",
  "2.8 ベストプラクティス",
  "3.1 Scrum Masterのアカウンタビリティとの接続",
  "3.2 「チャットボットを超えて」— AIはファシリテーションのパートナー",
  "3.3 プロンプトエンジニアリングというスキル",
  "3.4 4D AI Fluency Framework",
  "3.5 Scrumイベント別のAI活用",
  "3.6 ベストプラクティス表",
  "4.1 チームレベルでのAI活用の観点",
  "4.2 Definition of Doneの変化 — 「透明性のファイアウォール」",
  "4.3 具体的な整理: DoDに追加を検討すべき観点",
  "4.4 ベストプラクティス",
  "5.1 なぜ倫理が問われるのか",
  "5.2 グローバルなAIガバナンスの枠組み(実務での参考知識)",
  "5.3 データプライバシーとセキュリティ",
  "5.4 人間の説明責任(Accountability)は代替されない",
  "5.5 「AIを使ってよいか」の判断フロー",
  "5.6 ベストプラクティス",
  "7.1 学習の優先順位",
  "7.2 受験前の確認事項",
  "Scrum.org公式情報(一次情報)",
  "認定トレーニングパートナーによる情報",
  "外部の権威ある情報源",
  "実務補助資料",
] as const;

const EXPECTED_H4 = [
  "「良いAIを活かしたDaily Scrum」の定義(チェックリスト)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "certification-overview",
  "ai-fundamentals",
  "ai-for-scrum-master",
  "ai-for-scrum-team",
  "ethics-responsible-ai",
  "agentic-future",
  "exam-prep-checklist",
  "glossary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 01",
  "SECTION 02",
  "SECTION 03",
  "SECTION 04",
  "SECTION 05",
  "SECTION 06",
  "SECTION 07",
  "SECTION 08",
  "SECTION 09",
  "SECTION 10",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://academy.xebia.com/training/professional-scrum-master-ai-essentials-psm-ai/",
  "https://agilemania.com/professional-scrum-master-ai-essentials-training",
  "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
  "https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf",
  "https://oecd.ai/en/ai-principles",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://scrumguides.org/scrum-guide.html",
  "https://tryscrum.com/certifications/agile/scrum/scrum-master/professional-scrum-master-ai-essentials/",
  "https://www.scrum.org/assessments/professional-scrum-master-ai-essentials-certification",
  "https://www.scrum.org/courses/professional-scrum-master-ai-essentials-training",
  "https://www.scrum.org/resources/blog/ai-augmented-scrum-framework-when-half-your-team-autonomous-agents",
  "https://www.scrum.org/resources/blog/ai-rewiring-scrum-teams-not-scrum",
  "https://www.scrum.org/resources/blog/scrum-master-ai-catalyst",
  "https://www.scrum.org/resources/blog/scrum-masters-ai-start-checklist",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
A["Module 1<br/>AI Fundamentals<br/>AIの基礎概念を理解する"] --> B["Module 2<br/>AI for the Scrum Master<br/>Scrum Masterの<br/>アカウンタビリティを強化する"] --> C["Module 3<br/>AI for the Scrum Team<br/>チームの協働・速度・品質を高める"] --> D["Module 4<br/>Ethics and Responsible AI<br/>倫理的で責任あるAI活用"]
D -.->|"試験対策・実践への橋渡し"| E["PSM-AI Essentials 認定試験"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D box;
class E done;`,
  `flowchart TB
subgraph AI["Artificial Intelligence 人工知能"]
subgraph ML["Machine Learning 機械学習"]
DL["Deep Learning 深層学習"]
end
GEN["Generative AI<br/>生成する能力"]
end
AGENT["Agentic AI<br/>目標を与えられ自律的に計画・実行する<br/>システムの振る舞い<br/>(モデルの階層とは別系統)"]
DL -.->|"生成AIの主流な実装手段<br/>(包含関係ではない)"| GEN
GEN -.->|"構成要素として組み込まれ得る<br/>(必須ではない)"| AGENT

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class AI,ML,DL,GEN,AGENT box;`,
  `flowchart LR
D1["Delegation<br/>委任すべきか判断する"] --> D2["Description<br/>目的を明確に記述する"] --> D3["Discernment<br/>出力を批判的に評価する"] --> D4["Diligence<br/>結果への責任を持つ"]
D4 -.->|"次回の委任判断に反映"| D1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D1,D2,D3,D4 box;`,
  `flowchart LR
SP["Sprint Planning<br/>依存関係のモデル化<br/>容量の可視化"] --> DS["Daily Scrum<br/>進捗の要約<br/>ブロッカーの可視化"] --> SR["Sprint Review<br/>フィードバックの集約"] --> RETRO["Sprint Retrospective<br/>多様な意見の統合"]
RETRO -.->|"気づきを次のSprintへ反映"| SP

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class SP,DS,SR,RETRO box;`,
  `flowchart TD
START["Scrum MasterがAI活用を検討している"] --> Q1{"選択したAI環境へのデータ入力が<br/>ベンダー規約・組織ポリシー・NDA等の<br/>組織ルールで許可されているか?"}
Q1 -->|"いいえ"| NG["利用を見送る、または<br/>安全な代替手段を検討する"]
Q1 -->|"はい"| Q2{"人間による最終判断を残せる設計か?"}
Q2 -->|"いいえ"| NG
Q2 -->|"はい"| Q3{"チームや組織の透明性・DoDと整合するか?"}
Q3 -->|"いいえ"| NG
Q3 -->|"はい"| OK["活用してよい<br/>結果は人間がレビューする"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Q1,Q2,Q3,NG box;
class START hub;
class OK done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/psm-ai-essentials-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: { note: 6, practice: 9 },
  calloutLabels: {
    note: { "補足": 6 },
    practice: { "ベストプラクティス": 9 },
  },
  stepTags: [],
  seoTitleFragments: ["PSM-AI", "Essentials"],
  seoTitle: "PSM-AI Essentials 認定資格 完全ガイド | Professional Scrum Master - AI Essentials",
  seoDescription: "Scrum.org公式 Professional Scrum Master™ - AI Essentials Certificationの初学者向け学習ガイド。AI基礎知識、4D AI Fluency Framework、Definition of Doneへの影響、責任あるAI利用までをMermaid図解と出典付きで解説します。",
});

describe("pages/psm-ai-essentials-guide.vue — テーブル構造契約", () => {
  const mountPage = createMountPage(Page);

  it("ページ内に 8 個の表が存在し、それぞれ適切なヘッダーと行数を持つ", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll(".table-wrap table");
    expect(tables).toHaveLength(8);

    const tableConfigs = [
      { headers: ["項目", "内容"], rowCount: 5 },
      { headers: ["項目", "内容"], rowCount: 9 },
      { headers: ["観点", "生成AI(Generative AI)", "エージェンティックAI(Agentic AI)"], rowCount: 4 },
      { headers: ["D", "名称", "内容"], rowCount: 4 },
      { headers: ["場面", "ベストプラクティス", "避けるべきアンチパターン"], rowCount: 5 },
      { headers: ["カテゴリ", "Definition of Doneに追記する観点の例"], rowCount: 4 },
      { headers: ["フレームワーク", "発行元", "位置づけ", "主な柱"], rowCount: 2 },
      { headers: ["優先度", "トピック", "理由"], rowCount: 6 },
    ];

    tables.forEach((table, i) => {
      const config = tableConfigs[i];
      expect(config).toBeDefined();
      if (!config) return;
      const ths = table.findAll("thead th").map((th) => th.text().trim());
      expect(ths).toEqual(config.headers);
      const rows = table.findAll("tbody tr");
      expect(rows).toHaveLength(config.rowCount);
    });
  });
});
