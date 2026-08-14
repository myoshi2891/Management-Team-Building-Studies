# Nuxt ページ移行 — 実装リファレンス（骨子）

(最終更新日: 2026-08-15)

> [!IMPORTANT]
> 本ファイルは **CAPM ページ移行後の実態**を記録したものである。
> 未実装の項目は「未実装」と明記してある。**推測で実装例を書き足さないこと**
> （読み手が「実在する」と誤解するため有害）。

---

## 1. ディレクトリ構成（実測）

Nuxt 4 の既定 `srcDir` は `app/`。テストだけはリポジトリ直下に置く。

```text
app/
  app.vue                    <NuxtPage /> のみ
  assets/css/main.css        原本 HTML の :root パレットを転写（全ページ共有）
  components/
    MermaidDiagram.vue       図解レイアウトの SSoT（rules/mermaid-diagram-layout.md）
  composables/
    useActiveHeading.ts      TOC のスクロール連動（契約 Q-1 の対象）
  plugins/
    mermaid.client.ts        mermaid.initialize を一度だけ実行
  utils/
    mermaid-loader.ts        import("mermaid") の singleton 化
  pages/
    index.vue                資格ガイドの一覧
    capm.vue                 CAPM ガイド（移行済み）
tests/
  pages/capm.test.ts         契約テスト
  components/MermaidDiagram.test.ts
  composables/useActiveHeading.test.ts
e2e/
  capm.spec.ts               静的生成成果物へのスモーク（Playwright）
```

共通ヘッダー・サイドバー目次のコンポーネント分割は**していない**。
原本照合監査は 1 ファイルのインベントリを数えるため、ページを分割すると
分割先の要素が「欠落」として検出される。抽出してよいのは `MermaidDiagram` のみ。

---

## 2. CSS 変数の移植

原本 HTML の `<head>` 内 `:root` に、名前付きパレットが定義されている
（`--color-paper` / `--color-ink` / `--color-indigo` / `--color-gold` /
`--color-forest` / `--color-plum` と各 tint、`--font-display` / `--font-sans` /
`--font-mono`、`--sidebar-width`）。

これを `app/assets/css/main.css` に**そのまま転写**する。
ページ側 `<style scoped>` から `var()` で参照する変数は、**必ず転写済みのものに限る**。

転写済みの変数（`app/assets/css/main.css` の `:root`）:

| 分類 | 変数 |
|---|---|
| 地色 | `--color-paper` / `--color-paper-raised` / `--color-paper-sunken` |
| 文字 | `--color-ink` / `--color-ink-soft` / `--color-ink-faint` |
| 罫線 | `--color-border` / `--color-border-strong` |
| ドメイン色 | `--color-indigo` / `--color-indigo-dark` / `--color-indigo-tint` / `--color-gold` / `--color-gold-tint` / `--color-forest` / `--color-forest-tint` / `--color-plum` / `--color-plum-tint` |
| 状態色 | `--color-info-bg` / `--color-info-border` / `--color-info-text` / `--color-success-bg` / `--color-success-border` / `--color-success-text` |
| 書体・寸法 | `--font-display` / `--font-sans` / `--font-mono` / `--sidebar-width` |

```bash
# 移植漏れの検査（ページで参照している変数が main.css に定義済みか）
grep -ohE 'var\(--[a-z0-9-]+' app/pages/*.vue app/components/*.vue \
  | sed -E 's/^var\(//' | sort -u \
  | while IFS= read -r v; do
      grep -qE "^[[:space:]]*${v}[[:space:]]*:" app/assets/css/main.css \
        || printf 'UNDEFINED %s\n' "$v"
    done
```

未定義変数を `var()` 参照すると**ビルドは通るが実行時に透明・崩壊**する。
これは最も発見が遅れるデザインバグなので、Refactor フェーズで必ず上記を回す。

ただしページ内で定義したローカルなカスタムプロパティは偽陽性になる。
`app/pages/capm.vue` の `--d-color`（`.domain-card.d1` 等でドメイン色を切り替える）が該当し、
これは `main.css` に無くて正しい。

---

## 3. Mermaid の組み込み

`app/components/MermaidDiagram.vue` がレイアウトの唯一の真実の源。
実装契約は `.claude/skills/fix-mermaid/SKILL.md` Part 4、
不変条件は `.claude/rules/mermaid-diagram-layout.md` を参照（重複記述しない）。

要点だけ:

- ページ側は `<ClientOnly>` で包む（Mermaid は DOM 必須で SSR 不可）
- 図のソースは `<script setup>` のモジュール定数に置き、`:chart="NAME"` で渡す
- ページ側 `<style scoped>` で幅・配置を書かない

props（実装済み）:

| props | 型 | 意味 |
|---|---|---|
| `chart` | `string`（必須） | Mermaid ソース。先頭にインデントがあると構文エラーになるため左端揃え |
| `theme` | `string?` | 既定 `"base"`（原本 HTML がライトテーマ前提） |
| `themeVariables` | `Record<string, string>?` | `theme="base"` のときだけ意味を持つ。**参照が安定するようモジュール定数を渡す** |
| `maxHeight` | `string?` | ノード数が少なく viewBox が肥大する図だけに使う逃がし弁 |

見た目の分離方式に注意する。`mermaid.initialize` をマウントごとに呼ぶと
**同時描画中の別の図を壊す**ため、`theme` / `themeVariables` はグローバル設定ではなく
Mermaid ソース先頭の frontmatter（`---\nconfig: {...}\n---`）として埋め込んでいる。
グローバルな描画挙動（`useMaxWidth: false` 等）だけが `app/plugins/mermaid.client.ts` の責務。

---

## 4. コードブロックの構文ハイライト（未実装）

CAPM 原本 HTML には `<pre>` が **0 件**（inline `<code>` のみ）だったため、
構文ハイライトは実装していない。**先回りして実装しない。**

`<pre>` を含む原本を移行する際に、Vue 側でどう表現するか
（`v-html` + span トークン / ハイライトライブラリ）を決めて本節に記録する。

> `v-html` を使う場合、原本の HTML エンティティ（`&lt;` `&gt;` `&amp;`）の
> 二重エスケープに注意する。監査スクリプトは正規化して照合するため
> 監査は通るが、ブラウザ表示だけが壊れるパターンがある。

---

## 5. ローカル検証

```bash
bun run dev        # http://localhost:3000
bun run build
bunx nuxi typecheck
bun run test:e2e   # generate + Playwright スモーク（ポート 4173）
```

原本 HTML はビルド不要でブラウザから直接開けるため、
**原本と Nuxt 版を並べて表示**して差分を目視確認する。

---

## 関連

- `../SKILL.md` — 移行の標準手順（本ファイルの親）
- `./source-parity-audit.md` — 原本照合監査
- `./design-contract-tests.md` — デザイン契約テスト
- `.claude/rules/tdd-mandatory-cycle.md` — TDD とコミット分割
