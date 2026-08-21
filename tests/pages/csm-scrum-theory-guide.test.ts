// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csm-scrum-theory-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "Scrumの定義(LO 1.1)",
  "Scrumの理論的基盤: 経験主義とリーンシンキング(LO 1.3)",
  "経験主義の3本柱(LO 1.4)",
  "Scrumの5つの価値観(LO 1.2)",
  "反復的・漸進的アプローチの利点(LO 1.5)",
  "Scrumを部分的に導入した場合の欠点(LO 1.6)",
  "アジャイル宣言とScrumの整合性(LO 1.7)",
  "Scrum Theory 全体像のまとめ図",
  "理解度チェック(練習問題)",
  "まとめ: 学習到達度チェックリスト",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "CSM®試験の全体像",
  "「Scrum Theory」はどこに位置づけられるか",
  "Scrumとは何か",
  "Scrumの由来",
  "Scrumのサイクルを図で理解する",
  "「軽量」であることの意味",
  "経験主義(Empiricism)の定義",
  "リーンシンキング(Lean Thinking)",
  "経験的プロセス制御 vs 予測型(決定論的)プロセス制御",
  "3本柱の全体像",
  "各柱の詳細",
  "「信頼(Trust)」の位置づけ(柱ではなく、柱によって築かれるもの)",
  "5つの価値観とは",
  "価値観と3本柱・信頼の関係",
  "各価値観のベストプラクティス",
  "「反復的」と「漸進的」の違い",
  "反復的・漸進的アプローチの利点(3つ以上)",
  "「部分的な導入」とは何か",
  "Scrum Allianceが指摘する「機械的なScrum(Mechanical Scrum)」",
  "部分的導入がもたらす代表的な欠点(2つ以上)",
  "アジャイル宣言の背景",
  "アジャイル宣言の4つの価値",
  "Scrumはアジャイル宣言の価値観・原則をどう体現しているか",
  "Scrum Guide",
  "Scrum Alliance",
  "Manifesto for Agile Software Development",
  "その他の一次・二次資料",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    A["プロダクトオーナーが 複雑な問題をプロダクトバックログに整理する"] --> B["スクラムチームが スプリント内で価値あるインクリメントを作り出す"]
    B --> C["スクラムチームとステークホルダーが 結果を検査し、次のスプリントに向けて適応する"]
    C -.->|"繰り返す Repeat"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`,
  `flowchart LR
    T["透明性 Transparency"] --> I["検査 Inspection"]
    I --> AD["適応 Adaptation"]
    AD -.->|"次のサイクルへ"| T

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class T hub;
    class I,AD box;`,
  `flowchart LR
    S1["スプリント1 機能A"] --> S2["スプリント2 機能A + B"]
    S2 --> S3["スプリント3 機能A + B + C"]
    S3 --> S4["スプリント4 機能A + B + C + D リリース可能な状態"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1,S2,S3 box;
    class S4 done;`,
  `flowchart TD
    P["Scrumの一部だけを導入 例えばレトロスペクティブを省略"] --> Q["透明性が低下する"]
    Q --> R["検査が不正確 不十分になる"]
    R --> S["適応の判断を誤る、または適応できない"]
    S --> T["経験主義のサイクルが機能しなくなる"]
    T --> U["リスクの増大 ムダの蓄積 Scrumへの誤った評価"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class P hub;
    class Q,R,S,T,U box;`,
  `flowchart TB
    subgraph F["理論的基盤"]
        E["経験主義 Empiricism"]
        L["リーンシンキング Lean Thinking"]
    end
    F --> P["経験主義の3本柱・透明性・検査・適応"]
    V["スクラムの5つの価値観・確約・集中・公開・尊敬・勇気"] -->|"作業・行動・振る舞いを方向づける"| P
    P -->|"価値観が体現されることで機能する"| TR["信頼 Trust"]
    TR --> O["予測可能性の向上とリスクの制御・反復的・漸進的なインクリメント"]
    O --> AL["アジャイル宣言の価値観・原則との整合"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class E,L,P,V box;
    class TR hub;
    class O,AL done;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://support.scrumalliance.org/hc/en-us/articles/360002112772-How-do-I-take-the-CSM-test",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrumalliance.org/about-scrum",
  "https://hbr.org/1986/01/the-new-new-product-development-game",
  "https://scrumguides.org/revisions.html",
  "https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/iso/ja/manifesto.html",
  "https://agilemanifesto.org/iso/ja/principles.html",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://creativecommons.org/licenses/by-sa/4.0/legalcode",
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "scrum-definition",
  "empiricism-lean",
  "three-pillars",
  "five-values",
  "iterative-incremental",
  "partial-implementation",
  "agile-manifesto",
  "overview-diagram",
  "practice-quiz",
  "summary-checklist",
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
  practice: 8,
  source: 8,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    ベストプラクティス: 7,
    "ベストプラクティス(スクラムマスター視点)": 1,
  },
  source: {
    ソース: 8,
  },
  note: {
    補足: 1,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/csm-scrum-theory-guide.vue",
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
  seoTitleFragments: ["Scrum理論", "CSM"],
});

const mountPage = createMountPage(Page);

describe("pages/csm-scrum-theory-guide.vue — 目次の現在地", () => {
  it("active な目次リンクだけが aria-current=location を持つ", () => {
    const links = mountPage().findAll(".sidebar-nav a");
    expect(links).toHaveLength(EXPECTED_TOC_IDS.length);

    // 初期状態では先頭の TOC 項目が active。
    // active クラスと aria-current の対象が完全に一致することを保証する。
    const current = links
      .filter((link) => link.attributes("aria-current") === "location")
      .map((link) => link.attributes("href"));
    const active = links
      .filter((link) => link.classes().includes("active"))
      .map((link) => link.attributes("href"));

    expect(current).toEqual([`#${EXPECTED_TOC_IDS[0]}`]);
    expect(active).toEqual(current);
  });
});
