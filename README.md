# Management Team Building Studies

マネジメントやチームビルディングに関する資格学習ガイドおよびキャリアパスガイドを体系的に作成・公開するWebアプリケーションです。

---

## 概要

本プロジェクトでは、マネジメント関連の学習ガイドを「レビュー用のMarkdown原本」と「公開用のリッチなWebページ（Nuxt 4）」の2つの形態で管理しています。
Mermaid.js による図解、目次連動スクロール、洗練されたタイポグラフィなどを備えた学習コンテンツを提供します。

### 公開中の主なガイド

- **CAPM® 学習ガイド**: Certified Associate in Project Management 対策ガイド
- **CAPM® ドメイン1**: プロジェクトマネジメント基礎と主要概念（配点36%）の詳細ガイド
- **エンジニアリングマネジメント キャリアパス**: EMとしてのキャリア形成・実践ガイド
- **エンジニアリングチームのリード術**: チームビルディング・1on1・委譲・レビュー文化の実践ガイド
- **エンジニアリングマネージャー入門**: 新任EMのスタートダッシュから心理的安全性までの完全ガイド

> 上記は Nuxt サイト（`app/pages/`）に移行済みのガイドのみです
> （登録先は `app/pages/index.vue` の `guides` と `app/components/SiteHeader.vue` の `navigation`）。
> リポジトリ直下には、サイト未移行のガイド原本（Markdown / 単一ファイル HTML プレビュー）も置いています
> （CAPM ドメイン2・ドメイン3、エンジニアリング統括責任者の手引き）。

---

## 技術スタック

- **フレームワーク**: [Nuxt 4](https://nuxt.com/) (Vue 3 / Composition API)
- **言語 / ランタイム**: TypeScript / [Bun](https://bun.sh/)
- **図解**: Mermaid.js
- **アイコン / フォント**: Nuxt Icon (Tabler), Source Serif 4
- **テスト**: Vitest (@nuxt/test-utils), Playwright (E2E)
- **リンター / 型チェック**: ESLint (@nuxt/eslint), vue-tsc

---

## ディレクトリ構成

```text
├── app/                  # Nuxt 4 アプリケーションソース
│   ├── assets/css/       # グローバルスタイル・デザイントークン
│   ├── components/       # 共有コンポーネント (MermaidDiagram, SiteHeader等)
│   ├── composables/      # 共通コンポーザブル (useActiveHeading等)
│   └── pages/            # ページルーティング (index, capm 等)
├── archive/              # 移行済み原本 (Markdown / HTML)
├── docs/                 # プロジェクト仕様・進捗ドキュメント (PROGRESS.md 等)
├── tests/                # Vitest ユニット / 契約テスト
├── e2e/                  # Playwright E2E テスト
└── CLAUDE.md             # AI エージェント / 開発規約
```

---

## 開発コマンド

パッケージマネージャには **Bun** を推奨しています。

### セットアップ

```bash
bun install
```

### 開発サーバーの起動

```bash
bun run dev
```

### ビルド & 静的生成

```bash
# プロダクションビルド
bun run build

# 静的サイト生成 (SSG)
bun run generate

# プレビュー
bun run preview
```

### テスト & チェック

```bash
# ユニット / 契約テスト
bun run test

# E2E テスト
bun run test:e2e

# 型チェック
bun run typecheck

# リント
bun run lint
```

---

## 開発ルール & ガイドライン

詳細な開発規約や設計方針については [CLAUDE.md](./CLAUDE.md) および [docs/PROGRESS.md](./docs/PROGRESS.md) を参照してください。
