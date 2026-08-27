// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/agile-leadership-in-action.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "実践におけるリーダーシップ(Agile Leadership in Action)",
] as const;

const EXPECTED_H2 = [
  "この章の位置づけ",
  "ドメイン2の全体構造",
  "アジャイルリーダーシップ・フレームワークの理解と活用",
  "個人の効果性(Personal Effectiveness)を高める",
  "チームメンバーの能力を育てるコーチングスキル",
  "フィードバックと心理的安全性",
  "まとめ:ドメイン2のリーダーシップ成長ループ",
  "自己診断チェックリスト",
  "主要フレームワーク早見表",
  "参考文献・出典(Sources)",
] as const;

const EXPECTED_H3 = [
  "2.1 状況対応リーダーシップ SLII®(Situational Leadership® II)",
  "2.2 リーダーシップ・アジリティ モデル(Leadership Agility)",
  "2.3 サーバントリーダーシップ(Servant Leadership)",
  "フレームワークの使い分け早見表",
  "3.1 成長マインドセット(Growth Mindset)",
  "3.2 自己認識とEQ(Emotional Intelligence)",
  "3.3 リフレクション(内省)の習慣化",
  "4.1 コーチング・メンタリング・ティーチング・コンサルティングの違い",
  "4.2 GROWモデルによるコーチング会話",
  "4.3 パワフルクエスチョンとアクティブリスニング",
  "4.4 権限移譲(Delegation)と自己組織化",
  "5.1 SBI(-I)フィードバックモデル",
  "5.2 Radical Candor(徹底した率直さ)",
  "5.3 心理的安全性(Psychological Safety)",
  "CAL1公式情報",
  "リーダーシップフレームワーク",
  "個人の効果性",
  "コーチングと権限移譲",
  "フィードバックと心理的安全性",
  "関連する基礎資料",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TD
    D1["1. The Case for Agile Leadership アジャイルリーダーシップの必要性 学習済み"] --> D2
    D2["2. Agile Leadership in Action 実践におけるリーダーシップ 本章"]:::hub --> D3
    D3["3. Leading Agile Teams アジャイルチームを率いる"] --> D4
    D4["4. Leading Agile Organizations アジャイル組織を率いる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class D1,D3,D4 box;`,
  `flowchart TD
    subgraph Domain2["ドメイン2 Agile Leadership in Action"]
        direction TB
        F["① リーダーシップフレームワーク SLII / Leadership Agility / Servant Leadership"]
        P["② 個人の効果性 Growth Mindset / EQ / Reflection"]
        C["③ チームの能力を育てるコーチング GROW / 権限移譲"]
        FB["④ フィードバックと心理的安全性 SBI / Radical Candor / Psychological Safety"]
        F --> P --> C --> FB
    end

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class F,P,C,FB box;`,
  `flowchart TD
    A["特定のタスク・目標についてメンバーの発展レベルを診断する"] --> B{発展レベルは}
    B -->|D1 意欲はあるが未熟練 Enthusiastic Beginner| C["S1 Directing 指示型 具体的に教え、進捗を細かく確認する"]
    B -->|D2 一時的に自信を失っている Disillusioned Learner| D["S2 Coaching コーチ型 方向性は示しつつ、対話と励ましを増やす"]
    B -->|D3 能力はあるが自信が波打つ Capable but Cautious Contributor| E["S3 Supporting 支援型 問いかけと傾聴で本人の判断を後押しする"]
    B -->|D4 自立して成果を出せる Self-Reliant Achiever| F["S4 Delegating 委任型 権限を渡し、必要な時だけ関わる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,C,D,E,F box;
    class B hub;`,
  `flowchart LR
    G["G Goal 目標を明確にする"] --> R["R Reality 現状を具体的に把握する"]
    R --> O["O Options 選択肢を洗い出す"]
    O --> W["W Will Way Forward 意志を確認し行動計画に落とす"]
    W -.->|"次の対話・振り返りへ"| G

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class R,O,W box;
    class G hub;`,
  `quadrantChart
    title Radical Candorの4象限
    x-axis 率直さが低い --> 率直さが高い Challenge Directly
    y-axis 関心が低い --> 関心が高い Care Personally
    quadrant-1 "RC: 理想の対話"
    quadrant-2 "RE: 優しすぎる"
    quadrant-3 "MI: 不誠実な迎合"
    quadrant-4 "OA: 攻撃的な率直さ"`,
  `flowchart LR
    A["① フレームワークで状況を診断する SLII / Leadership Agility / Servant Leadership"] --> B["② 自分自身を整える Growth Mindset / EQ / Reflection"]
    B --> C["③ コーチングで相手の成長を支援する GROWモデル / 権限移譲"]
    C --> D["④ フィードバックで学びを定着させる SBI / Radical Candor / 心理的安全性"]
    D -.->|"次のサイクルへ"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B,C box;
    class D done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader/cal-1",
  "https://www.pm-partners.com.au/course/certified-agile-leader/",
  "https://drive.google.com/file/d/1LpDNidfA_r6J2wFvgRhIWfPw_wEnqjiO/view",
  "https://www.infoq.com/jp/news/2016/10/certified-agile-leadership",
  "https://www.infoq.com/news/2016/08/certified-agile-leadership",
  "https://www.blanchard.com/our-content/programs/slii",
  "https://www.blanchard.com/blog/a-situational-approach-to-effective-leadership",
  "https://www.wiley.com/en-us/Leadership+Agility:+Five+Levels+of+Mastery+for+Anticipating+and+Initiating+Change-p-9780787979133",
  "https://www.agileleadershipjourney.com/leadership-journey/leadership-agility",
  "https://www.agility11.com/blog/2018/12/28/leadership-agility-in-a-nutshell",
  "https://greenleaf.org/what-is-servant-leadership/",
  "https://en.wikipedia.org/wiki/Robert_K._Greenleaf",
  "https://ctl.stanford.edu/students/growth-mindset",
  "https://www.edweek.org/leadership/opinion-carol-dweck-revisits-the-growth-mindset/2015/09",
  "https://coachingfederation.org/credentialing/coaching-competencies/icf-core-competencies/",
  "https://coachingfederation.org/resource/icf-core-competencies/",
  "https://www.performanceconsultants.com/resources/the-grow-model/",
  "https://www.performanceconsultants.com/about-us/sir-john-whitmore/",
  "https://management30.com/practice/delegation-poker/",
  "https://medium.com/@jurgenappelo/the-7-levels-of-delegation-672ec2a48103",
  "https://www.ccl.org/articles/leading-effectively-articles/sbi-feedback-model-a-quick-win-to-improve-talent-conversations-development/",
  "https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii/",
  "https://www.radicalcandor.com/our-approach",
  "https://amycedmondson.com/psychological-safety/",
  "https://agilemanifesto.org/",
] as const;

const EXPECTED_TOC_IDS = [
  "this-chapter-position",
  "domain2-overview",
  "leadership-frameworks",
  "personal-effectiveness",
  "coaching-skills",
  "feedback-safety",
  "growth-loop",
  "self-check",
  "framework-summary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 00",
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

describe("pages/agile-leadership-in-action.vue — 原本照合・契約テスト", () => {
  defineSourceParityContract({
    suiteName: "pages/agile-leadership-in-action.vue",
    page: Page,
    seoMeta,
    h1: EXPECTED_H1,
    h2: EXPECTED_H2,
    h3: EXPECTED_H3,
    h4: EXPECTED_H4,
    h5: EXPECTED_H5,
    h6: EXPECTED_H6,
    tocIds: EXPECTED_TOC_IDS,
    externalUrls: EXPECTED_EXTERNAL_URLS,
    mermaidSources: EXPECTED_MERMAID_SOURCES,
    sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
    calloutVariants: { note: 1, practice: 12 },
    calloutLabels: {
      note: { "重要な注記(正確性について)": 1 },
      practice: { "ベストプラクティス": 12 },
    },
    stepTags: [],
    seoTitleFragments: ["実践におけるリーダーシップ", "CAL1", "Agile Leadership in Action"],
    seoTitle: "CAL1® 第2章 完全ガイド | Agile Leadership in Action(実践におけるリーダーシップ)",
    seoDescription:
      "Scrum Alliance CAL1(Certified Agile Leader 1)のドメイン2「Agile Leadership in Action」を初学者向けに解説。SLII・Leadership Agility・Servant Leadershipなどのフレームワーク、GROWモデルによるコーチング、SBIフィードバック、心理的安全性をMermaid図解と表で整理し、出典URLを明記。",
  });
});
