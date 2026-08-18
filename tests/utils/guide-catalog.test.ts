import { describe, expect, it } from "vitest";
import { GUIDES, GUIDE_CATEGORIES, groupGuidesByCategory } from "~/utils/guide-catalog";

describe("utils/guide-catalog — ガイド定義の単一の真実の源", () => {
  it("カテゴリーを順序・表示ラベルまで完全一致で固定する", () => {
    expect(GUIDE_CATEGORIES.map((category) => ({
      id: category.id,
      navLabel: category.navLabel,
      cardLabel: category.cardLabel,
    }))).toEqual([
      { id: "project-management", navLabel: "プロジェクトマネジメント", cardLabel: "PROJECT MANAGEMENT" },
      { id: "engineering-management", navLabel: "エンジニアリングマネジメント", cardLabel: "ENGINEERING MANAGEMENT" },
      { id: "engineering-leadership", navLabel: "リーダーシップ", cardLabel: "ENGINEERING LEADERSHIP" },
      { id: "team-building", navLabel: "チームビルディング", cardLabel: "TEAM BUILDING" },
    ]);
  });

  it("公開ガイドを順序・遷移先・カテゴリー・ナビ表記まで完全一致で固定する", () => {
    // 並び順はホームのカード配置（tests/pages/index.test.ts）と同一でなければならない。
    expect(GUIDES.map((guide) => ({
      to: guide.to,
      categoryId: guide.categoryId,
      navLabel: guide.navLabel,
    }))).toEqual([
      { to: "/capm", categoryId: "project-management", navLabel: "CAPM 完全ガイド" },
      { to: "/certified-associate-in-project-management-domain1", categoryId: "project-management", navLabel: "CAPM ドメイン1" },
      { to: "/certified-associate-in-project-management-domain2", categoryId: "project-management", navLabel: "CAPM ドメイン2" },
      { to: "/capm-domain3-agile-frameworks-guide", categoryId: "project-management", navLabel: "CAPM ドメイン3" },
      { to: "/pmp-certification-guide", categoryId: "project-management", navLabel: "PMP 完全攻略" },
      { to: "/engineering-management-career-path", categoryId: "engineering-management", navLabel: "EM キャリアパス" },
      { to: "/engineering-team-leadership-guide", categoryId: "engineering-leadership", navLabel: "チームリード術" },
      { to: "/engineering-manager-guide", categoryId: "engineering-management", navLabel: "EM 入門" },
      { to: "/dynamic-reteaming-guide", categoryId: "team-building", navLabel: "ダイナミック・リチーミング" },
      { to: "/engineering-executive-playbook", categoryId: "engineering-leadership", navLabel: "統括責任者の手引き" },
    ]);
  });

  it("すべてのガイドが実在するカテゴリーに属する", () => {
    // 孤立ガイド（categoryId の打ち間違い）はグルーピングで黙って消えるため、
    // 表示側ではなくカタログ自身の契約として検知する。
    const categoryIds = GUIDE_CATEGORIES.map((category) => category.id);
    const orphans = GUIDES.filter((guide) => !categoryIds.includes(guide.categoryId));

    expect(orphans.map((guide) => guide.to)).toEqual([]);
  });

  it("遷移先が重複しない", () => {
    const routes = GUIDES.map((guide) => guide.to);

    expect(routes).toEqual([...new Set(routes)]);
  });

  it("カテゴリー順・カテゴリー内定義順でグルーピングする", () => {
    expect(groupGuidesByCategory().map((group) => ({
      id: group.category.id,
      guides: group.guides.map((guide) => guide.navLabel),
    }))).toEqual([
      {
        id: "project-management",
        guides: ["CAPM 完全ガイド", "CAPM ドメイン1", "CAPM ドメイン2", "CAPM ドメイン3", "PMP 完全攻略"],
      },
      {
        id: "engineering-management",
        guides: ["EM キャリアパス", "EM 入門"],
      },
      {
        id: "engineering-leadership",
        guides: ["チームリード術", "統括責任者の手引き"],
      },
      {
        id: "team-building",
        guides: ["ダイナミック・リチーミング"],
      },
    ]);
  });

  it("グルーピングが全ガイドを漏れなく含む", () => {
    const grouped = groupGuidesByCategory().flatMap((group) => group.guides.map((guide) => guide.to));

    expect([...grouped].sort()).toEqual([...GUIDES.map((guide) => guide.to)].sort());
  });

  it("空のカテゴリーを作らない（ナビに空ドロップダウンを出さないため）", () => {
    expect(groupGuidesByCategory().filter((group) => group.guides.length === 0)).toEqual([]);
  });
});
