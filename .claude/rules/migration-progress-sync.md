---
paths:
  - "app/pages/**/*.vue"
  - "app/components/**/*.vue"
  - "app/assets/css/**/*.css"
  - "docs/PROGRESS.md"
---

# docs/PROGRESS.md セッション終了前同期ルール

(最終更新日: 2026-08-15)

HTML → Nuxt.js（Vue）移行セッションでは、**コンテキストが逼迫する前に**必ず以下を実施してセッションを終えること。

## 実行タイミング

**AI エージェントへの厳格な指示**（エージェント種別を問わず適用）:
このプロトコルは提案ではなく絶対的な**ゲート条件（Gate Condition）**である。
ユーザーへ作業完了を報告する前に、以下の手続き（コード変更のコミット → 進捗ファイルの更新 →
進捗ファイルのコミット）を**ユーザーの許可を待たずに自律的に、必ずステップバイステップで**実行すること。
ステップバイステップのコミット分割ルールを無視して一括コミットを行ったり、
コミットせずにユーザーに判断を委ねたりすることは重大な規約違反である。

### 自律コミット前の対象範囲検証（必須・スキップ禁止）

本プロトコルは**ユーザーの許可を待たずにコミットする**ため、意図しないファイルを巻き込む危険がある。
`git commit` を実行する前に、必ず次の 2 つを実行して対象範囲を目視ではなく機械的に確認する。

```bash
git status --short              # 作業ツリー全体の変更
git diff --cached --name-only   # 実際にコミットされるファイル
```

以下のいずれかに該当する場合は、**コミットせずに停止し、ユーザーへ状況を報告して指示を仰ぐ**。

- `git diff --cached --name-only` に、本セッションで自分が編集した覚えのないファイルが含まれる
  （作業開始前から staged だった他者・別セッションの変更）
- `git status --short` に、本作業と無関係な未コミット変更が残っており、
  `git add` の指定次第で巻き込む恐れがある

`git add` は `git add -A` / `git add .` を使わず、**対象ファイルを明示列挙する**こと
（例: `git add docs/PROGRESS.md`）。無関係な変更を独断で `git checkout` / `git stash` /
`git reset` で退避・破棄してはならない。

本ファイル中の `bun run <script>` は、`bun` が使えない環境では `npm run <script>` に読み替える
（`package.json` の同じ scripts を実行する）。`bunx nuxi typecheck` は **`npm run typecheck`**
に読み替える（ローカル依存の `node_modules/.bin/nuxi` を実行する）。
**`npx nuxi` は使わない** — バージョン未固定でレジストリから任意の版を取得するため。
ローカルに nuxi が無ければ `npm run typecheck` が非 0 で止まるので、その場で停止して依存を入れ直す。

### 必須（毎ページ・例外なし）

**1ページの `git commit` 完了直後、次の HTML を読み始める前に即実施する。**

これは任意の「区切り」ではなく、次ページ読み込みのための**ゲート条件**。
`docs/PROGRESS.md` が未コミットの状態で次の HTML を読み始めることは禁止。

> [!NOTE]
> `docs/PROGRESS.md` は作成済みで、本ルールは発効している。

### 追加トリガー

- コンテキスト消費が大きくなってきた
- ユーザーが新セッション開始を示唆
- ユーザーが「セッション終了」「仕様書更新して」と言った

## 手順

### 1. ビルド確認

```bash
bun run test           # 契約テストが Green
bun run build          # ビルド成功を確認
bunx nuxi typecheck    # 型エラーなし
bun run test:e2e       # 静的生成 + Playwright スモーク（ページ改修時）
git rev-parse --short HEAD
```

### 2. `docs/PROGRESS.md` を更新

`現在地` テーブルの更新対象フィールド:

| フィールド | 更新内容 |
|---|---|
| `最新 HEAD` | `git rev-parse --short HEAD` の実値 + コミットメッセージ要約 |
| `次の作業` | 次セッションで **最初に** 取り掛かるページ（例: `Certified-Associate-in-Project-Management.html §6 ドメイン1 の移行`） |
| `ビルド状態` | `bun run test` / `bun run build` / `bunx nuxi typecheck` / `bun run test:e2e` の最新状態 |
| `テスト数` | `bun run test` の実測値（`tdd-mandatory-cycle.md` のベースライン） |

### 3. `## 次回セッションでの再開プロンプト` を同期

`現在地` の値と一致するように再開プロンプト内の以下を書き換える:

- `最新 HEAD: <hash>` の値
- `次の作業:` の説明（ページ粒度で具体的に）
- 未移行セクション（または未移行 HTML）の残数

### 4. コミット

```bash
git add docs/PROGRESS.md
git commit -m "chore(docs): update docs/PROGRESS.md — <作業内容の1行要約>"
```

## 禁止

- HEAD 値をコミットせず新セッションに引き継ぐ（ズレが発生する）
- 再開プロンプトと `現在地` が食い違ったままコミットする
- ビルドエラーが残ったままコミットする
