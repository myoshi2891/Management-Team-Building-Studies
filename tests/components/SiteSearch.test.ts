import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import SiteSearch from "~/components/SiteSearch.vue";

const { navigateTo } = vi.hoisted(() => ({ navigateTo: vi.fn() }));
mockNuxtImport("navigateTo", () => navigateTo);

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountSearch = () =>
  mount(SiteSearch, {
    attachTo: document.body,
    global: { stubs: { NuxtLink: NuxtLinkStub, Icon: { template: "<span aria-hidden='true' />" } } },
  });

/** 検索を開いて入力を返す。 */
async function open(wrapper: ReturnType<typeof mountSearch>) {
  await wrapper.get("[data-testid='site-search-trigger']").trigger("click");
  return wrapper.get("[data-testid='site-search-input']");
}

/*
 * 検索は「ハブ方式でガイドが 1 クリック遠くなる」代償を相殺する導線。
 * 絞り込みの仕様は guide-search.ts（純関数）が正なので、ここで固定するのは
 * 開閉・キーボード操作・a11y の紐付けに絞る。
 */
describe("SiteSearch — サイト内検索", () => {
  it("初期状態では閉じており、トリガーが状態を通知する", () => {
    const wrapper = mountSearch();
    const trigger = wrapper.get("[data-testid='site-search-trigger']");

    expect(trigger.attributes("aria-expanded")).toBe("false");
    expect(wrapper.find("[data-testid='site-search-input']").exists()).toBe(false);
    wrapper.unmount();
  });

  it("開くと combobox として listbox に紐づく", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);

    expect(input.attributes("role")).toBe("combobox");
    expect(input.attributes("aria-expanded")).toBe("true");
    expect(input.attributes("aria-controls")).toBe(wrapper.get("[role='listbox']").attributes("id"));
    expect(wrapper.get("[data-testid='site-search-trigger']").attributes("aria-expanded")).toBe("true");
    wrapper.unmount();
  });

  it("入力に応じて候補を出し、所属体系を添える", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);

    await input.setValue("CAPM ド");

    expect(wrapper.findAll("[role='option']").map((option) => ({
      label: option.get("[data-testid='search-hit-label']").text(),
      program: option.get("[data-testid='search-hit-program']").text(),
    }))).toEqual([
      { label: "CAPM ドメイン1", program: "PMI 認定" },
      { label: "CAPM ドメイン2", program: "PMI 認定" },
      { label: "CAPM ドメイン3", program: "PMI 認定" },
      { label: "CAPM ドメイン4", program: "PMI 認定" },
    ]);
    wrapper.unmount();
  });

  it("一致が無いことを利用者へ伝える（黙って空にしない）", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);

    await input.setValue("該当なしのはずの文字列xyzzy");

    expect(wrapper.findAll("[role='option']")).toHaveLength(0);
    expect(wrapper.get("[data-testid='search-empty']").text()).toContain("見つかりません");
    wrapper.unmount();
  });

  /*
   * ライブリージョンは「中身が変わったこと」で読み上げが起きる。要素ごと後から
   * 挿入すると、挿入と変化が同時になり支援技術が通知を取りこぼす。
   * したがってパネルが開いている間は空のまま置き続け、文言だけを差し替える。
   */
  it("一致が無いことを伝える枠は、開いている間ずっと DOM に居座る", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);

    const region = wrapper.get("[data-testid='search-empty']");
    expect(region.attributes("role")).toBe("status");
    expect(region.text()).toBe("");

    await input.setValue("該当なしのはずの文字列xyzzy");
    expect(wrapper.get("[data-testid='search-empty']").text()).toBe("一致するガイドが見つかりません。");

    await input.setValue("CAPM ド");
    expect(wrapper.get("[data-testid='search-empty']").text()).toBe("");
    wrapper.unmount();
  });

  it("上下キーで候補を移動し、aria-activedescendant で現在位置を通知する", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);
    await input.setValue("CAPM ド");

    const optionIds = wrapper.findAll("[role='option']").map((option) => option.attributes("id"));
    // 開いた直後は先頭を選択済みにする（Enter だけで最短到達できるようにするため）。
    expect(input.attributes("aria-activedescendant")).toBe(optionIds[0]);

    await input.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.get("[data-testid='site-search-input']").attributes("aria-activedescendant")).toBe(optionIds[1]);

    await wrapper.get("[data-testid='site-search-input']").trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.get("[data-testid='site-search-input']").attributes("aria-activedescendant")).toBe(optionIds[0]);
    wrapper.unmount();
  });

  it("端で循環する（先頭の上は末尾、末尾の下は先頭）", async () => {
    const wrapper = mountSearch();
    const input = await open(wrapper);
    await input.setValue("CAPM ド");
    const optionIds = wrapper.findAll("[role='option']").map((option) => option.attributes("id"));

    await input.trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.get("[data-testid='site-search-input']").attributes("aria-activedescendant"))
      .toBe(optionIds.at(-1));
    wrapper.unmount();
  });

  it("Enter で選択中の候補へ遷移し、検索を閉じる", async () => {
    navigateTo.mockClear();
    const wrapper = mountSearch();
    const input = await open(wrapper);
    await input.setValue("CAPM ド");

    await input.trigger("keydown", { key: "ArrowDown" });
    await wrapper.get("[data-testid='site-search-input']").trigger("keydown", { key: "Enter" });

    expect(navigateTo).toHaveBeenCalledWith("/certified-associate-in-project-management-domain2");
    expect(wrapper.find("[data-testid='site-search-input']").exists()).toBe(false);
    wrapper.unmount();
  });

  it("候補が無い状態の Enter では遷移しない", async () => {
    navigateTo.mockClear();
    const wrapper = mountSearch();
    const input = await open(wrapper);
    await input.setValue("該当なしのはずの文字列xyzzy");

    await input.trigger("keydown", { key: "Enter" });

    expect(navigateTo).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it("Escape で閉じてトリガーへフォーカスを戻す", async () => {
    /*
     * 戻し先を用意しないとフォーカスが body へ落ち、キーボード利用者は
     * ページ先頭からたどり直しになる。ヘッダー既存の退避方針と揃える。
     */
    const wrapper = mountSearch();
    const input = await open(wrapper);

    await input.trigger("keydown", { key: "Escape" });

    expect(wrapper.find("[data-testid='site-search-input']").exists()).toBe(false);
    expect(document.activeElement).toBe(wrapper.get("[data-testid='site-search-trigger']").element);
    wrapper.unmount();
  });

  it("候補をクリックしても遷移する", async () => {
    navigateTo.mockClear();
    const wrapper = mountSearch();
    const input = await open(wrapper);
    await input.setValue("CAPM ド");

    await wrapper.findAll("[role='option']")[2]!.trigger("click");

    expect(navigateTo).toHaveBeenCalledWith("/capm-domain3-agile-frameworks-guide");
    wrapper.unmount();
  });

  it("トリガーにアクセシブルな名前を持つ", () => {
    const wrapper = mountSearch();

    expect(wrapper.get("[data-testid='site-search-trigger']").attributes("aria-label"))
      .toBe("ガイドを検索");
    wrapper.unmount();
  });
});
