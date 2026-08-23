// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/debugging-teams-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Debugging Teams 完全ガイド ― チームの人間関係を「デバッグ」するベストプラクティス",
] as const;

const EXPECTED_H2 = [
  "この記事について",
  "書籍概要: Debugging Teamsとは",
  "なぜ「人間関係」もデバッグの対象なのか",
  "核心原則: HRT(謙虚さ・敬意・信頼)",
  "全体像: 6つの章が描くチームの成長ステップ",
  "ステップバイステップ ベストプラクティス",
  "明日から使えるHRT実践チェックリスト",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "ステップ1: HRTを自分の判断基準にする",
  "ステップ2: 早めに、頻繁に、途中経過を見せる",
  "ステップ3: 批判を建設的に受け取り、建設的に伝える",
  "ステップ4: 失敗を恐れず、早く失敗して学ぶ",
  "ステップ5: チーム文化を意図的に設計する",
  "ステップ6: 指示統制ではなくサーバントリーダーシップでチームを率いる",
  "ステップ7: 有害な行動には早く気づき、人ではなく行動に対処する",
  "ステップ8: 組織の中でうまく立ち回る",
  "ステップ9: ユーザーも人間として扱い、信頼口座を積み立てる",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
Start["チーム内で対立や摩擦が発生した"] --> Q1{謙虚さは十分か}
Q1 -->|不足している| H["自分が絶対に正しいと思い込んでいないか振り返る"]
Q1 -->|十分| Q2{敬意は十分か}
Q2 -->|不足している| R["相手を一人の人間として尊重できているか確認する"]
Q2 -->|十分| Q3{信頼は十分か}
Q3 -->|不足している| T["相手の能力を信じて任せられているか確認する"]
Q3 -->|十分| OK["HRTは満たされている 別の原因を探る"]
H --> Fix["HRTに基づいて自分の行動を修正する"]
R --> Fix
T --> Fix

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class Start hub;
class Q1,Q2,Q3,H,R,T box;
class OK,Fix done;`,
  `flowchart TB
A["① 天才神話を捨てHRTを内面化する"] --> B["② チーム文化を意図的に設計する"]
B --> C["③ サーバントリーダーとして振る舞う"]
C --> D["④ 有害な言動に早期に対処する"]
D --> E["⑤ 組織の中でうまく立ち回る"]
E --> F["⑥ ユーザーを人として尊重し信頼を積む"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`,
  `flowchart TB
A["フィードバックを伝える場面"] --> B["感情ではなく行動と事実に焦点を当てる"]
B --> C["相手への敬意と共感を言葉と態度で示す"]
C --> D["何をどう変えてほしいか具体的に伝える"]
D --> E["一方的に話さず相手の反応を聞く"]
E --> F["改善に向けて次の一歩を一緒に決める"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class B,C,D,E box;
class F done;`,
  `flowchart TB
A["問題のある言動に気づく"] --> S{"ハラスメント・脅迫・差別・報復のリスクや力関係の非対称など安全上の懸念があるか"}
S -->|ある| X["事実を記録し社内の窓口へ速やかにエスカレーションする"]
S -->|ない| B["行動そのものを問題として切り分ける"]
B --> C["事実に基づき具体的にフィードバックする"]
C --> D{行動は改善したか}
D -->|はい| E["継続して見守る"]
D -->|いいえ| F["感情的にならず境界線を引く"]
F --> G{それでも改善しないか}
G -->|改善しない| H["第三者にエスカレーションする"]
G -->|改善した| E

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A hub;
class S,B,C,D,F,G box;
class X,E,H done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/ch01.html",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/ch04.html",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/ch05.html",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/preface04.html",
  "https://www.oreilly.com/library/view/debugging-teams/9781491932049/app01.html",
  "https://book.debuggingteams.com/",
  "https://therealfitz.medium.com/shit-sandwich-6748283f07ae",
  "https://www.oreilly.com/content/debugging-teams-creating-relationships-to-get-things-done/",
  "https://odino.org/book-review-debugging-teams-better-productivity-through-collaboration/",
  "https://planspace.org/20151118-debugging_teams/",
  "https://mark.gg/2018/06/02/manager-reads-debugging-teams/",
  "https://hazardous.org/archive/blog/reading/2022/01/03/Debugging-Teams",
  "https://modeling-languages.com/debugging-teams-geek-book/",
  "https://blog.audio-tk.com/2016/07/12/book-review-team-geek/",
  "https://archive.org/details/debuggingteams0000fitz",
  "https://www.goodreads.com/book/show/26544401-debugging-teams",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "book-overview",
  "why-debug-relationships",
  "hrt-principles",
  "journey-overview",
  "step-by-step-practices",
  "hrt-checklist",
  "summary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 01",
  "SECTION 02",
  "SECTION 03",
  "SECTION 04",
  "SECTION 05",
  "SECTION 06",
  "SECTION 07",
  "SECTION 08",
  "SECTION 09",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  practice: 9,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  practice: {
    "実践ポイント": 9,
  },
  note: {
    "補足": 1,
  },
} as const;

const EXPECTED_STEP_TAGS: readonly string[] = [] as const;

defineSourceParityContract({
  suiteName: "pages/debugging-teams-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_URLS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["Debugging Teams", "完全ガイド"],
  seoTitle: "Debugging Teams 完全ガイド | チームの人間関係をデバッグするベストプラクティス",
  seoDescription: "O'Reilly刊『Debugging Teams』の内容と国際的なエンジニアの書評をもとに、HRT(謙虚さ・敬意・信頼)を軸としたチームづくりのベストプラクティスを初学者向けに9ステップで解説する。",
});
