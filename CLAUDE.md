# CLAUDE.md

Updated 2026-08-14

このリポジトリで作業する AI エージェント向けの規約。応答・コメント・ドキュメントは**日本語**。

## プロジェクトの目的

マネジメント／チームビルディング関連の**資格学習ガイド**を作成・公開する。
1つの資格につき、同じ内容を 2 形態で管理する。

| 形態 | 役割 |
|---|---|
| `<資格名>.md` | 章立て・本文の正。読みやすさとレビューのしやすさを優先 |
| `<資格名>.html` | 公開用の単一ファイル。デザイン・図解の正 |

## 現在のリポジトリ構成

```text
Certified-Associate-in-Project-Management.md     CAPM ガイド（61KB / 見出し74 / リスト114 / 表144行）
Certified-Associate-in-Project-Management.html   同上の公開用 HTML（107KB / Mermaid図9）
.markdownlint.json                               Markdown lint 設定
.claude/                                         エージェント用のスキルとルール
.claude/skills/md-to-html/                       MD → HTML 変換スキル（雛形・変換規則・監査2本）
```

ビルド工程・パッケージマネージャ・テストランナーは**まだ存在しない**。
HTML はブラウザで直接開いて確認する。

ただし `md-to-html` スキルの監査スクリプトは依存パッケージ無しで動く。

```bash
node --test .claude/skills/md-to-html/scripts/audit_content_parity.test.mjs
node --test .claude/skills/md-to-html/scripts/audit_design_parity.test.mjs
```

## 将来計画: Nuxt.js（Vue）への移行

HTML を **Nuxt.js（Vue 3）の `pages/*.vue` へ手書きで移行**する予定。**未着手**。

- `.md` は移行後も**原本として維持**する（削除しない）
- 移行の標準手順は `.claude/skills/nuxt-page-migration/SKILL.md`
- 移行の最大のリスクは**転写漏れ**。原本照合監査（`audit_source_parity.mjs`）の
  exit 0 を Green の前提条件とする

> [!IMPORTANT]
> Nuxt が未導入である以上、`package.json` / `bun run test` / `pages/` は**まだ存在しない**。
> スキルやルールにこれらのパスが登場するのは「移行後の契約」を書いているためであり、
> **現時点で存在するかのように報告してはならない。**

## 静的 HTML の現状と既知のリスク

`Certified-Associate-in-Project-Management.html` は CDN（jsDelivr）から直接読み込む。

| 資産 | 現状 | 状態 |
|---|---|---|
| Tabler Icons webfont | `@latest`（実体 3.46.0） | **バージョン未固定・SRI なし** |
| Fontsource Source Serif 4 | `@5`（実体 5.3.0） | SRI なし |
| Mermaid | `@11`（実体 11.16.1） | SRI なし |

対処手順と検証済み SRI ハッシュは `.claude/skills/cdn-sri-mermaid-fix/SKILL.md` にある（未適用）。

> [!NOTE]
> `md-to-html` スキルで**新規に生成するページは固定バージョン + SRI で出力される**。
> したがって新旧のページで `<head>` の CDN タグだけが食い違う。
> `audit_design_parity.mjs` を既存の CAPM.html に実行すると `cdn` カテゴリだけが NG になるが、
> これは上表の未適用課題そのものであり、スキルの不具合ではない。

**Mermaid の実装方式に注意**: このHTMLは `<div class="mermaid">` 方式ではなく、
JS の `DIAGRAMS` オブジェクト（テンプレートリテラル）+ `mermaid.render()` 手動呼び出し方式。
図の追加・修正は `DIAGRAMS` を直接編集する。詳細は `.claude/skills/fix-mermaid/SKILL.md`。

## ルール（`.claude/rules/`）

| ファイル | 内容 | 発効状況 |
|---|---|---|
| `no-absolute-paths.md` | コミット対象への絶対パス記載禁止 + コミット前検査 | **常時有効** |
| `mermaid-diagram-layout.md` | 図解の中央寄せ・縮小フィットの不変条件 | Nuxt 移行後に発効 |
| `tdd-mandatory-cycle.md` | TDD サイクルとコミット分割の強制 | `pages/` 等の作成後に発効 |
| `migration-progress-sync.md` | `docs/PROGRESS.md` 同期のゲート条件 | Nuxt 移行着手後に発効 |

## スキル（`.claude/skills/`）

| スキル | 用途 |
|---|---|
| `md-to-html` | 資格ガイドの MD → 単一ファイル HTML 変換（雛形・変換規則・原本照合/デザイン照合監査を同梱） |
| `nuxt-page-migration` | HTML/MD → Nuxt `pages/*.vue` の移行と保守（原本照合監査を同梱） |
| `fix-mermaid` | Mermaid の構文エラー・配色・サイズ・中央寄せの修正 |
| `cdn-sri-mermaid-fix` | CDN のバージョン固定と SRI 付与、Mermaid 描画 API の互換性 |
| `markdown-formatter` | `.markdownlint.json` 準拠の書式修正 |
| `docs-sync` | 仕様書と実態の同期、最終更新日の更新 |
| `pre-commit-check` | コミット前の全検証（PII 検査・lint・テスト） |

## コミット規約

形式: `<type>(<scope>): <subject>` — type は `feat` / `fix` / `docs` / `refactor` / `test` / `chore`。

### コミット前の必須検査（スキップ禁止）

`.claude/rules/no-absolute-paths.md` のゲート条件。ステージング済み差分に
OS のユーザー名を含む絶対パスが混入していないかを機械的に検証する。

```bash
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
```

**出力があればコミットを中止**し、相対パスに直してから再実行する。

Markdown を編集した場合はあわせて lint を通す。

```bash
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

総合チェックは `pre-commit-check` スキルを使う。

## 作業方針

- **原本の内容を要約・省略・言い換えしない。** 資格情報は正確性が最優先。
  出題比率・受験料・PDU 数などの数値を推測で書き換えない
- 一次情報（PMI 公式サイト・Exam Content Outline）と食い違う記述を見つけたら、
  勝手に直さずユーザーに提示して確認を取る
- ファイル編集前に「なぜこのファイルか」「より小さい変更で済まないか」を確認する。
  投機的な編集は行わない
