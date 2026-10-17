// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/itil-transformation-v5-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ITIL Transformation(Version 5) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "認定試験の全体像",
  "ITIL Transformationとは何か － 基本概念",
  "Transformationの特性・スコープ・複雑性",
  "ITIL Transformation Model － 全体構造",
  "BAU Governance と Transformation Governance",
  "Transformation Patterns と Toolkit",
  "Governance and Transformation Alignment",
  "Execution and Delivery of Change",
  "Measurement, Learning, and Continual Improvement",
  "Tools, Methods, and Techniques",
  "AI and Transformation",
  "他フレームワークとの統合(PRINCE2 / DevOps / Agile)",
  "試験対策とキャリアパス",
  "用語集",
  "参考文献・出典URL一覧",
] as const;

const EXPECTED_H3 = [
  "試験の基本データ",
  "受験前提条件(Certification Requirements)",
  "出題の認知レベル(Bloom's Taxonomy)",
  "資格体系上の位置づけ",
  "なぜTransformationが必要なのか",
  "Change と Transformation の違い",
  "ITIL Value System・Guiding Principles・Four Dimensionsとの関係",
  "Transformationが価値を生む3つの領域",
  "Transformationは一様ではない",
  "2つのオーディエンス",
  "複雑性への向き合い方",
  "4つのレイヤー",
  "レイヤー間の関係",
  "なぜGovernanceを2つに分けるのか",
  "比較表",
  "3つのPatternsとToolkitの役割",
  "Patternsごとのベストプラクティス",
  "Governanceが果たす2つの機能",
  "Alignmentのための実務ポイント",
  "「唯一の正解」を前提にしない実行アプローチ",
  "複数アプローチの並行運用",
  "測定と学習の位置づけ",
  "測定から学習への流れ",
  "測定設計のポイント",
  "Value Stream Mapping(VSM)",
  "OKR(Objectives and Key Results)",
  "ITIL Maturity Model",
  "Theory of Constraints(制約理論)",
  "RACI／RASCI",
  "ITIL AI Capability Model(6Cモデル)",
  "AI導入の不確実性とTransformationの探索的アプローチ",
  "ITIL AI Governance Improvement Model(参考)",
  "学習の進め方(ステップバイステップ)",
  "出題傾向への対策",
  "キャリアパスとの接続",
] as const;

const EXPECTED_H4 = [
  "公式情報源",
  "公認トレーニングプロバイダ",
  "解説記事",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-transformation-version-5-4173",
  "https://www.itil.com/professionals/certifications/ITIL-Transformation-Version-5",
  "https://www.itsmhub.com/products/itil-transformation-course-examination",
  "https://www.qa.com/course-catalogue/courses/itil-transformation-version-5-itil5trf/",
  "https://www.itil.com/Itil-News-and-Announcements/itil-transformation-version-5",
  "https://advancedtraining.com.au/product/itil-transformation-version-5-e-learning-plus/",
  "https://www.udemy.com/course/itil-transformation-version-5-practice-tests/",
  "https://itsmacademy.com/itil-transformation-course",
  "https://www.itil.com/-/media/itilsite/site-assets/documents/capability-and-maturity/introduction-to-the-itil-mm.pdf",
  "https://itsm.tools/itil-version-5-vs-itil-4-key-changes/",
  "https://www.pmgacademy.com/en/articles/itil/information-and-technology-in-itil-version-5-the-guide-for-the-ai-era-and-data-governance/",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-ai-governance-guidance",
  "https://agilepmhub.com/itil-ai-governance",
  "https://www.itil.com/Itil-News-and-Announcements/itil-version-5-explained",
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "exam-overview",
  "what-is-transformation",
  "characteristics-scope-complexity",
  "transformation-model",
  "bau-vs-transformation-governance",
  "patterns-and-toolkit",
  "governance-alignment",
  "execution-and-delivery",
  "measurement-learning",
  "tools-methods-techniques",
  "ai-and-transformation",
  "framework-integration",
  "exam-prep-career",
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
  "SECTION 11",
  "SECTION 12",
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
  "SECTION 16",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
  practice: 21,
  source: 14,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 3 },
  practice: {
    "ベストプラクティス": 18,
    "Initiation Patterns － ベストプラクティス": 1,
    "Governance Patterns － ベストプラクティス": 1,
    "Execution Patterns － ベストプラクティス": 1,
  },
  source: { "ソース": 14 },
} as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TD\nF[\"ITIL Foundation Version 5 または いずれかのITIL 4認定\"] --> T[\"ITIL Transformation Version 5 共通コアモジュール\"]\nF --> PSE[\"ITIL Product・Service・Experience Version 5 各モジュール(MP designation用)\"]\nF --> PMSEL[\"Practice Manager選択モジュール(PM designation用)\"]\nF --> STRAT[\"ITIL Strategy モジュール(SL designation用)\"]\nT --> PM[\"Practice Manager designation\"]\nT --> MP[\"ITIL Managing Professional Version 5 designation\"]\nPSE --> MP\nPMSEL --> PM\nT --> SL[\"Strategic Leader designation\"]\nSTRAT --> SL\nEXISTMPT[\"既存のITIL 4 Managing Professional または ITIL v3 Expert/Master\"] --> MPT[\"ITIL Managing Professional Transition－Product, Service, Experience Version 5\"]\nMPT --> MP\nEXISTMASTER[\"既存のITIL 4 Master\"] --> MP\nEXISTMASTER --> PM\nEXISTMASTER --> SL\nEXISTMASTER --> IM[\"ITIL Master designation\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef alt fill:#F3EAF8,stroke:#7A3E9D,color:#161B26,stroke-width:1px;\nclass F,PSE,PMSEL,STRAT box;\nclass T hub;\nclass PM,MP,SL,IM box;\nclass EXISTMPT,EXISTMASTER,MPT alt;",
  "flowchart LR\nsubgraph VS[\"ITIL Value System\"]\nGP[\"Guiding Principles\"]\nGOV[\"Governance\"]\nSVC[\"Service Value Chain\"]\nPRAC[\"Practices\"]\nCI[\"Continual Improvement\"]\nend\nVS --> PSL[\"Product and Service Lifecycle\"]\nPSL --> TR[\"ITIL Transformation 変革の実行と学習\"]\nFD[\"Four Dimensions of Service Management\"] -.->|\"適用\"| TR\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass VS,PSL,FD box;\nclass TR hub;",
  "flowchart TD\nT[\"ITIL Transformation ガイダンス\"] --> A1[\"説明責任を持つ人々 Accountable / Responsible シニアリーダー・スポンサー\"]\nT --> A2[\"変革の影響を受ける人々 Product / Service Delivery側 BAU業務の担当者\"]\nA1 --> N1[\"取り組みの整合性・調整・BAUとの両立を担保する\"]\nA2 --> N2[\"何が・なぜ起きているかを理解し、変革中も安定運用を守る\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass T hub;\nclass A1,A2,N1,N2 box;",
  "flowchart LR\nF[\"状況が把握できていない Confused 情報収集・分類が必要\"] -->|\"Orderedと判断\"| O[\"秩序だった環境 Ordered / Predictable 因果関係が明確\"]\nF -->|\"Complexと判断\"| C[\"複雑な環境 Complex 因果関係は事後的にしか分からない\"]\nF -->|\"Chaoticと判断\"| X[\"混沌とした環境 Chaotic 即断即決が必要\"]\nO -->|詳細な計画が有効| P1[\"Plan-drivenなアプローチ 例 Project / Programme Management\"]\nC -->|試行から観察・適応| P2[\"探索的・反復的なアプローチ 例 小さな実験、フィードバックループ\"]\nX -->|まず安定化| P3[\"緊急対応で状況を安定化してから次のアプローチへ\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclassDef pending fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass O,C,X box;\nclass P1,P2,P3 done;\nclass F pending;",
  "flowchart TB\nG[\"Governance 方向づけ・意思決定\"] --> P[\"Positioning 状況理解・立ち位置の明確化\"]\nP --> E[\"Execution 実行 複数アプローチの並行運用\"]\nE --> L[\"Learning 測定・評価・学習\"]\nL --> G\nL -.->|\"フィードバック\"| P\nL -.->|\"フィードバック\"| E\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass G,P,E box;\nclass L hub;",
  "flowchart LR\nsubgraph BAU[\"BAU Governance\"]\nB1[\"価値の測定方法\"]\nB2[\"チーム間の整合\"]\nB3[\"承認プロセス・資金モデル\"]\nend\nsubgraph TRG[\"Transformation Governance\"]\nT1[\"アジャイル等 柔軟な働き方\"]\nT2[\"Transformation固有の意思決定基準\"]\nend\nBAU <-->|\"緊張関係 Tension\"| TRG\nBAU -.->|\"Bridge 重複を最小化しつつ両立\"| TRG\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass B1,B2,B3,T1,T2 box;\nclass BAU hub;",
  "flowchart TB\nIP[\"Initiation Patterns 出発点の理解\"]\nGP[\"Governance Patterns BAUとTransformation Governanceの橋渡し\"]\nEP[\"Execution Patterns 複数アプローチの並行実行 + フィードバックループ\"]\nTK[\"Toolkit VSM / OKR / ITIL Maturity Model等\"] -.->|\"横断的に支援\"| IP\nTK -.->|\"横断的に支援\"| GP\nTK -.->|\"横断的に支援\"| EP\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass IP,GP,EP box;\nclass TK hub;",
  "flowchart LR\nS[\"戦略レベル なぜやるか / Why\"] --> T[\"戦術レベル どう進めるか / How\"] --> O[\"実行レベル 何をやるか / What\"]\nO -.->|\"実績・学習\"| S\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass S,T,O box;",
  "flowchart TB\nsubgraph EX[\"Execution 並行運用\"]\ndirection LR\nA1[\"ワークストリームA Project管理型\"]\nA2[\"ワークストリームB 探索的・反復型\"]\nA3[\"ワークストリームC 緊急対応型\"]\nend\nEX --> FB[\"共通のフィードバックループ 定期的な同期・調整\"]\nFB --> EX\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A1,A2,A3 box;\nclass FB hub;",
  "flowchart LR\nM[\"測定 Measurement 指標・データ収集\"] --> E[\"評価 Evaluation 結果の解釈\"]\nE --> L[\"学習 Learning 組織知への変換\"]\nL --> D[\"意思決定への反映 Governance / Execution へのフィードバック\"]\nD -.->|\"次サイクルへ\"| M\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass M,E,L box;\nclass D done;",
  "flowchart LR\nS1[\"要求受付\"] --> S2[\"分析・設計\"] --> S3[\"実装\"] --> S4[\"検証\"] --> S5[\"提供\"]\nS1 -.->|\"待ち時間\"| S2\nS3 -.->|\"手戻り\"| S2\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass S1,S2,S3,S4,S5 box;",
  "flowchart LR\nL1[\"Level 1 Initial\"] --> L2[\"Level 2 Managed\"] --> L3[\"Level 3 Defined\"] --> L4[\"Level 4 Quantitative\"] --> L5[\"Level 5 Optimizing\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass L1,L2,L3 box;\nclass L4,L5 done;",
  "flowchart TB\nAI[\"ITIL AI Capability Model 6Cモデル\"]\nAI --> C1[\"Creation 創出\"]\nAI --> C2[\"Curation キュレーション\"]\nAI --> C3[\"Clarification 明確化\"]\nAI --> C4[\"Cognition 認知\"]\nAI --> C5[\"Communication コミュニケーション\"]\nAI --> C6[\"Coordination 調整\"]\n\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass AI hub;\nclass C1,C2,C3,C4,C5,C6 box;",
  "flowchart TB\nT[\"ITIL Transformation Model\"] --> P[\"PRINCE2 計画・統制\"]\nT --> D[\"DevOps 継続的デリバリー・自動化\"]\nT --> A[\"Agile 探索的・反復的な実行\"]\n\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass T hub;\nclass P,D,A box;",
  "flowchart TD\nS1[\"Step 1 ITIL Foundation Version 5 の知識を再確認する\"] --> S2[\"Step 2 本ガイドで Transformation Model の4層構造を理解する\"]\nS2 --> S3[\"Step 3 3つのPatterns Initiation/Governance/Execution の違いを整理する\"]\nS3 --> S4[\"Step 4 Toolkit VSM/OKR/ITIL Maturity Model等を実例で使ってみる\"]\nS4 --> S5[\"Step 5 シナリオ問題で Bloom's Level 3-4 適用・分析を練習する\"]\nS5 --> S6[\"Step 6 公式Mock Examで時間配分 90分/40問 を確認する\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass S1,S2,S3,S4 box;\nclass S5,S6 done;"
] as const;

defineSourceParityContract({
  suiteName: "pages/itil-transformation-v5-study-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: [],
  h6: [],
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: [],
  seoTitleFragments: ["ITIL Transformation", "Version 5"],
  seoTitle: "ITIL Transformation(Version 5) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  seoDescription: "PeopleCert ITIL Transformation(Version 5)の出題範囲を、Transformation Modelの4層構造・Patterns・Toolkit・AI Capability Modelまで初学者向けに解説する学習ガイド。",
  allowedHeadingSkips: ["h2 -> h4"],
});

const mountPage = createMountPage(Page);

describe("pages/itil-transformation-v5-study-guide.vue — 個別検証", () => {
  it("サイドバー目次と主要セクションの対応関係を保持する", () => {
    const wrapper = mountPage();
    const navHrefs = wrapper
      .findAll(".sidebar-nav a")
      .map((el) => el.attributes("href"));
    for (const id of EXPECTED_TOC_IDS) {
      expect(navHrefs).toContain(`#${id}`);
      expect(wrapper.find(`#${id}`).exists()).toBe(true);
    }
  });

  it("統計カードが 4 件表示される", () => {
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");
    expect(statCards).toHaveLength(4);
  });
});
