---
name: docs-sync
description: >
  Keep this repository's specification documents (CLAUDE.md, README.md,
  docs/PROGRESS.md, .claude/skills/*/SKILL.md, .claude/rules/*.md) in sync with the
  actual state of the repo, and refresh their "最終更新日" stamps. Detects stale
  sections by comparing git-diff output against the real files. Does not run builds or tests.
  Trigger: 仕様書の更新, 仕様書同期, ドキュメント同期, ドキュメントを同期して,
  更新漏れ確認, 各仕様書の更新漏れがないか, docs が古い, 最新化, 再開プロンプト,
  セッション終了, docs sync, doc sync, spec sync, stale docs, 最終更新日, Last Updated,
  PROGRESS.md, CLAUDE.md, README.md.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
  - Glob
---

# 仕様書同期スキル

最終更新: 2026-08-14

## Goal

このリポジトリの仕様書を、実際のファイル構成・作業進捗と乖離させない。
**推測で書かず、必ず実ファイルと `git` の出力を根拠にする。**

## 同期対象ドキュメント

| ドキュメント | 役割 | 最終更新日の記法 |
|---|---|---|
| `CLAUDE.md` | AI エージェント向けのプロジェクト規約・構成 | `Updated YYYY-MM-DD`（冒頭付近） |
| `README.md` | 人間向けの概要（存在する場合） | `最終更新日: YYYY-MM-DD`（見出し直下） |
| `docs/PROGRESS.md` | Nuxt 移行の進捗（移行開始後に作成） | `Updated YYYY-MM-DD`（現在地テーブル内） |
| `.claude/skills/*/SKILL.md` | 各スキルの手順 | `最終更新: YYYY-MM-DD`（タイトル直下） |
| `.claude/rules/*.md` | 不変条件・強制ルール | `(最終更新日: YYYY-MM-DD)`（タイトル直下） |

> [!NOTE]
> `README.md` と `docs/PROGRESS.md` はまだ存在しない。
> 存在しないファイルを「更新漏れ」として報告しないこと。作成が必要かどうかは
> ユーザーに確認する。

## イベント別・更新対象マトリクス

| 発生イベント | CLAUDE.md | docs/PROGRESS.md | 該当 SKILL.md / rules |
|---|:---:|:---:|:---:|
| A. 新しい資格ガイド（`*.md` / `*.html`）の追加 | 必須（構成一覧） | — | — |
| B. Nuxt へのページ移行を1ページ完了 | — | **必須**（ゲート条件） | — |
| C. 手順・コマンド・ディレクトリ構成の変更 | 必須 | — | 必須 |
| D. スキル / ルールの追加・削除・改名 | 必須（一覧） | — | 必須 |
| E. CDN 資産のバージョン更新 | — | — | 必須（`cdn-sri-mermaid-fix` の SSoT） |
| **最終更新日の更新** | **全イベントで必須** | | |

イベント B の詳細な手続き（コミット分割を含むゲート条件）は
`.claude/rules/migration-progress-sync.md` を参照。

## 実行手順

### Step 1: 実態を機械的に把握する

推測を挟まないため、以下を先に実行して結果を根拠にする。

```bash
# 直近の変更内容（何が変わったか）
git log --oneline -10
git diff --stat HEAD~5..HEAD 2>/dev/null || git diff --stat

# 実在するドキュメントの一覧（存在しないものを対象にしないため）
ls -1 CLAUDE.md README.md docs/PROGRESS.md 2>/dev/null
find .claude -name '*.md' | sort

# 各ドキュメントに記載されている最終更新日
grep -rn '最終更新\|Updated [0-9]' CLAUDE.md README.md docs .claude 2>/dev/null
```

### Step 2: 記述と実態の突き合わせ

各ドキュメントについて、以下の観点で**実ファイルと照合**する。

- 言及されているファイル・ディレクトリが**実在するか**（`ls` / `find` で確認）
- 言及されているコマンドが**実行可能か**（`package.json` の scripts 等）
- スキル / ルールの一覧が `.claude/` の実体と一致しているか
- 記載された最終更新日が、その内容の実際の更新時期と整合しているか

> [!WARNING]
> このリポジトリの `.claude/` は過去に別プロジェクトからコピーされ、
> 実在しないパス（`web-next/`, `scraper/`, `pricing.json` 等）を大量に含んでいた。
> 「ドキュメントに書いてあるから存在する」と仮定しないこと。

### Step 3: 差分のみ更新

- 実態と乖離しているセクション**のみ**を編集する。乖離していない箇所は触らない
- 内容を1文字でも変更したドキュメントは、**最終更新日を必ず当日の日付へ更新**する
- 逆に、内容を変更していないドキュメントの日付だけを進めてはならない
  （「いつ時点の記述か」が信用できなくなる）

### Step 4: Markdown lint

編集した `.md` は `.markdownlint.json` に適合させる。書式ルールは
`markdown-formatter` スキルを参照。

```bash
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Step 5: コミット前の PII 検査（必須）

`.claude/rules/no-absolute-paths.md` のとおり、ローカル絶対パスの混入を機械的に検査する。

```bash
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
```

出力があればコミットを中止し、相対パスに直してから再実行する。

## 報告フォーマット

作業後は以下を簡潔に報告する。

1. 実態と乖離していた箇所（ドキュメント名とセクション）
2. 実施した更新内容
3. 更新した最終更新日
4. **確認したが乖離がなかったドキュメント**（無音で飛ばさず明示する）
