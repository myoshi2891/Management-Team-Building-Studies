# Nuxt ページ移行 — 実装リファレンス（骨子）

(最終更新日: 2026-08-14)

> [!IMPORTANT]
> **本ファイルは意図的に骨子のみである。**
> Nuxt プロジェクトが未作成のため、実装断片を書けば推測になる。
> 最初のページを移行した時点で、**実コードから書き起こして**各節を埋めること。
> 推測で書いた実装例は、読み手が「実在する」と誤解するため有害である。

---

## 1. ディレクトリ構成（移行時に確定させる）

想定する構成。実際に `nuxt.config.ts` を作った時点で実態に置き換える。

```text
assets/css/main.css        原本 HTML の :root パレットを転写（全ページ共有）
components/
  MermaidDiagram.vue       図解レイアウトの SSoT（rules/mermaid-diagram-layout.md）
  TheHeader.vue            共通ヘッダー
  DocToc.vue               サイドバー目次
composables/
  useActiveHeading.ts      TOC のスクロール連動（契約 Q-1 の対象）
pages/
  index.vue                資格ガイドの一覧
  capm.vue                 CAPM ガイド（最初の移行対象）
tests/
  pages/capm.test.ts       契約テスト
```

**TODO（移行着手時）**: 実際に作成したパス・コンポーネント名で上表を置き換える。

---

## 2. CSS 変数の移植

原本 HTML の `<head>` 内 `:root` に、名前付きパレットが定義されている
（`--color-paper` / `--color-ink` / `--color-indigo` / `--color-gold` /
`--color-forest` / `--color-plum` と各 tint、`--font-display` / `--font-sans` /
`--font-mono`、`--sidebar-width`）。

これを `assets/css/main.css` に**そのまま転写**する。
ページ側 `<style scoped>` から `var()` で参照する変数は、**必ず転写済みのものに限る**。

```bash
# 移植漏れの検査（ページで参照している変数が main.css に定義済みか）
grep -ohE 'var\(--[a-z0-9-]+([[:space:]]*,[^)]*)?\)' pages/*.vue components/*.vue \
  | sed -E 's/^var\((--[a-z0-9-]+).*/\1/' | sort -u \
  | while read -r v; do
      grep -qE "^[[:space:]]*$v[[:space:]]*:" assets/css/main.css || echo "未定義の変数: $v"
    done
```

未定義変数を `var()` 参照すると**ビルドは通るが実行時に透明・崩壊**する。
これは最も発見が遅れるデザインバグなので、Refactor フェーズで必ず上記を回す。

**TODO（移行着手時）**: 転写した変数名の一覧を本節に記録する。

---

## 3. Mermaid の組み込み

`components/MermaidDiagram.vue` がレイアウトの唯一の真実の源。
実装契約は `.claude/skills/fix-mermaid/SKILL.md` Part 4、
不変条件は `.claude/rules/mermaid-diagram-layout.md` を参照（重複記述しない）。

要点だけ:

- ページ側は `<ClientOnly>` で包む（Mermaid は DOM 必須で SSR 不可）
- 図のソースは `<script setup>` のモジュール定数に置き、`:chart="NAME"` で渡す
- ページ側 `<style scoped>` で幅・配置を書かない

**TODO（移行着手時）**: 実装した `MermaidDiagram.vue` の props 一覧を確定させ、
`fix-mermaid` SKILL.md Part 4 の props 表を実物に合わせて更新する。

---

## 4. コードブロックの構文ハイライト

原本 HTML はコードブロックを色分けして表示している。移植時は原本の配色を維持する。

**TODO（移行着手時）**: 原本 HTML の該当 CSS クラスを調べ、
Vue 側でどう表現するか（`v-html` + span トークン / ハイライトライブラリ）を決めて記録する。
決めるまでは実装しない。

> `v-html` を使う場合、原本の HTML エンティティ（`&lt;` `&gt;` `&amp;`）の
> 二重エスケープに注意する。監査スクリプトは正規化して照合するため
> 監査は通るが、ブラウザ表示だけが壊れるパターンがある。

---

## 5. ローカル検証

```bash
bun run dev     # http://localhost:3000
bun run build
bunx nuxi typecheck
```

原本 HTML はビルド不要でブラウザから直接開けるため、
**原本と Nuxt 版を並べて表示**して差分を目視確認する。

---

## 関連

- `../SKILL.md` — 移行の標準手順（本ファイルの親）
- `./source-parity-audit.md` — 原本照合監査
- `./design-contract-tests.md` — デザイン契約テスト
- `.claude/rules/tdd-mandatory-cycle.md` — TDD とコミット分割
