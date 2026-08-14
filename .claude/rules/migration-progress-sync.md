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

<ai_agent_directive>
**AI エージェントへの厳格な指示**: このプロトコルは提案ではなく絶対的な**ゲート条件（Gate Condition）**です。
ユーザーへ作業完了を報告する前に、以下の手続き（コード変更のコミット -> 進捗ファイルの更新 -> 進捗ファイルのコミット）を**ユーザーの許可を待たずに自律的に、必ずステップバイステップで**実行してください。ステップバイステップのコミット分割ルールを無視して一括コミットを行ったり、コミットせずにユーザーに判断を委ねたりすることは重大な規約違反です。
</ai_agent_directive>

### 必須（毎ページ・例外なし）

**1ページの `git commit` 完了直後、次の HTML を `Read` し始める前に即実施する。**

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
