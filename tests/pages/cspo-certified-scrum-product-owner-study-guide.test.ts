// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cspo-certified-scrum-product-owner-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Scrum Product Owner®(CSPO®) 完全学習ガイド"
] as const;

const EXPECTED_H2 = [
  "本ガイドの前提と情報源",
  "CSPOとは何か － Product Owner Trackにおける位置づけ",
  "Bloom's Taxonomy － 学習目標の読み方",
  "Scrum Foundations® 復習",
  "カテゴリ1 － Product Owner Core Competencies(プロダクトオーナーの中核能力)",
  "カテゴリ2 － Goal Setting and Planning(ゴール設定と計画)",
  "カテゴリ3 － Understanding Customers and Users(顧客とユーザーの理解)",
  "カテゴリ4 － Validating Product Assumptions(プロダクト仮説の検証)",
  "カテゴリ5 － Working with the Product Backlog(プロダクトバックログの運用)",
  "ベストプラクティス総合チェックリスト",
  "認定後のキャリアパスと資格更新(A-CSPO / CSP-PO / SEU)",
  "よくある誤解とアンチパターン",
  "まとめ",
  "参考文献・ソース一覧"
] as const;

const EXPECTED_H3 = [
  "1.1 CSPOの概要",
  "1.2 Product Ownerというロールの基本像",
  "1.3 Product Owner TrackにおけるCSPOの位置づけ",
  "1.4 CSMとCSPO、どちらを選ぶべきか",
  "1.5 受講対象者",
  "3.1 Scrum Theory(Scrum理論)",
  "3.2 The Scrum Team(スクラムチーム)",
  "3.3 Scrum Events and Activities(スクラムイベントと活動)",
  "3.4 Scrum Artifacts and Commitments(スクラム作成物とコミットメント)",
  "4.1(LO 1.1)組織設計とPOアカウンタビリティの関係",
  "4.2(LO 1.2)ステークホルダーへの進捗の透明性確保",
  "4.3(LO 1.3)ステークホルダーから情報・洞察を得る技法",
  "4.4(LO 1.4)スクラムイベント・Sprintを通じたPOの関わり方",
  "4.5(LO 1.5)複数チームを担当するPOの課題克服",
  "4.6(LO 1.6)POが単一人物である理由",
  "4.7(LO 1.7)Product Backlogに対するPOの権限と協働のバランス",
  "5.1(LO 2.1)Product VisionとProduct Goalの関係",
  "5.2(LO 2.2)Product Goalの作成を実践する",
  "5.3(LO 2.3)Sprint Goalの作成をScrum Teamと実践する",
  "5.4(LO 2.4)ステークホルダーとのプロダクト計画・予測の構成要素",
  "5.5(LO 2.5)プロダクトリリースの計画方法",
  "5.6(LO 2.6)小さく価値があり利用可能な増分を見極めるアプローチ",
  "6.1(LO 3.1)POのプロダクトディスカバリーと検証への組み込み方",
  "6.2(LO 3.2)顧客・ユーザーのセグメンテーション手法",
  "6.3(LO 3.3)相反する顧客・ユーザーニーズへの対処技法",
  "6.4(LO 3.4)プロダクトディスカバリーが成功に貢献する側面",
  "6.5(LO 3.5)開発者を顧客・ユーザーに直接つなげるアプローチ",
  "7.1(LO 4.1)Scrumがプロダクト仮説の検証をどう支えるか",
  "7.2(LO 4.2)プロダクト仮説の検証アプローチをコストと学習の質で比較する",
  "8.1(LO 5.1)アウトカムとアウトプットの関係",
  "8.2(LO 5.2)アウトカム・インパクトを最大化しアウトプットを最小化する行動",
  "8.3(LO 5.3)プロダクト経済性に関する用語",
  "8.4(LO 5.4)異なるステークホルダー群から見た「価値」",
  "8.5(LO 5.5)価値を測定する技法",
  "8.6(LO 5.6)Product Goal達成を支えるProduct Backlogの作成",
  "8.7(LO 5.7)望ましいアウトカムと価値を含むProduct Backlog Itemの作成",
  "8.8(LO 5.8)Product Backlogのリファインメントを実践する",
  "プロダクトオーナーとしての基本姿勢",
  "ゴール設定と計画",
  "顧客とユーザーの理解",
  "プロダクト仮説の検証",
  "プロダクトバックログの運用",
  "10.1 資格更新の基本ルール",
  "10.2 上位資格による自動更新",
  "10.3 A-CSPO(Advanced Certified Scrum Product Owner)",
  "10.4 CSP®-PO(Certified Scrum Professional® - Product Owner)",
  "Scrum Alliance公式情報",
  "フレームワークの一次情報源",
  "関連リソース(Scrum Alliance Resource Library)"
] as const;

const EXPECTED_H4 = [] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    A["Scrum Foundations 推奨される共通の基礎知識"] -.->|"受講前または受講中にカバーが期待される"| B["CSPO Certified Scrum Product Owner"]
    B --> C["A-CSPO Advanced Certified Scrum Product Owner"]
    C --> D["CSP-PO Certified Scrum Professional - Product Owner"]
    B -.->|"A-CSPOを取得・更新するとCSPOも自動更新"| C
    C -.->|"CSP-POを取得・更新するとCSPO・A-CSPOも自動更新"| D

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A box;
    class B hub;
    class C hub;
    class D done;`,
  `flowchart TD
    K["Knowledge 知識 Define / Name / List"] --> CO["Comprehension 理解 Describe / Discuss / Recognize"]
    CO --> AP["Application 応用 Apply / Demonstrate / Illustrate"]
    AP --> AN["Analysis 分析 Compare / Contrast / Distinguish"]
    AN --> SY["Synthesis 統合 Create / Prepare / Organize"]
    SY --> EV["Evaluation 評価 Measure / Assess / Evaluate"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class K,CO box;
    class AP,AN hub;
    class SY,EV done;`,
  `flowchart LR
    T["Transparency 透明性"] --> I["Inspection 検査"]
    I --> AD["Adaptation 適応"]
    AD -.->|"フィードバックを反映"| T

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class T,I,AD box;`,
  `flowchart TD
    PO["Product Owner 価値の最大化に責任"] --> PB["Product Backlog を管理"]
    SM["Scrum Master Scrumの実践を確立"] --> Team["Scrum Team全体を支援"]
    DEV["Developers Incrementの作成に責任"] --> INC["Sprintごとにusableな Incrementを作成"]
    PB --> DEV
    Team --> PO
    Team --> DEV

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PO,SM,DEV box;`,
  `flowchart LR
    SP["Sprint Planning 最大8時間 / 1か月Sprint"] --> DS["Daily Scrum 15分 / 毎日"]
    DS --> DS
    DS --> SR["Sprint Review 最大4時間 / 1か月Sprint"]
    SR --> RETRO["Sprint Retrospective 最大3時間 / 1か月Sprint"]
    RETRO -.->|"次のSprintへ"| SP

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class SP,DS,SR,RETRO box;`,
  `flowchart TD
    PG["Product Goal Product Backlogのコミットメント"] --> PB["Product Backlog"]
    SG["Sprint Goal Sprint Backlogのコミットメント"] --> SB["Sprint Backlog"]
    DOD["Definition of Done Incrementのコミットメント"] --> INC["Increment"]
    PB -->|"Sprint Planningで選択"| SB
    SB -->|"Developersが作業"| INC
    INC -->|"検査結果を反映"| PB

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PG,SG,DOD hub;
    class PB,SB,INC box;`,
  `flowchart TB
    subgraph D1["設計1 - 単一チーム専属PO"]
        PO1["Product Owner"] --> Team1["1つのScrum Team"]
    end
    subgraph D2["設計2 - 複数チームを担当するPO"]
        PO2["Product Owner"] --> TeamA["Scrum Team A"]
        PO2 --> TeamB["Scrum Team B"]
        PO2 --> TeamC["Scrum Team C"]
    end
    subgraph D3["設計3 - 階層型 Chief PO配下"]
        CPO["Chief Product Owner / Product Manager"] --> APO1["Area PO 1"]
        CPO --> APO2["Area PO 2"]
        APO1 --> TeamX["Scrum Team X"]
        APO2 --> TeamY["Scrum Team Y"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PO1,PO2,CPO,APO1,APO2 box;`,
  `flowchart TD
    V["Product Vision 長期的・野心的な「なぜ」 非公式・戦略レイヤー"] --> G1["Product Goal #1 測定可能な中期目標"]
    G1 --> G2["Product Goal #2 達成後に更新される次の目標"]
    G2 --> G3["Product Goal #3"]
    G1 -.->|"支える"| PB1["Product Backlog の内容・順序"]
    G2 -.->|"支える"| PB2["Product Backlog の内容・順序"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class V hub;
    class G1,G2,G3 box;`,
  `flowchart LR
    subgraph A1["アプローチ1 - ストーリー分割 SPIDR"]
        S["Spike"] --> P["Path"]
        P --> IF["Interface"]
        IF --> DA["Data"]
        DA --> R["Rules"]
    end
    subgraph A2["アプローチ2 - Story Mapping / Walking Skeleton"]
        Map["ユーザーの旅を 横軸に並べる"] --> Slice["各工程を薄く 垂直にスライス"]
        Slice --> Walk["エンドツーエンドで 動く最小構成"]
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class S,P,IF,DA,R,Map,Slice,Walk box;`,
  `flowchart LR
    subgraph Discovery["Discoveryトラック 継続的"]
        Idea["仮説・機会"] --> Interview["顧客インタビュー"]
        Interview --> Prototype["プロトタイプ検証"]
        Prototype --> Validated["検証済みの解決策"]
    end
    subgraph Delivery["Deliveryトラック Sprintベース"]
        Backlog["Product Backlog"] --> Build["Sprintで構築"]
        Build --> Increment["Increment"]
    end
    Validated -->|"裏付けのあるItemとして投入"| Backlog
    Increment -->|"利用データ・フィードバック"| Idea

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Idea,Interview,Prototype,Validated hub;
    class Backlog,Build,Increment box;`,
  `flowchart LR
    H["仮説を立てる Product Goalの前提"] --> SP["短いSprintで 検証可能な増分を作る"]
    SP --> RV["Sprint Reviewで 検査 Inspection"]
    RV --> LN["学びをProduct Backlogに 適応 Adaptation"]
    LN -.->|"次の仮説へ"| H

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class H,SP,RV,LN box;`,
  `flowchart LR
    Output["Output アウトプット 作った機能・出荷したIncrement"] --> Outcome["Outcome アウトカム 顧客・事業の行動や 状態の変化"]
    Outcome --> Impact["Impact インパクト 長期的な事業・社会への効果"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Output box;
    class Outcome hub;
    class Impact done;`,
  `flowchart LR
    Raw["粗いアイデア・要望"] --> Split["大きなItemを分割"]
    Split --> Detail["受け入れ基準・詳細を追加"]
    Detail --> Estimate["相対見積り"]
    Estimate --> Order["価値・リスクに基づき 順序を見直す"]
    Order -.->|"継続的に繰り返す"| Raw

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Raw,Split,Detail,Estimate,Order box;`,
  `flowchart TD
    CSPO["CSPO取得 2年ごとにSEU提出と 更新料の支払いで更新"] --> Path1["A-CSPOに進む"]
    CSPO --> Path2["CSPOのまま更新し続ける"]
    Path1 --> ACSPO["A-CSPO取得 CSPOも自動更新"]
    ACSPO --> Path3["CSP-PO® に進む"]
    Path3 --> CSPPO["CSP-PO取得 CSPO・A-CSPOも自動更新"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class CSPO,ACSPO box;
    class Path1,Path2,Path3 hub;
    class CSPPO done;`,
  `flowchart TD
    F["Scrum Foundations 理論・チーム・イベント・作成物"] --> C1["Category 1 PO Core Competencies"]
    F --> C2["Category 2 Goal Setting and Planning"]
    F --> C3["Category 3 Understanding Customers and Users"]
    F --> C4["Category 4 Validating Product Assumptions"]
    F --> C5["Category 5 Working with the Product Backlog"]
    C1 --> Goal["価値を最大化する Product Owner"]
    C2 --> Goal
    C3 --> Goal
    C4 --> Goal
    C5 --> Goal

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F box;
    class C1,C2,C3,C4,C5 hub;
    class Goal done;`
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "what-is-cspo",
  "blooms-taxonomy",
  "scrum-foundations",
  "po-core-competencies",
  "goal-setting-planning",
  "understanding-customers-users",
  "validating-product-assumptions",
  "working-with-product-backlog",
  "best-practices-checklist",
  "career-path-renewal",
  "misconceptions-antipatterns",
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
  "SECTION 14"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner",
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner",
  "https://www.scrumalliance.org/media/certifications/los/cspo_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://www.scrumalliance.org/get-certified/product-owner-track",
  "https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner",
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.scrumalliance.org/about-scrum",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/what-is-a-scrum-master",
  "https://scrumguides.org/scrum-guide.html",
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/principles.html",
  "https://resources.scrumalliance.org/article/product-goals-scrum",
  "https://resources.scrumalliance.org/article/features-scrum",
  "https://resources.scrumalliance.org/article/whats-typical-day-product-owner",
  "https://resources.scrumalliance.org/article/need-know-acceptance-criteria",
  "https://creativecommons.org/licenses/by-sa/4.0/legalcode"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  "note": 36,
  "practice": 36
} as const;

const EXPECTED_CALLOUT_LABELS = {
  "note": {
    "補足": 36
  },
  "practice": {
    "ベストプラクティス": 36
  }
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "CSPO",
  "Certified Scrum Product Owner",
] as const;

const EXPECTED_SEO_TITLE = "CSPO® 認定資格 完全ガイド | Certified Scrum Product Owner 学習目標&ベストプラクティス";

const EXPECTED_SEO_DESCRIPTION = "Scrum Alliance公式のCSPO Learning ObjectivesとScrum Foundations Learning Objectivesを完全網羅した、Certified Scrum Product Owner(CSPO)学習ガイド。5つの学習目標カテゴリ、ベストプラクティス、認定後のキャリアパスをMermaid図解付きで解説。";

defineSourceParityContract({
  suiteName: "pages/cspo-certified-scrum-product-owner-study-guide.vue",
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
  seoTitleFragments: EXPECTED_SEO_TITLE_FRAGMENTS,
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});
