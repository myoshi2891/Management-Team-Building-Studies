import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    // ページはオートインポート（useSeoMeta 等）を使うため nuxt 環境が必須。
    // 素の jsdom + mount ではオートインポートが解決されない。
    environment: "nuxt",
    environmentOptions: {
      nuxt: { domEnvironment: "jsdom" },
    },
    include: ["tests/**/*.test.ts"],
  },
});
