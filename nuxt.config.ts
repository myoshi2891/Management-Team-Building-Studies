// Nuxt 4 の既定 srcDir は `app/`。ページ・コンポーネント等はすべて app/ 配下に置く。
export default defineNuxtConfig({
  compatibilityDate: "2026-08-14",

  modules: ["@nuxt/eslint", "@nuxt/icon", "@vueuse/nuxt", "@nuxtjs/seo"],

  // 原本 HTML の CDN 読み込みを npm パッケージへ置き換える。
  // これによりバージョン未固定・SRI なしという既知リスクが解消する。
  css: [
    "@fontsource/source-serif-4/400.css",
    "@fontsource/source-serif-4/600.css",
    "@fontsource/source-serif-4/700.css",
    "~/assets/css/main.css",
  ],

  icon: {
    // 静的生成（nuxt generate）ではサーバー API が使えないため、
    // 使用アイコンをビルド時にスキャンしてクライアントバンドルへ同梱する。
    clientBundle: { scan: true, includeCustomCollections: true },
    serverBundle: false,
  },

  site: {
    url: "https://example.com",
    name: "Management / Team Building Studies",
  },

  // 静的サイトのため OG 画像のランタイム生成は無効化する（generate を通すため）。
  ogImage: { enabled: false },

  eslint: {
    config: {
      // stylistic を有効にすると既定 semi:false でセミコロンが除去され、
      // 原本照合監査の Mermaid 定数解決（`const NAME = \`…\`;` 形式必須）が壊れる。
      stylistic: false,
    },
  },

  typescript: { typeCheck: false },

  devtools: { enabled: false },
});
