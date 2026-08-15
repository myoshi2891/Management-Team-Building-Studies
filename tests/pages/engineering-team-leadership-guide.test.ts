// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";
import Page from "~/pages/engineering-team-leadership-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "エンジニアリングチームのリード術",
] as const;

const EXPECTED_H2 = [
  "リーダーシップの土台を理解する",
  "効果的なチームを支える科学的根拠",
  "エンジニアリングリーダーの役割を理解する",
  "新任リーダーの最初のステップ",
  "1on1とフィードバックの技術",
  "チームの実行力を高めるシステム思考",
  "コードレビュー文化を築く",
  "よくあるアンチパターンと回避策",
  "継続的な成長とネクストステップ",
  "まとめ",
  "参考文献・出典",
] as const;

// 参考文献セクションの h4 3 件を a11y 基準（Q-3）に従い h3 に昇格させ全 12 件
const EXPECTED_H3 = [
  "Efficiency・Effectiveness・Productivityの違い",
  "3つのEモデル: Enable → Empower → Expand",
  "Project Oxygen: 優れたマネージャーの10の行動",
  "Project Aristotle: 効果的なチームの5つの力学",
  "テックリード・エンジニアリングマネージャー・TLMの違い",
  "キャリアラダーとしての管理職パス",
  "週次1on1という「揺るがない予定」",
  "Radical Candor: ケア・パーソナリーとチャレンジ・ダイレクトリー",
  "委譲の判断フレームワーク",
  "書籍・出版社",
  "Google re:Work / Engineering Practices",
  "著名なエンジニアリングリーダーの記事・インタビュー",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["Enable 土台を整える"] --> B["Empower 力を引き出す"]
    B --> C["Expand 範囲を広げる"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C box;`,
  `flowchart TB
    PS["心理的安全性 Psychological Safety"] --> D["相互信頼性 Dependability"]
    PS --> S["構造と明確さ Structure and Clarity"]
    PS --> M["仕事の意味 Meaning"]
    PS --> I["インパクト Impact"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class PS hub;
    class D,S,M,I box;`,
  `flowchart TB
    IC["ソフトウェアエンジニア"] --> TL["テックリード"]
    TL --> EM["エンジニアリングリード 初めての管理職"]
    EM --> SM["シニアマネージャー マネージャーのマネージャー"]
    SM --> DIR["ディレクター"]
    DIR --> VP["VPエンジニアリング"]
    VP --> CTO["CTO"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class IC,TL,EM,SM,DIR,VP box;
    class CTO done;`,
  `flowchart TB
    Start["新任エンジニアリングマネージャー"] --> A["チームビルディングと育成"]
    Start --> B["成果を出す仕組みづくり"]
    Start --> C["コラボレーションと連携"]
    Start --> D["ビジョンの共有"]
    Start --> E["自己成長"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class Start hub;
    class A,B,C,D,E box;`,
  `flowchart TB
    Task["タスクが発生"] --> Q1{"発生頻度は高いか"}
    Q1 -- はい --> Q2{"複雑さは高いか"}
    Q1 -- いいえ --> Q3{"複雑さは高いか"}
    Q2 -- はい --> R1["人材育成の機会として委譲する"]
    Q2 -- いいえ --> R2["すぐに手放し 仕組み化する"]
    Q3 -- はい --> R3["自分で対応しつつ知見を共有する"]
    Q3 -- いいえ --> R4["まとめて処理するか委譲する"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Task hub;
    class Q1,Q2,Q3 box;
    class R1,R2,R3,R4 done;`,
  `flowchart TB
    A["変更 CL PRを作成する"] --> B["小さく自己完結した変更に分割する"]
    B --> C["レビューを依頼する"]
    C --> D{"コードの健全性は向上するか"}
    D -- はい --> E["LGTM Looks Good To Me で承認"]
    D -- いいえ --> F["建設的なコメントで改善を依頼する"]
    F --> B
    E --> G["マージして次の変更へ"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,F box;
    class E,G done;`,
  `flowchart TB
    AP["効果性を損なうアンチパターン"] --> IND["個人レベル"]
    AP --> PRA["プラクティスレベル"]
    AP --> STR["構造レベル"]
    AP --> LEAD["リーダーシップレベル"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class AP hub;
    class IND,PRA,STR,LEAD box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/leading-effective-engineering/9781098148232/",
  "https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers",
  "https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness",
  "https://www.shortform.com/blog/the-managers-path-camille-fournier/",
  "https://www.welcometothejungle.com/en/articles/btc-manager-path-camille-fournier",
  "https://blog.pragmaticengineer.com/checklist-for-first-time-managers/",
  "https://www.welcometothejungle.com/en/articles/btc-michael-lopp-interview-management",
  "https://www.radicalcandor.com/our-approach",
  "https://press.stripe.com/an-elegant-puzzle",
  "https://google.github.io/eng-practices/review/reviewer/standard.html",
] as const;

const EXPECTED_TOC_IDS = [
  "leadership-foundations",
  "team-effectiveness-science",
  "leadership-roles",
  "first-90-days",
  "one-on-ones-feedback",
  "systems-thinking",
  "code-review-culture",
  "antipatterns",
  "continuous-growth",
  "summary",
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
] as const;

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { note: 4, source: 9, practice: 3 } as const;

const EXPECTED_CALLOUT_LABELS = ["補足", "ソース", "ベストプラクティス"] as const;

const EXPECTED_STEP_TAGS = [
  "1", "2", "3", "4", "5",
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
] as const;

/** 図解ラッパー内の MermaidDiagram を素の <pre> に置換して chart 値を読み取る。 */
const MermaidStub = {
  props: { chart: { type: String, required: true } },
  template: `<pre data-testid="mermaid">{{ chart }}</pre>`,
};

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: {
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

describe("pages/engineering-team-leadership-guide.vue — 原本照合契約 (S)", () => {
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

  it("S-4: 文書内の全 id が一意で、TOC のアンカーが実在の見出しを指す", () => {
    const wrapper = mountPage();
    const ids = wrapper.findAll("[id]").map((el) => el.attributes("id"));

    expect(ids.filter((id) => !id)).toEqual([]);
    expect(new Set(ids).size).toBe(ids.length);

    const headingIds = new Set(
      wrapper
        .findAll("h2, h3")
        .map((el) => el.attributes("id") || el.element.closest("section")?.id)
        .filter((id): id is string => Boolean(id)),
    );
    const unresolved = wrapper
      .findAll("a[href^='#']")
      .map((el) => (el.attributes("href") ?? "").slice(1))
      .filter((id) => !headingIds.has(id));
    expect(unresolved).toEqual([]);
  });
});

describe("pages/engineering-team-leadership-guide.vue — サイドバー操作", () => {
  it("開いていたサイドバーをリンクで閉じた場合だけ toggle にフォーカスを戻す", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get<HTMLButtonElement>("#sidebarToggle");
    const focus = vi.spyOn(toggle.element, "focus");
    const firstLink = wrapper.get(".sidebar-nav a");

    await firstLink.trigger("click");
    await wrapper.vm.$nextTick();
    expect(focus).not.toHaveBeenCalled();

    await toggle.trigger("click");
    await firstLink.trigger("click");
    await wrapper.vm.$nextTick();
    expect(focus).toHaveBeenCalledTimes(1);
  });
});

describe("pages/engineering-team-leadership-guide.vue — コンテンツ契約 (C)", () => {
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

describe("pages/engineering-team-leadership-guide.vue — デザイン契約 (D)", () => {
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

describe("pages/engineering-team-leadership-guide.vue — 品質契約 (Q)", () => {
  it("Q-2: useSeoMeta の title / description が空でなく、title が h1 と整合する", () => {
    seoMeta.mockClear();
    mountPage();

    expect(seoMeta).toHaveBeenCalledTimes(1);
    const meta = seoMeta.mock.calls[0]?.[0] as { title?: string; description?: string };

    expect(meta?.title ?? "").not.toBe("");
    expect(meta?.description ?? "").not.toBe("");
    expect(meta?.title).toContain("エンジニアリングチーム");
    expect(meta?.title).toContain("リード術");
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
