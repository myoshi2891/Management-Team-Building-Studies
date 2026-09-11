import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "~/app.vue";

describe("app.vue", () => {
  it("共通ヘッダー・各ページ・共通の免責事項をこの順に描画する", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          SiteHeader: { template: "<header data-testid='site-header' />" },
          NuxtPage: { template: "<main data-testid='nuxt-page' />" },
          SiteDisclaimer: { template: "<footer data-testid='site-disclaimer' />" },
        },
      },
    });

    expect(wrapper.findAll("[data-testid]").map((element) => element.attributes("data-testid"))).toEqual([
      "site-header",
      "nuxt-page",
      "site-disclaimer",
    ]);
  });
});
