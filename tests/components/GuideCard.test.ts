import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GuideCard from "~/components/GuideCard.vue";
import { GUIDES } from "~/utils/guide-catalog";

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const guide = GUIDES[0]!;

const mountCard = (props: { guide: typeof guide; label: string }) =>
  mount(GuideCard, {
    props,
    global: { stubs: { NuxtLink: NuxtLinkStub, Icon: { template: "<span aria-hidden='true' />" } } },
  });

/*
 * カードはホームとハブページの両方が使う。
 * 片方だけに手を入れて意匠が分裂する事故（Mermaid のレイアウトで実際に起きた）を防ぐため、
 * マークアップの正はこのコンポーネント 1 つに置き、その契約をここで固定する。
 */
describe("GuideCard — ホームとハブが共有するガイドカード", () => {
  it("遷移先・アクセシブル名・見出し・説明・メタ・ラベルを表示する", () => {
    const wrapper = mountCard({ guide, label: "CAPM" });

    const link = wrapper.get("a");
    expect(link.attributes("href")).toBe(guide.to);
    expect(link.attributes("aria-label")).toBe(`${guide.title}を読む`);
    expect(wrapper.get("h3").text()).toBe(guide.title);
    expect(wrapper.get(".guide-description").text()).toBe(guide.description);
    expect(wrapper.get(".guide-meta").text()).toBe(guide.meta);
    expect(wrapper.get(".guide-category").text()).toBe("CAPM");
  });

  it("アクセント色をクラスとして反映する", () => {
    // 配色は CSS 側の .guide-card-<accent> が持つ。クラス名が崩れると無色になる。
    const wrapper = mountCard({ guide, label: "CAPM" });

    expect(wrapper.get("article").classes()).toContain(`guide-card-${guide.accent}`);
    expect(wrapper.get("article").attributes("data-testid")).toBe("guide-card");
  });

  it("見出しレベルを呼び出し側から指定できる", () => {
    /*
     * ホームは h2 セクション配下、ハブは h2 シリーズ配下にカードを置くため、
     * 既定の h3 で揃う。レベルを固定すると片方で見出し階層がスキップする。
     */
    const wrapper = mount(GuideCard, {
      props: { guide, label: "CAPM", headingLevel: "h4" },
      global: { stubs: { NuxtLink: NuxtLinkStub, Icon: { template: "<span aria-hidden='true' />" } } },
    });

    expect(wrapper.get("h4").text()).toBe(guide.title);
    expect(wrapper.find("h3").exists()).toBe(false);
  });
});
