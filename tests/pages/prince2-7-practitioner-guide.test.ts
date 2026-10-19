// 原本 HTML から実装前に抽出・凍結した期待値。原本の実行時読み込みは禁止。
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import expected from "../fixtures/prince2-7-practitioner-source.json";
import { MermaidStub } from "../support/page-contract";
import Page from "~/pages/prince2-7-practitioner-guide.vue";

const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);
const mountPage = () => mount(Page, { global: { stubs: {
  ClientOnly: { template: "<div><slot /></div>" }, MermaidDiagram: MermaidStub,
  Icon: { template: "<span aria-hidden='true' />" },
} } });

// 文言・順序に加え、リスト階層、表セル、リンク属性、強調要素の構造も照合する。
const SELECTOR = "h1,h2,h3,h4,h5,h6,p,ul,ol,li,table,thead,tbody,tr,th,td,strong,em,a,.hero-eyebrow,.stat-number,.stat-label,.disclaimer-box,.section-eyebrow,.callout-title,.domain-tag,.domain-name,.domain-pct,.diagram-caption,.ref-name,.brand-title,.brand-subtitle";
function snapshot(root: Element) {
  return [...root.querySelectorAll(SELECTOR)].filter(n => !n.closest(".diagram-loading")).map(n => {
    const ancestors: string[] = [];
    for (let p = n.parentElement; p && p !== root; p = p.parentElement) {
      if (["UL", "OL", "LI"].includes(p.tagName)) ancestors.unshift(p.tagName.toLowerCase());
    }
    return { tag: n.tagName.toLowerCase(), text: (n.textContent ?? "").replace(/\s+/g, ""),
      attrs: Object.fromEntries(["href", "target", "rel", "start", "type", "colspan", "rowspan"]
        .filter(a => n.hasAttribute(a)).map(a => [a, n.getAttribute(a)])), listPath: ancestors.join(">") };
  });
}

describe("PRINCE2 Practitioner — 骨格・Hero・目次", () => {
  it("Hero の全文・数値・ラベル・免責・外部リンクが原本と一致する", () => {
    expect(snapshot(mountPage().get(".hero").element)).toEqual(expected.hero);
  });
  it("目次の文言・グループ・順序・アンカーが原本と一致する", () => {
    expect(snapshot(mountPage().get(".sidebar").element)).toEqual(expected.sidebar);
  });
  it("ブランド SVG の幾何属性・配色を保持する", () => {
    const wrapper = mountPage();
    const actual = wrapper.findAll(".seal, .seal *").map(n => ({
      tag: n.element.tagName, attrs: Object.fromEntries([...n.element.attributes]
        .filter(a => !a.name.startsWith("data-v-")).map(a => [a.name, a.value]).sort()),
    }));
    expect(actual).toEqual(expected.seal);
  });
  it("目次を閉じ、開いていた場合のみトグルにフォーカスを戻す", async () => {
    const wrapper = mountPage(); const toggle = wrapper.get<HTMLButtonElement>(".sidebar-toggle");
    const focus = vi.spyOn(toggle.element, "focus"); const link = wrapper.get(".sidebar-nav a");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await link.trigger("click"); expect(focus).not.toHaveBeenCalled();
    await toggle.trigger("click"); expect(toggle.attributes("aria-expanded")).toBe("true");
    await link.trigger("click"); await wrapper.vm.$nextTick();
    expect(toggle.attributes("aria-expanded")).toBe("false"); expect(focus).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll(".sidebar-nav a.active").map(a => a.attributes("href"))).toEqual(["#exam-overview"]);
  });
  it("SEO の title と description が原本と完全一致する", () => {
    mountPage(); expect(seoMeta).toHaveBeenLastCalledWith({"title":"PRINCE2® 7 Practitioner 完全ガイド | プロジェクトマネジメント実践資格","description":"PeopleCert PRINCE2 Project Management Practitioner (Version 7)の出題範囲を、7原則・People・7プラクティス・7プロセスの配点順に整理した学習ガイド。"});
  });
});

describe("原本カテゴリー: exam-overview", () => {
  it("見出し・段落全文・リスト構造・表の全セル・強調・リンクが順序込みで一致する", () => {
    expect(snapshot(mountPage().get("#exam-overview").element)).toEqual(expected.sections[0]!.content);
  });
  it("図解のソースと出現順が原本と完全一致し、ラッパー内に配置される", () => {
    const section = mountPage().get("#exam-overview");
    expect(section.findAll('[data-testid="mermaid"]').map(n => n.text().trim())).toEqual(expected.sections[0]!.diagrams);
    expect(section.findAll('.mermaid-wrap [data-testid="mermaid"]').map(n => n.text().trim())).toEqual(expected.sections[0]!.diagrams);
  });
});

describe("原本カテゴリー: what-is-prince2-7", () => {
  it("見出し・段落全文・リスト構造・表の全セル・強調・リンクが順序込みで一致する", () => {
    expect(snapshot(mountPage().get("#what-is-prince2-7").element)).toEqual(expected.sections[1]!.content);
  });
  it("図解のソースと出現順が原本と完全一致し、ラッパー内に配置される", () => {
    const section = mountPage().get("#what-is-prince2-7");
    expect(section.findAll('[data-testid="mermaid"]').map(n => n.text().trim())).toEqual(expected.sections[1]!.diagrams);
    expect(section.findAll('.mermaid-wrap [data-testid="mermaid"]').map(n => n.text().trim())).toEqual(expected.sections[1]!.diagrams);
  });
});
