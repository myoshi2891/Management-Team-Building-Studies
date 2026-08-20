// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/scrum-97-things-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
] as const;

const EXPECTED_H2 = [
  "このガイドについて",
  "Part I. 始める・導入する・繰り返す (Start, Adopt, Repeat)",
  "Part II. プロダクトが価値を届ける (Products Deliver Value)",
  "Part III. コラボレーションこそが鍵 (Collaboration Is Key)",
  "Part IV. 開発は多面的な仕事 (Development Is Multi-faceted Work)",
  "Part V. イベントであってミーティングではない (Events, Not Meetings)",
  "Part VI. 熟達こそが重要 (Mastery Does Matter)",
  "Part VII. 人はどこまでも人間である (People, All Too Human)",
  "Part VIII. 価値基準が行動を導く (Values Drive Behavior)",
  "Part IX. 組織デザイン (Organizational Design)",
  "Part X. 台本のないスクラム (Scrum Off Script)",
  "まとめ: 実践チェックリスト",
  "参考文献・出典URL一覧",
] as const;

const EXPECTED_H3 = [
  "0.1 なぜ「97」なのか",
  "0.2 前提知識: Scrum Guideは今も2020年版が最新",
  "1.1 スクラムとは何か(3分で理解する)",
  "1.2 スクラムチームの3つの役割(アカウンタビリティ)",
  "1.3 スクラムを導入するステップバイステップ",
  "2.1 プロダクトバックログの基本原則",
  "2.2 プロダクトバックログリファインメント(Refinement)の進め方",
  "2.3 ユーザーストーリーの書き方",
  "2.4 プロダクトゴールという「北極星」",
  "3.1 プロダクトオーナーと開発者の協働",
  "3.2 ステークホルダーとの関わり方",
  "3.3 機能横断型チームであることの意味",
  "4.1 「Flaccid Scrum(軟弱なスクラム)」という警鐘",
  "4.2 技術的卓越性を支える実践",
  "4.3 完成の定義(Definition of Done)を段階的に強化する",
  "5.1 スプリント(Sprint)",
  "5.2 スプリントプランニング(Sprint Planning)",
  "5.3 デイリースクラム(Daily Scrum)",
  "5.4 スプリントレビュー(Sprint Review)",
  "5.5 スプリントレトロスペクティブ(Sprint Retrospective)",
  "6.1 ストーリーポイントによる見積り",
  "6.2 スクラムマスターの熟達: 奉仕するリーダーシップ",
  "6.3 継続的な学習の姿勢",
  "7.1 心理的安全性はなぜ重要か",
  "7.2 チームのダイナミクスとコンフリクト",
  "7.3 自己管理型チームを「本物」にする",
  "9.1 いつスケーリングを検討すべきか",
  "9.2 代表的なスケーリングフレームワークの比較",
  "9.3 組織構造がチームに与える影響",
  "10.1 代表的なアンチパターン一覧",
  "10.2 Zombie Scrumの4つの症状(詳細)",
  "10.3 2026年の視点: AIとスクラムマスターの役割",
  "書籍・書誌情報",
  "公式Scrum Guide",
  "技術的卓越性・Flaccid Scrum(Martin Fowler ほか)",
  "見積り・プランニング(Mike Cohn / Mountain Goat Software)",
  "レトロスペクティブ(Esther Derby / Diana Larsen / Norm Kerth)",
  "Zombie Scrum(Christiaan Verwijs / Johannes Schartau / Barry Overeem)",
  "組織デザイン・スケーリング",
  "2026年のAIとスクラム",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    S1["現状のチームと課題を把握する"] --> S2["スクラムチームを編成する"]
    S2 --> S3["プロダクトバックログを作成する"]
    S3 --> S4["最初のスプリントを計画する"]
    S4 --> S5["スプリントを実行し検査する"]
    S5 --> S6["レトロスペクティブで適応する"]
    S6 --> S4

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5 box;
    class S6 done;`,
  `flowchart TB
    PB["プロダクトバックログ"] --> SP["スプリントプランニング"]
    SP --> SB["スプリントバックログ"]
    SB --> DEV["開発作業"]
    DEV --> DS["デイリースクラム"]
    DS --> DEV
    DEV --> INC["インクリメント"]
    INC --> SR["スプリントレビュー"]
    SR --> RETRO["スプリントレトロスペクティブ"]
    RETRO --> PB

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class PB hub;
    class SP,SB,DEV,DS,SR box;
    class INC,RETRO done;`,
  `flowchart TB
    T1["Why  このスプリントはなぜ価値があるのか"] --> T2["What  何を成し遂げるか"]
    T2 --> T3["How  どうやって成し遂げるか"]
    T3 --> GOAL["スプリントゴールとスプリントバックログの完成"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class T1 hub;
    class T2,T3 box;
    class GOAL done;`,
  `flowchart TB
    A["ステージを設定する"] --> B["データを集める"]
    B --> C["洞察を引き出す"]
    C --> D["何をすべきか決める"]
    D --> E["レトロスペクティブを終える"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D box;
    class E done;`,
  `flowchart TB
    START["複数チームで1つのプロダクトを開発する"] --> Q0{"単一チームのスクラムは健全に機能しているか"}
    Q0 -->|"いいえ"| S0["まず単一チームのスクラムを磨く"]
    Q0 -->|"はい"| Q1{"チーム間の依存関係と統合コストは大きいか"}
    Q1 -->|"依存が少なく頻繁に統合できる"| S1["LeSS または Nexus"]
    Q1 -->|"依存が多く調整コストが大きい"| Q2{"1つのプロダクト・1つの組織として束ねられるか"}
    Q2 -->|"束ねられる"| S2["LeSS Huge"]
    Q2 -->|"複数プロダクト・複数部門にまたがる"| S3["SAFe ポートフォリオレベルを含む"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class START hub;
    class Q0,Q1,Q2 box;
    class S0,S1,S2,S3 done;`,
] as const;

const EXPECTED_EXTERNAL_LINKS = [
  "https://www.oreilly.com/library/view/97-things-every/9781492073833/",
  "https://scrumguides.org/scrum-guide.html",
  "https://guntherverheyen.com/2019/12/11/announcing-the-book-97-things-every-scrum-practitioner-should-know/",
  "https://scrumguides.org/revisions.html",
  "https://www.4pmti.com/learn/a-complete-guide-to-scrum-ceremonies/",
  "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
  "https://www.scrum.org/scrum-guide-2020",
  "https://www.mountaingoatsoftware.com/agile/user-stories/product-backlog-refinement",
  "https://www.mountaingoatsoftware.com/agile/podcast/152-the-five-pillars-of-real-agile-improvement-with-mike-cohn",
  "https://www.mountaingoatsoftware.com/agile/podcast/86-revisiting-user-stories-with-mike-cohn",
  "https://www.infoq.com/articles/changes-2020-Scrum-guide/",
  "https://medium.com/the-liberators/the-rise-of-zombie-scrum-cd98741015d5",
  "https://martinfowler.com/bliki/FlaccidScrum.html",
  "https://www.scrum.org/about/",
  "https://www.simplethread.com/scrum-anti-patterns/",
  "https://blog.cleancoder.com/uncle-bob/2018/08/28/CraftsmanshipMovement.html",
  "https://www.infoq.com/news/2014/11/sprint-planning",
  "https://www.mountaingoatsoftware.com/blog/dont-estimate-the-sprint-backlog-using-task-points",
  "https://www.oreilly.com/library/view/the-professional-scrummasters/9781849688024/ch05s02.html",
  "https://lucid.co/all-access-agile/sprint-retrospective-meetings",
  "https://pragprog.com/titles/dlret2/agile-retrospectives-second-edition/",
  "https://www.infoq.com/articles/retrospective-prime-directive",
  "https://www.whatisscrum.org/mastering-the-sprint-retrospective-for-continuous-team-improvement/",
  "https://www.retrium.com/blog/10-retrospective-techniques-to-try-with-your-agile-team",
  "https://www.mountaingoatsoftware.com/agile/what-are-story-points",
  "https://www.mountaingoatsoftware.com/blog/story-point-estimates-are-best-thought-of-as-ranges",
  "https://www.mountaingoatsoftware.com/about/mike-cohn",
  "https://www.scrum.org/resources/zombie-scrum-survival-guide-0",
  "https://rockmerepartners.com/resources/safe-vs-less-vs-nexus/",
  "https://www.toptal.com/project-managers/agile/agile-scaling-frameworks-compared",
  "https://monday.com/blog/rnd/large-scale-scrum/",
  "https://www.scrum.org/resources/blog/comparing-nexus-and-safe-similarities-differences-potential-synergies",
  "https://www.visual-paradigm.com/scrum/scaling-agile-frameworks-comparison/",
  "https://www.zombiescrum.org/",
  "https://ronjeffries.com/articles/020-01ff/down-on-scrum/",
  "https://teachingagile.com/scrum/articles/scrumbut-flaccid",
  "https://medium.com/the-liberators/the-four-symptoms-of-zombie-scrum-f107f2e86b3f",
  "https://www.scrum.org/resources/scrumorg-launches-new-ai-training-scrum-masters",
  "https://onlinescrummastersummit.com/",
  "https://www.teamretro.com/blog/ai-agile-project-management/",
  "https://agilemania.com/is-the-scrum-master-role-dying",
] as const;

const EXPECTED_TOC_IDS = [
  "about-this-guide",
  "start-adopt-repeat",
  "products-deliver-value",
  "collaboration-is-key",
  "development-multifaceted",
  "events-not-meetings",
  "mastery-does-matter",
  "people-all-too-human",
  "values-drive-behavior",
  "organizational-design",
  "scrum-off-script",
  "practice-checklist",
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
  "SECTION 10",
  "SECTION 11",
  "SECTION 12",
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  source: 38,
  note: 1,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  source: { "ソース": 38 },
  note: { "補足": 1 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

defineSourceParityContract({
  suiteName: "pages/scrum-97-things-guide.vue",
  page: Page,
  seoMeta,
  h1: EXPECTED_H1,
  h2: EXPECTED_H2,
  h3: EXPECTED_H3,
  h4: EXPECTED_H4,
  h5: EXPECTED_H5,
  h6: EXPECTED_H6,
  externalUrls: EXPECTED_EXTERNAL_LINKS,
  tocIds: EXPECTED_TOC_IDS,
  sectionEyebrows: EXPECTED_SECTION_EYEBROWS,
  mermaidSources: EXPECTED_MERMAID_SOURCES,
  calloutVariants: EXPECTED_CALLOUT_VARIANTS,
  calloutLabels: EXPECTED_CALLOUT_LABELS,
  stepTags: EXPECTED_STEP_TAGS,
  seoTitleFragments: ["スクラム", "97", "ガイド"],
});
