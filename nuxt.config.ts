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
    // globInclude の既定は .vue/.jsx/.tsx/.md 等のみで **.ts を含まない**。
    // ガイドのアイコン名は app/utils/guide-catalog.ts が持つため、.ts を走査対象に加える。
    // これを外すとヘッダー・ホームのアイコンだけがビルド成果物から欠落する
    // （dev サーバーでは API 経由で解決されるため気付けない）。
    clientBundle: {
      scan: {
        globInclude: ["**/*.{vue,jsx,tsx,ts,md,mdc,mdx,yml,yaml}"],
        // globExclude は既定値を丸ごと置き換えるため、既定に含まれる "test" も明記する
        // （落とすと @nuxt/icon の既定より走査範囲が広がる）。"tests" / "e2e" は本リポジトリ固有。
        globExclude: ["node_modules", "dist", "build", "coverage", "test", "tests", "e2e", ".*"],
      },
      includeCustomCollections: true,
    },
    serverBundle: false,
    // 既定の css モードはルート要素が <span> になり、原本 HTML 由来の
    // `… svg { width: … }` 系セレクタが全ページで一致しなくなる。
    // 原本のアイコン寸法・配色をそのまま活かすため svg モードを既定にする。
    mode: "svg",
  },

  site: {
    // 本番 URL はデプロイ環境の NUXT_SITE_URL で設定する。
    name: "Management / Team Building Studies",
    debug: false,
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

  typescript: {
    typeCheck: false,
    tsConfig: {
      include: ["../tests/**/*", "../e2e/**/*"],
    },
  },

  devtools: { enabled: false },
});
