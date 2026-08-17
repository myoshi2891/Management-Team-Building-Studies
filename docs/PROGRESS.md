# Nuxt 移行 進捗

(最終更新日: 2026-08-17)

静的 HTML の資格・マネジメント学習ガイドを Nuxt 4（Vue 3）の `app/pages/*.vue` へ移行する作業の進捗記録。
更新のゲート条件は `.claude/rules/migration-progress-sync.md` を参照。

## 現在地

| フィールド | 値 |
|---|---|
| コードコミット HEAD | `eb79e1b` — refactor(pages): archive source files, add audit:reteam script, and format attributes（本ファイルのコミットより前のコード側コミット） |
| 次の作業 | 保守・新規ガイドの追加（登録先: `index.vue` の `guides` / `SiteHeader.vue` の `navigation`） |
| ビルド状態 | `bun run test` ✔ / `bun run build` ✔ / `bunx nuxi typecheck` ✔ / `bun run test:e2e` ✔（2026-08-17 実測） |
| テスト数 | **178** ユニット（MermaidDiagram 11 + SiteHeader 3 + useActiveHeading 9 + mermaid プラグイン 3 + app 1 + home 6 + CAPM page 24 + EM career path page 23 + Team leadership page 23 + EM guide page 23 + CAPM domain 1 page 29 + Dynamic reteaming page 23）+ **4** E2E — これがベースライン |
| 原本照合監査 | ✔ exit 0（全要素一致）。ただし **CAPM ドメイン1 のみ exit 1 かつ差分 1 件が正常**（「正当な差分の記録」§8 の意図的逸脱。それ以外の差分が出たら移行漏れ） |

## ページ移行状況

| 原本 | 移行先 | 状態 |
|---|---|---|
| `archive/Certified-Associate-in-Project-Management/Certified-Associate-in-Project-Management.html` | `app/pages/capm.vue` | ✅ 全文移行・原本照合完了・E2E スモーク Green |
| `archive/Engineering-management-career-path/Engineering-management-career-path.html` | `app/pages/engineering-management-career-path.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-team-leadership-guide.html` | `app/pages/engineering-team-leadership-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `Engineering-manager-guide.html` | `app/pages/engineering-manager-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `Certified-associate-in-project-management-domain1.html` | `app/pages/certified-associate-in-project-management-domain1.vue` | ✅ 全文移行・契約テスト Green。原本照合監査は **exit 1 / 差分 1 件が正常**（§8 の意図的逸脱） |
| `archive/Engineering-management-career-path/Dynamic-reteaming-guide.html` | `app/pages/dynamic-reteaming-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| 原本なし（サイトホーム） | `app/pages/index.vue` | ✅ 学習ライブラリ型ホーム・レスポンシブ対応完了 |

## 共有部品の実装状況

| 部品 | 状態 | 契約テスト |
|---|---|---|
| `app/components/MermaidDiagram.vue` | ✅ 完了 | `tests/components/MermaidDiagram.test.ts`（11 件） |
| `app/plugins/mermaid.client.ts` | ✅ 完了 | `tests/plugins/mermaid.client.test.ts`（3 件・初期化設定の契約）+ 同上（コンポーネントからの再 initialize を禁止） |
| `app/utils/mermaid-loader.ts` | ✅ 完了 | 同上（動的 import の singleton 化） |
| `app/composables/useActiveHeading.ts` | ✅ 完了 | `tests/composables/useActiveHeading.test.ts`（9 件・契約 Q-1） |
| `app/components/SiteHeader.vue` | ✅ 完了 | `tests/components/SiteHeader.test.ts`（3 件）+ `tests/app.test.ts`（1 件） |
| `e2e/capm.spec.ts` | ✅ 完了 | Playwright スモーク 4 件（静的生成成果物が対象） |

## 技術スタック（2026-08-16 時点の npm 実測値）

| レイヤー | パッケージ | 版 |
|---|---|---|
| Runtime / PM | bun / npm | 1.3.12 / 10.x |
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
| E2E が 4 件とも別プロジェクトの Next.js 404 ページを検証していた | Playwright の `reuseExistingServer` は応答しているサーバーが自分のものかを検証しない。既定ポート 3000 を他プロジェクトの dev サーバーが占有していた | 専用ポート 4173 に変更し `reuseExistingServer: false` にする |
| E2E の TOC スクロールが目標セクションに届かない | Mermaid 描画のたびに文書高さが変わり、進行中のスムーススクロールの目標位置が動く（描画前後で 10,444px → 17,318px） | 図の描画完了を待ってからクリックし、長距離スクロールはタイムアウトを延長する |

### 4. EM キャリアパスガイド（`engineering-management-career-path.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`, `ブログ・記事`, `企業・調査レポート`, `その他リソース` を `h3` へ変更 | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| `calloutElements` 件数の差 | 原本 5 → Vue 3 | 原本 HTML の `<i class="ti ti-alert-triangle">` が監査スクリプトで `alert` 要素として誤検出されていた。Vue 側では `<Icon>` に変更したため誤検出が消え、実際の callout 3 件に完全一致 |

### 5. エンジニアリングチームリード術ガイド（`engineering-team-leadership-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍・出版社`, `Google re:Work / Engineering Practices`, `著名なエンジニアリングリーダーの記事・インタビュー` を `h3` へ変更 | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 監査スクリプトの callout 正規表現改善 | `ti-alert-triangle` 等のアイコンクラス誤検出を防止するため、`collectMarkupCalloutElements` 内のクラスマッチを単語境界 `(?<![\\w-])(?:callout\|alert)(?![\\w-])` に改善 | 真の callout 16 件（note: 4, source: 9, practice: 3）と完全一致 |

### 6. エンジニアリングマネージャー入門完全ガイド（`engineering-manager-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`, `著名な実践者のブログ・ニュースレター`, `企業・研究機関の一次情報`, `実務ガイド・2026年動向` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 監査スクリプトのエンティティデコード追加 | `audit_source_parity.mjs` の `decodeEntities` に `&mdash;`（`—`）と `&rarr;`（`→`）を追加 | HTML 原本の文字実体参照と Vue 側の Unicode 文字との照合不一致を解消するため |

### 7. Mermaid `securityLevel` を原本の `loose` から `strict` へ変更（2026-08-16）

コードレビュー指摘への対応。**原本 HTML からの意図的な逸脱**であるため記録する。

| 項目 | 内容 |
|---|---|
| 対象 | `app/plugins/mermaid.client.ts` と、リポジトリ直下の静的ガイド HTML 5 本、`md-to-html` スキルの雛形 |
| 理由 | 図のソースはリポジトリ内に固定されており、`loose` が有効にするラベル内スクリプトや `click` 構文を一切使っていない。緩める必要がない |
| 検証 | 静的 HTML 5 本をヘッドレス描画し 41 図すべてエラー 0、Nuxt 側は E2E で 9 図の描画とコンソールエラー 0 を確認 |
| 契約 | `tests/plugins/mermaid.client.test.ts` が `strict` を固定する |

アーカイブ済み原本（`archive/` 配下）は当時の状態を保存する目的のため `loose` のまま残している。
`app/plugins/mermaid.client.ts` の JSDoc が、この 1 点だけ原本から逐語移植していない旨を明記している。

### 8. CAPM ドメイン1 リスク登録簿 R-002 の対応戦略を修正（2026-08-17）

コードレビュー指摘への対応。**原本 HTML からの意図的な逸脱**であり、
原本照合監査が恒常的に 1 件の差分を報告するため記録する。

| 項目 | 内容 |
|---|---|
| 対象 | `app/pages/certified-associate-in-project-management-domain1.vue` §2.5 リスク登録簿の表 |
| 原本 | `R-002 主要開発者の離脱` の対応戦略が `転嫁/軽減(ナレッジ共有の徹底)` |
| 移行先 | `軽減(ナレッジ共有の徹底)` |
| 理由 | 括弧内の具体策「ナレッジ共有の徹底」は発生確率・影響度を下げる**軽減**そのものであり、第三者へリスクを移す**転嫁**ではない。同じ表の R-001・R-003 は戦略を 1 つだけ挙げており、R-002 のみ 2 つ併記されているのも不整合 |
| ユーザー判断 | 「Vue 側だけ直して問題なし」との明示的な承認を得ている。原本 HTML / `.md` は未修正のまま |

そのため下記の監査は **exit 1 かつ差分 1 件**が正常な状態である。
これ以外の差分が出た場合は本項目とは別の移行漏れなので、通常どおり Green コミット禁止として扱う。

```bash
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  Certified-associate-in-project-management-domain1.html \
  app/pages/certified-associate-in-project-management-domain1.vue
# 期待される唯一の差分:
#   "R-002主要開発者の離脱人的資源低高中転嫁/軽減(ナレッジ共有の徹底)PM監視中"
```

### 9. ダイナミック・リチーミング実践ガイド（`dynamic-reteaming-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `参照した情報源` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Dynamic-reteaming-guide.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |

## 次回セッションでの再開プロンプト

```text
Management-Team-Building-Studies リポジトリのガイドページ Nuxt 移行が完了。

コードコミット HEAD: eb79e1b
次の作業: 保守・新規ガイドの追加
  新規ページは app/pages/index.vue の guides と app/components/SiteHeader.vue の
  navigation への登録が必須（契約 N-1〜N-3）

完了済み:
  - app/pages/capm.vue（CAPM ガイド）
  - app/pages/certified-associate-in-project-management-domain1.vue（CAPM ドメイン1 ガイド）
  - app/pages/engineering-management-career-path.vue（EM キャリアパス ガイド）
  - app/pages/engineering-team-leadership-guide.vue（エンジニアリングチームリード術 ガイド）
  - app/pages/engineering-manager-guide.vue（エンジニアリングマネージャー入門完全ガイド）
  - app/pages/dynamic-reteaming-guide.vue（ダイナミック・リチーミング実践ガイド）
  - app/pages/index.vue（学習ライブラリ型ホーム）
  - SiteHeader.vue（全ページ共通グローバルナビ）
  - MermaidDiagram.vue / useActiveHeading.ts
  - ユニットテスト 178 件
  - test / build / typecheck / test:e2e はいずれも 2026-08-17 時点で ✔（実測）
  - 全ページ型検査 (nuxi typecheck) / リンター (eslint) / 原本照合監査 exit 0 パス
    ただし CAPM ドメイン1 の原本照合監査だけは exit 1 かつ差分 1 件
    （リスク登録簿 R-002 の意図的逸脱。docs/PROGRESS.md「正当な差分の記録」§8 を参照。
    差分がこの 1 件以外に増えたら移行漏れとして Green コミット禁止）

ベースラインテスト数: ユニット 178 + E2E 4
```
