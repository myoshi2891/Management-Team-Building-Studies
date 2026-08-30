// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csd-certified-scrum-developer-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Scrum Developer®(CSD®) 完全学習ガイド"
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "CSD認定とは何か",
  "学習目標の全体構造とブルームの分類法",
  "土台となる知識: Scrum Foundations学習目標のおさらい",
  "カテゴリ1: Lean, Agile & Scrum",
  "カテゴリ2: Collaboration & Team Dynamics",
  "カテゴリ3: Architecture & Design",
  "カテゴリ4: Refactoring",
  "カテゴリ5: Test-Driven Development(TDD)",
  "カテゴリ6: Continuous Integration(CI)",
  "エンジニアリングプラクティス統合マップ(XP × Scrum)",
  "ベストプラクティス総合チェックリスト",
  "認定取得後のキャリアパスと更新",
  "まとめ",
  "参考文献・出典一覧"
] as const;

const EXPECTED_H3 = [
  "1.1 CSDの定義",
  "1.2 Developer Trackにおける位置づけ",
  "1.3 CSDとCSMの違い",
  "1.4 取得要件",
  "1.5 更新要件とSEU",
  "1.6 学習目標の情報源",
  "2.1 ブルームの分類法(Bloom's Taxonomy)",
  "2.2 6つの学習カテゴリ",
  "2.3 Scrum Foundationsとの関係",
  "3.1 Scrum Theory(スクラムの理論)— 経験主義",
  "3.2 The Scrum Team(スクラムチーム)",
  "3.3 Scrum Events and Activities(イベントと活動)",
  "3.4 Scrum Artifacts and Commitments(作成物とコミットメント)",
  "4.1(学習目標1.1)スプリントバックログを活用する",
  "4.2(学習目標1.2)PBIをインクリメントに変換する責任",
  "4.3(学習目標1.3)デイリースクラムを実践する",
  "4.4(学習目標1.4)PBIの属性を理解する",
  "4.5(学習目標1.5)プロダクトバックログリファインメントでの検査と適応",
  "4.6(学習目標1.6)Doneの定義が透明性を高める仕組み",
  "5.1(学習目標2.1)ワーキンググループとチームの違い",
  "5.2(学習目標2.2)効果的なチームの属性",
  "5.3(学習目標2.3)「ワンチームとして働く」を実演する",
  "5.4(学習目標2.4)開発者が顧客・ユーザーと直接対話する利点",
  "5.5(学習目標2.5)ステークホルダー・顧客・ユーザーとのコラボレーション方法",
  "5.6(学習目標2.6)チームとして共にインクリメントを共創する",
  "6.1(学習目標3.1)技術的卓越性の利点",
  "6.2(学習目標3.2)アジャイルチームにおける設計プラクティス",
  "6.3(学習目標3.3)アジャイル環境におけるアーキテクチャの原則",
  "7.1(学習目標4.1)リファクタリングを定義する",
  "7.2(学習目標4.2)リファクタリングの利点",
  "8.1(学習目標5.1)テストファーストという設計・開発アプローチ",
  "8.2(学習目標5.2)伝統的テストとアジャイルテストの違い",
  "8.3(学習目標5.3)TDDサイクルにおけるリファクタリングの重要性",
  "8.4(学習目標5.4)良いアジャイルテストアプローチの質",
  "9.1(学習目標6.1)継続的インテグレーションの定義と利点",
  "9.2(学習目標6.2)スクラムチームがCIから得られる利益の例",
  "9.3(学習目標6.3)自動化されたビルド・テスト・測定パイプラインの利点",
  "12.1 キャリアパス全体像",
  "12.2 SEUによる更新の考え方"
] as const;

const EXPECTED_H4 = [
  "一次情報源(Scrum Alliance公式)",
  "一次情報源(フレームワーク・原則)",
  "二次情報源(エンジニアリングプラクティスの解説)"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer",
  "https://agilealliance.org/glossary/simple-design",
  "https://agilealliance.org/glossary/crc-cards/",
  "https://agilealliance.org/glossary/refactoring/",
  "https://agilealliance.org/glossary/tdd/",
  "https://agilealliance.org/glossary/unit-test/",
  "https://agilealliance.org/glossary/continuous-integration/",
  "https://agilealliance.org/glossary/pair-programming",
  "https://agilealliance.org/glossary/collective-ownership/",
  "https://www.scrumalliance.org/docs/default-source/certification/learning-objectives/csd_learning_objectives_2024.pdf",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer",
  "https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://resources.scrumalliance.org/article/software-architecture-scrum",
  "https://scrumguides.org/scrum-guide.html",
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/principles.html",
  "https://agilealliance.org/agile101/subway-map-to-agile-practices/",
  "https://agilealliance.org/glossary/continuous-deployment/",
  "https://agilealliance.org/glossary/pair-programming/",
  "https://agilealliance.org/glossary/definition-of-done/",
  "https://agilealliance.org/glossary/backlog-refinement/",
  "https://refactoring.com/"
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "what-is-csd",
  "learning-objectives-structure",
  "scrum-foundations-review",
  "category-lean-agile-scrum",
  "category-collaboration",
  "category-architecture-design",
  "category-refactoring",
  "category-tdd",
  "category-ci",
  "xp-integration-map",
  "best-practices-checklist",
  "career-path-renewal",
  "summary",
  "references"
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
  "SECTION 15"
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    A["Scrum Foundations\\n共通の基礎知識"] --> B["CSD\\nCertified Scrum Developer"]
    B --> C["A-CSD\\nAdvanced Certified\\nScrum Developer"]
    C --> D["CSP-D\\nCertified Scrum Professional\\nfor Developers"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A box;
    class B hub;
    class C,D done;`,
  `flowchart TB
    A["Scrum Alliance認定CSDトレーナーによる\\n14時間以上の正式トレーニングを受講"] --> B["CSDアセスメントで理解度を証明\\n試験形式またはクラス内での実技評価"]
    B --> C["CSDライセンスを受諾し\\nScrum Allianceプロフィールに登録"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`,
  `flowchart TB
    Root["CSD Learning Objectives"]
    Root --> C1["1. Lean, Agile & Scrum"]
    Root --> C2["2. Collaboration & Team Dynamics"]
    Root --> C3["3. Architecture & Design"]
    Root --> C4["4. Refactoring"]
    Root --> C5["5. Test-Driven Development"]
    Root --> C6["6. Continuous Integration"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Root box;
    class C1,C2,C3,C4,C5,C6 hub;`,
  `flowchart TB
    Emp["経験主義 Empiricism"]
    Emp --> P1["透明性\\nTransparency"]
    Emp --> P2["検査\\nInspection"]
    Emp --> P3["適応\\nAdaptation"]

    V["スクラムの5つの価値基準"]
    V --> V1["確約 Commitment"]
    V --> V2["集中 Focus"]
    V --> V3["公開 Openness"]
    V --> V4["尊敬 Respect"]
    V --> V5["勇気 Courage"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Emp,P1,P2,P3 box;
    class V,V1,V2,V3,V4,V5 done;`,
  `flowchart LR
    A["前日までの進捗を検査"] --> B["スプリントゴールとの\\nギャップを確認"]
    B --> C["翌24時間の計画を\\n開発者同士で調整"]
    C --> D["必要に応じて\\nスプリントバックログを更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`,
  `flowchart TB
    A["プロダクトバックログアイテムを\\n検査する"] --> B{"詳細・見積り・順序は\\n十分か?"}
    B -- "不十分" --> C["開発者・POが対話し\\nPBIを分割・詳細化・再見積り"]
    C --> A
    B -- "十分" --> D["次のスプリントプランニングで\\n選択可能な状態にする"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C,D box;
    class B hub;`,
  `flowchart LR
    A["Doneの定義"] --> B["インクリメントの\\n品質基準を明文化"]
    B --> C["透明性の向上"]
    C --> D["進捗を正しく検査できる"]
    D --> E["的確な適応判断ができる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `flowchart LR
    SP["スプリントプランニング\\nステークホルダーの意向を反映"] --> DEV["開発期間中\\nユーザーインタビューや\\nプロトタイプでのフィードバック収集"]
    DEV --> SR["スプリントレビュー\\nインクリメントを提示し\\nフィードバックを得る"]
    SR --> SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class SP,DEV,SR box;`,
  `flowchart TB
    A["アジャイルアーキテクチャの原則"]
    A --> B["創発的アーキテクチャ\\n必要になった時点で\\n設計を進化させる"]
    A --> C["変更コストを下げる設計\\n疎結合・高凝集を志向する"]
    A --> D["継続的なリファクタリングによる\\n設計の健全性維持"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D box;`,
  `flowchart LR
    A["リファクタリング前のコード\\n振る舞いは変化なし"] --> B["内部構造を\\n段階的に改善"]
    B --> C["リファクタリング後のコード\\n振る舞いは同じ、構造はより良い"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C box;`,
  `flowchart LR
    R["Red\\n失敗するテストを書く"] --> G["Green\\nテストを通す\\n最小限のコードを書く"]
    G --> F["Refactor\\n振る舞いを変えずに\\n内部構造を改善する"]
    F --> R

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class R hub;
    class G done;
    class F box;`,
  `flowchart TB
    CI["継続的インテグレーション"]
    CI --> A["インクリメントの品質が\\nスプリント中を通じて\\n継続的に検査できる"]
    CI --> B["Doneの定義における\\n自動テスト合格を\\n常に満たしやすくなる"]
    CI --> C["複数の開発者が\\n同時並行で作業しても\\n統合リスクが低い"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class CI hub;
    class A,B,C box;`,
  `flowchart LR
    A["コードをコミットまたはプッシュ"] --> B["自動ビルド"]
    B --> C["自動テスト実行\\n単体・結合"]
    C --> D["コード品質とカバレッジの\\n自動測定"]
    D --> E["結果をチームに\\nフィードバック"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `flowchart TB
    TDD["Test-Driven\\nDevelopment"] --> Refactor["Refactoring"]
    Refactor --> SimpleDesign["Simple Design"]
    SimpleDesign --> CI["Continuous\\nIntegration"]
    CI --> CollectiveOwnership["Collective Code\\nOwnership"]
    CollectiveOwnership --> PairProgramming["Pair Programming"]
    PairProgramming --> TDD

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class TDD,Refactor,SimpleDesign,CI,CollectiveOwnership,PairProgramming box;`,
  `flowchart TB
    CSD["CSD取得"] --> Practice["実務でエンジニアリング\\nプラクティスを実践"]
    Practice --> Renew["2年ごとにSEUを提出し\\n更新手数料を払って更新する"]
    Practice --> Advance["経験を積んで\\nA-CSDに挑戦"]
    Advance --> CSPD["さらに経験とSEUを積み\\nCSP-Dに挑戦"]
    Renew --> Practice

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Practice,Renew,Advance box;
    class CSD,CSPD hub;`
] as const;

const EXPECTED_CALLOUT_VARIANTS: Record<string, number> = {
  note: 4,
  practice: 15,
  source: 8,
};

const EXPECTED_CALLOUT_LABELS: Record<string, Record<string, number>> = {
  note: {
    補足: 4,
  },
  practice: {
    ベストプラクティス: 15,
  },
  source: {
    ソース: 7,
    ソース補足: 1,
  },
};

const EXPECTED_STEP_TAGS: readonly string[] = [];

const EXPECTED_SEO_TITLE = "Certified Scrum Developer(CSD) 認定資格 完全ガイド | 初学者向けステップバイステップ解説";
const EXPECTED_SEO_DESCRIPTION = "Scrum AllianceのCSD Learning Objectivesに基づき、CSD認定の学習目標6カテゴリ(Lean/Agile/Scrum、Collaboration、Architecture、Refactoring、TDD、CI)を初学者向けに解説する完全ガイド。";

defineSourceParityContract({
  suiteName: "pages/csd-certified-scrum-developer-study-guide.vue",
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
  seoTitleFragments: ["Certified Scrum Developer", "CSD"],
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});
