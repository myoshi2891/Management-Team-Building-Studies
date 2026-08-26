// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal1-certified-agile-leader-1-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Certified Agile Leader® 1 (CAL 1™) 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "CAL 1とは何か(概要)",
  "資格制度における位置づけ",
  "認定取得までの4ステップ",
  "学習内容: 4つの学習目標領域",
  "コース構成: Day1 / Day2 の流れ",
  "受講対象者とレディネスチェック",
  "CAL 1 と CAL 2 の比較",
  "講師・トレーニングパートナーの品質基準",
  "資格更新(Renewal)とSEU",
  "初学者向け学習ロードマップ",
  "よくある誤解(FAQ)",
  "全体ベストプラクティスまとめ表",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "基本情報一覧",
  "旧プログラムとの対応関係",
  "各ステップの詳細",
  "4.1 The Case for Agile Leadership(アジャイルリーダーシップの必要性を理解する)",
  "4.2 Agile Leadership in Action(実践におけるアジャイルリーダーシップ)",
  "4.3 Leading Agile Teams(アジャイルチームをリードする)",
  "4.4 Leading Agile Organizations(アジャイル組織をリードする)",
  "想定される受講対象者 [1]",
  "受講前レディネスチェック",
  "SEUの基本的な考え方 [27]",
  "CAL 1 の更新要件",
  "更新の2つの経路",
  "公式(Scrum Alliance)",
  "認定トレーニングパートナー・報道発表",
  "基礎資料(受講前に読むことが推奨される一次資料)",
  "このガイドの取り扱いに関する注記",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
    M["事前推奨知識(Agile Manifestoの理解)"] --> C1["CAL 1(前提条件なし)"]
    C1 --> C2["CAL 2(CAL1取得が前提条件)"]
    C1 --> R1["資格更新(2年ごとにSEU取得)"]
    C2 --> R2["資格更新(2年ごとにSEU取得)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class M,R1,R2 box;
class C1,C2 hub;`,
  `flowchart TD
    S1["Step1: コースを探す(認定トレーナーによるCAL1講座を検索)"] --> S2["Step2: 受講する(対面 または ライブオンラインで参加)"]
    S2 --> S3["Step3: コース要件を満たす(出席・積極的参加)"]
    S3 --> S4["Step4: 認定を取得(デジタルバッジが発行される)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3 box;
class S4 done;`,
  `flowchart TD
    P1["1.The Case for Agile Leadership(アジャイルリーダーシップの必要性)"] --> P2["2.Agile Leadership in Action(実践におけるリーダーシップ)"]
    P2 --> P3["3.Leading Agile Teams(アジャイルチームのリード)"]
    P3 --> P4["4.Leading Agile Organizations(アジャイル組織のリード)"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P1,P2,P3,P4 box;`,
  `flowchart LR
    subgraph Day1["Day1: 自己内省とリーダーとしての在り方"]
        D1a["価値観・信念の探求"] --> D1b["自分のリーダーシップスタイルの認識"]
        D1b --> D1c["チームをエンパワーするスキルの習得"]
    end
    subgraph Day2["Day2: チームと組織のリード"]
        D2a["ハイパフォーマンスチームの構築"] --> D2b["アジャイルに適合する文化の探求"]
        D2b --> D2c["組織のプロセス・ガバナンスの適応"]
        D2c --> D2d["チェンジモデルとアジャイル変革"]
    end
    Day1 --> Day2

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class D1a,D1b,D1c,D2a,D2b,D2c,D2d box;`,
  `flowchart LR
    C1["CAL 1: 基礎・必要性の理解"] -->|"前提資格として取得"| C2["CAL 2: 実践・組織戦略への応用"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class C1 box;
class C2 hub;`,
  `flowchart TD
    A["CAL1取得"] --> B["2年間の有効期間"]
    B --> C["経路1(通常更新): 学習活動を通じてSEUを蓄積"]
    C --> D["会員ダッシュボードでSEUを記録"]
    D --> E["更新申請 + 更新手数料の支払い"]
    E --> F["資格更新完了(再び2年間有効)"]
    B --> G["経路2: 別のScrum Alliance認定コースを修了"]
    G --> H["SEU提出・更新手数料なしで自動更新"]
    H --> F

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E,G,H box;
class F done;`,
  `flowchart TD
    Pre["受講前準備"] --> Pre1["Agile Manifestoを読む"]
    Pre --> Pre2["自組織のリーダーシップ課題を言語化しておく"]
    Pre1 --> During["受講中(Day1-Day2, 合計16時間)"]
    Pre2 --> During
    During --> Post["受講後の実践"]
    Post --> Post1["職場で新しいリーダーシップスタイルを小さく試す"]
    Post --> Post2["学習活動を記録しSEUとして蓄積する"]
    Post --> Post3["準備が整えばCAL2でさらに深化させる"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class Pre,Pre1,Pre2,During,Post,Post1,Post2,Post3 box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://www.scrumalliance.org/get-certified/agile-leadership/cal-certification",
  "https://www.scrumalliance.org/get-certified/agile-leader-track",
  "https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://scrumalliance.smapply.io/prog/certified_agile_leader_cal_trainer/",
  "https://www.scrumalliance.org/about/we-are-scrum-alliance",
  "https://www.pm-partners.com.au/course/certified-agile-leader/",
  "https://tryscrum.com/certifications/agile/scrum/leadership/certified-agile-leadership-i/",
  "https://www.knowledgehut.com/agile-management/certified-agile-leadership-cal-1-training",
  "https://www.evolveagility.com/services-agile-training/certified-agile-leader-2/",
  "https://www.prnewswire.com/news-releases/scrum-alliance-launches-updated-certified-agile-leader-track-to-elevate-leadership-skills-302212940.html",
  "https://sanfranciscobs.com/p/40-scrum-alliance-seu-program",
  "https://agilemanifesto.org/",
  "https://scrumguides.org/",
] as const;

const mountPage = createMountPage(Page);

describe("pages/cal1-certified-agile-leader-1-guide.vue — 原本照合契約", () => {
  defineSourceParityContract({
    mountPage,
    expectedH1: EXPECTED_H1,
    expectedH2: EXPECTED_H2,
    expectedH3: EXPECTED_H3,
    expectedH4: EXPECTED_H4,
    expectedH5: EXPECTED_H5,
    expectedH6: EXPECTED_H6,
    expectedMermaidSources: EXPECTED_MERMAID_SOURCES,
    expectedExternalUrls: EXPECTED_EXTERNAL_URLS,
    seoTitle: "CAL 1® 認定資格 完全ガイド | Certified Agile Leader 1 とは",
    seoDescription: "Scrum Alliance Certified Agile Leader 1 (CAL 1) の公式情報にもとづく、初学者向けの学習ガイド。4つの学習目標領域、認定取得の流れ、資格更新(SEU)の仕組みをMermaid図解と出典付きで解説。",
    calloutTotal: 4,
    calloutCounts: { note: 4 },
    calloutLabels: ["補足", "補足", "補足", "補足"],
    expectedSectionEyebrowCount: 13,
    expectedTableCount: 18,
    expectedTableRowCount: 98,
    getSeoMetaCalls: () => seoMeta.mock.calls,
  });

  it("各セクションのアイブロウラベルが順序込みで一致する", () => {
    const wrapper = mountPage();
    const eyebrows = wrapper.findAll(".section-eyebrow").map((el) => el.text());
    expect(eyebrows).toEqual([
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
    ]);
  });
});
