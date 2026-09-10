import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GuideKindHub from "~/components/GuideKindHub.vue";
import { GUIDES, programsOfKind } from "~/utils/guide-catalog";

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountHub = (kindId: string) =>
  mount(GuideKindHub, {
    props: { kindId },
    global: { stubs: { NuxtLink: NuxtLinkStub, Icon: { template: "<span aria-hidden='true' />" } } },
  });

describe("GuideKindHub — 種別インデックス", () => {
  it("見出し・説明・総件数を表示する", () => {
    const wrapper = mountHub("certifications");

    expect(wrapper.get("h1").text()).toBe("資格で学ぶ");
    expect(wrapper.get("[data-testid='hub-summary']").text()).toBe("公式の試験要項に基づく、認定資格の学習ガイド。");
    expect(wrapper.get("[data-testid='hub-count']").text()).toBe("35 ガイド");
  });

  it("所属プログラムをカードとして順序・遷移先・件数まで固定する", () => {
    const wrapper = mountHub("books");

    expect(wrapper.findAll("[data-testid='program-card']").map((card) => ({
      href: card.get("a").attributes("href"),
      title: card.get("h2").text(),
      count: card.get("[data-testid='program-card-count']").text(),
    }))).toEqual([
      { href: "/books/management", title: "マネジメント", count: "5 ガイド" },
      { href: "/books/leadership", title: "リーダーシップ", count: "4 ガイド" },
      { href: "/books/team", title: "チーム・組織文化", count: "5 ガイド" },
      { href: "/books/org-design", title: "チーム設計", count: "2 ガイド" },
      { href: "/books/product", title: "プロダクト・アジャイル", count: "2 ガイド" },
    ]);
  });

  it("件数の合計が所属ガイドの実数と一致する", () => {
    // 表示件数を手書きすると増えるたびに静かにずれる。カタログから導出していることを固定する。
    for (const kindId of ["certifications", "books", "practices"]) {
      const expected = GUIDES.filter((guide) =>
        programsOfKind(kindId as never).some((program) => program.id === guide.programId),
      ).length;

      expect(mountHub(kindId).get("[data-testid='hub-count']").text()).toBe(`${expected} ガイド`);
    }
  });

  it("未定義の種別 ID は握りつぶさず例外にする", () => {
    expect(() => mountHub("unknown")).toThrow(/未定義のガイド種別/);
  });
});
