# CLAUDE.md

Updated 2026-08-17

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
archive/                                             移行済み原本のアーカイブ
  Certified-Associate-in-Project-Management/         CAPM ガイド原本（.md / .html）
  Engineering-management-career-path/                EM キャリアパスガイド原本（.md / .html）
Certified-associate-in-project-management-domain1.md / .html  CAPM ドメイン1（未移行）
Capm-domain1-pm.md                                   CAPM ドメイン1 の補助ガイド
app/                                                 Nuxt 4 のソース（既定 srcDir）
tests/ e2e/                                      Vitest 契約テスト / Playwright スモーク
docs/PROGRESS.md                                 Nuxt 移行の進捗と「正当な差分の記録」
.markdownlint.json                               Markdown lint 設定
.claude/                                         エージェント用のスキルとルール（Claude Code）
.gemini/settings.json                            Gemini CLI に CLAUDE.md を読ませる設定
```

`app/` 配下の構成（Nuxt 4 の既定 `srcDir` は `app/`。テストだけリポジトリ直下）:

```text
app/app.vue                        <SiteHeader /> → <NuxtPage /> のアプリシェル
app/assets/css/main.css            :root トークン + 基底要素（全ページ共有）
app/pages/index.vue                ホーム（学習ライブラリ）。カード一覧は guide-catalog から導出
app/pages/capm.vue                 CAPM ガイド（移行済み）
app/pages/engineering-management-career-path.vue  EM キャリアパスガイド（移行済み）
app/components/SiteHeader.vue      全ページ共通のグローバルヘッダー。カテゴリー別ドロップダウン（導線は guide-catalog 由来）
app/components/MermaidDiagram.vue  図解レイアウトの SSoT + svg 後処理
app/composables/useActiveHeading.ts  TOC のスクロール連動
app/plugins/mermaid.client.ts      mermaid.initialize を一度だけ実行
app/utils/guide-catalog.ts         公開ガイド定義の SSoT（ホーム・グローバルナビの共通データ源）
app/utils/mermaid-loader.ts        import("mermaid") の singleton 化
```

> [!IMPORTANT]
> **新規ガイドページの登録先は `app/utils/guide-catalog.ts` の `GUIDES` 1 か所。**
> ここに 1 件追加すれば、ホームのカード一覧（`app/pages/index.vue`）と
> グローバルナビのドロップダウン（`app/components/SiteHeader.vue`）の両方が追随する。
> 登録しないとページはどこからも到達できない。
> これらの導線は原本 HTML に存在しないため**原本照合監査では検知できない**。
> 契約テスト（`tests/utils/guide-catalog.test.ts` / `tests/pages/index.test.ts` /
> `tests/components/SiteHeader.test.ts`）で固定する。
> 手順は `.claude/skills/nuxt-page-migration/SKILL.md` §5 Step 2.5。
>
> カテゴリーを増やす場合は同ファイルの `GUIDE_CATEGORIES` に追加する。
> `cardLabel`（ホームのカードに出る英語表記）と `navLabel`（ナビの日本語表記）は 1:1 対応。
> アイコン名を `.ts` に置いている都合上、`nuxt.config.ts` の
> `icon.clientBundle.scan.globInclude` から `.ts` を外すとビルド成果物からアイコンが
> 欠落する（dev サーバーでは再現しない）。
>
> 固定ヘッダーの高さは `--global-nav-height`（`app/assets/css/main.css`）が SSoT。
> sticky なサイドバー・TOC・見出しアンカーは必ずこの変数で退避させる（数値の直書き禁止）。

## 開発コマンド

パッケージマネージャは **bun**。使えない環境では `npm run <script>` で読み替える
（同じ `package.json` の scripts を実行するため結果は同じ）。

```bash
bun run dev          # 開発サーバー
bun run test         # Vitest 契約テスト（bun test は不可。設定を読まないため）
bun run test:e2e     # generate + Playwright スモーク（ポート 4173）
bunx nuxi typecheck  # 型検査
bun run lint         # ESLint
bun run build        # 本番ビルド
bun run audit:capm   # 原本照合監査（CAPM。exit 0 が Green の前提条件）
```

スキル同梱の監査スクリプトは依存パッケージ無しで動く。

```bash
node --test .claude/skills/md-to-html/scripts/audit_content_parity.test.mjs
node --test .claude/skills/md-to-html/scripts/audit_design_parity.test.mjs
node --test .claude/skills/nuxt-page-migration/scripts/audit_source_parity.test.mjs
```

## Nuxt.js（Vue）への移行

HTML を **Nuxt 4（Vue 3）の `app/pages/*.vue` へ手書きで移行**する。
CAPM・EM キャリアパスの 2 本は移行済み（最新状況は `docs/PROGRESS.md` を正とする）。

- `.md` / `.html` は移行後も**原本として維持**する（削除しない）
- 移行の標準手順は `.claude/skills/nuxt-page-migration/SKILL.md`
- 新規ページは移行に加えて**ホームとグローバルナビへの登録**が必須（上記 IMPORTANT を参照）
- 移行の最大のリスクは**転写漏れ**。原本照合監査（`audit_source_parity.mjs`）の
  exit 0 を Green の前提条件とする
- **監査のゲート原本は `.html`**。CAPM では `.md` と `.html` の構造が乖離しており
  （h2 の個数・番号の有無・ステップの再構造化）、`.md` 監査は情報提供として扱う。
  詳細は `docs/PROGRESS.md`「正当な差分の記録」

## 静的 HTML の現状と既知のリスク

以下は**原本の静的 HTML に残る課題**であり、Nuxt 版（`app/pages/capm.vue`）には
該当しない。Nuxt 版はフォント・Mermaid・アイコンをすべて npm 依存として同梱するため、
CDN 直読みも SRI 欠落も発生しない。

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

**Mermaid の実装方式に注意**: 静的 HTML は `<div class="mermaid">` 方式ではなく、
JS の `DIAGRAMS` オブジェクト（テンプレートリテラル）+ `mermaid.render()` 手動呼び出し方式。
図の追加・修正は `DIAGRAMS` を直接編集する。
Nuxt 版は `app/components/MermaidDiagram.vue` に `:chart` を渡す方式で、
テーマは Mermaid ソース先頭の frontmatter として図ごとに埋め込む
（`mermaid.initialize` をマウントごとに呼ぶと同時描画中の別の図を壊すため）。
詳細は `.claude/skills/fix-mermaid/SKILL.md`。

## ルール（`.claude/rules/`）

| ファイル | 内容 | 発効状況 |
|---|---|---|
| `no-absolute-paths.md` | コミット対象への絶対パス記載禁止 + コミット前検査 | **常時有効** |
| `mermaid-diagram-layout.md` | 図解の中央寄せ・縮小フィットの不変条件 | **発効中** |
| `tdd-mandatory-cycle.md` | TDD サイクルとコミット分割の強制 | **発効中** |
| `migration-progress-sync.md` | `docs/PROGRESS.md` 同期のゲート条件 | **発効中** |

## スキル（`.claude/skills/`）

| スキル | 用途 |
|---|---|
| `md-to-html` | 資格ガイドの MD → 単一ファイル HTML 変換（雛形・変換規則・原本照合/デザイン照合監査を同梱） |
| `nuxt-page-migration` | HTML/MD → Nuxt `app/pages/*.vue` の移行と保守（原本照合監査を同梱） |
| `fix-mermaid` | Mermaid の構文エラー・配色・サイズ・中央寄せの修正 |
| `cdn-sri-mermaid-fix` | CDN のバージョン固定と SRI 付与、Mermaid 描画 API の互換性 |
| `markdown-formatter` | `.markdownlint.json` 準拠の書式修正 |
| `docs-sync` | 仕様書と実態の同期、最終更新日の更新 |
| `pre-commit-check` | コミット前の全検証（PII 検査・lint・テスト） |

## 他エージェント（Gemini CLI 等）での利用

`.claude/skills/*/SKILL.md` と `.claude/rules/*.md` の **front matter は Claude Code 固有**であり、
他のエージェントは解釈しない。したがって以下が前提になる。

| 項目 | Claude Code | Gemini CLI 等 |
|---|---|---|
| 本ファイルの読み込み | 自動 | `.gemini/settings.json` の `context.fileName` に `CLAUDE.md` を指定済み |
| スキルの発火 | トリガー語句で自動 | **該当する `SKILL.md` を明示的に開いてから作業する** |
| ルールの適用 | front matter の `paths` で自動 | 各ルールの本文「適用範囲」節を読んで手動で適用する |
| `references/` の参照 | 必要時に自動 | 各 `SKILL.md` の「作業開始前に必ず読むファイル」を手動で開く |

そのため、トリガー語句・適用パス・必読ファイルは **front matter ではなく本文を正**とする。
両者が食い違った場合は本文に合わせて front matter を直す。
手順・ゲート（終了コード 0）はエージェント種別によらず省略しない。

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
npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules"
```

`app/` 配下を編集した場合は、あわせて `bun run test` / `bunx nuxi typecheck` /
`bun run lint` を通す。ページを移行・改修した場合は原本照合監査（`bun run audit:capm` 等）の
exit 0 と `bun run test:e2e` も確認する。

総合チェックは `pre-commit-check` スキルを使う。

## 作業方針

- **原本の内容を要約・省略・言い換えしない。** 資格情報は正確性が最優先。
  出題比率・受験料・PDU 数などの数値を推測で書き換えない
- 一次情報（PMI 公式サイト・Exam Content Outline）と食い違う記述を見つけたら、
  勝手に直さずユーザーに提示して確認を取る
- ファイル編集前に「なぜこのファイルか」「より小さい変更で済まないか」を確認する。
  投機的な編集は行わない
