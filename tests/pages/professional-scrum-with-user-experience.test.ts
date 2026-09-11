// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-with-user-experience.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum™ with User Experience(PSU I) 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この試験について",
  "第1章: Understanding and Applying the Scrum Framework(Scrumフレームワークの理解と適用)",
  "第2章: Developing People and Teams(人とチームの成長)",
  "第3章: Managing Products with Agility(アジリティを持ったプロダクトマネジメント)",
  "第4章: Complementary Practices - Lean UX Practices & Techniques",
  "第5章: SprintサイクルへのUX統合実践(まとめ)",
  "模擬問題で理解度チェック",
  "学習の進め方(おすすめステップ)",
  "参考文献・情報源一覧",
] as const;

const EXPECTED_H3 = [
  "試験概要",
  "出題範囲(Focus Areas)",
  "全体マップ",
  "1.1 経験主義(Empiricism)とScrumの理論",
  "1.2 Scrumの価値基準(Scrum Values)",
  "1.3 Scrum TeamとUXの位置づけ",
  "1.4 Scrumのイベント(Events)",
  "1.5 Scrumの作成物(Artifacts)とコミットメント",
  "1.6 完成の定義(Definition of Done)とUX",
  "2.1 自己管理型・機能横断型チーム(Self-Managing Cross-Functional Teams - Including UX)",
  "3.1 プロダクトの価値(Product Value): アウトプットからアウトカムへ",
  "3.2 UXを踏まえたプロダクトバックログ管理(Product Backlog Management with UX)",
  "3.3 ステークホルダーと顧客(Stakeholders & Customers)",
  "3.4 UXを踏まえたワークマネジメント(Work Management with UX): Dual-Track Agile",
  "4.1 Lean UXの基本思想",
  "4.2 Lean UX Canvas",
  "4.3 MVPと実験(MVP & Experiments)",
  "4.4 継続的ディスカバリー(Continuous Discovery Habits)",
  "4.5 デザインスプリント(Design Sprint)",
  "4.6 ユーザビリティテスト(Usability Testing)",
  "4.7 その他の関連ツール(補足)",
  "統合の要点まとめ表",
  "Scrum.org 公式",
  "Scrum Guide",
  "Lean UX / 書籍",
  "Continuous Discovery / Dual-Track Agile",
  "ユーザビリティテスト",
  "受験体験記(参考・非公式)",
] as const;

const EXPECTED_H4 = [] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "exam-overview",
  "scrum-framework",
  "people-and-teams",
  "product-agility",
  "lean-ux-practices",
  "sprint-integration",
  "practice-questions",
  "study-plan",
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
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 18,
  practice: 11,
  note: 4,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    "ソース": 18,
  },
  practice: {
    "ベストプラクティス": 11,
  },
  note: {
    "補足": 3,
    "補足: 仮説(Hypothesis)の書き方テンプレート": 1,
  },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-scrum-user-experience-certification",
  "https://www.scrum.org/assessments/professional-scrum-user-experience-certification",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-user-experience",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.ideaplan.io/guides/dual-track-agile-guide",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://www.producttalk.org/continuous-discovery-habits/",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.productboard.com/glossary/dual-track-agile/",
  "https://www.senseandrespond.co/blog/dual-track-agile",
  "https://www.scrum.org/courses/professional-scrum-user-experience-training",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://medium.com/10x-curiosity/lean-ux-a-summary-from-the-ground-floor-bc195341dbea",
  "https://creately.com/guides/lean-ux-canvas/",
  "https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide",
  "https://www.producttalk.org/continuous-discovery-habits/",
  "https://greatquestion.co/blog/continuous-discovery-habits",
  "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
  "https://www.nngroup.com/articles/how-many-test-users/",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://www.scrum.org/assessments/professional-scrum-user-experience-certification",
  "https://www.scrum.org/resources/suggested-reading-professional-scrum-user-experience",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://www.scrum.org/courses/professional-scrum-user-experience-training",
  "https://www.scrum.org/resources/scrumorg-launches-professional-scrum-user-experience-psu-training-course",
  "https://www.scrum.org/resources/blog/three-wait-four-elements-empiricism",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
  "https://www.oreilly.com/library/view/lean-ux/9781449366834/ch07.html",
  "https://creately.com/guides/lean-ux-canvas/",
  "https://www.senseandrespond.co/blog/lean-ux-canvas-workshop-guide",
  "https://www.producttalk.org/continuous-discovery-habits/",
  "https://greatquestion.co/blog/continuous-discovery-habits",
  "https://www.productboard.com/glossary/dual-track-agile/",
  "https://www.senseandrespond.co/blog/dual-track-agile",
  "https://www.ideaplan.io/guides/dual-track-agile-guide",
  "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
  "https://www.nngroup.com/articles/how-many-test-users/",
  "https://medium.com/serious-scrum/passing-the-psu-i-assessment-with-100-a-retrospective-97c5f34cb831",
  "https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-with-user-experience-i-psu-i-assessment/",
  "https://www.scrum.org/assessments/professional-scrum-user-experience-certification",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
ROOT["Professional Scrum with User Experience (PSU I)"]
subgraph A["Understanding and Applying the Scrum Framework"]
A1["Empiricism"]
A2["Scrum Values"]
A3["Scrum Team"]
A4["Events"]
A5["Artifacts"]
A6["Done"]
end
subgraph B["Developing People and Teams"]
B1["Self-Managing Cross-Functional Teams including UX"]
end
subgraph C["Managing Products with Agility"]
C1["Product Value"]
C2["Product Backlog Management"]
C3["Stakeholders and Customers"]
C4["Work Management with UX"]
end
subgraph D["Complementary Practices"]
D1["Lean UX Practices and Techniques"]
end
ROOT --> A
ROOT --> B
ROOT --> C
ROOT --> D
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class ROOT hub;`,
  `flowchart LR
T["透明性 Transparency 作業とその進捗が関係者全員に見える"]
I["検査 Inspection 作業成果物と進捗を頻繁かつ注意深く検査する"]
AD["適応 Adaptation 逸脱を検知したらプロセスや対象を調整する"]
T --> I
I --> AD
AD --> T`,
  `flowchart TB
SP["Sprint Planning Product Backlogを検査しSprint BacklogとSprint Goalを適応させる"]
DS["Daily Scrum Sprint Goalへの進捗を検査しSprint Backlogを適応させる(毎日)"]
DEV["Sprintの作業 設計・リサーチ・実装が並行して進む"]
SR["Sprint Review Sprint・Increment・Product Backlog・Product Goalへの進捗を検査する"]
RETRO["Sprint Retrospective チームレベルでSprintを検査しDefinition of Doneを含む改善策を作る"]
SP --> DS
DS --> DEV
DEV --> DS
DEV --> SR
SR --> RETRO
RETRO --> SP`,
  `flowchart TB
subgraph OLD["ウォーターフォール的な引き渡し型(アンチパターン)"]
UXTEAM["UXチーム (別部門)"] -->|"仕様書・モックアップを渡す"| DEVTEAM["開発チーム"]
end
subgraph NEW["機能横断型 Scrum Team(PSUが推奨する姿)"]
ST["1つの Scrum Team"]
ST --> PM["プロダクトの視点"]
ST --> UX["UX/リサーチの視点"]
ST --> ENG["実装の視点"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class ST,PM,UX,ENG,UXTEAM,DEVTEAM box;`,
  `flowchart TB
subgraph DISCOVERY["Discoveryトラック(何を作るべきかを検証する)"]
direction LR
D1["問題の理解 ユーザーインタビュー"] --> D2["アイデア探索 スケッチ・プロトタイプ"]
D2 --> D3["検証 ユーザビリティテスト・実験"]
end
subgraph DELIVERY["Deliveryトラック(検証済みのものを作る)"]
direction LR
E1["Sprint Planning"] --> E2["実装・テスト"]
E2 --> E3["Sprint Review Increment"]
end
D3 -->|"検証済みの解決策としてProduct Backlogへ"| E1
E3 -->|"リリース後の実データ・フィードバックが次の探索へ"| D1`,
  `flowchart LR
B1["1. ビジネス課題 解決したい問題は何か"] --> B2["2. ビジネスの成果 成功をどう測るか"]
B2 --> B3["3. ユーザー 誰のためのものか"]
B3 --> B4["4. ユーザーの成果と便益 ユーザーは何を得られるか"]
B4 --> B5["5. ソリューション 解決策のアイデア"]
B5 --> B6["6. 仮説 検証可能な文にする"]
B6 --> B7["7. 最も重要な前提 最もリスクが高いもの"]
B7 --> B8["8. 実験 MVPで何をどう検証するか"]`,
  `flowchart TB
O["プロダクトアウトカム 測定可能なユーザー行動の変化"]
O --> OP1["機会 A ユーザーの課題・欲求"]
O --> OP2["機会 B ユーザーの課題・欲求"]
OP1 --> S1["ソリューション案 1"]
OP1 --> S2["ソリューション案 2"]
OP2 --> S3["ソリューション案 3"]
S1 --> AT1["前提の検証実験"]
S2 --> AT2["前提の検証実験"]
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class O hub;`,
  `flowchart LR
M["月: 理解 問題の整理・ゴール設定"] --> T["火: 発散 解決策のスケッチ"]
T --> W["水: 決定 最有力案を選定"]
W --> TH["木: 試作 プロトタイプ作成"]
TH --> F["金: 検証 ユーザーテスト"]`,
  `flowchart TB
subgraph SPRINT_N["Sprint N"]
direction LR
N_DISC["Discovery Sprint N+1向けのインタビュー・検証"]
N_DEV["Delivery Sprint N確定分の実装"]
N_REV["Sprint Review Incrementと学びの両方を共有"]
N_RETRO["Retrospective DoDとプロセスを見直す"]
N_DISC --> N_REV
N_DEV --> N_REV
N_REV --> N_RETRO
end
subgraph SPRINT_N1["Sprint N+1"]
direction LR
N1_PLAN["Sprint Planning 検証済みアイテムを選択"]
N1_DISC["Discovery Sprint N+2向けの検証"]
N1_DEV["Delivery 実装"]
N1_PLAN --> N1_DEV
end
N_RETRO --> N1_PLAN
N_DISC -->|"検証結果をBacklogへ"| N1_PLAN
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class N_REV hub;`,
  `flowchart TB
S1["Step 1 Scrum Guide 2020を読み込む (PSM I / PSPO I相当の理解)"] --> S2["Step 2 Scrum Open / Product Owner Openで基礎知識を確認する"]
S2 --> S3["Step 3 Lean UX (第3版)を通読する"]
S3 --> S4["Step 4 Continuous Discovery Habitsでディスカバリーの実践知識を補強する"]
S4 --> S5["Step 5 Scrum.orgのSuggested Reading内のブログ記事群に目を通す"]
S5 --> S6["Step 6 本ガイドの模擬問題で理解度をセルフチェックする"]
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S6 done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-with-user-experience.vue",
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
  seoTitleFragments: ["PSU I", "完全ガイド", "Professional Scrum with User Experience"],
  seoTitle: "PSU I® 認定資格 完全ガイド | Professional Scrum with User Experience",
  seoDescription:
    "Scrum.org Professional Scrum with User Experience(PSU I)認定資格を初学者向けに体系解説。Scrumフレームワーク、Dual-Track Agile、Lean UXの実践知識とベストプラクティスをMermaid図解と模擬問題付きで網羅。",
});

describe("pages/professional-scrum-with-user-experience.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("テーブルが原本と同じ件数（19件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(19);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(19);
  });

  it("テーブル行の総数が原本と一致する（99行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(99);
  });

  it("免責ボックス（.disclaimer-box）が存在し、テキストが span で包括されている", () => {
    const wrapper = mountPage();
    const box = wrapper.find(".disclaimer-box");
    expect(box.exists()).toBe(true);
    expect(box.find(":scope > span").exists()).toBe(true);
  });

  it("模擬問題（.quiz-card）が5問存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".quiz-card")).toHaveLength(5);
  });

  it("学習ステップ（.step-list）が存在し、6項目すべてに step-num がある", () => {
    const wrapper = mountPage();
    const list = wrapper.find(".step-list");
    expect(list.exists()).toBe(true);
    const nums = wrapper.findAll(".step-list .step-num").map((el) => el.text());
    expect(nums).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("参考文献グループ（.ref-group）が6件存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-group")).toHaveLength(6);
  });

  it("参考文献リストが適切な件数（20件）存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-list li")).toHaveLength(20);
  });
});
