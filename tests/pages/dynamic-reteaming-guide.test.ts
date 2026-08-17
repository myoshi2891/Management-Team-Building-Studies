// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/dynamic-reteaming-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "ダイナミック・リチーミング実践ガイド",
] as const;

const EXPECTED_H2 = [
  "はじめに",
  "ダイナミック・リチーミングとは何か",
  "なぜ重要なのか",
  "全体像をつかむ: チームのエコサイクル",
  "5つの基本パターン",
  "どのパターンを選ぶか: 判断フロー",
  "ステップ・バイ・ステップ実践ガイド",
  "避けるべきアンチパターン",
  "実践チェックリスト",
  "まとめ",
  "参考文献・出典",
] as const;

// 参考文献セクションの h4 1 件を a11y 基準（Q-3）に従い h3 に昇格させ全 12 件
const EXPECTED_H3 = [
  "① One by One(一人ずつ)",
  "② Grow and Split(成長と分割)",
  "③ Isolation(隔離)",
  "④ Merging(統合)",
  "⑤ Switching(交代)",
  "Step 1: シグナルを察知する",
  "Step 2: リチーミングFAQを作成する",
  "Step 3: チームを巻き込み合意形成する",
  "Step 4: 新チームを正式にキックオフする",
  "Step 5: 移行期をケアする(キャリブレーション)",
  "Step 6: ふりかえりを行う",
  "参照した情報源",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["フロントループ 立ち上げ 探索"] --> B["フロントループ 成長・成熟 活用"]
    B --> C["バックループの兆し 硬直化・停滞"]
    C --> D["創造的破壊 リチーミングの実行"]
    D --> E["再構成 新しいチームの誕生"]
    E --> A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;`,
  `flowchart TB
    Start["チームに変化の兆しがある"] --> Q1{"新しい人が加わる、または抜けるだけか?"}
    Q1 -- "はい" --> P1["パターン1 One by One"]
    Q1 -- "いいえ" --> Q2{"チームが大きくなりすぎて意思決定が遅い?"}
    Q2 -- "はい" --> P2["パターン2 Grow and Split"]
    Q2 -- "いいえ" --> Q3{"集中的な新規開発や危機対応が必要?"}
    Q3 -- "はい" --> P3["パターン3 Isolation"]
    Q3 -- "いいえ" --> Q4{"複数チーム、または組織を統合する必要がある?"}
    Q4 -- "はい" --> P4["パターン4 Merging"]
    Q4 -- "いいえ" --> P5["パターン5 Switching"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class Q1,Q2,Q3,Q4 box;
    class P1,P2,P3,P4,P5 done;`,
  `flowchart TB
    S1["Step1 シグナルを察知する"] --> S2["Step2 リチーミングFAQを作成する"]
    S2 --> S3["Step3 チームを巻き込み合意形成する"]
    S3 --> S4["Step4 新チームを正式にキックオフする"]
    S4 --> S5["Step5 移行期をケアする キャリブレーション"]
    S5 --> S6["Step6 ふりかえりを行う"]
    S6 -.-> S1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`,
] as const;

const EXPECTED_CALLOUTS = [
  {
    variant: "note",
    label: "補足",
    keyword: "一次情報",
  },
] as const;

defineSourceParityContract({
  pageName: "Dynamic Reteaming Guide (app/pages/dynamic-reteaming-guide.vue)",
  component: Page,
  expectedH1: EXPECTED_H1,
  expectedH2: EXPECTED_H2,
  expectedH3: EXPECTED_H3,
  expectedH4: EXPECTED_H4,
  expectedH5: EXPECTED_H5,
  expectedH6: EXPECTED_H6,
  expectedMermaidSources: EXPECTED_MERMAID_SOURCES,
  expectedCallouts: EXPECTED_CALLOUTS,
  seoMetaSpy: seoMeta,
  expectedSeo: {
    titleKeyword: "ダイナミック・リチーミング",
    descriptionKeyword: "Heidi Helfand",
  },
});
