---
name: fix-mermaid
description: >
  Use this skill to fix Mermaid diagram syntax errors, rendering issues,
  sizing/centering, and color/dark-mode styling problems — in the static HTML
  guides in this repository (DIAGRAMS-object + mermaid.render pattern) and in the
  Nuxt shared component app/components/MermaidDiagram.vue.
  Trigger when the user mentions: "mermaid error", "Syntax error in text",
  "mermaid not rendering", "diagram is broken", "all diagrams crashed",
  "文字が読めない", "はみ出している", "図が醜い", "ダークモードで見にくい",
  "シーケンス図が切れている", "マインドマップの色がおかしい",
  "図解が左寄せ", "図が中央寄せにならない", "図が切れる/はみ出す",
  or references a Mermaid version error.
  Covers: syntax fixes, SVG sizing + shrink-to-fit centering, mindmap/sequence
  coloring, foreignObject CSS limitations, font-loading timing, and the
  component-owned layout contract for the Nuxt site.
---

# Mermaid 修正・スタイリングスキル

最終更新: 2026-08-15

## 対象

- Mermaid 図の構文エラー（`Syntax error in text` / 図が描画されない）
- 配色崩れ（マインドマップ・シーケンス図）
- SVGサイズ・クリッピング・**中央寄せ**問題
- Nuxt 共有コンポーネント `app/components/MermaidDiagram.vue` のレイアウト（Part 4）
- Nuxt 移行時の図解の転写漏れ検知（Part 6）

## 現行スタック

| 項目 | 値 | 影響 |
|---|---|---|
| mermaid | **v11**（CDN: `mermaid@11/dist/mermaid.min.js`） | `mermaid.render` は `{ svg }` オブジェクトを返す |
| 静的 HTML | リポジトリ直下の `*.html`（単一ファイル・CDN 直読み） | ビルド工程なし。ブラウザで直接開いて検証する |
| 移行先 | Nuxt 4（Vue 3）/ `app/pages/*.vue` 手書き移行 | CAPM は移行済み。Part 4 は実装済みの `app/components/MermaidDiagram.vue` を正とする |

> [!IMPORTANT]
> **このリポジトリの HTML は `<div class="mermaid">` 方式を採用していない。**
> JS の `DIAGRAMS` オブジェクト（テンプレートリテラル）に図のソースを持ち、
> `mermaid.render()` を手動で呼んで `innerHTML` に流し込む方式（Part 2-1 / Part 3 で解説）。
> したがって:
>
> - `mermaid.initialize({ startOnLoad: false })` である
> - 同梱の `scripts/fix_mermaid.py` は `<div class="mermaid">` 前提のため、
>   **現行 HTML には1件もマッチしない**。将来 `<div class="mermaid">` 方式の
>   HTML を扱う場合にのみ使う
> - 図の追加・修正は `DIAGRAMS` オブジェクトを直接編集する

**関連ルール・スキル**

> **レイアウトの不変条件は `.claude/rules/mermaid-diagram-layout.md` が SSoT**（中央寄せ・列幅への縮小フィット・
> `useMaxWidth:false`・ページ側で幅を強制しない）。本スキルはその実装ガイド。
> Nuxt 側で図解が左寄せ・切れる場合は Part 4 を、静的 HTML の描画問題は Part 2–3 を参照する。
> CDN のバージョン固定・SRI については `cdn-sri-mermaid-fix` スキルを参照。

---

## Part 1: 構文修正

### Mermaid v10 の必須ルール

1. コンテンツは**カラム0配置**（先頭空白なし）
2. 各ステートメントは**改行で分離**（1行に複数連結しない）
3. ノードラベル `A["text"]` の内容は**1行に収める**
4. `mindmap` のみ例外 — 内部インデントは階層構造を表すため保持する
5. `block-beta` は**使用禁止** — v10.9.5 で全体クラッシュの原因になる。`graph TD` で代替する

### よくある原因（HTMLフォーマッタによる破壊）

- 14スペース等のHTMLインデントがMermaidコンテンツに混入する
- 長いノードラベルが行分断される（`A["テキスト` と `続き"]` に分かれる）
- 複数ステートメントが1行に連結される（`graph TD A["x"] B["y"] A --> B`）

### 修正手順

1. `grep_search` で `<div class="mermaid">` を全検索してブロック数を把握する
2. 各ブロックを `view_file` で確認し、上記ルール違反を特定する
3. `replace_file_content` / `multi_replace_file_content` で各ブロックの内容を修正する
   - `<div>` タグ自体のインデントは変更しない
   - タグ内のMermaidコンテンツのみを置換対象にする

### ダイアグラム別の注意点

| 種別 | 注意点 |
| ------ | -------- |
| `graph` / `flowchart` | 最頻出。カラム0ルールを厳守 |
| `sequenceDiagram` | `Note over A,B:` は1行に収める |
| `mindmap` | 内部インデント保持（唯一の例外） |
| `block-beta` | **使用禁止**（全体クラッシュ） |
| `htmlLabels: true` 環境 | `<` → `&lt;`、`>` → `&gt;` に変換 |

### ブラウザレンダラーで Syntax Error を起こす文字・構文

| 箇所 | 問題のある記述 | 対処 |
| ------ | --------------- | ------ |
| `subgraph` ラベル | 丸括弧 `()` を含む | 削除または別表現に置換 |
| `subgraph` ラベル | 絵文字（`🌐` `🖥️` 等） | 削除 |
| `participant ... as` | 絵文字（`👤` `⚡` 等） | 削除 |
| エッジラベル `\|...\|` | 先頭スラッシュ `\|/command\|` | スラッシュを除去 |
| ノードラベル `["..."]` | 全角波ダッシュ `〜` | `から` 等の日本語に置換 |
| ノードラベル `["..."]` | スラッシュ `path/to` | `-` またはスペースに置換 |
| 菱形ノード `{}` | クォートなし日本語 `{新しいファイル}` | `{"新しいファイル"}` とクォートする |

---

## Part 2: ダークモード配色・スタイリング（2026年6月追記）

> **重要:** HTMLでMermaidをダークモードで使う場合、マインドマップ・シーケンス図には固有の落とし穴がある。
> CSS セレクタだけで対処しようとすると失敗する。以下の手順に従うこと。

### 2-1: JSテンプレートリテラル方式（必須の前提）

`<div class="mermaid">` に直接書くと IDEフォーマッタが破壊する。**必ずJSテンプレートリテラル方式を使う**。

```html
<!-- ✅ JSテンプレートリテラル方式 -->
<div id="diag-cli"></div>
<script>
const DIAGRAMS = {
  'diag-cli': `mindmap
  root((sandbox CLI))
    サンドボックス管理
      list - ls`,
};
mermaid.initialize({ startOnLoad: false, theme: 'dark', ... });
(async () => {
  if (document.fonts) await document.fonts.ready; // ← フォントロード完了を待つ（重要！）
  for (const [id, src] of Object.entries(DIAGRAMS)) {
    const { svg } = await mermaid.render('svg-' + id, src);
    document.getElementById(id).innerHTML = svg;
    // SVGサイズ・スタイル後処理をここで行う
  }
})();
</script>
```

> **⚠️ フォントロード待ちが必須**: `await document.fonts.ready` を省略すると、
> Webフォント（Inter等）のロード前にMermaidが文字幅を計算するため、
> **ノード幅が狭くなり文字がはみ出す**。必ず追加すること。

### 2-2: mermaid.initialize の themeVariables 設定

ダークモードの基本設定に加え、**マインドマップ専用の `cScale0〜11`** を必ず設定する。
これを省略するとMermaidデフォルトの原色（赤・緑・紫）が使われ、ダークモードで非常に醜くなる。

```js
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: "'Inter', system-ui, sans-serif",
  themeVariables: {
    background: '#0a0a0a',
    primaryColor: '#1e3a5f',
    primaryTextColor: '#93c5fd',
    primaryBorderColor: '#3b82f6',
    lineColor: '#374151',
    actorBkg: '#1e3a5f',
    actorBorder: '#3b82f6',
    actorTextColor: '#93c5fd',
    actorLineColor: '#374151',
    noteBkgColor: '#2d1b4e',
    noteTextColor: '#d8b4fe',
    /* ★ マインドマップ枝カラー: これを設定しないと原色になる */
    cScale0: '#1e3a5f', cScale1: '#111827', cScale2: '#1a1a2e',
    cScale3: '#1e2a3a', cScale4: '#121825', cScale5: '#111111',
    cScale6: '#1a1f2e', cScale7: '#0f1923', cScale8: '#1e3a5f',
    cScale9: '#111827', cScale10: '#1a1a2e', cScale11: '#1e2a3a',
  },
  flowchart: { curve: 'basis', padding: 20 },
  /* ★ シーケンス図: mirrorActors:true で上下両方にアクターボックスを表示 */
  sequence: { mirrorActors: true, noteMargin: 10, useMaxWidth: false },
});
```

### 2-3: SVGサイズ後処理（レンダリング後に必ず実行）

> **☠️☠️ 最大の落とし穴： `useMaxWidth: true` は「図を強制で全幅に引き伸ばす」**
>
> `mermaid.initialize({ flowchart: { useMaxWidth: true } })` は、
> Mermaid が SVG を生成する際に `max-width: 100%` を **inline style** で強制的に割り当てる。
> これが `width: 100%` のコンテナの中に入ると、菱形ノードやシーケンス図が画面全幅に拡大する。
>
> **正解は `useMaxWidth: false` を設定し、分類は CSS 側で行う。**

```js
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  // ✅ すべて false —— Mermaidに SVGサイズを営ませない
  flowchart: { useMaxWidth: false, htmlLabels: true },
  sequence: { useMaxWidth: false, mirrorActors: true, noteMargin: 10 },
  mindmap:  { useMaxWidth: false },
  // ❌ NG: useMaxWidth: true  ← コンテナ全幅に引き伸ばされて巨大化する
});
```

```js
// SVG 後処理：実寸を維持しつつコンテナ幅で上限
const svgEl = el.querySelector('svg');
if (svgEl) {
  svgEl.removeAttribute('width');
  svgEl.removeAttribute('height');
  svgEl.style.display  = 'block';
  svgEl.style.width    = 'auto';    // ✅ 実寸維持
  svgEl.style.maxWidth = '100%';    // ✅ コンテナ幅を超えない
  svgEl.style.height   = 'auto';    // ✅ 縦横比を保つ
  svgEl.style.margin   = '0 auto';  // ✅ 中央寄せ
  svgEl.style.overflow = 'visible'; // ✅ シーケンス図下部切れ防止
}
```

> **⚠️ `max-width: N px` の種別別制限はやらない**
>
> TDフローチャートに `max-width: 560px` を設定すると、
> 横方向にノードが広がる図（多岐分岐フロー等）は逆に小さくなって文字が読めなくなる。
> Mermaidの SVG 実寸はノード内容と横幅に依存し、一恙に制限できない。
> **種別の `max-width` 制限はおこなわない**。コンテナ幅の CSS 上限 (`max-width: 100%`) のみで十分。

CSSにもフォールバックを追加:

```css
.mermaid-wrap .mermaid {
  display: block;
  width: fit-content; /* ✅ SVG実寸に任せる（巨大化しない） */
  max-width: 100%;    /* ✅ コンテナ幅を超えない */
  margin: 0 auto;     /* ✅ 中央寄せ */
  /* ❌ NG: width: 100%  ← 巨大化の原因になる */
}
.mermaid-wrap .mermaid svg {
  display: block;
  width: auto;     /* ✅ */
  max-width: 100%; /* ✅ */
  height: auto;
  overflow: visible;
}
```

### 2-4: マインドマップ ダークモード配色の落とし穴と対処法

**❌ 以下の方法は機能しない（よくある間違い）:**

```css
/* NG: .depth-0 などのクラスはMermaid v10 mindmapでは生成されない */
.mermaid svg .mindmap-node.depth-0 rect { fill: blue !important; }

/* NG: SVG内<style>はforeignObject内のHTMLに cascade しない */
/* SVG内に<style>を注入してもforeignObject内のdiv/spanの色は変わらない */
```

**✅ 正しい対処法（3段構え）:**

#### ① ドキュメントhead CSSでforeignObject内HTMLをターゲット

```css
/* SVG内<style>ではforeignObject内HTMLに届かないため、headのCSSで直接指定する */
#diag-cli foreignObject div,
#diag-cli foreignObject span,
#diag-cli foreignObject p,
#diag-best-practices foreignObject div,
#diag-best-practices foreignObject span,
#diag-best-practices foreignObject p {
  color: #e2e8f0 !important;
  -webkit-text-fill-color: #e2e8f0 !important;
}
```

#### ② JS直接操作でノード背景のインラインstyleを上書き

> **完全実装コード**: `references/mermaid-v10-guide.md` §「applyMindmapStyle 関数」を参照。
> 要点: `g.mindmap-node > rect/circle/ellipse` に `fill/stroke` を `setProperty(..., 'important')` で設定し、
> `requestAnimationFrame` で遅延再適用する。

#### ③ レンダー後に呼び出す

```js
const MINDMAP_IDS = ['diag-cli', 'diag-best-practices'];
if (MINDMAP_IDS.includes(id)) {
  applyMindmapStyle(svgEl);
}
```

### 2-5: シーケンス図 下部切れ問題

**症状:** 最後のメッセージや Note、アクターボックス（下段）が切れて見えない。

**原因と対処:**

| 原因 | 対処 |
|---|---|
| `mirrorActors: false` でアクターが上段のみ | `mirrorActors: true` に変更 |
| SVGのheight属性を削除した後にviewBoxが存在しない | `overflow: visible` をSVGに設定 |
| `useMaxWidth` のデフォルト制限 | `useMaxWidth: false` を設定 |

```js
// sequence設定
sequence: { mirrorActors: true, noteMargin: 10, useMaxWidth: false }

// SVG後処理でoverflow: visibleを必ず設定
svgEl.style.overflow = 'visible';
```

### 2-6: ノードラベルのはみ出し（文字切れ）対策

ノード内テキストがはみ出す場合、以下を確認:

1. **フォントロード待ち**: `await document.fonts.ready` が実装されているか（最重要）
2. **ラベルにパディング用スペースを追加**: `A["text"]` → `A[" text "]`（前後に半角スペース）
3. **サブグラフタイトルを短縮**: 長いタイトルはノード幅計算に影響する

---

## Part 3: JSテンプレートリテラル方式（恒久対策）

`<div class="mermaid">` に直接書くと、VSCode/Prettier が保存のたびにインデントを付加して構文を壊す。
**恒久対策は JS テンプレートリテラルへの移管**。この方式では `-->` を `--&gt;` にエスケープする必要もなくなる。

```html
<!-- ❌ Prettierが保存時にインデントを付加して破壊する -->
<div class="mermaid">
graph LR
A --> B
</div>

<!-- ✅ JSテンプレートリテラル方式（IDEが一切触れない） -->
<div id="diag-0"></div>
```

> **完全実装コード（mermaid.initialize + SVG後処理 + DIAGRAMS オブジェクト全体）**:
> `references/mermaid-v10-guide.md` §「JSテンプレートリテラル完全実装例」を参照。

---

## Part 4: Nuxt (Vue 3) 移植時の注意点

> [!NOTE]
> **実装済み。** `app/components/MermaidDiagram.vue` / `app/plugins/mermaid.client.ts` /
> `app/utils/mermaid-loader.ts` が実在する。本パートと食い違う場合は**実コードが正**。

### レイアウトはコンポーネントが真実の源

中央寄せ・全幅・縮小フィットは **共有コンポーネント `app/components/MermaidDiagram.vue` が
一元的に担当**する。各ページの `<style scoped>` で `.mermaid` / `svg` の幅・配置を
強制してはならない（引き伸ばし・縮小・左寄せの三分裂を招く）。
不変条件の詳細は `.claude/rules/mermaid-diagram-layout.md` を参照。

サイト全体の Mermaid 設定は、クライアントプラグインでアプリ起動時に一度だけ初期化する。
図のマウントごとに `mermaid.initialize` を呼ぶと、同時描画する別の図の設定を上書きするため禁止する。

```ts
// app/plugins/mermaid.client.ts
import mermaid from "mermaid";

export default defineNuxtPlugin(() => {
  mermaid.initialize({
    startOnLoad: false,
    htmlLabels: true,
    // 自然サイズを起点に縮小するため flowchart/sequence/mindmap とも false
    flowchart: { useMaxWidth: false },
    sequence: { useMaxWidth: false },
    mindmap: { useMaxWidth: false },
  });
});
```

`MermaidDiagram.vue` は **図ごとの frontmatter config + 2層構造 + svg 後処理**で
設定とレイアウトを自己完結させる契約:

```vue
<script setup lang="ts">
import { loadMermaid } from "~/utils/mermaid-loader";

const props = defineProps<{
  chart: string;
  theme?: string;
  themeVariables?: Record<string, string>;
  maxHeight?: string;
}>();
const el = ref<HTMLElement | null>(null);
const diagramId = `m-${useId()}`;

function chartWithConfig(): string {
  const config = {
    theme: props.theme ?? "base",
    themeVariables: { fontSize: "16px", ...props.themeVariables },
  };
  // JSON の object literal は YAML flow mapping として有効。
  return `---\nconfig: ${JSON.stringify(config)}\n---\n${props.chart}`;
}

onMounted(async () => {
  const mermaid = await loadMermaid();
  const { svg } = await mermaid.render(diagramId, chartWithConfig());
  if (!el.value) return;
  el.value.innerHTML = svg;
  // 列幅より広い図は列幅まで縮小して中央に収める（切れ・左寄りを防ぐ）
  const svgEl = el.value.querySelector("svg");
  if (svgEl instanceof SVGElement) {
    svgEl.style.maxWidth = "100%"; // mermaid が付ける inline max-width を上書き
    svgEl.style.height = "auto";   // アスペクト比を保って縮小
    svgEl.style.maxHeight = props.maxHeight ?? "";
  }
});
</script>

<template>
  <!-- 外側 = フレーム全幅（列幅） -->
  <div class="mermaid-scroll" style="width: 100%">
    <!-- 内側 = flex 中央寄せ。svg は上で max-width:100% 化され列幅に収まる -->
    <div ref="el" class="mermaid"
         style="display: flex; justify-content: center; min-height: 4rem" />
  </div>
</template>
```

**振る舞い**: 列幅に収まる図は自然サイズで中央寄せ、列幅より広い図は**列幅まで縮小して中央寄せ**
（横スクロールも切れも起こさない）。svg への `max-width:100%` は mermaid が付ける inline style を
上書きするため、**コンポーネント内で JS 後処理として付与**する（CSS では inline に負ける）。

### `<ClientOnly>` で包む

Mermaid は DOM を必要とするため SSR できない。ページ側では `<ClientOnly>` で包み、
フォールバックに図の説明文を置くとレイアウトシフトを抑えられる。

```vue
<ClientOnly>
  <MermaidDiagram :chart="DIAGRAM_WBS" />
  <template #fallback>
    <p class="diagram-loading">図を読み込み中…</p>
  </template>
</ClientOnly>
```

`app/components/` 直下に置けば Nuxt の自動インポートが効くため、`import` 文は不要。

### props（実装済み。`app/components/MermaidDiagram.vue` が正）

| prop | 型 | 用途 |
|---|---|---|
| `chart` | `string` | Mermaid ソース。**左端揃え必須**（インデント混入は構文エラー） |
| `theme` | `"base" \| "default" \| "dark" \| "forest" \| "neutral"` | 現行 HTML はライト基調のため `"base"` が既定 |
| `themeVariables` | `Record<string, string>` | `theme="base"` のときのみ意味を持つ |
| `maxHeight` | `string` | 巨大化する図（少ノードの `stateDiagram-v2` 等）**だけ**に個別指定 |

> `themeVariables` は**モジュールレベル定数**として定義する。テンプレート内でオブジェクトリテラルを
> 直接書かず、図ごとの frontmatter config を予測可能に保つ。

```vue
<script setup lang="ts">
// ✅ モジュールレベル定数（安定参照）
const LIGHT_THEME_VARS = { fontSize: "16px", primaryColor: "#EEF1F8" };
</script>

<template>
  <!-- ✅ -->
  <MermaidDiagram :chart="DIAGRAM_WBS" theme="base" :theme-variables="LIGHT_THEME_VARS" />
  <!-- ❌ 毎レンダー新しいオブジェクトになり、設定値の追跡が不安定 -->
  <MermaidDiagram :chart="DIAGRAM_WBS" theme="base" :theme-variables="{ fontSize: '16px' }" />
</template>
```

### ページ側 `<style scoped>` の書き方

```vue
<style scoped>
/* ✅ 正解: フレームは装飾（border / background / padding / margin）だけ */
.mermaid-wrap {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-paper-raised);
  padding: 20px;
  margin: 24px 0;
}

/* ❌ 禁止: レイアウトの再実装。以下は書かない（コンポーネントの責務） */
/* .mermaid-wrap :deep(.mermaid) { display: flex; justify-content: center; width: 100% } */
/* .mermaid-wrap :deep(svg)      { width: 100% }                 ← 引き伸ばし */
/* .mermaid-wrap :deep(svg)      { max-width: 100% !important }   ← 後処理と競合 */
</style>
```

Vue の `scoped` は子コンポーネント内部の要素に届かないため、Mermaid が生成した SVG に
CSS を当てるには `:deep()` が必要になる。**必要になった時点で「レイアウトを再実装していないか」を
疑うこと** — 配色補正以外で `:deep(svg)` を書く理由はほとんどない。

### ⚠️ 存在しない CSS 変数を `var()` で参照しない

現行 HTML は `:root` に `--color-paper` / `--color-ink` / `--color-indigo` 等の
名前付きパレットを定義している。Nuxt 側へは `assets/css/main.css` に移植する。
移植前の変数名を `var()` で参照すると**ビルドは通るが実行時に透明・崩壊**する。

```css
/* ❌ NG: 移植していない変数を参照 */
.mermaid-card { background: var(--bg-card); }

/* ✅ OK: main.css の :root に実在する変数を参照 */
.mermaid-card { background: var(--color-paper-raised); }
```

移植した変数名の一覧は `CLAUDE.md` および `assets/css/main.css` を正とする。

### ⚠️ `themeVariables.fontSize` は固定 px 値を使う

`"1rem"` は図の種別によって解釈が異なり**サイズが不揃いになる**。
既定は `"16px"`。上書きする場合も `"14px"` / `"18px"` などの固定ピクセル値を使う。

```ts
// ✅ 既定値は 16px。呼び出し側の固定 px 指定があれば保持する
themeVariables: { fontSize: "16px", ...props.themeVariables }
```

SVG の `font-size` は継承可能だが、Mermaid が生成した `<text>` に明示的な `font-size` が
ある場合はそちらが優先される。`.mermaid-wrap { font-size: 1rem }` が効かないときは
Mermaid 側の明示指定を確認する。

### ⚠️ `stateDiagram-v2` はノード数が少ないと文字が巨大化する

`stateDiagram-v2` はノードが3〜5個程度だと Mermaid が広い `viewBox` を生成するため、
自然サイズ表示で文字が巨大化する。逆に `flowchart LR` はノードが密集して小さくなる。

**グローバルな `max-height` で全 SVG を一律制限してはならない**（コンパクトな図まで縮小される）。
**正解: 問題のある図解だけに `maxHeight` prop を指定する。**

手順: 全図解をブラウザで目視確認 → 巨大化している図を特定 → その図だけに `maxHeight` を指定 →
高さが適切になるまで数値を微調整。ページ CSS で SVG を直接上書きしない。

---

## Part 5: Mermaidを諦めてHTML/CSSに置き換えるべきケース

以下は CSS では対処不能なため、**純粋な HTML/CSS ウィジェットに置き換える**：

- `flowchart TD` で 5〜6 ノードを直列チェーン → 縦長 900px 超
- 接続されていない複数のサブグラフ（ノード数が非対称なためアスペクト比が崩れる）

判断基準：「ノード増減に関わらず、他の図と同じ高さに収まる保証がない場合」

---

## Part 6: 図解のテスト契約（Vitest / jsdom / Vue Test Utils）

> [!NOTE]
> **Nuxt プロジェクトは未作成のため、本パートは移行着手時に適用する契約。**
> 現行の静的 HTML にはテスト基盤がなく、検証はブラウザでの目視のみ。

**jsdom は SVG をレイアウトしないため、「図が正しく見えるか」はユニットテストで検証できない。**
検証できるのは「**図が原本と同じ数だけ、同じ内容で、正しいラッパーの中に置かれているか**」である。
これが図解の**転写漏れ**を捉える唯一の自動手段なので必ず書く。

### 6-1: モック（全ページ共通）

実物は `mermaid` を動的 import するためテストでは重く不安定。スタブに差し替える。

```ts
// tests/pages/capm.test.ts
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

const MermaidStub = defineComponent({
  props: { chart: { type: String, required: true } },
  template: `<pre data-testid="mermaid">{{ chart }}</pre>`,
});

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: { MermaidDiagram: MermaidStub, ClientOnly: { template: "<div><slot /></div>" } },
    },
  });
```

`<ClientOnly>` もスタブしないと、jsdom 環境ではスロットが描画されず図が0件になる。

### 6-2: 契約 C-6 — 図のソースが原本と順序込みで完全一致する

```ts
// 原本 HTML の DIAGRAMS オブジェクト（または <div class="mermaid">）から機械抽出し、
// 改行コード・外側の空行・共通インデントだけを正規化して固定する。
// 重複する図も省略せず、原本の出現順のまま列挙する。
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
S["プロジェクトスコープ"] --> D1["デリバラブル1"]`,
  `flowchart LR
PB["プロダクトバックログ"] --> SP["スプリントプランニング"]`,
] as const;

function normalizeMermaidSource(raw: string): string {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)?.trim() === "") lines.pop();
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(commonIndent).trimEnd()).join("\n");
}

it("C-6a: Mermaid ソースが原本と順序・内容・出現回数込みで完全一致する", () => {
  const wrapper = mountPage();
  const actual = wrapper
    .findAll('[data-testid="mermaid"]')
    .map((el) => normalizeMermaidSource(el.text()));
  expect(actual).toEqual([...EXPECTED_MERMAID_SOURCES]);
});

it("C-6b: 全 Mermaid 図解がページ専用ラッパーに包まれている", () => {
  const wrapper = mountPage();
  const all = wrapper.findAll('[data-testid="mermaid"]').length;
  const wrapped = wrapper.findAll('.mermaid-wrap [data-testid="mermaid"]').length;
  expect(wrapped).toBe(all);
});

it("C-6c: 各図解が空でなく、図種別の宣言から始まる", () => {
  const wrapper = mountPage();
  for (const el of wrapper.findAll('[data-testid="mermaid"]')) {
    const chart = el.text().trim();
    expect(chart.length).toBeGreaterThan(0);
    expect(chart).toMatch(MERMAID_DIAGRAM_DECLARATION);
  }
});

it("C-6d: 禁止構文 block-beta を使っていない", () => {
  const wrapper = mountPage();
  for (const el of wrapper.findAll('[data-testid="mermaid"]')) {
    expect(el.text()).not.toContain("block-beta");
  }
});

it("C-6e: 図解のソースが左端揃え（先頭行にインデントが無い）", () => {
  const wrapper = mountPage();
  for (const el of wrapper.findAll('[data-testid="mermaid"]')) {
    const firstLine = el.text().split("\n").find((l) => l.trim().length > 0) ?? "";
    expect(firstLine).toBe(firstLine.trimStart());
  }
});
```

C-6c の `MERMAID_DIAGRAM_DECLARATION` は、監査スクリプトと同じ
`.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs` から import する。
許可種別は `graph` / `flowchart` / `sequenceDiagram` / `mindmap` / `stateDiagram-v2` /
`gitGraph` / `erDiagram` / `classDiagram` / `journey` / `timeline` / `pie` であり、
`block-beta` は共有定義に含めない。

> **なぜ C-6e が要るのか**: Mermaid は先頭インデントで構文エラーになる。
> ビルドもテストも通るのに**ブラウザでだけ図が全滅する**という、最も発見が遅れる壊れ方をする。
> 静的に弾けるので必ずテストに入れる。

### 6-3: 図ごとの themeVariables を同時描画しても分離する

`MermaidDiagram.vue` のテストでは `mermaid.render` をモックし、異なる設定の図を同じ親へ
同時にマウントする。各呼び出しの Mermaid ソースに固有の frontmatter config が入り、
コンポーネントから `initialize` を呼ばないことを固定する。

```ts
// tests/components/MermaidDiagram.test.ts
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import MermaidDiagram from "~/components/MermaidDiagram.vue";

const { render } = vi.hoisted(() => ({
  render: vi.fn(async (_id: string, _source: string) => ({ svg: "<svg></svg>" })),
}));

// initialize を持たせない。コンポーネントが再初期化すればテストは失敗する。
vi.mock("mermaid", () => ({ default: { render } }));

describe("MermaidDiagram", () => {
  it("図ごとの themeVariables を同時マウント間で分離する", async () => {
    const Host = defineComponent({
      components: { MermaidDiagram },
      template: `
        <div>
          <MermaidDiagram chart="flowchart LR\nA --&gt; B" theme="base"
            :theme-variables="{ primaryColor: '#ffeeee' }" />
          <MermaidDiagram chart="flowchart LR\nC --&gt; D" theme="base"
            :theme-variables="{ primaryColor: '#eeeeff' }" />
        </div>
      `,
    });

    mount(Host);
    await flushPromises();

    expect(render).toHaveBeenCalledTimes(2);
    const sources = render.mock.calls.map(([, source]) => source);
    expect(sources[0]).toContain(
      'config: {"theme":"base","themeVariables":{"fontSize":"16px","primaryColor":"#ffeeee"}}',
    );
    expect(sources[0]).toContain("flowchart LR\nA --> B");
    expect(sources[1]).toContain(
      'config: {"theme":"base","themeVariables":{"fontSize":"16px","primaryColor":"#eeeeff"}}',
    );
    expect(sources[1]).toContain("flowchart LR\nC --> D");
  });
});
```

### 6-4: 図解の総数を原本から数えるコマンド

```bash
# HTML 原本 — このリポジトリの DIAGRAMS オブジェクト方式
grep -cE '^\s*[A-Za-z][A-Za-z0-9_]*: `' Certified-Associate-in-Project-Management.html

# HTML 原本 — 一般的な <div class="mermaid"> 方式
grep -c 'class="mermaid"' <原本>.html

# Markdown 原本
grep -c '^```mermaid' Certified-Associate-in-Project-Management.md

# 移植先（Nuxt）
grep -c '<MermaidDiagram' pages/<slug>.vue
```

数が合わない場合は**図解の転写漏れ**である。原本照合監査
（`.claude/skills/nuxt-page-migration/references/source-parity-audit.md`）と
併せて解消してから Green コミットする。

### 6-5: ユニットテストで検証できないこと（目視確認が必要）

以下はブラウザでの目視確認が必須。

- 現行 HTML: ブラウザで直接ファイルを開く
- Nuxt 移行後: `bun run dev` で確認する（`bun run test:e2e` は描画の有無までは自動検証する）

確認項目:

- 図の中央寄せ・列幅への収まり
- 配色（`theme: "base"` + `themeVariables` の反映）
- ノードラベルのはみ出し
- `stateDiagram-v2` の文字サイズ

---

## クイックリファレンス：問題別対処フロー

| 症状 | まず確認すること | 対処 |
|---|---|---|
| 構文エラー (`Syntax error in text`) | インデント汚染・行連結 | Part 1参照 |
| 文字がノード外にはみ出す | `document.fonts.ready` の有無 | `await document.fonts.ready` を追加 |
| マインドマップが原色（赤・緑・紫） | `cScale0-11` の設定 | Part 2-2参照 |
| マインドマップのテキストが読めない | `foreignObject` CSS非カスケード問題 | Part 2-4の手順に従う |
| シーケンス図の下部が切れる | `mirrorActors`, `overflow` の設定 | Part 2-5参照 |
| CSS `!important` が効かない | inline `style` 属性の優先度 | JS `.style.setProperty(..., 'important')` を使う |
| **SVG全体が巨大化・画面全幅に広がる** | `useMaxWidth: true` かつ `width: 100%` | `useMaxWidth: false` + `width: fit-content`（Part 2-3・Part 4参照） |
| 図は常識的な大きさだが小さな図も全幅に引き伸ばされる | コンテナまたは `.mermaid` に `width: 100%` | `width: fit-content; max-width: 100%` に変更 |
| **SVGが縦長に拡大される・縦横比が崩れる** | SVGに `width` 属性が残ったままに `width: 100%` | `removeAttribute('width')` → `width: auto; max-width: 100%` に変更 |
| **（Nuxt）図解が左寄せ・右に空白** | ページ側 `:deep(.mermaid)` の幅強制、または列幅より広い図 | ページ側の幅指定を削除しコンポーネントに委譲。広い図は svg `max-width:100%` で縮小フィット（Part 4） |
| **（Nuxt）図解が切れて右にスクロール** | 旧 `overflow-x` スクロール方式が残存 | svg 後処理で `max-width:100%; height:auto`（縮小フィット＝切れない）に統一（Part 4） |
| **`stateDiagram-v2` の文字が極端に大きい** | ノード数が少なく Mermaid が広い viewBox を生成している | `themeVariables.fontSize` は既定の `"16px"`（または必要な固定 px 値）を使い、問題の図だけ `maxHeight` prop でピンポイント制限（Part 4 追記参照） |
| **図解ごとにサイズが全然バラバラ** | `themeVariables.fontSize` に `"1rem"` を使っている | `"16px"` 等の固定ピクセル値に変更。未指定時はコンポーネントが `"16px"` を補い、明示した固定 px 値は保持される。SVG の `font-size` は継承可能だが、Mermaid が `<text>` などに生成した明示指定が優先される（Part 4 追記参照） |
| **全 SVG に `max-height` をかけたら他の図が小さくなりすぎた** | グローバル制限で正常な図まで縮小されている | グローバル `:global(svg)` 制限を削除し、巨大化した図だけに `maxHeight` prop を指定する（Part 4 追記参照） |
