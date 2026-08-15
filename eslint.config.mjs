// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: [
    ".nuxt/**",
    ".output/**",
    "dist/**",
    "node_modules/**",
    "test-results/**",
    "playwright-report/**",
    // エージェント用スキルの同梱スクリプトは `node --test` で独自に検証されており、
    // Nuxt の lint 設定の対象外とする。
    ".claude/**",
  ],
});
