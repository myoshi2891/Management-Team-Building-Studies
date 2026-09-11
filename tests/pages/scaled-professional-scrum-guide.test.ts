// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/scaled-professional-scrum-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Scaled Professional Scrum(SPS)認定 完全学習ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドの読み方",
  "Scaled Professional Scrum™ 認定とは何か",
  "大前提:なぜ「スケール」する必要があるのか",
  "Nexus フレームワーク全体像",
  "Nexus の責任(Accountabilities):Nexus Integration Team",
  "Nexus のイベント(Events)詳細解説",
  "Nexus の作成物(Artifacts)とコミットメント",
  "依存関係マネジメントとチーム編成のベストプラクティス",
  "Nexus と他のスケーリングフレームワークとの比較",
  "Nexus の立ち上げと運用:実務上の落とし穴(アンチパターン)",
  "試験対策:ケーススタディ形式の演習問題",
  "総まとめ図:Nexus フレームワーク全体マップ",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "1.1 資格の位置づけ",
  "1.2 試験の構造(コミュニティ情報を含む)",
  "1.3 受験対象者",
  "1.4 学習ロードマップ(推奨順序)",
  "2.1 スケールの根本原則",
  "2.2 依存関係が生まれる2つの根本原因",
  "3.1 定義",
  "3.2 Nexus の理論(Nexus Theory)",
  "3.3 Nexus がScrumに追加する3要素",
  "4.1 目的と構成",
  "4.2 重要な運用ルール",
  "5.1 Sprint 全体の流れ",
  "5.2 Cross-Team Refinement(チーム横断リファインメント)",
  "5.3 Nexus Sprint Planning",
  "5.4 Nexus Daily Scrum",
  "5.5 Nexus Sprint Review",
  "5.6 Nexus Sprint Retrospective",
  "5.7 イベントまとめ表",
  "6.1 Product Backlog / Product Goal",
  "6.2 Nexus Sprint Backlog / Nexus Sprint Goal",
  "6.3 Integrated Increment / Definition of Done",
  "7.1 依存関係のライフサイクル",
  "7.2 チームトポロジーの選択",
  "7.3 Product Owner のボトルネック対策",
  "7.4 見積り(Estimation)の扱い",
  "演習1",
  "演習2",
  "演習3",
  "演習4",
] as const;

const EXPECTED_H4 = [
  "5.2.1 実務パターン:Cross-Team Refinement Board",
  "一次情報源(Scrum.org 公式)",
  "二次情報源(コミュニティ・実務解説)",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_TOC_IDS = [
  "how-to-use-this-guide",
  "what-is-sps",
  "why-scale",
  "nexus-framework-overview",
  "nexus-integration-team",
  "nexus-events",
  "nexus-artifacts",
  "dependency-management-best-practices",
  "framework-comparison",
  "anti-patterns",
  "exam-prep-case-studies",
  "framework-summary-map",
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
  "SECTION 12",
] as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 6,
  practice: 10,
  source: 13,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: {
    "補足": 2,
    "この割合は Scrum.org の公式発表ではありません(非公式の目安)": 1,
    "試験のポイント": 3,
  },
  practice: {
    "ベストプラクティス": 10,
  },
  source: {
    "ソース": 13,
  },
} as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrum.org/resources/online-nexus-guide",
  "https://www.scrum.org/assessments/scaled-professional-scrum-certification",
  "https://scrum-exams.info/sps/",
  "https://www.scrum.org/professional-scrum-competencies",
  "https://scrumorg-website-prod.s3.amazonaws.com/drupal/2021-01/NexusGuide%202021_0.pdf",
  "https://www.scrum.org/resources/scaling-scrum",
  "https://www.scrum.org/resources/blog/scaling-scrum-nexus-and-scrum-studio",
  "https://www.scrum.org/resources/blog/overview-nexus-framework-scaling-scrum",
  "https://www.scrum.org/resources/blog/nexus-nutshell",
  "https://www.scrum.org/resources/blog/8-tips-scrum-masters-improve-cross-team-refinement-nexus",
  "https://scrumorg-website-prod.s3.amazonaws.com/drupal/2016-08/Cross-Team%20Refinement%20in%20Nexus%20whitepaper_0.pdf",
  "https://www.scrum.org/resources/cross-team-refinement-nexus",
  "https://accentient.com/blog/nexus-sprint-planning-in-practice/",
  "https://www.scrum.org/forum/scrum-forum/46438/nexus-events-team-sprint-planing-sequence-events",
  "https://www.scrum.org/resources/nexus-framework-scaling-scrum",
  "https://www.scrum.org/resources/nexus-guide-change-history",
  "https://www.scrum.org/forum/scrum-forum/35030/nexus-questions-cross-team-dependencies-and-po-availabilities",
  "https://www.scrum.org/forum/scrum-forum/8731/nexus-refinement-meetings-and-estimates",
  "https://prepforscrum.com/scaling-scrum-frameworks-less-safe-nexus-scrum-at-scale/",
  "https://www.scrum-tips.com/agile/nexus-scaling-scrum-framework/",
  "https://www.scrum.org/courses/scaled-professional-scrum-nexus-training",
  "https://www.scrum.org/professional-scrum-certifications",
  "https://scrumguides.org/scrum-guide.html",
  "https://www.thescrummaster.co.uk/scrum/how-to-pass-the-scaled-professional-scrum-sps-assessment-from-scrum-org/",
  "https://www.thescrummaster.co.uk/scaled-professional-scrum/",
  "https://engineering-leadership.hinshelwood.com/guides/nexus-guide"
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TB\nA[\"Scrum Guideを熟読する 用語・役割・イベント・作成物\"] --> B[\"PSM I / PSM II相当の理解を確立する\"]\nB --> C[\"Nexus Guide 2021年版 を複数回通読する\"]\nC --> D[\"Nexus Open Assessment 無料 を満点近くまで繰り返す\"]\nD --> E[\"Cross-Team Refinement等の公式ブログ ホワイトペーパーで実務パターンを学ぶ\"]\nE --> F[\"本ガイドのケーススタディ演習で理解度を検証する\"]\nF --> G[\"SPS本試験を受験する\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E,F,G box;",
  "flowchart TD\nStart[\"デリバリーの停滞・スループット不足を感じている\"] --> Q1{\"単一チームのプロセス改善で解決できるか?\"}\nQ1 -->|\"できる\"| Fix[\"まずチーム内の課題を解決する スケールしない\"]\nQ1 -->|\"できない\"| Q2{\"本当に同一プロダクトの同一Product Backlogを複数チームで扱う必要があるか?\"}\nQ2 -->|\"いいえ\"| Split[\"プロダクトの分割や別チーム編成を検討する\"]\nQ2 -->|\"はい\"| Q3{\"チーム数はおおよそ3〜9チームか?\"}\nQ3 -->|\"はい\"| ApplyNexus[\"Nexusフレームワークの適用を検討する\"]\nQ3 -->|\"いいえ 多すぎる\"| Multi[\"Nexus+など複数Nexusの組み合わせを検討する\"]\n\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass Q1,Q2,Q3 hub;\nclass Start,Fix,Split,Multi box;\nclass ApplyNexus done;",
  "flowchart LR\nsubgraph Scrum[\"標準の Scrum 単一チーム\"]\nS1[\"Developers / Product Owner / Scrum Master\"]\nS2[\"Sprint Planning / Daily Scrum / Sprint Review / Sprint Retrospective\"]\nS3[\"Product Backlog / Sprint Backlog / Increment\"]\nend\n\nsubgraph NexusExt[\"Nexus による最小限の拡張\"]\nN1[\"Nexus Integration Team\"]\nN2[\"Cross-Team Refinement / Nexus Sprint Planning / Nexus Daily Scrum / Nexus Sprint Review / Nexus Sprint Retrospective\"]\nN3[\"Nexus Sprint Backlog / Integrated Increment\"]\nend\n\nS1 -.->|\"拡張\"| N1\nS2 -.->|\"拡張\"| N2\nS3 -.->|\"拡張\"| N3\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass S1,S2,S3 box;\nclass N1,N2,N3 hub;",
  "flowchart TB\nsubgraph NIT[\"Nexus Integration Team\"]\nPO[\"Product Owner 単一のProduct Backlogに対して唯一\"]\nSM[\"Scrum Master Nexusフレームワークの理解と実践に責任\"]\nMEM[\"Nexus Integration Team Members 各Scrum Teamから必要なスキルを持つ人材\"]\nend\n\nNIT --> Goal[\"少なくともSprintごとにDoneなIntegrated Incrementを実現する\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass PO,SM,MEM box;\nclass Goal done;",
  "flowchart LR\nA[\"Cross-Team Refinement 継続的\"] --> B[\"Nexus Sprint Planning\"]\nB --> C[\"各チームの Sprint Planning\"]\nC --> D[\"Sprint 実行 Nexus Daily Scrum + 各チームDaily Scrum\"]\nD --> E[\"Nexus Sprint Review\"]\nE --> F[\"Nexus Sprint Retrospective\"]\nF -.->|\"次のSprintへ\"| A\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E,F box;",
  "flowchart TB\nsubgraph Board[\"Cross-Team Refinement Board のイメージ\"]\ndirection LR\nS1[\"対象Sprint N\"] --- S2[\"Sprint N+1\"] --- S3[\"Sprint N+2 目安上限\"]\nend\nItem1[\"PBI: 大きな要求\"] --> Decompose[\"チーム横断で分解\"]\nDecompose --> Dep[\"依存関係を色分けして可視化\"]\nDep --> Ready[\"各チームが引き取れるサイズまで分解されたPBI\"]\nReady --> Board\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass Item1,Decompose,Ready box;\nclass Dep hub;",
  "flowchart LR\nsubgraph PB[\"Product Backlog\"]\nPBC[\"コミットメント: Product Goal\"]\nend\nsubgraph NSB[\"Nexus Sprint Backlog\"]\nNSBC[\"コミットメント: Nexus Sprint Goal\"]\nend\nsubgraph II[\"Integrated Increment\"]\nIIC[\"コミットメント: Definition of Done\"]\nend\n\nPB --> NSB --> II\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass PB,NSB,II box;\nclass PBC,NSBC,IIC done;",
  "flowchart LR\nA[\"依存関係が潜在的に発生\"] --> B[\"Cross-Team Refinement / Nexus Daily Scrumで発見\"]\nB --> C[\"Cross-Team Refinement Board で可視化・色分け\"]\nC --> D{\"事前に解消できるか?\"}\nD -->|\"できる\"| E[\"Product Backlog の並び替え 再分解で解消\"]\nD -->|\"できない\"| F[\"Nexus Sprint Backlog上でSprint中に管理\"]\nF --> G[\"Nexus Daily Scrumで日次フォロー\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,B,C,E,F,G box;\nclass D hub;",
  "flowchart TB\nsubgraph Accountabilities[\"Accountabilities\"]\nNIT[\"Nexus Integration Team PO + Scrum Master + Members\"]\nend\n\nsubgraph Events[\"Events\"]\nE1[\"The Sprint\"]\nE2[\"Cross-Team Refinement\"]\nE3[\"Nexus Sprint Planning\"]\nE4[\"Nexus Daily Scrum\"]\nE5[\"Nexus Sprint Review\"]\nE6[\"Nexus Sprint Retrospective\"]\nend\n\nsubgraph Artifacts[\"Artifacts & Commitments\"]\nA1[\"Product Backlog to Product Goal\"]\nA2[\"Nexus Sprint Backlog to Nexus Sprint Goal\"]\nA3[\"Integrated Increment to Definition of Done\"]\nend\n\nNIT --> E1\nNIT --> A3\nE2 --> A1\nE3 --> A2\nE1 --> A3\nE4 --> A2\nE5 --> A3\nE6 --> NIT\n\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass NIT hub;\nclass E1,E2,E3,E4,E5,E6 box;\nclass A1,A2,A3 done;"
] as const;

defineSourceParityContract({
  suiteName: "pages/scaled-professional-scrum-guide.vue",
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
  seoTitleFragments: ["Scaled Professional Scrum", "完全ガイド", "SPS", "Nexus"],
  seoTitle: "Scaled Professional Scrum(SPS)認定 完全ガイド | Nexusフレームワークで学ぶスケールドスクラム",
  seoDescription:
    "Scrum.org Scaled Professional Scrum(SPS)認定試験対策として、Nexusフレームワークの責任・イベント・作成物を初学者にも分かりやすく解説し、実務のベストプラクティスと一次情報源を整理した完全ガイド。",
});

describe("pages/scaled-professional-scrum-guide.vue — 個別仕様契約", () => {
  const mountPage = createMountPage(Page);

  it("サイドバーのドロワー制御とアクセシビリティ属性が整合する", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("[data-testid='sidebar-toggle']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("nav.sidebar").classes()).toContain("open");
  });

  it("テーブルが原本と同じ件数（11件）存在し、すべて .table-wrap で包まれている", () => {
    const wrapper = mountPage();
    const tables = wrapper.findAll("table");
    expect(tables).toHaveLength(11);
    expect(wrapper.findAll(".table-wrap table")).toHaveLength(11);
  });

  it("テーブル行の総数が原本と一致する（52行）", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll("tr")).toHaveLength(52);
  });

  it("ロードマップステップ（7件）が存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".step-list li")).toHaveLength(7);
  });

  it("用語集アイテム（8件）が存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".glossary-item")).toHaveLength(8);
  });

  it("免責ボックス（.disclaimer-box）が存在し、テキストが span で包括されている", () => {
    const wrapper = mountPage();
    const box = wrapper.get(".disclaimer-box");
    expect(box.exists()).toBe(true);
    expect(box.find(":scope > span").exists()).toBe(true);
  });

  it("参考文献リストが適切な件数（18件）存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".ref-list li")).toHaveLength(18);
  });
});
