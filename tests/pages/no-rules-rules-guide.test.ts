// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/no-rules-rules-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "『NO RULES RULES』完全ガイド",
] as const;

const EXPECTED_H2 = [
  "この本の背景と著者",
  "核となる考え方：Netflixサイクル",
  "ステップ1：タレント・デンシティ（人材密度）を高める",
  "ステップ2：率直さ（キャンダー）を高める",
  "ステップ3：コントロール（管理・統制）を減らす",
  "本の構成（チャプター早見表）",
  "ソフトウェア開発チームへの応用ガイド",
  "導入時の注意点・批判的視点",
  "世界の開発者・エンジニアの声",
  "まとめ：あなたのチームは何から始めるべきか",
  "参考文献・ソースURL",
] as const;

const EXPECTED_H3 = [
  "リード・ヘイスティングスとは",
  "エリン・メイヤーとは",
  "本書の位置づけ",
  "基本コンセプト",
  "具体的な実践方法",
  "キーパーテストの意思決定フロー",
  "なぜ率直さが必要か",
  "4Aフィードバックモデル",
  "サンシャイニングと反対意見の奨励",
  "基本方針：「コントロール」ではなく「コンテキスト」を与える",
  "具体的に撤廃される代表的な規則",
  "なぜこれが機能するのか",
  "前提条件が厳しい",
  "文化として「厳しすぎる」という声もある",
  "ソフトウェア開発の具体的な手法にはあまり触れていない",
  "全ての組織に当てはまるわけではない",
  "公式情報",
  "百科事典",
  "読者レビュー",
  "ビジネス書要約",
  "著名エンジニアリングリーダーによる書評",
  "開発者コミュニティ",
  "開発者ブログ",
  "報道機関",
  "書籍要約サービス",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart LR
A["1 タレントデンシティを高める"] --> B["2 率直さを高める"]
B --> C["3 コントロールを減らす"]
C -->|組織の成長とともに繰り返す| A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C box;`,
  `flowchart TD
Q{"このメンバーが転職すると言ったら 全力で引き止めるか"}
Q -->|はい| A["投資を続け 裁量や成長機会を広げる"]
Q -->|いいえ| B["敬意を持って送り出す準備をする"]
B --> C["空いたポジションに優秀な人材を採用する"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class Q hub;
class A,B,C box;`,
  `flowchart TD
    subgraph OLD["従来型組織 コントロール型"]
        M1[マネージャー] -->|承認が必要| E1[意思決定]
        E1 --> D1[実行が遅くなる]
    end
    subgraph NEW["Netflix型組織 コンテキスト型"]
        M2[リーダー] -->|背景 目的 制約を共有| E2["Informed Captain 現場の担当者"]
        E2 -->|自律的に意思決定| D2[高速に実行]
        D2 --> S{"うまくいったか"}
        S -->|成功| G[称賛し横展開]
        S -->|失敗| SUN["Sunshining 失敗を公開し学びに変える"]
    end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class M1,E1,D1,M2,E2,D2,SUN box;
class S hub;
class G done;`,
  `flowchart LR
S1["Step1 採用基準を上げる"] --> S2["Step2 フィードバック文化をつくる"]
S2 --> S3["Step3 権限移譲を進める"]
S3 --> S4["Step4 承認プロセスを削減する"]
S4 --> S5["Step5 透明性を高める"]
S5 --> S6["Step6 チーム構成を見直す"]
S6 -.->|継続的改善| S1

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S1,S2,S3,S4,S5,S6 box;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.norulesrules.com/",
  "https://erinmeyer.com/books/no-rules-rules/",
  "https://en.wikipedia.org/wiki/Erin_Meyer",
  "https://www.bookey.app/book/no-rules-rules",
  "https://about.netflix.com/en/news/no-rules-rules-explores-how-netflix-reinvented-work-culture",
  "https://www.goodreads.com/book/show/49099937-no-rules-rules",
  "https://admiredleadership.com/book-summaries/no-rules-rules/",
  "https://refactoring.fm/p/no-rules-rules",
  "https://dev.to/sirech/book-review-no-rules-rules-netflix-and-the-culture-of-reinvention-3d5g",
  "https://hceris.com/book-review-no-rules-rules-netflix/",
  "https://www.codyhiar.com/blog/book-review-no-rules-rules/",
  "https://ernest.oppet.it/2021/02/22/no-rules-rules/",
  "https://www.npr.org/tags/912917743/no-rules-rules/archive",
] as const;

const EXPECTED_TOC_IDS = [
  "book-background",
  "netflix-cycle",
  "talent-density",
  "candor",
  "reduce-controls",
  "chapter-overview",
  "engineering-application",
  "cautions",
  "developer-voices",
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
  "SECTION 10",
  "SECTION 11",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 2,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { "ソース": 2 },
  note: { "補足": 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "NO RULES RULES",
  "完全ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "『NO RULES RULES』完全ガイド | Netflixのカルチャーを初学者向けに解説";

const EXPECTED_SEO_DESCRIPTION =
  "Reed HastingsとErin Meyer著『No Rules Rules』を初学者向けに要約。タレント・デンシティ、率直なフィードバック、コントロールの撤廃という3つの原則と、ソフトウェア開発チームへの応用ステップをMermaid図解と表で解説します。";

defineSourceParityContract({
  suiteName: "pages/no-rules-rules-guide.vue",
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
  seoTitleFragments: EXPECTED_SEO_TITLE_FRAGMENTS,
  seoTitle: EXPECTED_SEO_TITLE,
  seoDescription: EXPECTED_SEO_DESCRIPTION,
});

const mountPage = createMountPage(Page);

describe("pages/no-rules-rules-guide.vue — アクセシビリティ契約 (A)", () => {
  it("A-1: 先頭のフォーカス可能要素が本文へのスキップリンクである", () => {
    const wrapper = mountPage();
    const skipLink = wrapper.find("a.skip-link");

    expect(skipLink.exists()).toBe(true);
    expect(skipLink.attributes("href")).toBe("#main-content");
    expect(skipLink.text()).toBe("本文へスキップ");
    expect(wrapper.element.firstElementChild).toBe(skipLink.element);
  });

  it("A-2: スキップリンクの着地点 main が tabindex=\"-1\" でフォーカスを受け取る", () => {
    const main = mountPage().find("main#main-content");

    expect(main.exists()).toBe(true);
    expect(main.attributes("tabindex")).toBe("-1");
  });
});
