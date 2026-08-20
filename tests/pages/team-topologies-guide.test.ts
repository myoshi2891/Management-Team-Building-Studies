// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/team-topologies-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Team Topologies 実践ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "Team Topologiesとは何か",
  "なぜ大切か: コンウェイの法則",
  "チーム認知負荷 Cognitive Load",
  "4つの基本チームタイプ",
  "3つのチームインタラクションモード",
  "フラクチャープレーン: システムの分割線",
  "Reverse Conway Maneuver 逆コンウェイ作戦",
  "Team API: チーム間の期待値を明文化する",
  "導入のステップバイステップガイド",
  "よくあるアンチパターンと落とし穴",
  "2025〜2026年の最新動向: プラットフォームエンジニアリングとの融合",
  "批判的視点: Team Topologiesの限界",
  "さらに学ぶために",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "コア語彙集",
  "ストリームアラインドチーム Stream-aligned Team",
  "プラットフォームチーム Platform Team",
  "イネーブリングチーム Enabling Team",
  "コンプリケイテッド・サブシステムチーム Complicated-Subsystem Team",
  "チームタイプの比較表",
  "公式情報源・著者本人",
  "著名な技術リーダーによる解説",
  "出版情報",
  "2025〜2026年動向レポート",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    subgraph ORG["組織のコミュニケーション構造"]
        direction TB
        O1["UIチーム"]
        O2["APIチーム"]
        O3["DBAチーム"]
        O1 --- O2
        O2 --- O3
    end
    subgraph SYS["結果として生まれるシステム構造"]
        direction TB
        S1["UI層モジュール"]
        S2["API層モジュール"]
        S3["DB層モジュール"]
        S1 --- S2
        S2 --- S3
    end
    ORG -->|"組織構造がシステム構造を規定する"| SYS

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class O1,O2,O3,S1,S2,S3 box;`,
  `flowchart TB
    SA["ストリームアラインドチーム Stream-aligned Team 事業価値を単独で顧客に届ける主役"]
    PF["プラットフォームチーム Platform Team 基盤をサービスとして提供"]
    EN["イネーブリングチーム Enabling Team 能力ギャップを一時的に伴走支援"]
    CS["コンプリケイテッド・サブシステムチーム Complicated-Subsystem Team 高度に専門的な領域を担当"]

    PF -->|"X-as-a-Service 外在的負荷を軽減"| SA
    EN -.->|"Facilitating 数週間の伴走支援"| SA
    CS -->|"X-as-a-Service 専門領域を提供"| SA

    PF ~~~ EN ~~~ CS

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class PF,EN,CS box;
    class SA hub;`,
  `flowchart TB
    A["コラボレーション Collaboration 期間の目安は数週間程度 目的は発見と探索"]
    B["X-as-a-Service 期間の目安は長期的で安定運用 目的はセルフサービスでの利用"]
    C["ファシリテーション Facilitating 期間の目安は数週間程度 目的は能力向上の伴走支援"]

    A -->|"境界が明確になったら移行"| B
    C -.->|"必要な時だけ一時的に発生"| A
    C -.->|"必要な時だけ一時的に発生"| B

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,C box;
    class B done;`,
  `flowchart TB
    subgraph BEFORE["Before 職能別サイロ組織"]
        direction TB
        B1["UIチーム"]
        B2["APIチーム"]
        B3["DBAチーム"]
        B1 --- B2 --- B3
    end
    subgraph AFTER["After Reverse Conway適用後"]
        direction TB
        A1["ストリームアラインドチームA UI・API・DBを内包"]
        A2["ストリームアラインドチームB UI・API・DBを内包"]
    end
    BEFORE -->|"目指すアーキテクチャに合わせて先にチームを再編する"| AFTER

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class B1,B2,B3 box;
    class A1,A2 done;`,
  `flowchart TB
    S1["Step1 現状のチームとコミュニケーション経路を可視化する"]
    S2["Step2 コンウェイの法則の観点で組織とアーキテクチャの不一致を分析する"]
    S3["Step3 既存チームを4つの基本タイプへマッピングする"]
    S4["Step4 フラクチャープレーンを特定しシステムの分割線を検討する"]
    S5["Step5 チームの認知負荷を測定し評価する"]
    S6["Step6 3つのインタラクションモードでTo-Beの連携を設計する"]
    S7["Step7 Reverse Conway Maneuverでチーム構造を段階的に移行する"]
    S8["Step8 Team APIを定義しチーム間の期待値を明文化する"]
    S9["Step9 定期的にセンシングし継続的に組織を進化させる"]

    S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8 --> S9
    S9 -.->|"継続的改善ループ"| S1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S9 done;
    class S2,S3,S4,S5,S6,S7,S8 box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/team-topologies/9781098157234/",
  "https://teamtopologies.com",
  "https://martinfowler.com/bliki/TeamTopologies.html",
  "https://itrevolution.com/articles/cognitive-load/",
  "https://teamtopologies.com/key-concepts-content/team-interaction-modeling-with-team-topologies",
  "https://www.infoq.com/podcasts/software-architecture-team-topologies/",
  "https://github.com/TeamTopologies/Team-API-template",
  "https://levstack.io/en/blog/platform-engineering-2026/",
  "https://leanopstech.com/blog/platform-engineering-trends-2026/",
  "https://itrevolution.com/product/team-topologies-second-edition/",
  "https://github.com/teamtopologies",
  "https://teamtopologies.com/people",
  "https://www.simonandschuster.com/books/Team-Topologies-2nd-Edition/Matthew-Skelton/9781966280002",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "what-is-team-topologies",
  "conways-law",
  "cognitive-load",
  "four-team-types",
  "interaction-modes",
  "fracture-planes",
  "reverse-conway",
  "team-api",
  "implementation-roadmap",
  "anti-patterns",
  "platform-engineering-trends",
  "critical-perspective",
  "further-learning",
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
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 12,
  note: 3,
  practice: 2,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 12 },
  note: { 補足: 2, 免責事項: 1 },
  practice: { ベストプラクティス: 2 },
} as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
] as const;

const SEO_TITLE_FRAGMENTS = [
  "Team Topologies",
  "実践ガイド",
] as const;

defineSourceParityContract({
  suiteName: "pages/team-topologies-guide.vue",
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
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: SEO_TITLE_FRAGMENTS,
});
