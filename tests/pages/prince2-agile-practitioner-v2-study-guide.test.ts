// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/prince2-agile-practitioner-v2-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "PRINCE2 Agile Practitioner (Version 2) 初学者向け完全学習ガイド"
] as const;

const EXPECTED_H2 = [
  "0. このガイドの使い方(最初に必ず読む)",
  "1. 試験の全体像",
  "2. 学習ロードマップ",
  "3. Key concepts",
  "4. PRINCE2 Agile の practices と roles",
  "5. PRINCE2 Agile の processes と workshops",
  "6. より広い文脈での適用",
  "7. 試験対策: オープンブックを最大限に活かす",
  "8. 演習: シナリオ形式の練習問題(オリジナル)",
  "9. 用語集(英日対訳)",
  "10. 参考資料・根拠ソース(URL)",
  "付録 A: シラバス対応表(学習成果 → 本ガイド → 公式ブック)",
  "付録 B: 【要照合】項目チェックリスト(公式ブックで必ず確認)",
  "付録 C: 最終チェックリスト(試験前日)"
] as const;

const EXPECTED_H3 = [
  "0.1 このガイドの位置づけ",
  "0.2 情報の確度を示す凡例",
  "0.3 各項目の解説フォーマット",
  "1.1 試験概要 【シラバス】",
  "1.2 出題配分 【シラバス】",
  "1.3 Foundation との違い(何が「上がる」のか)",
  "1.4 試験構造のマインドマップ",
  "2.1 推奨ステップ",
  "2.2 4 週間学習プラン(例)",
  "2.3 前提知識チェック(自己診断)",
  "3.1 Agile とアジャイルマインドセット(シラバス 1.1)",
  "3.2 Agile mindset と Agile Onion(シラバス 1.1.3 / 公式ブック 2.6, 2.6.1, 2.6.2)",
  "3.3 Agile の主要アプローチ(Foundation 1.1.10 の復習)",
  "3.4 PRINCE2 Project Management の基礎(シラバス 1.4.1 / 公式ブック 5.2〜5.4)",
  "3.5 7 aspects of project performance と \"fix and flex\"(シラバス 1.2.2 / 公式ブック 3.3)",
  "3.6 Agile transformation の主要概念(シラバス 1.2.3 / 公式ブック 2.7)",
  "3.7 People と Organizational Change Management(OCM)(シラバス 1.3.1〜1.3.5 / 公式ブック 第 4 章)",
  "4.1 practice を「適用・分析」するための共通の型",
  "4.2 Business case practice(シラバス 2.1.2 / 2.1.3 / 公式ブック 第 6 章)",
  "4.3 Organization practice(シラバス 2.1.4 / 2.1.5 / 公式ブック 第 7 章)",
  "4.4 Plans practice(シラバス 2.1.6 / 2.1.7 / 公式ブック 第 8 章)",
  "4.5 Quality practice(シラバス 2.1.8 / 2.1.9 / 公式ブック 第 9 章)",
  "4.6 Risk practice(シラバス 2.1.10 / 2.1.11 / 公式ブック 第 10 章)",
  "4.7 Issues practice(シラバス 2.1.12 / 2.1.13 / 公式ブック 第 11 章)",
  "4.8 Progress practice(シラバス 2.1.14 / 2.1.15 / 公式ブック 第 12 章)",
  "4.9 PRINCE2 Agile の 11 roles(シラバス 2.2.1 / 公式ブック Table 7.2, Table B.1)",
  "5.1 processes の全体像",
  "5.2 Starting up a project(SU)(公式ブック 13.2)",
  "5.3 Directing a project(DP)(公式ブック 13.3)",
  "5.4 Initiating a project(IP)(公式ブック 13.4)",
  "5.5 Controlling a stage(CS)(公式ブック 13.5)",
  "5.6 Managing product delivery(MP)(公式ブック 13.6)",
  "5.7 Managing a stage boundary(SB)(公式ブック 13.7)",
  "5.8 Closing a project(CP)(公式ブック 13.8)",
  "5.9 process 別 まとめ表(試験直前の確認用)",
  "6.1 プロジェクトとプロダクトの違い",
  "6.2 Agile product management への適用(シラバス 4.1.1 / 公式ブック 14.2.2.1)",
  "6.3 プロジェクトから運用への移行(シラバス 4.1.2 / 公式ブック 14.2.1)",
  "6.4 継続的な agile development and operations(シラバス 4.1.3 / 公式ブック 14.2.2.2)",
  "6.5 AI による PRINCE2 Agile の支援(シラバス 4.2.1 / 公式ブック 15.4)",
  "7.1 「暗記」より「索引」を作る",
  "7.2 時間配分",
  "7.3 シナリオ問題の読み方(ステップ)",
  "7.4 設問タイプ別の攻略",
  "7.5 BL4(分析)問題の判断基準",
  "7.6 頻出する誤答パターン",
  "7.7 よくある混同(用語の整理)",
  "8.1 プロジェクトシナリオ",
  "8.2 追加情報(人物)",
  "8.3 設問",
  "8.4 解答と解説",
  "8.5 自己採点の目安"
] as const;

const EXPECTED_H4 = [
  "3.1.1 一言でいうと",
  "3.1.2 ステップバイステップ解説",
  "3.1.4 よくある落とし穴",
  "3.2.1 一言でいうと",
  "3.2.2 5 つの層 【シラバス(Foundation 1.1.7)】",
  "3.2.3 Agile mindset の主要な特徴(1.1.3 b / 公式ブック 2.6.2)",
  "3.2.4 ステップバイステップ: Onion を実務で使う(BL3 の練習)",
  "3.2.5 ベストプラクティス / 落とし穴 / 試験ポイント",
  "3.4.1 5 つの統合要素 【シラバス(Foundation 1.2.3)】",
  "3.4.2 7 principles と Agile 文脈での読み替え(1.2.1 / 公式ブック 5.6.1)",
  "3.4.3 7 practices(一覧) 【シラバス】",
  "3.4.4 7 processes(一覧)",
  "3.5.1 一言でいうと",
  "3.5.2 7 aspects と Agile での典型的な扱い",
  "3.5.3 tolerance を階層で考える",
  "3.5.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "3.6.1 Agile transformation plan(2.7.1)",
  "3.6.2 Agile maturity(2.7.3)",
  "3.6.3 Psychological safety(2.7.4)",
  "3.6.4 Agile sustainability(2.7.5)",
  "3.7.1 OCM の全体像",
  "3.7.2 OCM ステップバイステップ【一般知識】",
  "3.7.3 文化とアジャイル(4.2.3)",
  "3.7.4 組織横断のチームを導く(4.3)とチーム構築(4.5)【一般知識 + 【要照合】】",
  "3.7.5 チーム内コミュニケーション(4.4)",
  "3.7.6 試験ポイント(カテゴリ 1 全体)",
  "BL4「fit for purpose か？」の判断フロー",
  "4.2.1 一言でいうと",
  "4.2.2 ステップバイステップ解説",
  "4.2.3 推奨される management products / artifacts 【シラバス 2.1.2 a / 公式ブック 6.3.2】",
  "4.2.4 関連する agile artifacts / techniques 【シラバス 2.1.2 c / 公式ブック 6.4】",
  "4.2.6 よくある落とし穴",
  "4.2.7 試験ポイント",
  "4.3.1 一言でいうと",
  "4.3.2 ステップバイステップ解説",
  "4.3.3 推奨される management products / artifacts 【シラバス 2.1.4 a / 公式ブック 7.3.2】",
  "4.3.4 関連する agile artifacts / techniques 【一般知識・【要照合】7.4】",
  "4.3.6 よくある落とし穴",
  "4.3.7 試験ポイント",
  "4.4.1 一言でいうと",
  "4.4.2 計画の階層(粗い → 詳細)",
  "4.4.3 ステップバイステップ解説",
  "4.4.4 推奨される management products / artifacts 【シラバス 2.1.6 a / 公式ブック 8.3.2】",
  "4.4.5 関連する agile artifacts / techniques 【シラバス 2.1.6 c / 公式ブック 8.4】",
  "4.4.7 よくある落とし穴",
  "4.4.8 試験ポイント",
  "4.5.1 一言でいうと",
  "4.5.2 ステップバイステップ解説",
  "4.5.3 DoR と DoD の違い(頻出)【シラバス(Foundation 1.1.11 / 9.3.2.1, 9.3.2.2)】",
  "4.5.4 推奨される management products / artifacts / techniques 【シラバス 2.1.8 a / 公式ブック 9.3.2】",
  "4.5.5 関連する agile techniques 【シラバス 2.1.8 c / 公式ブック 9.4、一般知識】",
  "4.5.7 よくある落とし穴",
  "4.5.8 試験ポイント",
  "4.6.1 一言でいうと",
  "4.6.2 ステップバイステップ解説",
  "4.6.3 Agilometer とは 【シラバス 2.1.10 a / 公式ブック 10.3.2】",
  "4.6.4 推奨される management products / artifacts 【シラバス 2.1.10 a】",
  "4.6.5 リスクへの対応(一般知識)",
  "4.6.6 ベストプラクティス / 落とし穴 / 試験ポイント",
  "4.7.1 一言でいうと",
  "4.7.2 ステップバイステップ解説",
  "4.7.3 推奨される management products / artifacts 【シラバス 2.1.12 a / 公式ブック 11.3.4】",
  "4.7.4 関連する agile techniques 【一般知識・【要照合】11.4】",
  "4.7.6 よくある落とし穴",
  "4.7.7 試験ポイント",
  "4.8.1 一言でいうと",
  "4.8.2 ステップバイステップ解説",
  "4.8.3 推奨される management products / artifacts 【シラバス 2.1.14 a / 公式ブック 12.3.2】",
  "4.8.4 Burn charts(シラバス Foundation 1.1.11 / 12.4.3)",
  "4.8.5 関連する agile techniques 【一般知識・【要照合】12.4】",
  "4.8.6 tolerance と exception(進捗の統制)",
  "4.8.8 よくある落とし穴",
  "4.8.9 試験ポイント",
  "4.9.1 一言でいうと",
  "4.9.2 11 roles 一覧 【シラバス】と役割の要点【一般知識・【要照合】】",
  "4.9.3 役割の関係図",
  "4.9.4 「誰が何を決めるか」早見表(シナリオ問題の判断に)",
  "4.9.6 よくある落とし穴",
  "4.9.7 試験ポイント(BL3)",
  "5.1.1 7 processes と流れ",
  "5.1.2 stage と timebox の関係(Agile の核心)",
  "5.1.3 tailoring を評価する共通チェックリスト(BL4 用)",
  "5.2.1 一言でいうと",
  "5.2.2 ステップバイステップ【一般知識・【要照合】13.2.x】",
  "5.2.3 Agile での tailoring",
  "5.2.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.3.1 一言でいうと",
  "5.3.2 ステップバイステップ【一般知識・【要照合】13.3.x】",
  "5.3.3 Agile での tailoring",
  "5.3.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.4.1 一言でいうと",
  "5.4.2 ステップバイステップ【一般知識・【要照合】13.4.x】",
  "5.4.3 Agile での tailoring",
  "5.4.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.5.1 一言でいうと",
  "5.5.2 ステップバイステップ【一般知識・【要照合】13.5.x】",
  "5.5.3 Agile での tailoring",
  "5.5.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.6.1 一言でいうと",
  "5.6.2 ステップバイステップ【一般知識・【要照合】13.6.x】",
  "5.6.3 Agile での tailoring",
  "5.6.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.7.1 一言でいうと",
  "5.7.2 ステップバイステップ【一般知識・【要照合】13.7.x】",
  "5.7.3 Agile での tailoring",
  "5.7.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "5.8.1 一言でいうと",
  "5.8.2 ステップバイステップ【一般知識・【要照合】13.8.x】",
  "5.8.3 Agile での tailoring",
  "5.8.4 ベストプラクティス / 落とし穴 / 試験ポイント",
  "6.5.1 practice 別の支援例",
  "6.5.2 AI 活用のベストプラクティス",
  "6.5.3 試験ポイント(BL2)",
  "10.1 一次資料(PeopleCert 公式)",
  "10.2 二次資料(公式トレーニング提供者等)",
  "10.3 一般資料(補足・理解の助け)"
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use",
  "exam-overview",
  "study-roadmap",
  "key-concepts",
  "practices-roles",
  "processes",
  "wider-context",
  "exam-strategy",
  "practice-questions",
  "glossary",
  "references",
  "appendix-a",
  "appendix-b",
  "appendix-c"
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
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-practitioner-4076",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-practitioner-4076",
  "https://peoplecert.jp/doc/PRINCE2_Agile_PRT_Syllabus_EN_v2_0.pdf",
  "https://peoplecert.jp/doc/PRINCE2_Agile_FND_Syllabus_EN_v2_0.pdf",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074",
  "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28",
  "https://www.peoplecert.org/Frameworks-Professionals/PRINCE2-Agile-Framework",
  "https://www.amazon.co.uk/PRINCE2%C2%AE-Agile-Version-Official-Book/dp/9925349400",
  "https://www.ilxgroup.com/usa/blog/prince2-agile-version-2-whats-changed",
  "https://www.ilxgroup.com/usa/blog/the-agile-onion-building-agile-behaviours-with-prince2-agile",
  "https://www.ilxgroup.com/usa/training/prince2-agile/practitioner",
  "https://www.prince2.com/usa/blog/aligning-prince2-agile-version-2-with-prince2-7-prince2",
  "https://www.prince2.com/usa/blog/from-doing-agile-to-being-agile-building-an-agile-mindset-with-prince2-agile-version-2",
  "https://en.serview.de/detail/prince2-agile-version-2-was-ist-neu-und-was-bleibt",
  "https://www.learningtree.com/blog/prince2-agile-key-updates/",
  "https://www.itsmhub.com/products/prince2-agile-practitioner-version-2-course-examination",
  "https://www.whatisprince2.net/agile/prince2-agile-practitioner",
  "https://agilemanifesto.org/",
  "https://scrumguides.org/",
  "https://kanbanguides.org/",
  "http://theleanstartup.com/",
  "https://rework.withgoogle.com/en/guides/understanding-team-effectiveness",
  "https://www.kotterinc.com/methodology/8-steps/",
  "https://www.prosci.com/methodology/adkar"
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 32,
  practice: 8,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    補足: 32,
  },
  practice: {
    ベストプラクティス: 8,
  },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "mindmap\n  root((PRINCE2 Agile Practitioner v2))\n    カテゴリ1 Key concepts 20 percent\n      Agile と mindset\n      Agile Onion\n      7 aspects of project performance\n      Agile transformation\n      People と OCM\n      Team leadership と communication\n    カテゴリ2 Practices と Roles 44 percent\n      Business case\n      Organization\n      Plans\n      Quality\n      Risk\n      Issues\n      Progress\n      11 roles\n    カテゴリ3 Processes 30 percent\n      Starting up\n      Directing\n      Initiating\n      Controlling a stage\n      Managing product delivery\n      Managing a stage boundary\n      Closing\n    カテゴリ4 Wider context 6 percent\n      Agile product management\n      Transition to operations\n      Continuous development and operations\n      AI support",
  "flowchart LR\nA[\"Step 1 試験の型と 配点を知る\"] --> B[\"Step 2 Key concepts Onion と 7 aspects\"]\nB --> C[\"Step 3 7 Practices と 11 Roles\"]\nC --> D[\"Step 4 7 Processes と Workshops\"]\nD --> E[\"Step 5 Wider context と AI\"]\nE --> F[\"Step 6 演習 と ブック索引作り\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E,F box;",
  "flowchart LR\nM[\"Mindset 考え方\"] --> V[\"Values 価値観\"]\nV --> PR[\"Principles 原則\"]\nPR --> PA[\"Practices 実践\"]\nPA --> PO[\"Processes プロセス\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass M,V,PR,PA,PO box;",
  "flowchart TB\nP[\"PRINCE2 Project Management\"] --> A[\"Principles 原則\"]\nP --> B[\"People 人\"]\nP --> C[\"Practices 実践\"]\nP --> D[\"Processes プロセス\"]\nP --> E[\"Project context プロジェクトの文脈\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E box;\nclass P hub;",
  "flowchart TB\nCORP[\"Corporate / Programme Project tolerance を設定\"] --> BOARD[\"Project Board Stage tolerance を設定\"]\nBOARD --> PM[\"Project Manager Work package tolerance を設定\"]\nPM --> TEAM[\"Team Timebox 内で自己管理\"]\nTEAM -.->|\"tolerance 超過の恐れ\"| PM\nPM -.->|\"exception report\"| BOARD\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass CORP,BOARD,PM,TEAM box;",
  "flowchart LR\nA[\"Agile transformation plan 2.7.1\"] --> B[\"Agile maturity 2.7.3\"]\nB --> C[\"Psychological safety 2.7.4\"]\nC --> D[\"Agile sustainability 2.7.5\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D box;",
  "flowchart LR\nV[\"ビジョンと目的 を明確化\"] --> AS[\"現状と成熟度 を評価\"]\nAS --> PL[\"変革計画を 作成\"]\nPL --> PI[\"小さく試行 パイロット\"]\nPI --> LE[\"学びを 振り返る\"]\nLE --> SC[\"範囲を 拡大\"]\nSC --> SU[\"定着 持続化\"]\nSU -.->|\"再評価\"| AS\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass V,AS,PL,PI,LE,SC,SU box;",
  "flowchart TB\nL[\"Leaders 環境づくりと障害除去\"] --> T1[\"Team A\"]\nL --> T2[\"Team B\"]\nL --> T3[\"Team C\"]\nT1 <-->|\"依存関係の同期\"| T2\nT2 <-->|\"依存関係の同期\"| T3\nT1 --> G[\"共通のゴールと product vision\"]\nT2 --> G\nT3 --> G\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass L,T1,T2,T3,G box;",
  "flowchart TD\nS[\"シナリオの状況を把握 制約 成熟度 契約 規制\"] --> Q1{\"目的 purpose を果たしているか\"}\nQ1 -- \"No\" --> X1[\"不適切 目的を損なう tailoring\"]\nQ1 -- \"Yes\" --> Q2{\"PRINCE2 Agile の guidance に沿うか\"}\nQ2 -- \"No\" --> X2[\"不適切 guidance と矛盾\"]\nQ2 -- \"Yes\" --> Q3{\"必要な management products が機能するか\"}\nQ3 -- \"No\" --> X3[\"不足 統制や記録が欠落\"]\nQ3 -- \"Yes\" --> Q4{\"文脈に合っているか 過剰 過少でない\"}\nQ4 -- \"No\" --> X4[\"不適合 軽すぎる または 重すぎる\"]\nQ4 -- \"Yes\" --> OK[\"有効 fit for purpose\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass S,Q1,X1,Q2,X2,Q3,X3,Q4,X4 box;\nclass OK done;",
  "flowchart TB\nPB[\"Project Board Executive CPO Senior supplier\"] --> PMGR[\"Project Manager\"]\nPB -.-> PA[\"Project Assurance\"]\nPMGR --> PS[\"Project Support\"]\nAC[\"Agile coach\"] -.-> PMGR\nPMGR --> TEAMA[\"Team A PO Team coach Developers Testers\"]\nPMGR --> TEAMB[\"Team B PO Team coach Developers Testers\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass PB,PMGR,PA,PS,AC,TEAMA,TEAMB box;",
  "flowchart TB\nA[\"Project plan / Release map 全体の見通し 粗い\"] --> B[\"Stage plan stage 内の見通し\"]\nB --> C[\"Team plan iteration ごとの計画 詳細\"]\nC --> D[\"Work package description チームへの委任内容\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D box;",
  "flowchart LR\nBL[\"Product backlog の項目\"] --> DR{\"Definition of Ready 着手できる状態か\"}\nDR -- \"Yes\" --> WK[\"チームが作業\"]\nDR -- \"No\" --> RF[\"Refinement で明確化\"]\nRF --> DR\nWK --> DD{\"Definition of Done 完成の条件を満たすか\"}\nDD -- \"Yes\" --> INC[\"完成 リリース可能な増分\"]\nDD -- \"No\" --> WK\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass BL,DR,WK,RF,DD box;\nclass INC done;",
  "flowchart LR\nA[\"Agilometer で 現状を評価\"] --> B[\"リスクが高い 領域を特定\"]\nB --> C[\"対応策を検討 tailoring や risk register へ\"]\nC --> D[\"定期的に再評価 stage 境界など\"]\nD -.->|\"状況の変化\"| A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D box;",
  "flowchart TD\nI[\"Issue が発生 変更要求 問題 懸念\"] --> R[\"Issue register に記録\"]\nR --> E{\"Tolerance の 範囲内か\"}\nE -- \"範囲内\" --> L[\"チーム 現場で解決 例 backlog の優先順位調整\"]\nE -- \"範囲を超える\" --> P[\"Issue report を作成 PM に escalate\"]\nP --> B[\"Project Board が判断\"]\nL --> LL[\"Lessons log に学びを記録\"]\nB --> LL\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass I,R,E,L,P,B,LL box;",
  "flowchart TB\nsubgraph DIR[\"Direction Project Board\"]\nPE[\"Project executive\"]\nCPO[\"Chief product owner\"]\nSS[\"Senior supplier\"]\nend\nsubgraph MGT[\"Management\"]\nPM[\"Project manager\"]\nPSUP[\"Project support\"]\nend\nsubgraph DEL[\"Delivery Team\"]\nPO[\"Product owner\"]\nTC[\"Team coach\"]\nDEV[\"Developer\"]\nTST[\"Tester\"]\nend\nPA[\"Project assurance\"]\nAC[\"Agile coach\"]\nDIR --> PM\nPM --> PSUP\nPM --> DEL\nPA -.-> DIR\nAC -.-> PM\nAC -.-> TC\nCPO --- PO\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass PE,CPO,SS,PM,PSUP,PO,TC,DEV,TST,PA,AC box;",
  "flowchart TB\nSU[\"Starting up a project SU\"] --> IP[\"Initiating a project IP\"]\nIP --> CS[\"Controlling a stage CS\"]\nCS <--> MP[\"Managing product delivery MP\"]\nCS --> SB[\"Managing a stage boundary SB\"]\nSB --> CS\nCS --> CP[\"Closing a project CP\"]\nDP[\"Directing a project DP 全体を通じた Board の判断\"] -.-> SU\nDP -.-> IP\nDP -.-> CS\nDP -.-> SB\nDP -.-> CP\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass SU,IP,CS,MP,SB,CP,DP box;",
  "flowchart TB\nPRJ[\"Project\"] --> ST1[\"Stage 1 管理上の判断単位\"]\nPRJ --> ST2[\"Stage 2\"]\nST1 --> R1[\"Release 1\"]\nST1 --> R2[\"Release 2\"]\nR1 --> IT1[\"Iteration 1 timebox\"]\nR1 --> IT2[\"Iteration 2 timebox\"]\nR2 --> IT3[\"Iteration 3 timebox\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass PRJ,ST1,ST2,R1,R2,IT1,IT2,IT3 box;",
  "flowchart LR\nP[\"Project 増分を開発\"] --> R[\"Release 段階的な引き渡し\"]\nR --> O[\"Operations 運用 サポート 保守\"]\nO -.->|\"利用データ 障害 要望\"| B[\"Product backlog へフィードバック\"]\nB --> P\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass P,R,O,B box;",
  "flowchart LR\nA[\"AI が案を生成\"] --> B[\"人がレビュー 正確性 偏り 機密\"]\nB --> C{\"DoD と 受入基準を満たすか\"}\nC -- \"Yes\" --> D[\"採用 記録\"]\nC -- \"No\" --> E[\"修正 または 却下\"]\nE --> A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,E box;\nclass D done;",
  "flowchart TD\nA[\"シナリオを通読 制約 契約 期限 体制 成熟度\"] --> B[\"設問を読む 何を問われているか BL2 BL3 BL4\"]\nB --> C[\"追加情報が必要か 人物の役割と発言\"]\nC --> D[\"該当する practice または process を特定\"]\nD --> E[\"公式ブックで guidance を確認\"]\nE --> F[\"選択肢を消去 目的 guidance 文脈に反するものを除外\"]\nF --> G[\"最適な 1 つを選ぶ\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E,F box;\nclass G done;"
] as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  mountPage,
  pagePath: "app/pages/prince2-agile-practitioner-v2-study-guide.vue",
  suiteName: "pages/prince2-agile-practitioner-v2-study-guide.vue",
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  tocIds: EXPECTED_TOC_IDS,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  seoMetaSpy: seoMeta,
  navBrandSubtitle: "Practitioner (Version 2)",
});

describe("pages/prince2-agile-practitioner-v2-study-guide.vue (固有契約)", () => {
  it("Hero の lede テキストが原本と一致する", () => {
    const wrapper = mountPage();
    const lede = wrapper.get(".hero-lede");
    expect(lede.text()).toContain("PeopleCert PRINCE2® Agile Practitioner (Version 2)");
    expect(lede.text()).toContain("初学者〜中級者");
  });

  it("4つの stat-card が正しい数値とラベルで描画される", () => {
    const wrapper = mountPage();
    const stats = wrapper.findAll(".stat-card");
    expect(stats).toHaveLength(4);
    expect(stats[0].get(".stat-number").text()).toBe("50問");
    expect(stats[0].get(".stat-label").text()).toBe("各 1 点・誤答による減点なし");
    expect(stats[1].get(".stat-number").text()).toBe("30点");
    expect(stats[1].get(".stat-label").text()).toBe("合格点(60%)");
    expect(stats[2].get(".stat-number").text()).toBe("150分");
    expect(stats[2].get(".stat-label").text()).toBe("オープンブック(公式ブックのみ持ち込み可)");
    expect(stats[3].get(".stat-number").text()).toBe("44%");
    expect(stats[3].get(".stat-label").text()).toBe("practices と roles の配点(最重要カテゴリ)");
  });

  it("68個のテーブルがすべて table-wrap で包まれ描画される", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(68);
    const wraps = wrapper.findAll(".table-wrap table");
    expect(wraps).toHaveLength(68);
  });

  it("免責事項ボックス (disclaimer-box) が正しく描画される", () => {
    const wrapper = mountPage();
    const disclaimer = wrapper.get(".disclaimer-box");
    expect(disclaimer.text()).toContain("免責: 本ガイドは学習支援を目的とした独自の解説です");
    expect(disclaimer.get("a").attributes("href")).toBe(
      "https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-practitioner-4076",
    );
  });

  it("商標・免責フッターが存在する", () => {
    const wrapper = mountPage();
    const footer = wrapper.get("footer");
    expect(footer.text()).toContain("PRINCE2® および PRINCE2 Agile® は PeopleCert の登録商標です。");
  });
});
