// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/mythical-man-month-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集",
] as const;

const EXPECTED_H2 = [
  "この本について",
  "核心: ブルックスの法則",
  "なぜ人を増やしても早くならないのか",
  "章立てマップ(全19章 + エピローグ)",
  "ステップ・バイ・ステップ ベストプラクティス",
  "神話 vs 現実: 比較表",
  "著名な開発者たちはどう評価しているか",
  "現代(アジャイル / DevOps / AI時代)への示唆",
  "まとめ",
  "参考文献",
] as const;

const EXPECTED_H3 = [
  "ブルックスの法則が成立する主な理由",
  "3.1 コミュニケーション経路の急増",
  "3.2 ブルックスの法則が引き起こす悪循環",
  "3.3 例外: 分割可能なタスクには当てはまらない",
  "Step 1｜見積もりの罠を理解する(第2・8章)",
  "Step 2｜小さく強いチームを組む(第3章: 外科手術チーム)",
  "Step 3｜概念の統一性(コンセプチュアル・インテグリティ)を守る(第4章)",
  "Step 4｜第二システム症候群を警戒する(第5章)",
  "Step 5｜伝達の仕組みを設計する(第6・7章)",
  "Step 6｜小さく作り、フィードバックで育てる(第11章)",
  "Step 7｜進捗を定量的に可視化する(第14章: 破局のふ化)",
  "Step 8｜ドキュメントを軽視しない(第10・15章)",
  "Step 9｜銀の弾丸はないと理解する(第16・17章: No Silver Bullet)",
  "Step 10｜現代の開発体制へ応用する",
  "Joel Spolsky(Stack Overflow 共同創業者・元CEO、Fog Creek Software 創業者)",
  "apenwarr(Avery Pennarun、Tailscale 共同創業者・CEO、git-subtree や sshuttle などの開発者)",
  "Mark Seemann(ploeh blog、『Code That Fits in Your Head』などの著者)",
  "Adrian Colyer(the morning paper、元 Pivotal / SpringSource CTO)",
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["IBM System/360 ハードウェア開発"] --> B["OS/360 ソフトウェア開発プロジェクト"]
    B --> C["深刻なスケジュール遅延"]
    C --> D["人員を追加投入という判断"]
    D --> E["さらなる遅延という逆説的な結果"]
    E --> F["1975年 人月の神話 出版"]
    F --> G["1995年 20周年記念版 No Silver Bullet を含む4章を追加"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`,
  `flowchart TB
    A["スケジュール遅延が発覚"] --> B["管理者が人員を追加"]
    B --> C["新メンバーへの教育・引き継ぎが発生"]
    B --> D["伝達経路の増加"]
    C --> E["既存メンバーの生産性が一時的に低下"]
    D --> E
    E --> F["短期的には進捗がさらに悪化"]
    F --> G["プロジェクトは結果としてより遅れる"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`,
  `flowchart TB
    S1["Step1 見積もりの罠を理解する"] --> S2["Step2 小さく強いチームを組む"]
    S2 --> S3["Step3 概念の統一性を守る"]
    S3 --> S4["Step4 第二システム症候群を警戒する"]
    S4 --> S5["Step5 伝達の仕組みを設計する"]
    S5 --> S6["Step6 小さく作りフィードバックで育てる"]
    S6 --> S7["Step7 進捗を定量的に可視化する"]
    S7 --> S8["Step8 ドキュメントを軽視しない"]
    S8 --> S9["Step9 銀の弾丸はないと理解する"]
    S9 --> S10["Step10 現代の開発体制へ応用する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class S1 hub;
    class S2,S3,S4,S5,S6,S7,S8,S9 box;
    class S10 done;`,
  `flowchart LR
    Surgeon["主任プログラマ 設計・実装の中核を担う"] --> Copilot["副操縦士 主任のすべてを理解し補佐する"]
    Surgeon --> Admin["管理者 人事・予算・対外調整"]
    Surgeon --> Editor["編集者 ドキュメント整備"]
    Surgeon --> Clerk["記録係 技術記録の維持"]
    Surgeon --> Tool["ツール担当 開発環境の整備"]
    Surgeon --> Tester["テスト担当 試験ケースの設計"]
    Surgeon --> Lawyer["言語専門家 実装の細部を助言"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class Surgeon hub;
    class Copilot,Admin,Editor,Clerk,Tool,Tester,Lawyer box;`,
  `flowchart TB
    F1["第一システム 制約下で慎重に設計 機能は絞られる"] --> F2["第二システム 自信過剰からあらゆる機能を追加"]
    F2 --> F3["肥大化・複雑化 最も危険な設計"]
    F3 --> F4["第三システム以降 過去の反省を踏まえ成熟した設計に回帰"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class F1,F2 box;
    class F3 hub;
    class F4 done;`,
  `flowchart TB
    C["ソフトウェア開発の複雑さ"] --> E["本質的複雑さ Essential Complexity"]
    C --> A["偶有的複雑さ Accidental Complexity"]
    E --> E1["解くべき問題そのものに内在する複雑さ"]
    E --> E2["ツールや手法では取り除けない"]
    A --> A1["言語・ツール・プロセスなど人間が作り出した複雑さ"]
    A --> A2["エンジニアリングの工夫で削減・除去できる"]
    E1 ~~~ E2
    A1 ~~~ A2
    E ~~~ A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class C hub;
    class E,A,E1,E2,A1 box;
    class A2 done;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.oreilly.com/library/view/mythical-man-month-the/0201835959/",
  "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
  "https://www.melconway.com/Home/Committees_Paper.html",
  "https://en.wikipedia.org/wiki/Brooks's_law",
  "https://en.wikipedia.org/wiki/No_Silver_Bullet",
  "https://en.wikipedia.org/wiki/Second-system_effect",
  "https://en.wikipedia.org/wiki/Fred_Brooks",
  "https://amturing.acm.org/award_winners/brooks_1002187.cfm",
  "https://cacm.acm.org/news/in-memoriam-frederick-p-brooks-jr-1931-2022/",
  "https://www.joelonsoftware.com/2005/07/25/hitting-the-high-notes/",
  "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
  "https://apenwarr.ca/log/20201227",
  "https://blog.ploeh.dk/2019/07/01/yes-silver-bullet/",
  "https://blog.acolyer.org/2016/09/06/no-silver-bullet-essence-and-accident-in-software-engineering/",
  "https://www.embeddedrelated.com/showarticle/1484.php",
  "https://www.cs.unc.edu/techreports/86-020.pdf",
  "https://five.co/blog/5-lessons-on-software-development-the-mythical-man-month/",
] as const;

const EXPECTED_TOC_IDS = [
  "about-the-book",
  "brooks-law",
  "why-more-people-doesnt-help",
  "chapter-map",
  "step-by-step-best-practices",
  "myth-vs-reality",
  "developer-perspectives",
  "modern-implications",
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
] as const;

const EXPECTED_CALLOUT_VARIANTS = {
  note: 3,
} as const;

const EXPECTED_CALLOUT_LABELS = {
  note: { "補足": 3 },
} as const;

const EXPECTED_STEP_TAGS = [] as const;

const EXPECTED_SEO_TITLE_FRAGMENTS = [
  "人月の神話",
  "完全ガイド",
  "ステップ・バイ・ステップ",
] as const;

const EXPECTED_SEO_TITLE =
  "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集";

const EXPECTED_SEO_DESCRIPTION =
  "Frederick P. Brooks, Jr.著『人月の神話(The Mythical Man-Month)』を初学者向けに解説する実践ガイド。ブルックスの法則、外科手術チーム、第二システム症候群、銀の弾丸などの主要概念を10ステップのベストプラクティスとMermaid図解で紹介する。";

defineSourceParityContract({
  suiteName: "pages/mythical-man-month-guide.vue",
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

describe("pages/mythical-man-month-guide.vue — ページ固有契約", () => {
  it("開いていたサイドバーをリンクで閉じた場合だけ toggle にフォーカスを戻す", async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get("#sidebarToggle");
    const link = wrapper.get(".sidebar-nav a");

    const focusSpy = vi.spyOn(toggle.element as HTMLButtonElement, "focus");

    // 閉じた状態でのクリックではフォーカスを動かさない
    await link.trigger("click");
    expect(focusSpy).not.toHaveBeenCalled();

    // 開いた状態でのクリックでは toggle に戻す
    await toggle.trigger("click");
    expect(wrapper.get("#sidebar").classes()).toContain("open");

    await link.trigger("click");
    expect(wrapper.get("#sidebar").classes()).not.toContain("open");
    expect(focusSpy).toHaveBeenCalledOnce();
  });
});

describe("pages/mythical-man-month-guide.vue — アクセシビリティ契約 (A)", () => {
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

