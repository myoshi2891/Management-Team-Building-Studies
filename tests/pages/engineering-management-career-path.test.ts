// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
//   見出し配列: audit_source_parity.mjs --emit-headings の出力を貼り付け
//   その他:     同じ正規化規則で抽出したもの
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";
import Page from "~/pages/engineering-management-career-path.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアのためのマネジメントキャリアパス",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "マネジメントキャリアの全体像(デュアルキャリアラダー)",
  "各役職の詳細解説",
  "自分はマネジメントに向いているか(判断チェックリスト)",
  "マネージャーになる前の準備: テックリードという助走路",
  "新任マネージャーの最初の90日",
  "マネージャーのコアプラクティス",
  "優れたマネージャーの共通点(Google Project Oxygen)",
  "よくある失敗と対処法",
  "ICとマネジメントを行き来する「振り子」というキャリア戦略",
  "スキルロードマップまとめ表",
  "参考文献・情報源",
] as const;

// 参考文献セクションの h4 4 件を a11y 基準（Q-3）に従い h3 に昇格させ全 15 件
const EXPECTED_H3 = [
  "2.1 全体のキャリアフロー図",
  "2.2 ICトラックとマネジメントトラックの対応関係(目安)",
  "3.1 テックリード(Tech Lead)",
  "3.2 エンジニアリングマネージャー(EM)",
  "3.3 シニアEM / マネージャーオブマネージャーズ",
  "3.4 ディレクター",
  "3.5 VPオブエンジニアリング / CTO",
  "7.1 1on1ミーティング",
  "7.2 委任(デリゲーション)",
  "7.3 フィードバックと評価",
  "7.4 採用",
  "書籍",
  "ブログ・記事",
  "企業・調査レポート",
  "その他リソース",
] as const;

const EXPECTED_H4 = [
] as const;

const EXPECTED_H5 = [
] as const;

const EXPECTED_H6 = [
] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["ソフトウェアエンジニア"] --> B["シニアソフトウェアエンジニア"]
    B --> C{"キャリアの分岐点"}
    C -->|"技術を極める"| D1["スタッフエンジニア"]
    D1 --> D2["シニアスタッフ・プリンシパルエンジニア"]
    D2 --> D3["ディスティングイッシュトエンジニア・フェロー"]
    C -->|"人と組織を率いる"| E1["テックリード"]
    E1 --> E2["エンジニアリングマネージャー"]
    E2 --> E3["シニアEM / マネージャーオブマネージャーズ"]
    E3 --> E4["ディレクター"]
    E4 --> E5["VPオブエンジニアリング"]
    E5 --> E6["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,D1,D2,E1,E2,E3,E4,E5 box;
    class C hub;
    class D3,E6 done;`,
  `flowchart TB
    S1["1週目 傾聴に徹する 1on1で期待値とチームの状況をヒアリング"] --> S2["2〜4週目 シグナル収集 コード・プロセス・人間関係を観察する"]
    S2 --> S3["30日目 30-60-90日プランを作成しチームと共有する"]
    S3 --> S4["60日目 小さな成功体験を積み重ね信頼を構築する"]
    S4 --> S5["90日目 マネジメントスタイルを確立しフィードバックの循環をつくる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4 box;
    class S5 done;`,
  `flowchart LR
    A["個人貢献者ICとして技術力を磨く期間"] --> B["テックリードとして技術と組織の橋渡しをする期間"]
    B --> C["エンジニアリングマネージャーとして人と組織を育てる期間"]
    C -.->|"スキルの陳腐化を避けるため一定期間で技術側へ戻る"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C box;
    class B hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
  "https://www.juliezhuo.com/book/manager.html",
  "https://www.amazon.com/Staff-Engineer-Leadership-beyond-management/dp/1736417916",
  "https://resilient-management.com/",
  "https://skamille.spicytakes.org/",
  "https://lethain.com/path-to-eng-manager-of-managers/",
  "https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/",
  "https://blog.pragmaticengineer.com/what-becoming-an-engineering-manager-is-like/",
  "https://newsletter.pragmaticengineer.com/p/staying-technical",
  "https://larahogan.me/management/",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
  "https://www.engguidebook.com/",
  "https://www.nidup.io/garden/engineering-career-ladders/",
] as const;

const EXPECTED_TOC_IDS = [
  "introduction",
  "career-path-overview",
  "role-descriptions",
  "self-assessment",
  "tech-lead-preparation",
  "first-90-days",
  "core-practices",
  "project-oxygen",
  "common-pitfalls",
  "engineer-manager-pendulum",
  "skill-roadmap",
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
] as const;

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { note: 3 } as const;

const EXPECTED_CALLOUT_LABELS = ["補足", "重要な示唆"] as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5"] as const;

/** 図解ラッパー内の MermaidDiagram を素の <pre> に置換して chart 値を読み取る。 */
const MermaidStub = {
  props: { chart: { type: String, required: true } },
  template: `<pre data-testid="mermaid">{{ chart }}</pre>`,
};

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: {
        // ClientOnly を素通しにしないと図解が 0 件になる。
        ClientOnly: { template: "<div><slot /></div>" },
        MermaidDiagram: MermaidStub,
      },
    },
  });

/** 末尾スラッシュの有無を吸収して URL を比較する。 */
const normalizeUrl = (url: string) => url.replace(/\/$/, "");

function texts(wrapper: ReturnType<typeof mountPage>, selector: string): string[] {
  return wrapper.findAll(selector).map((el) => el.text().trim());
}

describe("pages/engineering-management-career-path.vue — 原本照合契約 (S)", () => {
  it("S-1: h2 が原本と完全一致する（順序込み）", () => {
    expect(texts(mountPage(), "h2")).toEqual([...EXPECTED_H2]);
  });

  it("S-2: h3 が原本と完全一致する（順序込み・h4昇格を含む）", () => {
    expect(texts(mountPage(), "h3")).toEqual([...EXPECTED_H3]);
  });

  it("S-2b: h4 を残さない（昇格済み）", () => {
    expect(texts(mountPage(), "h4")).toEqual([...EXPECTED_H4]);
  });

  it("S-2c: 原本に無い h5 / h6 を作らない", () => {
    const wrapper = mountPage();
    expect(texts(wrapper, "h5")).toEqual([...EXPECTED_H5]);
    expect(texts(wrapper, "h6")).toEqual([...EXPECTED_H6]);
  });

  it("S-3: 原本の外部リンク URL が全件存在する", () => {
    const actual = new Set(
      mountPage()
        .findAll("a[href^='http']")
        .map((el) => normalizeUrl(el.attributes("href") ?? "")),
    );
    const missing = EXPECTED_EXTERNAL_URLS.filter((url) => !actual.has(normalizeUrl(url)));
    expect(missing).toEqual([]);
  });

  it("S-4: 全 h2/h3 が一意な id を持ち、TOC のアンカーが実在の見出しを指す", () => {
    const wrapper = mountPage();
    const ids = wrapper.findAll("h2, h3").map((el) => el.attributes("id"));

    expect(ids.filter((id) => !id)).toEqual([]);
    expect(new Set(ids).size).toBe(ids.length);

    const headingIds = new Set(ids);
    const unresolved = wrapper
      .findAll("a[href^='#']")
      .map((el) => (el.attributes("href") ?? "").slice(1))
      .filter((id) => !headingIds.has(id));
    expect(unresolved).toEqual([]);
  });
});

describe("pages/engineering-management-career-path.vue — コンテンツ契約 (C)", () => {
  it("C-1: h1 のテキストが原本と完全一致する", () => {
    expect(texts(mountPage(), "h1")).toEqual([...EXPECTED_H1]);
  });

  it("C-2: サイドバー TOC が原本と同じ順序・同じアンカーを持つ", () => {
    const hrefs = mountPage()
      .findAll(".sidebar-nav a")
      .map((el) => el.attributes("href"));
    expect(hrefs).toEqual(EXPECTED_TOC_IDS.map((id) => `#${id}`));
  });

  it("C-3: 初期状態で先頭の TOC 項目がアクティブになっている", () => {
    const active = mountPage().findAll(".sidebar-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.attributes("href")).toBe(`#${EXPECTED_TOC_IDS[0]}`);
  });

  it("C-4: 外部リンク全件が target=_blank かつ rel に noopener を含む", () => {
    const offenders = mountPage()
      .findAll("a[href^='http']")
      .filter((el) => {
        const rel = el.attributes("rel") ?? "";
        return el.attributes("target") !== "_blank" || !rel.split(/\s+/).includes("noopener");
      })
      .map((el) => el.attributes("href"));
    expect(offenders).toEqual([]);
  });

  it("C-5: 内部リンクに .html 拡張子が含まれない", () => {
    const offenders = mountPage()
      .findAll("a")
      .map((el) => el.attributes("href") ?? "")
      .filter((href) => !href.startsWith("http") && href.includes(".html"));
    expect(offenders).toEqual([]);
  });

  it("C-6a: 全図解の chart が原本の Mermaid ソースと完全一致する（順序込み）", () => {
    expect(texts(mountPage(), '[data-testid="mermaid"]')).toEqual([...EXPECTED_MERMAID_SOURCES]);
  });

  it("C-6b: 全図解が .mermaid-wrap に包まれている", () => {
    const wrapper = mountPage();
    const all = wrapper.findAll('[data-testid="mermaid"]').length;
    expect(all).toBe(EXPECTED_MERMAID_SOURCES.length);
    expect(wrapper.findAll('.mermaid-wrap [data-testid="mermaid"]')).toHaveLength(all);
  });

  it("C-6c: 各図解が空でなく、共有定義にある図種別の宣言から始まる", () => {
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      expect(chart.length).toBeGreaterThan(0);
      expect(chart).toMatch(MERMAID_DIAGRAM_DECLARATION);
    }
  });

  it("C-6d: 禁止構文 block-beta を使っていない", () => {
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      expect(chart).not.toContain("block-beta");
    }
  });

  it("C-6e: 図解のソースが左端揃え（先頭行にインデントが無い）", () => {
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      const firstLine = chart.split("\n").find((l) => l.trim().length > 0) ?? "";
      expect(firstLine).toBe(firstLine.trimStart());
    }
  });
});

describe("pages/engineering-management-career-path.vue — デザイン契約 (D)", () => {
  it("D-1: callout が原本と同じ variant 構成で存在する", () => {
    const wrapper = mountPage();
    const actual: Record<string, number> = {};
    for (const el of wrapper.findAll('[data-testid="callout"]')) {
      const variant = el.attributes("data-variant") ?? "";
      actual[variant] = (actual[variant] ?? 0) + 1;
    }
    expect(actual).toEqual({ ...EXPECTED_CALLOUT_VARIANTS });
  });

  it("D-2: 全 callout がラベル子要素を持ち、ラベル文言が原本と一致する", () => {
    const wrapper = mountPage();
    const callouts = wrapper.findAll('[data-testid="callout"]');
    expect(callouts.length).toBeGreaterThan(0);

    for (const callout of callouts) {
      const label = callout.find('[data-testid="callout-label"]');
      expect(label.exists()).toBe(true);
      expect(EXPECTED_CALLOUT_LABELS).toContain(label.text().trim());
    }
  });

  it("D-3: step タグが原本と同じ内容・同じ順序で存在する", () => {
    expect(texts(mountPage(), '[data-testid="step-tag"]')).toEqual([...EXPECTED_STEP_TAGS]);
  });

  it("D-5a: セクション見出しのキッカーが原本と完全一致する", () => {
    expect(texts(mountPage(), '[data-testid="section-eyebrow"]')).toEqual([
      ...EXPECTED_SECTION_EYEBROWS,
    ]);
  });
});

describe("pages/engineering-management-career-path.vue — 品質契約 (Q)", () => {
  it("Q-2: useSeoMeta の title / description が空でなく、title が h1 と整合する", () => {
    seoMeta.mockClear();
    mountPage();

    expect(seoMeta).toHaveBeenCalledTimes(1);
    const meta = seoMeta.mock.calls[0]?.[0] as { title?: string; description?: string };

    expect(meta?.title ?? "").not.toBe("");
    expect(meta?.description ?? "").not.toBe("");
    expect(meta?.title).toContain("エンジニア");
    expect(meta?.title).toContain("マネジメント");
  });

  it("Q-3: 見出し階層が飛ばない（h1 → h3 のようなスキップが無い）", () => {
    const levels = mountPage()
      .findAll("h1, h2, h3, h4, h5, h6")
      .map((el) => Number(el.element.tagName.slice(1)));

    let previous = 0;
    const skips: string[] = [];
    for (const level of levels) {
      if (previous && level > previous + 1) skips.push(`h${previous} -> h${level}`);
      previous = level;
    }
    expect(skips).toEqual([]);
  });
});
