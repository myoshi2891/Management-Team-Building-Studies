import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDES, type GuideProgramId } from "~/utils/guide-catalog";

/*
 * 公開ページの法的表示の契約（2026-10 の公開前監査で是正した内容の回帰防止）。
 *
 * 商標・著作権・ライセンス表示の誤りは、型検査・lint・原本照合監査のいずれでも検知できない
 * （原本照合監査は「原本にあってページに無いもの」しか見ず、原本自体の誤りは素通しする）。
 * したがって公開中ページ（GUIDES）のソースを走査して固定する。
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

const TRADEMARK_NOTICE = /商標|trademark/;

describe("公開ページの法的表示", () => {
  it("権利者・ライセンスを誤る表示を含まない", () => {
    const hits = PUBLISHED.flatMap(({ route, source }) =>
      FORBIDDEN_PHRASES.filter((phrase) => source.includes(phrase)).map((phrase) => `${route}: ${phrase}`),
    );

    expect(hits).toEqual([]);
  });

  it("試験問題の流出を扱うサイトへリンクしない", () => {
    const hits = PUBLISHED.flatMap(({ route, source }) =>
      EXAM_DUMP_DOMAINS.filter((domain) => source.includes(domain)).map((domain) => `${route}: ${domain}`),
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
