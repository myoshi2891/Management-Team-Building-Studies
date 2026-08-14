---
name: nuxt-page-migration
description: >
  Migrate the static HTML/Markdown certification guides in this repository to Nuxt.js
  (Vue 3) pages/*.vue using TDD, and maintain already-migrated pages. Enforces a
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
  Applies: source-parity audit script, contract tests (Vitest + Vue Test Utils),
  Vue SFC structure, scoped CSS, Mermaid via ClientOnly, and the content-width policy.
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

最終更新: 2026-08-14

> [!IMPORTANT]
> **Nuxt プロジェクトはまだ存在しない。**
> 本スキルは移行の設計契約であり、`nuxt.config.ts` / `package.json` 作成後に
> 実パス・実コンポーネント名で肉付けする。**未確認の実装詳細を「実装済み」として書かない。**
> 現時点で確実に動作するのは §5 Step 3 の原本照合監査スクリプトのみ（`node` 単体で実行可）。

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
6. 本スキルの `references/source-parity-audit.md`

## 2. 移行元と移行先

| | 内容 |
|---|---|
| **原本（Markdown）** | `Certified-Associate-in-Project-Management.md` — 章立ての正 |
| **原本（HTML）** | `Certified-Associate-in-Project-Management.html` — デザイン・図解の正 |
| **移行先** | `pages/<slug>.vue`（Nuxt のファイルベースルーティング） |

Markdown と HTML は**同じ内容の2形態**。章構成・本文は `.md`、
配色・レイアウト・Mermaid のソースは `.html` を参照する。

### Next.js からの読み替え表（他プロジェクトの資産を流用する場合）

| Next.js | Nuxt |
|---|---|
| `app/**/page.tsx` | `pages/**/*.vue` |
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
```

> [!WARNING]
> **`bun test` を直接使わない。** Bun ネイティブランナーは Vitest の設定
> （jsdom 環境・Nuxt のエイリアス解決）を読まないため、`document is not defined` で全滅する。
> 必ず `bun run test`（= `vitest`）を経由する。

## 4. TDD 必須サイクル

`.claude/rules/tdd-mandatory-cycle.md` に従う。要点:

1. **Red**: 失敗する契約テストを書き、失敗を目で確認してからコミット（`test(...)`）
2. **Green**: 最小実装 + **原本照合監査 exit 0** を満たしてコミット（`feat(...)`）
3. **Refactor**: `bun run build` / `bunx nuxi typecheck` を通してコミット（`refactor(...)`）
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

# 契約テストに貼り付ける期待見出し配列を生成する
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  Certified-Associate-in-Project-Management.md pages/<slug>.vue --emit-headings
```

`--emit-headings` の実行前に空の `.vue` を作成する。原本と移植先の両方が読み取り可能でなければ
見出し配列の出力前にエラーになる。

### Step 1: [Red] 契約テストの作成

`tests/pages/<slug>.test.ts` を作成する。原本の要素種別に依存しない
**最低 12 契約**（S-1〜S-4 / C-1〜C-5 / Q-1〜Q-3）を書く。
C-6 と D-1〜D-4 は適用条件に該当する場合のみ追加する。
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
| D-1 | 原本に callout / alert がある | `data-variant="info"/"warn"/"good"` で区別され、原本にある variant がすべて存在する |
| D-2 | 原本に warn callout がある | `[data-variant="warn"]` がラベル子要素を持つ |
| D-3 | 原本に step / stepTag がある | `data-testid="step-tag"` を持ち、件数が**原本の step 数**と一致する |
| D-4 | 原本に voice / blockquote がある | `data-testid="voice"` と話者要素を持つ |

原本に存在しない要素の契約を要求しない。
**不在要素を作成して契約数を満たすことは faithful 移植ではない。**

> 実装例: `references/design-contract-tests.md`

#### Q. 品質契約（3 件・必須）

| ID | 内容 |
|---|---|
| Q-1 | TOC のスクロール連動（アクティブ見出しの遷移）を composable 単体で検証 |
| Q-2 | `useSeoMeta()` の `title` / `description` が空でなく、`title` が h1 と整合する |
| Q-3 | 見出し階層が飛ばない（`h1 → h3` のようなスキップが無い） |

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

### Step 2: [Green] `pages/<slug>.vue` の実装

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

**監査スクリプトの前提**: 本文のインベントリは `<template>` ブロックのみを対象とする。
`<script setup>` に書いた文字列は本文として数えられない。逆に、Mermaid の
`:chart="NAME"` バインドは `<script setup>` の `const NAME = \`…\`` を解決して照合される。

### Step 3: [Green の前提] 原本照合監査を通す

**目視照合は禁止。機械照合の exit 0 が Green の前提条件。**

```bash
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  Certified-Associate-in-Project-Management.md \
  pages/<slug>.vue
echo "exit=$?"   # 0 以外なら転写漏れあり → Green コミット禁止
```

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
bunx nuxi typecheck
bun run build
bun run dev     # ブラウザで目視確認（図解・配色・レイアウト）
```

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
5. `bun run test` / `bunx nuxi typecheck` / `bun run build`

デザイン不一致（配色・テーブルヘッダー・callout 等）の相談は、
**原本 HTML の該当箇所を読んでから**直す。推測で色を決めない。

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

## 8. 関連ファイル

| ファイル | 役割 |
|---|---|
| `scripts/audit_source_parity.mjs` | 原本照合監査（`node` で実行。`.vue` / `.tsx` 両対応） |
| `scripts/audit_source_parity.test.mjs` | 上記のテスト（`node --test` で実行） |
| `references/source-parity-audit.md` | 監査結果の判断基準と S 契約の実装例 |
| `references/design-contract-tests.md` | D 契約の実装例 |
| `references/implementation-reference.md` | 実装リファレンス（Nuxt 作成後に肉付け） |
| `.claude/rules/tdd-mandatory-cycle.md` | TDD とコミット分割の強制ルール |
| `.claude/rules/mermaid-diagram-layout.md` | 図解レイアウトの不変条件 |
| `.claude/skills/fix-mermaid/SKILL.md` | Mermaid の構文・配色・テスト契約 |
