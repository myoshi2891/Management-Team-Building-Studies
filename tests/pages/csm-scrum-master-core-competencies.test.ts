// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/csm-scrum-master-core-competencies.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scrum Master Core Competencies 完全解説ガイド",
] as const;

const EXPECTED_H2 = [
  "CSM認定の全体像を掴む",
  "Learning Objectivesの構造を理解する",
  "Scrum Masterという役割の土台を固める",
  "Scrum Master Core Competenciesを1つずつ理解する",
  "Scrum Team・Product Owner・組織へのサービス",
  "ベストプラクティス総まとめ",
  "学習を深める：認定パスとSEU",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "1-1. CSMとは何か",
  "1-2. 試験の仕組み",
  "1-3. 認定取得までの流れ",
  "2-1. 3つのカテゴリ",
  "2-2. Bloom's Taxonomyという評価軸",
  "3-1. Scrum Guideにおける定義",
  "3-2. Scrumの5つの価値基準",
  "4-1. Facilitation(ファシリテーション)とは — LO2.1",
  "4-2. グループの意思決定を促す技法 — LO2.2",
  "4-3. Facilitating・Teaching・Mentoring・Coachingの違い — LO2.3",
  "4-4. 拡張モデル：Scrum Masterの8つのスタンス",
  "5-1. Scrum Teamへのリーダーシップ — LO3.1",
  "5-2. Technical Debt(技術的負債)の管理 — LO3.2, 3.3",
  "5-3. 障害(Impediment)への対応 — LO3.5〜3.7",
  "5-4. Product Ownerへの支援 — LO3.4",
  "5-5. 組織へのサービスとプロジェクトマネージャー不在の理由 — LO3.8, 3.9",
  "Scrum Alliance 公式情報",
  "The Scrum Guide / Agile Manifesto",
  "Facilitation・Coaching・Stancesに関する補助資料",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["CSMコース受講 16時間"] --> B["Learning Objectivesを網羅"]
B --> C["オンライン試験 50問 1時間以内"]
C -->|"37問以上正解"| D["CSM認定取得"]
C -->|"36問以下"| G["再受験 90日以内に2回目"]
G --> C
D --> E["Scrum Allianceメンバーシップ 2年間"]
E --> F["SEUを蓄積して更新"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,G box;
class D,E,F done;`,
  `flowchart TB
LO["CSM Learning Objectives"] --> C1["1. Scrum"]
LO --> C2["2. Scrum Master Core Competencies"]
LO --> C3["3. Service to the Scrum Team Product Owner and Organization"]
C1 --> C1a["Scrum Teamのアカウンタビリティ イベント アーティファクトの理解"]
C2 --> C2a["Facilitationの実践 LO2.1 2.2"]
C2 --> C2b["Facilitation Teaching Mentoring Coachingの違い LO2.3"]
C3 --> C3a["Scrum Teamへのサービス"]
C3 --> C3b["Product Ownerへのサービス"]
C3 --> C3c["組織へのサービス"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class LO hub;
class C1,C2,C3,C1a,C2a,C2b,C3a,C3b,C3c box;`,
  `flowchart TD
Start["グループでの意思決定が必要"] --> Q1{"選択肢は複数あるか"}
Q1 -->|"はい 複数候補から絞り込みたい"| DV["Dot Voting 候補の絞り込み"]
Q1 -->|"いいえ 1つの提案への賛否"| Q2{"賛否の温度差も知りたいか"}
Q2 -->|"はい"| FOF["Fist of Five 合意度の把握"]
Q2 -->|"いいえ シンプルなYes No"| RV["Roman Voting 賛成反対の一括採決"]
Start --> Q3{"議論が拡散し収束しない"}
Q3 -->|"はい"| OTA["1-2-4-All 個人からペア 少人数 全体へ収束"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Start hub;
class Q1,Q2,Q3 box;
class DV,FOF,RV,OTA done;`,
  `flowchart TB
subgraph CONTENT["Content 知識を伝える"]
direction LR
TEACH["Teaching 教える 一方向に知識を伝達"]
MENTOR["Mentoring 助言する 自らの経験を伝える"]
end
subgraph PROCESS["Process プロセスを支える"]
direction LR
FACIL["Facilitating 促進する 中立にプロセスを運営"]
COACH["Coaching 引き出す 本人やチームの答えを引き出す"]
end
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class TEACH,MENTOR box;
class FACIL,COACH done;`,
  `flowchart TB
SM["Scrum Master"] --> S1["Servant Leader チームに奉仕するリーダー"]
SM --> S2["Facilitator 話し合いの場を設計する"]
SM --> S3["Coach 個人 チーム 組織の成長を引き出す"]
SM --> S4["Teacher Scrumとアジャイルの原則を教える"]
SM --> S5["Mentor 自らの経験や知見を伝える"]
SM --> S6["Manager 障害やプロセス 文化を管理する"]
SM --> S7["Impediment Remover 障害物を取り除く"]
SM --> S8["Change Agent 組織文化の変革を推進する"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class SM hub;
class S1,S2,S3,S4,S5,S6,S7,S8 box;`,
  `flowchart TD
A["チームが障害を報告 または SMが検知"] --> B["障害の性質を分類する"]
B --> C{"チーム自身で解決可能か"}
C -->|"はい"| D["チームのSelf Managementを支援するコーチング"]
C -->|"いいえ 組織的な障害"| E["Impediment Backlogに記録し可視化"]
E --> F["関係するステークホルダーと連携し交渉 エスカレーション"]
F --> G["対応状況を継続的に追跡"]
G --> H["Sprint Retrospectiveで振り返り再発防止"]
D --> H
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,C,E,F,G box;
class D,H done;`,
  `flowchart LR
CSM["Certified ScrumMaster CSM 入門"] --> ACSM["Advanced Certified ScrumMaster A-CSM 実践"]
ACSM --> CSPSM["Certified Scrum Professional ScrumMaster CSP-SM 熟達"]
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CSM hub;
class ACSM box;
class CSPSM done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://agilemanifesto.org/",
  "https://assets.scrumalliance.org/media/certifications/los/adv_csm_learning_objectives_2022.pdf",
  "https://helpingimprove.com/understanding-acis-agile-coach-competency-framework/",
  "https://resources.scrumalliance.org/Collection/seu-resources-scrum-master-core-competencies",
  "https://scrumguides.org/revisions.html",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.mountaingoatsoftware.com/blog/four-quick-ways-to-gain-or-assess-team-consensus",
  "https://www.scrum.org/resources/8-stances-scrum-master",
  "https://www.scrum.org/resources/blog/five-ways-build-consensus",
  "https://www.scrum.org/resources/coaching-agile-teams-companion-scrummasters-agile-coaches-and-project-managers-transition",
  "https://www.scrumalliance.org/about-scrum",
  "https://www.scrumalliance.org/code-of-ethics",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/advanced-certified-scrummaster",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrum-professional-scrummaster",
  "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  "https://www.scrumalliance.org/media/certifications/los/csm_learning_objectives_2022.pdf",
] as const;

const EXPECTED_TOC_IDS = [
  "csm-overview",
  "lo-structure",
  "scrum-master-foundations",
  "core-competencies",
  "service-to-team-po-org",
  "best-practices-summary",
  "certification-path",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 16,
  practice: 11,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { ソース: 16 },
  practice: { ベストプラクティス: 11 },
  note: { 補足: 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE =
  "Scrum Master Core Competencies 完全解説ガイド | Certified ScrumMaster(CSM)";

const EXPECTED_SEO_DESCRIPTION =
  "Scrum Alliance の Certified ScrumMaster(CSM)認定における Scrum Master Core Competencies(Facilitation・Teaching・Mentoring・Coaching)と、Scrum Team・Product Owner・組織へのサービスを、公式Learning Objectivesに基づき初学者向けに解説する非公式学習ガイド";

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "Scrum Master Core Competencies",
  "Certified ScrumMaster",
] as const;

defineSourceParityContract({
  suiteName: "pages/csm-scrum-master-core-competencies.vue",
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

describe("pages/csm-scrum-master-core-competencies.vue — 個別要素契約", () => {
  const mountPage = createMountPage(Page);

  it("ヒーローセクションの要素を正しく描画する", () => {
    const wrapper = mountPage();
    expect(wrapper.find(".hero-eyebrow").text()).toContain("Scrum Alliance CSM 学習ガイド");
    expect(wrapper.find(".hero-lede").text()).toContain("Scrum Alliance の Certified ScrumMaster(CSM)認定コースで扱われる学習内容のうち");
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
    expect(wrapper.find(".disclaimer-box").text()).toContain("Scrum Alliance の公式教材ではなく");
  });
});
