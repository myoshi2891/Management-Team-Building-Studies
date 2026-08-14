---
name: pre-commit-check
description: >
  コミット前に、ステージ済み差分の PII・絶対パス検査、markdownlint、Nuxt 導入後のテスト・
  型検査・ビルドという全検証ゲートを実行する。ユーザーが次の語句を述べた場合に使用する:
  - "コミット前チェック" / "テスト実行" / "ビルドとテスト" / "CI 確認"
  - "全部テストして" / "コミットしていいか確認" / "push 前に確認"
  - "pre-commit check" / "run tests" / "check before commit" / "verify build"
invocation: explicit
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# コミット前チェックスキル

最終更新: 2026-08-14

## 概要

コミット・プッシュ前に、このリポジトリで実行可能な検証をすべて通す。
**Step 1 は Nuxt の有無に関わらず常に必須**。Step 2 以降は該当ファイルがある場合のみ。

## Step 1: PII / 絶対パス検査（必須・スキップ禁止）

`.claude/rules/no-absolute-paths.md` のゲート条件。ステージング済み差分に
ローカル絶対パス（＝OS のユーザー名）が混入していないかを機械的に検証する。

```bash
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
```

ユーザーが選択してステージ済みの差分だけを検査する。検査処理で追加のファイルをステージしない。

**出力があればコミットを中止**し、該当箇所を相対パスに直してから再実行する。
出力が空（終了コード 1）であれば通過。

## Step 2: Markdown lint

`.markdownlint.json` に対して検証する。設定の詳細と頻出エラーの直し方は
`markdown-formatter` スキルを参照。

```bash
npx --yes markdownlint-cli2@0.18.1 "**/*.md" ".claude/**/*.md" "#node_modules"
```

主にチェックされるのは **MD031（コードブロック前後の空行）/ MD012（連続空行）/
MD047（ファイル末尾の改行）**。MD022 / MD032 はこのプロジェクトでは無効化されている。

## Step 3: 静的 HTML の検証（`*.html` を変更した場合）

ビルド工程がないため、以下を手動で確認する。

```bash
# CDN 参照が完全バージョン固定 + SRI 付きか（@latest が残っていないか）
grep -nE 'cdn\.jsdelivr\.net[^"]*@(latest|[0-9]+)/' *.html
grep -c 'integrity=' *.html
```

ブラウザで直接ファイルを開き、以下を目視確認する（自動化不能）。

- Mermaid 図がすべて描画される（`undefined` や「図の読み込みに失敗しました」が出ない）
- DevTools Console に SRI 違反・JS エラーが出ていない
- アイコンフォントとセリフ体見出しが適用されている

詳細は `cdn-sri-mermaid-fix` および `fix-mermaid` スキルを参照。

## Step 4: Nuxt の検証（`package.json` が存在する場合のみ）

> [!NOTE]
> **Nuxt プロジェクトは未導入。** `package.json` が存在しない間、本ステップは
> スキップしてよい。「テストが無いので通った」と報告せず、**未導入である旨を明示**すること。

```bash
bun run test         # Vitest 契約テスト
bunx nuxi typecheck  # 型エラー
bun run build        # 本番ビルド
```

いずれかが失敗した場合はコミットしない。TDD サイクルとコミット分割の規約は
`.claude/rules/tdd-mandatory-cycle.md` を参照。

ページ移行を伴う場合は、原本照合監査の終了コード 0 も Green の前提条件になる。

```bash
node .claude/skills/nuxt-page-migration/scripts/audit_source_parity.mjs \
  <原本>.{html|md} pages/<slug>.vue
echo "exit=$?"   # 0 以外なら転写漏れあり
```

## Step 5: ドキュメント同期

構成・手順・スキルを変更した場合は `docs-sync` スキルに従い、
`CLAUDE.md` 等の該当箇所と最終更新日を同期してからコミットする。

## 報告フォーマット

実行後は以下を簡潔に報告する。

| 項目 | 報告内容 |
|---|---|
| Step 1 PII 検査 | 通過 / 検出（検出時は該当行） |
| Step 2 markdownlint | 通過 / エラー件数 |
| Step 3 静的 HTML | 実行した確認と結果 / 対象なし |
| Step 4 Nuxt | 実行結果 / **未導入のためスキップ** |
| 総合判定 | コミット可 / 不可（理由） |

**失敗や未実行を黙って省略しない。** スキップした項目は理由とともに明示する。
