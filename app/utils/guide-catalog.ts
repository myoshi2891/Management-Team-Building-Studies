/*
 * 公開ガイドの定義（単一の真実の源）。
 *
 * ホーム（app/pages/index.vue のカード一覧）とグローバルナビ
 * （app/components/SiteHeader.vue のメガメニュー）は、どちらもこのファイルだけを参照する。
 * ガイドを追加するときは GUIDES に 1 件足せば両方へ反映される。
 *
 * 階層は カテゴリー（GUIDE_CATEGORIES）→ シリーズ（GUIDE_SERIES）→ ガイド（GUIDES）の 3 段。
 * シリーズはカテゴリー内の小見出しで、ドロップダウンが縦に伸び続けるのを防ぐために
 * メガメニューのカラムへ分割する単位になる。
 *
 * 注意: アイコン名をこのファイルへ置いたため、@nuxt/icon の clientBundle.scan が
 * `.ts` も走査するよう nuxt.config.ts の globInclude を拡張してある（既定は .vue 等のみ）。
 * これを外すと静的生成時にアイコンが同梱されず、本番だけ空白になる。
 */

/** カテゴリー定義。並び順がそのままグローバルナビの並び順・ホームのセクション順になる。 */
export const GUIDE_CATEGORIES = [
  {
    id: "project-management",
    navLabel: "プロジェクトマネジメント",
    cardLabel: "PROJECT MANAGEMENT",
    icon: "tabler:certificate",
  },
  {
    id: "engineering-management",
    navLabel: "エンジニアリングマネジメント",
    cardLabel: "ENGINEERING MANAGEMENT",
    icon: "tabler:route",
  },
  {
    id: "engineering-leadership",
    navLabel: "リーダーシップ",
    cardLabel: "ENGINEERING LEADERSHIP",
    icon: "tabler:users-group",
  },
  {
    id: "team-building",
    navLabel: "チームビルディング",
    cardLabel: "TEAM BUILDING",
    icon: "tabler:refresh",
  },
] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];
export type GuideCategoryId = GuideCategory["id"];

/**
 * シリーズ定義（カテゴリー内の小見出し）。
 * 並び順がそのままメガメニューのカラム順になる。
 *
 * シリーズ見出しは意図的に**テキストのみ**で、アイコンを持たない。
 * `.ts` へアイコン名を増やすほど nuxt.config.ts の clientBundle.scan 依存が広がり、
 * dev では再現しない「本番だけアイコンが空白」の事故域が広がるため。
 */
export const GUIDE_SERIES = [
  {
    id: "capm",
    categoryId: "project-management",
    navLabel: "CAPM",
    cardLabel: "CAPM",
  },
  {
    id: "pmp",
    categoryId: "project-management",
    navLabel: "PMP",
    cardLabel: "PMP",
  },
  {
    id: "scrum",
    categoryId: "project-management",
    navLabel: "Scrum / CSM",
    cardLabel: "SCRUM / CSM",
  },
  {
    id: "first-leadership",
    categoryId: "engineering-leadership",
    navLabel: "はじめてのリード",
    cardLabel: "FIRST LEADERSHIP",
  },
  {
    id: "exec-scale",
    categoryId: "engineering-leadership",
    navLabel: "組織・スケール",
    cardLabel: "ORG & SCALE",
  },
  {
    id: "team-culture",
    categoryId: "team-building",
    navLabel: "チーム文化",
    cardLabel: "TEAM CULTURE",
  },
  {
    id: "team-design",
    categoryId: "team-building",
    navLabel: "チーム設計・変革",
    cardLabel: "TEAM DESIGN",
  },
] as const satisfies readonly {
  readonly id: string;
  readonly categoryId: GuideCategoryId;
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
  readonly categoryId: GuideCategoryId;
  /**
   * 所属シリーズ。**省略可にせず、シリーズを持たないカテゴリーでは `undefined` を明示**させる。
   *
   * `as const satisfies` はリテラル型を保つため、省略記法にするとそのエントリには
   * プロパティ自体が存在せず `guide.seriesId` が型エラーになる。明示を必須にすることで
   * 型が揃い、かつ新規ガイド追加時に「シリーズをどこにするか」を必ず一度考えることになる。
   * シリーズを持つカテゴリーでの `undefined` は契約テストで落とす。
   */
  readonly seriesId: GuideSeriesId | undefined;
  /** グローバルナビのドロップダウンで使う短縮表記 */
  readonly navLabel: string;
  /** ホームのカード見出し（原本のタイトルを一字一句そのまま） */
  readonly title: string;
  readonly description: string;
  readonly meta: string;
  readonly icon: string;
  readonly accent: GuideAccent;
};

/**
 * 公開中のガイド。
 *
 * 並び順の不変条件は「カテゴリー順（GUIDE_CATEGORIES）→ シリーズ順（GUIDE_SERIES）→ 定義順」。
 * この順序を守ることで groupGuidesByCategory() の seriesGroups を平坦化した結果が
 * group.guides と一致し、ナビ（シリーズ順に描画）とホーム（定義順に描画）で
 * 並び順を二重管理せずに済む。
 *
 * `satisfies` により categoryId / seriesId の打ち間違いは型検査で落ちる。
 * ただしカテゴリーとシリーズの**組み合わせ**の整合は型では表現しないため、
 * tests/utils/guide-catalog.test.ts の契約テストで固定する。
 */
export const GUIDES = [
  {
    to: "/capm",
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
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
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CSM 完全ガイド",
    title: "Certified ScrumMaster®(CSM®)完全ガイド",
    description: "Scrum Alliance公式のLearning ObjectivesとScrum Guideに基づき、CSM資格の出題範囲・ベストプラクティス・試験対策を初学者向けに解説する完全ガイドです。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/csm-scrum-team-3-accountabilities",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CSM 3つのアカウンタビリティ",
    title: "Scrum Team とは何か ― 3つのアカウンタビリティ徹底解説",
    description: "Certified ScrumMaster(CSM)学習ガイド。Scrum Guide 2020とCSM Learning Objectivesに基づき、Product Owner・Scrum Master・Developersの3つのアカウンタビリティを初学者向けに解説。",
    meta: "12セクション",
    icon: "tabler:users",
    accent: "gold",
  },
  {
    to: "/csm-scrum-theory-guide",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CSM Scrum理論",
    title: "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
    description: "Scrum Alliance Certified ScrumMaster(CSM)のScrum Foundations Learning Objectives「Scrum Theory」(LO1.1-1.7)を、Scrum Guide 2020とScrum Alliance公式資料に基づき初学者向けに解説する完全ガイド。",
    meta: "12セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/scrum-events-csm-guide",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CSM スクラムイベント",
    title: "Scrum Events 完全ガイド",
    description: "Scrum Alliance CSM認定試験対策として、Scrumの5つのイベント(Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective)を初学者向けにステップバイステップで解説する完全ガイド。",
    meta: "15セクション",
    icon: "tabler:calendar-event",
    accent: "gold",
  },
  {
    to: "/scrum-97-things-guide",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "スクラム 97の知恵",
    title: "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
    description: "O'Reilly「97 Things Every Scrum Practitioner Should Know」の10パート構成に学び、公式Scrum Guideと国際的な実践者の知見をもとにスクラムのベストプラクティスをステップバイステップで解説する初学者向けガイド。",
    meta: "13セクション",
    icon: "tabler:list-check",
    accent: "forest",
  },
  {
    to: "/cal1-certified-agile-leader-1-guide",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CAL1 完全ガイド",
    title: "Certified Agile Leader® 1 (CAL 1™) 完全ガイド",
    description: "Scrum Alliance Certified Agile Leader 1 (CAL 1) の公式情報にもとづく、初学者向けの学習ガイド。4つの学習目標領域、認定取得の流れ、資格更新(SEU)の仕組みをMermaid図解と出典付きで解説。",
    meta: "13セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/the-case-for-agile-leadership",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CAL1 第1章",
    title: "アジャイルリーダーシップの必要性を理解する",
    description: "Certified Agile Leader® 1(CAL1)の学習領域1「The Case for Agile Leadership」を初学者向けにステップバイステップで解説する非公式ガイド。VUCA環境の背景、リーダーシップ・アジリティモデル、アジャイルリーダーの4つの行動とベストプラクティスを解説します。",
    meta: "10セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/cal1-chapter3-leading-agile-teams",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CAL1 第3章",
    title: "第3章:アジャイルチームのリード(Leading Agile Teams)",
    description: "Scrum Alliance Certified Agile Leader 1(CAL 1)の学習目標領域「3. Leading Agile Teams」を、サーバントリーダーシップ・タックマンモデル・心理的安全性・Lencioniの5つの機能不全・Delegation Pokerなど9つのフレームワークで初学者向けに解説する学習ガイド。",
    meta: "12セクション",
    icon: "tabler:users-group",
    accent: "gold",
  },
  {
    to: "/cal2-part1-organizational-strategy-and-delivery",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CAL2 Part 1",
    title: "Certified Agile Leader® 2 (CAL 2™) スタディガイド",
    description: "Certified Agile Leader 2 (CAL 2) Part 1「Organizational Strategy and Delivery」を初学者向けに解説する非公式スタディガイド。Golden Circle、Galbraith Star Model、Team Topologies、Immunity to Change、Kotter/ADKAR/Bridgesなどのフレームワークを図解付きで紹介します。",
    meta: "7セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/cal2-certified-agile-leader-2-study-guide",
    categoryId: "project-management",
    seriesId: "scrum",
    navLabel: "CAL2 完全ガイド",
    title: "Certified Agile Leader® 2 (CAL 2™) 学習ガイド",
    description: "Scrum Alliance Certified Agile Leader 2 (CAL 2) の学習目標に基づき、組織戦略・チェンジマネジメント・リーダーシップ成長の主要フレームワークをステップバイステップで解説する非公式学習ガイドです。",
    meta: "14セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/engineering-management-career-path",
    categoryId: "engineering-management",
    // engineering-management はシリーズ未定義（1 カラム表示）。
    seriesId: undefined,
    navLabel: "EM キャリアパス",
    title: "エンジニアのためのマネジメントキャリアパス",
    description: "テックリードからCTOまで。役割の違いと、マネージャーとしての最初の90日を体系的に学びます。",
    meta: "12セクション",
    icon: "tabler:route",
    accent: "forest",
  },
  {
    to: "/engineering-manager-guide",
    categoryId: "engineering-management",
    // engineering-management はシリーズ未定義（1 カラム表示）。
    seriesId: undefined,
    navLabel: "EM 入門",
    title: "エンジニアリングマネージャー入門完全ガイド",
    description: "James Stanier著『Become an Effective Software Engineering Manager』を主軸に、新任EMのスタートダッシュから心理的安全性、AI時代の役割まで体系的に学びます。",
    meta: "14セクション",
    icon: "tabler:school",
    accent: "indigo",
  },
  {
    to: "/managing-humans-best-practices-guide",
    categoryId: "engineering-management",
    // engineering-management はシリーズ未定義（1 カラム表示）。
    seriesId: undefined,
    navLabel: "Managing Humans",
    title: "『Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager』完全ガイド",
    description: "Michael Lopp著『Managing Humans』(第4版)を初心者向けに解説する実践ガイド。1on1、会議運営、意思決定、危機対応をMermaid図解とともに紹介します。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/mythical-man-month-guide",
    categoryId: "engineering-management",
    // engineering-management はシリーズ未定義（1 カラム表示）。
    seriesId: undefined,
    navLabel: "人月の神話",
    title: "『人月の神話』完全ガイド ― 初学者のためのステップ・バイ・ステップ実践集",
    description: "Frederick P. Brooks, Jr.著『人月の神話(The Mythical Man-Month)』を初学者向けに解説する実践ガイド。ブルックスの法則、外科手術チーム、第二システム症候群、銀の弾丸などの主要概念を10ステップのベストプラクティスとMermaid図解で紹介する。",
    meta: "10セクション",
    icon: "tabler:book",
    accent: "indigo",
  },
  {
    to: "/engineering-team-leadership-guide",
    categoryId: "engineering-leadership",
    seriesId: "first-leadership",
    navLabel: "チームリード術",
    title: "エンジニアリングチームのリード術 完全ガイド",
    description: "効果的なチーム作りの科学的根拠から、1on1、委譲、コードレビュー文化まで、実践できるベストプラクティスを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/leadership-practices-guide",
    categoryId: "engineering-leadership",
    seriesId: "first-leadership",
    navLabel: "リーダーの作法",
    title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
    description: "初めてテックリード・エンジニアリングマネージャーになった方向けに、国際的に著名なリーダーたちの実践知を基にしたリーダーシップのベストプラクティスをステップバイステップで解説する。",
    meta: "8セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/your-first-60-days-as-a-leader",
    categoryId: "engineering-leadership",
    seriesId: "first-leadership",
    navLabel: "最初の60日間",
    title: "リーダーとしての最初の60日間",
    description: "新任エンジニアリングリーダーのための、就任前準備から60日目までの実践ステップバイステップガイド。STARSモデル、1on1、心理的安全性などを解説。",
    meta: "14セクション",
    icon: "tabler:calendar-time",
    accent: "forest",
  },
  {
    to: "/leadership-challenge-workbook-guide",
    categoryId: "engineering-leadership",
    seriesId: "first-leadership",
    navLabel: "Leadership Challenge",
    title: "The Leadership Challenge Workbook 完全ガイド",
    description: "Kouzes & Posnerの「The Leadership Challenge Workbook」を、ソフトウェアエンジニアとスクラムマスター向けにステップバイステップで解説する非公式ガイド。Five PracticesとTen Commitmentsをスクラムの現場に落とし込みます。",
    meta: "12セクション",
    icon: "tabler:award",
    accent: "plum",
  },
  {
    to: "/engineering-executive-playbook",
    categoryId: "engineering-leadership",
    seriesId: "exec-scale",
    navLabel: "統括責任者の手引き",
    title: "エンジニアリング統括責任者の手引き",
    description: "Will Larson著『The Engineering Executive's Primer』を骨格に、組織設計・実行システム・DORAメトリクス・障害対応まで体系的に学びます。",
    meta: "13セクション",
    icon: "tabler:briefcase",
    accent: "gold",
  },
  {
    to: "/elastic-leadership-guide",
    categoryId: "engineering-leadership",
    seriesId: "exec-scale",
    navLabel: "Elastic Leadership",
    title: "Elastic Leadership 実践ガイド",
    description: "Roy Osherove著『Elastic Leadership』をもとに、サバイバル・ラーニング・セルフオーガナイジングの3フェーズモデルと実践テクニックを初学者向けにステップバイステップで解説するガイド。",
    meta: "13セクション",
    icon: "tabler:compass",
    accent: "indigo",
  },
  {
    to: "/developer-architect-communication-guide",
    categoryId: "engineering-leadership",
    seriesId: "exec-scale",
    navLabel: "開発者・アーキテクト",
    title: "開発者とアーキテクトのためのコミュニケーションガイド",
    description: "Elastic Leadership、Architect Elevator、ADR、C4モデルなど、世界的に知られる開発者が実践するコミュニケーション手法を初学者向けに9つのステップで解説する実践ガイド。",
    meta: "12セクション",
    icon: "tabler:messages",
    accent: "forest",
  },
  {
    to: "/team-geek-guide",
    categoryId: "team-building",
    seriesId: "team-culture",
    navLabel: "Team Geek",
    title: "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
    description: "「Team Geek」をもとに、HRT(謙虚さ・尊敬・信頼)を軸としたチーム開発のベストプラクティスを初学者向けにステップバイステップで解説します。",
    meta: "12セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/debugging-teams-guide",
    categoryId: "team-building",
    seriesId: "team-culture",
    navLabel: "Debugging Teams",
    title: "Debugging Teams 完全ガイド ― チームの人間関係を「デバッグ」するベストプラクティス",
    description: "O'Reilly刊『Debugging Teams』の内容と国際的なエンジニアの書評をもとに、HRT(謙虚さ・敬意・信頼)を軸としたチームづくりのベストプラクティスを初学者向けに9ステップで解説する。",
    meta: "9セクション",
    icon: "tabler:bug",
    accent: "plum",
  },
  {
    to: "/peopleware-guide",
    categoryId: "team-building",
    seriesId: "team-culture",
    navLabel: "Peopleware",
    title: "『Peopleware: Productive Projects and Teams』完全ガイド",
    description: "Tom DeMarcoとTim Listerの名著『Peopleware Productive Projects and Teams』を初学者向けにステップバイステップで解説。核心テーゼ、6部構成、チーミサイド、Coding War Gamesのデータ、著名開発者の言及までを図解と表で整理した実践ガイド。",
    meta: "14セクション",
    icon: "tabler:users-group",
    accent: "indigo",
  },
  {
    to: "/radical-candor-guide",
    categoryId: "team-building",
    seriesId: "team-culture",
    navLabel: "Radical Candor",
    title: "Radical Candor 完全ガイド ― 初学者のための実践フレームワーク",
    description: "Kim Scott著『Radical Candor』の核となるフレームワークを、HIP・CORE・GSDホイールなどの実践ツールとともに初学者向けに解説するガイド。",
    meta: "16セクション",
    icon: "tabler:message-2",
    accent: "gold",
  },
  {
    to: "/no-rules-rules-guide",
    categoryId: "team-building",
    seriesId: "team-culture",
    navLabel: "No Rules Rules",
    title: "『NO RULES RULES』完全ガイド",
    description: "Reed HastingsとErin Meyer著『No Rules Rules』を初学者向けに要約。タレント・デンシティ、率直なフィードバック、コントロールの撤廃という3つの原則と、ソフトウェア開発チームへの応用ステップをMermaid図解と表で解説します。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "indigo",
  },
  {
    to: "/team-topologies-guide",
    categoryId: "team-building",
    seriesId: "team-design",
    navLabel: "Team Topologies",
    title: "Team Topologies 実践ガイド",
    description: "Matthew Skelton氏とManuel Pais氏が提唱したTeam Topologiesを、コンウェイの法則から導入ロードマップまで初学者向けにステップバイステップで解説する。",
    meta: "15セクション",
    icon: "tabler:topology-star-3",
    accent: "indigo",
  },
  {
    to: "/dynamic-reteaming-guide",
    categoryId: "team-building",
    seriesId: "team-design",
    navLabel: "ダイナミック・リチーミング",
    title: "ダイナミック・リチーミング実践ガイド",
    description: "Heidi Helfand著『Dynamic Reteaming』に基づく、チームのエコサイクル、5つの基本パターン、実践ステップとアンチパターンを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "forest",
  },
  {
    to: "/lean-ux-beginner-guide",
    categoryId: "team-building",
    seriesId: "team-design",
    navLabel: "Lean UX 入門",
    title: "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
    description: "Jeff GothelfとJosh Seidenの著書『Lean UX, 3rd Edition』を主軸に、Lean UX Canvas・仮説の書き方・MVPと実験・デザインスタジオ・デュアルトラック・アジャイルまでを初学者向けに解説するガイド。",
    meta: "14セクション",
    icon: "tabler:bulb",
    accent: "forest",
  },
] as const satisfies readonly Guide[];

/** シリーズ単位のガイド束。`series` が null なのはシリーズ未定義カテゴリーの受け皿。 */
export type GuideSeriesGroup = {
  readonly series: GuideSeries | null;
  readonly guides: readonly Guide[];
};

export type GuideGroup = {
  readonly category: GuideCategory;
  /** カテゴリー内の全ガイド（定義順）。seriesGroups を平坦化したものと順序込みで一致する。 */
  readonly guides: readonly Guide[];
  /** メガメニューのカラム。空カラムは含まない。 */
  readonly seriesGroups: readonly GuideSeriesGroup[];
};

/**
 * カテゴリー順・カテゴリー内は GUIDES の定義順でグルーピングする。
 * ガイドが 1 件も無いカテゴリー・シリーズは返さない（ナビに空の枠を出さないため）。
 */
export function groupGuidesByCategory(): GuideGroup[] {
  return GUIDE_CATEGORIES
    .map((category) => {
      const guides = GUIDES.filter((guide) => guide.categoryId === category.id);
      return { category, guides, seriesGroups: buildSeriesGroups(category.id, guides) };
    })
    .filter((group) => group.guides.length > 0);
}

/**
 * カテゴリー内のガイドをシリーズカラムへ分割する。
 *
 * シリーズを 1 つも持たないカテゴリーは、ラベル無しの 1 カラムへまとめる
 * （分割前と同じ 1 列表示になる）。シリーズを持つカテゴリーで seriesId が
 * 未指定のガイドが残った場合も同じ受け皿へ入れ、消さずに到達可能なまま残す
 * （登録漏れは契約テストで落とす。表示側で握りつぶさない）。
 */
function buildSeriesGroups(
  categoryId: GuideCategoryId,
  guides: readonly Guide[],
): GuideSeriesGroup[] {
  // 戻り値型を先に与えることで series が `GuideSeries | null` へ広がる（キャスト不要）。
  const groups: GuideSeriesGroup[] = GUIDE_SERIES
    .filter((series) => series.categoryId === categoryId)
    .map((series) => ({
      series,
      guides: guides.filter((guide) => guide.seriesId === series.id),
    }))
    .filter((group) => group.guides.length > 0);

  const unassigned = guides.filter((guide) => guide.seriesId === undefined);
  if (unassigned.length > 0) groups.push({ series: null, guides: unassigned });

  return groups;
}

const CARD_LABEL_BY_ID = new Map<GuideCategoryId, string>(
  GUIDE_CATEGORIES.map((category) => [category.id, category.cardLabel]),
);

/**
 * ホームのカードに表示する英語カテゴリー表記を引く。
 * 型で存在が保証されているため、見つからない場合は握りつぶさず例外にする。
 */
export function categoryCardLabel(id: GuideCategoryId): string {
  const label = CARD_LABEL_BY_ID.get(id);
  if (label === undefined) {
    throw new Error(`未定義のガイドカテゴリー: ${id}`);
  }
  return label;
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

/** ホームのカードに表示する英語シリーズ表記を引く。 */
export function seriesCardLabel(id: GuideSeriesId): string {
  return findSeries(id).cardLabel;
}

/** グローバルナビの小見出しに表示する日本語シリーズ表記を引く。 */
export function seriesNavLabel(id: GuideSeriesId): string {
  return findSeries(id).navLabel;
}
