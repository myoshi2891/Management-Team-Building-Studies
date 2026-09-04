// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import Page from "~/pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({
  seoMeta: vi.fn(),
}));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Scrum Professional® ScrumMaster (CSP®-SM) 完全学習ガイド"
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "CSP-SM とは何か — 全体像",
  "取得要件(Requirements)",
  "Bloom's Taxonomy — 学習目標の読み方",
  "CSP-SM Learning Objectives 全体マップ",
  "カテゴリ1: Lean, Agile, and Scrum (LO 1.1–1.4)",
  "カテゴリ2: Scrum Master Core Competencies (LO 2.1–2.8)",
  "カテゴリ3: Service to the Scrum Team (LO 3.1–3.6)",
  "カテゴリ4: Service to the Product Owner (LO 4.1–4.2)",
  "カテゴリ5: Service to the Organization (LO 5.1–5.7)",
  "カテゴリ6: Advanced Scrum Mastery (LO 6.1–6.2)",
  "ベストプラクティス総まとめ",
  "よくある誤解・アンチパターン",
  "認定後のキャリアパス",
  "まとめ",
  "参考文献(Sources)"
] as const;

const EXPECTED_H3 = [
  "1.1 Scrum Master トラックの全体像",
  "1.2 CSP-SM で学ぶこと",
  "2.1 重要な注意点: コース受講と資格取得は別タイミングでよい",
  "2.2 取得までのプロセス(フローチャート)",
  "2.3 A-CSM 側の前提条件(参考)",
  "3.1 Bloom's Taxonomy の6段階",
  "3.2 動詞から認知レベルを読み解くコツ",
  "5.1 LO 1.1: Lean Thinking の起源を説明できる",
  "5.2 LO 1.2: Lean Thinking の中核概念と Scrum への適用を説明できる",
  "5.3 LO 1.3: プロダクト開発における5つ以上のムダを、製造業における7つのムダに関連づけられる",
  "5.4 LO 1.4: 少なくとも3つのアジャイル開発プラクティスを Lean プラクティスに関連づけられる",
  "6.1 Facilitation(ファシリテーション)",
  "6.2 Coaching and Training(コーチングとトレーニング)",
  "7.1 Team Dynamics(チームダイナミクス)",
  "7.2 Scrum Teams(スクラムチーム)",
  "8.1 LO 4.1: Product Goal から Product Backlog へ移行するための少なくとも2つの技法を適用できる",
  "8.2 LO 4.2: 複雑・複数チームの Product Backlog を構造化するための少なくとも3つの基準を評価できる",
  "9.1 Organizational Development(組織開発)",
  "9.2 Scaling Scrum(スクラムのスケーリング)",
  "10.1 LO 6.1: スクラムマスタリーに向けた個人開発戦略の概要を描ける",
  "10.2 LO 6.2: 誰かをメンタリングする経験を積める",
  "13.1 資格の維持(SEU と更新)",
  "13.2 上位資格との関係"
] as const;

const EXPECTED_H4 = [
  "LO 2.1: オープンディスカッションに代わる少なくとも3つの選択肢を使い分けられる",
  "LO 2.2: 包摂的な解決策の醸成を支援するために少なくとも3つの行動を特定できる",
  "LO 2.3: 協働セッションのために少なくとも3つのビジュアルファシリテーション技法を適用できる",
  "LO 2.4: リモート会議をファシリテーションするための少なくとも3つのプラクティスを特定できる",
  "LO 2.5: コーチング・アグリーメントを作成できる",
  "LO 2.6: 少なくとも2つの基本的なコーチングの前提を議論できる",
  "LO 2.7: 個人の行動変容を促す少なくとも3つの基礎的な心理学的概念を挙げられる",
  "LO 2.8: Scrum またはアジャイルに関連する少なくとも1つのトピックを開発し、教えられる",
  "LO 3.1: チーム開発に関する少なくとも2つの異なるモデルを評価できる",
  "LO 3.2: チームの効果性を改善する少なくとも3つの技法を比較できる",
  "LO 3.3: 新しい Scrum チームを結成する際の、Scrum チームメンバーとステークホルダーの少なくとも5つの責任を説明できる",
  "LO 3.4: 新しい Scrum チームの立ち上げを計画できる",
  "LO 3.5: プロダクトの成功に必要なスキル・能力のギャップを埋める戦略を提案できる",
  "LO 3.6: ソフトウェアクラフトマンシップの少なくとも1つの要素が自分の仕事にどう適用されるかを説明できる",
  "LO 5.1: 組織の Scrum 導入を助ける少なくとも2つの体系的アプローチを比較できる",
  "LO 5.2: 組織的な障害の根本原因に対処する複雑な介入について、自分のアプローチを分析できる",
  "LO 5.3: チームや組織の文化をどう変えたかについて、少なくとも2つの具体例を要約できる",
  "LO 5.4: 最新の Scrum の定義を採用することで、自分の Scrum チーム・組織がどのように便益を得られるかを評価できる",
  "LO 5.5: Product Owner ロールをスケールする少なくとも2つのパターンを対比できる",
  "LO 5.6: チーム間協働を改善する少なくとも3つの技法を実験できる",
  "LO 5.7: 複数の Scrum チームの立ち上げを計画できる",
  "Scrum Alliance 公式情報源",
  "Scrum / Agile の一次情報源",
  "Lean Thinking / Toyota Production System",
  "ファシリテーション / コーチング",
  "チームダイナミクス",
  "ソフトウェアクラフトマンシップ",
  "スケーリングフレームワーク",
  "組織変革"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "what-is-csp-sm",
  "requirements",
  "blooms-taxonomy",
  "lo-overview-map",
  "category-1-lean-agile-scrum",
  "category-2-core-competencies",
  "category-3-service-to-scrum-team",
  "category-4-service-to-product-owner",
  "category-5-service-to-organization",
  "category-6-advanced-scrum-mastery",
  "best-practices-summary",
  "misconceptions-and-antipatterns",
  "career-path",
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
  "SECTION 15",
  "SECTION 16"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://agilemanifesto.org/",
  "https://artoflean.com/topics/seven-wastes/",
  "https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/",
  "https://en.wikipedia.org/wiki/Taiichi_Ohno",
  "https://en.wikipedia.org/wiki/The_Five_Dysfunctions_of_a_Team",
  "https://less.works/less/principles/large_scale_scrum_is_scrum",
  "https://less.works/less/principles/overview.html",
  "https://manifesto.softwarecraftsmanship.org/",
  "https://newsletter.techworld-with-milan.com/p/software-development-waste",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://scrumguides.org/revisions.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf",
  "https://support.scrumalliance.org/hc/en-us/articles/115001680252-How-do-I-earn-the-Advanced-Certified-ScrumMaster-A-CSM-or-Advanced-Certified-Scrum-Product-Owner-A-CSPO-certification",
  "https://support.scrumalliance.org/hc/en-us/articles/115001681612-Can-I-take-the-CSP-SM-or-CSP-PO-course-before-I-have-the-required-work-experience",
  "https://support.scrumalliance.org/hc/en-us/articles/35971003067291-Updates-to-the-Certified-Enterprise-Coach-CEC-and-Certified-Team-Coach-CTC-programs",
  "https://www.liberatingstructures.com/",
  "https://www.mindtools.com/a3mi00v/5-whys/",
  "https://www.prosci.com/blog/adkar-vs-kotter",
  "https://www.prosci.com/blog/kotters-change-management-theory",
  "https://www.scrum.org/resources/blog/scrum-guide-2020-and-2017-side-side-comparison",
  "https://www.scrum.org/resources/blog/scrum-guide-2020-update-introducing-product-goal",
  "https://www.scrum.org/resources/blog/scrum-guide-2020-update-self-mgt-replaces-self-organization",
  "https://www.scrum.org/resources/online-nexus-guide",
  "https://www.scrumalliance.org/about-scrum",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrum-professional-scrummaster",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/media/certifications/los/csp_sm_learning_objectives_2022.pdf",
  "https://www.scrumatscale.com/scrum-at-scale-guide-online/"
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\nA[\"CSM Certified ScrumMaster (前提資格なし)\"] --> B[\"A-CSM Advanced Certified ScrumMaster (CSM(または PSM I/PSM II)必須 + 実務経験12か月)\"]\nB --> C[\"CSP-SM Certified Scrum Professional ScrumMaster (A-CSM必須 + 実務経験24か月)\"]\nC --> D[\"CST Certified Scrum Trainer\"]\nC -.->|\"現在のキャリアパスの次段階ではない\"| E[\"CTC / CEC (2025年1月6日で新規申請停止した既存資格。有効期限内(アクティブ)の保持者に限りバッジ表示と認定の保持を継続できる(失効後も有効という意味ではない)。後継のCertified Agility Consultant(CAC)は開発中で未開始)\"]\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass C hub;",
  "flowchart TD\nStart([\"CSM を取得する (A-CSM の前提資格は PSM I / PSM II でも代替可)\"]) --> ACSM[\"A-CSM を取得する (CSM または PSM I / PSM II 保有 + 実務経験12か月)\"]\nACSM --> Enroll[\"CSP-SM コースに申し込む (この時点で24か月の実務経験は必須ではない)\"]\nEnroll --> Course[\"コースを受講し 事前/事後課題を含む全構成要素を修了する\"]\nCourse --> Exp{\"Scrum Master としての実務経験が過去5年以内で24か月以上あるか?\"}\nExp -- いいえ --> Wait[\"実務経験を積み、Scrum Alliance プロフィールに記録する\"]\nWait --> Exp\nExp -- はい --> License[\"CSP-SM License Agreement に同意し、会員プロフィールを完成させる\"]\nLicense --> Cert([\"CSP-SM 認定証が発行される\"])\nCert --> Maintain[\"SEU を獲得し、2年ごとに資格を更新する\"]\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass Cert done;",
  "flowchart TB\nK[\"Knowledge (知識) 事実や用語を思い出せる\"] --> C[\"Comprehension (理解) 意味を自分の言葉で説明できる\"]\nC --> A[\"Application (応用) 実際の状況に適用できる\"]\nA --> An[\"Analysis (分析) 要素に分解し比較できる\"]\nAn --> S[\"Synthesis (統合) 新しいものを構築・創造できる\"]\nS --> E[\"Evaluation (評価) 基準に基づいて価値判断できる\"]\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass S,E done;",
  "flowchart TD\nRoot([\"CSP-SM Learning Objectives\"])\nRoot --> C1[\"1. Lean, Agile, and Scrum\"]\nRoot --> C2[\"2. Scrum Master Core Competencies\"]\nRoot --> C3[\"3. Service to the Scrum Team\"]\nRoot --> C4[\"4. Service to the Product Owner\"]\nRoot --> C5[\"5. Service to the Organization\"]\nRoot --> C6[\"6. Advanced Scrum Mastery\"]\nC2 --> C2a[\"Facilitation\"]\nC2 --> C2b[\"Coaching and Training\"]\nC3 --> C3a[\"Team Dynamics\"]\nC3 --> C3b[\"Scrum Teams\"]\nC5 --> C5a[\"Organizational Development\"]\nC5 --> C5b[\"Scaling Scrum\"]\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass Root hub;",
  "flowchart LR\nV[\"Value 価値の定義 (顧客視点)\"] --> VS[\"Value Stream 価値の流れの可視化\"]\nVS --> F[\"Flow よどみなく流す\"]\nF --> P[\"Pull プル型で引っ張る\"]\nP --> Pe[\"Perfection 完璧を目指し続ける\"]\nPe -.->|\"継続的に繰り返す\"| V",
  "flowchart TD\nQ{\"目的は何か?\"}\nQ -- \"全員のアイデアを平等に集めたい\" --> LS1[\"1-2-4-All (個人→ペア→4人→全体)\"]\nQ -- \"多くの意見から絞り込みたい\" --> DV[\"ドット投票 (Dot Voting)\"]\nQ -- \"順番に発言機会を確保したい\" --> RR[\"ラウンドロビン (Round-Robin)\"]\nQ -- \"少人数での深い議論を全体に還元したい\" --> FB[\"フィッシュボウル (Fishbowl)\"]\nQ -- \"テーマ別に並行議論したい\" --> BO[\"ブレイクアウト グループ\"]",
  "flowchart TD\nA[\"コーチングエンゲージメント 全体のアグリーメント\"] --> A1[\"コーチングの目的・範囲の合意\"]\nA --> A2[\"役割と責任の明確化 (コーチ/クライアント/スポンサーそれぞれ)\"]\nA --> A3[\"守秘義務・頻度・期間の合意\"]\nB[\"個別セッションの アグリーメント\"] --> B1[\"このセッションで達成したいことの確認\"]\nB --> B2[\"成功の指標の合意\"]",
  "flowchart LR\nF[\"Forming 形成期\"] --> S[\"Storming 混乱期\"] --> N[\"Norming 統一期\"] --> P[\"Performing 機能期\"]\nP -.->|\"チーム解散時\"| Ad[\"Adjourning 解散期\"]",
  "flowchart TD\nA[\"プロダクトと境界の定義\"] --> B[\"チーム編成 (必要スキルセットの洗い出し)\"]\nB --> C[\"Product Goal と初期 Product Backlog の準備\"]\nC --> D[\"Working Agreement と Definition of Done の合意形成\"]\nD --> E[\"ステークホルダー マップの作成\"]\nE --> F[\"最初の Sprint Planning\"]",
  "flowchart LR\nPG[\"Product Goal (将来のプロダクトのありたい姿)\"] --> Map[\"User Story Mapping / Impact Mapping で分解する\"]\nMap --> PB[\"Product Backlog (優先順位づけされた実行可能な項目群)\"]",
  "flowchart TB\nsubgraph Kotter[\"Kotter 8-Step (組織レベル・トップダウン)\"]\nK1[\"危機感の醸成\"] --> K2[\"推進チームの結成\"] --> K3[\"ビジョンの策定\"] --> K4[\"ビジョンの伝達\"] --> K5[\"障害の除去\"] --> K6[\"短期的成果\"] --> K7[\"更なる変革の推進\"] --> K8[\"変革の定着\"]\nend\nsubgraph ADKAR[\"ADKAR (個人レベルの変化)\"]\nA1[\"Awareness\"] --> A2[\"Desire\"] --> A3[\"Knowledge\"] --> A4[\"Ability\"] --> A5[\"Reinforcement\"]\nend",
  "flowchart TD\nP[\"表面化した問題 (例: リリースが頻繁に遅延する)\"] --> W1[\"なぜ1: なぜ遅延するのか?\"]\nW1 --> W2[\"なぜ2: なぜ見積もりが毎回外れるのか?\"]\nW2 --> W3[\"なぜ3: なぜ不確実性が高い項目を見積もれないのか?\"]\nW3 --> W4[\"なぜ4: なぜ事前のリファインメントが行われていないのか?\"]\nW4 --> W5[\"なぜ5: なぜリファインメントの時間が確保されていないのか?\"]\nW5 --> Root([\"根本原因: 組織のカレンダー文化が会議を優先し、リファインメントの時間を構造的に奪っている\"])\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass Root hub;",
  "flowchart TD\nsubgraph Nexus[\"Nexus\"]\nN_PO[\"単一の Product Owner\"] --> N_PB[\"単一の Product Backlog\"]\nend\nsubgraph S2[\"Scrum@Scale\"]\nCPO[\"Chief Product Owner\"] --> Meta[\"MetaScrum (各チームのPOで構成)\"]\nMeta --> S_PB[\"統合された Product Backlog\"]\nend",
  "flowchart TD\nA[\"プロダクト全体の境界とゴールの定義\"] --> B[\"チーム分割の設計 (依存関係を最小化する分割軸の選定)\"]\nB --> C[\"共有カデンス (Sprint期間・イベントのタイミング統一)\"]\nC --> D[\"統合の仕組みの設計 (Nexus Integration Team / Scrum of Scrums など)\"]\nD --> E[\"各チームの Working Agreement と共有 Definition of Done の合意\"]\nE --> F[\"最初の複数チーム合同 Sprint Planning\"]",
  "flowchart LR\nShu[\"守 (Shu) 型を忠実に守る段階 (CSM相当)\"] --> Ha[\"破 (Ha) 型を理解した上で応用する段階 (A-CSM〜CSP-SM相当)\"]\nHa --> Ri[\"離 (Ri) 型から離れ、独自のスタイルを確立する段階 (CST相当。CEC・CTC は新規申請の受付を停止した既存資格)\"]\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass Ri done;"
] as const;

defineSourceParityContract({
  suiteName: "pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue",
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
  calloutVariants: { note: 10, practice: 23 },
  calloutLabels: {
    note: { "補足": 10 },
    practice: {
      "ベストプラクティス": 21,
      "ベストプラクティス(ミニトレーニング設計のステップ)": 1,
      "ベストプラクティス(個人開発戦略の設計ステップ)": 1,
    },
  },
  stepTags: [],
  seoTitleFragments: ["CSP-SM", "Certified Scrum Professional"],
  seoTitle: "CSP-SM® 認定資格 完全ガイド | Certified Scrum Professional ScrumMaster 学習ガイド",
  seoDescription: "Scrum Alliance Certified Scrum Professional ScrumMaster (CSP-SM) の公式 Learning Objectives に基づく初学者向け学習ガイド。ステップバイステップの解説、ベストプラクティス、出典URL付き。",
});

describe("pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue — テーブル構造契約", () => {
  const mountPage = createMountPage(Page);

  it("ページ内に 24 個の表が存在し、それぞれ適切なヘッダーと行数を持つ", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll(".table-wrap table");
    expect(tables).toHaveLength(24);

    const tableConfigs = [
      {
            "headers": [
                  "#",
                  "要件",
                  "詳細"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "要件",
                  "内容"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "動詞の例",
                  "対応する認知レベルの目安"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "#",
                  "カテゴリ",
                  "サブカテゴリ",
                  "LO数"
            ],
            "rowCount": 6
      },
      {
            "headers": [
                  "Lean の原則",
                  "Scrum における対応"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "英語",
                  "日本語",
                  "頭文字"
            ],
            "rowCount": 7
      },
      {
            "headers": [
                  "ソフトウェア開発の7つのムダ",
                  "説明",
                  "元になった製造業のムダ"
            ],
            "rowCount": 7
      },
      {
            "headers": [
                  "Agile プラクティス",
                  "対応する Lean プラクティス",
                  "説明"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "手法",
                  "特徴"
            ],
            "rowCount": 4
      },
      {
            "headers": [
                  "技法",
                  "用途"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "概念",
                  "提唱者・出典",
                  "概要"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "モデル",
                  "提唱者",
                  "概要"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "技法",
                  "概要"
            ],
            "rowCount": 4
      },
      {
            "headers": [
                  "関係者",
                  "新チーム結成時の責任の例"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "Software Craftsmanship の価値観",
                  "Scrum チームでの適用例"
            ],
            "rowCount": 4
      },
      {
            "headers": [
                  "技法",
                  "提唱者",
                  "概要"
            ],
            "rowCount": 2
      },
      {
            "headers": [
                  "構造化の基準",
                  "説明"
            ],
            "rowCount": 4
      },
      {
            "headers": [
                  "アプローチ",
                  "提唱者/出典",
                  "特徴"
            ],
            "rowCount": 2
      },
      {
            "headers": [
                  "変更点",
                  "2017年版",
                  "2020年版"
            ],
            "rowCount": 4
      },
      {
            "headers": [
                  "フレームワーク",
                  "Product Owner のスケーリングパターン"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "技法",
                  "概要"
            ],
            "rowCount": 5
      },
      {
            "headers": [
                  "関わり方",
                  "特徴"
            ],
            "rowCount": 3
      },
      {
            "headers": [
                  "カテゴリ",
                  "重要なベストプラクティス"
            ],
            "rowCount": 8
      },
      {
            "headers": [
                  "誤解・アンチパターン",
                  "実際には"
            ],
            "rowCount": 6
      }
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
