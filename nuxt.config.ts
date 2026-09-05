// Nuxt 4 の既定 srcDir は `app/`。ページ・コンポーネント等はすべて app/ 配下に置く。
export default defineNuxtConfig({
  compatibilityDate: "2026-08-14",

  // favicon は public/ の実体を明示的に宣言する。
  // 原本は public/favicon.svg（ヘッダーのブランドマーク由来）で、
  // .ico / apple-touch-icon.png はそこからレンダリングした派生物。
  // ico を先に置くのは、SVG 非対応のブラウザが先勝ちで .ico を選ぶようにするため。
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },

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
    // アプリコードはすべて app/ 配下に存在するため、スキャン対象を app/ に限定し、
    // archive や docs 等の大容量テキスト走査をスキップして起動時間を大幅短縮する。
    clientBundle: {
      scan: {
        globInclude: ["app/**/*.{vue,jsx,tsx,ts}"],
        globExclude: ["node_modules", "dist", "build", "coverage", "test", "tests", "e2e", "archive", "docs", ".*"],
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

  // 開発時の不要なランタイム Sitemap/リンク巡回を停止し、Nitro サーバー初期化を高速化する。
  sitemap: { zeroRuntime: true },
  linkChecker: { enabled: false },

  // Nitro の走査・監視対象からアーカイブ・ドキュメント・テストを除外する。
  nitro: {
    ignore: ["archive/**", "docs/**", "tests/**", "e2e/**"],
  },

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
