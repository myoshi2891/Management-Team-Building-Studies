// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Scrum Professional® - Product Owner (CSP®-PO) 完全学習ガイド"
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "CSP-POとは何か(概要とProduct Owner Trackにおける位置づけ)",
  "CSP-PO取得要件",
  "Bloom's Taxonomyと学習目標の読み方",
  "カテゴリー1-A: 高度なステークホルダー対話 (Advanced Stakeholder Discussion)",
  "カテゴリー1-B: 新しいスクラムチームの立ち上げ (Launching Scrum Teams)",
  "カテゴリー1-C: 複数チームにおけるプロダクトオーナーシップ (Product Ownership with Multiple Teams)",
  "カテゴリー2-A: 市場駆動型プロダクト戦略 (Market-Driven Product Strategy Practices)",
  "カテゴリー2-B: 複雑なプロダクト計画とフォーキャスティング (Complex Product Planning and Forecasting)",
  "カテゴリー2-C: プロダクトエコノミクス (Product Economics)",
  "カテゴリー3: 顧客・ユーザーとの高度なインタラクション (Advanced Interactions with Customers and Users)",
  "カテゴリー4: 複雑なプロダクト仮説検証 (Complex Product Assumption Validation)",
  "カテゴリー5: 高度なプロダクトバックログマネジメント (Advanced Product Backlog Management)",
  "ベストプラクティス総合チェックリスト",
  "よくある誤解とアンチパターン",
  "認定後のキャリアパスと更新",
  "まとめ",
  "参考文献・出典一覧"
] as const;

const EXPECTED_H3 = [
  "対象読者",
  "このガイドの作り方",
  "表記について",
  "1.1 CSP-POの定義",
  "1.2 Product Owner Trackにおける位置づけ",
  "1.3 学べること(公式の学習領域)",
  "1.4 なぜこのレベルの認定が必要なのか",
  "2.1 公式要件の全体像",
  "2.2 認定後の維持(概要)",
  "2.3 A-CSPOやCSPOとの要件比較",
  "3.1 なぜBloom's Taxonomyが使われるのか",
  "3.2 6段階の意味",
  "3.3 CSP-POの学習目標がなぜ「上位レベル」中心なのか",
  "4.1 LO1.1: 組織的コンテキストがPO選定に与える影響を査定する",
  "4.2 LO1.2: 対立するステークホルダーのファシリテーションセッションを評価する",
  "4.3 LO1.3: ステークホルダー情報の収集・伝達・活用技術を比較する",
  "4.4 LO1.4: Scrumの最新の定義の採用がステークホルダー関係やプロダクトにどう役立つかを評価する",
  "5.1 LO1.5: 新しいスクラムチームの立ち上げが従来のプロジェクトキックオフと異なるべき理由を3つ以上説明する",
  "5.2 LO1.6: チーム結成時の品質期待値を定義するPOの責任について議論する",
  "5.3 LO1.7: 新しいスクラムチームの立ち上げを計画する",
  "6.1 LO1.8: 複数のスクラムチームにまたがるプロダクトバックログマネジメントの手法を最低2つ実演する",
  "6.2 LO1.9: プロダクトオーナー役割をスケールするパターンを最低2つ対比する",
  "6.3 LO1.10: プロダクトオーナーシップに関連するトピックを開発し、教える",
  "7.1 LO2.1: プロダクトのためのビジネスモデルを最低3つ比較対照する",
  "7.2 LO2.2: プロダクトアイデアのためのビジネスモデルを開発する",
  "7.3 LO2.3: 競合分析を構築する",
  "8.1 LO2.4: プロダクト計画・フォーキャストを開発するための技術を最低2つ比較する",
  "8.2 LO2.5: ビジネスモデルに適したリリース戦略を開発する",
  "8.3 LO2.6: 計測可能なプロダクトローンチゴールを最低3つ特定する",
  "8.4 LO2.7: プロダクトローンチ計画の要素を最低5つ特定する",
  "9.1 LO2.8: プロダクトの収益性を判断する方法を最低2つ適用する",
  "9.2 LO2.9: 固定費・変動費・予測リターンに基づいて、プロダクトリリースの期待される成果や経済的結果を計算する",
  "9.3 LO2.10: プロダクト開発のための反復的・漸進的な投資モデルを説明する",
  "9.4 LO2.11: 投資対効果(ROI)を改善する方法を最低3つ実演する",
  "9.5 LO2.12: プロダクトフィーチャーのCost of Delayを計算する",
  "9.6 LO2.13: アジャイルプロダクト開発に資金を提供するアプローチを最低2つ比較する",
  "10.1 LO3.1: 顧客リサーチをプロダクトディスカバリーと開発に統合する計画を準備する",
  "10.2 LO3.2: 顧客リサーチまたはプロダクトディスカバリーの技術を最低3つ評価する",
  "11.1 LO4.1: 仮説を検証するための適切な実験を選択する",
  "11.2 LO4.2: 実験の結果とインパクトを評価する",
  "12.1 LO5.1: スクラムチームや組織がアウトプットよりもアウトカムとインパクトを重視しているかどうかを査定する",
  "12.2 LO5.2: プロダクトバックログを並び替える技術を最低3つ比較する",
  "12.3 LO5.3: 1人以上のステークホルダーに対してプロダクトバックログの並び順を擁護する",
  "12.4 LO5.4: 自分のスクラムチームのプロダクトバックログをリファインメントする能力を評価する",
  "13.1 ステークホルダー・チームマネジメント",
  "13.2 戦略・計画",
  "13.3 プロダクトエコノミクス",
  "13.4 顧客理解と仮説検証",
  "13.5 プロダクトバックログマネジメント",
  "15.1 CSP-PO取得後に開けるキャリアパス",
  "15.2 CSP-PO取得のその他のメリット",
  "15.3 更新(Renewal)の仕組み",
  "15.4 Scrum Education Units(SEU)の稼ぎ方",
  "引用文献一覧"
] as const;

const EXPECTED_H4 = [] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\nA[\"CSPO 基礎\"] --> B[\"A-CSPO 応用\"]\nB --> C[\"CSP-PO プロフェッショナル\"]\nC --> D[\"CST・CEC・CTCへの道\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,D box;\nclass C hub;",
  "flowchart TD\nA[\"A-CSPO認定を保有\"] --> B[\"CSP-PO認定教育プログラムを受講\"]\nB --> C[\"事前課題・事後課題を含む全コンポーネントを完了\"]\nC --> D[\"CSP-PO License Agreementに同意しメンバープロフィールを完成\"]\nD --> E[\"過去5年以内にPOとして24ヶ月以上の実務経験を証明\"]\nE --> F[\"CSP-PO認定取得\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E box;\nclass F done;",
  "flowchart BT\nK[\"知識 Knowledge\"] --> C[\"理解 Comprehension\"]\nC --> A[\"応用 Application\"]\nA --> AN[\"分析 Analysis\"]\nAN --> S[\"統合 Synthesis\"]\nS --> E[\"評価 Evaluation\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass K hub;\nclass C,A,AN,S box;\nclass E done;",
  "flowchart LR\nA[\"Forming 形成期\"] --> B[\"Storming 混乱期\"]\nB --> C[\"Norming 統一期\"]\nC --> D[\"Performing 機能期\"]\nD --> E[\"Adjourning 解散期\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,E box;\nclass D done;",
  "flowchart TD\nA[\"単一プロダクト、複数チーム\"] --> B{\"チームの独立性・規模\"}\nB -- \"少数のチームが密接に連携\" --> C[\"Nexus型 単一PO + Nexus統合チーム\"]\nB -- \"多数の独立性が高いチーム\" --> D[\"階層型 チーフPO + エリアPO\"]\nC --> E[\"単一のプロダクトバックログをクロスチームで共有\"]\nD --> E\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D box;\nclass E done;",
  "flowchart TD\nCS[\"顧客セグメント\"] --> VP[\"価値提案\"]\nCH[\"チャネル\"] --> VP\nCR[\"顧客との関係\"] --> VP\nVP --> RS[\"収益の流れ\"]\nKA[\"主要活動\"] --> VP\nKR[\"主要リソース\"] --> VP\nKP[\"主要パートナー\"] --> VP\nVP --> COST[\"コスト構造\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass CS,CH,CR,KA,KR,KP box;\nclass VP hub;\nclass RS,COST done;",
  "flowchart TD\nF[\"業界内の競争\"]\nA[\"新規参入の脅威\"] --> F\nB[\"代替品・代替サービスの脅威\"] --> F\nC[\"供給者の交渉力\"] --> F\nD[\"買い手・顧客の交渉力\"] --> F\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D box;\nclass F hub;",
  "flowchart TD\nA[\"プロダクトゴールを明確化\"] --> B[\"ビジネスモデルの特性を考慮\"]\nB --> C[\"段階的リリース フィーチャーを順次追加\"]\nB --> D[\"日付固定リリース タイムボックス型\"]\nB --> E[\"スコープ固定リリース MVP確定型\"]\nC --> F[\"リリース戦略を確定\"]\nD --> F\nE --> F\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E box;\nclass F done;",
  "flowchart LR\nA[\"仮説\"] --> B[\"構築 Build\"]\nB --> C[\"計測 Measure\"]\nC --> D[\"学習 Learn\"]\nD --> A\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D box;",
  "flowchart TD\nA[\"ビジネス価値を見積もる\"] --> D[\"Cost of Delayを算出\"]\nB[\"時間的緊急性を見積もる\"] --> D\nC[\"リスク低減・機会実現価値を見積もる\"] --> D\nD --> E[\"月または週あたりの金額として表現\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C box;\nclass D hub;\nclass E done;",
  "flowchart TD\nO[\"望ましいアウトカム\"] --> OP1[\"顧客の機会1\"]\nO --> OP2[\"顧客の機会2\"]\nOP1 --> S1[\"解決策の案A\"]\nOP1 --> S2[\"解決策の案B\"]\nS1 --> T1[\"アサンプションテスト\"]\nS2 --> T2[\"アサンプションテスト\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass O hub;\nclass OP1,OP2,S1,S2 box;\nclass T1,T2 done;",
  "flowchart TD\nA[\"リスクの高いアサンプションを特定\"] --> B[\"検証可能な仮説として記述\"]\nB --> C[\"最小限の実験を設計\"]\nC --> D[\"実験を実行\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C box;\nclass D done;",
  "flowchart TD\nD[\"実験を実行\"] --> E[\"結果を測定・評価\"]\nE --> F{\"仮説は支持されたか\"}\nF -- \"Yes\" --> G[\"確信を持って前進 persevere\"]\nF -- \"No\" --> H[\"方向転換 pivot しプロダクトバックログを更新\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass D hub;\nclass E,F box;\nclass G,H done;",
  "flowchart LR\nA[\"アウトプット 出荷した機能の数\"] --> B[\"アウトカム 顧客行動の変化\"]\nB --> C[\"インパクト ビジネス・組織への効果\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B box;\nclass C done;",
  "flowchart TD\nA[\"プロダクトバックログの並び替え技術\"] --> B[\"価値ベース Kanoモデル\"]\nA --> C[\"緊急度ベース WSJFとCD3\"]\nA --> D[\"MoSCoW法\"]\nA --> E[\"学習価値優先 リスクの高い仮説から着手\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E box;",
  "flowchart TD\nA[\"ビジネス価値\"] --> D[\"Cost of Delay\"]\nB[\"時間的緊急性\"] --> D\nC[\"リスク低減・機会実現価値\"] --> D\nD --> E[\"Duration 所要期間で除算\"]\nE --> F[\"WSJF・CD3スコア\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C box;\nclass D hub;\nclass E box;\nclass F done;",
  "flowchart LR\nA[\"CSP-PO取得\"] --> B[\"Certified Scrum Trainer CST\"]\nA --> C[\"Certified Enterprise Coach CEC\"]\nA --> D[\"Certified Team Coach CTC\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D done;",
  "flowchart LR\nA[\"CSP-PO取得\"] --> B[\"2年間の実務・学習活動\"]\nB --> C[\"40 SEUを蓄積\"]\nC --> D[\"更新申請フォームを提出\"]\nD --> E[\"更新料$250を支払い\"]\nE --> F[\"CSP-PO更新完了\"]\nF --> B\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E box;\nclass F done;",
  "flowchart TD\nA[\"1. Product Owner Core Competencies コアコンピテンシー\"] --> F[\"CSP-PO\"]\nB[\"2. Implementing Goal Setting and Planning ゴール設定と計画\"] --> F\nC[\"3. Advanced Interactions with Customers and Users 顧客・ユーザーとの高度なインタラクション\"] --> F\nD[\"4. Complex Product Assumption Validation 複雑なプロダクト仮説検証\"] --> F\nE[\"5. Advanced Product Backlog Management 高度なプロダクトバックログマネジメント\"] --> F\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E box;\nclass F hub;"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner",
  "https://www.scrumalliance.org/media/certifications/los/csp_po_learning_objectives_2022.pdf",
  "https://scrumguides.org/scrum-guide.html",
  "https://agilemanifesto.org/",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner",
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner",
  "https://resources.scrumalliance.org/article/youre-asked-product-owner-multiple-teams",
  "https://www.scrum.org/resources/online-nexus-guide",
  "https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development",
  "https://www.mindtools.com/abyj5fi/forming-storming-norming-and-performing/",
  "https://www.strategyzer.com/library/the-business-model-canvas",
  "https://en.wikipedia.org/wiki/Porter%27s_five_forces_analysis",
  "https://blackswanfarming.com/cost-of-delay/",
  "https://blackswanfarming.com/wsjf-weighted-shortest-job-first/",
  "https://theleanstartup.com/principles",
  "https://www.producttalk.org/opportunity-solution-trees/",
  "https://en.wikipedia.org/wiki/Kano_model",
  "https://www.scrumalliance.org/member-benefits/comparative-agility",
  "https://www.comparativeagility.com/",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://www.scrumalliance.org/get-certified/renewing-certifications",
  "https://www.scrumalliance.org/get-certified/trainers",
  "https://www.scrumalliance.org/agile-coaching/cec",
  "https://www.scrumalliance.org/agile-coaching/ctc",
  "https://resources.scrumalliance.org/article/product-roadmaps-secret-weapon-success"
] as const;

const EXPECTED_TOC_IDS = [
  "about-guide",
  "what-is-csppo",
  "requirements",
  "blooms-taxonomy",
  "stakeholder-discussion",
  "launching-teams",
  "multiple-team-ownership",
  "market-driven-strategy",
  "planning-forecasting",
  "product-economics",
  "customer-interactions",
  "assumption-validation",
  "backlog-management",
  "best-practices-checklist",
  "misconceptions",
  "career-renewal",
  "summary",
  "references"
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 00",
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
  "SECTION 17"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 41,
  practice: 35,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 41,
  },
  practice: {
    "ベストプラクティス": 35,
  },
} as const;

defineSourceParityContract({
  page: Page,
  suiteName: "pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue",
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
    "CSP-PO",
    "Certified Scrum Professional",
    "Product Owner",
    "完全ガイド",
  ],
  seoTitle: "CSP-PO® (Certified Scrum Professional - Product Owner) 認定資格 完全ガイド | Scrum Alliance公式学習目標を徹底解説",
  seoDescription:
    "Scrum Alliance公式のCSP-PO Learning Objectives(2022年1月版)に基づく、5カテゴリー31項目の完全解説。初学者向けのステップバイステップの進め方とベストプラクティス、一次情報源URLを掲載。",
});

describe("pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue — テーブル構造契約", () => {
  it("テーブルが原本と同じ件数（31件）存在し、すべて .table-wrap で包まれている", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(31);
    for (const table of tables) {
      expect(table.element.closest(".table-wrap")).not.toBeNull();
    }
  });

  it("テーブル行の総数が原本と一致する（157行）", async () => {
    const { mountSuspended } = await import("@nuxt/test-utils/runtime");
    const wrapper = await mountSuspended(Page);
    const rows = wrapper.findAll("table tr");
    expect(rows).toHaveLength(157);
  });
});
