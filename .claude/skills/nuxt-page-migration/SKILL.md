---
name: nuxt-page-migration
description: >
  Migrate the static HTML/Markdown certification guides in this repository to Nuxt.js
  (Vue 3) app/pages/*.vue using TDD, and maintain already-migrated pages. Enforces a
  mechanical source-parity audit that blocks content omission (the defect this workflow
  exists to prevent).
  TRIGGER when the user says any of the following (Japanese or English):
  - "ページを Nuxt に移行" / "ガイドページを移行" / "新規ガイドページを追加" /
    "ページを保守" / "移行漏れ" / "転写漏れ"
  - "migrate guide page" / "nuxt page migration" / "add new guide page" / "missing sections"
  - layout/centering maintenance: "図解が左寄せ" / "図解を中央寄せ" / "コンテンツが左寄り" /
    "本文の幅がバランス悪い" / "diagram not centered" / "content column width"
  - design mismatch: "デザイン違う" / "スタイルがおかしい" / "テーブルヘッダーの色が" /
    "callout の色が" / "コードブロックの色" / "図解の色が違う"
  - site navigation: "ホームにガイドが出ない" / "グローバルナビに追加" / "ヘッダーのリンクが古い"
  - horizontal overflow: "横スクロール" / "横にスクロールできてしまう" / "右側に無駄な余白" /
    "画面からはみ出す" / "horizontal scroll" / "page overflows"
  適用対象: 原本照合監査スクリプト、契約テスト（Vitest + Vue Test Utils）、
  Vue SFC の構造、scoped CSS、ClientOnly 経由の Mermaid、本文カラム幅の方針、
  およびガイドカタログ（app/utils/guide-catalog.ts の GUIDES）への登録。
  カタログは app/pages/index.vue と app/components/SiteHeader.vue の両方の導線を生成する。
  注記: この front matter は Claude Code 固有である。front matter を解釈しないエージェント向けに、
  本文「エージェント互換」節が同じトリガーを保持する。
invocation: explicit
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Nuxt ガイドページ移行・保守スキル

最終更新: 2026-08-27

## エージェント互換（Claude Code / Gemini CLI / その他）

冒頭の front matter（`name` / `description` / `invocation` / `allowed-tools`）は
**Claude Code 固有のメタデータ**であり、他のエージェントは解釈しない。
そのため本スキルは、front matter を読まなくても本文だけで完結するように書く。

| 前提 | 自動発火するエージェント | 解釈しないエージェント（Gemini CLI 等） |
|---|---|---|
| 起動 | トリガー語句で自動読込 | 下表の語句が出たら、**利用者または担当者が本ファイルを明示的に読む** |
| 参照ファイル | 必要時に自動で開かれる | §1 と §8 のファイルを**手動で開く**（開かずに推測しない） |
| ツール | `Read` / `Edit` / `Bash` 等 | 同等の読み書き・シェル実行手段で置き換える。**手順は省略しない** |
| コマンド | `bun run <script>` | `bun` が無ければ `npm run <script>`（型検査も `npm run typecheck`。下記注） |

> [!IMPORTANT]
> `npx nuxi` は使わない。バージョン未固定でレジストリから任意の nuxi を取得し、
> ローカルの `nuxt` と異なる版で型検査する事故が起きる。`package.json` の
> `"typecheck": "nuxi typecheck"` はローカル依存の `node_modules/.bin/nuxi` を実行するため、
> `npm run typecheck` を使う。ローカルに nuxi が無ければ非 0 で停止するので、
> その場で作業を止めて依存を入れ直す（`npx` の暗黙ダウンロードで先へ進めない）。

**適用トリガー（本文が正。front matter と食い違ったら本節に合わせて front matter を直す）**:

- 移行・追加: 「ページを Nuxt に移行」「ガイドページを移行」「新規ガイドページを追加」「ページを保守」
  「移行漏れ」「転写漏れ」/ `migrate guide page` / `nuxt page migration` / `add new guide page`
- レイアウト: 「図解が左寄せ」「図解を中央寄せ」「コンテンツが左寄り」「本文の幅がバランス悪い」
- デザイン不一致: 「デザイン違う」「スタイルがおかしい」「テーブルヘッダーの色が」「callout の色が」「図解の色が違う」
- サイト導線: 「ホームにガイドが出ない」「グローバルナビに追加」「ヘッダーのリンクが古い」
- 横スクロール: 「横スクロール」「横にスクロールできてしまう」「右側に無駄な余白」「画面からはみ出す」
  / `horizontal scroll` / `page overflows`

判定はすべて**終了コード**で行う（出力の目視ではなく `echo "exit=$?"` を確認する）。
エージェント固有機能（スキル自動発火・サブエージェント・進捗トラッカ）が無い場合も、
同じコマンドを手で順に実行し、同じゲートを満たすこと。

> [!IMPORTANT]
> **Nuxt 4 は導入済み。既定の `srcDir` は `app/`** なので実パスは `app/pages/*.vue` /
> `app/components/*.vue` / `app/composables/*.ts` になる（テストの `~/pages/capm.vue` という
> import は `srcDir` 解決でそのまま通る）。テストだけはリポジトリ直下の `tests/` に置く。
> CAPM ページ（`app/pages/capm.vue`）が移行済みで、以降のページはこれを参照実装とする。

## 参照実装（実在するファイル）

| ファイル | 役割 |
|---|---|
| `app/app.vue` | アプリシェル。`<SiteHeader />` → `<NuxtPage />` の順で描画する |
| `app/utils/guide-catalog.ts` | **公開ガイド定義の SSoT**。`GUIDES` / `GUIDE_CATEGORIES` をホームとヘッダーが共有する |
| `app/components/SiteHeader.vue` | **全ページ共通のグローバルヘッダー**。カテゴリー別ドロップダウンをカタログから生成する |
| `app/pages/index.vue` | **ホーム（学習ライブラリ）**。カード一覧をカタログから生成する |
| `app/pages/capm.vue` | 移行済みページの実例（`<script setup>` → `<template>` → `<style scoped>`） |
| `app/pages/engineering-management-career-path.vue` | 2 ページ目の移行実例 |
| `app/components/MermaidDiagram.vue` | 図解レイアウトの SSoT + svg 後処理 |
| `app/utils/mermaid-loader.ts` | `import("mermaid")` の singleton 化（後述の落とし穴 1 の対処） |
| `app/plugins/mermaid.client.ts` | `mermaid.initialize` を一度だけ実行 |
| `app/composables/useActiveHeading.ts` | TOC のスクロール連動 |
| `tests/pages/capm.test.ts` | 契約テストの実例（S / C / D / Q） |
| `tests/pages/index.test.ts` | ホームの契約テスト（ガイド一覧を順序・遷移先込みで固定） |
| `tests/components/SiteHeader.test.ts` | グローバルナビの契約テスト（順序・`aria-current`） |
| `tests/app.test.ts` | シェルの契約テスト（ヘッダーの後にページを描画する） |
| `e2e/capm.spec.ts` | 静的生成成果物へのスモークテスト |
| `e2e/no-horizontal-scroll.spec.ts` | **全ページ x 3 幅の横スクロール禁止ゲート**（対象は `GUIDES` から自動導出） |

## 0. このスキルが解決する問題

長大な原本（このリポジトリの CAPM ガイドは Markdown 61KB / 見出し 74 個 / リスト 114 項目 /
表 144 行 / Mermaid 図 9 個）を手作業で `.vue` に転写すると、**必ず一部が脱落する**。
目視では見落とすため、**機械照合を Green の前提条件（ゲート）にする**のが本スキルの核心。

## 1. 作業開始前に必ず読むファイル（順序固定）

1. `CLAUDE.md` — プロジェクト構成と規約
2. `.claude/rules/tdd-mandatory-cycle.md` — TDD サイクルとコミット分割（強制）
3. `.claude/rules/migration-progress-sync.md` — `docs/PROGRESS.md` 同期のゲート条件
4. `.claude/rules/mermaid-diagram-layout.md` — 図解レイアウトの不変条件
5. `.claude/rules/no-absolute-paths.md` — コミット前の PII 検査
6. 本スキルの `references/source-parity-audit.md` — 監査結果の判断基準と S 契約の実装例
7. `app/utils/guide-catalog.ts` — 新規ページの登録先（§5 Step 2.5）

デザイン契約を書く場合は `references/design-contract-tests.md`、共有部品や設定を触る場合は
`references/implementation-reference.md` も読む。**自動で開かれる前提を置かず、明示的に開くこと。**

## 2. 移行元と移行先

| | 内容 |
|---|---|
| **原本（Markdown）** | `Certified-Associate-in-Project-Management.md` — 章立ての正 |
| **原本（HTML）** | `Certified-Associate-in-Project-Management.html` — デザイン・図解の正 |
| **移行先** | `app/pages/<slug>.vue`（Nuxt のファイルベースルーティング） |

Markdown と HTML は**同じ内容の2形態**とされているが、CAPM では実測すると乖離していた
（`.md` の h2 は 16 個で番号付き、`.html` は 15 個で番号なし。ステップやベストプラクティスは
`.html` 側で別要素に再構造化されている）。**移行はデザインの正である `.html` の忠実移植**であり、
§5 Step 3 の監査ゲートも `.html` に対して実行する。`.md` 監査は情報提供として扱う。
乖離の実例と判断は `docs/PROGRESS.md`「正当な差分の記録」を参照。

### Next.js からの読み替え表（他プロジェクトの資産を流用する場合）

| Next.js | Nuxt |
|---|---|
| `app/**/page.tsx` | `app/pages/**/*.vue` |
| `className` | `class` |
| CSS Modules `page.module.css` | `<style scoped>` |
| `dangerouslySetInnerHTML` | `v-html` |
| `next/link` の `<Link>` | `<NuxtLink>` |
| `'use client'` | 既定で両対応。DOM 必須のものは `<ClientOnly>` |
| `export const metadata` | `useSeoMeta()` / `useHead()` |
| `lib/page-registry.ts` への登録 | ファイルベースルーティングのため登録不要 |

## 3. テスト実行コマンド

```bash
bun run test                      # 全件（Vitest + @nuxt/test-utils）
bun run test tests/pages/capm     # 単一ファイル（開発中の高速ループ）
bun run test:e2e                  # 静的生成成果物へのスモーク（Playwright）
```

> [!WARNING]
> **`bun test` を直接使わない。** Bun ネイティブランナーは Vitest の設定
> （テスト環境・Nuxt のエイリアス解決）を読まないため、`document is not defined` で全滅する。
> 必ず `bun run test`（= `vitest`）を経由する。

`bun` が使えない環境（サンドボックス等）では `npm run <script>` で読み替える。
どちらも `package.json` の同じ scripts を実行するため結果は同じ。

**テスト環境は `nuxt`**（`jsdom` + 素の `mount` ではない）。`useSeoMeta` などの
オートインポートを使うページは `defineVitestConfig({ test: { environment: "nuxt" } })`
が無いと `is not defined` で落ちる。設定は `vitest.config.ts` にある。

## 4. TDD 必須サイクル

`.claude/rules/tdd-mandatory-cycle.md` に従う。要点:

1. **Red**: 失敗する契約テストを書き、失敗を目で確認してからコミット（`test(...)`）
2. **Green**: 最小実装 + **原本照合監査 exit 0** を満たしてコミット（`feat(...)`）
3. **Refactor**: `bun run build` / `bun run typecheck` を通してコミット（`refactor(...)`）
4. **Docs**: `docs/PROGRESS.md` を更新してコミット（`chore(docs): ...`）

**一括コミットは重大な規約違反。**

## 5. 新規ページ追加の標準手順

### Step 0: 原本のインベントリを取る

```bash
# 見出し・リスト・表・コードブロック・図解の実数を機械的に把握する
grep -c '^## ' Certified-Associate-in-Project-Management.md
grep -cE '^\s*([-*+]|[0-9]+\.)\s' Certified-Associate-in-Project-Management.md
grep -c '^```' Certified-Associate-in-Project-Management.md | awk '{ print $1 / 2 }'
grep -c '^```mermaid' Certified-Associate-in-Project-Management.md

# 契約テストに貼り付ける期待見出し配列を生成する（原本は .html。§2 の乖離の理由を参照）
SOURCE_FILE=Engineering-management-career-path.html
PAGE=app/pages/engineering-management-career-path.vue
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  "$SOURCE_FILE" "$PAGE" --emit-headings
```

`--emit-headings` の実行前に空の `.vue` を作成する。原本と移植先の両方が読み取り可能でなければ
見出し配列の出力前にエラーになる。

### Step 1: [Red] 契約テストの作成

`tests/pages/<slug>.test.ts` を作成する。原本の要素種別に依存しない
**最低 12 契約**（S-1〜S-4 / C-1〜C-5 / Q-1〜Q-3）を書く。
新規ページの追加では、これに加えて**サイト登録契約 N-1〜N-3**（既存の
`tests/pages/index.test.ts` / `tests/components/SiteHeader.test.ts` の期待値更新）を Red に含める。
C-6 と D-1〜D-5 は適用条件に該当する場合のみ追加する。
**件数だけを見る弱いテストは契約として認めない。**

#### S. 原本照合契約（4 件・必須）

| ID | 内容 | 検証手段 |
|---|---|---|
| S-1 | `h2` の見出しが**原本と完全一致**（順序込み） | `expect(actual).toEqual([...EXPECTED_H2])` |
| S-2 | `h3` の見出しが**原本と完全一致**（順序込み） | `expect(actual).toEqual([...EXPECTED_H3])` |
| S-3 | 原本の外部リンク URL が**全件存在** | URL 集合の包含検証 |
| S-4 | 全 `h2`/`h3` が**一意な id** を持ち、TOC のアンカーが全て実在する見出しを指す | id 重複検査 + アンカー解決検査 |

> 実装例とゲートの考え方: `references/source-parity-audit.md`

#### C. コンテンツ契約（5 件必須 + 1 件条件付き）

| ID | 内容 |
|---|---|
| C-1 | `h1` のテキストが完全一致する |
| C-2 | クイックナビ（TOC リンク）の件数と `href="#..."` 形式 |
| C-3 | サイドバー TOC の初期アクティブ状態を示すクラスが存在する |
| C-4 | 外部リンク全件に `target="_blank"` **かつ** `rel="noopener"`。`noreferrer` は原本に存在するリンクだけ引き継ぐ |
| C-5 | 内部リンクに `.html` 拡張子が含まれない |
| C-6 | **原本に Mermaid 図解がある場合のみ必須**。全図解が専用ラッパーに包まれ、原本から抽出した正規化済み Mermaid ソースと `MermaidDiagram` の全 `chart` 値が**順序・内容・出現回数込みで完全一致**する |

C-6 の実装は `.claude/skills/fix-mermaid/SKILL.md` Part 6 を参照。
`<ClientOnly>` をスタブしないと図が 0 件になる点に注意。

#### D. デザイン契約（原本に対応要素がある場合のみ必須）

| ID | 適用条件 | 内容 |
|---|---|---|
| D-1 | 原本に callout / alert がある | `data-variant` で区別され、原本にある variant が**種類ごとの件数込み**ですべて存在する |
| D-2 | 原本の callout にラベルがある | 全 callout が `[data-testid="callout-label"]` を持ち、ラベル文言が原本と一致する |
| D-3 | 原本に step / stepTag がある | `data-testid="step-tag"` を持ち、件数が**原本の step 数**と一致する |
| D-4 | 原本に voice / blockquote がある | `data-testid="voice"` と話者要素を持つ |
| D-5 | 原本に eyebrow / タグ類がある | `.section-eyebrow` や `.domain-tag` が**順序込み**で一致する |

> [!IMPORTANT]
> **`data-variant` の値は原本のクラス名をそのまま使う。** CAPM では
> `practice` / `source` / `note` であって、`info` / `warn` / `good` ではない。
> 汎用の名前に置き換えると監査のキーが変わり、照合が落ちる。

原本に存在しない要素の契約を要求しない。
**不在要素を作成して契約数を満たすことは faithful 移植ではない。**
CAPM では `<blockquote>` と `<pre>` が 0 件だったため、D-4 とコードブロック契約は書いていない。

> 実装例: `references/design-contract-tests.md`

#### Q. 品質契約（3 件・必須）

| ID | 内容 |
|---|---|
| Q-1 | TOC のスクロール連動（アクティブ見出しの遷移）を composable 単体で検証 |
| Q-2 | `useSeoMeta()` の `title` / `description` が空でなく、`title` が h1 と整合する |
| Q-3 | 見出し階層が飛ばない（`h1 → h3` のようなスキップが無い） |

#### N. サイト登録契約（3 件・**新規ページ追加時のみ必須**）

ページを作っただけでは**どこからも辿り着けない**。導線は原本 HTML に存在しないため、
§5 Step 3 の原本照合監査では登録漏れを検知できない。よってテストで固定する。

| ID | 対象 | 内容 |
|---|---|---|
| N-1 | `tests/pages/index.test.ts` | ホームの公開中ガイド一覧に新ページが**順序・タイトル・`to` 込みの完全一致**で並ぶ |
| N-2 | `tests/components/SiteHeader.test.ts` | グローバルナビのラベルと遷移先が**順序込みの完全一致**で並ぶ |
| N-3 | `tests/components/SiteHeader.test.ts` | 新ページのルートを現在地としたとき、そのリンクだけが `aria-current="page"` を持つ |

既存テストは期待値を配列で持っている。**配列に 1 行足すだけの変更でも Red を先に作る**
（`bun run test tests/pages/index.test.ts tests/components/SiteHeader.test.ts` で失敗を目視確認）。

#### 禁止するテストの書き方（弱い契約）

```ts
// ❌ 件数だけ — セクションを 1 つ落として別を重複させれば通ってしまう
expect(wrapper.findAll("h2")).toHaveLength(15);

// ❌ 存在するかだけ — 1 個でも通る
expect(wrapper.findAll("pre, code").length).toBeGreaterThan(0);

// ❌ 部分一致 — 本文が半分消えても通る
expect(wrapper.text()).toContain("CAPM");
```

```ts
// ✅ 完全一致（順序込み）で「原本と同じものが同じ順に並ぶ」ことを保証する
expect(wrapper.findAll("h2").map((el) => el.text())).toEqual([...EXPECTED_H2]);
```

**Red の確認**: `bun run test tests/pages/<slug>.test.ts` を実行し、
**テストが失敗することを目で確認してからコミットする**。
「まだ `.vue` が無いので import エラー」も正当な Red である。

### Step 2: [Green] `app/pages/<slug>.vue` の実装

> [!CAUTION]
> **100% 完全移植ルール（絶対ルール）**
> 要約・省略・見出しの言い換えは即時規約違反。原本にある全セクション・全段落・
> 全リスト項目・全コードブロック・全表行・全図解・全参考文献リンクを移植する。
> 「冗長だから省いた」「同じ趣旨なのでまとめた」は認めない。

SFC の基本構造:

```vue
<script setup lang="ts">
// Mermaid ソースは script 側にモジュール定数として持つ（テンプレートを汚さない）
const DIAGRAM_WBS = `flowchart TB
S["プロジェクトスコープ"] --> D1["デリバラブル1"]`;

useSeoMeta({
  title: "CAPM® 認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description: "PMI公式サイトと公式Exam Content Outlineに基づくCAPM認定資格の初学者向け完全ガイド。",
});
</script>

<template>
  <article class="doc">
    <h1>CAPM®（Certified Associate in Project Management）認定資格 完全ガイド</h1>

    <section id="what-is-capm">
      <h2>1. CAPM認定資格とは何か</h2>
      <p>…</p>
    </section>

    <div class="mermaid-wrap">
      <ClientOnly>
        <MermaidDiagram :chart="DIAGRAM_WBS" theme="base" />
      </ClientOnly>
    </div>
  </article>
</template>

<style scoped>
/* 装飾のみ。図解の幅・配置は MermaidDiagram.vue の責務（再実装禁止） */
</style>
```

**グローバルヘッダーは各ページで描画しない。** `app/app.vue` が `<SiteHeader />` を
全ページ共通で描画済みなので、ページ側に固有のヘッダーを作らない
（原本 HTML のヘッダー相当部分は、この共通ヘッダーへ置き換わる「正当な差分」として記録する）。

固定ヘッダーの高さは `app/assets/css/main.css` の `--global-nav-height` が SSoT。
sticky なサイドバー・TOC・見出しアンカーは、必ずこの変数で退避させる
（既存 2 ページと同じ式を使う。数値のハードコード禁止）:

```css
.sidebar      { top: var(--global-nav-height); height: calc(100vh - var(--global-nav-height)); }
.toc-sticky   { top: calc(var(--global-nav-height) + 16px); }
:is(h2, h3)   { scroll-margin-top: calc(var(--global-nav-height) + 32px); }
```

これを書かないと、TOC が固定ヘッダーの下へ潜り込み、アンカー遷移で見出しが隠れる。

**横方向の不変条件（レスポンシブ幅で溢れさせない）**:

ページは**どの幅でも横スクロールを出してはならない**。縦スクロールと違い、
横スクロールは読者が本文の右端を見失う（実際に全 45 ページで発生し、右側に
無駄な余白が伸びる症状として報告された）。

`app/app.vue` が敷くシェルは幅を制限しない。**溢れの発生源はページ側の
`<style scoped>` とは限らず、共有部品（`app/components/SiteHeader.vue` /
`app/app.vue`）や全ページ共有の `app/assets/css/main.css` にもあり得る**
（実例: 閉じたドロップダウンが `visibility:hidden` のまま矩形を占有し、全ページで
横スクロールを起こした。§6 の落とし穴表を参照）。調査は必ず**分布から**入り
（§5 Step 5 の表: 全ページ一律なら共有部品、特定ページだけならそのページの scoped CSS）、
ページ側だけを疑って堂々巡りしない。以下の表はページ側で守る不変条件で、
いずれも原本 HTML には存在しない Nuxt 版固有の制約であり、
原本照合監査（構造だけを見る）では検知できない。

| 対象 | やること | 理由 |
|---|---|---|
| 表 | `<div class="table-wrap">` で包み、`overflow-x: auto; max-width: 100%;` を与える | 表は列の最小内容幅より狭くならない。本文カラムが狭まる幅域では必ず溢れる。**表を縮めるのではなくラッパーの中だけでスクロールさせる** |
| 列数固定グリッド | `repeat(<整数>, minmax(<n>px, 1fr))` を避け、`repeat(auto-fit, minmax(<n>px, 1fr))` にする | 列数固定 x px 下限は `<整数> * n + gap * (<整数> - 1)` を下回った時点で必ず溢れる。`auto-fit` は下限を保ったまま列数を可変にする |
| ブレークポイント | サイドバーが**生きている**幅域を必ず確認する | 既存ページの `@media (max-width: 980px)` はサイドバーを解除する幅。981〜1150px の帯ではサイドバー 288px + 左右 padding 144px が本文から引かれる。ここを見落とすと切り替え幅より上に溢れる帯が残る |
| 幅の単位 | `100vw` を使わない（`100%` を使う） | `100vw` は縦スクロールバーを含むビューポート幅。スクロールバーが出ている環境では常にその幅ぶん溢れる |
| 長い英語トークン | 何もしない（基底 CSS が担当） | `app/assets/css/main.css` の `body` が `overflow-wrap: break-word` を持つ。ページ側で `word-break: break-all` を足さない（日本語本文中の英単語が無闇に切れる） |
| 図解 | 幅・配置を書かない | `MermaidDiagram.vue` が SSoT（`.claude/rules/mermaid-diagram-layout.md`）。`:deep(svg) { width: 100% }` は引き伸ばし、`max-width` の再指定は後処理と競合する |

> [!IMPORTANT]
> **これらは静的検査でゲート化できない。** ある指定が溢れるかどうかは、サイドバー幅・
> padding・ブレークポイントの組み合わせで決まり、CSS のテキストからは決定できない
> （実測: 静的パターン検査は 45 ページ中 35 ページを誤検知し、実測では全て Green だった）。
> 唯一の機械的ゲートは **`e2e/no-horizontal-scroll.spec.ts` の実測**である（§5 Step 5）。
> 対象ページは `GUIDES` から自動導出されるため、Step 2.5 のカタログ登録を済ませれば
> 新規ページも自動的にこのゲートに入る。
>
> **測る前に Mermaid の描画完了を待つこと。** 図は `<ClientOnly>` + `onMounted` の
> 非同期描画で、待たずに幅を測ると「まだ図が無い状態」を測ることになり、図が原因の
> 溢れを取り逃がす（偽 Green）。同 spec の `waitForDiagrams()` は `.mermaid-wrap`
> （`ClientOnly` の外側にあるため静的生成の HTML に含まれる）の枚数を期待値にして、
> `svg` または `.diagram-error` が同数そろうまで待つ。図が 0 枚のページでは待たない。
> 横スクロールを実測する別のテストを足す場合も、同じ待機を必ず入れる。

**ディスクレーマー（`.disclaimer-box`）の標準規約**:
原本 HTML の `hero` 直下にある原著・教育注記ボックス（`.disclaimer-box`）は、アイコンとテキストを `display: flex;` で横並びに配置する。
その際、**`<Icon ... />` 以降のテキスト全体を必ず `<span>...</span>` でラップする**。
ラップしない場合、直下のテキストノードや `<em>`・`<a>` タグが個別の Flex Item として扱われ、文章がぶつ切りで横一列に並ぶ表示崩れが発生する。

```html
<div class="disclaimer-box">
  <Icon name="tabler:info-circle" aria-hidden="true" />
  <span>原著: <em>タイトル</em>（著者名著, 出版社, 年）。本ガイドは…<a href="…" target="_blank" rel="noopener">詳細リンク</a>でご確認いただけます。</span>
</div>
```

```css
.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 16px;
  margin-top: 28px;
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}
```

※注意: `.disclaimer-box :deep(span)` と書くと、テキストの `<span>` にまで `flex: none` や `font-size: 20px` が適用されるため、必ず `.disclaimer-box > span { flex: 1; }` と記述する。

**監査スクリプトの前提**: 本文のインベントリは `<template>` ブロックのみを対象とする。
`<script setup>` に書いた文字列は本文として数えられない。逆に、Mermaid の
`:chart="NAME"` バインドは `<script setup>` の `const NAME = \`…\`` を解決して照合される。

### Step 2.5: [Green] ガイドカタログへ登録する

新規ページは**作っただけでは到達不能**。N-1〜N-3 を Green にするため、
ガイドカタログへ 1 件追加する（ホームのカードとグローバルナビの両方がここから生成される）。

| 登録先 | 配列 | 追加する内容 |
|---|---|---|
| `app/utils/guide-catalog.ts` | `GUIDES` | `to` / `categoryId` / `seriesId` / `navLabel`（ナビの短縮名） / `title` / `description` / `meta` / `icon` / `accent` |

`categoryId` は `GUIDE_CATEGORIES` に存在する値でなければ型検査で落ちる。
新しいカテゴリーが必要な場合は `GUIDE_CATEGORIES` に `id` / `navLabel` / `cardLabel` / `icon` を追加する。

`seriesId` は `GUIDE_SERIES`（カテゴリー内の小見出し）に存在する値で、**省略できない**。
シリーズを持たないカテゴリー（現在は `engineering-management` のみ）では `undefined` を明示する。

- シリーズを持つカテゴリーで `undefined` にすると、ナビにラベルの無いカラムとして黙って現れる。
  型では防げないため `tests/utils/guide-catalog.test.ts` の契約テストで落とす。
- 挿入位置は「カテゴリー順 → シリーズ順 → 定義順」を守る。この並びが崩れると
  `seriesGroups` の平坦化が `guides` と一致しなくなり、ナビとホームの並び順が食い違う。
- 新しいシリーズが必要な場合は `GUIDE_SERIES` に `id` / `categoryId` / `navLabel` / `cardLabel` を
  追加する。**アイコンは持たせない**（`.ts` へアイコン名を増やすほど、`clientBundle.scan` の
  設定変更で本番だけ空白になる事故域が広がるため）。

- `to` は `app/pages/<slug>.vue` から決まるルートと**厳密に一致**させる（`.html` を付けない）。
- `icon` は `tabler:*` を使う。`@nuxt/icon` の `clientBundle.scan` がビルド時に走査するため、
  文字列を動的組み立てにすると静的生成で欠落する。**リテラルで書く**。
- `meta`（例: `"15セクション"`）は原本の実数を書く。推測値を書かない。
- `navLabel` は原本のタイトルそのままではなく短縮名でよいが、
  `tests/components/SiteHeader.test.ts` の期待値（シリーズカラム契約を含む）と完全一致させる。

登録後に `bun run test tests/utils/guide-catalog.test.ts tests/pages/index.test.ts tests/components/SiteHeader.test.ts`
が Green になることを確認する。

### Step 3: [Green の前提] 原本照合監査を通す

**目視照合は禁止。機械照合の exit 0 が Green の前提条件。**

```bash
SOURCE_FILE=Engineering-management-career-path.html
PAGE=app/pages/engineering-management-career-path.vue
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  "$SOURCE_FILE" \
  "$PAGE"
echo "exit=$?"   # 0 以外なら転写漏れあり → Green コミット禁止
```

CAPM は `package.json` の `audit:capm` スクリプトに登録済み（`bun run audit:capm`）。
新しいページを追加したら同様のスクリプトを足しておくと、`pre-commit-check` から呼びやすい。

検出項目: 見出し（レベル・順序・出現回数）/ 外部リンク / リスト項目 / コードブロック /
表行 / 段落 / SVG / callout / Mermaid ソース（順序込み完全一致）。

「正当な差分」（原本の `目次` 見出しがサイドバー TOC に置き換わる等）と判断した項目は、
**理由を Green コミットのメッセージ本文か `docs/PROGRESS.md` に必ず書き残す**。
判断の分類表は `references/source-parity-audit.md` §1 を参照。

### Step 4: 図解の中央寄せ・カラー統一

`.claude/rules/mermaid-diagram-layout.md` が SSoT。ページ側 `<style scoped>` では
**幅・配置を書かない**（`border` / `background` / `padding` / `margin` のみ）。
`:deep(svg)` に `width` / `max-width` / `height` を書くことは禁止。

配色は原本 HTML の `themeVariables`（`primaryColor: "#EEF1F8"`,
`primaryBorderColor: "#2E3F72"` 等）をそのまま移植する。詳細は `fix-mermaid` スキル Part 4。

### Step 5: [Refactor] ローカル検証

```bash
bun run test
bun run typecheck
bun run lint
bun run build
bun run test:e2e   # generate + スモーク（Mermaid 実描画・アイコン同梱・横スクロール禁止）
bun run dev        # ブラウザで目視確認（図解・配色・レイアウト）

# 横スクロールだけを素早く確認する（全ページ x 1440 / 1024 / 390px の実測）
bun run test:e2e e2e/no-horizontal-scroll.spec.ts

# CSS 変数の未定義参照チェック（配色崩壊の典型原因）
find app/pages app/components -type f -name '*.vue' -exec grep -ohE 'var\(--[a-z0-9-]+' {} + \
  | sed -E 's/^var\(//' | sort -u \
  | while IFS= read -r v; do
      grep -qE "^[[:space:]]*${v}[[:space:]]*:" app/assets/css/main.css || printf 'UNDEFINED %s\n' "$v"
    done
```

> [!IMPORTANT]
> **`e2e/no-horizontal-scroll.spec.ts` の exit 0 は Green の前提条件**（原本照合監査と同格）。
> 落ちた場合、出力は溢れたページとその px 量を全件挙げる。**分布が原因を示す**:
>
> | 分布 | 原因の在り処 |
> |---|---|
> | 全ページが同じ px 量で溢れる | 共通部品（`SiteHeader.vue` / `app.vue` / `main.css`）。ページ側を触っても直らない |
> | 特定の数ページだけ溢れる | そのページの `<style scoped>`。§5 Step 2「横方向の不変条件」を突き合わせる |
> | 特定の幅だけ溢れる | ブレークポイントの帯の抜け。切り替え幅の**すぐ上**の幅で確認する |
>
> 原因要素の特定は、ブラウザの devtools ではなく実測で行う。`document.querySelectorAll("*")` を
> 走査して `getBoundingClientRect().right > clientWidth` の要素を集め、**祖先に
> `overflow-x: visible` 以外を持つものは除外**する（スクロール容器の中身は
> ドキュメントの `scrollWidth` に効かないため、除外しないと表や図が容疑者として大量に挙がる）。
> それでも該当要素が無ければ犯人は**テキストノード**である（長いラテン文字トークン）。
> `document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)` と `Range.getBoundingClientRect()`
> で走査する。要素の矩形だけを見ていると永久に見つからない。

上記の CSS 変数チェックは、ページ内で定義したローカルなカスタムプロパティ
（例: `.domain-card.d1 { --d-color: … }`）も「未定義」と報告する。
`app/pages/` または `app/components/` 配下の Vue ファイル内に定義があるかを確認したうえで判断する。

### Step 6: [Docs] 同期とコミット前チェック

```bash
# PII / ローカル絶対パスの混入チェック（.claude/rules/no-absolute-paths.md）
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
```

`docs/PROGRESS.md` を更新してからコミットする
（`.claude/rules/migration-progress-sync.md` のゲート条件）。
総合チェックは `pre-commit-check` スキルを使う。

## 6. 既存ページを保守するときの手順

1. 変更対象の `.vue` と対応する `tests/pages/*.test.ts` を読む
2. **契約テストを先に更新**（期待値を実装に合わせて書き換えない。正しいのは常に原本）
3. 実装を修正
4. **原本照合監査を再実行**（保守でも exit 0 を維持する）
5. ページのタイトル・スラッグ・セクション数を変えた場合は、
   `app/utils/guide-catalog.ts` の `GUIDES` を直す（N-1〜N-3 の期待値も更新する）
6. `bun run test` / `bun run typecheck` / `bun run lint` / `bun run build` / `bun run test:e2e`

デザイン不一致（配色・テーブルヘッダー・callout 等）の相談は、
**原本 HTML の該当箇所を読んでから**直す。推測で色を決めない。

### CAPM 移行で踏んだ落とし穴（再発しやすい）

| 症状 | 原因 | 対処 |
|---|---|---|
| 図が 1 枚目しか描画されず 2 枚目以降がエラー表示になる | `<script setup>` は `setup()` にコンパイルされ**インスタンスごとに実行される**。そこに置いた「モジュール singleton」は実際にはインスタンス変数 | singleton を独立モジュール（`app/utils/mermaid-loader.ts`）へ切り出す |
| テストの `wrapper.element` が実要素を指さない | `<template>` の root の兄弟に置いた HTML コメントも VNode として数えられ多重ルートになる | 説明コメントは `<script>` 側の JSDoc に置く |
| コンポーネント内部要素の配色が原本と違う | `.diagram-error` 等はコンポーネント内で描画されるためページ側 `<style scoped>` が到達しない | そのスタイルはコンポーネントの `<style scoped>` が持つ |
| Mermaid 定数が監査で解決されない | フォーマッタがテンプレートリテラルの末尾セミコロンを落とす | `const NAME = \`…\`;` 形式を厳守。stylistic プリセット（既定 `semi: false`）を有効化しない |
| E2E が別プロジェクトの 404 ページを検証する | Playwright の `reuseExistingServer` は応答しているサーバーが自分のものかを検証しない | 既定ポートを避け、`reuseExistingServer: false` にする |
| E2E の TOC スクロールが届かない | Mermaid 描画のたびに文書高さが変わり、スムーススクロールの目標位置が動く | 図の描画完了を待ってからクリックし、長距離スクロールはタイムアウトを延ばす |
| サイドバー TOC がグローバルヘッダーの下に潜る / アンカー遷移で見出しが隠れる | sticky の `top` と `scroll-margin-top` が固定ヘッダー分を退避していない | `--global-nav-height` を使う（§5 Step 2 の 3 行）。数値のハードコード禁止 |
| 新ページが完成しているのにサイト上から到達できない | `guide-catalog.ts` の `GUIDES` は原本に無いため、原本照合監査では検知されない | N-1〜N-3 契約で固定する（§5 Step 1 / Step 2.5） |
| ナビ・カードのアイコンが静的生成後だけ消える | `@nuxt/icon` の `clientBundle.scan` はソース中のリテラルしか走査しない | `icon` 名は動的組み立てにせずリテラルで書き、`bun run test:e2e` で確認する |
| 全ページで右側に無駄な余白が伸び、横スクロールできてしまう | 閉じたドロップダウンが `visibility:hidden` でレイアウトを占有したまま画面外へ突き抜ける。`visibility` は `display:none` と違い矩形が生きる | `.global-header` に `overflow-x: clip; overflow-y: visible`。`hidden` はスクロールコンテナを作り sticky と絶対配置の包含ブロックを壊すので使わない。片軸だけクリップできる組み合わせは `clip`/`visible` だけ |
| ブレークポイントを設けたのに、特定の幅の帯だけグリッドが溢れる | 切り替え幅（980px）より上に、サイドバー 288px が生きたまま本文が足りない帯（981〜1150px）が残っていた | 列数固定をやめて `repeat(auto-fit, minmax(<n>px, 1fr))` にする。帯を潰すためにブレークポイントを増やす方向へ行かない（また別の帯が空く） |
| 狭い幅で 1 ページだけ数十 px 溢れ、原因要素が見つからない | 犯人が要素ではなく**テキストノード**（`(Responsible/Accountable/Consulted/Informed)` のような長いラテン文字トークン）。要素の矩形走査では捕まらない | 基底 CSS の `body` に `overflow-wrap: break-word`。`anywhere` は min-content 幅を変えて既存レイアウトを動かすため使わない |
| ディスクレーマー（`.disclaimer-box`）内のテキストがぶつ切りで横一列に崩れる | `.disclaimer-box` に `display: flex;` を適用しているが、テキストを `<span>` でラップしていないため直下のテキストや `<em>`・`<a>` が個別の flex item になる | `<Icon ... />` 以降のテキスト全体を `<span>...</span>` で囲み、CSS で `.disclaimer-box > span { flex: 1; }` を指定する |

## 7. Constraints（禁止事項）

### 内容に関する禁止

- 原本のセクション・段落・リスト項目・表行・リンクの省略、要約、言い換え
- 原本に存在しない要素の追加（契約数を満たすための捏造を含む）
- 原本の数値（出題比率・料金・PDU 数等）の書き換え

### テストに関する禁止

- 件数のみ / 存在のみ / 部分一致のみの「弱い契約」
- 期待値を実装に合わせて書き換えること
- Red を確認せずに実装から書き始めること
- `bun test`（ネイティブランナー）でのテスト実行

### 実装に関する禁止

- ページ側 `<style scoped>` での図解の幅・配置の再実装（`:deep(svg)` の幅指定）
- `assets/css/main.css` に存在しない CSS 変数の `var()` 参照
- 原本 HTML の削除（原本は Git 追跡下に維持する）
- 監査 exit 0 を確認せずに Green コミットすること
- ページ側で独自のグローバルヘッダー／サイト内ナビを実装すること（`app/components/SiteHeader.vue` が SSoT）
- 固定ヘッダー分の退避を `72px` 等の数値で直書きすること（`--global-nav-height` を使う）
- ガイドカタログ（`app/utils/guide-catalog.ts` の `GUIDES`）へ登録しないまま、
  新規ページの移行完了を報告すること
- 横スクロールを生む指定（列数固定 x px 下限のグリッド / `overflow-x` を持たない表のラッパー /
  `width: 100vw`）を残すこと
- `e2e/no-horizontal-scroll.spec.ts` の exit 0 を確認せずに Green コミットすること
- 横スクロールを `body { overflow-x: hidden }` で塞ぐこと。症状を隠すだけで原因が残り、
  以後この種の欠陥が**検知不能になる**（クリップしてよいのは、はみ出しの発生源が
  特定できていて、かつその要素の内側で完結する場合だけ）

## 8. 関連ファイル

| ファイル | 役割 |
|---|---|
| `scripts/audit_source_parity.mjs` | 原本照合監査（`node` で実行。`.vue` / `.tsx` 両対応） |
| `scripts/audit_source_parity.test.mjs` | 上記のテスト（`node --test` で実行） |
| `references/source-parity-audit.md` | 監査結果の判断基準と S 契約の実装例 |
| `references/design-contract-tests.md` | D 契約の実装例 |
| `references/implementation-reference.md` | 実装リファレンス（設定・共有部品の骨子） |
| `app/pages/capm.vue` / `tests/pages/capm.test.ts` | 移行済みページと契約テストの参照実装 |
| `app/pages/index.vue` / `tests/pages/index.test.ts` | ホーム（ガイド一覧）の登録先と契約 |
| `app/components/SiteHeader.vue` / `tests/components/SiteHeader.test.ts` | グローバルナビの登録先と契約 |
| `app/app.vue` / `tests/app.test.ts` | アプリシェル（ヘッダー + ページ）の描画順契約 |
| `e2e/no-horizontal-scroll.spec.ts` | 横スクロール禁止の実測ゲート（全ページ x 1440 / 1024 / 390px） |
| `.claude/rules/tdd-mandatory-cycle.md` | TDD とコミット分割の強制ルール |
| `.claude/rules/mermaid-diagram-layout.md` | 図解レイアウトの不変条件 |
| `.claude/skills/fix-mermaid/SKILL.md` | Mermaid の構文・配色・テスト契約 |
