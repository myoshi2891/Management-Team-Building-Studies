import { flushPromises, mount } from "@vue/test-utils";
import type { Component } from "vue";
import { defineComponent, h } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MermaidDiagram from "~/components/MermaidDiagram.vue";

/**
 * 複数図の同時マウント用ホスト。
 *
 * テンプレート文字列ではなく h() で組む理由: 実行時コンパイルされた
 * テンプレートの <MermaidDiagram> は resolveComponent 経由で Nuxt が
 * 自動インポート登録した別モジュール実体に解決されることがある。その実体には
 * vi.mock("mermaid") が効かず、本物の mermaid が jsdom 上で動いて落ちる。
 * h() に import 済みのコンポーネントを直接渡せば実体が 1 つに固定される。
 */
function hostOf(...propsList: Array<Record<string, unknown>>) {
  return defineComponent({
    render: () => h("div", propsList.map((props, i) => h(MermaidDiagram as Component, { key: i, ...props }))),
  });
}

// initialize を持たせない。コンポーネントが再初期化を試みればテストは失敗する。
// 設定の初期化は plugins/mermaid.client.ts の責務であり、図のマウントごとに
// initialize を呼ぶと同時描画中の別の図の設定を上書きしてしまう。
const { render } = vi.hoisted(() => ({
  render: vi.fn(async (_id: string, _source: string) => ({
    svg: '<svg width="640" height="480" viewBox="0 0 640 480"></svg>',
  })),
}));

vi.mock("mermaid", () => ({ default: { render } }));

/** jsdom は document.fonts を実装しないため、テスト側で差し替える。 */
function stubFonts(ready: Promise<unknown>) {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready },
  });
}

beforeEach(() => {
  render.mockClear();
  stubFonts(Promise.resolve());
});

afterEach(() => {
  Reflect.deleteProperty(document, "fonts");
});

describe("MermaidDiagram", () => {
  it("図ごとの themeVariables を同時マウント間で分離する", async () => {
    mount(hostOf(
      { chart: "flowchart LR\nA --> B", theme: "base", themeVariables: { primaryColor: "#ffeeee" } },
      { chart: "flowchart LR\nC --> D", theme: "base", themeVariables: { primaryColor: "#eeeeff" } },
    ));
    await flushPromises();

    expect(render).toHaveBeenCalledTimes(2);
    const sources = render.mock.calls.map(([, source]) => source);
    expect(sources[0]).toContain(
      'config: {"theme":"base","themeVariables":{"fontSize":"16px","primaryColor":"#ffeeee"}}',
    );
    expect(sources[0]).toContain("flowchart LR\nA --> B");
    expect(sources[1]).toContain(
      'config: {"theme":"base","themeVariables":{"fontSize":"16px","primaryColor":"#eeeeff"}}',
    );
    expect(sources[1]).toContain("flowchart LR\nC --> D");
  });

  it("theme 未指定でも base を既定にし、fontSize 16px を補う", async () => {
    mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    expect(render.mock.calls[0]?.[1]).toContain(
      'config: {"theme":"base","themeVariables":{"fontSize":"16px"}}',
    );
  });

  it("呼び出しごとに一意な描画 ID を渡す", async () => {
    mount(hostOf(
      { chart: "flowchart LR\nA --> B" },
      { chart: "flowchart LR\nC --> D" },
    ));
    await flushPromises();

    const ids = render.mock.calls.map(([id]) => id);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });

  it("フォント読み込み完了を待ってから描画する（ラベル寸法の誤測定防止）", async () => {
    let resolveFonts: () => void = () => {};
    stubFonts(new Promise<void>((resolve) => { resolveFonts = resolve; }));

    mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    // フォント未確定の間は描画してはならない。
    expect(render).not.toHaveBeenCalled();

    resolveFonts();
    await flushPromises();

    expect(render).toHaveBeenCalledTimes(1);
  });

  it("2 層構造（外側フレーム全幅 + 内側 flex 中央寄せ）でマークアップする", () => {
    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });

    const outer = wrapper.element as HTMLElement;
    expect(outer.style.width).toBe("100%");

    const inner = wrapper.find(".mermaid").element as HTMLElement;
    expect(inner.style.display).toBe("flex");
    expect(inner.style.justifyContent).toBe("center");
  });

  it("描画後の svg から width/height 属性を除去し、縮小フィット用の style を付与する", async () => {
    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    const svg = wrapper.find(".mermaid svg").element as SVGElement;

    // 属性が残ったまま max-width をかけると縦横比が崩れる。
    expect(svg.hasAttribute("width")).toBe(false);
    expect(svg.hasAttribute("height")).toBe(false);

    // 自然サイズを起点に、列幅を超えたときだけ縮小させる組み合わせ。
    expect(svg.style.width).toBe("640px");
    expect(svg.style.maxWidth).toBe("100%");
    expect(svg.style.height).toBe("auto");
    // シーケンス図などで下端が切れるのを防ぐ。
    expect(svg.style.overflow).toBe("visible");
  });

  it("viewBox の高さを 15 拡張して下端の切れを防ぐ", async () => {
    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    const svg = wrapper.find(".mermaid svg").element as SVGElement;
    expect(svg.getAttribute("viewBox")).toBe("0 0 640 495");
  });

  it("viewBox を持たない svg でも例外を投げない", async () => {
    render.mockResolvedValueOnce({ svg: "<svg></svg>" });

    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    const svg = wrapper.find(".mermaid svg").element as SVGElement;
    expect(svg.getAttribute("viewBox")).toBeNull();
    expect(svg.style.maxWidth).toBe("100%");
  });

  it("maxHeight prop を指定した図だけ高さを制限する", async () => {
    const wrapper = mount(MermaidDiagram, {
      props: { chart: "flowchart LR\nA --> B", maxHeight: "420px" },
    });
    await flushPromises();

    const svg = wrapper.find(".mermaid svg").element as SVGElement;
    expect(svg.style.maxHeight).toBe("420px");
  });

  it("maxHeight 未指定なら高さを制限しない（他の図を巻き添えにしない）", async () => {
    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    const svg = wrapper.find(".mermaid svg").element as SVGElement;
    expect(svg.style.maxHeight).toBe("");
  });

  it("描画に失敗したらエラー表示へフォールバックする", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    render.mockRejectedValueOnce(new Error("Syntax error in text"));

    const wrapper = mount(MermaidDiagram, { props: { chart: "flowchart LR\nA --> B" } });
    await flushPromises();

    expect(wrapper.find(".diagram-error").exists()).toBe(true);
    expect(wrapper.find(".mermaid svg").exists()).toBe(false);
    consoleError.mockRestore();
  });
});
