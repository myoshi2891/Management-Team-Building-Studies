---
name: markdown-formatter
description: >
  Comprehensive guide and rules for formatting Markdown files to comply with the project's `.markdownlint.json` configuration.
  Addresses common errors like MD031, MD012, and MD047.
  Trigger: Markdownリント, markdownlint, markdown formatting, MD031, MD012, MD047, blanks-around-fences.
---

# Markdown Formatting & Linting Guide

## Goal

This skill provides rules and best practices to ensure all Markdown documents (`.md` files) in this repository comply with the project's `.markdownlint.json` rules, preventing CI/CD build breakages due to markdown lint errors.

<!-- markdownlint-disable MD031 MD022 MD032 -->

## このプロジェクトの .markdownlint.json 設定概要

`.markdownlint.json` でプロジェクト固有に有効・無効化されているルールの主要項目：

| ルール | 設定 | 意味 |
|---|---|---|
| `MD022` | `false` | 見出し前後の空行は**不要**（チェックしない） |
| `MD031` | `true` | コードフェンス前後の空行は**必須** ✅ |
| `MD032` | `false` | リスト前後の空行は**不要**（チェックしない） |
| `MD012` | `true` | 連続する空行は**禁止** ✅ |
| `MD047` | （default: true）| ファイル末尾の改行は**必須** ✅ |
| `MD033` | `allowed_elements` あり | 特定の HTML タグは**許可** |

> [!IMPORTANT]
> このプロジェクトでは MD022（見出し前後の空行）と MD032（リスト前後の空行）は **無効化** されています。
> **チェック・修正が必要なのは主に MD031 / MD012 / MD047** です。

## 頻発する Markdown Lint エラーと修正パターン

### 1. MD031: blanks-around-fences（コードブロック前後の空行）

**問題**: ` ``` ` で囲まれたコードブロックの直前または直後に空行（改行）がない。特にリストの直下にネストされているコードブロックで多発します。

#### ❌ 違反例

````markdown
- **ドメイン別出題比率の検証**:
  - ECO の 4 ドメイン合計が 100% になることを確認します。
  ```text
  36% + 17% + 20% + 27% = 100%
  ```
````

#### ✅ 修正例

リストのネスト内であっても、コードブロックの前後に**インデントされた空行**を挿入します。

````markdown
- **ドメイン別出題比率の検証**:
  - ECO の 4 ドメイン合計が 100% になることを確認します。

  ```text
  36% + 17% + 20% + 27% = 100%
  ```
````

---

### 2. MD012: no-multiple-blanks（連続した空行）

**問題**: 2行以上の連続した空行が記述されている。

#### ❌ 違反例

```markdown
パラグラフ1


パラグラフ2（空行が2行以上挟まれている）
```

#### ✅ 修正例

空行は常に「最大1行」としてください。

```markdown
パラグラフ1

パラグラフ2
```

---

### 3. MD047: single-trailing-newline（ファイル末尾の改行）

**問題**: ファイルの最終行の末尾に改行文字（LF）がない。

#### ❌ 違反例

```markdown
...最後の行の文章（ファイルの末尾に改行がない状態）[EOF]
```

#### ✅ 修正例

ファイルの最後は必ず1行の空行（改行で終わる状態）にしてください。

```markdown
...最後の行の文章
[EOF]
```

---

### 4. MD033: no-inline-html（インラインHTMLの制限）

**問題**: Markdown 内に許可されていない HTML タグが直接書かれている。

* **許可されている HTML 要素**: `a`, `h1`, `h2`, `p`, `i`, `footer`, `br`, `div`, `sub`, `sup`, `kbd`, `details`, `summary`
* **代替案**: 可能な限り標準の Markdown 記法を使用してください。

---

### 5. テーブルの左寄せ規約

**ルール**: マークダウンの表（テーブル）の文言およびヘッダー（タイトル）は、必ず左寄せ（`text-align: left`）で文章を表示してください。ヘッダー下部のセパレータ行は `:---` または `---` で定義し、右寄せ（`---:`）や中央寄せ（`:---:`）は使用しないでください。

---

<!-- markdownlint-enable MD031 MD022 MD032 -->

## ワークフロー（検証と修正の手順）

AI エージェントは Markdown ファイルを新規作成・修正した際、コミットする前に必ず以下の手順を実行しなければなりません。

### Step 1: Linter による検証

プロジェクトの `.markdownlint.json` に従って Linter を実行し、エラーを洗い出します。

```bash
# 全ファイル
npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules"

# 単一ファイル
npx --yes markdownlint-cli2@0.18.1 <file_path>
```

> [!NOTE]
> このリポジトリには自動整形スクリプトを用意していない。
> 検出されたエラーは**手動で修正する**（本ファイルの「頻発するエラーと修正パターン」を参照）。
> 自動整形はリスト内のネストされたコードブロックを崩しやすく、
> 資格ガイドのような構造の深い文書には向かない。

### Step 2: 手動修正と再検証

エラーが出力されなくなるまで手動で修正し、Step 1 のコマンドを再実行します。

> [!TIP]
> **入れ子のコードフェンス**（Markdown の例の中にコードブロックを書く場合）は、
> 外側を 4 バッククォート（` ```` `）にする。内外とも 3 バッククォートだと、
> 内側の閉じフェンスが外側を閉じたと解釈され MD040 が出る。

### Step 3: PII の機械的検証

変更したファイルを Git にステージング（`git add`）した後、リポジトリのセキュリティ規則に基づき、絶対パスや PII が含まれていないか必ず検証します。

```bash
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
```

検証が成功（何も検出されない）したことを確認してから、コミットを適用してください。
