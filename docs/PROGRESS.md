# Nuxt 移行 進捗

(最終更新日: 2026-08-18)

静的 HTML の資格・マネジメント学習ガイドを Nuxt 4（Vue 3）の `app/pages/*.vue` へ移行する作業の進捗記録。
更新のゲート条件は `.claude/rules/migration-progress-sync.md` を参照。

## 現在地

| フィールド | 値 |
|---|---|
| コードコミット HEAD | `febb928` — refactor(pmp-d1): archive original PMP Domain 1 source and add audit script（本ファイルのコミットより前のコード側コミット） |
| 次の作業 | 保守・新規ガイドの追加（登録先は **`app/utils/guide-catalog.ts` の `GUIDES` 1 か所**。ホームのカードとグローバルナビの両方が自動で追随する） |
| ビルド状態 | `npm run test` ✔ / `npm run typecheck` ✔ / `npm run lint` ✔ / `npm run audit:capm` ✔ / `npm run audit:capm-d1` ✔ / `npm run audit:capm-d2` ✔ / `npm run audit:capm-d3` ✔ / `npm run audit:capm-d4` ✔ / `npm run audit:pmp` ✔ / `npm run audit:pmp-d1` ✔ / `npm run audit:lead` ✔ / `npm run audit:reteam` ✔ / `npm run audit:exec` ✔ / `npm run audit:practices` ✔ / `npm run test:e2e` ✔ / `npm run build` ✔（2026-08-18 実測） |
| テスト数 | **374** ユニット（MermaidDiagram 11 + SiteHeader 18 + useActiveHeading 9 + guide-catalog 7 + mermaid プラグイン 3 + app 1 + home 6 + CAPM page 24 + EM career path page 23 + Team leadership page 23 + EM guide page 23 + CAPM domain 1 page 29 + Dynamic reteaming page 23 + Engineering executive playbook page 23 + PMP page 23 + PMP domain 1 page 23 + CAPM domain 2 page 28 + CAPM domain 3 page 28 + CAPM domain 4 page 25 + Leadership practices guide page 24）+ **13** E2E（capm 4 + site-header 9）— これがベースライン |
| 原本照合監査 | ✔ **全 11 本 exit 0**（全要素一致）。CAPM ドメイン1 の意図的逸脱は 2026-08-18 に原本側へ反映して解消済み（「正当な差分の記録」§8） |

## ページ移行状況

| 原本 | 移行先 | 状態 |
|---|---|---|
| `archive/Certified-Associate-in-Project-Management/Certified-Associate-in-Project-Management.html` | `app/pages/capm.vue` | ✅ 全文移行・原本照合完了・E2E スモーク Green |
| `archive/Engineering-management-career-path/Engineering-management-career-path.html` | `app/pages/engineering-management-career-path.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-team-leadership-guide.html` | `app/pages/engineering-team-leadership-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `Engineering-manager-guide.html` | `app/pages/engineering-manager-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Certified-associate-in-project-management-domain1.html` | `app/pages/certified-associate-in-project-management-domain1.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Certified-associate-in-project-management-domain2.html` | `app/pages/certified-associate-in-project-management-domain2.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Capm-domain3-agile-frameworks-guide.html` | `app/pages/capm-domain3-agile-frameworks-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Capm-domain4-business-analysis-frameworks.html` | `app/pages/capm-domain4-business-analysis-frameworks.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Dynamic-reteaming-guide.html` | `app/pages/dynamic-reteaming-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-executive-playbook.html` | `app/pages/engineering-executive-playbook.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Leadership-practices-guide.html` | `app/pages/leadership-practices-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-certification-guide.html` | `app/pages/pmp-certification-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-domain1-people-guide.html` | `app/pages/pmp-domain1-people-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| 原本なし（サイトホーム） | `app/pages/index.vue` | ✅ 学習ライブラリ型ホーム・レスポンシブ対応完了 |

## 共有部品の実装状況

| 部品 | 状態 | 契約テスト |
|---|---|---|
| `app/components/MermaidDiagram.vue` | ✅ 完了 | `tests/components/MermaidDiagram.test.ts`（11 件） |
| `app/plugins/mermaid.client.ts` | ✅ 完了 | `tests/plugins/mermaid.client.test.ts`（3 件・初期化設定の契約）+ 同上（コンポーネントからの再 initialize を禁止） |
| `app/utils/mermaid-loader.ts` | ✅ 完了 | 同上（動的 import の singleton 化） |
| `app/composables/useActiveHeading.ts` | ✅ 完了 | `tests/composables/useActiveHeading.test.ts`（9 件・契約 Q-1） |
| `app/utils/guide-catalog.ts` | ✅ 完了 | `tests/utils/guide-catalog.test.ts`（7 件・ガイド定義の SSoT） |
| `app/components/SiteHeader.vue` | ✅ 完了 | `tests/components/SiteHeader.test.ts`（18 件・カテゴリー別ドロップダウン + フォーカス退避）+ `tests/app.test.ts`（1 件） |
| `e2e/capm.spec.ts` | ✅ 完了 | Playwright スモーク 4 件（静的生成成果物が対象） |
| `e2e/site-header.spec.ts` | ✅ 完了 | Playwright スモーク 9 件（メディアクエリ依存の挙動。jsdom では再現不能） |

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

### 8. CAPM ドメイン1 リスク登録簿 R-002 の対応戦略を修正（2026-08-17 / 2026-08-18 解消）

**この項目は差分としては解消済み。** 経緯を残すために節ごと保持する。

| 項目 | 内容 |
|---|---|
| 対象 | `app/pages/certified-associate-in-project-management-domain1.vue` §2.5 リスク登録簿の表 |
| 当初の原本 | `R-002 主要開発者の離脱` の対応戦略が `転嫁/軽減(ナレッジ共有の徹底)` |
| 修正後 | `軽減(ナレッジ共有の徹底)`（Vue / 原本 `.html` / 原本 `.md` の 3 者すべて） |
| 理由 | 括弧内の具体策「ナレッジ共有の徹底」は発生確率・影響度を下げる**軽減**そのものであり、第三者へリスクを移す**転嫁**ではない。同じ表の R-001・R-003 は戦略を 1 つだけ挙げており、R-002 のみ 2 つ併記されているのも不整合 |

**経緯**: 2026-08-17 時点では「Vue 側だけ直して問題なし」とのユーザー判断により
原本 `.html` / `.md` を未修正のまま残したため、`audit:capm-d1` が恒常的に exit 1 になっていた。
恒久的に赤いゲートは「本物の移行漏れ」との区別を難しくするため、2026-08-18 にユーザー承認のうえ
`archive/` 配下の原本 `.html` / `.md` にも同じ修正を反映し、**差分そのものを解消**した。

現在は `bun run audit:capm-d1` が **exit 0**（差分 0 件）である。
差分が出た場合はすべて通常の移行漏れとして扱い、Green コミット禁止とする。

### 9. ダイナミック・リチーミング実践ガイド（`dynamic-reteaming-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `参照した情報源` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Dynamic-reteaming-guide.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |

### 10. エンジニアリング統括責任者の手引き（`engineering-executive-playbook.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍・著者本人の発信` / `研究機関・企業発の一次情報` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Engineering-executive-playbook.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |

### 11. PMP認定試験完全攻略ガイド（`pmp-certification-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `PMI公式 資格・試験情報` / `PMI標準・プラクティスガイド` / `資格維持・研修` / `受験ロジスティクス` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Pmp-certification-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |

### 12. グローバルナビのカテゴリー別ドロップダウン化とガイドカタログ集約（2026-08-17）

ガイドが 9 本に増え、ホーム + 9 項目のフラットなグローバルナビが横幅の限界に達したため、
カテゴリー別ドロップダウンへ変更した。あわせてガイド定義を単一カタログへ集約した。
原本 HTML には存在しない導線であり、**原本照合監査では検知できない**変更である。

| 項目 | 内容 | 理由 |
|---|---|---|
| ガイド定義の集約 | `app/pages/index.vue` の `guides` と `SiteHeader.vue` の `navigation` を廃止し、`app/utils/guide-catalog.ts` の `GUIDES` / `GUIDE_CATEGORIES` に一本化 | 二重管理による登録漏れ（旧 CLAUDE.md が IMPORTANT で警告していた問題）を構造的に排除するため。契約は `tests/utils/guide-catalog.test.ts`（7 件）で固定 |
| カテゴリーの粒度 | ホームのカード表記（英語 `cardLabel`）とナビのグループ（日本語 `navLabel`）を **1:1 の 4 種**にした | マッピング層を持たず、カテゴリー追加が配列 1 行で済むようにするため |
| ナビの横並び項目数 | ホーム + 4 カテゴリーの計 5 に固定 | ガイドが増えても横幅が変わらないため、旧実装のリンク数ベースのブレークポイント再計算（`SiteHeader.vue` の計算コメント）とラベル視覚的非表示の回避策を削除できた |
| `nuxt.config.ts` の `icon.clientBundle.scan.globInclude` に `.ts` を追加 | 既定は `**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml}` で **`.ts` を含まない** | アイコン名を `.ts` のカタログへ移した結果、静的生成物からアイコンが欠落する。dev サーバーは API 経由で解決するため気付けず、`bun run build` + 成果物の grep でしか検知できない |
| hover 判定に `(min-width: 681px)` を含める | `(hover: hover) and (pointer: fine)` だけでは、ポインタデバイスでウィンドウを狭めた際に CSS はアコーディオンなのに hover が生き残り、`mouseenter` で開いた直後の `click` がトグルして閉じる | JS の分岐と `<style>` の 680px ブレークポイントを対で維持する。jsdom の `matchMedia` は常に `matches: false` を返すためユニットテストでは再現不能で、`e2e/site-header.spec.ts` が唯一の検知経路 |

ホームのカード描画ロジックは改修前と同一である。`tests/pages/index.test.ts` は
**契約の件数（6 件）とアサーションの内容を変更していない**。変更したのは期待値配列だけで、
新規 4 ガイド（ダイナミック・リチーミング／統括責任者の手引き／PMP 完全攻略／CAPM ドメイン2）の
追加分を足してある。カタログ一本化そのものが表示を変えていないことの根拠は、この
「契約は据え置き、期待値のみ追加」という差分の形にある。

### 13. CAPM ドメイン3 アジャイルフレームワーク/方法論ガイド（`capm-domain3-agile-frameworks-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `一次ソース一覧` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Capm-domain3-agile-frameworks-guide.html` / `.md` を `archive/Certified-Associate-in-Project-Management/` 配下へ移動 | 移行完了原本の集約管理 |

### 14. CAPM ドメイン4 ビジネス分析フレームワークガイド（`capm-domain4-business-analysis-frameworks.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `PMI公式資料` 等 5 件の `h4` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Capm-domain4-business-analysis-frameworks.html` / `.md` を `archive/Certified-Associate-in-Project-Management/` 配下へ移動 | 移行完了原本の集約管理 |

### 15. リーダーの作法ガイド（`leadership-practices-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`、`ブログ・ニュースレター`、`フレームワーク・調査` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
### 16. PMP Domain I: People 完全攻略ガイド（`pmp-domain1-people-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 原本アーカイブ移動 | `Pmp-domain1-people-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:pmp-d1` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

## 次回セッションでの再開プロンプト

```text
Management-Team-Building-Studies リポジトリのガイドページ Nuxt 移行が完了。

コードコミット HEAD: febb928
次の作業: 保守・新規ガイドの追加
  新規ページの登録先は app/utils/guide-catalog.ts の GUIDES 1 か所。
  ホームのカードとグローバルナビのドロップダウンが自動で追随する（契約 N-1〜N-3）。
  tests/utils/guide-catalog.test.ts / tests/pages/index.test.ts /
  tests/components/SiteHeader.test.ts の期待値配列を先に更新して Red を作ること

完了済み:
  - app/pages/capm.vue（CAPM ガイド）
  - app/pages/certified-associate-in-project-management-domain1.vue（CAPM ドメイン1 ガイド）
  - app/pages/certified-associate-in-project-management-domain2.vue（CAPM ドメイン2 ガイド）
  - app/pages/capm-domain3-agile-frameworks-guide.vue（CAPM ドメイン3 ガイド）
  - app/pages/capm-domain4-business-analysis-frameworks.vue（CAPM ドメイン4 ガイド）
  - app/pages/engineering-management-career-path.vue（EM キャリアパス ガイド）
  - app/pages/engineering-team-leadership-guide.vue（エンジニアリングチームリード術 ガイド）
  - app/pages/engineering-manager-guide.vue（エンジニアリングマネージャー入門完全ガイド）
  - app/pages/dynamic-reteaming-guide.vue（ダイナミック・リチーミング実践ガイド）
  - app/pages/engineering-executive-playbook.vue（エンジニアリング統括責任者の手引き ガイド）
  - app/pages/leadership-practices-guide.vue（リーダーの作法ガイド）
  - app/pages/pmp-certification-guide.vue（PMP認定試験完全攻略ガイド）
  - app/pages/pmp-domain1-people-guide.vue（PMP Domain I: People 完全攻略ガイド）
  - app/pages/index.vue（学習ライブラリ型ホーム）
  - app/utils/guide-catalog.ts（ガイド定義の SSoT）
  - SiteHeader.vue（全ページ共通グローバルナビ。カテゴリー別ドロップダウン + モバイルはアコーディオン）
  - MermaidDiagram.vue / useActiveHeading.ts
  - ユニットテスト 374 件
  - test / typecheck / lint はいずれも 2026-08-18 時点で ✔（実測）
  - 全ページ型検査 (nuxi typecheck) / リンター (eslint) / 原本照合監査は全 11 本 exit 0 パス
    （CAPM ドメイン1 の意図的逸脱は 2026-08-18 に原本側へ反映して解消済み。
    docs/PROGRESS.md「正当な差分の記録」§8 を参照。
    差分が 1 件でも出たら移行漏れとして Green コミット禁止）

ベースラインテスト数: ユニット 374 + E2E 13
```
