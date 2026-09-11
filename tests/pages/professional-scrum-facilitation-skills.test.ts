// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-facilitation-skills.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Facilitation Skills™ 認定資格 完全対策ガイド"
] as const;

const EXPECTED_H2 = [
  "この資格の概要",
  "ファシリテーションとは何か",
  "出題範囲の全体像(Professional Scrum Competencies)",
  "ファシリテーションの5原則とスクラムの価値基準",
  "ファシリテーターに必要なスキルと資質",
  "どれだけ・どんなファシリテーションが必要か",
  "スクラムイベントのファシリテーション",
  "グループダイナミクスと意思決定",
  "ファシリテーション技法ツールキット",
  "多様な視点と難しい状況への対応",
  "試験対策・学習ロードマップ",
  "練習問題(オリジナル10問)",
  "ベストプラクティス チートシート",
  "参考文献・出典"
] as const;

const EXPECTED_H3 = [
  "基本情報",
  "誰のための資格か",
  "資格取得までの流れ",
  "出題対象となる「フォーカスエリア」",
  "定義",
  "ファシリテーターとスクラムマスターの関係",
  "各フォーカスエリアの Knowledge Requirements(公式の知識要件)",
  "ファシリテーションの5原則",
  "スクラムの価値基準から見たファシリテーター行動",
  "2つの軸",
  "具体例",
  "ベストプラクティス",
  "イベント別ファシリテーションの焦点",
  "良いファシリテーションがない場合に起こる問題",
  "スプリントレビューを「デモ」にしないためのベストプラクティス",
  "Tuckmanのチーム発達モデル",
  "Sam Kanerの「参加型意思決定のダイヤモンド」とGroan Zone",
  "弱いアウトカム vs 強いアウトカム",
  "意思決定ルールの一覧",
  "沈黙・対立・集団思考への向き合い方",
  "発散のための技法",
  "収束・合意形成のための技法",
  "意思決定技法の選び方(フロー)",
  "スプリントレトロスペクティブ特有の技法",
  "Liberating Structures について",
  "内向的なメンバーと外向的なメンバーのバランス",
  "対立が表面化したときの対応",
  "タイムボックスとアジェンダの扱い方",
  "リモート・ハイブリッド環境でのファシリテーション",
  "出題カテゴリの再確認",
  "公式の推奨学習リソース",
  "学習ロードマップ",
  "受験当日のベストプラクティス",
  "イベント別チートシート",
  "汎用ベストプラクティス"
] as const;

const EXPECTED_H4 = [
  "Scrum.org 公式リソース",
  "業界解説記事・書籍関連",
  "認定情報",
  "一般的な理論的背景(補足)"
] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "certification-overview",
  "what-is-facilitation",
  "exam-scope",
  "principles-and-values",
  "facilitator-skills",
  "facilitation-level",
  "facilitating-events",
  "group-dynamics",
  "facilitation-toolkit",
  "diverse-perspectives",
  "exam-prep-roadmap",
  "practice-questions",
  "best-practice-cheatsheet",
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

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 27,
  practice: 11,
  note: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 27 },
  practice: { ベストプラクティス: 11 },
  note: { 補足: 3 },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification",
  "https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification",
  "https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1",
  "https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills",
  "https://www.scrum.org/resources/what-facilitation",
  "https://www.scrum.org/resources/blog/scrum-master-facilitator",
  "https://www.scrum.org/resources/facilitation-principles-and-values",
  "https://www.scrum.org/resources/applying-facilitation-skills-and-techniques",
  "https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills",
  "https://www.scrum.org/resources/facilitation-principles",
  "https://www.scrum.org/resources/blog/scrum-values-facilitators-perspective",
  "https://www.scrum.org/resources/skills-and-traits-facilitator",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.scrum.org/resources/blog/how-facilitation-key-effective-scrum-events",
  "https://www.scrum.org/resources/facilitation-techniques-scrum-events",
  "https://www.scrum.org/resources/facilitation-techniques-daily-scrum",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-planning",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-review",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective",
  "https://www.scrum.org/resources/facilitation-techniques-scrum-events",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-review",
  "https://en.wikipedia.org/wiki/Group_dynamics",
  "https://www.scrum.org/resources/blog/rollercoaster-group-dynamics-decision-making",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.scrum.org/resources/blog/five-ways-build-consensus",
  "https://www.scrum.org/resources/blog/trumpeting-all-voices-be-heard-white-elephant-facilitating-participation",
  "https://www.scrum.org/resources/creating-team-working-agreement",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective",
  "https://www.scrum.org/resources/blog/power-facilitation-liberating-structures-effective-collaboration",
  "https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.infoq.com/articles/facilitation-skill-scrum",
  "https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills",
  "https://www.scrum.org/resources/scrum-guide",
  "https://www.scrum.org/resources/what-facilitation",
  "https://www.scrum.org/resources/facilitation-principles",
  "https://www.scrum.org/resources/skills-and-traits-facilitator",
  "https://www.scrum.org/resources/facilitation-techniques-scrum-events",
  "https://www.scrum.org/facilitation-skills-open",
  "https://www.scrum.org/courses/professional-scrum-facilitation-skills-training",
  "https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills",
  "https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification",
  "https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-facilitation-skills-psfs-assessment-from-scrum-org/",
  "https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification",
  "https://www.scrum.org/resources/prove-your-knowledge-facilitation-skills",
  "https://www.scrum.org/resources/facilitation-principles-and-values",
  "https://www.scrum.org/resources/applying-facilitation-skills-and-techniques",
  "https://www.scrum.org/resources/what-facilitation",
  "https://www.scrum.org/resources/facilitation-principles",
  "https://www.scrum.org/resources/skills-and-traits-facilitator",
  "https://www.scrum.org/resources/facilitation-techniques-scrum-events",
  "https://www.scrum.org/resources/facilitation-techniques-daily-scrum",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-planning",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-review",
  "https://www.scrum.org/resources/facilitation-techniques-sprint-retrospective",
  "https://www.scrum.org/resources/blog/five-ways-build-consensus",
  "https://www.scrum.org/resources/blog/trumpeting-all-voices-be-heard-white-elephant-facilitating-participation",
  "https://www.scrum.org/resources/blog/rollercoaster-group-dynamics-decision-making",
  "https://www.scrum.org/resources/blog/scrum-values-facilitators-perspective",
  "https://www.scrum.org/resources/blog/how-facilitation-key-effective-scrum-events",
  "https://www.scrum.org/resources/blog/facilitator-event-value-maximiser",
  "https://www.scrum.org/resources/blog/scrum-master-facilitator",
  "https://www.scrum.org/resources/blog/power-facilitation-liberating-structures-effective-collaboration",
  "https://www.scrum.org/resources/blog/uncovering-essentials-skilled-facilitation-agile-teams",
  "https://www.scrum.org/resources/creating-team-working-agreement",
  "https://www.scrum.org/facilitation-skills-open",
  "https://www.scrum.org/resources/professional-scrum-competency-developing-people-and-teams",
  "https://www.scrum.org/courses/professional-scrum-facilitation-skills-training",
  "https://www.infoq.com/articles/facilitation-skill-scrum/",
  "https://www.oreilly.com/library/view/facilitating-professional-scrum/9780138196202/",
  "https://www.credly.com/org/scrum-org/badge/professional-scrum-facilitation-skills.1",
  "https://en.wikipedia.org/wiki/Group_dynamics",
  "https://www.scrum.org/assessments/professional-scrum-facilitation-skills-certification"
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TB\nA[\"Scrumの基礎を固める\"] --> B[\"Professional Scrum Master I を取得する 推奨\"]\nB --> C[\"Professional Scrum Facilitation Skills 研修を受講する 任意\"]\nC --> D[\"公式のFacilitation関連記事を読み込む\"]\nD --> E[\"Facilitation Skills Open 無料模擬試験 を受験する\"]\nE --> F{\"安定して高得点が取れているか\"}\nF -->|\"はい\"| G[\"PSFS本試験を申し込み受験する\"]\nF -->|\"いいえ\"| D\nG --> H[\"85%以上でPSFS認定を取得\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E,F,G box;\nclass H done;",
  "flowchart TB\nA[\"セッションが進行中\"] --> B{\"自分は議論の内容に利害関係があるか\"}\nB -->|\"ない\"| C[\"中立なファシリテーターとして進行を続ける\"]\nB -->|\"ある\"| D[\"いったんファシリテーター役を離れることを宣言する\"]\nD --> E[\"チームメンバーとして意見や提案を述べる\"]\nE --> F[\"ファシリテーター役に戻ることを宣言する\"]\nF --> C\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,D,E,F box;\nclass C done;",
  "flowchart TB\nA[\"Professional Scrum Competencies\"] --> B[\"Developing People and Teams\"]\nB --> C[\"Facilitation\"]\nC --> D[\"Facilitation Principles and Values\"]\nC --> E[\"Applying Facilitation Skills and Techniques\"]\nD --> D1[\"ファシリテーション原則とその適用を理解する\"]\nD --> D2[\"原則をスクラムイベント等の力学改善に活かす方法を理解する\"]\nE --> E1[\"多様な視点とチームダイナミクスの活用方法を理解する\"]\nE --> E2[\"チームの協働と参加型意思決定の改善方法を理解する\"]\nE --> E3[\"アウトカムに向けて進捗を促す技法の活用方法を理解する\"]\nE --> E4[\"弱いアウトカムと強いアウトカムの違いを理解する\"]\nE --> E5[\"Groan Zoneを認識し乗り越える方法を理解する\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E,D1,D2,E1,E2,E3,E4,E5 box;",
  "flowchart TB\nA[\"チームの状況を観察する\"] --> B{\"チームの効果性は高いか\"}\nB -->|\"高い\"| C{\"状況の複雑さは高いか\"}\nB -->|\"低い\"| D{\"状況の複雑さは高いか\"}\nC -->|\"低い\"| E[\"ファシリテーションなし\"]\nC -->|\"高い\"| F[\"軽いファシリテーション\"]\nD -->|\"低い\"| G[\"中程度のファシリテーション\"]\nD -->|\"高い\"| H[\"強いファシリテーション\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D box;\nclass E,F,G,H done;",
  "flowchart LR\nA[\"Sprint Planning 協調的で透明性の高い環境\"] --> B[\"Sprint Developersが計画を実行する\"]\nB --> C[\"Daily Scrum スプリントゴールへの集中を保つ\"]\nC --> B\nB --> D[\"Sprint Review 参加型で共感的な対話\"]\nD --> E[\"Sprint Retrospective 安全な場と合意形成\"]\nE --> A\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E box;",
  "flowchart LR\nA[\"Forming 形成期\"] --> B[\"Storming 混乱期\"]\nB --> C[\"Norming 統一期\"]\nC --> D[\"Performing 機能期\"]\nD --> E[\"Adjourning 解散期\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D box;\nclass E done;",
  "flowchart LR\nA[\"Divergent Zone 発散 多様な視点とアイデアの探索\"] --> B[\"Groan Zone 混乱 摩擦 停滞感が生じる時期\"]\nB --> C[\"Convergent Zone 収束 共通理解への統合\"]\nC --> D[\"合意された決定\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B box;\nclass C,D done;",
  "flowchart TB\nA[\"何を決めたいか\"] --> B{\"複数案から1つを選ぶ\"}\nA --> C{\"複数案の優先順位をつけたい\"}\nA --> D{\"賛成か反対かを問う\"}\nB --> E[\"賛同の度合いも知りたい\"]\nE --> F[\"Fist of Five を使う\"]\nC --> G[\"全員に平等な発言権を持たせたい\"]\nG --> H[\"Dot Voting または White Elephant を使う\"]\nD --> I[\"素早く白黒つけたい\"]\nI --> J[\"Roman Voting を使う\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E,G,I box;\nclass F,H,J done;",
  "flowchart TB\nA[\"Scrum Guideを読み込み Scrumイベントのアウトカムを再確認する\"] --> B[\"Facilitation Learning Seriesの記事を一通り読む\"]\nB --> C[\"5つの原則 9つのスキルと資質を自分の言葉で説明できるようにする\"]\nC --> D[\"イベントごとのファシリテーション技法を整理する\"]\nD --> E[\"Groan Zoneと弱い アウトカム 強い アウトカムの違いを理解する\"]\nE --> F[\"Facilitation Skills Open を複数回受験する\"]\nF --> G{\"安定して高得点が取れるか\"}\nG -->|\"いいえ\"| B\nG -->|\"はい\"| H[\"本試験 PSFS を申し込み受験する\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass A hub;\nclass B,C,D,E,F,G box;\nclass H done;"
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-facilitation-skills.vue",
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
  seoTitleFragments: ["Professional Scrum Facilitation Skills", "PSFS", "完全ガイド"],
  seoTitle: "Professional Scrum Facilitation Skills™ 認定資格 完全ガイド | 出題範囲とベストプラクティス",
  seoDescription:
    "Scrum.org公式のProfessional Scrum Facilitation Skills(PSFS)認定資格について、出題範囲・ファシリテーション原則・スキルと資質・イベント別技法・練習問題までを初学者向けに解説するガイドです。",
});

describe("pages/professional-scrum-facilitation-skills.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("テーブルが原本と同じ件数（14件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(14);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(14);
  });

  it("テーブル行の総数が原本と一致する（89行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(89);
  });

  it("練習問題（10問）が details/summary アコーディオン構造を持つ", () => {
    const wrapper = mountPage();
    const details = wrapper.findAll("details");
    expect(details).toHaveLength(10);
    for (const d of details) {
      expect(d.find("summary").text()).toBe("解答と解説");
    }
  });

  it("参考文献リストが4つのグループ（.ref-group）と適切なリスト構造を持つ", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-group")).toHaveLength(4);
    expect(wrapper.findAll(".ref-list")).toHaveLength(4);
    expect(wrapper.findAll(".ref-list li").length).toBeGreaterThan(20);
  });
});
