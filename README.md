# Management Team Building Studies

マネジメント、プロジェクト管理、エンジニアリング組織運営、チームビルディングに関する資格学習ガイドおよびキャリア・リーダーシップ実践ガイドを体系的に作成・提供するWebアプリケーションです。

---

## 概要

本プロジェクトでは、マネジメントおよびエンジニアリングリーダーシップに関する学習コンテンツを、以下の2形態で管理・運用しています。

| 形態 | 役割 | 格納場所 |
|---|---|---|
| **Markdown 原本 (`.md`)** | 章立て・本文の正。レビュー・修正のしやすさを重視 | リポジトリ直下 / `archive/` |
| **Nuxt 4 Web アプリケーション** | リッチなWebページ。図解・目次連動・洗練された読書体験を提供 | `app/pages/*.vue` |

Mermaid.js によるダイアグラム図解、目次（TOC）スクロール連動、レスポンシブデザイン、ダーク/ライト調和のデザイントークンを備え、初学者から実務リーダーまで直感的に学べる学習体験を提供します。

---

## 公開中の学習ガイド

現在、Nuxt 4 サイト（`app/pages/`）で公開されているガイド一覧です。

### 1. プロジェクトマネジメント

- **[CAPM® 認定資格 完全ガイド](./app/pages/capm.vue)** (`/capm`)
  - PMI公式情報（Exam Content Outline等）に基づく受験資格、4つの出題領域、学習ロードマップの完全解説（全15セクション）。
- **[CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念](./app/pages/certified-associate-in-project-management-domain1.vue)** (`/certified-associate-in-project-management-domain1`)
  - 配点比率36%を占める最重要ドメインの集中学習ガイド。プロジェクトライフサイクル、組織構造、テーラリング等を徹底解説（全9セクション）。

### 2. エンジニアリングマネジメント & リーダーシップ

- **[エンジニアのためのマネジメントキャリアパス](./app/pages/engineering-management-career-path.vue)** (`/engineering-management-career-path`)
  - テックリードからEM、VPoE、CTOまでの役割の違いと、マネージャー着任後最初の90日間のアクションプランを体系化（全12セクション）。
- **[エンジニアリングチームのリード術 完全ガイド](./app/pages/engineering-team-leadership-guide.vue)** (`/engineering-team-leadership-guide`)
  - チームビルディングの科学的根拠（Google Project Aristotle等）、1on1、委譲、コードレビュー文化などの実践プラクティス（全11セクション）。
- **[エンジニアリングマネージャー入門完全ガイド](./app/pages/engineering-manager-guide.vue)** (`/engineering-manager-guide`)
  - James Stanier著『Become an Effective Software Engineering Manager』を主軸とした、新任EMの基礎固めから心理的安全性、現代のAI時代におけるEMの役割までの完全ガイド（全14セクション）。

---

## 制作中・原本コンテンツ

リポジトリ直下および `archive/` には、後続の移行対象となるガイド原本（Markdown / 単一HTML）を保管しています（※ 現在の移行対象原本を網羅して記載しています）。

- **CAPM® シリーズ**:
  - ドメイン2: 予測型アプローチ (`Certified-associate-in-project-management-domain2.md` / `.html`)
  - ドメイン3: アジャイルフレームワーク (`Capm-domain3-agile-frameworks-guide.md` / `.html`)
  - ドメイン4: ビジネスアナリシス (`Capm-domain4-business-analysis-frameworks.md` / `.html`)
- **PMP® シリーズ**:
  - PMP® 資格取得総合ガイド (`Pmp-certification-guide.md`)
- **エグゼクティブ・リーダーシップ**:
  - エンジニアリング統括責任者の手引き (`Engineering-executive-playbook.md` / `.html`)
  - リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド (`the-art-of-leadership.md` / `Leadership-practices-guide.html`)
  - Team Geek — Googleのギークたちはいかにしてチームを作るのか (`Team-geek-guide.md`)
- **チームビルディング**:
  - ダイナミック・リチーミング実践ガイド (`Dynamic-reteaming-guide.md`)

---

## 技術スタック

| レイヤー | 技術 / ライブラリ | 用途 |
|---|---|---|
| **Framework** | [Nuxt 4](https://nuxt.com/) (Vue 3 / Composition API) | 静的サイト生成 (SSG) / SPA ルーティング |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 静的型付け |
| **Runtime & PM** | [Bun](https://bun.sh/) | 高速パッケージマネージャ / スクリプト実行 |
| **Diagrams** | [Mermaid.js](https://mermaid.js.org/) | ワークフロー、組織図、プロセスマップのレンダリング |
| **Icons & Typography** | [Nuxt Icon](https://nuxt.com/modules/icon) (Tabler), Source Serif 4 | アイコンセットおよびセリフ調フォント |
| **Testing** | [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/) | 単体・契約テスト (Vitest) および E2E スモークテスト (Playwright) |
| **Lint & Quality** | ESLint (@nuxt/eslint), markdownlint-cli2 | コード規約および Markdown フォーマット検証 |

---

## ディレクトリ構成

```text
├── app/                  # Nuxt 4 アプリケーションソース
│   ├── assets/css/       # グローバルCSS・デザイントークン
│   ├── components/       # 共有Vueコンポーネント (MermaidDiagram, SiteHeader等)
│   ├── composables/      # 共通Composable (useActiveHeading等)
│   ├── plugins/          # Nuxtプラグイン (mermaid.client.ts等)
│   ├── utils/            # ユーティリティ (mermaid-loader.ts等)
│   └── pages/            # 各ガイドのVueページ (index.vue, capm.vue 等)
├── archive/              # 移行完了済み原本アーカイブ
├── docs/                 # プロジェクト管理・進捗記録 (PROGRESS.md 等)
├── tests/                # Vitest ユニットテスト・契約テスト
├── e2e/                  # Playwright E2E テスト
├── .claude/              # 開発・移行支援スクリプト & ルール規約
├── CLAUDE.md             # 開発規約・品質基準・AI向け指示書
└── README.md             # 本ファイル
```

---

## 開発コマンド

推奨パッケージマネージャは **Bun** です（`npm` でも同様に実行可能です）。

### 1. セットアップ

```bash
bun install
```

### 2. 開発サーバー起動

```bash
bun run dev
```

### 3. テスト & 静的解析

```bash
# Vitest ユニット / 契約テスト
bun run test

# 型チェック
bun run typecheck

# ESLint コード解析
bun run lint

# Markdown Lint
npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules"

# Playwright E2E テスト
bun run test:e2e
```

### 4. ビルド & 静的サイト生成 (SSG)

```bash
# プロダクションビルド
bun run build

# 静的HTML生成 (SSG)
bun run generate

# 成果物のローカルプレビュー
bun run preview
```

### 5. 原本照合監査

原本（HTML）と Nuxt ページ（Vue）の間で内容の欠落や見出し順序の不一致がないかを機械的に検証します。

```bash
# CAPM ガイドの原本照合
bun run audit:capm

# チームリード術ガイドの原本照合
bun run audit:lead
```

---

## 設計原則 & 品質方針

1. **原本情報の忠実な再現（SSoT）**:
   - 資格情報（配点比率、受験料、要件等）の正確性を最優先とし、推測による要約・省略を行いません。
2. **ナビゲーションの二重登録原則**:
   - 新規ガイドページを作成した際は、[app/pages/index.vue](./app/pages/index.vue) の `guides` 配列と [app/components/SiteHeader.vue](./app/components/SiteHeader.vue) の `navigation` 配列の双方に登録し、契約テストで導線を保証します。
3. **アクセシビリティ (a11y) & レスポンシブ**:
   - 見出しレベルの飛び（h2からh4へのスキップ等）を排除し、セマンティックなHTML構造とモバイルフレンドリーな閲覧環境を維持します。

---

## 関連ドキュメント

- **[CLAUDE.md](./CLAUDE.md)**: 開発規約、コミットルール、AI エージェント向け詳細指示
- **[docs/PROGRESS.md](./docs/PROGRESS.md)**: 移行進捗状況および原本との正当な差分記録
