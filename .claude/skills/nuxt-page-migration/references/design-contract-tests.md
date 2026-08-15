# デザイン契約テスト — 実装パターン

(最終更新日: 2026-08-15)

**用途**: SKILL.md §5 Step 1 の D-1〜D-5（デザイン契約）を
自動検知するテストパターンを詳述する。`<style scoped>` は DOM に
`data-v-xxxxxxx` 属性を付けるだけでクラス名の意味は担保しないため、
**`data-testid` / `data-variant` 属性でデザイン意図を DOM に明示**してテストする。

> [!IMPORTANT]
> 本ファイルの `data-variant` 値や CSS 変数名は**汎用の例**であり、
> このリポジトリの実際の値ではない。**variant 値は原本のクラス名をそのまま使う**
> （CAPM は `practice` / `source` / `note`）。実際のパレットは
> `app/assets/css/main.css` を、実装例は `app/pages/capm.vue` と
> `tests/pages/capm.test.ts` を正とする。

---

## 背景と原則

jsdom は `<style scoped>` の実 CSS 値を適用しないため、
「背景色が赤か否か」のような見た目は検証できない。クラス名の存在は検証できるが、
クラス名は容易にリネームされるため契約としては弱い。

**代替戦略**:

1. **`data-variant` 属性** でセマンティクスを DOM に明示 → テストで variant の存在を検証
2. **`data-testid` 属性** でコンポーネントの役割を表現 → querySelector で選択
3. **原本 HTML の CSS を `<style scoped>` に 100% 転写** → 目視確認でデザインを担保

---

## 必須 data-testid 属性一覧（ガイドページ共通）

| 要素 | data-testid | data-variant | 補足 |
|---|---|---|---|
| セクションタグ（stepTag相当） | `step-tag` | — | 全セクション分必須 |
| callout/alert ボックス | `callout` | **原本のクラス名**（CAPM は `practice` / `source` / `note`） | variant で色区別 |
| callout 内ラベル | `callout-label` | — | uppercase monoラベル |
| 引用ブロック（voice/blockquote） | `voice` | — | |
| 引用者名 | `voice-who` | — | |
| Mermaid ラッパー | — | — | `[data-testid="mermaid-diagram"]` はモック側で付与 |

---

## 正しい `app/pages/<slug>.vue` の書き方

```vue
<template>
  <!-- ✅ stepTag — data-testid="step-tag" を全セクション分付与 -->
  <span class="step-tag" data-testid="step-tag">Step 01</span>

  <!-- ✅ callout.info -->
  <div class="callout info" data-testid="callout" data-variant="info">
    <p>
      <span class="label" data-testid="callout-label">注意</span>
      本文テキスト
    </p>
  </div>

  <!-- ✅ callout.warn — danger(赤)セマンティクス -->
  <div class="callout warn" data-testid="callout" data-variant="warn">
    <p>
      <span class="label" data-testid="callout-label">警告</span>
      本文テキスト
    </p>
  </div>

  <!-- ✅ voice/blockquote -->
  <blockquote class="voice" data-testid="voice">
    <span class="who" data-testid="voice-who">著者名</span>
    <p>引用テキスト</p>
  </blockquote>
</template>
```

---

## デザイン契約テストの書き方

```ts
// tests/pages/<slug>.test.ts — デザイン契約テスト追加例
import { readFileSync } from "node:fs";

const sourceHtml = readFileSync("<原本HTMLのパス>", "utf8");
const sourceDocument = new DOMParser().parseFromString(sourceHtml, "text/html");

const mountPage = () =>
  mount(Page, {
    global: { stubs: { ClientOnly: { template: "<div><slot /></div>" } } },
  });

it("D-2: callout.warn が data-variant='warn' を持ち danger セマンティクスで区別される", () => {
  const warnCallouts = mountPage().findAll(
    "[data-testid='callout'][data-variant='warn']"
  );
  expect(warnCallouts.length).toBeGreaterThan(0);
  for (const callout of warnCallouts) {
    expect(callout.find("[data-testid='callout-label']").exists()).toBe(true);
  }
});

it("D-3: stepTag が各セクションに存在し data-testid='step-tag' を持つ", () => {
  const expectedStepTagTexts = Array.from(
    sourceDocument.querySelectorAll(".step-tag"),
    (el) => el.textContent?.trim() ?? ""
  );
  const actualStepTagTexts = mountPage()
    .findAll("[data-testid='step-tag']")
    .map((el) => el.text());

  expect(actualStepTagTexts).toEqual(expectedStepTagTexts);
});

it("D-4: blockquote.voice が data-testid='voice' を持ち voice-who 子要素がある", () => {
  const voiceBlocks = mountPage().findAll("[data-testid='voice']");
  expect(voiceBlocks.length).toBeGreaterThan(0);
  for (const block of voiceBlocks) {
    expect(block.find("[data-testid='voice-who']").exists()).toBe(true);
  }
});

it("D-1: callout の variant が原本にあるものをすべて含む", () => {
  const variants = new Set(
    mountPage()
      .findAll("[data-testid='callout']")
      .map((el) => el.attributes("data-variant"))
  );
  // 原本に存在する variant だけを要求する（不在の variant を捏造しない）
  expect(variants).toEqual(new Set(["info", "warn"]));
});
```

---

## CSS — 原本 HTML を 100% 転写する原則

原本 HTML の `<style>` ブロックをそのまま `app/pages/<slug>.vue` の `<style scoped>` に転写する。
`:root` の CSS 変数は `app/assets/css/main.css` へ移す（ページ間で共有するため）。

以下は **よくある移行バグ（デザイン差異の典型例）**。
変数名は別プロジェクト由来の**例示**であり、このリポジトリの実際の変数名ではない
（実際のパレットは `app/assets/css/main.css` を参照）。読むべきは「どの要素で
配色を取り違えやすいか」であって、変数名そのものではない。

| 要素 | 原本 HTML（正） | よくある誤り |
|---|---|---|
| `thead th` 背景 | `var(--accent-soft)` 青系 | `var(--bg)` ベージュ |
| `callout.warn` 背景 | `var(--danger-soft)` 赤系 | `var(--gold-soft)` 黄系 |
| `callout.label` | mono・uppercase・`var(--ink-faint)` | 太字・通常色 |
| `voice/blockquote` | `gold-soft` 背景・`gold` border | `surface` 背景・`accent` border |
| `stepTag` | border-less mono goldラベル | badge 背景あり |
| `section` 区切り | `border-bottom: 1px solid var(--border)` | なし |
| `tbody` ストライプ | `tr:nth-child(even)` `#fbfaf7` | なし |
| **インライン `code`** | 淡青背景＋濃青文字 (`var(--accent-soft)`) | 単色・文字のみ・ダーク背景 |
| **コードブロック構文ハイライト** | 鮮やかなマルチカラー (紫/青/緑/黄/赤/グレー) | 単色プレーンテキスト放置 |
| **コードブロック行改行** | `<div class="code-line">` で1行毎ラッパー | 生テキスト直接配置 (`\n` 崩れ) |
| **Mermaid 図解テーマ** | 原本の `theme: 'base'` (白/青/金ライトテーマ) | デフォルトの `dark` (真っ黒) |
| **運用チェックリスト** | 原本 HTML のリスト／カード／表構造 | 原本と異なる構造への変換 |

チェックリストの正しいレイアウトは原本依存である。原本がカードグリッドならカードグリッドを、
表なら表を維持し、別の構造へ置き換えない。

**確認方法**: 原本 HTML をブラウザで直接開き、`bun run dev` の Nuxt 版と並べて比較する。

---

## テスト実行コマンド（重要: `bun run test` を使う）

```bash
# ✅ 正しいコマンド（vitest 経由 — nuxt テスト環境が適用される）
bun run test

# ❌ 誤ったコマンド（Bun のネイティブランナー — DOM 環境なしで全テスト失敗する）
bun test tests/pages/capm.test.ts
```

**理由**: `bun test` は Bun のビルトインランナーで動作し、
`vitest.config.ts` の環境設定も Nuxt のエイリアス解決も一切適用されない。
`document is not defined` エラーが全テストで発生する。
**必ず `bun run test`（= `vitest`）を使うこと。**
`bun` が使えない環境では `npm run test` で読み替える（同じ scripts を実行する）。

環境は `defineVitestConfig({ test: { environment: "nuxt" } })`。素の `jsdom` +
`mount` では `useSeoMeta` などのオートインポートが解決されず落ちる。

---

## 参考実装（実在するファイル）

- `tests/pages/capm.test.ts` — S / C / D / Q 契約テストの実装
- `app/pages/capm.vue` — `data-testid` / `data-variant` 付与例
- `app/assets/css/main.css` — 原本 HTML の `:root` パレット転写
- `tests/components/MermaidDiagram.test.ts` — 共有コンポーネントの契約テスト
