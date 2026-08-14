# Nuxt 移行 進捗

(最終更新日: 2026-08-15)

静的 HTML の資格学習ガイドを Nuxt 4（Vue 3）の `app/pages/*.vue` へ移行する作業の進捗記録。
更新のゲート条件は `.claude/rules/migration-progress-sync.md` を参照。

## 現在地

| フィールド | 値 |
|---|---|
| 最新 HEAD | `bbd0bcd` — feat(capm): migrate complete guide content |
| 次の作業 | `Engineering-management-career-path.html` の Nuxt 移行 |
| ビルド状態 | `npm test` ✔ / `npm exec -- nuxi typecheck` ✔ / `npm exec -- eslint app/pages/capm.vue` ✔ / ビルドはユーザー指示により未実行 |
| テスト数 | **43**（MermaidDiagram 11 + useActiveHeading 9 + CAPM page 23）— これがベースライン |
| 原本照合監査 | ✔ exit 0（HTML 原本と CAPM page の全監査カテゴリが一致） |

## ページ移行状況

| 原本 | 移行先 | 状態 |
|---|---|---|
| `Certified-Associate-in-Project-Management.html` | `app/pages/capm.vue` | ✅ 全文移行・原本照合完了 |
| `Engineering-management-career-path.html` | 未定 | ⏳ 未着手 |

## 共有部品の実装状況

| 部品 | 状態 | 契約テスト |
|---|---|---|
| `app/components/MermaidDiagram.vue` | ✅ 完了 | `tests/components/MermaidDiagram.test.ts`（11 件） |
| `app/plugins/mermaid.client.ts` | ✅ 完了 | 同上（コンポーネントからの再 initialize を禁止） |
| `app/utils/mermaid-loader.ts` | ✅ 完了 | 同上（動的 import の singleton 化） |
| `app/composables/useActiveHeading.ts` | ✅ 完了 | `tests/composables/useActiveHeading.test.ts`（9 件・契約 Q-1） |

## 技術スタック（2026-08-14 時点の npm 実測値）

| レイヤー | パッケージ | 版 |
|---|---|---|
| Runtime / PM | bun | 1.3.12 |
| Framework | nuxt | 4.5.2 |
| Core | vue | 3.5.41 |
| Language | typescript / vue-tsc | 5.9.3 / 3.3.9 |
| Diagram | mermaid | 11.16.1 |
| Icons | @nuxt/icon + @iconify-json/tabler | 2.5.0 / 1.2.38 |
| Utilities | @vueuse/nuxt | 14.4.0 |
| SEO | @nuxtjs/seo | 5.3.12 |
| Fonts | @fontsource/source-serif-4 | 5.3.0 |
| Unit test | vitest / @nuxt/test-utils / @vue/test-utils | 4.1.10 / 4.1.0 / 2.4.11 |
| E2E | @playwright/test | 1.62.1 |
| Lint | eslint / @nuxt/eslint | 10.8.1 / 1.17.0 |

**非採用**: tailwindcss・@nuxt/ui（原本の手書き CSS を忠実移植するため）、
@nuxt/content・@pinia/nuxt・@nuxt/image・zod（単一静的ページには不要）。
vite / nitropack は nuxt の推移依存として入るため直接固定しない。

## 正当な差分の記録

原本照合監査（`audit_source_parity.mjs`）の結果のうち、「移行漏れではない」と
判断した項目と、その理由を残す。判断を再現できるようにするための記録であり、
無言で見逃してはならない（`tdd-mandatory-cycle.md` ステップ 2 の要求）。

### 1. 監査のゲート原本は `.html`（`.md` ではない）

`.md` と `.html` は同一内容の 2 形態とされているが、実測すると構造が乖離している。

| 観点 | `.md` | `.html` |
|---|---|---|
| h2 の個数 | 16（`目次` を含む） | 15 |
| h2 の書式 | 番号付き（`1. CAPM認定資格とは何か`） | 番号なし（`CAPMとは何か`） |
| `ステップ1`〜`ステップ5` | h3 見出し | `<ol class="step-list">` に再構造化 |
| `X.3 ドメインNのベストプラクティス` | h3 見出し ×4 | `.callout.practice` に再構造化 |
| Mermaid ソース | 字下げあり・ダーク配色（`#1f2937`） | 字下げなし・ライト配色（`#EEF1F8`） |

監査の `matchKey()` は区切り記号付きの先頭番号しか除去しないため、`1.1 …` 形式は
`.html` 側の見出しと一致しない。**移行先はデザインの正である `.html` の忠実移植**
であるから、ゲートは `.html` に対して実行する。`.md` 監査は情報提供として扱い、
exit 1 は上表の既存乖離が原因であって移行漏れではない。

この `.md` / `.html` 乖離自体の解消は本移行のスコープ外（別タスク）。

### 2. 原本 HTML への事前修正 2 件（ユーザー承認済み）

| コミット | 内容 | 理由 |
|---|---|---|
| `1a277f1` | `DIAGRAMS` のキー順を DOM 順へ | 監査は Mermaid を順序込み完全一致で照合する。描画は `Object.keys` → `getElementById` のため順序は意味的に無害 |
| `33d24b0` | 参考文献の見出し h4 → h3（CSS セレクタも追随） | h2 → h4 のレベル飛びは実在の a11y 不具合であり、必須品質契約 Q-3 に抵触する |

### 3. 移行中に判明した実装上の落とし穴

後続ページの移行でも再発しうるため記録する。

| 症状 | 原因 | 対処 |
|---|---|---|
| 図が 1 枚目しか描画されず 2 枚目以降がエラー表示になる | `<script setup>` は `setup()` へコンパイルされ**インスタンスごとに実行される**。そこに置いた「モジュール singleton」は実際にはインスタンス変数で、図の数だけ `import("mermaid")` が走る | singleton を独立モジュール `app/utils/mermaid-loader.ts` へ切り出す |
| テストの `wrapper.element` が実要素を指さない | `<template>` の root の兄弟に置いた HTML コメントも VNode として数えられ、コンポーネントが多重ルートになる | 説明コメントは `<script>` 側の JSDoc に置く |
| コンポーネント内部要素の配色が原本と違う | `.diagram-error` 等はコンポーネント内で描画されるためページ側 `<style scoped>` が到達しない | そのスタイルはコンポーネントの `<style scoped>` が持つ |

### 4. スキル記述と実環境の食い違い

| スキルの記述 | 実際 |
|---|---|
| `@nuxt/test-utils ^3.17.x` | **4.1.0**（v4 系が最新） |
| `// @vitest-environment jsdom` + 素の `mount` | オートインポート（`useSeoMeta` 等）を使うページでは動かない。`defineVitestConfig({ test: { environment: "nuxt" } })` が必要 |
| `pages/` / `components/` 直下 | Nuxt 4 の既定 `srcDir` は `app/` のため `app/pages/` / `app/components/`。テストの `~/pages/capm.vue` は `srcDir` 解決でそのまま通る |

これらはサイクル 4 でスキル・ルール本体に反映する。

## 次回セッションでの再開プロンプト

```text
Management-Team-Building-Studies リポジトリで Engineering Management ガイドの Nuxt 移行を開始する。

最新 HEAD: bbd0bcd（feat(capm): migrate complete guide content）
次の作業: Engineering-management-career-path.html の Nuxt 移行。
          CAPM と同じく、契約テスト Red → 全文移行 → 原本照合 exit 0 の順で進める。

完了済み: MermaidDiagram.vue / mermaid.client.ts / mermaid-loader.ts（契約 11 件）
          useActiveHeading.ts（契約 9 件）
          CAPM page（契約 23 件・原本照合 exit 0）
テスト数ベースライン: 43（これを下回ったら何かを壊している）

未移行: Engineering-management-career-path.html（Nuxt page 未作成）。

必読: .claude/skills/nuxt-page-migration/SKILL.md
      .claude/rules/tdd-mandatory-cycle.md
      .claude/rules/mermaid-diagram-layout.md
      .claude/skills/fix-mermaid/SKILL.md（Part 4 / Part 6）
      docs/PROGRESS.md（本ファイルの「正当な差分の記録」）

ゲート: 原本照合監査が exit 0 になるまで feat コミット禁止。
        sandbox では npm scripts を使う。
```
