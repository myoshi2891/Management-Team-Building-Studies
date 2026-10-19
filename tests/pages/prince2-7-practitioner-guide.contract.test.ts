// 原本から実装前に抽出した固定期待値。実行時に原本を読まない。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import expected from "../fixtures/prince2-7-practitioner-contract.json";
import Page from "~/pages/prince2-7-practitioner-guide.vue";

const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);
defineSourceParityContract({ ...expected.contract, suiteName: "pages/prince2-7-practitioner-guide.vue", page: Page, seoMeta });

const mountPage = createMountPage(Page);
describe("PRINCE2 Practitioner — 全文・図解設定", () => {
  it("本文カラムの全テキストが原本と一致する（図解の非同期表示部分のみ除外）", () => {
    const main = mountPage().get("main").element.cloneNode(true) as HTMLElement;
    main.querySelectorAll('[data-testid="mermaid"], .diagram-loading').forEach(n => n.remove());
    expect((main.textContent ?? "").replace(/\s+/g, "")).toBe(expected.mainText);
  });
  it("全 h2/h3/h4 が一意で空でない id を持つ", () => {
    const ids = mountPage().findAll("h2,h3,h4").map(n => n.attributes("id"));
    expect(ids.every(Boolean)).toBe(true); expect(new Set(ids).size).toBe(ids.length);
  });
  it("LOタグの配点・順序を保持する", () => {
    expect(mountPage().findAll(".domain-tag").map(n => n.text())).toEqual(expected.domainTags);
  });
  it("全図の themeVariables が円グラフの色・文字色を含め原本と完全一致する", () => {
    const Diagram = { name: "DiagramContract", props: ["chart", "theme", "themeVariables"], template: "<div />" };
    const wrapper = mount(Page, { global: { stubs: { ClientOnly: { template: "<div><slot /></div>" }, MermaidDiagram: Diagram } } });
    const actual = wrapper.findAllComponents(Diagram).map(n => ({ chart: n.props("chart"), theme: n.props("theme"), vars: n.props("themeVariables") }));
    expect(actual).toEqual(expected.contract.mermaidSources.map(chart => ({ chart, theme: "base", vars: {
        background: "transparent",
        primaryColor: "#EEF1F8",
        primaryBorderColor: "#2E3F72",
        primaryTextColor: "#161B26",
        lineColor: "#2E3F72",
        secondaryColor: "#FAF1DF",
        secondaryBorderColor: "#B8802A",
        tertiaryColor: "#FFFFFF",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
        fontSize: "16px",
        pie1: "#C7D1EA",
        pie2: "#AEDBD6",
        pie3: "#F0D9A6",
        pie4: "#E7C0D0",
        pieOpacity: "1",
        pieStrokeColor: "#FFFFFF",
        pieStrokeWidth: "2px",
        pieOuterStrokeWidth: "1px",
        pieOuterStrokeColor: "#DFE3EA",
        pieSectionTextColor: "#161B26",
        pieLegendTextColor: "#161B26",
        pieTitleTextColor: "#161B26"
      } })));
  });
});
