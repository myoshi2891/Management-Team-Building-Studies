// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csm-scrum-team-3-accountabilities.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scrum Team とは何か ― 3つのアカウンタビリティ徹底解説",
] as const;

const EXPECTED_H2 = [
  "この章の位置づけ",
  "Scrum Team 全体像",
  "「Role」から「Accountability」への変化",
  "3つのアカウンタビリティ比較表",
  "Developers(開発者)",
  "Product Owner(プロダクトオーナー)",
  "Scrum Master(スクラムマスター)",
  "3つのアカウンタビリティの協働 ― Scrumイベントとの対応",
  "よくある誤解・アンチパターン",
  "ベストプラクティス総まとめ",
  "CSM試験対策:学習目標マッピング表",
  "参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "定義",
  "Scrum Teamの4つの特性",
  "Scrum Team構成図",
  "Scrum Teamは何に責任を持つか",
  "定義",
  "Developersが常に説明責任(accountable)を負う4つの事項",
  "ベストプラクティス",
  "定義",
  "効果的なProduct Backlog管理の4項目(LO 1.4)",
  "なぜProduct Ownerは1人なのか(LO 1.5)",
  "Product Backlogに対する権限と協働的な働き方(LO 1.6)",
  "ベストプラクティス",
  "定義",
  "「Servant-Leader」から「True leaders who serve」へ",
  "Scrum Masterが奉仕する3つの対象",
  "Scrum Master Core Competencies(LO 2.1〜2.3)",
  "ベストプラクティス",
  "経験主義サイクルとしてのScrum",
  "各Scrumイベントにおける関与度",
  "参考: CSM認定試験の概要",
  "一次情報源・公式ドキュメント",
  "解説・二次情報源",
] as const;

const EXPECTED_H4 = [
  "(a) Scrum Teamへのサービス",
  "(b) Product Ownerへのサービス",
  "(c) Organizationへのサービス",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    subgraph ST["Scrum Team"]
        PO["Product Owner"]
        SM["Scrum Master"]
        DEV["Developers"]
    end
    PO -->|"Product Backlogを管理"| DEV
    SM -->|"自己管理と機能横断性をコーチング"| DEV
    SM -->|"バックログ管理を支援"| PO
    ST -->|"協働して作成"| INC["Increment"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class PO,SM,DEV box;
    class INC done;`,
  `flowchart LR
    STK["Stakeholders"] -->|"要望を伝える・説得する"| PO["Product Owner"]
    PO -->|"優先順位付け・作成・明確化・透明性確保"| PB["Product Backlog"]
    DEV["Developers"] -->|"サイズ見積もり・トレードオフ協議"| PO
    PB -->|"項目を選択"| DEV

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class STK,PB,DEV box;
    class PO hub;`,
  `flowchart TB
    SM["Scrum Master"]
    SM -->|"コーチング・障害物の除去・イベントの成功"| TEAM["Scrum Team"]
    SM -->|"Product Goal定義とバックログ管理の支援"| PO["Product Owner"]
    SM -->|"Scrum導入の指導・障壁の除去"| ORG["Organization"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class TEAM,PO,ORG box;
    class SM hub;`,
  `flowchart LR
    A["Product Ownerが Product Backlogを並び替える"] --> B["Scrum TeamがSprintで作業をIncrementに変換する"]
    B --> C["Scrum Teamとステークホルダーが結果を検査し次に向けて調整する"]
    C -->|"Repeat"| A

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C done;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://agilemanifesto.org",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
  "https://www.scrum.org/resources/accountability-responsibility-and-roles",
  "https://www.mountaingoatsoftware.com/blog/top-5-changes-in-the-2020-version-of-the-scrum-guide",
  "https://www.scrum.org/forum/scrum-forum/90389/does-scrum-team-reference-scrum-guide-means-all-three-scrum-master-product-owner-and-developers",
  "https://www.scrum.org/resources/blog/accountabilities-scrum-its-complete-picture-now",
  "https://hellomrssimpson.medium.com/a-quick-summary-of-the-november-2020-scrum-guide-update-6f754c93f755",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://creativecommons.org/licenses/by-sa/4.0/legalcode",
] as const;

const EXPECTED_TOC_IDS = [
  "guide-scope",
  "what-is-scrum-team",
  "role-to-accountability",
  "three-accountabilities-comparison",
  "developers",
  "product-owner",
  "scrum-master",
  "collaboration-with-events",
  "misconceptions",
  "best-practices-summary",
  "learning-objectives-mapping",
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
  "SECTION 11",
  "SECTION 12",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 10,
  note: 5,
  practice: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    ソース: 10,
  },
  note: {
    "Scrum Guideの定義": 3,
    補足: 2,
  },
  practice: {
    ベストプラクティス: 3,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/csm-scrum-team-3-accountabilities.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_LINKS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["Scrum Team", "アカウンタビリティ"],
});
