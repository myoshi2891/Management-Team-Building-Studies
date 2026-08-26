// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/radical-candor-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Radical Candor 完全ガイド ― 初学者のための実践フレームワーク",
] as const;

const EXPECTED_H2 = [
  "Radical Candorとは何か",
  "誕生の背景 ― Google・Appleでの経験",
  "核となるフレームワーク: Care Personally × Challenge Directly",
  "4つの象限を理解する",
  "HIPフィードバックフレームワーク",
  "COREモデルで内容を構造化する",
  "実践フロー: HIP + COREでフィードバックを届ける",
  "Get Stuff Done(GSD)ホイール ― チームで成果を出す",
  "1on1ミーティングとキャリア対話への適用",
  "ソフトウェアエンジニアリングでの実践例",
  "初学者向けステップバイステップ導入ロードマップ",
  "よくある落とし穴とアンチパターン",
  "限界と批判的視点",
  "関連するエンジニアリングマネジメント書籍",
  "まとめ",
  "参考文献・出典",
] as const;

const EXPECTED_H3 = [
  "公式情報源・著者本人の発信",
  "エンジニアリングコミュニティの実践知と批判的視点",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    Start["相手にフィードバックを伝えようとしている"] --> Care{"相手をCare Personally できているか"}
    Care -->|"できている"| ChallengeYes{"Challenge Directly できているか"}
    Care -->|"できていない"| ChallengeNo{"Challenge Directly できているか"}
    ChallengeYes -->|"できている"| RC["Radical Candor 誠実な指摘"]
    ChallengeYes -->|"できていない"| RE["Ruinous Empathy 破滅的な共感"]
    ChallengeNo -->|"できている"| OA["Obnoxious Aggression 無神経な攻撃"]
    ChallengeNo -->|"できていない"| MI["Manipulative Insincerity 操作的な不誠実"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Start hub;
    class RC done;`,
  `flowchart TB
    A["フィードバックしたいことがある"] --> B["まず自分から率直な意見を求める"]
    B --> C["HIPで自己チェックする"]
    C --> D["Humble: 自分の見方が全てではないと自覚する"]
    D --> E["Helpful: 相手を助けたいという意図を明確にする"]
    E --> F["Immediate: できるだけ早いタイミングで伝える"]
    F --> G["In Person: 対面かビデオ通話で伝える"]
    G --> H["批判は個別に, 称賛はチームの前で伝える"]
    H --> I["COREの型で内容を構造化する"]
    I --> J["Context, Observation, Result, nExt stEpsの順に話す"]
    J --> K["相手の反応を見て伝わり方を確認する"]
    K --> L{"意図した通りに伝わったか"}
    L -->|"Yes"| M["感謝を伝え次のアクションをフォローする"]
    L -->|"No"| N["伝え方を調整して改めて対話する"]
    N --> I

    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class M done;`,
  `flowchart TB
    L["Listen 聞く"] --> C["Clarify 明確にする"]
    C --> D["Debate 議論する"]
    D --> DE["Decide 決める"]
    DE --> P["Persuade 説得する"]
    P --> EX["Execute 実行する"]
    EX --> LE["Learn 学ぶ"]
    LE --> L

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class L hub;`,
  `flowchart TB
    S1["Step 1: 自己診断 自分がどの象限に偏りやすいか把握する"] --> S2["Step 2: フィードバックを求める 自分から先に周囲に意見を聞く"]
    S2 --> S3["Step 3: 1on1でHIPを練習する 少人数から始める"]
    S3 --> S4["Step 4: チームに共通言語を導入する 4象限の名前を共有する"]
    S4 --> S5["Step 5: コードレビューや振り返りに適用する"]
    S5 --> S6["Step 6: 継続的に振り返り改善する"]
    S6 --> S2

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class S1 hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.radicalcandor.com/",
  "https://www.radicalcandor.com/our-approach",
  "https://www.radicalcandor.com/blog/what-is-radical-candor",
  "https://www.radicalcandor.com/blog/a-hip-approach-to-feedback",
  "https://www.radicalcandor.com/blog/give-feedback-playbook",
  "https://www.radicalcandor.com/blog/culture-of-listening",
  "https://www.radicalcandor.com/blog/decisions-to-get-shit-done",
  "https://www.radicalcandor.com/frequently-asked-questions",
  "https://www.radicalcandor.com/blog/radical-candor-cultural-differences",
  "https://www.radicalcandor.com/blog/radical-candor-software-engineers",
  "https://kimmalonescott.medium.com/what-is-radical-candor-learn-the-basic-principles-in-6-minutes-50391b3ad76a",
  "https://www.jordanharbinger.com/kim-scott-care-personally-challenge-directly-with-radical-candor/",
  "https://www.ianfeather.co.uk/radical-candor-in-code-review/",
  "https://rinaarts.com/once-more-with-feeling-a-radical-approach-to-code-review/",
  "https://medium.com/showpad-engineering/how-to-get-better-at-providing-candid-feedback-9af3282bcdd2",
  "https://leaddev.com/mentoring-coaching-feedback/radical-candor-distributed-engineering-teams",
  "https://blog.pragmaticengineer.com/become-and-effective-software-engineering-manager-my-book-review/",
  "https://gist.github.com/typesanitizer/76565f63e6ec7b0a21e98276cf075799",
  "https://en.wikipedia.org/wiki/Camille_Fournier",
  "https://modelthinkers.com/mental-model/radical-candor-framework",
  "https://www.teachingwhilewhite.org/blog/yx9zi31geawjmjxoqfxfs3ltf777ev",
  "https://citconf.com/wiki/index.php?title=Pros_and_cons_of_radical_candor",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-radical-candor",
  "origin-story",
  "core-framework",
  "four-quadrants",
  "hip-framework",
  "core-model",
  "practice-flow",
  "gsd-wheel",
  "one-on-one",
  "engineering-practice",
  "adoption-roadmap",
  "pitfalls",
  "limitations",
  "further-reading",
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
  "SECTION 12",
  "SECTION 13",
  "SECTION 14",
  "SECTION 15",
  "SECTION 16",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 1,
  practice: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 1 },
  practice: { "ベストプラクティス": 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "Radical Candor",
  "完全ガイド",
] as const;

const EXPECTED_SEO_TITLE =
  "Radical Candor 完全ガイド ― 初学者のための実践フレームワーク";

const EXPECTED_SEO_DESCRIPTION =
  "Kim Scott著『Radical Candor』の核となるフレームワークを、HIP・CORE・GSDホイールなどの実践ツールとともに初学者向けに解説するガイド。";

defineSourceParityContract({
  suiteName: "pages/radical-candor-guide.vue",
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

describe("pages/radical-candor-guide.vue — アクセシビリティ契約 (A)", () => {
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
