// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/casp-certified-agile-scaling-practitioner-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Agile Scaling Practitioner (CASP) 完全ガイド"
] as const;

const EXPECTED_H2 = [
  "この資料について",
  "0. CASP資格の全体像",
  "1. スケーリングとは何か(定義)",
  "2. アジャイルスケーリングにまつわる3つの誤解",
  "3. スケーリングが失敗する理由",
  "4. いつスケールすべきか、いつすべきでないか",
  "5. 原則主導・パターンベースのアプローチ(フレームワーク非依存の思想)",
  "6. 代表的スケーリングフレームワークからパターンを学ぶ",
  "7. スキャフォールディング(足場)の活用",
  "8. エンタープライズ戦略とスケーリングの整合",
  "9. マルチチーム・マルチサイトのアジャイル製品開発",
  "10. 持続可能な変革を支える仕組み",
  "11. まとめ: フレームワーク比較表と参考文献一覧"
] as const;

const EXPECTED_H3 = [
  "比較表: 代表的スケーリングフレームワーク",
  "CASP の思想を1枚にまとめる",
  "章と学習目標の対応表",
  "参考文献・ソース一覧"
] as const;

const EXPECTED_H4 = [
  "Scrum Alliance 公式ソース(一次情報)",
  "業界標準のスケーリングフレームワーク(パターン学習の補助ソース)",
  "組織設計・チームトポロジー関連"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\nA[\"単一のアジャイルチーム\n(Single Agile Team)\"] --> B{\"プロダクト/組織の\n複雑性が増大\"}\nB -->|\"認知負荷が限界を超える\"| C[\"複数チームへの拡張\n(Scaling)\"]\nB -->|\"複雑性は許容範囲内\"| D[\"単一チームのまま\n改善を継続\"]\nC --> E[\"パターンの発見\n(Pattern Discovery)\"]\nE --> F[\"価値提供の一貫性維持\n(Consistent Value Delivery)\"]\nF --> G[\"戦略の実行とゴール達成\n(Strategy Execution)\"]",
  "flowchart TD\nsubgraph Myth[\"よくある誤解 (Myths)\"]\nM1[\"誤解1: 人を増やせば\nスケールできる\"]\nM2[\"誤解2: プラクティスを\nそのまま導入すればよい\"]\nM3[\"誤解3: スケーリングは\n常に必要である\"]\nend\nsubgraph Reality[\"実態 (Reality)\"]\nR1[\"コラボレーション・コミュニケーション・\nクロスファンクショナル性の質を高める\"]\nR2[\"プラクティスの背後にある原則を理解し\n文脈に合わせて適応する\"]\nR3[\"時にはデスケーリング\n(依存/ムダ/階層の削減)も選択肢\"]\nend\nM1 -.->|\"誤解を正す\"| R1\nM2 -.->|\"誤解を正す\"| R2\nM3 -.->|\"誤解を正す\"| R3",
  "flowchart TD\nA[\"アジャイルの基礎が\n未成熟な状態でスケール開始\"] --> B[\"機能別サイロの形成\"]\nA --> C[\"ジュニア層の急増採用\"]\nA --> D[\"手作業プロセスの放置\"]\nB --> E[\"依存関係・ハンドオフの増加\"]\nC --> F[\"生産性/品質の希薄化\"]\nD --> G[\"自動化不足によるボトルネック\"]\nE --> H[\"調整コストの急増\"]\nF --> H\nG --> H\nH --> I[\"期待したスケーリング効果が\n実現しない(失敗)\"]",
  "flowchart TD\nStart([\"スケーリングを検討中\"]) --> Q1{\"チームは基本的な\nアジャイル実践に習熟しているか\"}\nQ1 -->|\"いいえ\"| N1[\"まずチームレベルの\nアジャイル基礎固めを優先\"]\nQ1 -->|\"はい\"| Q2{\"プロダクトの複雑性が\n1チームの認知容量を超えているか\"}\nQ2 -->|\"いいえ\"| Q3{\"市場競争上、複数チームでの\n並行提供が必要か\"}\nQ3 -->|\"いいえ\"| N2[\"スケーリングは不要\n(現状維持 or デスケール検討)\"]\nQ3 -->|\"はい\"| Q4{\"手作業プロセスは\n十分に自動化されているか\"}\nQ2 -->|\"はい\"| Q4\nQ4 -->|\"いいえ\"| N3[\"自動化とプロセス基盤の\n整備を先行させる\"]\nQ4 -->|\"はい\"| Y1[\"スケーリングに着手\n(職能横断チームを原則に設計)\"]",
  "flowchart LR\nP1[\"原則\n(Principles)\"] --> P2[\"パターン\n(Patterns in successful\nagile organizations)\"]\nP2 --> P3[\"プラクティス\n(Practices tailored\nto context)\"]\nP3 --> P4[\"組織固有の文脈\n(Your Organization's Context)\"]\nP4 -->|\"フィードバック\n(Inspect and Adapt)\"| P1\nP3 --> S[\"スキャフォールディング\n(一時的な支援構造)\"]\nS -->|"組織が成熟したら撤去/更新"| P4",
  "flowchart TD\nSAFe[\"SAFe\n(ART / Program Increment /\n経済的視点)\"] --> Lib[\"パターンライブラリ\n(自組織の文脈に合わせて\n選択・組み合わせる)\"]\nLeSS[\"LeSS\n(単一バックログ/単一PO/\nフィーチャーチーム)\"] --> Lib\nSpotify[\"Spotifyモデル\n(Squad/Tribe/Chapter/Guild)\"] --> Lib\nDAD[\"DAD\n(ゴール駆動・文脈依存の\nライフサイクル選択)\"] --> Lib\nS2[\"Scrum@Scale\n(Scrum of Scrums/MetaScrum/EAT)\"] --> Lib\nLib --> Context[\"組織固有の文脈に適用\n(Principle-Informed Adoption)\"]",
  "flowchart LR\nA[\"変革の課題を特定\"] --> B[\"一時的な支援構造を設計\n(Scaffolding)\"]\nB --> C[\"変革の移行期間を支援\n(Support the Transition)\"]\nC --> D{\"組織はこの支援なしで\n自走できるか\"}\nD -->|\"まだ難しい\"| E[\"構造を見直し/調整して継続\"]\nE --> C\nD -->|\"自走可能\"| F[\"支援構造を撤去 or\n恒久的な仕組みへ統合\"]",
  "flowchart TD\nV[\"ビジョン/ミッション\n(組織が目指す将来像)\"] --> S[\"エンタープライズ戦略\n(3〜5年規模の方向性)\"]\nS --> P[\"ポートフォリオ\n(投資配分・優先順位付け)\"]\nP --> PR[\"プログラム/バリューストリーム\n(複数チームの協調単位)\"]\nPR --> T[\"チームバックログ\n(スプリント単位の実行)\"]\nT -.->|\"実行から得た学びを\nフィードバック\"| S",
  "flowchart TB\nsubgraph Stream[\"ストリーム整合チーム群 (Stream-aligned Teams)\"]\nS1[\"チームA\n(職能横断/エンドツーエンド)\"]\nS2[\"チームB\n(職能横断/エンドツーエンド)\"]\nend\nPF[\"プラットフォームチーム\n(Platform Team)\"]\nEN[\"イネーブリングチーム\n(Enabling Team)\"]\nCS[\"複雑サブシステムチーム\n(Complicated-subsystem Team)\"]\nS1 -->|\"X-as-a-Service:\n基盤を利用\"| PF\nS2 -->|\"X-as-a-Service:\n基盤を利用\"| PF\nEN -->|\"Facilitating:\n技術/実践を伝授\"| S1\nEN -->|\"Facilitating:\n技術/実践を伝授\"| S2\nS1 -->|\"X-as-a-Service:\n専門機能を利用\"| CS\nS1 -.->|\"Collaboration:\n発見フェーズのみ一時的に協働\"| S2",
  "flowchart LR\nP[\"計画\n(Plan: 戦略とスケーリング方針)\"] --> D[\"実行\n(Do: マルチチームでの価値提供)\"]\nD --> C[\"検査\n(Check: 戦略整合/依存関係/\n持続可能性の点検)\"]\nC --> A[\"適応\n(Act: スキャフォールディング/\nチーム構成/パターンの見直し)\"]\nA --> P\nC --> Learn[\"継続的学習\n(SEU取得/コミュニティ参加)\"]\nLearn --> P"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://resources.scrumalliance.org/Article/scale-agile",
  "https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions",
  "https://resources.scrumalliance.org/Video/scaling-agility-fails-and-it",
  "https://resources.scrumalliance.org/Article/cas-scaling-1-framework",
  "https://less.works/",
  "https://scaledagileframework.com/",
  "https://www.scrumatscale.com/",
  "https://www.pmi.org/disciplined-agile",
  "https://www.scrumalliance.org/get-certified/scaling/large-scale-scrum",
  "https://teamtopologies.com/",
  "https://en.wikipedia.org/wiki/Conway%27s_law",
  "https://www.scrumalliance.org/member-benefits"
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "overview",
  "what-is-scaling",
  "scaling-myths",
  "why-scaling-fails",
  "when-to-scale",
  "principle-informed-approach",
  "framework-patterns",
  "scaffolding",
  "strategic-alignment",
  "multi-team-multi-site",
  "sustaining-transformation",
  "summary-references"
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
  "SECTION 13"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
  practice: 11,
  source: 11,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 3,
  },
  practice: {
    "ベストプラクティス": 11,
  },
  source: {
    "ソース": 11,
  },
} as const;

defineSourceParityContract({
  page: Page,
  suiteName: "pages/casp-certified-agile-scaling-practitioner-study-guide.vue",
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: [],
  seoTitleFragments: [
    "CASP",
    "Certified Agile Scaling Practitioner",
    "完全ガイド",
  ],
  seoTitle: "CASP(Certified Agile Scaling Practitioner)認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  seoDescription:
    "Scrum Allianceの Certified Agile Scaling Practitioner(CASP)を初学者向けに解説。定義・失敗要因・原則主導のスケーリング思想・SAFe/LeSS/Spotifyパターン比較・Team Topologiesまで、ステップ解説とMermaid図解、公式ソースURL付きで網羅。",
});

describe("pages/casp-certified-agile-scaling-practitioner-study-guide.vue — テーブル構造契約", () => {
  it("テーブルが原本と同じ件数（4件）存在し、すべて .table-wrap で包まれている", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(4);
    for (const table of tables) {
      expect(table.element.closest(".table-wrap")).not.toBeNull();
    }
  });

  it("テーブル行の総数が原本と一致する（30行）", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const rows = wrapper.findAll("table tr");
    expect(rows).toHaveLength(30);
  });
});
