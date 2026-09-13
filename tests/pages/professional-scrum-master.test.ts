// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/professional-scrum-master.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Professional Scrum Master(PSM)認定ガイド",
] as const;

const EXPECTED_H2 = [
  "PSM認定の全体像",
  "スクラムの理論的基盤",
  "スクラムチームと3つのアカウンタビリティ",
  "スクラムイベント",
  "スクラムの作成物とコミットメント",
  "スクラムマスターの役割とサーバントリーダーシップ",
  "よくあるアンチパターンと対処法",
  "PSM I 試験対策",
  "PSM II 試験対策",
  "PSM III 試験対策",
  "スケーリングへの橋渡し(Nexus)",
  "学習ロードマップ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "1.1 PSMとは何か",
  "1.2 資格比較表",
  "1.3 認定パスの全体図",
  "1.4 その他の関連アセスメント(参考)",
  "2.1 経験主義の3本柱",
  "2.2 スクラムの5つの価値基準",
  "3.1 スクラムチームの基本原則",
  "3.2 3つのアカウンタビリティ比較表",
  "3.3 よくある誤解",
  "4.0 スプリントサイクル全体図",
  "4.1 スプリント(Sprint)",
  "4.2 スプリントプランニング(Sprint Planning)",
  "4.3 デイリースクラム(Daily Scrum)",
  "4.4 スプリントレビュー(Sprint Review)",
  "4.5 スプリントレトロスペクティブ(Sprint Retrospective)",
  "5.1 プロダクトバックログ & プロダクトゴール",
  "5.2 スプリントバックログ & スプリントゴール",
  "5.3 インクリメント & 完成の定義",
  "6.1 3つの奉仕対象",
  "6.2 サーバントリーダーシップとは",
  "6.3 スクラムマスターの8つのスタンス",
  "6.4 ファシリテーション技法のベストプラクティス",
  "6.5 コーチング・メンタリング・ティーチングの違い",
  "6.6 障害物(Impediment)除去のベストプラクティス",
  "8.1 試験概要",
  "8.2 主な出題範囲",
  "8.3 出題傾向の例(オリジナル作成の演習問題)",
  "8.4 学習ステップ(5ステップ)",
  "8.5 受験当日のベストプラクティス",
  "9.1 試験概要",
  "9.2 PSM I との違い",
  "9.3 学習ステップ",
  "9.4 出題傾向の例(オリジナル作成の演習問題)",
  "10.1 試験概要",
  "10.2 エッセイ対策のベストプラクティス",
  "10.3 学習ステップ",
] as const;

const EXPECTED_H4 = [
  "一次情報源(Scrum.org / 公式スクラムガイド)",
  "補足情報源(非公式の学習・分析リソース)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "psm-overview",
  "scrum-theory",
  "scrum-team-accountabilities",
  "scrum-events",
  "scrum-artifacts",
  "scrum-master-role",
  "anti-patterns",
  "psm1-exam-prep",
  "psm2-exam-prep",
  "psm3-exam-prep",
  "nexus-scaling",
  "study-roadmap",
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
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 6,
  practice: 13,
  note: 4,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: {
    "ソース": 5,
    "ソース(非公式の分析記事)": 1,
  },
  practice: {
    "ベストプラクティス": 13,
  },
  note: {
    "補足": 4,
  },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments",
  "https://www.scrum.org/assessments/professional-scrum-master-i-certification",
  "https://www.scrum.org/assessments/professional-scrum-master-ii-certification",
  "https://www.scrum.org/assessments/professional-scrum-master-iii-certification",
  "https://www.certificationbox.com/2026/09/04/psm-ii-scrum-master-assessment-people-focus/",
  "https://www.scrum.org/assessments/scaled-professional-scrum-certification",
  "https://www.scrum.org/resources/8-stances-scrum-master",
  "https://scrumguides.org/scrum-guide.html",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf",
  "https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-master-ii-psm-ii-assessment-from-scrum-org/",
  "https://www.thescrummaster.co.uk/scrum/how-to-pass-the-professional-scrum-master-iii-psm-iii-assessment-from-scrum-org/",
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["Scrum初学者"]
B["PSM I 基礎知識の証明 80問 / 60分 / 85%"]
C["PSM II 実践への応用力の証明 30問 / 90分 / 85%"]
D["PSM III エキスパートレベルの証明 24問エッセイ / 150分"]
E["PSPO I プロダクトオーナー"]
F["PAL I アジャイルリーダーシップ"]
G["PSD I スクラム開発者"]
H["SPS Nexusによるスケーリング"]
A --> B
B --> C
C --> D
B -.->|"関連する認定"| E
B -.->|"関連する認定"| F
B -.->|"関連する認定"| G
C -.->|"スケーリングへ発展"| H

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,E,F,G,H box;
class D done;`,

  `flowchart LR
T["透明性 Transparency プロセスと作業を関係者に見える化する"]
I["検査 Inspection 進捗や成果物を頻繁かつ注意深く検査する"]
AD["適応 Adaptation 許容範囲からの逸脱を認識したら迅速に調整する"]
T --> I
I --> AD
AD --> T

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class T,I,AD box;`,

  `flowchart TB
PB["プロダクトバックログ Product Backlog"]
SP["① スプリントプランニング Sprint Planning"]
SPRINT["② スプリント 最大1か月 期間中は毎日デイリースクラムを実施"]
SR["③ スプリントレビュー Sprint Review"]
RETRO["④ スプリントレトロスペクティブ Sprint Retrospective"]
INC["インクリメント Increment"]
PB --> SP
SP --> SPRINT
SPRINT --> SR
SR --> RETRO
RETRO --> PB
SPRINT --> INC
INC --> SR

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class PB hub;
class SP,SPRINT,SR,RETRO box;
class INC done;`,

  `flowchart TB
SM["スクラムマスター"]
ST["スクラムチームへの奉仕 コーチング / ファシリテーション 障害物の除去 / イベントの支援"]
PO["プロダクトオーナーへの奉仕 効果的なプロダクトゴールの策定支援・プロダクトバックログ管理技法の提示"]
ORG["組織への奉仕 Scrum導入の計画・指導・コーチ 経験主義的アプローチの浸透"]
SM --> ST
SM --> PO
SM --> ORG

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class ST,PO,ORG box;`,

  `flowchart TB
SM["スクラムマスター"]
S1["① サーバントリーダー チームと顧客のニーズに焦点を当てる"]
S2["② ファシリテーター 合意形成のプロセスを設計・運営する"]
S3["③ コーチ 個人・チーム・組織の学習と成長を促す"]
S4["④ マネージャー チームの健全性と自己組織化の境界を管理する"]
S5["⑤ メンター 自身の経験や知識をアジャイル実践のために伝える"]
S6["⑥ ティーチャー Scrum・経験主義・自己管理の理解を広める"]
S7["⑦ 障害物の除去者 チームの進捗を妨げる問題を解消する"]
S8["⑧ チェンジエージェント スクラムチームが機能する文化づくりを組織に働きかける"]
SM --> S1
SM --> S2
SM --> S3
SM --> S4
SM --> S5
SM --> S6
SM --> S7
SM --> S8

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class S1,S2,S3,S4,S5,S6,S7,S8 box;`,

  `flowchart TB
S1["Step 1 Scrum Guide 2020 の通読・精読"]
S2["Step 2 Scrum Open で無料診断"]
S3["Step 3 PSM I 受験・合格"]
S4["Step 4 実務でスクラムマスターとして経験を積む 数ヶ月〜1年以上が目安"]
S5["Step 5 PSM II 対策: シナリオ問題演習と8つのスタンスの実践"]
S6["Step 6 PSM II 受験・合格"]
S7["Step 7 複数チーム・組織横断の課題に取り組む経験を積む"]
S8["Step 8 PSM III 対策: エッセイ練習と経験の言語化"]
S9["Step 9 PSM III 受験・合格"]
S1 --> S2
S2 --> S3
S3 --> S4
S4 --> S5
S5 --> S6
S6 --> S7
S7 --> S8
S8 --> S9

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6,S7,S8 box;
class S9 done;`,
] as const;

defineSourceParityContract({
  suiteName: "pages/professional-scrum-master.vue",
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
  seoTitleFragments: ["Professional Scrum Master", "PSM", "認定ガイド"],
  seoTitle: "Professional Scrum Master(PSM)認定ガイド | PSM I・II・III 試験対策とベストプラクティス",
  seoDescription: "Scrum.org Professional Scrum Master(PSM I/II/III)認定について、Scrumの理論的基盤から試験対策・ベストプラクティスまでを解説する初学者向け完全ガイド。",
});

describe("pages/professional-scrum-master.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("リスト要素（通常箇条書き、参考文献）が適切なクラスとDOM構造を持つ", () => {
    const wrapper = mountPage();
    // 通常リスト
    expect(wrapper.findAll("ul:not(.sidebar-nav):not(.ref-list)").length).toBeGreaterThan(0);
    // 参考文献リスト
    const refLists = wrapper.findAll(".ref-list");
    expect(refLists.length).toBe(2);
  });
});
