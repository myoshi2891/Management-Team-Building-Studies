// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import Page from "~/pages/a-csm-advanced-certified-scrummaster-study-guide.vue";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({
  seoMeta: vi.fn(),
}));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Advanced Certified ScrumMaster (A-CSM) 学習ガイド",
] as const;

const EXPECTED_H2 = [
  "A-CSM とは何か — 資格の位置づけと要件",
  "Bloom's Taxonomy とラーニングオブジェクティブの読み方",
  "カテゴリー1 — Lean, Agile, and Scrum (LO 1.1–1.5)",
  "カテゴリー2-A — Scrum Master Core Competencies: Facilitation (LO 2.1–2.8)",
  "カテゴリー2-B — Scrum Master Core Competencies: Coaching and Training (LO 2.9–2.12)",
  "カテゴリー3-A — Service to the Scrum Team: Self-Management and Team Dynamics (LO 3.1–3.4)",
  "カテゴリー3-B — Service to the Scrum Team: Definition of Done and Development Practices (LO 3.5–3.8)",
  "カテゴリー4 — Service to the Product Owner (LO 4.1–4.4)",
  "カテゴリー5-A — Service to the Organization: 組織的障害 (LO 5.1–5.2)",
  "カテゴリー5-B — Service to the Organization: Scaling Scrum (LO 5.3–5.6)",
  "カテゴリー5-C — Service to the Organization: Organizational Change (LO 5.7–5.8)",
  "カテゴリー6-A — Scrum Mastery: Personal Development (LO 6.1–6.3)",
  "カテゴリー6-B — Scrum Mastery: Scrum Master as a True Leader (LO 6.4–6.5)",
  "ベストプラクティス総合チェックリスト",
  "よくある誤解とアンチパターン",
  "認定取得後のキャリアパス",
  "まとめ",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 初学者向け解説",
  "1.2 CSM → A-CSM → CSP-SM のキャリアパス",
  "1.3 認定取得の要件",
  "1.4 CSM と A-CSM の違い",
  "2.1 初学者向け解説",
  "2.2 LO 全体構成マップ",
  "LO 1.1: Scrum とアジャイルマニフェストの整合性を示す",
  "LO 1.2: Scrum とアジャイルの歴史的発展を概説する",
  "LO 1.3: Scrum 以外の Lean/Agile 開発アプローチの価値を説明する(最低2つ)",
  "LO 1.4: 優れた Scrum Master の性格特性を最低5つ挙げてランク付けする",
  "LO 1.5: 透明性・検査・適応が機能していない状況を3つ評価する",
  "LO 2.1: 発散的思考と収束的思考の兆候をそれぞれ最低3つ識別する",
  "LO 2.2: 複数の視点を統合する際の課題を最低3つ識別する",
  "LO 2.3: 効果的な会議・イベントのためのファシリテーティブ・リスニング技法を最低2つ適用する",
  "LO 2.4: オープンディスカッションの代替手法を最低2つ実演する",
  "LO 2.5: Scrum Master がファシリテーターとして振る舞うべきでない例を2つ説明する",
  "LO 2.6: 最低2つの協働イベントを設計・ファシリテートする",
  "LO 2.7: 明確なコミュニケーションの障害を解決する戦略を最低1つ選択する",
  "LO 2.8: 明確なコミュニケーションとチームワークを促進する作業合意 (Working Agreement) を作成する",
  "LO 2.9: コーチング・スタンスの要素を最低3つ説明する",
  "LO 2.10: 2つの介入 (Intervention) に対して適切なコーチング技法を適用する",
  "LO 2.11: 介入を分析し、最低2つの改善点を特定する",
  "LO 2.12: ビジネスステークホルダーに Scrum とそのメリットを説明する",
  "LO 3.1: 効果的な自己管理型チームの属性を最低3つ説明する",
  "LO 3.2: チームの自己管理能力を向上させる技法を適用する",
  "LO 3.3: チームとワーキンググループの違いを説明する",
  "LO 3.4: チーム形成・発展のための多段階モデルを最低1つ説明する",
  "LO 3.5: 強力な Definition of Done (DoD) の作成・改善をファシリテートする",
  "LO 3.6: 非ソフトウェア製品における Definition of Done の定式化方法を説明する",
  "LO 3.7: 開発プラクティスが Scrum Team の価値あるインクリメント提供能力に与える影響を最低2つ説明する",
  "LO 3.8: 複数チーム環境における開発プラクティスの有用性を説明する",
  "LO 4.1: プロダクトビジョンと Product Goal の関係を説明する",
  "LO 4.2: Scrum Team とステークホルダーとともに Product Goal を検討・改良する",
  "LO 4.3: Product Goal の達成を支える Product Backlog を作成する",
  "LO 4.4: Product Backlog のリファインメント (Refinement) の手法を最低1つ実践する",
  "LO 5.1: 組織的障害の根本原因を解決する実践を行う",
  "LO 5.2: 最新の Scrum の定義を採用した場合の影響を最低3つ議論する",
  "LO 5.3: Scrum をスケールするアプローチを最低2つ認識する",
  "LO 5.4: 組織がスケールしないことを選択する理由を最低2つ説明する",
  "LO 5.5: 依存関係を可視化・管理・削減する技法を最低2つ識別する",
  "LO 5.6: フィーチャーチームとコンポーネントチームの利点・欠点を最低3つずつ説明する",
  "LO 5.7: 複雑系の性質を説明する",
  "LO 5.8: 組織変革を促進するアプローチを最低2つ説明する",
  "LO 6.1: 自身の Scrum 価値基準の実践度を分析し、改善方法を検討する",
  "LO 6.2: 建設的な相互作用が破壊的な対立に転じる瞬間を認識する",
  "LO 6.3: 自分のデフォルトの対立対応パターンを他の選択肢と比較する",
  "LO 6.4: 効果的なリーダーの属性を最低3つ述べる",
  "LO 6.5: リーダーの属性を最低1つ以上実演する",
  "ファシリテーション",
  "コーチングとトレーニング",
  "チームへの奉仕",
  "プロダクトオーナーへの奉仕",
  "組織への奉仕",
  "自己研鑽とリーダーシップ",
  "16.1 CSP-SM への道",
  "16.2 資格の維持: Scrum Education Units (SEU)",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "what-is-acsm",
  "blooms-taxonomy",
  "lean-agile-scrum",
  "facilitation",
  "coaching-training",
  "self-management-team-dynamics",
  "definition-of-done",
  "service-to-product-owner",
  "organizational-impediments",
  "scaling-scrum",
  "organizational-change",
  "personal-development",
  "scrum-master-as-leader",
  "best-practices-checklist",
  "misconceptions-antipatterns",
  "career-path",
  "summary",
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
  "SECTION 17",
  "SECTION 18",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/principles.html",
  "https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/",
  "https://greenleaf.org/what-is-servant-leadership/",
  "https://iaf-world.org/the-iaf-core-competencies/",
  "https://infed.org/dir/welcome/bruce-w-tuckman-forming-storming-norming-and-performing-in-groups/",
  "https://kilmanndiagnostics.com/brief-overview-of-the-tki-assessment/",
  "https://less.works/less/framework",
  "https://less.works/less/principles",
  "https://scaledagileframework.com/",
  "https://scrumguides.org/scrum-guide.html",
  "https://support.scrumalliance.org/hc/en-us/articles/115001680252-How-do-I-earn-the-Advanced-Certified-ScrumMaster-A-CSM-or-Advanced-Certified-Scrum-Product-Owner-A-CSPO-certification",
  "https://teamtopologies.com/key-concepts",
  "https://thecynefin.co/about-us/about-cynefin-framework/",
  "https://www.designcouncil.org.uk/our-resources/the-double-diamond/",
  "https://www.kotterinc.com/methodology/8-steps/",
  "https://www.liberatingstructures.com/",
  "https://www.liberatingstructures.com/design-elements/",
  "https://www.scrum.org/resources/nexus-framework-scaling-scrum",
  "https://www.scrum.org/resources/nexus-guide",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/scrum-master-track",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/media/certifications/los/adv_csm_learning_objectives_2022.pdf",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 2,
  source: 45,
  practice: 32,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 2,
  },
  source: {
    "ソース": 45,
  },
  practice: {
    "ベストプラクティス": 32,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\n    A[\"CSM Certified ScrumMaster (Scrum Alliance / エントリーレベル)\"] -->|\"前提資格\"| B[\"A-CSM Advanced Certified ScrumMaster (中級レベル)\"]\n    P[\"PSM I / PSM II Professional Scrum Master (Scrum.org)\"] -.->|\"前提資格 代替\"| B\n    B --> C[\"CSP-SM Certified Scrum Professional ScrumMaster (上級レベル)\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class A,P box;\n    class B hub;\n    class C done;",
  "flowchart TD\n    R1[\"Scrum Alliance CSM 認定 または Scrum.org PSM I / PSM II を保有 (CSMは有効期限切れでも可)\"] --> R2[\"過去5年以内に Scrum Master実務経験12ヶ月\"]\n    R1 --> R3[\"承認されたA-CSMコース(最低16時間)を修了 (課題は受講前/受講後どちらでも可)\"]\n    R2 --> R4[\"A-CSMライセンス受諾+ メンバープロフィール完成\"]\n    R3 --> R4\n    R4 --> R5[\"A-CSM認定取得\"]\n    R5 --> R6[\"2年ごとに30 SEU取得+ 175米ドルの更新料で更新(標準ルート) 別の認定コース修了なら SEU・更新料なしで更新\"]",
  "flowchart TB\n    K[\"1. Knowledge (知識)\"] --> C[\"2. Comprehension (理解)\"]\n    C --> A[\"3. Application (応用)\"]\n    A --> An[\"4. Analysis (分析)\"]\n    An --> S[\"5. Synthesis (統合)\"]\n    S --> E[\"6. Evaluation (評価)\"]\n\n    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\n    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\n    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\n    class K,C box;\n    class A,An hub;\n    class S,E done;",
  "flowchart LR\n    A[\"1986年 Takeuchi & Nonaka 'The New New Product Development Game'\"] --> B[\"1993-95年 Sutherland & Schwaber Scrumの定式化\"]\n    B --> C[\"2001年 アジャイルマニフェスト策定 Scrum Alliance設立\"]\n    C --> D[\"2010年〜 Scrum Guide発行 (Schwaber & Sutherland)\"]\n    D --> E[\"2020年 Scrum Guide最新版\"]",
  "flowchart TD\n    T[\"透明性 Transparency\"] --> I[\"検査 Inspection\"]\n    I --> Ad[\"適応 Adaptation\"]\n    Ad -->|\"検査結果を反映\"| T\n\n    T2[\"透明性が崩れると...\"] -.->|\"不正確な情報に基づく検査\"| I2[\"誤った検査\"]\n    I2 -.->|\"誤った判断に基づく適応\"| Ad2[\"誤った適応\"]",
  "flowchart LR\n    P[\"課題の定義 Problem\"] --> D1[\"発散1 Discover (多様な視点を集める)\"]\n    D1 --> C1[\"収束1 Define (課題を絞り込む)\"]\n    C1 --> D2[\"発散2 Develop (解決策を広げる)\"]\n    D2 --> C2[\"収束2 Deliver (解決策を選ぶ)\"]",
  "flowchart TD\n    S1[\"個人 (1) 1分間で自分の考えを書く\"] --> S2[\"ペア (2) 2分間でペアと共有\"]\n    S2 --> S4[\"4人グループ (4) 4分間で統合\"]\n    S4 --> SA[\"全体 (All) グループごとに発表\"]",
  "flowchart TD\n    A[\"チームでブレインストーミング (困った経験・理想の働き方を出し合う)\"] --> B[\"グルーピングと優先順位付け (Dot Voting等)\"]\n    B --> C[\"合意文書として明文化\"]\n    C --> D[\"チームの見える場所に掲示\"]\n    D --> E[\"レトロスペクティブで 定期的に見直す\"]\n    E --> B",
  "flowchart TB\n    Found[\"土台: 倫理的実践 + コーチングマインドセット\"] --> Rel[\"関係構築: 合意形成 + 信頼と安全\"]\n    Rel --> Comm[\"効果的なコミュニケーション: プレゼンス + 積極的傾聴\"]\n    Comm --> Growth[\"学びと成長の促進: 気づきの喚起 + 成長支援\"]",
  "flowchart LR\n    G[\"Goal 目標を明確にする\"] --> R[\"Reality 現状を把握する\"]\n    R --> O[\"Options 選択肢を洗い出す\"]\n    O --> W[\"Will 意志・行動計画を決める\"]",
  "flowchart LR\n    L1[\"1. Tell 指示する\"] --> L2[\"2. Sell 説得する\"]\n    L2 --> L3[\"3. Consult 相談する\"]\n    L3 --> L4[\"4. Agree 合意する\"]\n    L4 --> L5[\"5. Advise 助言する\"]\n    L5 --> L6[\"6. Inquire 尋ねる\"]\n    L6 --> L7[\"7. Delegate 委任する\"]",
  "flowchart LR\n    F[\"Forming 形成期\"] --> S[\"Storming 混乱期\"]\n    S --> N[\"Norming 統一期\"]\n    N --> P[\"Performing 機能期\"]\n    P --> Ad[\"Adjourning 解散期\"]",
  "flowchart TD\n    A[\"現状のDoDを可視化する (暗黙的なものも含めて洗い出す)\"] --> B[\"'完成'にまつわる 過去のトラブル事例を出し合う\"]\n    B --> C[\"組織全体の品質基準 (あれば)を確認する\"]\n    C --> D[\"チームでDoDを 具体的な項目として明文化する\"]\n    D --> E[\"Sprint Reviewの場で ステークホルダーに共有する\"]\n    E --> F[\"レトロスペクティブで 継続的に見直し・強化する\"]\n    F --> D",
  "flowchart TD\n    V[\"Product Vision (長期的な目指す姿・数年単位)\"] --> G1[\"Product Goal 1 (数ヶ月単位のマイルストーン)\"]\n    G1 --> G2[\"Product Goal 2 (次のマイルストーン)\"]\n    G2 --> G3[\"Product Goal 3 ...\"]\n    G1 --> SG1[\"Sprint Goal (1スプリント単位)\"]",
  "flowchart LR\n    A[\"現状のProduct Goal候補を提示\"] --> B[\"ステークホルダーからの 市場・顧客インサイトを収集\"]\n    B --> C[\"Scrum Teamからの 技術的実現可能性の意見を収集\"]\n    C --> D[\"インパクトマッピング等で 選択肢を可視化\"]\n    D --> E[\"Product Ownerが 最終判断を下す\"]",
  "flowchart TD\n    P[\"問題: リリースまでに 常に3週間の承認待ちが発生する\"] --> W1[\"なぜ？ 複数部署の承認印が必要だから\"]\n    W1 --> W2[\"なぜ？ 過去にセキュリティ事故があり 承認プロセスが追加されたから\"]\n    W2 --> W3[\"なぜ？ その事故の再発防止策が プロセスの追加以外検討されなかったから\"]\n    W3 --> W4[\"なぜ？ 自動化されたセキュリティチェックの 仕組みが組織に存在しないから\"]\n    W4 --> R[\"根本原因: 自動セキュリティチェック基盤の不在\"]",
  "flowchart TB\n    subgraph Nexus[\"Nexus (Scrum.org)\"]\n        N1[\"単一Product Backlog\"]\n        N2[\"Nexus Integration Team\"]\n        N3[\"3〜9チーム規模を想定\"]\n    end\n    subgraph LeSS[\"LeSS (Larman & Vodde)\"]\n        L1[\"単一Product Backlog\"]\n        L2[\"単一Product Owner\"]\n        L3[\"2〜8チーム(Basic)/8チーム以上(Huge)\"]\n    end\n    subgraph SAFe[\"SAFe (Scaled Agile)\"]\n        SA1[\"Agile Release Train\"]\n        SA2[\"ポートフォリオ〜チームまでの 複数レベルの階層\"]\n        SA3[\"大規模組織全体を想定\"]\n    end",
  "flowchart LR\n    subgraph FT[\"フィーチャーチーム (Feature Team)\"]\n        F1[\"機能・顧客価値単位で編成\"]\n        F2[\"エンドツーエンドで 1つの機能を完成させる\"]\n    end\n    subgraph CT[\"コンポーネントチーム (Component Team)\"]\n        C1[\"技術コンポーネント単位で編成 (例: フロントエンド/バックエンド/DB)\"]\n        C2[\"特定レイヤーの専門性に特化\"]\n    end",
  "flowchart TB\n    subgraph Clear[\"明白 (Clear/Obvious)\"]\n        C1[\"因果関係が明確\"]\n        C2[\"対応: ベストプラクティスに従う\"]\n    end\n    subgraph Complicated[\"煩雑 (Complicated)\"]\n        Co1[\"因果関係はあるが専門知識が必要\"]\n        Co2[\"対応: グッドプラクティス/専門家分析\"]\n    end\n    subgraph Complex[\"複雑 (Complex)\"]\n        Cx1[\"因果関係は事後的にしか分からない\"]\n        Cx2[\"対応: 安全に失敗できる実験 (Probe-Sense-Respond)\"]\n    end\n    subgraph Chaotic[\"カオス的 (Chaotic)\"]\n        Ch1[\"因果関係が存在しないように見える\"]\n        Ch2[\"対応: まず行動して安定化させる (Act-Sense-Respond)\"]\n    end",
  "flowchart TD\n    S1[\"1. 危機意識を高める\"] --> S2[\"2. 変革推進チームを作る\"]\n    S2 --> S3[\"3. ビジョンと戦略を立てる\"]\n    S3 --> S4[\"4. 変革のビジョンを周知徹底する\"]\n    S4 --> S5[\"5. 従業員の自発を促す (障害物の除去)\"]\n    S5 --> S6[\"6. 短期的な成果を生み出す\"]\n    S6 --> S7[\"7. 成果を活かして さらなる変革を推進する\"]\n    S7 --> S8[\"8. 新しい方法を 組織文化に定着させる\"]",
  "flowchart TB\n    Conflict[\"対立が発生\"] --> Comp[\"競合 (Competing) 自己主張:高 協調性:低\"]\n    Conflict --> Collab[\"協働 (Collaborating) 自己主張:高 協調性:高\"]\n    Conflict --> Comprom[\"妥協 (Compromising) 自己主張:中 協調性:中\"]\n    Conflict --> Avoid[\"回避 (Avoiding) 自己主張:低 協調性:低\"]\n    Conflict --> Accom[\"受容 (Accommodating) 自己主張:低 協調性:高\"]",
  "flowchart TB\n    Center[\"真のリーダーとしての Scrum Master\"] --> A1[\"奉仕への意志 (Servant First)\"]\n    Center --> A2[\"他者の成長への コミットメント\"]\n    Center --> A3[\"先見性 (Foresight)\"]\n    Center --> A4[\"説得力 (Persuasion, 権威ではなく)\"]\n    Center --> A5[\"コミュニティ意識の 醸成\"]",
  "flowchart LR\n    A[\"A-CSM取得\"] --> B[\"実務経験の蓄積+ SEU(Scrum Education Units)の取得\"]\n    B --> C[\"CSP-SM Certified Scrum Professional ScrumMaster\"]\n    C --> D[\"トレーナー/コーチとしての道 (CTC, CEC等)\"]"
] as const;

defineSourceParityContract({
  suiteName: "pages/a-csm-advanced-certified-scrummaster-study-guide.vue",
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
  seoTitleFragments: ["A-CSM", "Advanced Certified ScrumMaster", "学習ガイド"],
  seoTitle: "Advanced Certified ScrumMaster (A-CSM) 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  seoDescription: "Scrum Alliance公式のA-CSM Learning Objectivesに基づき、全42のラーニングオブジェクティブを初学者向けに解説する完全ガイド。ファシリテーション・コーチング・スケーリングのベストプラクティスと一次情報源リンク付き。",
});

describe("pages/a-csm-advanced-certified-scrummaster-study-guide.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.find("[data-testid='sidebar-toggle']");
    if (toggle.exists()) {
      expect(toggle.attributes("aria-expanded")).toBe("false");
      await toggle.trigger("click");
      expect(toggle.attributes("aria-expanded")).toBe("true");
    }
  });

  it("インライン SVG seal が存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("svg.seal").length).toBe(1);
  });
});
