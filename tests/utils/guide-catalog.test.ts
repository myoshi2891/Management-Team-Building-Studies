import { describe, expect, it } from "vitest";
import {
  GUIDES,
  GUIDE_CATEGORIES,
  GUIDE_SERIES,
  groupGuidesByCategory,
  seriesCardLabel,
  seriesNavLabel,
} from "~/utils/guide-catalog";

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

  it("シリーズを順序・所属カテゴリー・表示ラベルまで完全一致で固定する", () => {
    // 並び順がそのままメガメニューのカラム順・ホームのセクション内の並び順になる。
    expect(GUIDE_SERIES.map((series) => ({
      id: series.id,
      categoryId: series.categoryId,
      navLabel: series.navLabel,
      cardLabel: series.cardLabel,
    }))).toEqual([
      { id: "capm", categoryId: "project-management", navLabel: "CAPM", cardLabel: "CAPM" },
      { id: "pmp", categoryId: "project-management", navLabel: "PMP", cardLabel: "PMP" },
      { id: "scrum", categoryId: "project-management", navLabel: "Scrum / CSM", cardLabel: "SCRUM / CSM" },
      { id: "ai-pm", categoryId: "project-management", navLabel: "AI-PM", cardLabel: "AI-PM" },
      { id: "first-leadership", categoryId: "engineering-leadership", navLabel: "はじめてのリード", cardLabel: "FIRST LEADERSHIP" },
      { id: "exec-scale", categoryId: "engineering-leadership", navLabel: "組織・スケール", cardLabel: "ORG & SCALE" },
      { id: "team-culture", categoryId: "team-building", navLabel: "チーム文化", cardLabel: "TEAM CULTURE" },
      { id: "team-design", categoryId: "team-building", navLabel: "チーム設計・変革", cardLabel: "TEAM DESIGN" },
    ]);
  });

  it("公開ガイドを順序・遷移先・カテゴリー・シリーズ・ナビ表記まで完全一致で固定する", () => {
    /*
     * 並び順は「カテゴリー順（GUIDE_CATEGORIES）→ シリーズ順（GUIDE_SERIES）→ 定義順」。
     * この不変条件により groupGuidesByCategory() の seriesGroups を平坦化した結果が
     * guides と一致し、ナビ・ホームの DOM 順とカタログの順序が二重管理にならない。
     */
    expect(GUIDES.map((guide) => ({
      to: guide.to,
      categoryId: guide.categoryId,
      seriesId: guide.seriesId,
      navLabel: guide.navLabel,
    }))).toEqual([
      { to: "/capm", categoryId: "project-management", seriesId: "capm", navLabel: "CAPM 完全ガイド" },
      { to: "/certified-associate-in-project-management-domain1", categoryId: "project-management", seriesId: "capm", navLabel: "CAPM ドメイン1" },
      { to: "/certified-associate-in-project-management-domain2", categoryId: "project-management", seriesId: "capm", navLabel: "CAPM ドメイン2" },
      { to: "/capm-domain3-agile-frameworks-guide", categoryId: "project-management", seriesId: "capm", navLabel: "CAPM ドメイン3" },
      { to: "/capm-domain4-business-analysis-frameworks", categoryId: "project-management", seriesId: "capm", navLabel: "CAPM ドメイン4" },
      { to: "/pmp-certification-guide", categoryId: "project-management", seriesId: "pmp", navLabel: "PMP 完全攻略" },
      { to: "/pmp-domain1-people-guide", categoryId: "project-management", seriesId: "pmp", navLabel: "PMP ドメイン1" },
      { to: "/pmp-domain2-process-guide", categoryId: "project-management", seriesId: "pmp", navLabel: "PMP ドメイン2" },
      { to: "/pmp-domain3-business-environment-guide", categoryId: "project-management", seriesId: "pmp", navLabel: "PMP ドメイン3" },
      { to: "/csm-certified-scrummaster-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM 完全ガイド" },
      { to: "/csm-scrum-team-3-accountabilities", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM 3つのアカウンタビリティ" },
      { to: "/csm-scrum-theory-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM Scrum理論" },
      { to: "/csm-scrum-artifacts-and-commitments", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM アーティファクト" },
      { to: "/scrum-events-csm-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM スクラムイベント" },
      { to: "/csm-scrum-master-core-competencies", categoryId: "project-management", seriesId: "scrum", navLabel: "CSM コアコンピテンシー" },
      { to: "/scrum-97-things-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "スクラム 97の知恵" },
      { to: "/cal1-certified-agile-leader-1-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL1 完全ガイド" },
      { to: "/the-case-for-agile-leadership", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL1 第1章" },
      { to: "/agile-leadership-in-action", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL1 第2章" },
      { to: "/cal1-chapter3-leading-agile-teams", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL1 第3章" },
      { to: "/cal1-chapter4-leading-agile-organizations", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL1 第4章" },
      { to: "/cal2-part1-organizational-strategy-and-delivery", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL2 Part 1" },
      { to: "/cal2-certified-agile-leader-2-study-guide", categoryId: "project-management", seriesId: "scrum", navLabel: "CAL2 完全ガイド" },
      { to: "/ai-driven-project-management-guide", categoryId: "project-management", seriesId: "ai-pm", navLabel: "AI-PM 実践ガイド" },
      { to: "/engineering-management-career-path", categoryId: "engineering-management", seriesId: undefined, navLabel: "EM キャリアパス" },
      { to: "/engineering-manager-guide", categoryId: "engineering-management", seriesId: undefined, navLabel: "EM 入門" },
      { to: "/managing-humans-best-practices-guide", categoryId: "engineering-management", seriesId: undefined, navLabel: "Managing Humans" },
      { to: "/mythical-man-month-guide", categoryId: "engineering-management", seriesId: undefined, navLabel: "人月の神話" },
      { to: "/high-output-management-guide", categoryId: "engineering-management", seriesId: undefined, navLabel: "High Output Management" },
      { to: "/engineering-team-leadership-guide", categoryId: "engineering-leadership", seriesId: "first-leadership", navLabel: "チームリード術" },
      { to: "/leadership-practices-guide", categoryId: "engineering-leadership", seriesId: "first-leadership", navLabel: "リーダーの作法" },
      { to: "/your-first-60-days-as-a-leader", categoryId: "engineering-leadership", seriesId: "first-leadership", navLabel: "最初の60日間" },
      { to: "/leadership-challenge-workbook-guide", categoryId: "engineering-leadership", seriesId: "first-leadership", navLabel: "Leadership Challenge" },
      { to: "/engineering-executive-playbook", categoryId: "engineering-leadership", seriesId: "exec-scale", navLabel: "統括責任者の手引き" },
      { to: "/elastic-leadership-guide", categoryId: "engineering-leadership", seriesId: "exec-scale", navLabel: "Elastic Leadership" },
      { to: "/developer-architect-communication-guide", categoryId: "engineering-leadership", seriesId: "exec-scale", navLabel: "開発者・アーキテクト" },
      { to: "/team-geek-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "Team Geek" },
      { to: "/debugging-teams-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "Debugging Teams" },
      { to: "/peopleware-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "Peopleware" },
      { to: "/radical-candor-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "Radical Candor" },
      { to: "/no-rules-rules-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "No Rules Rules" },
      { to: "/five-dysfunctions-of-a-team-guide", categoryId: "team-building", seriesId: "team-culture", navLabel: "5つの機能不全" },
      { to: "/team-topologies-guide", categoryId: "team-building", seriesId: "team-design", navLabel: "Team Topologies" },
      { to: "/dynamic-reteaming-guide", categoryId: "team-building", seriesId: "team-design", navLabel: "ダイナミック・リチーミング" },
      { to: "/lean-ux-beginner-guide", categoryId: "team-building", seriesId: "team-design", navLabel: "Lean UX 入門" },
    ]);
  });

  it("すべてのガイドが実在するカテゴリーに属する", () => {
    // 孤立ガイド（categoryId の打ち間違い）はグルーピングで黙って消えるため、
    // 表示側ではなくカタログ自身の契約として検知する。
    const categoryIds = GUIDE_CATEGORIES.map((category) => category.id);
    const orphans = GUIDES.filter((guide) => !categoryIds.includes(guide.categoryId));

    expect(orphans.map((guide) => guide.to)).toEqual([]);
  });

  it("すべてのシリーズが実在するカテゴリーに属する", () => {
    const categoryIds = GUIDE_CATEGORIES.map((category) => category.id);
    const orphans = GUIDE_SERIES.filter((series) => !categoryIds.includes(series.categoryId));

    expect(orphans.map((series) => series.id)).toEqual([]);
  });

  it("ガイドのシリーズは同一カテゴリーのものだけを指す（カテゴリー跨ぎ禁止）", () => {
    // カテゴリー跨ぎのシリーズ指定はグルーピングでガイドを消し、ナビから到達不能にする。
    const seriesCategory = new Map<string, string>(GUIDE_SERIES.map((series) => [series.id, series.categoryId]));
    const mismatched = GUIDES.filter(
      (guide) => guide.seriesId !== undefined && seriesCategory.get(guide.seriesId) !== guide.categoryId,
    );

    expect(mismatched.map((guide) => guide.to)).toEqual([]);
  });

  it("シリーズを持つカテゴリーでは、全ガイドがいずれかのシリーズに属する", () => {
    /*
     * seriesId の指定漏れは「ラベルの無いカラム」としてナビに黙って現れる。
     * 見た目が壊れないぶん気づきにくいため、カタログ自身の契約として落とす。
     */
    const categoriesWithSeries = new Set<string>(GUIDE_SERIES.map((series) => series.categoryId));
    const unassigned = GUIDES.filter(
      (guide) => categoriesWithSeries.has(guide.categoryId) && guide.seriesId === undefined,
    );

    expect(unassigned.map((guide) => guide.to)).toEqual([]);
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
        guides: ["CAPM 完全ガイド", "CAPM ドメイン1", "CAPM ドメイン2", "CAPM ドメイン3", "CAPM ドメイン4", "PMP 完全攻略", "PMP ドメイン1", "PMP ドメイン2", "PMP ドメイン3", "CSM 完全ガイド", "CSM 3つのアカウンタビリティ", "CSM Scrum理論", "CSM アーティファクト", "CSM スクラムイベント", "CSM コアコンピテンシー", "スクラム 97の知恵", "CAL1 完全ガイド", "CAL1 第1章", "CAL1 第2章", "CAL1 第3章", "CAL1 第4章", "CAL2 Part 1", "CAL2 完全ガイド", "AI-PM 実践ガイド"],
      },
      {
        id: "engineering-management",
        guides: ["EM キャリアパス", "EM 入門", "Managing Humans", "人月の神話", "High Output Management"],
      },
      {
        id: "engineering-leadership",
        guides: ["チームリード術", "リーダーの作法", "最初の60日間", "Leadership Challenge", "統括責任者の手引き", "Elastic Leadership", "開発者・アーキテクト"],
      },
      {
        id: "team-building",
        guides: ["Team Geek", "Debugging Teams", "Peopleware", "Radical Candor", "No Rules Rules", "5つの機能不全", "Team Topologies", "ダイナミック・リチーミング", "Lean UX 入門"],
      },
    ]);
  });

  it("カテゴリー内をシリーズ順・シリーズ内定義順でグルーピングする", () => {
    expect(groupGuidesByCategory().map((group) => ({
      id: group.category.id,
      seriesGroups: group.seriesGroups.map((seriesGroup) => ({
        seriesId: seriesGroup.series?.id ?? null,
        guides: seriesGroup.guides.map((guide) => guide.navLabel),
      })),
    }))).toEqual([
      {
        id: "project-management",
        seriesGroups: [
          { seriesId: "capm", guides: ["CAPM 完全ガイド", "CAPM ドメイン1", "CAPM ドメイン2", "CAPM ドメイン3", "CAPM ドメイン4"] },
          { seriesId: "pmp", guides: ["PMP 完全攻略", "PMP ドメイン1", "PMP ドメイン2", "PMP ドメイン3"] },
          { seriesId: "scrum", guides: ["CSM 完全ガイド", "CSM 3つのアカウンタビリティ", "CSM Scrum理論", "CSM アーティファクト", "CSM スクラムイベント", "CSM コアコンピテンシー", "スクラム 97の知恵", "CAL1 完全ガイド", "CAL1 第1章", "CAL1 第2章", "CAL1 第3章", "CAL1 第4章", "CAL2 Part 1", "CAL2 完全ガイド"] },
          { seriesId: "ai-pm", guides: ["AI-PM 実践ガイド"] },
        ],
      },
      {
        // シリーズ未定義のカテゴリーは、ラベル無しの 1 カラムへ収める（現行の見た目を維持）。
        id: "engineering-management",
        seriesGroups: [
          { seriesId: null, guides: ["EM キャリアパス", "EM 入門", "Managing Humans", "人月の神話", "High Output Management"] },
        ],
      },
      {
        id: "engineering-leadership",
        seriesGroups: [
          { seriesId: "first-leadership", guides: ["チームリード術", "リーダーの作法", "最初の60日間", "Leadership Challenge"] },
          { seriesId: "exec-scale", guides: ["統括責任者の手引き", "Elastic Leadership", "開発者・アーキテクト"] },
        ],
      },
      {
        id: "team-building",
        seriesGroups: [
          { seriesId: "team-culture", guides: ["Team Geek", "Debugging Teams", "Peopleware", "Radical Candor", "No Rules Rules", "5つの機能不全"] },
          { seriesId: "team-design", guides: ["Team Topologies", "ダイナミック・リチーミング", "Lean UX 入門"] },
        ],
      },
    ]);
  });

  it("seriesGroups を平坦化すると guides と順序込みで一致する", () => {
    // 片方だけを見て並べ替えると、ナビ（シリーズ順）とホーム（定義順）が食い違う。
    for (const group of groupGuidesByCategory()) {
      expect(group.seriesGroups.flatMap((seriesGroup) => seriesGroup.guides.map((guide) => guide.to)))
        .toEqual(group.guides.map((guide) => guide.to));
    }
  });

  it("グルーピングが全ガイドを漏れなく含む", () => {
    const grouped = groupGuidesByCategory().flatMap((group) => group.guides.map((guide) => guide.to));

    expect([...grouped].sort()).toEqual([...GUIDES.map((guide) => guide.to)].sort());
  });

  it("空のカテゴリーを作らない（ナビに空ドロップダウンを出さないため）", () => {
    expect(groupGuidesByCategory().filter((group) => group.guides.length === 0)).toEqual([]);
  });

  it("空のシリーズカラムを作らない（ナビに空カラムを出さないため）", () => {
    const emptyColumns = groupGuidesByCategory()
      .flatMap((group) => group.seriesGroups)
      .filter((seriesGroup) => seriesGroup.guides.length === 0);

    expect(emptyColumns).toEqual([]);
  });

  it("シリーズの表示ラベルを ID から引ける", () => {
    expect(seriesNavLabel("scrum")).toBe("Scrum / CSM");
    expect(seriesCardLabel("scrum")).toBe("SCRUM / CSM");
  });

  it("未定義のシリーズ ID は握りつぶさず例外にする", () => {
    // 型で防げない経路（外部データ・キャストの誤り）で黙って空文字を返さないこと。
    expect(() => seriesNavLabel("unknown" as never)).toThrow("未定義のガイドシリーズ: unknown");
    expect(() => seriesCardLabel("unknown" as never)).toThrow("未定義のガイドシリーズ: unknown");
  });
});
