import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "~/app.vue";

describe("app.vue", () => {
  it("共通ヘッダーの後に各ページを描画する", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          SiteHeader: { template: "<header data-testid='site-header' />" },
          NuxtPage: { template: "<main data-testid='nuxt-page' />" },
        },
      },
    });

    expect(wrapper.findAll("[data-testid]").map((element) => element.attributes("data-testid"))).toEqual([
      "site-header",
      "nuxt-page",
    ]);
  });
});
