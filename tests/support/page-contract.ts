// ガイドページ契約テストの共有機構。
//
// ここに置いてよいのは「アサーションの手続き」だけで、期待値そのものは
// 各ページのテストに凍結リテラルとして残す（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
// このモジュールが原本 HTML を読み込むことは禁止する。読み込んだ時点でテストが
// 原本の写しになり、転写漏れを検知できなくなる。
import { mount } from "@vue/test-utils";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type { Component } from "vue";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";

/** 図解ラッパー内の MermaidDiagram を素の <pre> に置換して chart 値を読み取る。 */
export const MermaidStub = {
  props: { chart: { type: String, required: true } },
  template: `<pre data-testid="mermaid">{{ chart }}</pre>`,
};

/** ページ SFC をマウントする関数を作る。ClientOnly を素通しにしないと図解が 0 件になる。 */
export const createMountPage = (page: Component) => () =>
  mount(page, {
    global: {
      stubs: {
        ClientOnly: { template: "<div><slot /></div>" },
        MermaidDiagram: MermaidStub,
      },
    },
  });

export type PageWrapper = ReturnType<ReturnType<typeof createMountPage>>;

/** 末尾スラッシュの有無を吸収して URL を比較する。 */
export const normalizeUrl = (url: string) => url.replace(/\/$/, "");

/**
 * Extracts trimmed text from all elements matching a selector.
 *
 * @param wrapper - The mounted page wrapper to search
 * @param selector - The selector used to find elements
 * @returns An array containing the trimmed text of each matching element
 */
export function texts(wrapper: PageWrapper, selector: string): string[] {
  return wrapper.findAll(selector).map((el) => el.text().trim());
}

/** 各ページのテストが渡す凍結リテラル一式。 */
export interface SourceParityContractInput {
  /** describe 名の接頭辞。例: "pages/capm.vue" */
  readonly suiteName: string;
  readonly page: Component;
  /** mockNuxtImport("useSeoMeta", ...) で差し替えた vi.fn()。 */
  readonly seoMeta: Mock;
  readonly h1: readonly string[];
  readonly h2: readonly string[];
  readonly h3: readonly string[];
  readonly h4: readonly string[];
  readonly h5: readonly string[];
  readonly h6: readonly string[];
  readonly externalUrls: readonly string[];
  readonly tocIds: readonly string[];
  readonly sectionEyebrows: readonly string[];
  readonly mermaidSources: readonly string[];
  /** 原本の `.callout.<variant>` の出現数。 */
  readonly calloutVariants: Readonly<Record<string, number>>;
  /**
   * 原本の `.callout.<variant>` ごとの `.callout-title` 文言と出現数。
   * 許可リスト（どの variant に付いていてもよい文言の集合）にすると、
   * variant とラベルの取り違えを素通しするため、variant 単位で凍結する。
   */
  readonly calloutLabels: Readonly<Record<string, Readonly<Record<string, number>>>>;
  readonly stepTags: readonly string[];
  /** Q-2 で useSeoMeta の title に含まれることを要求する語。 */
  readonly seoTitleFragments: readonly string[];
  /**
   * 原本の useSeoMeta の title 全文（凍結リテラル）。
   * 与えた場合は完全一致で照合する。断片一致だけでは、原本の見出しから
   * 語順・副題・区切り記号がずれても検知できないため、可能な限り指定する。
   */
  readonly seoTitle?: string;
  /** 原本に存在する正当な見出しスキップ（例: h2直下にh4がある場合など）を許可するリスト。 */
  readonly allowedHeadingSkips?: readonly string[];
  /** 原本の useSeoMeta の description 全文（凍結リテラル）。与えた場合は完全一致で照合する。 */
  readonly seoDescription?: string;
}

/**
 * Defines shared source-parity, content, design, and quality contracts for a page.
 *
 * @param contract - The page, mocks, and expected values used by the contract tests.
 *
 * @remarks
 * Call this function only once per test file because the SEO metadata call-count
 * assertion shares a hoisted mock across the file.
 */
export function defineSourceParityContract(contract: SourceParityContractInput): void {
  const {
    suiteName,
    page,
    seoMeta,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    externalUrls,
    tocIds,
    sectionEyebrows,
    mermaidSources,
    calloutVariants,
    calloutLabels,
    stepTags,
    seoTitleFragments,
    seoTitle,
    seoDescription,
  } = contract;
  const mountPage = createMountPage(page);

  describe(`${suiteName} — 原本照合契約 (S)`, () => {
    it("S-1: h2 が原本と完全一致する（順序込み）", () => {
      expect(texts(mountPage(), "h2")).toEqual([...h2]);
    });

    it("S-2: h3 が原本と完全一致する（順序込み・h4昇格を含む）", () => {
      expect(texts(mountPage(), "h3")).toEqual([...h3]);
    });

    it("S-2b: h4 が原本と完全一致する（順序込み）", () => {
      expect(texts(mountPage(), "h4")).toEqual([...h4]);
    });

    it("S-2c: 原本に無い h5 / h6 を作らない", () => {
      const wrapper = mountPage();
      expect(texts(wrapper, "h5")).toEqual([...h5]);
      expect(texts(wrapper, "h6")).toEqual([...h6]);
    });

    it("S-3: 原本の外部リンク URL が全件存在する", () => {
      const actual = new Set(
        mountPage()
          .findAll("a[href^='http']")
          .map((el) => normalizeUrl(el.attributes("href") ?? "")),
      );
      const missing = externalUrls.filter((url) => !actual.has(normalizeUrl(url)));
      expect(missing).toEqual([]);
    });

    it("S-4: 文書内の全 id が一意で、ページ内アンカーが既存の id に解決できる", () => {
      const wrapper = mountPage();
      const ids = wrapper.findAll("[id]").map((el) => el.attributes("id"));

      expect(ids.filter((id) => !id)).toEqual([]);
      expect(new Set(ids).size).toBe(ids.length);

      const allIds = new Set(ids);
      // スキップリンクは見出しではなく main#main-content を指すため対象外
      // （着地点の検証は各ページの A-1 / A-2 契約で行う）。
      const unresolved = wrapper
        .findAll("a[href^='#']:not(.skip-link)")
        .map((el) => (el.attributes("href") ?? "").slice(1))
        .filter((id) => !allIds.has(id));
      expect(unresolved).toEqual([]);
    });
  });

  describe(`${suiteName} — サイドバー操作`, () => {
    it("開いていたサイドバーをリンクで閉じた場合だけ toggle にフォーカスを戻す", async () => {
      const wrapper = mountPage();
      // ページによって id の有無が異なるため、全ページ共通のクラスで引く。
      const toggle = wrapper.get<HTMLButtonElement>(".sidebar-toggle");
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

  describe(`${suiteName} — コンテンツ契約 (C)`, () => {
    it("C-1: h1 のテキストが原本と完全一致する", () => {
      expect(texts(mountPage(), "h1")).toEqual([...h1]);
    });

    it("C-2: サイドバー TOC が原本と同じ順序・同じアンカーを持つ", () => {
      const hrefs = mountPage()
        .findAll(".sidebar-nav a")
        .map((el) => el.attributes("href"));
      expect(hrefs).toEqual(tocIds.map((id) => `#${id}`));
    });

    it("C-3: 初期状態で先頭の TOC 項目がアクティブになっている", () => {
      const active = mountPage().findAll(".sidebar-nav a.active");
      expect(active).toHaveLength(1);
      expect(active[0]?.attributes("href")).toBe(`#${tocIds[0]}`);
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

    // C-6a/c/d/e は同じ chart 文字列列を読むだけなので、マウントは 1 回に集約する。
    // DOM を書き換える C-6b は個別マウントのまま（状態を共有させない）。
    let charts: string[] = [];
    beforeAll(() => {
      charts = texts(mountPage(), '[data-testid="mermaid"]');
    });

    it("C-6a: 全図解の chart が原本の Mermaid ソースと完全一致する（順序込み）", () => {
      expect(charts).toEqual([...mermaidSources]);
    });

    it("C-6b: 全図解が .mermaid-wrap に包まれている", () => {
      const wrapper = mountPage();
      const all = wrapper.findAll('[data-testid="mermaid"]').length;
      expect(all).toBe(mermaidSources.length);
      expect(wrapper.findAll('.mermaid-wrap [data-testid="mermaid"]')).toHaveLength(all);
    });

    it("C-6c: 各図解が空でなく、共有定義にある図種別の宣言から始まる", () => {
      for (const chart of charts) {
        expect(chart.length).toBeGreaterThan(0);
        expect(chart).toMatch(MERMAID_DIAGRAM_DECLARATION);
      }
    });

    it("C-6d: 禁止構文 block-beta を使っていない", () => {
      for (const chart of charts) {
        expect(chart).not.toContain("block-beta");
      }
    });

    it("C-6e: 図解のソースが左端揃え（先頭行にインデントが無い）", () => {
      for (const chart of charts) {
        const firstLine = chart.split("\n").find((l) => l.trim().length > 0) ?? "";
        expect(firstLine).toBe(firstLine.trimStart());
      }
    });
  });

  describe(`${suiteName} — デザイン契約 (D)`, () => {
    it("D-1: callout が原本と同じ variant 構成で存在する", () => {
      const wrapper = mountPage();
      const actual: Record<string, number> = {};
      for (const el of wrapper.findAll('[data-testid="callout"]')) {
        const variant = el.attributes("data-variant") ?? "";
        actual[variant] = (actual[variant] ?? 0) + 1;
      }
      expect(actual).toEqual({ ...calloutVariants });
    });

    it("D-2: 全 callout がラベル子要素を持ち、variant ごとのラベル文言が原本と一致する", () => {
      const wrapper = mountPage();
      const callouts = wrapper.findAll('[data-testid="callout"]');
      // 期待総数は calloutVariants から導出する（callout を持たないページでも成立させる）。
      const expectedTotal = Object.values(calloutVariants).reduce((sum, n) => sum + n, 0);
      expect(callouts).toHaveLength(expectedTotal);

      const actual: Record<string, Record<string, number>> = {};
      for (const callout of callouts) {
        const label = callout.find('[data-testid="callout-label"]');
        expect(label.exists()).toBe(true);

        const variant = callout.attributes("data-variant") ?? "";
        // 未知の variant を「ラベルが一致しない」ではなく「対応表が無い」として落とす。
        expect(Object.keys(calloutLabels)).toContain(variant);

        const text = label.text().trim();
        const byLabel = (actual[variant] ??= {});
        byLabel[text] = (byLabel[text] ?? 0) + 1;
      }
      // 過不足・取り違えの双方を 1 回の完全一致で検証する。
      expect(actual).toEqual(calloutLabels);
    });

    it("D-3: step タグが原本と同じ内容・同じ順序で存在する", () => {
      expect(texts(mountPage(), '[data-testid="step-tag"]')).toEqual([...stepTags]);
    });

    it("D-5a: セクション見出しのキッカーが原本と完全一致する", () => {
      expect(texts(mountPage(), '[data-testid="section-eyebrow"]')).toEqual([...sectionEyebrows]);
    });
  });

  describe(`${suiteName} — 品質契約 (Q)`, () => {
    // Q-2 ケースはテストファイル全体で単一の hoisted された seoMeta モックを共有しているため、
    // 各テストファイルで defineSourceParityContract を複数回呼び出すと call-count 検証が順序依存になる。
    it("Q-2: useSeoMeta の title / description が空でなく、title が h1 と整合する", () => {
      seoMeta.mockClear();
      mountPage();

      expect(seoMeta).toHaveBeenCalledTimes(1);
      const meta = seoMeta.mock.calls[0]?.[0] as { title?: string; description?: string };

      expect(meta?.title ?? "").not.toBe("");
      expect(meta?.description ?? "").not.toBe("");
      for (const fragment of seoTitleFragments) {
        expect(meta?.title).toContain(fragment);
      }
      // 全文を凍結しているページは完全一致で固定する（断片一致は取りこぼす）。
      if (seoTitle !== undefined) expect(meta?.title).toBe(seoTitle);
      if (seoDescription !== undefined) expect(meta?.description).toBe(seoDescription);
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
      const allowed = contract.allowedHeadingSkips ?? [];
      const actualSkips = skips.filter((s) => !allowed.includes(s));
      expect(actualSkips).toEqual([]);
    });
  });
}
