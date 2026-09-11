/*
 * 公開ガイドの定義（単一の真実の源）。
 *
 * ホーム（app/pages/index.vue）・グローバルナビ（app/components/SiteHeader.vue）・
 * ハブページ（app/pages/{certifications,books,practices}/**）・サイト内検索
 * （app/utils/guide-search.ts）は、すべてこのファイルだけを参照する。
 *
 * 階層は 種別（GUIDE_KINDS）→ プログラム（GUIDE_PROGRAMS）
 * → シリーズ（GUIDE_SERIES）→ ガイド（GUIDES）の 4 段。
 *
 * なぜ 4 段なのか:
 *   グローバルナビは**プログラムまでしか列挙しない**（各プログラムがハブページを 1 枚持ち、
 *   ガイドの一覧はそのハブが担う）。これにより、ナビの項目数がガイド総数から独立する。
 *   3 段だった頃はナビが全ガイドを列挙しており、項目数がガイド数に比例して増えたため、
 *   59 本の時点でカラム数・カラム内件数の上限に同時に張り付いて破綻した。
 *   ガイドを何本足してもナビは変わらず、新しい認定団体・書籍テーマが現れたときだけ
 *   ナビに 1 行増える、というのがこの構造の要点である。
 *
 * 注意: アイコン名をこのファイルへ置いたため、@nuxt/icon の clientBundle.scan が
 * `.ts` も走査するよう nuxt.config.ts の globInclude を拡張してある（既定は .vue 等のみ）。
 * これを外すと静的生成時にアイコンが同梱されず、本番だけ空白になる。
 * アイコン名の実在性は tests/icon-names.test.ts が突き合わせる。
 */

/**
 * 種別定義。グローバルナビのトップレベルであり、**将来も増えない前提の 3 個**。
 * 並び順がそのままナビのトリガー順・ホームのセクション順になる。
 */
export const GUIDE_KINDS = [
  {
    id: "certifications",
    to: "/certifications",
    navLabel: "資格で学ぶ",
    cardLabel: "CERTIFICATIONS",
    icon: "tabler:certificate",
    summary: "公式の試験要項に基づく、認定資格の学習ガイド。",
  },
  {
    id: "books",
    to: "/books",
    navLabel: "書籍で学ぶ",
    cardLabel: "BOOKS",
    icon: "tabler:book",
    summary: "マネジメント・チームづくりの名著を要点から実践まで。",
  },
  {
    id: "practices",
    to: "/practices",
    navLabel: "テーマで学ぶ",
    cardLabel: "PRACTICES",
    icon: "tabler:compass",
    summary: "特定の資格・書籍に紐づかない、役割と実務のテーマ解説。",
  },
] as const;

export type GuideKind = (typeof GUIDE_KINDS)[number];
export type GuideKindId = GuideKind["id"];

/**
 * プログラム定義。**ハブページを 1 枚持つ単位**で、グローバルナビのパネルに並ぶ行そのもの。
 * 認定資格なら認定団体、書籍ならテーマが単位になる。
 *
 * `to` は必ず `<種別の to>/<プログラムの id>` にする。種別ディレクトリ配下へ置くことで、
 * 1 セグメントの既存ガイドルート（`/capm` など）と構造的に衝突しない
 * （1 セグメントの動的ルートは 404 を食い潰すため採らない）。この規則は契約テストで固定する。
 */
export const GUIDE_PROGRAMS = [
  {
    id: "pmi",
    kindId: "certifications",
    to: "/certifications/pmi",
    navLabel: "PMI 認定",
    cardLabel: "PMI",
    icon: "tabler:award",
    summary: "CAPM・PMP の全出題ドメイン",
  },
  {
    id: "scrum-alliance",
    kindId: "certifications",
    to: "/certifications/scrum-alliance",
    navLabel: "Scrum Alliance 認定",
    cardLabel: "SCRUM ALLIANCE",
    icon: "tabler:topology-star-3",
    summary: "CSM・CSPO・CSD・CAL の各体系",
  },
  {
    id: "scrum-org",
    kindId: "certifications",
    to: "/certifications/scrum-org",
    navLabel: "Scrum.org 認定",
    cardLabel: "SCRUM.ORG",
    icon: "tabler:refresh",
    summary: "PSM・PSPO・PSD の各体系",
  },
  {
    id: "management",
    kindId: "books",
    to: "/books/management",
    navLabel: "マネジメント",
    cardLabel: "MANAGEMENT",
    icon: "tabler:briefcase-2",
    summary: "マネジメントの原典と実務書",
  },
  {
    id: "leadership",
    kindId: "books",
    to: "/books/leadership",
    navLabel: "リーダーシップ",
    cardLabel: "LEADERSHIP",
    icon: "tabler:users-group",
    summary: "リードの実践と対話の技術",
  },
  {
    id: "team",
    kindId: "books",
    to: "/books/team",
    navLabel: "チーム・組織文化",
    cardLabel: "TEAM CULTURE",
    icon: "tabler:users",
    summary: "信頼・心理的安全性・組織文化",
  },
  {
    id: "org-design",
    kindId: "books",
    to: "/books/org-design",
    navLabel: "チーム設計",
    cardLabel: "TEAM DESIGN",
    icon: "tabler:sitemap",
    summary: "チーム構造とその変え方",
  },
  {
    id: "product",
    kindId: "books",
    to: "/books/product",
    navLabel: "プロダクト・アジャイル",
    cardLabel: "PRODUCT & AGILE",
    icon: "tabler:box",
    summary: "プロダクト開発とアジャイル実践",
  },
  {
    id: "career",
    kindId: "practices",
    to: "/practices/career",
    navLabel: "役割とキャリア",
    cardLabel: "ROLE & CAREER",
    icon: "tabler:route",
    summary: "リーダーの立ち上がりと役割間の協働",
  },
  {
    id: "ai",
    kindId: "practices",
    to: "/practices/ai",
    navLabel: "AI 活用",
    cardLabel: "AI IN PRACTICE",
    icon: "tabler:settings-automation",
    summary: "AI を前提にした実務の進め方",
  },
] as const satisfies readonly {
  readonly id: string;
  readonly kindId: GuideKindId;
  readonly to: string;
  readonly navLabel: string;
  readonly cardLabel: string;
  readonly icon: string;
  readonly summary: string;
}[];

export type GuideProgram = (typeof GUIDE_PROGRAMS)[number];
export type GuideProgramId = GuideProgram["id"];

/**
 * シリーズ定義（ハブページ内の小見出し）。
 * 並び順がそのままハブページのセクション順になる。
 *
 * シリーズ見出しは意図的に**テキストのみ**で、アイコンを持たない。
 * `.ts` へアイコン名を増やすほど nuxt.config.ts の clientBundle.scan 依存が広がり、
 * dev では再現しない「本番だけアイコンが空白」の事故域が広がるため。
 */
export const GUIDE_SERIES = [
  { id: "capm", programId: "pmi", navLabel: "CAPM", cardLabel: "CAPM" },
  { id: "pmp", programId: "pmi", navLabel: "PMP", cardLabel: "PMP" },
  { id: "sa-scrum-master", programId: "scrum-alliance", navLabel: "スクラムマスター", cardLabel: "SCRUM MASTER" },
  { id: "sa-product-owner", programId: "scrum-alliance", navLabel: "プロダクトオーナー", cardLabel: "PRODUCT OWNER" },
  { id: "sa-developer", programId: "scrum-alliance", navLabel: "ディベロッパー", cardLabel: "DEVELOPER" },
  { id: "sa-agile-leader", programId: "scrum-alliance", navLabel: "アジャイルリーダー", cardLabel: "AGILE LEADER" },
  { id: "sa-facilitation", programId: "scrum-alliance", navLabel: "ファシリテーション・スケーリング", cardLabel: "FACILITATION & SCALING" },
  { id: "so-scrum-master", programId: "scrum-org", navLabel: "スクラムマスター", cardLabel: "SCRUM MASTER" },
  { id: "so-developer", programId: "scrum-org", navLabel: "ディベロッパー", cardLabel: "DEVELOPER" },
  { id: "so-agile-leader", programId: "scrum-org", navLabel: "アジャイルリーダー", cardLabel: "AGILE LEADER" },
  { id: "book-management", programId: "management", navLabel: "マネジメントの原典", cardLabel: "MANAGEMENT CLASSICS" },
  { id: "book-leadership", programId: "leadership", navLabel: "リーダーシップの実践", cardLabel: "LEADERSHIP PRACTICE" },
  { id: "book-team", programId: "team", navLabel: "チームづくり", cardLabel: "TEAM BUILDING" },
  { id: "book-org-design", programId: "org-design", navLabel: "チーム構造の設計", cardLabel: "TEAM STRUCTURE" },
  { id: "book-product", programId: "product", navLabel: "プロダクト開発", cardLabel: "PRODUCT DEVELOPMENT" },
  { id: "practice-start", programId: "career", navLabel: "リーダーの立ち上がり", cardLabel: "FIRST LEADERSHIP" },
  { id: "practice-collaboration", programId: "career", navLabel: "役割間の協働", cardLabel: "COLLABORATION" },
  { id: "practice-ai", programId: "ai", navLabel: "AI 駆動の実務", cardLabel: "AI-DRIVEN PRACTICE" },
] as const satisfies readonly {
  readonly id: string;
  readonly programId: GuideProgramId;
  readonly navLabel: string;
  readonly cardLabel: string;
}[];

export type GuideSeries = (typeof GUIDE_SERIES)[number];
export type GuideSeriesId = GuideSeries["id"];

/** ホームのカードで使うアクセント色。app/pages/index.vue の `guide-card-<accent>` に対応する。 */
export type GuideAccent = "indigo" | "gold" | "forest" | "plum";

export type Guide = {
  /** ルート。app/pages/*.vue のファイル名から決まる */
  readonly to: string;
  readonly programId: GuideProgramId;
  /**
   * 所属シリーズ。**必須**。
   *
   * すべてのプログラムがシリーズを持つため、省略可にする理由が無い。
   * 必須にすることで「どのシリーズへ置くか」を新規追加時に必ず一度考えることになり、
   * 未分類のガイドがハブページにラベル無しで現れる余地も型の時点で消える。
   */
  readonly seriesId: GuideSeriesId;
  /** グローバルナビ・ハブページ・検索結果で使う短縮表記 */
  readonly navLabel: string;
  /** ホーム／ハブのカード見出し（原本のタイトルを一字一句そのまま） */
  readonly title: string;
  readonly description: string;
  readonly meta: string;
  readonly icon: string;
  readonly accent: GuideAccent;
};

/**
 * 公開中のガイド。
 *
 * 並び順の不変条件は「種別順（GUIDE_KINDS）→ プログラム順（GUIDE_PROGRAMS）
 * → シリーズ順（GUIDE_SERIES）→ 定義順」。
 * この順序を守ることで programGroups / seriesGroups を平坦化した結果が guides と一致し、
 * ホーム（定義順に描画）とハブ（シリーズ順に描画）で並び順が二重管理にならない。
 *
 * `satisfies` により programId / seriesId の打ち間違いは型検査で落ちる。
 * ただしプログラムとシリーズの**組み合わせ**の整合は型では表現しないため、
 * tests/utils/guide-catalog.test.ts の契約テストで固定する。
 */
export const GUIDES = [
  {
    to: "/capm",
    programId: "pmi",
    seriesId: "capm",
    navLabel: "CAPM 完全ガイド",
    title: "CAPM® 認定資格 完全ガイド",
    description: "PMI公式情報をもとに、受験資格・4つの出題領域・学習計画までを一つの流れで理解できます。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/certified-associate-in-project-management-domain1",
    programId: "pmi",
    seriesId: "capm",
    navLabel: "CAPM ドメイン1",
    title: "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
    description: "PMI公式CAPM Exam Content Outlineに基づく、ドメイン1(PM基礎と主要概念・配点36%)の初学者向け解説ガイド。",
    meta: "9セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/certified-associate-in-project-management-domain2",
    programId: "pmi",
    seriesId: "capm",
    navLabel: "CAPM ドメイン2",
    title: "CAPM® ドメイン2: 予測型・計画重視の手法",
    description: "組織構造、プロセス群、WBS、クリティカルパス法、EVM、品質・統合管理まで初学者向けに図解付きで解説する学習ガイド。",
    meta: "8セクション",
    icon: "tabler:timeline",
    accent: "gold",
  },
  {
    to: "/capm-domain3-agile-frameworks-guide",
    programId: "pmi",
    seriesId: "capm",
    navLabel: "CAPM ドメイン3",
    title: "CAPM® ドメイン3: アジャイルフレームワーク/方法論",
    description: "PMI公式CAPM Exam Content Outlineに基づく、ドメイン3(アジャイルフレームワーク/方法論・配点20%)の初学者向け解説ガイド。Scrum・XP・Kanban・SAFeを詳解。",
    meta: "10セクション",
    icon: "tabler:topology-star-3",
    accent: "gold",
  },
  {
    to: "/capm-domain4-business-analysis-frameworks",
    programId: "pmi",
    seriesId: "capm",
    navLabel: "CAPM ドメイン4",
    title: "CAPM® ドメイン4: ビジネス分析フレームワーク",
    description: "PMI CAPM®試験ドメイン4「ビジネス分析フレームワーク」(出題比率27%)を初学者向けに解説。BAの役割、要求収集、ロードマップ、要求検証まで図解とベストプラクティスで整理。",
    meta: "11セクション",
    icon: "tabler:briefcase-2",
    accent: "gold",
  },
  {
    to: "/pmp-certification-guide",
    programId: "pmi",
    seriesId: "pmp",
    navLabel: "PMP 完全攻略",
    title: "PMP® 認定試験 完全攻略ガイド",
    description: "PMI公式Exam Content Outline(2026年7月改定版)に基づき、受験資格・試験形式・3ドメイン26タスクの出題内容とベストプラクティスを体系的に学びます。",
    meta: "14セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/pmp-domain1-people-guide",
    programId: "pmi",
    seriesId: "pmp",
    navLabel: "PMP ドメイン1",
    title: "PMP® Domain I: People 完全攻略ガイド",
    description: "PMI公式Examination Content Outline(ECO)2026年7月改定版に基づき、PMP試験Domain I: Peopleの8Taskを初学者向けに解説する学習ガイドです。",
    meta: "15セクション",
    icon: "tabler:users",
    accent: "gold",
  },
  {
    to: "/pmp-domain2-process-guide",
    programId: "pmi",
    seriesId: "pmp",
    navLabel: "PMP ドメイン2",
    title: "PMP® Domain II: Process 完全解説ガイド",
    description: "PMI公式Examination Content Outline(ECO)2026年7月改訂版に基づき、PMP試験Domain II: Processの10Taskを初学者向けに解説する学習ガイドです。",
    meta: "8セクション",
    icon: "tabler:settings-automation",
    accent: "gold",
  },
  {
    to: "/pmp-domain3-business-environment-guide",
    programId: "pmi",
    seriesId: "pmp",
    navLabel: "PMP ドメイン3",
    title: "PMP® Domain III: Business Environment 徹底解説ガイド",
    description: "PMI公式ECO(2026年7月改定版)に基づき、PMP試験Domain III: Business Environment(26%)の8つのTaskを初学者向けに解説。Mermaid図解とベストプラクティス付きの学習ガイド。",
    meta: "7セクション",
    icon: "tabler:briefcase-2",
    accent: "gold",
  },
  {
    to: "/csm-certified-scrummaster-guide",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM 完全ガイド",
    title: "Certified ScrumMaster®(CSM®)完全ガイド",
    description: "Scrum Alliance公式のLearning ObjectivesとScrum Guideに基づき、CSM資格の出題範囲・ベストプラクティス・試験対策を初学者向けに解説する完全ガイドです。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/csm-scrum-team-3-accountabilities",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM 3つのアカウンタビリティ",
    title: "Scrum Team とは何か ― 3つのアカウンタビリティ徹底解説",
    description: "Certified ScrumMaster(CSM)学習ガイド。Scrum Guide 2020とCSM Learning Objectivesに基づき、Product Owner・Scrum Master・Developersの3つのアカウンタビリティを初学者向けに解説。",
    meta: "12セクション",
    icon: "tabler:users",
    accent: "gold",
  },
  {
    to: "/csm-scrum-theory-guide",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM Scrum理論",
    title: "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
    description: "Scrum Alliance Certified ScrumMaster(CSM)のScrum Foundations Learning Objectives「Scrum Theory」(LO1.1-1.7)を、Scrum Guide 2020とScrum Alliance公式資料に基づき初学者向けに解説する完全ガイド。",
    meta: "12セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/csm-scrum-artifacts-and-commitments",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM アーティファクト",
    title: "Scrum Artifacts と Commitments 完全ガイド",
    description: "Certified ScrumMaster(CSM)取得を目指す初学者向けに、Scrumの3つのアーティファクト(Product Backlog / Sprint Backlog / Increment)と3つのコミットメント(Product Goal / Sprint Goal / Definition of Done)をステップバイステップで解説する学習ガイド。",
    meta: "10セクション",
    icon: "tabler:box",
    accent: "gold",
  },
  {
    to: "/scrum-events-csm-guide",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM スクラムイベント",
    title: "Scrum Events 完全ガイド",
    description: "Scrum Alliance CSM認定試験対策として、Scrumの5つのイベント(Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective)を初学者向けにステップバイステップで解説する完全ガイド。",
    meta: "15セクション",
    icon: "tabler:calendar-event",
    accent: "gold",
  },
  {
    to: "/csm-scrum-master-core-competencies",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSM コアコンピテンシー",
    title: "Scrum Master Core Competencies 完全解説ガイド",
    description: "Scrum Alliance の Certified ScrumMaster(CSM)認定における Scrum Master Core Competencies(Facilitation・Teaching・Mentoring・Coaching)と、Scrum Team・Product Owner・組織へのサービスを、公式Learning Objectivesに基づき初学者向けに解説する非公式学習ガイド",
    meta: "8セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/a-csm-advanced-certified-scrummaster-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "A-CSM 完全ガイド",
    title: "Advanced Certified ScrumMaster (A-CSM) 学習ガイド",
    description: "Scrum Alliance公式のA-CSM Learning Objectivesに基づき、全42のラーニングオブジェクティブを初学者向けに解説する完全ガイド。ファシリテーション・コーチング・スケーリングのベストプラクティスと一次情報源リンク付き。",
    meta: "18セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/csp-sm-certified-scrum-professional-scrummaster-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-scrum-master",
    navLabel: "CSP-SM 完全ガイド",
    title: "CSP-SM® 認定資格 完全ガイド | Certified Scrum Professional ScrumMaster 学習ガイド",
    description: "Scrum Alliance Certified Scrum Professional ScrumMaster (CSP-SM) の公式 Learning Objectives に基づく初学者向け学習ガイド。ステップバイステップの解説、ベストプラクティス、出典URL付き。",
    meta: "16セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/cspo-certified-scrum-product-owner-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-product-owner",
    navLabel: "CSPO 完全ガイド",
    title: "Certified Scrum Product Owner®(CSPO®) 完全学習ガイド",
    description: "Scrum Alliance公式のCSPO Learning ObjectivesとScrum Foundations Learning Objectivesを完全網羅した、Certified Scrum Product Owner(CSPO)学習ガイド。5つの学習目標カテゴリ、ベストプラクティス、認定後のキャリアパスをMermaid図解付きで解説。",
    meta: "14セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/a-cspo-advanced-certified-scrum-product-owner-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-product-owner",
    navLabel: "A-CSPO 完全ガイド",
    title: "Advanced Certified Scrum Product Owner (A-CSPO®) 学習ガイド",
    description: "Scrum Alliance Advanced Certified Scrum Product Owner (A-CSPO) の公式ラーニングオブジェクティブに基づく、初学者向けステップバイステップ学習ガイド。",
    meta: "18セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/csp-po-certified-scrum-professional-product-owner-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-product-owner",
    navLabel: "CSP-PO 完全ガイド",
    title: "CSP-PO® 認定資格 完全ガイド | Certified Scrum Professional - Product Owner",
    description: "Scrum Alliance公式のCSP-PO Learning Objectives(2022年1月版)に基づく、5カテゴリー31項目の完全解説。初学者向けのステップバイステップの進め方とベストプラクティス、一次情報源URLを掲載。",
    meta: "18セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/csd-certified-scrum-developer-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-developer",
    navLabel: "CSD 完全ガイド",
    title: "Certified Scrum Developer®(CSD®) 完全学習ガイド",
    description: "Scrum Alliance認定 Certified Scrum Developer (CSD) の包括的な学習ガイド。Scrum Foundations、6つの学習目標カテゴリ、ブルームの分類法、XPプラクティス、キャリアパスまで網羅。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/a-csd-advanced-certified-scrum-developer-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-developer",
    navLabel: "A-CSD 完全ガイド",
    title: "Advanced Certified Scrum Developer® (A-CSD®) 完全ガイド",
    description: "Scrum Alliance® の Advanced Certified Scrum Developer (A-CSD) Learning Objectives (2021年8月版) に基づき、7カテゴリ・全LOをステップバイステップで解説する学習ガイド。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/csp-d-certified-scrum-professional-developer-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-developer",
    navLabel: "CSP-D 完全ガイド",
    title: "CSP-D® 認定資格 完全ガイド | Certified Scrum Professional - Developer",
    description: "Scrum Alliance® Certified Scrum Professional - Developer (CSP-D) の公式学習目標を、初学者向けに全24項目ステップバイステップで解説する完全ガイドです。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/cal1-certified-agile-leader-1-guide",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL1 完全ガイド",
    title: "Certified Agile Leader® 1 (CAL 1™) 完全ガイド",
    description: "Scrum Alliance Certified Agile Leader 1 (CAL 1) の公式情報にもとづく、初学者向けの学習ガイド。4つの学習目標領域、認定取得の流れ、資格更新(SEU)の仕組みをMermaid図解と出典付きで解説。",
    meta: "13セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/the-case-for-agile-leadership",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL1 第1章",
    title: "アジャイルリーダーシップの必要性を理解する",
    description: "Certified Agile Leader® 1(CAL1)の学習領域1「The Case for Agile Leadership」を初学者向けにステップバイステップで解説する非公式ガイド。VUCA環境の背景、リーダーシップ・アジリティモデル、アジャイルリーダーの4つの行動とベストプラクティスを解説します。",
    meta: "10セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/agile-leadership-in-action",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL1 第2章",
    title: "実践におけるリーダーシップ(Agile Leadership in Action)",
    description: "Scrum Alliance CAL1(Certified Agile Leader 1)のドメイン2「Agile Leadership in Action」を初学者向けに解説。SLII・Leadership Agility・Servant Leadershipなどのフレームワーク、GROWモデルによるコーチング、SBIフィードバック、心理的安全性をMermaid図解と表で整理し、出典URLを明記。",
    meta: "10セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/cal1-chapter3-leading-agile-teams",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL1 第3章",
    title: "第3章:アジャイルチームのリード(Leading Agile Teams)",
    description: "Scrum Alliance Certified Agile Leader 1(CAL 1)の学習目標領域「3. Leading Agile Teams」を、サーバントリーダーシップ・タックマンモデル・心理的安全性・Lencioniの5つの機能不全・Delegation Pokerなど9つのフレームワークで初学者向けに解説する学習ガイド。",
    meta: "12セクション",
    icon: "tabler:users-group",
    accent: "gold",
  },
  {
    to: "/cal1-chapter4-leading-agile-organizations",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL1 第4章",
    title: "第4章: Leading Agile Organizations(アジャイル組織のリード)",
    description: "Scrum Alliance Certified Agile Leader® 1(CAL 1™)の学習領域「Leading Agile Organizations」を初学者向けに解説する非公式ガイド。組織アジリティ、Cynefin、組織文化、Team Topologies、チェンジマネジメント、スケーリングを網羅。",
    meta: "12セクション",
    icon: "tabler:building-bank",
    accent: "gold",
  },
  {
    to: "/cal2-part1-organizational-strategy-and-delivery",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL2 Part 1",
    title: "Certified Agile Leader® 2 (CAL 2™) スタディガイド",
    description: "Certified Agile Leader 2 (CAL 2) Part 1「Organizational Strategy and Delivery」を初学者向けに解説する非公式スタディガイド。Golden Circle、Galbraith Star Model、Team Topologies、Immunity to Change、Kotter/ADKAR/Bridgesなどのフレームワークを図解付きで紹介します。",
    meta: "7セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/cal2-part2-developing-as-a-leader",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL2 Part 2",
    title: "CAL2 Part 2: リーダーとしての成長(Developing as a Leader)完全ガイド",
    description: "Certified Agile Leader 2 (CAL2) Part 2「Developing as a Leader」を初学者向けに解説。Growth Mindset、Situational Leadership II、Crucial Conversations、Radical Candor、Leadership Pipeline、RAPIDなど6つのフレームワークをステップバイステップで学ぶ学習ガイド。",
    meta: "10セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/cal2-certified-agile-leader-2-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-agile-leader",
    navLabel: "CAL2 完全ガイド",
    title: "Certified Agile Leader® 2 (CAL 2™) 学習ガイド",
    description: "Scrum Alliance Certified Agile Leader 2 (CAL 2) の学習目標に基づき、組織戦略・チェンジマネジメント・リーダーシップ成長の主要フレームワークをステップバイステップで解説する非公式学習ガイドです。",
    meta: "14セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/caf-certified-agile-facilitator-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-facilitation",
    navLabel: "CAF 完全ガイド",
    title: "Certified Agile Facilitator(CAF)学習ガイド",
    description: "Scrum Alliance Certified Agile Facilitator(CAF)を初学者向けに解説する非公式学習ガイド。5つの学習目標、中立性の原則、Tuckmanモデル、心理的安全性、Diamond of Participationなどを図解とベストプラクティスつきで詳しく解説します。",
    meta: "17セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/casp-certified-agile-scaling-practitioner-study-guide",
    programId: "scrum-alliance",
    seriesId: "sa-facilitation",
    navLabel: "CASP 完全ガイド",
    title: "Certified Agile Scaling Practitioner (CASP) 完全ガイド",
    description: "Scrum Allianceの Certified Agile Scaling Practitioner(CASP)を初学者向けに解説。定義・失敗要因・原則主導のスケーリング思想・SAFe/LeSS/Spotifyパターン比較・Team Topologiesまで、ステップ解説とMermaid図解、公式ソースURL付きで網羅。",
    meta: "13セクション",
    icon: "tabler:topology-star-3",
    accent: "gold",
  },
  {
    to: "/psm-ai-essentials-guide",
    programId: "scrum-org",
    seriesId: "so-scrum-master",
    navLabel: "PSM-AI 完全ガイド",
    title: "Professional Scrum Master™ - AI Essentials 完全ガイド",
    description: "Scrum.org公式 Professional Scrum Master™ - AI Essentials Certificationの初学者向け学習ガイド。AI基礎知識、4D AI Fluency Framework、Definition of Doneへの影響、責任あるAI利用までをMermaid図解と出典付きで解説します。",
    meta: "10セクション",
    icon: "tabler:robot",
    accent: "gold",
  },
  {
    to: "/professional-scrum-developer",
    programId: "scrum-org",
    seriesId: "so-developer",
    navLabel: "PSD 完全ガイド",
    title: "Professional Scrum Developer(PSD I)認定資格 学習ガイド",
    description: "Scrum.orgのProfessional Scrum Developer(PSD I)認定資格について、4つのProfessional Scrum Competencies(出題範囲)を初学者向けにステップバイステップで解説する非公式の学習ガイドです。",
    meta: "11セクション",
    icon: "tabler:code",
    accent: "indigo",
  },
  {
    to: "/pal-i-study-guide",
    programId: "scrum-org",
    seriesId: "so-agile-leader",
    navLabel: "PAL I 完全ガイド",
    title: "PAL I(Professional Agile Leadership I)認定試験 学習ガイド",
    description: "Scrum.org 公式 Professional Agile Leadership I(PAL I)認定試験の学習ガイド。サーバントリーダーシップ、自己管理型チームの育成、組織的障害の除去、Evidence-Based Management を初学者向けに解説します。",
    meta: "6セクション",
    icon: "tabler:users-group",
    accent: "indigo",
  },
  {
    to: "/high-output-management-guide",
    programId: "management",
    seriesId: "book-management",
    navLabel: "High Output Management",
    title: "HIGH OUTPUT MANAGEMENT 完全ガイド",
    description: "アンディ・グローブ著『HIGH OUTPUT MANAGEMENT』を初学者向けに解説。朝食工場モデル、レバレッジ、OKR、タスク別成熟度(TRM)など主要概念をMermaid図と表でステップバイステップに整理し、参照ソースURLも掲載。",
    meta: "16セクション",
    icon: "tabler:building-factory-2",
    accent: "indigo",
  },
  {
    to: "/an-elegant-puzzle-guide",
    programId: "management",
    seriesId: "book-management",
    navLabel: "An Elegant Puzzle",
    title: "An Elegant Puzzle: Systems of Engineering Management 徹底解説ガイド",
    description: "Will Larson著『An Elegant Puzzle: Systems of Engineering Management』を初学者向けに解説。チームサイジング、4つの状態、ビジョンと戦略、マイグレーション、リオルグなど主要フレームワークをMermaid図とともに紹介。",
    meta: "11セクション",
    icon: "tabler:puzzle",
    accent: "indigo",
  },
  {
    to: "/managing-humans-best-practices-guide",
    programId: "management",
    seriesId: "book-management",
    navLabel: "Managing Humans",
    title: "『Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager』完全ガイド",
    description: "Michael Lopp著『Managing Humans』(第4版)を初心者向けに解説する実践ガイド。1on1、会議運営、意思決定、危機対応をMermaid図解とともに紹介します。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/mythical-man-month-guide",
    programId: "management",
    seriesId: "book-management",
    navLabel: "人月の神話",
    title: "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集",
    description: "Frederick P. Brooks, Jr.著『人月の神話(The Mythical Man-Month)』を初学者向けに解説する実践ガイド。ブルックスの法則、外科手術チーム、第二システム症候群、銀の弾丸などの主要概念を10ステップのベストプラクティスとMermaid図解で紹介する。",
    meta: "10セクション",
    icon: "tabler:book",
    accent: "indigo",
  },
  {
    to: "/engineering-manager-guide",
    programId: "management",
    seriesId: "book-management",
    navLabel: "EM 入門",
    title: "エンジニアリングマネージャー入門完全ガイド",
    description: "James Stanier著『Become an Effective Software Engineering Manager』を主軸に、新任EMのスタートダッシュから心理的安全性、AI時代の役割まで体系的に学びます。",
    meta: "14セクション",
    icon: "tabler:school",
    accent: "indigo",
  },
  {
    to: "/engineering-executive-playbook",
    programId: "leadership",
    seriesId: "book-leadership",
    navLabel: "統括責任者の手引き",
    title: "エンジニアリング統括責任者の手引き",
    description: "Will Larson著『The Engineering Executive's Primer』を骨格に、組織設計・実行システム・DORAメトリクス・障害対応まで体系的に学びます。",
    meta: "13セクション",
    icon: "tabler:briefcase",
    accent: "gold",
  },
  {
    to: "/elastic-leadership-guide",
    programId: "leadership",
    seriesId: "book-leadership",
    navLabel: "Elastic Leadership",
    title: "Elastic Leadership 実践ガイド",
    description: "Roy Osherove著『Elastic Leadership』をもとに、サバイバル・ラーニング・セルフオーガナイジングの3フェーズモデルと実践テクニックを初学者向けにステップバイステップで解説するガイド。",
    meta: "13セクション",
    icon: "tabler:compass",
    accent: "indigo",
  },
  {
    to: "/leadership-challenge-workbook-guide",
    programId: "leadership",
    seriesId: "book-leadership",
    navLabel: "Leadership Challenge",
    title: "The Leadership Challenge Workbook 完全ガイド",
    description: "Kouzes & Posnerの「The Leadership Challenge Workbook」を、ソフトウェアエンジニアとスクラムマスター向けにステップバイステップで解説する非公式ガイド。Five PracticesとTen Commitmentsをスクラムの現場に落とし込みます。",
    meta: "12セクション",
    icon: "tabler:award",
    accent: "plum",
  },
  {
    to: "/radical-candor-guide",
    programId: "leadership",
    seriesId: "book-leadership",
    navLabel: "Radical Candor",
    title: "Radical Candor 完全ガイド ― 初学者のための実践フレームワーク",
    description: "Kim Scott著『Radical Candor』の核となるフレームワークを、HIP・CORE・GSDホイールなどの実践ツールとともに初学者向けに解説するガイド。",
    meta: "16セクション",
    icon: "tabler:message-2",
    accent: "gold",
  },
  {
    to: "/team-geek-guide",
    programId: "team",
    seriesId: "book-team",
    navLabel: "Team Geek",
    title: "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
    description: "「Team Geek」をもとに、HRT(謙虚さ・尊敬・信頼)を軸としたチーム開発のベストプラクティスを初学者向けにステップバイステップで解説します。",
    meta: "12セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/debugging-teams-guide",
    programId: "team",
    seriesId: "book-team",
    navLabel: "Debugging Teams",
    title: "Debugging Teams 完全ガイド ― チームの人間関係を「デバッグ」するベストプラクティス",
    description: "O'Reilly刊『Debugging Teams』の内容と国際的なエンジニアの書評をもとに、HRT(謙虚さ・敬意・信頼)を軸としたチームづくりのベストプラクティスを初学者向けに9ステップで解説する。",
    meta: "9セクション",
    icon: "tabler:bug",
    accent: "plum",
  },
  {
    to: "/peopleware-guide",
    programId: "team",
    seriesId: "book-team",
    navLabel: "Peopleware",
    title: "『Peopleware: Productive Projects and Teams』完全ガイド",
    description: "Tom DeMarcoとTim Listerの名著『Peopleware Productive Projects and Teams』を初学者向けにステップバイステップで解説。核心テーゼ、6部構成、チーミサイド、Coding War Gamesのデータ、著名開発者の言及までを図解と表で整理した実践ガイド。",
    meta: "14セクション",
    icon: "tabler:users-group",
    accent: "indigo",
  },
  {
    to: "/no-rules-rules-guide",
    programId: "team",
    seriesId: "book-team",
    navLabel: "No Rules Rules",
    title: "『NO RULES RULES』完全ガイド",
    description: "Reed HastingsとErin Meyer著『No Rules Rules』を初学者向けに要約。タレント・デンシティ、率直なフィードバック、コントロールの撤廃という3つの原則と、ソフトウェア開発チームへの応用ステップをMermaid図解と表で解説します。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "indigo",
  },
  {
    to: "/five-dysfunctions-of-a-team-guide",
    programId: "team",
    seriesId: "book-team",
    navLabel: "5つの機能不全",
    title: "『あなたのチームは、機能してますか？』完全ガイド",
    description: "Patrick Lencioni著『The Five Dysfunctions of a Team』を初学者向けに解説。5つの機能不全のピラミッド構造とステップバイステップの実践ガイド、エンジニアリングチームでの応用例を紹介します。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "indigo",
  },
  {
    to: "/team-topologies-guide",
    programId: "org-design",
    seriesId: "book-org-design",
    navLabel: "Team Topologies",
    title: "Team Topologies 実践ガイド",
    description: "Matthew Skelton氏とManuel Pais氏が提唱したTeam Topologiesを、コンウェイの法則から導入ロードマップまで初学者向けにステップバイステップで解説する。",
    meta: "15セクション",
    icon: "tabler:topology-star-3",
    accent: "indigo",
  },
  {
    to: "/dynamic-reteaming-guide",
    programId: "org-design",
    seriesId: "book-org-design",
    navLabel: "ダイナミック・リチーミング",
    title: "ダイナミック・リチーミング実践ガイド",
    description: "Heidi Helfand著『Dynamic Reteaming』に基づく、チームのエコサイクル、5つの基本パターン、実践ステップとアンチパターンを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "forest",
  },
  {
    to: "/lean-ux-beginner-guide",
    programId: "product",
    seriesId: "book-product",
    navLabel: "Lean UX 入門",
    title: "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
    description: "Jeff GothelfとJosh Seidenの著書『Lean UX, 3rd Edition』を主軸に、Lean UX Canvas・仮説の書き方・MVPと実験・デザインスタジオ・デュアルトラック・アジャイルまでを初学者向けに解説するガイド。",
    meta: "14セクション",
    icon: "tabler:bulb",
    accent: "forest",
  },
  {
    to: "/scrum-97-things-guide",
    programId: "product",
    seriesId: "book-product",
    navLabel: "スクラム 97の知恵",
    title: "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
    description: "O'Reilly「97 Things Every Scrum Practitioner Should Know」の10パート構成に学び、公式Scrum Guideと国際的な実践者の知見をもとにスクラムのベストプラクティスをステップバイステップで解説する初学者向けガイド。",
    meta: "13セクション",
    icon: "tabler:list-check",
    accent: "forest",
  },
  {
    to: "/engineering-management-career-path",
    programId: "career",
    seriesId: "practice-start",
    navLabel: "EM キャリアパス",
    title: "エンジニアのためのマネジメントキャリアパス",
    description: "テックリードからCTOまで。役割の違いと、マネージャーとしての最初の90日を体系的に学びます。",
    meta: "12セクション",
    icon: "tabler:route",
    accent: "forest",
  },
  {
    to: "/engineering-team-leadership-guide",
    programId: "career",
    seriesId: "practice-start",
    navLabel: "チームリード術",
    title: "エンジニアリングチームのリード術 完全ガイド",
    description: "効果的なチーム作りの科学的根拠から、1on1、委譲、コードレビュー文化まで、実践できるベストプラクティスを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/leadership-practices-guide",
    programId: "career",
    seriesId: "practice-start",
    navLabel: "リーダーの作法",
    title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
    description: "初めてテックリード・エンジニアリングマネージャーになった方向けに、国際的に著名なリーダーたちの実践知を基にしたリーダーシップのベストプラクティスをステップバイステップで解説する。",
    meta: "8セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/your-first-60-days-as-a-leader",
    programId: "career",
    seriesId: "practice-start",
    navLabel: "最初の60日間",
    title: "リーダーとしての最初の60日間",
    description: "新任エンジニアリングリーダーのための、就任前準備から60日目までの実践ステップバイステップガイド。STARSモデル、1on1、心理的安全性などを解説。",
    meta: "14セクション",
    icon: "tabler:calendar-time",
    accent: "forest",
  },
  {
    to: "/developer-architect-communication-guide",
    programId: "career",
    seriesId: "practice-collaboration",
    navLabel: "開発者・アーキテクト",
    title: "開発者とアーキテクトのためのコミュニケーションガイド",
    description: "Elastic Leadership、Architect Elevator、ADR、C4モデルなど、世界的に知られる開発者が実践するコミュニケーション手法を初学者向けに9つのステップで解説する実践ガイド。",
    meta: "12セクション",
    icon: "tabler:messages",
    accent: "forest",
  },
  {
    to: "/ai-driven-project-management-guide",
    programId: "ai",
    seriesId: "practice-ai",
    navLabel: "AI-PM 実践ガイド",
    title: "AI駆動プロジェクトマネジメント実践ガイド",
    description: "PMI AI標準・McKinsey調査・GitHub公式ブログなど一次情報に基づく、AI駆動プロジェクトマネジメント(AI-PM)の初学者向け実践ガイド。導入ロードマップからガバナンス設計、エージェント活用まで解説。",
    meta: "15セクション",
    icon: "tabler:robot",
    accent: "indigo",
  },
] as const satisfies readonly Guide[];

/** シリーズ単位のガイド束（ハブページの 1 セクション）。 */
export type GuideSeriesGroup = {
  readonly series: GuideSeries;
  readonly guides: readonly Guide[];
};

/** プログラム単位のガイド束（ハブページ 1 枚ぶん）。 */
export type GuideProgramGroup = {
  readonly program: GuideProgram;
  readonly guides: readonly Guide[];
  readonly seriesGroups: readonly GuideSeriesGroup[];
};

/** 種別単位のガイド束（ナビのパネル 1 枚・ホームのセクション 1 つぶん）。 */
export type GuideKindGroup = {
  readonly kind: GuideKind;
  readonly guides: readonly Guide[];
  readonly programGroups: readonly GuideProgramGroup[];
};

/**
 * 種別順・種別内はプログラム順・プログラム内はシリーズ順でグルーピングする。
 * ガイドが 1 件も無い種別・プログラム・シリーズは返さない（空のハブ・空の枠を出さないため）。
 * 定義側に残った「ガイド 0 件の ID」自体は契約テストが検知する。
 */
export function groupGuidesByKind(): GuideKindGroup[] {
  return GUIDE_KINDS
    .map((kind) => {
      const programGroups = GUIDE_PROGRAMS
        .filter((program) => program.kindId === kind.id)
        .map((program) => buildProgramGroup(program))
        .filter((group) => group.guides.length > 0);

      return {
        kind,
        // 平坦化した順序が programGroups と一致するよう、guides は常に束から導出する。
        guides: programGroups.flatMap((group) => group.guides),
        programGroups,
      };
    })
    .filter((group) => group.guides.length > 0);
}

/** 1 つのプログラムぶんのガイド束を組み立てる（ハブページが直接使う）。 */
function buildProgramGroup(program: GuideProgram): GuideProgramGroup {
  const seriesGroups: GuideSeriesGroup[] = GUIDE_SERIES
    .filter((series) => series.programId === program.id)
    .map((series) => ({
      series,
      guides: GUIDES.filter((guide) => guide.seriesId === series.id && guide.programId === program.id),
    }))
    .filter((group) => group.guides.length > 0);

  return {
    program,
    guides: seriesGroups.flatMap((group) => group.guides),
    seriesGroups,
  };
}

/*
 * ルートパラメータ（`/certifications/[program]`）から引くため、キーは string で受ける。
 * 未知の値は null を返さず例外にする（表示側で握りつぶすと、ラベルの無い枠が黙って出る）。
 */
const PROGRAM_BY_ID = new Map<string, GuideProgram>(
  GUIDE_PROGRAMS.map((program) => [program.id, program]),
);

/**
 * プログラム定義を ID から引く。
 * 型で存在が保証されているため、見つからない場合は握りつぶさず例外にする
 * （空文字を返すと、ラベルの無い項目としてナビ・ハブへ黙って現れる）。
 * @param id - プログラム ID
 */
export function findProgram(id: string): GuideProgram {
  const program = PROGRAM_BY_ID.get(id);
  if (program === undefined) {
    throw new Error(`未定義のガイドプログラム: ${id}`);
  }
  return program;
}

/**
 * 1 つのプログラムぶんのガイド束を ID から引く（ハブページ用）。
 * @param id - プログラム ID
 */
export function programGroup(id: string): GuideProgramGroup {
  return buildProgramGroup(findProgram(id));
}

/**
 * ある種別に属するプログラムを定義順で返す（ナビのパネル・種別インデックス用）。
 * @param kindId - 種別 ID
 */
export function programsOfKind(kindId: string): GuideProgram[] {
  return GUIDE_PROGRAMS.filter((program) => program.kindId === kindId);
}

/** ナビ・パンくずに表示する日本語プログラム表記を引く。 */
export function programNavLabel(id: GuideProgramId): string {
  return findProgram(id).navLabel;
}

/** カードに表示する英語プログラム表記を引く。 */
export function programCardLabel(id: GuideProgramId): string {
  return findProgram(id).cardLabel;
}

const KIND_BY_ID = new Map<string, GuideKind>(GUIDE_KINDS.map((kind) => [kind.id, kind]));

/**
 * 種別定義を ID から引く。存在しない ID は握りつぶさず例外にする。
 * @param id - 種別 ID
 */
export function findKind(id: string): GuideKind {
  const kind = KIND_BY_ID.get(id);
  if (kind === undefined) {
    throw new Error(`未定義のガイド種別: ${id}`);
  }
  return kind;
}

const SERIES_BY_ID = new Map<GuideSeriesId, GuideSeries>(
  GUIDE_SERIES.map((series) => [series.id, series]),
);

function findSeries(id: GuideSeriesId): GuideSeries {
  const series = SERIES_BY_ID.get(id);
  if (series === undefined) {
    throw new Error(`未定義のガイドシリーズ: ${id}`);
  }
  return series;
}

/** カードに表示する英語シリーズ表記を引く。 */
export function seriesCardLabel(id: GuideSeriesId): string {
  return findSeries(id).cardLabel;
}

/** ハブページの小見出しに表示する日本語シリーズ表記を引く。 */
export function seriesNavLabel(id: GuideSeriesId): string {
  return findSeries(id).navLabel;
}

/**
 * サイト内の全ルート（ホーム → 種別インデックス → ハブ → 全ガイド）。
 *
 * e2e の横スクロール禁止はこの列挙を巡回対象にする。ここから漏れたルートは実測されないため、
 * ページを増やしたら必ずこの導出に乗せること（ハブは定義から自動で乗る）。
 */
export function allSiteRoutes(): string[] {
  return [
    "/",
    ...GUIDE_KINDS.map((kind) => kind.to),
    ...GUIDE_PROGRAMS.map((program) => program.to),
    ...GUIDES.map((guide) => guide.to),
  ];
}
