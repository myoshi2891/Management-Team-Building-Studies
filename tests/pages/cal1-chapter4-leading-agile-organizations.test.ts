// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal1-chapter4-leading-agile-organizations.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "第4章: Leading Agile Organizations(アジャイル組織のリード)",
] as const;

const EXPECTED_H2 = [
  "この章について",
  "組織アジリティ(Organizational Agility)とは何か",
  "システム思考で組織をとらえる: Cynefin フレームワーク",
  "組織文化を理解し、意図的に進化させる",
  "組織構造とチームトポロジーをデザインする",
  "変革をリードする: チェンジマネジメントの実践知",
  "アジャイルのスケーリング: フレームワーク選択の考え方",
  "学習する組織へ: 心理的安全性と学習文化を組織全体に広げる",
  "組織アジリティを測定する",
  "リーダーとしての実践: エンタープライズでのロールモデリング",
  "まとめ: CAL 1 全体像の振り返り",
  "参考文献・出典一覧",
] as const;

const EXPECTED_H3 = [
  "本章で学ぶこと(ステップ一覧)",
  "定義: チームのアジャイルと組織のアジャイルは別物",
  "SAFe における Organizational Agility の3つの側面",
  "なぜシステム思考が必要か",
  "Cynefin フレームワーク: 問題の性質を見極める",
  "文化とは何か: Edgar Schein の3つのレベル",
  "組織進化の1つの見方: Laloux の発展段階モデル",
  "Conway の法則: 組織構造はシステムの設計に反映される",
  "Team Topologies: 4つのチームタイプと3つのインタラクションモード",
  "Spotify モデルに関する補足",
  "なぜ変革は失敗しやすいのか",
  "Kotter の8ステップ・プロセス",
  "補完的なモデル: ADKAR と McKinsey 7S",
  "スケーリングとは何か、何でないか",
  "チームの心理的安全性から組織の学習文化へ",
  "組織スケールでのふりかえりと「非難のない」文化",
  "アウトプットではなくアウトカムを測る",
  "リーダーの行動そのものが最強の「アーティファクト」",
  "コントローラーではなく、システムの設計者として",
] as const;

const EXPECTED_H4 = [
  "公式コース情報",
  "組織アジリティ / Business Agility",
  "システム思考 / Cynefin",
  "組織文化",
  "組織構造 / チームトポロジー",
  "チェンジマネジメント",
  "スケーリングフレームワーク",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
C1["第1章 The Case for Agile Leadership"]
C2["第2章 Agile Leadership in Action"]
C3["第3章 Leading Agile Teams"]
C4["第4章 Leading Agile Organizations"]
C1 --> C2 --> C3 --> C4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C1,C2,C3 box;
class C4 hub;`,
  `flowchart TB
OA["組織アジリティ Organizational Agility"]
D1["Lean-Thinking People and Agile Teams リーンな人材とアジャイルチーム"]
D2["Lean Business Operations リーンなビジネスオペレーション"]
D3["Strategy Agility 戦略のアジリティ"]
OUT["ビジネスアジリティ 市場の変化に俊敏に対応できる組織"]
OA --> D1
OA --> D2
OA --> D3
D1 --> OUT
D2 --> OUT
D3 --> OUT
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class D1,D2,D3 box;
class OA hub;
class OUT done;`,
  `flowchart TB
START["状況を見極める"]
S1["Clear・Simple 単純 因果関係が明白"]
S2["Complicated 煩雑 因果関係は分析すれば分かる"]
S3["Complex 複雑 因果関係は事後にしか分からない"]
S4["Chaotic カオス 因果関係が存在しない、緊急事態"]
S5["Disorder 混沌 どの領域か判断がつかない状態"]
R1["Sense→Categorize→Respond 把握し分類し対応する ベストプラクティスを適用"]
R2["Sense→Analyze→Respond 把握し分析し対応する 専門家に相談しグッドプラクティスを適用"]
R3["Probe→Sense→Respond 小さく試し、結果を見て、対応する 安全に失敗できる実験を行う"]
R4["Act→Sense→Respond まず行動し、把握し、対応する 混乱を止め、秩序を取り戻す"]
START --> S1 --> R1
START --> S2 --> R2
START --> S3 --> R3
START --> S4 --> R4
START --> S5
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,R1,R2,R3,R4 box;
class START hub;
class S5 done;`,
  `flowchart TB
A["Level 1 Artifacts 人工物 目に見えるもの オフィスのレイアウト、服装規定、使われている言葉、儀式や慣習"]
V["Level 2 Espoused Values 標榜される価値観 公式に語られるもの ミッション、行動指針、会議で語られる理想"]
U["Level 3 Basic Underlying Assumptions 根底にある前提 無意識で当たり前とされているもの 本当は何が評価され、何がタブーとされているか"]
A -->|"観察できるが解釈は難しい"| V
V -->|"言葉と実際の行動が一致しているとは限らない"| U
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class V hub;
class U done;`,
  `flowchart TB
subgraph TEAMS["4つの基本チームタイプ"]
direction TB
SA["Stream-aligned Team 特定の価値の流れ プロダクト・サービスを エンドツーエンドで担当する"]
PT["Platform Team 他チームが使う セルフサービス基盤を提供する"]
ET["Enabling Team 専門知識のギャップを埋め、他チームの自律性を高める"]
CS["Complicated-Subsystem Team 高度な専門性が必要な サブシステムを担当する"]
end
SA -.->|"Collaboration 短期集中で協働する"| PT
SA -.->|"X-as-a-Service サービスとして利用する"| PT
ET -.->|"Facilitating コーチング・支援を行う"| SA
SA -.->|"X-as-a-Service サービスとして利用する"| CS
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PT,ET,CS box;
class SA hub;`,
  `flowchart TB
K1["1. 危機意識を高める Create a Sense of Urgency"]
K2["2. 変革を推進する連帯チームを作る Build a Guiding Coalition"]
K3["3. ビジョンと戦略を立てる Form a Vision and Strategy"]
K4["4. 変革のビジョンを周知徹底する Communicate the Vision"]
K5["5. 行動しやすい環境を整える Empower Broad-based Action"]
K6["6. 短期的な成果を生む Generate Short-term Wins"]
K7["7. 成果を活かし、さらなる変革を推進する Sustain Acceleration"]
K8["8. 新しい文化を根づかせる Institutionalize Change into the Culture"]
K1 --> K2 --> K3 --> K4 --> K5 --> K6 --> K7 --> K8
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class K1,K2,K3,K4,K5,K6,K7 box;
class K8 done;`,
  `flowchart TB
Q1{"本当に今、スケーリングが必要か チーム数・依存関係の実態は"}
Q2{"チームの成熟度は スケーリングに耐えられるか 基本のアジャイル・スクラムが チーム内で機能しているか"}
Q3{"どのくらいの規模で、どんな種類の依存関係が存在するか"}
R1["まずはチーム内の基礎を固める"]
R2["軽量な調整の仕組み Scrum of Scrums 等から始める"]
R3["文脈に合わせてフレームワークを選択・組み合わせる"]
Q1 -->|"必要性が不明確"| R1
Q1 -->|"必要性が明確"| Q2
Q2 -->|"未成熟"| R1
Q2 -->|"成熟している"| Q3
Q3 --> R2
Q3 --> R3
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Q2,Q3 box;
class Q1 hub;
class R1,R2,R3 done;`,
  `flowchart TB
ST["Systems Thinking システム思考 統合の要となる第5の規律"]
PM["Personal Mastery 自己マスタリー"]
MM["Mental Models メンタルモデル"]
SV["Shared Vision 共有ビジョン"]
TL["Team Learning チーム学習"]
PM --> ST
MM --> ST
SV --> ST
TL --> ST
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class PM,MM,SV,TL box;
class ST hub;`,
  `flowchart LR
B["リーダーの行動 発言・意思決定・評価"]
O["観察される 組織メンバーによる観察"]
N["規範の形成 「ここではこうするものだ」という暗黙のルールが生まれる"]
C["文化として定着 Basic Underlying Assumption 化"]
B --> O --> N --> C
C -.->|"次の行動の基準になる"| B
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class O,N box;
class B hub;
class C done;`,
  `flowchart TB
subgraph CH1["第1章 The Case for Agile Leadership"]
direction TB
c1["なぜ今アジャイルリーダーシップが必要とされるのか"]
end
subgraph CH2["第2章 Agile Leadership in Action"]
direction TB
c2["アジャイルリーダーとしてのマインドセットと行動"]
end
subgraph CH3["第3章 Leading Agile Teams"]
direction TB
c3["1つのチームを機能させるサーバントリーダーシップ・心理的安全性"]
end
subgraph CH4["第4章 Leading Agile Organizations"]
direction TB
c4["組織全体というシステムをアジャイルにリードする"]
end
CH1 --> CH2 --> CH3 --> CH4
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class CH1,CH2,CH3 box;
class CH4 hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view",
  "https://agilemanifesto.org/",
  "https://framework.scaledagile.com/organizational-agility",
  "https://businessagility.institute/domains/overview",
  "https://cio-wiki.org/wiki/Business_Agility",
  "https://hbr.org/2007/11/a-leaders-framework-for-decision-making",
  "https://infed.org/dir/welcome/peter-senge-and-the-learning-organization/",
  "https://mitsloan.mit.edu/ideas-made-to-matter/5-enduring-management-ideas-mit-sloans-edgar-schein",
  "https://www.reinventingorganizations.com/",
  "https://www.melconway.com/Home/Conways_Law.html",
  "https://teamtopologies.com/key-concepts",
  "https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1",
  "https://www.kotterinc.com/methodology/8-steps/",
  "https://www.prosci.com/methodology/adkar",
  "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-7-s-framework",
  "https://less.works/less/framework",
  "https://www.scrum.org/resources/online-nexus-guide",
  "https://www.businesswire.com/news/home/20231207870163/en",
] as const;

const EXPECTED_TOC_IDS = [
  "chapter-intro",
  "what-is-organizational-agility",
  "systems-thinking-cynefin",
  "organizational-culture",
  "team-topologies",
  "change-management",
  "scaling-agile",
  "learning-organization",
  "measuring-agility",
  "leader-role-modeling",
  "summary",
  "references",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS: Readonly<Record<string, number>> = {
  note: 6,
  source: 9,
  practice: 7,
};

const EXPECTED_CALLOUT_LABELS: Readonly<Record<string, Readonly<Record<string, number>>>> = {
  note: {
    補足: 6,
  },
  source: {
    ソース: 9,
  },
  practice: {
    ベストプラクティス: 7,
  },
};

const EXPECTED_SEO_TITLE =
  "CAL 1™ 学習ガイド 第4章 Leading Agile Organizations(アジャイル組織のリード) | 非公式解説";
const EXPECTED_SEO_DESCRIPTION =
  "Scrum Alliance Certified Agile Leader® 1(CAL 1™)の学習領域「Leading Agile Organizations」を初学者向けに解説する非公式ガイド。組織アジリティ、Cynefin、組織文化、Team Topologies、チェンジマネジメント、スケーリングを網羅。";

defineSourceParityContract({
  suiteName: "pages/cal1-chapter4-leading-agile-organizations.vue",
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
  stepTags: [],
  seoTitleFragments: ["CAL 1™", "第4章", "Leading Agile Organizations"],
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});

describe("pages/cal1-chapter4-leading-agile-organizations.vue — 個別要素の契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローの統計バッジが正しく表示される", () => {
    const wrapper = mountPage();
    const statCards = wrapper.findAll(".stat-card");
    expect(statCards).toHaveLength(4);
    expect(statCards.map((c) => c.text())).toEqual([
      "4/4CAL 1学習領域のうち最終章",
      "12セクション構成",
      "10Mermaid 図解",
      "19参考文献リンク",
    ]);
  });
});
