import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_GUIDES, GUIDES, type GuideProgramId } from "~/utils/guide-catalog";

/*
 * 公開ページの法的表示の契約（2026-10 の公開前監査で是正した内容の回帰防止）。
 *
 * 商標・著作権・ライセンス表示の誤りは、型検査・lint・原本照合監査のいずれでも検知できない
 * （原本照合監査は「原本にあってページに無いもの」しか見ず、原本自体の誤りは素通しする）。
 * したがって公開中ページ（GUIDES）のソースを走査して固定する。
 *
 * リポジトリ自体が公開されているため、本番で見合わせ中のページも GitHub 上では閲覧できる。
 * 侵害への誘導や問題集系サイトへの依存のように「置いた時点で問題になる」ものは全ページ（ALL）を走査する。
 */

const PAGES_DIR = join(import.meta.dirname, "..", "app", "pages");

/** ルートから SFC のソースを読む（app/pages/<route>.vue）。 */
function readPage(route: string): string {
  return readFileSync(join(PAGES_DIR, `${route.slice(1)}.vue`), "utf-8");
}

/** <footer> 要素の中身だけを返す。無ければ空文字。 */
function footerOf(source: string): string {
  const match = /<footer[^>]*>([\s\S]*?)<\/footer>/.exec(source);
  return match?.[1] ?? "";
}

const PUBLISHED = GUIDES.map((guide) => ({ route: guide.to, source: readPage(guide.to) }));
const ALL = ALL_GUIDES.map((guide) => ({ route: guide.to, source: readPage(guide.to) }));

/**
 * 事実と異なる、または権利者を誤る表示。
 * - ライセンスを受けていないのに「許可を得て使用」と書くのは虚偽表示になる
 * - ITIL / PRINCE2 / MoP の権利者は PeopleCert group（AXELOS は旧権利者）
 * - Scrum.org と Scrum, Inc. は別法人。「Scrum」自体は Scrum Alliance の商標ではない
 * - © の主体は運営者。書名・ガイド名を権利者のように見せない
 * - The Nexus Guide（2021）の著作権者は Scrum.org のみ
 */
const FORBIDDEN_PHRASES = [
  "許可を得て使用",
  "used under licence",
  "AXELOS Limitedの登録商標",
  "AXELOS Limited の登録商標",
  "Scrum, Inc. (Scrum.org)",
  "Scrum®, Scrum Alliance®",
  "© Team Topologies",
  "&copy; 2026 Engineering Executive's Playbook",
  "&copy; リーダーの作法",
  "© 2021 Ken Schwaber and Scrum.org",
] as const;

/**
 * 試験問題の流出（ブレインダンプ）を扱う、または扱うと見なされうるサイト。
 * 出典として示すと、受験規約（NDA）違反を助長する印象を与え、ガイドの信頼性も損なう。
 */
const EXAM_DUMP_DOMAINS = [
  "certempire.com",
  "passitexams.com",
  "open-exam-prep.com",
  "certificationbox.com",
  "scrum-exams.info",
  "prepforscrum.com",
  "certshero.com",
] as const;

/**
 * 権利者の許諾が確認できない複製物の置き場（侵害コンテンツへの誘導は著作権法 113 条 2 項のみなし侵害になりうる）。
 * - scribd.com: 公式マニュアルの透かし入りコピーが掲載されていた
 * - zoboko.com: 公式マニュアルの電子書籍を掲載していた
 * - archive.org/details/: 電子貸出の書籍ページ（Hachette v. Internet Archive で貸出が違法と判断された）
 */
const UNAUTHORIZED_COPY_HOSTS = ["scribd.com", "zoboko.com", "archive.org/details/"] as const;

/**
 * 試験問題の流出を扱う、または扱うと見なされうるサイトの名称。リンクを外しても名称を出典に残すと、
 * そのサイトへの依存と受験規約（NDA）違反の助長を示すことになる。
 */
const EXAM_DUMP_NAMES = ["Open Exam Prep", "Passitexams", "Scrum-Exams"] as const;

/** 書籍の要約サービス。公開ページは原著・著者本人・独立した書評を出典にする。 */
const SUMMARY_SERVICE_HOSTS = ["shortform.com", "readingraphics.com", "blinkist.com", "getabstract.com", "bookey.app"] as const;

/**
 * 認定団体の「公式」に準拠した教材であるかのような表示（提携・承認の誤認を招く）。
 * 「〜に基づく非公式ガイド」のように書く。出典の説明（「公式サイトの記載に基づく。」「〜に準拠しています」）は対象外。
 */
const OFFICIAL_ENDORSEMENT_CLAIM = /(?<!非)公式[^<>"。、]{0,40}?(?:準拠(?!し)|に基づく(?:学習ガイド|解説|学習リソース)|に沿った学習ガイド)/g;

/**
 * CC BY-SA 4.0 の文書（Scrum Guide / Kanban Guide for Scrum Teams / EBM Guide）を
 * 訳出・引用しているページ。フッターに原典と CC BY-SA 4.0 を明示しなければならない。
 */
const CC_BY_SA_PAGES = {
  "/csm-certified-scrummaster-guide": ["The Scrum Guide"],
  "/csm-scrum-master-core-competencies": ["The Scrum Guide"],
  "/a-csd-advanced-certified-scrum-developer-study-guide": ["The Scrum Guide"],
  "/a-cspo-advanced-certified-scrum-product-owner-study-guide": ["The Scrum Guide", "The Nexus Guide"],
  "/csp-sm-certified-scrum-professional-scrummaster-study-guide": ["The Scrum Guide"],
  "/cal1-chapter3-leading-agile-teams": ["The Scrum Guide"],
  "/psm-ai-essentials-guide": ["The Scrum Guide"],
  "/professional-scrum-product-owner": ["The Scrum Guide"],
  "/professional-scrum-product-backlog-management-skills": ["The Scrum Guide"],
  "/professional-scrum-with-kanban": ["The Scrum Guide", "Kanban Guide for Scrum Teams"],
  "/professional-agile-leadership-evidence-based-management": ["Evidence-Based Management Guide"],
} as const satisfies Record<string, readonly string[]>;

/** 資格プログラムごとの商標権利者。フッターにこの名称が無ければ帰属表示として認めない。 */
const TRADEMARK_HOLDERS: Readonly<Partial<Record<GuideProgramId, string>>> = {
  pmi: "Project Management Institute",
  "scrum-alliance": "Scrum Alliance",
  "scrum-org": "Scrum.org",
  peoplecert: "PeopleCert",
};

const TRADEMARK_NOTICE = /商標|trade ?mark/i;

describe("公開ページの法的表示", () => {
  it("権利者・ライセンスを誤る表示を含まない", () => {
    const hits = PUBLISHED.flatMap(({ route, source }) =>
      FORBIDDEN_PHRASES.filter((phrase) => source.includes(phrase)).map((phrase) => `${route}: ${phrase}`),
    );

    expect(hits).toEqual([]);
  });

  it("試験問題の流出を扱うサイトへリンクしない（見合わせ中のページを含む）", () => {
    const hits = ALL.flatMap(({ route, source }) =>
      EXAM_DUMP_DOMAINS.filter((domain) => source.includes(domain)).map((domain) => `${route}: ${domain}`),
    );

    expect(hits).toEqual([]);
  });

  it("権利者の許諾が確認できない複製物へリンクしない（見合わせ中のページを含む）", () => {
    const hits = ALL.flatMap(({ route, source }) =>
      UNAUTHORIZED_COPY_HOSTS.filter((host) => source.includes(host)).map((host) => `${route}: ${host}`),
    );

    expect(hits).toEqual([]);
  });

  it("試験問題の流出を扱うサイトの名称を出典に残さない（見合わせ中のページを含む）", () => {
    const hits = ALL.flatMap(({ route, source }) =>
      EXAM_DUMP_NAMES.filter((name) => source.includes(name)).map((name) => `${route}: ${name}`),
    );

    expect(hits).toEqual([]);
  });

  it("公開ページは書籍の要約サービスを出典にしない", () => {
    const hits = PUBLISHED.flatMap(({ route, source }) =>
      SUMMARY_SERVICE_HOSTS.filter((host) => source.includes(host)).map((host) => `${route}: ${host}`),
    );

    expect(hits).toEqual([]);
  });

  it("認定団体の公式に準拠した教材であるかのように表示しない（見合わせ中のページを含む）", () => {
    const hits = ALL.flatMap(({ route, source }) =>
      [...source.matchAll(OFFICIAL_ENDORSEMENT_CLAIM)].map((match) => `${route}: ${match[0]}`),
    );

    expect(hits).toEqual([]);
  });

  it("CC BY-SA 文書を訳出するページはフッターで原典とライセンスを明示する", () => {
    const missing = Object.entries(CC_BY_SA_PAGES).flatMap(([route, originals]) => {
      const footer = footerOf(readPage(route));
      return [...originals, "CC BY-SA 4.0", "creativecommons.org/licenses/by-sa/4.0"]
        .filter((required) => !footer.includes(required))
        .map((required) => `${route}: ${required}`);
    });

    expect(missing).toEqual([]);
  });

  it("資格ガイドはすべてフッターに商標の帰属と権利者を明示する", () => {
    // 認定名は各団体の商標。非公式であることと権利者を、ページ末尾で必ず示す。
    // 「商標」の語だけでは権利者の誤記（旧権利者のまま等）を素通しするため、権利者名まで照合する。
    const missing = GUIDES.flatMap((guide) => {
      const holder = TRADEMARK_HOLDERS[guide.programId];
      if (holder === undefined) return [];
      const footer = footerOf(readPage(guide.to));
      return [TRADEMARK_NOTICE.test(footer) ? null : "商標", footer.includes(holder) ? null : holder]
        .filter((required) => required !== null)
        .map((required) => `${guide.to}: ${required}`);
    });

    expect(missing).toEqual([]);
  });
});


it.each(["PRINCE2® is a registered trademark of PeopleCert group.",
  "PRINCE2® is a registered trade mark of PeopleCert group.",
  "PRINCE2®はPeopleCert groupの登録商標です。"])("商標表示の正規の表記を検出する: %s", notice => {
  expect(TRADEMARK_NOTICE.test(notice)).toBe(true);
});

it.each(["PeopleCert group", "registered trade", "mark only"])("商標表示でない文言を認めない: %s", notice => {
  expect(TRADEMARK_NOTICE.test(notice)).toBe(false);
});

it.each([
  "PMI公式ECO 2026年7月改訂版 準拠",
  "Scrum Alliance公式Learning Objectives準拠",
  "PeopleCert公式資格 準拠ガイド",
  "PeopleCert公式シラバスに基づく学習ガイド",
  "Scrum.org公式情報に基づく学習リソース",
  "PeopleCert 公式シラバス v2.0 に沿った学習ガイド",
])("公式準拠をうたう表示を検出する: %s", (claim) => {
  expect([...claim.matchAll(OFFICIAL_ENDORSEMENT_CLAIM)]).toHaveLength(1);
});

it.each([
  "PMI ECO 2026年7月改訂版に基づく非公式ガイド",
  "PeopleCert シラバス v2.0 に沿った非公式学習ガイド",
  "特に配点・シラバス構造・用語定義は [1] [2] の公式情報に準拠しています。",
  "PeopleCert公式サイトの記載に基づく)。",
])("出典の説明や非公式の明記は検出しない: %s", (text) => {
  expect([...text.matchAll(OFFICIAL_ENDORSEMENT_CLAIM)]).toEqual([]);
});
