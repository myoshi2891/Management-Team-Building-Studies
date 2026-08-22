/*
 * 公開ガイドの定義（単一の真実の源）。
 *
 * ホーム（app/pages/index.vue のカード一覧）とグローバルナビ
 * （app/components/SiteHeader.vue のドロップダウン）は、どちらもこのファイルだけを参照する。
 * ガイドを追加するときは GUIDES に 1 件足せば両方へ反映される。
 *
 * 注意: アイコン名をこのファイルへ置いたため、@nuxt/icon の clientBundle.scan が
 * `.ts` も走査するよう nuxt.config.ts の globInclude を拡張してある（既定は .vue 等のみ）。
 * これを外すと静的生成時にアイコンが同梱されず、本番だけ空白になる。
 */

/** カテゴリー定義。並び順がそのままグローバルナビのドロップダウンの並び順になる。 */
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

/** ホームのカードで使うアクセント色。app/pages/index.vue の `guide-card-<accent>` に対応する。 */
export type GuideAccent = "indigo" | "gold" | "forest" | "plum";

export type Guide = {
  /** ルート。app/pages/*.vue のファイル名から決まる */
  readonly to: string;
  readonly categoryId: GuideCategoryId;
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
 * 公開中のガイド。並び順はホームのカード配置の正であり、
 * グローバルナビのドロップダウン内の並び順もこの順序を引き継ぐ。
 *
 * `satisfies` により categoryId の打ち間違いは型検査で落ちる（存在しないカテゴリーを書けない）。
 */
export const GUIDES = [
  {
    to: "/capm",
    categoryId: "project-management",
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
    navLabel: "CSM Scrum理論",
    title: "Scrum理論の基礎(Scrum Theory) ― CSM®試験対応 初学者向け完全ガイド",
    description: "Scrum Alliance Certified ScrumMaster(CSM)のScrum Foundations Learning Objectives「Scrum Theory」(LO1.1-1.7)を、Scrum Guide 2020とScrum Alliance公式資料に基づき初学者向けに解説する完全ガイド。",
    meta: "12セクション",
    icon: "tabler:certificate",
    accent: "gold",
  },
  {
    to: "/scrum-97-things-guide",
    categoryId: "project-management",
    navLabel: "スクラム 97の知恵",
    title: "スクラム実践者が知るべきベストプラクティス97 - 初学者のための完全ガイド",
    description: "O'Reilly「97 Things Every Scrum Practitioner Should Know」の10パート構成に学び、公式Scrum Guideと国際的な実践者の知見をもとにスクラムのベストプラクティスをステップバイステップで解説する初学者向けガイド。",
    meta: "13セクション",
    icon: "tabler:list-check",
    accent: "forest",
  },
  {
    to: "/engineering-management-career-path",
    categoryId: "engineering-management",
    navLabel: "EM キャリアパス",
    title: "エンジニアのためのマネジメントキャリアパス",
    description: "テックリードからCTOまで。役割の違いと、マネージャーとしての最初の90日を体系的に学びます。",
    meta: "12セクション",
    icon: "tabler:route",
    accent: "forest",
  },
  {
    to: "/engineering-team-leadership-guide",
    categoryId: "engineering-leadership",
    navLabel: "チームリード術",
    title: "エンジニアリングチームのリード術 完全ガイド",
    description: "効果的なチーム作りの科学的根拠から、1on1、委譲、コードレビュー文化まで、実践できるベストプラクティスを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/engineering-manager-guide",
    categoryId: "engineering-management",
    navLabel: "EM 入門",
    title: "エンジニアリングマネージャー入門完全ガイド",
    description: "James Stanier著『Become an Effective Software Engineering Manager』を主軸に、新任EMのスタートダッシュから心理的安全性、AI時代の役割まで体系的に学びます。",
    meta: "14セクション",
    icon: "tabler:school",
    accent: "indigo",
  },
  {
    to: "/dynamic-reteaming-guide",
    categoryId: "team-building",
    navLabel: "ダイナミック・リチーミング",
    title: "ダイナミック・リチーミング実践ガイド",
    description: "Heidi Helfand著『Dynamic Reteaming』に基づく、チームのエコサイクル、5つの基本パターン、実践ステップとアンチパターンを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "forest",
  },
  {
    to: "/engineering-executive-playbook",
    categoryId: "engineering-leadership",
    navLabel: "統括責任者の手引き",
    title: "エンジニアリング統括責任者の手引き",
    description: "Will Larson著『The Engineering Executive's Primer』を骨格に、組織設計・実行システム・DORAメトリクス・障害対応まで体系的に学びます。",
    meta: "13セクション",
    icon: "tabler:briefcase",
    accent: "gold",
  },
  {
    to: "/leadership-practices-guide",
    categoryId: "engineering-leadership",
    navLabel: "リーダーの作法",
    title: "リーダーの作法 — はじめてのソフトウェアエンジニアリーダーのための実践ガイド",
    description: "初めてテックリード・エンジニアリングマネージャーになった方向けに、国際的に著名なリーダーたちの実践知を基にしたリーダーシップのベストプラクティスをステップバイステップで解説する。",
    meta: "8セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/team-geek-guide",
    categoryId: "team-building",
    navLabel: "Team Geek",
    title: "Team Geek ― Googleのギークたちはいかにしてチームを作るのか",
    description: "「Team Geek」をもとに、HRT(謙虚さ・尊敬・信頼)を軸としたチーム開発のベストプラクティスを初学者向けにステップバイステップで解説します。",
    meta: "12セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/team-topologies-guide",
    categoryId: "team-building",
    navLabel: "Team Topologies",
    title: "Team Topologies 実践ガイド",
    description: "Matthew Skelton氏とManuel Pais氏が提唱したTeam Topologiesを、コンウェイの法則から導入ロードマップまで初学者向けにステップバイステップで解説する。",
    meta: "15セクション",
    icon: "tabler:topology-star-3",
    accent: "indigo",
  },
  {
    to: "/developer-architect-communication-guide",
    categoryId: "engineering-leadership",
    navLabel: "開発者・アーキテクト",
    title: "開発者とアーキテクトのためのコミュニケーションガイド",
    description: "Elastic Leadership、Architect Elevator、ADR、C4モデルなど、世界的に知られる開発者が実践するコミュニケーション手法を初学者向けに9つのステップで解説する実践ガイド。",
    meta: "12セクション",
    icon: "tabler:messages",
    accent: "forest",
  },
  {
    to: "/elastic-leadership-guide",
    categoryId: "engineering-leadership",
    navLabel: "Elastic Leadership",
    title: "Elastic Leadership 実践ガイド",
    description: "Roy Osherove著『Elastic Leadership』をもとに、サバイバル・ラーニング・セルフオーガナイジングの3フェーズモデルと実践テクニックを初学者向けにステップバイステップで解説するガイド。",
    meta: "13セクション",
    icon: "tabler:compass",
    accent: "indigo",
  },
  {
    to: "/leadership-challenge-workbook-guide",
    categoryId: "engineering-leadership",
    navLabel: "Leadership Challenge",
    title: "The Leadership Challenge Workbook 完全ガイド",
    description: "Kouzes & Posnerの「The Leadership Challenge Workbook」を、ソフトウェアエンジニアとスクラムマスター向けにステップバイステップで解説する非公式ガイド。Five PracticesとTen Commitmentsをスクラムの現場に落とし込みます。",
    meta: "12セクション",
    icon: "tabler:award",
    accent: "plum",
  },
  {
    to: "/lean-ux-beginner-guide",
    categoryId: "team-building",
    navLabel: "Lean UX 入門",
    title: "Lean UX 実践ガイド ― はじめての人のためのステップバイステップ入門",
    description: "Jeff GothelfとJosh Seidenの著書『Lean UX, 3rd Edition』を主軸に、Lean UX Canvas・仮説の書き方・MVPと実験・デザインスタジオ・デュアルトラック・アジャイルまでを初学者向けに解説するガイド。",
    meta: "14セクション",
    icon: "tabler:bulb",
    accent: "forest",
  },
  {
    to: "/your-first-60-days-as-a-leader",
    categoryId: "engineering-leadership",
    navLabel: "最初の60日間",
    title: "リーダーとしての最初の60日間",
    description: "新任エンジニアリングリーダーのための、就任前準備から60日目までの実践ステップバイステップガイド。STARSモデル、1on1、心理的安全性などを解説。",
    meta: "14セクション",
    icon: "tabler:calendar-time",
    accent: "forest",
  },
] as const satisfies readonly Guide[];

export type GuideGroup = {
  readonly category: GuideCategory;
  readonly guides: readonly Guide[];
};

/**
 * カテゴリー順・カテゴリー内は GUIDES の定義順でグルーピングする。
 * ガイドが 1 件も無いカテゴリーは返さない（ナビに空のドロップダウンを出さないため）。
 */
export function groupGuidesByCategory(): GuideGroup[] {
  return GUIDE_CATEGORIES
    .map((category) => ({
      category,
      guides: GUIDES.filter((guide) => guide.categoryId === category.id),
    }))
    .filter((group) => group.guides.length > 0);
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
