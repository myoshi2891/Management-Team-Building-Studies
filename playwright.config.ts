import { defineConfig, devices } from "@playwright/test";

// 静的生成の成果物に対するスモークテスト。
//
// ポートは 3000（Nuxt/Next の既定）を避けた専用値を使う。既定ポートは他プロジェクトの
// dev サーバーと衝突しやすく、`reuseExistingServer` は応答しているサーバーが
// 自分のものかを検証しないため、無関係なアプリをテストしてしまう。
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run generate && npm exec --yes serve@14.2.5 -- .output/public --listen ${PORT}`,
    url: BASE_URL,
    // 常に自前で生成・起動する。既存サーバーの再利用は「何をテストしたか」を不確定にする。
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
