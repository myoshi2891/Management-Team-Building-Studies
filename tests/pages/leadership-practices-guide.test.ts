// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/leadership-practices-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "マネジメントとリーダーシップの違い",
  "良いリーダーの土台 — Googleの研究が示すもの",
  "ステップバイステップ実践ガイド",
  "よくある落とし穴(アンチパターン)",
  "初学者向けチェックリスト",
  "まとめ",
  "参考文献",
] as const;

// 参考文献セクションの h4 3 件を a11y 基準（Q-3）に従い h3 に昇格させ全 12 件
const EXPECTED_H3 = [
  "全体像",
  "Step 1: マインドセットを切り替える",
  "Step 2: 信頼関係を築く(1on1)",
  "Step 3: 期待値を明確にする",
  "Step 4: 委譲する",
  "Step 5: フィードバックを行う",
  "Step 6: 意思決定とファシリテーション",
  "Step 7: 心理的安全性を醸成する",
  "Step 8: 継続的に振り返る",
  "書籍",
  "ブログ・ニュースレター",
  "フレームワーク・調査",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-art-of/9781492045687/",
  "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
  "https://www.engguidebook.com/",
  "https://randsinrepose.com/archives/how-to-rands/",
  "https://lethain.com/",
  "https://lethain.com/engineering-manager-archetypes/",
  "https://newsletter.pragmaticengineer.com/",
  "https://www.radicalcandor.com/our-approach",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "management-vs-leadership",
  "google-research-foundation",
  "step-by-step-guide",
  "antipatterns",
  "checklist",
  "conclusion",
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
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    subgraph PhaseA["フェーズ1 土台をつくる"]
        direction TB
        A1["Step1 マインドセットの転換"]
        A2["Step2 信頼関係の構築 1on1"]
        A1 --> A2
    end
    subgraph PhaseB["フェーズ2 仕組みをつくる"]
        direction TB
        B1["Step3 期待値の明確化"]
        B2["Step4 委譲する"]
        B1 --> B2
    end
    subgraph PhaseC["フェーズ3 対話を深める"]
        direction TB
        C1["Step5 フィードバック"]
        C2["Step6 意思決定とファシリテーション"]
        C1 --> C2
    end
    subgraph PhaseD["フェーズ4 チームを育てる"]
        direction TB
        D1["Step7 心理的安全性の醸成"]
        D2["Step8 継続的な振り返り"]
        D1 --> D2
    end
    PhaseA --> PhaseB --> PhaseC --> PhaseD

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A1,A2,B1,B2,C1,C2,D1,D2 box;`,
  `flowchart TB
    subgraph Before["ミーティング前"]
        direction TB
        B1["アジェンダは相手に決めてもらう"]
        B2["前回のアクション項目を確認する"]
        B1 --> B2
    end
    subgraph During["ミーティング中"]
        direction TB
        M1["軽い雑談で安心できる空気を作る"]
        M2["話す割合は相手7 自分3を意識する"]
        M3["キャリア 障害 成長について話す"]
        M1 --> M2 --> M3
    end
    subgraph After["ミーティング後"]
        direction TB
        A1["合意したアクションを記録する"]
        A2["次回までにフォローアップする"]
        A1 --> A2
    end
    Before --> During --> After

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class B1,B2,M1,M2,M3,A1,A2 box;`,
  `flowchart TD
    Start["自分が抱えているタスクがある"] --> Q1{"このタスクは頻繁に発生するか?"}
    Q1 -->|はい| Q2{"作業は単純か?"}
    Q1 -->|いいえ 稀| Q3{"作業は複雑か?"}
    Q2 -->|単純| R1["最優先で委譲する"]
    Q2 -->|複雑| R2["育成機会として計画的に委譲する"]
    Q3 -->|はい 複雑| R3["学習機会として委譲を検討する"]
    Q3 -->|いいえ 単純| R4["自分で対応してよい"]
    R1 --> End["ゴールとエスカレーション基準を伝え 結果を待つ"]
    R2 --> End
    R3 --> End

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Q3,R1,R2,R3,R4 box;
    class End done;`,
  `flowchart TD
    Start["メンバーに伝えたいことがある"] --> Q1{"相手への敬意 関心はあるか Care Personally"}
    Q1 -->|薄い 不足している| Fix["先に関係構築を行う"]
    Fix --> Q1
    Q1 -->|ある| Q2{"具体的かつ率直に伝えられそうか Challenge Directly"}
    Q2 -->|曖昧にしてしまいそう| Risk1["Ruinous Empathy 成長を妨げるおそれ"]
    Q2 -->|配慮なく伝えてしまいそう| Risk2["Obnoxious Aggression 信頼を損なうおそれ"]
    Q2 -->|両方満たせる| Good["Radical Candor を実践する"]
    Good --> End["できるだけ早く 個別に 行動そのものに焦点を当てて伝える"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Fix,Risk1,Risk2,Good box;
    class End done;`,
  `flowchart TD
    Start["チームで問題が発生した"] --> Q1{"情報収集段階の状況か 選択が必要な決定の段階か"}
    Q1 -->|状況の段階| S1["まず事実を集める"]
    S1 --> S2["関係者の話を聞く Read the Room"]
    S2 --> S3["自分の意見は最後に述べる Act Last"]
    S3 --> Q1
    Q1 -->|決定の段階| D1["選択肢を洗い出す"]
    D1 --> D2{"チーム内で合意形成できるか?"}
    D2 -->|できる| D3["チームに決めさせる エンパワーメント"]
    D2 -->|緊急 できない| D4["リーダーが決定し 理由を明確に説明する"]
    D3 --> End["決定を実行し 結果から学ぶ"]
    D4 --> End

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,S1,S2,S3,D1,D2,D3,D4 box;
    class End done;`,
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 8,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 8,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const SEO_TITLE_FRAGMENTS = [
  "リーダーの作法",
  "実践ガイド",
] as const;

const mountPage = createMountPage(Page);

describe("pages/leadership-practices-guide.vue", () => {
  defineSourceParityContract({
    suiteName: "pages/leadership-practices-guide.vue",
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

  it("モバイルトグルボタンの初期 aria-expanded が false である", () => {
    const wrapper = mountPage();
    const toggle = wrapper.find(".sidebar-toggle");
    expect(toggle.exists()).toBe(true);
    expect(toggle.attributes("aria-expanded")).toBe("false");
  });
});
