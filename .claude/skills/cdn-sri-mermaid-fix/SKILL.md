---
name: cdn-sri-mermaid-fix
description: >
  Pin CDN asset versions and apply Subresource Integrity (SRI) integrity + crossorigin
  attributes to the external assets used by the static HTML guides in this repository
  (Tabler Icons webfont, Fontsource Source Serif 4, Mermaid v11). Also covers Mermaid
  render-API return-value differences that produce "undefined" in place of a diagram.
  Trigger when the user mentions: "SRI", "integrity", "crossorigin", "改ざん対策",
  "セキュリティ強化", "CDN", "CDN のバージョン固定", "@latest", "Tabler Icons",
  "mermaid", "mermaid 描画", "図が undefined", or refers to CDN vulnerability/hashes.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
---

# CDN 資産のバージョン固定と SRI 適用 & Mermaid 描画 API の互換性確保

最終更新: 2026-08-14

このリポジトリの静的 HTML ガイド（リポジトリ直下の `*.html`）は、外部 CDN（jsDelivr）から
CSS / JS を直接読み込んでいる。本スキルは、それらを**バージョン固定 + SRI 付き**で安全に
読み込むための手順と、Mermaid の描画 API 差異による `undefined` 表示の回避策を定義する。

## 対象ファイル

リポジトリ直下の静的 HTML（例: `Certified-Associate-in-Project-Management.html`）。
今後 Nuxt へ移行した場合、CDN 直読みは `nuxt.config.ts` の `app.head.link` /
`app.head.script` に移るため、同じ `integrity` / `crossorigin` をそこに指定する。

## 1. 現状のリスク

`Certified-Associate-in-Project-Management.html` の `<head>` は以下を読み込んでいる。

| 資産 | 現状の指定 | 問題 |
|---|---|---|
| Tabler Icons webfont | `@tabler/icons-webfont@latest` | **バージョン未固定**。CDN 側の更新で見た目が予告なく変わる |
| Fontsource Source Serif 4 | `@fontsource/source-serif-4@5`（`index.css` / `600.css` / `700.css`） | メジャー固定のみ。SRI なし |
| Mermaid | `mermaid@11/dist/mermaid.min.js` | メジャー固定のみ。SRI なし |

いずれも `integrity` / `crossorigin` が付いておらず、CDN 側の改ざんをブラウザが検知できない。
特に `@latest` は「毎回異なるファイルが来る可能性がある」ため、SRI と原理的に併用できない。
**SRI を適用するには、まず完全バージョンへの固定が必須**である。

## 2. SRI ハッシュの算出手順

このリポジトリの開発環境からは jsDelivr へ直接 HTTP アクセスできる（確認済み）。
外部取得を経由せず、シェルだけで完結する。

### 2-1. `@latest` / メジャー指定が解決される実バージョンを調べる

jsDelivr はレスポンスヘッダ `x-jsd-version` に実際に配信したバージョンを返す。

```bash
curl -sSI --max-time 15 \
  "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" \
  | grep -i '^x-jsd-version'
```

### 2-2. 完全バージョン指定の URL からハッシュを計算する

**必ず完全バージョン（`3.46.0` のような3桁指定）の URL に対して計算する。**
`@latest` や `@11` に対して計算したハッシュは、CDN が別バージョンを配信した瞬間に不一致となり、
ページ全体が読み込み失敗する。

```bash
u="https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js"
echo "sha384-$(curl -sS --max-time 60 "$u" | openssl dgst -sha384 -binary | openssl base64 -A)"
```

複数まとめて計算する場合:

```bash
for u in \
  "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.46.0/dist/tabler-icons.min.css" \
  "https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js"; do
  echo "$u"
  echo "  sha384-$(curl -sS --max-time 60 "$u" | openssl dgst -sha384 -binary | openssl base64 -A)"
done
```

一時ファイルを作らずパイプで完結するため、後片付けは不要。

### 2-3. タグへの適用

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js"
        integrity="sha384-aBQXj4hK6Jm05i7aQAsUV3bLdSUrHX1BGYfMB0166TtWt/RRaw+h0Eelme9OCOvy"
        crossorigin="anonymous"></script>
```

`crossorigin="anonymous"` は**必須**。これがないとブラウザは不透明レスポンスとして扱い、
`integrity` を検証できずに読み込みを拒否する。

## 3. 検証済み SRI ハッシュ（SSoT）

以下は 2026-08-14 時点で実測した値。**同じバージョンである限り不変**なので、
再計算せずそのまま利用してよい。バージョンを上げる場合は 2-2 の手順で再計算すること。

### Tabler Icons webfont v3.46.0

```text
https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.46.0/dist/tabler-icons.min.css
integrity="sha384-ND+q1IVc0KDElX60dZaqKc7Xl9cdxd2PpU2JfVUHcurCkFVtVLFdt9vJfxtHSL3p"
```

### Mermaid v11.16.1

```text
https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js
integrity="sha384-aBQXj4hK6Jm05i7aQAsUV3bLdSUrHX1BGYfMB0166TtWt/RRaw+h0Eelme9OCOvy"
```

### Fontsource Source Serif 4 v5.3.0

```text
.../source-serif-4@5.3.0/index.css
integrity="sha384-cy72LeqRhBcptH+f75cB3vrpLw/jxRh/JFcONF8ojDGHnPbPW8ms9mFfeRcjatlf"

.../source-serif-4@5.3.0/600.css
integrity="sha384-+yaCg0e7ycPGPQXb75FA+X65pLlc36UEZiIaA8ph5o9epSIlfAq9gNVjLkSyyLta"

.../source-serif-4@5.3.0/700.css
integrity="sha384-qhpg1+yChOWG1duNtwQt4p+5G015BD1o+VF8/aRV+4P3Sx/PsIbVNxX+p/wvQf9W"
```

> [!IMPORTANT]
> **CSS の `@import` と webfont 本体は SRI の保護対象外。**
> Fontsource の `index.css` は内部で `@import` と `@font-face` により別ファイル
> （`.woff2` 等）を参照するが、SRI は `<link>` が直接指すファイルにしか適用されない。
> Tabler Icons も同様にフォント本体は検証されない。
> SRI はあくまで「エントリポイントの CSS/JS の改ざん検知」であり、完全な防御ではない。

## 4. Mermaid 描画 API の戻り値差異（`undefined` 対策）

`mermaid.render` の戻り値はバージョンで異なる。

| バージョン | 戻り値 |
|---|---|
| v10 以降 | `Promise<{ svg, bindFunctions }>` — **オブジェクト** |
| v9 以前（UMD） | `Promise<string>` — SVG の HTML 文字列 |

片方だけを想定したコードは、もう一方で `undefined` が本文に描画される。
**両対応の実装パターン**（現行 HTML が採用しているのもこの形）:

```javascript
const result = await mermaid.render("svg-" + id, src);
// 文字列ならそのまま、オブジェクトなら .svg を取り出す
const svg = typeof result === "string" ? result : result.svg;

const target = document.getElementById(id);
if (target) {
  target.innerHTML = svg;
}
```

### このリポジトリの Mermaid 呼び出し方式

現行 HTML は `<div class="mermaid">` にソースを埋め込む一般的な方式ではなく、
**JS 側の `DIAGRAMS` オブジェクト（テンプレートリテラル）に図のソースを持ち、
`mermaid.render()` を手動で呼んで `innerHTML` に流し込む**方式を採っている。

```javascript
const DIAGRAMS = {
  wbs: `flowchart TB
S["プロジェクトスコープ"] --> D1["デリバラブル1"]
...`,
};
```

そのため:

- `mermaid.initialize({ startOnLoad: false, ... })` である（自動描画しない）
- `<div class="mermaid">` を検索する類のツール（`fix-mermaid` スキル同梱の
  `fix_mermaid.py` を含む）は**このHTMLに対して1件もマッチしない**
- 図の追加・修正は `DIAGRAMS` オブジェクトを直接編集する

図の構文自体の修正・配色・レイアウトについては `fix-mermaid` スキルを参照。

## 5. 作業チェックリスト

1. `grep -n 'cdn\.jsdelivr\.net' *.html` で対象タグを洗い出す
2. `@latest` / メジャーのみの指定を、`x-jsd-version` で調べた完全バージョンへ固定
3. 完全バージョン URL に対して sha384 を算出（本ファイル §3 に既知の値があればそれを使う）
4. `integrity` と `crossorigin="anonymous"` を両方付与
5. ブラウザで開き、DevTools Console に SRI 違反エラーが出ないこと・
   アイコン / セリフ体見出し / Mermaid 図がすべて描画されることを確認
6. バージョンを上げた場合は本ファイル §3 の SSoT も同時に更新する
