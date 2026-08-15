// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";
import Page from "~/pages/certified-associate-in-project-management-domain1.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
] as const;

const EXPECTED_H2 = [
  "CAPM試験の全体像",
  "ドメイン1の構造",
  "Task 1: プロジェクトのライフサイクルとプロセスの理解",
  "Task 2: プロジェクトマネジメント計画の理解",
  "Task 3: プロジェクトの役割と責任の理解",
  "Task 4: 計画された戦略・フレームワークの実行方法の決定",
  "Task 5: 一般的な問題解決ツールと技法の理解",
  "ドメイン1 学習・試験対策のベストプラクティス",
  "参考文献・出典(References)",
] as const;

const EXPECTED_H3 = [
  "0.1 試験概要",
  "0.2 4ドメインの配点",
  "0.3 公式参考文献リスト",
  "1.1 プロジェクト・プログラム・ポートフォリオの違い",
  "1.2 プロジェクトと定常業務(オペレーション)の違い",
  "1.3 予測型(Predictive)と適応型(Adaptive)アプローチの違い",
  "1.4 課題・リスク・前提条件・制約条件の違い(通称IRAC)",
  "1.5 プロジェクトスコープのレビュー/批評",
  "1.6 PMIの倫理・職業行動規範(Code of Ethics and Professional Conduct)の適用",
  "1.7 プロジェクトが変化の手段であること",
  "2.1 コスト・品質・リスク・スケジュール等の目的と重要性",
  "2.2 プロジェクトマネジメント計画 vs プロダクトマネジメント計画",
  "2.3 マイルストーンとタスク期間の違い",
  "2.4 プロジェクトにおけるリソースの数と種類の決定",
  "2.5 リスク登録簿(Risk Register)の活用",
  "2.6 ステークホルダー登録簿(Stakeholder Register)の活用",
  "2.7 プロジェクトの終結と移行",
  "3.1 プロジェクトマネージャーとプロジェクトスポンサーの役割比較",
  "3.2 プロジェクトチームとプロジェクトスポンサーの役割比較",
  "3.3 プロジェクトマネージャーが担う多様な役割",
  "3.4 リーダーシップとマネジメントの違い",
  "3.5 感情知能(EQ: Emotional Intelligence)とプロジェクトマネジメントへの影響",
  "4.1 計画された戦略・フレームワークへの適切な対応例",
  "4.2 プロジェクト立上げとベネフィットプランニング",
  "5.1 会議の効果性の評価",
  "5.2 フォーカスグループ、スタンドアップミーティング、ブレインストーミングの目的",
] as const;

const EXPECTED_H4 = [
  "プロジェクトマネジメントへの影響",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["CAPM試験 135採点問題"] --> B["ドメイン1 PM基礎と主要概念 36%"]
A --> C["ドメイン2 予測型計画ベース手法 17%"]
A --> D["ドメイン3 アジャイルフレームワーク手法 20%"]
A --> E["ドメイン4 ビジネス分析フレームワーク 27%"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;`,
  `flowchart TB
S["組織の戦略目標"] --> P["ポートフォリオ Portfolio"]
P --> PG1["プログラムA Program"]
P --> PJ1["単独プロジェクトX プログラムに属さない"]
PG1 --> PJ2["プロジェクトA-1"]
PG1 --> PJ3["プロジェクトA-2"]
PG1 --> OPS["関連する定常業務"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class P hub;
class S,PG1,PJ1,PJ2,PJ3,OPS box;`,
  `flowchart LR
A["予測型 Predictive"] --- B["ハイブリッド型 Hybrid"] --- C["適応型 Adaptive"]
A2["要件が安定 明確"] -.- A
C2["要件が不確実 変化前提"] -.- C

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,C box;
class B hub;
class A2,C2 box;`,
  `flowchart TB
COE["PMI Code of Ethics and Professional Conduct"] --> R1["責任 Responsibility"]
COE --> R2["尊重 Respect"]
COE --> R3["公正 Fairness"]
COE --> R4["誠実 Honesty"]
R1 --> A1["向上目標基準"]
R1 --> M1["必須基準"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class COE hub;
class R1,R2,R3,R4,A1,M1 box;`,
  `flowchart LR
A["リスクの特定"] --> B["定性的リスク分析 発生確率×影響度"]
B --> C["リスク対応計画の策定"]
C --> D["リスク登録簿への記録"]
D --> E["リスクの監視 コントロール"]
E -->|"新規リスク発見"| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D,E done;`,
  `flowchart LR
A["最終成果物の検証 受入"] --> B["契約の終結 調達がある場合"]
B --> C["教訓レッスンズラーンドの収集"]
C --> D["資源の解放"]
D --> E["運用部門等への引き継ぎ 移行"]
E --> F["行政上の終結 文書のアーカイブ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;
class F done;`,
  `flowchart TB
PM["プロジェクトマネージャー"] --- R1["開始者"]
PM --- R2["交渉者"]
PM --- R3["傾聴者"]
PM --- R4["コーチ"]
PM --- R5["実務メンバー"]
PM --- R6["ファシリテーター"]

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class PM hub;
class R1,R2,R3,R4,R5,R6 box;`,
  `flowchart LR
A["ビジネスケースの作成"] --> B["プロジェクト憲章の作成 承認"]
B --> C["ベネフィットマネジメント計画の策定"]
C --> D["プロジェクトのキックオフ"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/about/what-is-project-management",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf",
  "https://www.pmi.org/about/ethics/guidelines",
] as const;

const EXPECTED_EYEBROWS = [
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

const EXPECTED_TOC_ITEMS = [
  { href: "#exam-overview", text: "試験の全体像" },
  { href: "#domain1-structure", text: "ドメイン1の構造" },
  { href: "#task1-lifecycle", text: "Task1: ライフサイクルとプロセス" },
  { href: "#task2-planning", text: "Task2: PM計画の理解" },
  { href: "#task3-roles", text: "Task3: 役割と責任" },
  { href: "#task4-strategy-execution", text: "Task4: 戦略の実行" },
  { href: "#task5-problem-solving", text: "Task5: 問題解決の技法" },
  { href: "#study-best-practices", text: "学習・試験対策" },
  { href: "#references", text: "参考文献・出典" },
] as const;

function normalizeMermaidSource(raw: string): string {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)?.trim() === "") lines.pop();
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(commonIndent).trimEnd()).join("\n");
}

const MermaidStub = defineComponent({
  props: {
    chart: { type: String, required: true },
    theme: { type: String, default: "base" },
    themeVariables: { type: Object, default: () => ({}) },
  },
  template: '<pre data-testid="mermaid">{{ chart }}</pre>',
});

const IconStub = defineComponent({
  props: { name: { type: String, required: false } },
  template: '<i :class="name" aria-hidden="true" />',
});

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: {
        MermaidDiagram: MermaidStub,
        ClientOnly: { template: "<div><slot /></div>" },
        Icon: IconStub,
        NuxtLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });

describe("pages/certified-associate-in-project-management-domain1.vue — 契約テスト", () => {
  it("S-1: h2 の見出しが原本と順序込みで完全一致する", () => {
    const actual = mountPage()
      .findAll("h2")
      .map((el) => el.text().trim());
    expect(actual).toEqual([...EXPECTED_H2]);
  });

  it("S-2: h3 の見出しが原本と順序込みで完全一致する", () => {
    const actual = mountPage()
      .findAll("h3")
      .map((el) => el.text().trim());
    expect(actual).toEqual([...EXPECTED_H3]);
  });

  it("S-3: 原本の外部リンク URL が全件存在する", () => {
    const hrefs = mountPage()
      .findAll("a[href^='http']")
      .map((el) => el.attributes("href"));
    for (const url of EXPECTED_EXTERNAL_URLS) {
      expect(hrefs).toContain(url);
    }
  });

  it("S-4: 全 h2/h3 が一意な id を持ち、TOC のアンカーが全て実在する見出しまたはセクションを指す", () => {
    const wrapper = mountPage();
    const sectionIds = new Set(
      wrapper
        .findAll("section[id], h2[id], h3[id]")
        .map((el) => el.attributes("id")),
    );
    for (const item of EXPECTED_TOC_ITEMS) {
      const targetId = item.href.replace(/^#/, "");
      expect(sectionIds.has(targetId)).toBe(true);
    }
  });

  it("C-1: h1 のテキストが完全一致する", () => {
    const actual = mountPage()
      .findAll("h1")
      .map((el) => el.text().trim());
    expect(actual).toEqual([...EXPECTED_H1]);
  });

  it("C-2: クイックナビ（TOC リンク）の件数と href 形式を固定する", () => {
    const links = mountPage().findAll(".sidebar-nav a");
    expect(links.length).toBe(EXPECTED_TOC_ITEMS.length);
    const actual = links.map((el) => ({
      href: el.attributes("href"),
      text: el.text().trim(),
    }));
    expect(actual).toEqual([...EXPECTED_TOC_ITEMS]);
  });

  it("C-3: サイドバー TOC の初期アクティブ状態を示すクラスが存在する", () => {
    const activeLinks = mountPage().findAll(".sidebar-nav a.active");
    expect(activeLinks.length).toBeGreaterThanOrEqual(1);
    expect(activeLinks[0].attributes("href")).toBe(EXPECTED_TOC_ITEMS[0].href);
  });

  it("C-4: 外部リンク全件に target='_blank' かつ rel='noopener' が付与されている", () => {
    const externalLinks = mountPage().findAll("a[href^='http']");
    expect(externalLinks.length).toBeGreaterThan(0);
    for (const link of externalLinks) {
      expect(link.attributes("target")).toBe("_blank");
      expect(link.attributes("rel")).toContain("noopener");
    }
  });

  it("C-5: 内部リンクに .html 拡張子が含まれない", () => {
    const internalLinks = mountPage()
      .findAll("a:not([href^='http'])")
      .map((el) => el.attributes("href") ?? "");
    for (const href of internalLinks) {
      expect(href).not.toMatch(/\.html(?:#|$)/);
    }
  });

  it("C-6a: Mermaid ソースが原本と順序・内容・出現回数込みで完全一致する", () => {
    const actual = mountPage()
      .findAll('[data-testid="mermaid"]')
      .map((el) => normalizeMermaidSource(el.text()));
    expect(actual).toEqual([...EXPECTED_MERMAID_SOURCES]);
  });

  it("C-6b: 全 Mermaid 図解がページ専用ラッパーに包まれている", () => {
    const wrapper = mountPage();
    const all = wrapper.findAll('[data-testid="mermaid"]').length;
    const wrapped = wrapper.findAll('.mermaid-wrap [data-testid="mermaid"]').length;
    expect(wrapped).toBe(all);
    expect(all).toBe(8);
  });

  it("C-6c: 各図解が空でなく、図種別の宣言から始まる", () => {
    for (const el of mountPage().findAll('[data-testid="mermaid"]')) {
      const chart = el.text().trim();
      expect(chart.length).toBeGreaterThan(0);
      expect(chart).toMatch(MERMAID_DIAGRAM_DECLARATION);
    }
  });

  it("C-6d: 禁止構文 block-beta を使っていない", () => {
    for (const el of mountPage().findAll('[data-testid="mermaid"]')) {
      expect(el.text()).not.toContain("block-beta");
    }
  });

  it("C-6e: 図解のソースが左端揃え（先頭行にインデントが無い）", () => {
    for (const el of mountPage().findAll('[data-testid="mermaid"]')) {
      const firstLine = el.text().split("\n").find((l) => l.trim().length > 0) ?? "";
      expect(firstLine).toBe(firstLine.trimStart());
    }
  });

  it("D-1: callout が data-variant で区別され原本の種別・件数と一致する", () => {
    const wrapper = mountPage();
    const sourceCallouts = wrapper.findAll('.callout[data-variant="source"], .callout.source');
    const practiceCallouts = wrapper.findAll('.callout[data-variant="practice"], .callout.practice');
    expect(sourceCallouts.length).toBe(25);
    expect(practiceCallouts.length).toBe(21);
    expect(sourceCallouts.length + practiceCallouts.length).toBe(46);
  });

  it("D-2: callout のタイトルラベルが原本と一致する", () => {
    const titles = mountPage()
      .findAll(".callout .callout-title")
      .map((el) => el.text().trim());
    expect(titles.length).toBe(46);
    for (const title of titles) {
      expect(["ソース", "ベストプラクティス"]).toContain(title);
    }
  });

  it("D-3: 統計カードが 4 件存在する", () => {
    const cards = mountPage().findAll(".stat-card");
    expect(cards.length).toBe(4);
  });

  it("D-5: section-eyebrow が順序込みで完全一致する", () => {
    const actual = mountPage()
      .findAll(".section-eyebrow")
      .map((el) => el.text().trim());
    expect(actual).toEqual([...EXPECTED_EYEBROWS]);
  });

  it("Q-1: TOC のスクロール連動用 ID 配列が全セクションを網羅している", () => {
    const expectedIds = EXPECTED_TOC_ITEMS.map((item) => item.href.replace(/^#/, ""));
    const wrapper = mountPage();
    for (const id of expectedIds) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true);
    }
  });

  it("Q-2: useSeoMeta の title / description が正しく設定されている", () => {
    mountPage();
    expect(seoMeta).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("CAPM® ドメイン1"),
        description: expect.stringContaining("CAPM"),
      }),
    );
  });

  it("Q-3: 見出し階層が飛ばない（h1 → h2 → h3 → h4 の順）", () => {
    const headings = mountPage()
      .findAll("h1, h2, h3, h4, h5, h6")
      .map((el) => Number(el.element.tagName.replace(/^H/, "")));
    expect(headings.length).toBe(1 + EXPECTED_H2.length + EXPECTED_H3.length + EXPECTED_H4.length);
    let prevLevel = 0;
    for (const level of headings) {
      if (prevLevel > 0) {
        expect(level - prevLevel).toBeLessThanOrEqual(1);
      }
      prevLevel = level;
    }
  });
});
