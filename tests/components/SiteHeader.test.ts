import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import SiteHeader from "~/components/SiteHeader.vue";

const { currentPath } = vi.hoisted(() => ({ currentPath: { value: "/capm" } }));
mockNuxtImport("useRoute", () => () => ({
  path: currentPath.value,
  fullPath: currentPath.value,
  query: {},
  params: {},
  matched: [],
  name: undefined,
  hash: "",
  redirectedFrom: undefined,
  meta: {},
}));

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountHeader = () =>
  mount(SiteHeader, {
    global: {
      stubs: {
        NuxtLink: NuxtLinkStub,
        Icon: { template: "<span aria-hidden='true' />" },
      },
    },
  });

describe("SiteHeader", () => {
  it("全ページ共通の遷移先を正しい順序で表示する", () => {
    const wrapper = mountHeader();

    expect(wrapper.findAll("nav a").map((link) => ({
      label: link.text(),
      href: link.attributes("href"),
    }))).toEqual([
      { label: "ホーム", href: "/" },
      { label: "CAPM", href: "/capm" },
      { label: "CAPM D1", href: "/certified-associate-in-project-management-domain1" },
      { label: "EMキャリア", href: "/engineering-management-career-path" },
      { label: "チームリード術", href: "/engineering-team-leadership-guide" },
      { label: "EM入門", href: "/engineering-manager-guide" },
    ]);
  });

  it("現在のページをaria-currentで通知する", () => {
    const wrapper = mountHeader();

    expect(wrapper.findAll("nav a").map((link) => link.attributes("aria-current"))).toEqual([
      undefined,
      "page",
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("ブランドとナビゲーションにアクセシブルな名前を持つ", () => {
    const wrapper = mountHeader();

    expect(wrapper.get("header").attributes("data-site-header")).toBe("");
    expect(wrapper.get(".global-brand").attributes("aria-label")).toBe("Management Studies ホーム");
    expect(wrapper.get("nav").attributes("aria-label")).toBe("グローバルナビゲーション");
  });
});
