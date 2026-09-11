import { describe, expect, it } from "vitest";
import {
  GUIDES,
  GUIDE_KINDS,
  GUIDE_PROGRAMS,
  GUIDE_SERIES,
  allSiteRoutes,
  findProgram,
  groupGuidesByKind,
  programCardLabel,
  programGroup,
  programNavLabel,
  programsOfKind,
  seriesCardLabel,
  seriesNavLabel,
} from "~/utils/guide-catalog";

/*
 * カタログは 4 階層（種別 → プログラム → シリーズ → ガイド）である。
 *
 * この形の目的はただ一つ、**グローバルナビの項目数をガイド総数から独立させる**こと。
 * ナビはプログラム（＝ハブページ）までしか列挙せず、ガイドの列挙はハブページが担う。
 * したがって「ガイドが何本増えてもナビは変わらない」が本ファイルの最重要契約になる。
 */
describe("utils/guide-catalog — ガイド定義の単一の真実の源", () => {
  it("種別を順序・遷移先・表示ラベルまで完全一致で固定する", () => {
    // 並び順がそのままグローバルナビのトリガー順・ホームのセクション順になる。
    expect(GUIDE_KINDS.map((kind) => ({
      id: kind.id,
      to: kind.to,
      navLabel: kind.navLabel,
      cardLabel: kind.cardLabel,
    }))).toEqual([
      { id: "certifications", to: "/certifications", navLabel: "資格で学ぶ", cardLabel: "CERTIFICATIONS" },
      { id: "books", to: "/books", navLabel: "書籍で学ぶ", cardLabel: "BOOKS" },
      { id: "practices", to: "/practices", navLabel: "テーマで学ぶ", cardLabel: "PRACTICES" },
    ]);
  });

  it("プログラムを順序・所属種別・遷移先・表示ラベルまで完全一致で固定する", () => {
    // 並び順がそのままナビのパネル内の行順・ハブページのカード順になる。
    expect(GUIDE_PROGRAMS.map((program) => ({
      id: program.id,
      kindId: program.kindId,
      to: program.to,
      navLabel: program.navLabel,
      cardLabel: program.cardLabel,
    }))).toEqual([
      { id: "pmi", kindId: "certifications", to: "/certifications/pmi", navLabel: "PMI 認定", cardLabel: "PMI" },
      { id: "scrum-alliance", kindId: "certifications", to: "/certifications/scrum-alliance", navLabel: "Scrum Alliance 認定", cardLabel: "SCRUM ALLIANCE" },
      { id: "scrum-org", kindId: "certifications", to: "/certifications/scrum-org", navLabel: "Scrum.org 認定", cardLabel: "SCRUM.ORG" },
      { id: "management", kindId: "books", to: "/books/management", navLabel: "マネジメント", cardLabel: "MANAGEMENT" },
      { id: "leadership", kindId: "books", to: "/books/leadership", navLabel: "リーダーシップ", cardLabel: "LEADERSHIP" },
      { id: "team", kindId: "books", to: "/books/team", navLabel: "チーム・組織文化", cardLabel: "TEAM CULTURE" },
      { id: "org-design", kindId: "books", to: "/books/org-design", navLabel: "チーム設計", cardLabel: "TEAM DESIGN" },
      { id: "product", kindId: "books", to: "/books/product", navLabel: "プロダクト・アジャイル", cardLabel: "PRODUCT & AGILE" },
      { id: "career", kindId: "practices", to: "/practices/career", navLabel: "役割とキャリア", cardLabel: "ROLE & CAREER" },
      { id: "ai", kindId: "practices", to: "/practices/ai", navLabel: "AI 活用", cardLabel: "AI IN PRACTICE" },
    ]);
  });

  it("シリーズを順序・所属プログラム・表示ラベルまで完全一致で固定する", () => {
    expect(GUIDE_SERIES.map((series) => ({
      id: series.id,
      programId: series.programId,
      navLabel: series.navLabel,
      cardLabel: series.cardLabel,
    }))).toEqual([
      { id: "capm", programId: "pmi", navLabel: "CAPM", cardLabel: "CAPM" },
      { id: "pmp", programId: "pmi", navLabel: "PMP", cardLabel: "PMP" },
      { id: "sa-scrum-master", programId: "scrum-alliance", navLabel: "スクラムマスター", cardLabel: "SCRUM MASTER" },
      { id: "sa-product-owner", programId: "scrum-alliance", navLabel: "プロダクトオーナー", cardLabel: "PRODUCT OWNER" },
      { id: "sa-developer", programId: "scrum-alliance", navLabel: "ディベロッパー", cardLabel: "DEVELOPER" },
      { id: "sa-agile-leader", programId: "scrum-alliance", navLabel: "アジャイルリーダー", cardLabel: "AGILE LEADER" },
      { id: "sa-facilitation", programId: "scrum-alliance", navLabel: "ファシリテーション・スケーリング", cardLabel: "FACILITATION & SCALING" },
      { id: "so-scrum-master", programId: "scrum-org", navLabel: "スクラムマスター", cardLabel: "SCRUM MASTER" },
      { id: "so-product-owner", programId: "scrum-org", navLabel: "プロダクトオーナー", cardLabel: "PRODUCT OWNER" },
      { id: "so-developer", programId: "scrum-org", navLabel: "ディベロッパー", cardLabel: "DEVELOPER" },
      { id: "so-agile-leader", programId: "scrum-org", navLabel: "アジャイルリーダー", cardLabel: "AGILE LEADER" },
      { id: "so-facilitation", programId: "scrum-org", navLabel: "ファシリテーション", cardLabel: "FACILITATION" },
      { id: "so-kanban", programId: "scrum-org", navLabel: "カンバン", cardLabel: "KANBAN" },
      { id: "so-scaling", programId: "scrum-org", navLabel: "スケーリング", cardLabel: "SCALING" },
      { id: "book-management", programId: "management", navLabel: "マネジメントの原典", cardLabel: "MANAGEMENT CLASSICS" },
      { id: "book-leadership", programId: "leadership", navLabel: "リーダーシップの実践", cardLabel: "LEADERSHIP PRACTICE" },
      { id: "book-team", programId: "team", navLabel: "チームづくり", cardLabel: "TEAM BUILDING" },
      { id: "book-org-design", programId: "org-design", navLabel: "チーム構造の設計", cardLabel: "TEAM STRUCTURE" },
      { id: "book-product", programId: "product", navLabel: "プロダクト開発", cardLabel: "PRODUCT DEVELOPMENT" },
      { id: "practice-start", programId: "career", navLabel: "リーダーの立ち上がり", cardLabel: "FIRST LEADERSHIP" },
      { id: "practice-collaboration", programId: "career", navLabel: "役割間の協働", cardLabel: "COLLABORATION" },
      { id: "practice-ai", programId: "ai", navLabel: "AI 駆動の実務", cardLabel: "AI-DRIVEN PRACTICE" },
    ]);
  });

  it("公開ガイドを順序・遷移先・プログラム・シリーズ・ナビ表記まで完全一致で固定する", () => {
    /*
     * 並び順は「種別順（GUIDE_KINDS）→ プログラム順（GUIDE_PROGRAMS）
     * → シリーズ順（GUIDE_SERIES）→ 定義順」。
     * この不変条件により programGroups / seriesGroups を平坦化した結果が guides と一致し、
     * ナビ・ホーム・ハブページで並び順が多重管理にならない。
     */
    expect(GUIDES.map((guide) => ({
      to: guide.to,
      programId: guide.programId,
      seriesId: guide.seriesId,
      navLabel: guide.navLabel,
    }))).toEqual([
      { to: "/capm", programId: "pmi", seriesId: "capm", navLabel: "CAPM 完全ガイド" },
      { to: "/certified-associate-in-project-management-domain1", programId: "pmi", seriesId: "capm", navLabel: "CAPM ドメイン1" },
      { to: "/certified-associate-in-project-management-domain2", programId: "pmi", seriesId: "capm", navLabel: "CAPM ドメイン2" },
      { to: "/capm-domain3-agile-frameworks-guide", programId: "pmi", seriesId: "capm", navLabel: "CAPM ドメイン3" },
      { to: "/capm-domain4-business-analysis-frameworks", programId: "pmi", seriesId: "capm", navLabel: "CAPM ドメイン4" },
      { to: "/pmp-certification-guide", programId: "pmi", seriesId: "pmp", navLabel: "PMP 完全攻略" },
      { to: "/pmp-domain1-people-guide", programId: "pmi", seriesId: "pmp", navLabel: "PMP ドメイン1" },
      { to: "/pmp-domain2-process-guide", programId: "pmi", seriesId: "pmp", navLabel: "PMP ドメイン2" },
      { to: "/pmp-domain3-business-environment-guide", programId: "pmi", seriesId: "pmp", navLabel: "PMP ドメイン3" },
      { to: "/csm-certified-scrummaster-guide", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM 完全ガイド" },
      { to: "/csm-scrum-team-3-accountabilities", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM 3つのアカウンタビリティ" },
      { to: "/csm-scrum-theory-guide", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM Scrum理論" },
      { to: "/csm-scrum-artifacts-and-commitments", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM アーティファクト" },
      { to: "/scrum-events-csm-guide", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM スクラムイベント" },
      { to: "/csm-scrum-master-core-competencies", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSM コアコンピテンシー" },
      { to: "/a-csm-advanced-certified-scrummaster-study-guide", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "A-CSM 完全ガイド" },
      { to: "/csp-sm-certified-scrum-professional-scrummaster-study-guide", programId: "scrum-alliance", seriesId: "sa-scrum-master", navLabel: "CSP-SM 完全ガイド" },
      { to: "/cspo-certified-scrum-product-owner-study-guide", programId: "scrum-alliance", seriesId: "sa-product-owner", navLabel: "CSPO 完全ガイド" },
      { to: "/a-cspo-advanced-certified-scrum-product-owner-study-guide", programId: "scrum-alliance", seriesId: "sa-product-owner", navLabel: "A-CSPO 完全ガイド" },
      { to: "/csp-po-certified-scrum-professional-product-owner-study-guide", programId: "scrum-alliance", seriesId: "sa-product-owner", navLabel: "CSP-PO 完全ガイド" },
      { to: "/csd-certified-scrum-developer-study-guide", programId: "scrum-alliance", seriesId: "sa-developer", navLabel: "CSD 完全ガイド" },
      { to: "/a-csd-advanced-certified-scrum-developer-study-guide", programId: "scrum-alliance", seriesId: "sa-developer", navLabel: "A-CSD 完全ガイド" },
      { to: "/csp-d-certified-scrum-professional-developer-study-guide", programId: "scrum-alliance", seriesId: "sa-developer", navLabel: "CSP-D 完全ガイド" },
      { to: "/cal1-certified-agile-leader-1-guide", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL1 完全ガイド" },
      { to: "/the-case-for-agile-leadership", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL1 第1章" },
      { to: "/agile-leadership-in-action", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL1 第2章" },
      { to: "/cal1-chapter3-leading-agile-teams", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL1 第3章" },
      { to: "/cal1-chapter4-leading-agile-organizations", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL1 第4章" },
      { to: "/cal2-part1-organizational-strategy-and-delivery", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL2 Part 1" },
      { to: "/cal2-part2-developing-as-a-leader", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL2 Part 2" },
      { to: "/cal2-certified-agile-leader-2-study-guide", programId: "scrum-alliance", seriesId: "sa-agile-leader", navLabel: "CAL2 完全ガイド" },
      { to: "/caf-certified-agile-facilitator-study-guide", programId: "scrum-alliance", seriesId: "sa-facilitation", navLabel: "CAF 完全ガイド" },
      { to: "/casp-certified-agile-scaling-practitioner-study-guide", programId: "scrum-alliance", seriesId: "sa-facilitation", navLabel: "CASP 完全ガイド" },
      { to: "/psm-ai-essentials-guide", programId: "scrum-org", seriesId: "so-scrum-master", navLabel: "PSM-AI 完全ガイド" },
      { to: "/professional-scrum-product-owner", programId: "scrum-org", seriesId: "so-product-owner", navLabel: "PSPO 完全ガイド" },
      { to: "/professional-scrum-developer", programId: "scrum-org", seriesId: "so-developer", navLabel: "PSD 完全ガイド" },
      { to: "/pal-i-study-guide", programId: "scrum-org", seriesId: "so-agile-leader", navLabel: "PAL I 完全ガイド" },
      { to: "/professional-scrum-facilitation-skills", programId: "scrum-org", seriesId: "so-facilitation", navLabel: "PSFS 完全ガイド" },
      { to: "/professional-scrum-with-kanban", programId: "scrum-org", seriesId: "so-kanban", navLabel: "PSK 完全ガイド" },
      { to: "/scaled-professional-scrum-guide", programId: "scrum-org", seriesId: "so-scaling", navLabel: "SPS 完全ガイド" },
      { to: "/high-output-management-guide", programId: "management", seriesId: "book-management", navLabel: "High Output Management" },
      { to: "/an-elegant-puzzle-guide", programId: "management", seriesId: "book-management", navLabel: "An Elegant Puzzle" },
      { to: "/managing-humans-best-practices-guide", programId: "management", seriesId: "book-management", navLabel: "Managing Humans" },
      { to: "/mythical-man-month-guide", programId: "management", seriesId: "book-management", navLabel: "人月の神話" },
      { to: "/engineering-manager-guide", programId: "management", seriesId: "book-management", navLabel: "EM 入門" },
      { to: "/engineering-executive-playbook", programId: "leadership", seriesId: "book-leadership", navLabel: "統括責任者の手引き" },
      { to: "/elastic-leadership-guide", programId: "leadership", seriesId: "book-leadership", navLabel: "Elastic Leadership" },
      { to: "/leadership-challenge-workbook-guide", programId: "leadership", seriesId: "book-leadership", navLabel: "Leadership Challenge" },
      { to: "/radical-candor-guide", programId: "leadership", seriesId: "book-leadership", navLabel: "Radical Candor" },
      { to: "/team-geek-guide", programId: "team", seriesId: "book-team", navLabel: "Team Geek" },
      { to: "/debugging-teams-guide", programId: "team", seriesId: "book-team", navLabel: "Debugging Teams" },
      { to: "/peopleware-guide", programId: "team", seriesId: "book-team", navLabel: "Peopleware" },
      { to: "/no-rules-rules-guide", programId: "team", seriesId: "book-team", navLabel: "No Rules Rules" },
      { to: "/five-dysfunctions-of-a-team-guide", programId: "team", seriesId: "book-team", navLabel: "5つの機能不全" },
      { to: "/team-topologies-guide", programId: "org-design", seriesId: "book-org-design", navLabel: "Team Topologies" },
      { to: "/dynamic-reteaming-guide", programId: "org-design", seriesId: "book-org-design", navLabel: "ダイナミック・リチーミング" },
      { to: "/lean-ux-beginner-guide", programId: "product", seriesId: "book-product", navLabel: "Lean UX 入門" },
      { to: "/scrum-97-things-guide", programId: "product", seriesId: "book-product", navLabel: "スクラム 97の知恵" },
      { to: "/engineering-management-career-path", programId: "career", seriesId: "practice-start", navLabel: "EM キャリアパス" },
      { to: "/engineering-team-leadership-guide", programId: "career", seriesId: "practice-start", navLabel: "チームリード術" },
      { to: "/leadership-practices-guide", programId: "career", seriesId: "practice-start", navLabel: "リーダーの作法" },
      { to: "/your-first-60-days-as-a-leader", programId: "career", seriesId: "practice-start", navLabel: "最初の60日間" },
      { to: "/developer-architect-communication-guide", programId: "career", seriesId: "practice-collaboration", navLabel: "開発者・アーキテクト" },
      { to: "/ai-driven-project-management-guide", programId: "ai", seriesId: "practice-ai", navLabel: "AI-PM 実践ガイド" },
    ]);
  });

  it("すべてのガイドが実在するプログラムに属する", () => {
    // 孤立ガイド（programId の打ち間違い）はグルーピングで黙って消え、どこからも到達できなくなる。
    const programIds = GUIDE_PROGRAMS.map((program) => program.id);
    const orphans = GUIDES.filter((guide) => !programIds.includes(guide.programId));

    expect(orphans.map((guide) => guide.to)).toEqual([]);
  });

  it("すべてのプログラムが実在する種別に属する", () => {
    const kindIds = GUIDE_KINDS.map((kind) => kind.id);
    const orphans = GUIDE_PROGRAMS.filter((program) => !kindIds.includes(program.kindId));

    expect(orphans.map((program) => program.id)).toEqual([]);
  });

  it("すべてのシリーズが実在するプログラムに属する", () => {
    const programIds = GUIDE_PROGRAMS.map((program) => program.id);
    const orphans = GUIDE_SERIES.filter((series) => !programIds.includes(series.programId));

    expect(orphans.map((series) => series.id)).toEqual([]);
  });

  it("ガイドのシリーズは同一プログラムのものだけを指す（プログラム跨ぎ禁止）", () => {
    // プログラム跨ぎの指定はハブページでガイドを消し、到達不能にする。
    const seriesProgram = new Map<string, string>(GUIDE_SERIES.map((series) => [series.id, series.programId]));
    const mismatched = GUIDES.filter((guide) => seriesProgram.get(guide.seriesId) !== guide.programId);

    expect(mismatched.map((guide) => guide.to)).toEqual([]);
  });

  it("ハブのルートが種別のルート配下に一貫して並ぶ", () => {
    /*
     * ハブは種別ディレクトリ配下（/certifications/pmi など）に置く。
     * 1 セグメントの動的ルートは既存のガイドルート（/capm 等）と衝突し 404 を食い潰すため、
     * この前置きを崩してはならない。
     */
    const kindRoute = new Map<string, string>(GUIDE_KINDS.map((kind) => [kind.id, kind.to]));
    const misplaced = GUIDE_PROGRAMS.filter(
      (program) => program.to !== `${kindRoute.get(program.kindId)}/${program.id}`,
    );

    expect(misplaced.map((program) => program.id)).toEqual([]);
  });

  it("サイト内のルートが重複しない（ガイド・ハブ・種別インデックスを通して）", () => {
    // ハブのルートが既存ガイドのルートと衝突すると、どちらか一方が静かに到達不能になる。
    const routes = allSiteRoutes();

    expect(routes).toEqual([...new Set(routes)]);
  });

  it("巡回対象のルートをホーム・種別・ハブ・全ガイドの順に列挙する", () => {
    // e2e の横スクロール禁止はこの列挙を対象にする。漏れたルートは実測されない。
    expect(allSiteRoutes()).toEqual([
      "/",
      ...GUIDE_KINDS.map((kind) => kind.to),
      ...GUIDE_PROGRAMS.map((program) => program.to),
      ...GUIDES.map((guide) => guide.to),
    ]);
    expect(allSiteRoutes()).toHaveLength(1 + 3 + 10 + 64);
  });

  it("種別順・種別内定義順でグルーピングする", () => {
    expect(groupGuidesByKind().map((group) => ({
      id: group.kind.id,
      count: group.guides.length,
      programs: group.programGroups.map((programGroupItem) => programGroupItem.program.id),
    }))).toEqual([
      { id: "certifications", count: 40, programs: ["pmi", "scrum-alliance", "scrum-org"] },
      { id: "books", count: 18, programs: ["management", "leadership", "team", "org-design", "product"] },
      { id: "practices", count: 6, programs: ["career", "ai"] },
    ]);
  });

  it("プログラム内をシリーズ順・シリーズ内定義順でグルーピングする", () => {
    expect(groupGuidesByKind().flatMap((group) => group.programGroups.map((programGroupItem) => ({
      programId: programGroupItem.program.id,
      seriesGroups: programGroupItem.seriesGroups.map((seriesGroupItem) => ({
        seriesId: seriesGroupItem.series.id,
        guides: seriesGroupItem.guides.map((guide) => guide.navLabel),
      })),
    })))).toEqual([
      {
        programId: "pmi",
        seriesGroups: [
          { seriesId: "capm", guides: ["CAPM 完全ガイド", "CAPM ドメイン1", "CAPM ドメイン2", "CAPM ドメイン3", "CAPM ドメイン4"] },
          { seriesId: "pmp", guides: ["PMP 完全攻略", "PMP ドメイン1", "PMP ドメイン2", "PMP ドメイン3"] },
        ],
      },
      {
        programId: "scrum-alliance",
        seriesGroups: [
          { seriesId: "sa-scrum-master", guides: ["CSM 完全ガイド", "CSM 3つのアカウンタビリティ", "CSM Scrum理論", "CSM アーティファクト", "CSM スクラムイベント", "CSM コアコンピテンシー", "A-CSM 完全ガイド", "CSP-SM 完全ガイド"] },
          { seriesId: "sa-product-owner", guides: ["CSPO 完全ガイド", "A-CSPO 完全ガイド", "CSP-PO 完全ガイド"] },
          { seriesId: "sa-developer", guides: ["CSD 完全ガイド", "A-CSD 完全ガイド", "CSP-D 完全ガイド"] },
          { seriesId: "sa-agile-leader", guides: ["CAL1 完全ガイド", "CAL1 第1章", "CAL1 第2章", "CAL1 第3章", "CAL1 第4章", "CAL2 Part 1", "CAL2 Part 2", "CAL2 完全ガイド"] },
          { seriesId: "sa-facilitation", guides: ["CAF 完全ガイド", "CASP 完全ガイド"] },
        ],
      },
      {
        programId: "scrum-org",
        seriesGroups: [
          { seriesId: "so-scrum-master", guides: ["PSM-AI 完全ガイド"] },
          { seriesId: "so-product-owner", guides: ["PSPO 完全ガイド"] },
          { seriesId: "so-developer", guides: ["PSD 完全ガイド"] },
          { seriesId: "so-agile-leader", guides: ["PAL I 完全ガイド"] },
          { seriesId: "so-facilitation", guides: ["PSFS 完全ガイド"] },
          { seriesId: "so-kanban", guides: ["PSK 完全ガイド"] },
          { seriesId: "so-scaling", guides: ["SPS 完全ガイド"] },
        ],
      },
      {
        programId: "management",
        seriesGroups: [
          { seriesId: "book-management", guides: ["High Output Management", "An Elegant Puzzle", "Managing Humans", "人月の神話", "EM 入門"] },
        ],
      },
      {
        programId: "leadership",
        seriesGroups: [
          { seriesId: "book-leadership", guides: ["統括責任者の手引き", "Elastic Leadership", "Leadership Challenge", "Radical Candor"] },
        ],
      },
      {
        programId: "team",
        seriesGroups: [
          { seriesId: "book-team", guides: ["Team Geek", "Debugging Teams", "Peopleware", "No Rules Rules", "5つの機能不全"] },
        ],
      },
      {
        programId: "org-design",
        seriesGroups: [
          { seriesId: "book-org-design", guides: ["Team Topologies", "ダイナミック・リチーミング"] },
        ],
      },
      {
        programId: "product",
        seriesGroups: [
          { seriesId: "book-product", guides: ["Lean UX 入門", "スクラム 97の知恵"] },
        ],
      },
      {
        programId: "career",
        seriesGroups: [
          { seriesId: "practice-start", guides: ["EM キャリアパス", "チームリード術", "リーダーの作法", "最初の60日間"] },
          { seriesId: "practice-collaboration", guides: ["開発者・アーキテクト"] },
        ],
      },
      {
        programId: "ai",
        seriesGroups: [
          { seriesId: "practice-ai", guides: ["AI-PM 実践ガイド"] },
        ],
      },
    ]);
  });

  it("programGroups / seriesGroups を平坦化すると guides と順序込みで一致する", () => {
    // 片方だけを見て並べ替えると、ハブ（シリーズ順）とホーム（定義順）が食い違う。
    for (const group of groupGuidesByKind()) {
      expect(group.programGroups.flatMap((programGroupItem) => programGroupItem.guides.map((guide) => guide.to)))
        .toEqual(group.guides.map((guide) => guide.to));

      for (const programGroupItem of group.programGroups) {
        expect(programGroupItem.seriesGroups.flatMap((seriesGroupItem) => seriesGroupItem.guides.map((guide) => guide.to)))
          .toEqual(programGroupItem.guides.map((guide) => guide.to));
      }
    }
  });

  it("グルーピングが全ガイドを漏れなく含む", () => {
    const grouped = groupGuidesByKind().flatMap((group) => group.guides.map((guide) => guide.to));

    expect([...grouped].sort()).toEqual([...GUIDES.map((guide) => guide.to)].sort());
  });

  it("空の種別・空のプログラム・空のシリーズを作らない", () => {
    /*
     * 空のハブページは「リンクを踏んだのに何も無い」状態になる。
     * ナビはガイドを列挙しないため、この破綻は表示側では気づけない。ここで落とす。
     */
    const groups = groupGuidesByKind();

    expect(groups.filter((group) => group.guides.length === 0)).toEqual([]);
    expect(groups.flatMap((group) => group.programGroups).filter((item) => item.guides.length === 0)).toEqual([]);
    expect(
      groups
        .flatMap((group) => group.programGroups)
        .flatMap((item) => item.seriesGroups)
        .filter((item) => item.guides.length === 0),
    ).toEqual([]);
  });

  it("定義済みのプログラム・シリーズがすべて 1 件以上のガイドを持つ", () => {
    // グルーピングは空を除外するため、定義側に残った死んだ ID は上の契約では見えない。
    const usedPrograms = new Set(GUIDES.map((guide) => guide.programId));
    const usedSeries = new Set(GUIDES.map((guide) => guide.seriesId));

    expect(GUIDE_PROGRAMS.filter((program) => !usedPrograms.has(program.id)).map((program) => program.id)).toEqual([]);
    expect(GUIDE_SERIES.filter((series) => !usedSeries.has(series.id)).map((series) => series.id)).toEqual([]);
  });

  /*
   * 1 種別あたりのプログラム数の上限。
   *
   * これは**グローバルナビのパネルに並ぶ行数**そのものである。ガイドが何本増えても
   * ここは増えないのが 4 階層モデルの要点であり、増えるのは新しい認定団体・
   * 書籍テーマが現れたときだけ。超えたら閾値ではなく種別の粒度を見直すこと。
   */
  const MAX_PROGRAMS_PER_KIND = 8;

  /*
   * 1 プログラムあたりのシリーズ数の上限。
   * ハブページの小見出し数であり、縦スクロールできるぶんナビより緩い。
   * 超える場合はプログラム自体を分ける（例: Scrum.org を役割別に割る）。
   */
  const MAX_SERIES_PER_PROGRAM = 8;

  it("1 種別のプログラム数が上限を超えない（ナビのパネルが縦に肥大しない）", () => {
    const oversized = groupGuidesByKind()
      .map((group) => ({ kind: group.kind.id, programs: group.programGroups.length }))
      .filter((group) => group.programs > MAX_PROGRAMS_PER_KIND);

    expect(oversized).toEqual([]);
  });

  it("1 プログラムのシリーズ数が上限を超えない（ハブページの小見出しが増えすぎない）", () => {
    const oversized = groupGuidesByKind()
      .flatMap((group) => group.programGroups)
      .map((item) => ({ program: item.program.id, series: item.seriesGroups.length }))
      .filter((item) => item.series > MAX_SERIES_PER_PROGRAM);

    expect(oversized).toEqual([]);
  });

  it("ナビに出る項目数がガイド総数に依存しない", () => {
    /*
     * 4 階層モデルの存在理由そのものの契約。
     *
     * ナビはプログラムまでしか列挙しないので、パネルの行数はガイド件数と無関係でなければ
     * ならない。ここが崩れたら、旧メガメニューと同じ「増え続けて破綻する」構造に戻っている。
     */
    const navItemCount = groupGuidesByKind()
      .reduce((total, group) => total + group.programGroups.length, 0);

    expect(navItemCount).toBe(GUIDE_PROGRAMS.length);
    expect(navItemCount).toBeLessThan(GUIDES.length);
  });

  it("プログラム単位のグルーピングを ID から引ける", () => {
    const group = programGroup("scrum-org");

    expect(group.program.navLabel).toBe("Scrum.org 認定");
    expect(group.guides.map((guide) => guide.navLabel)).toEqual(["PSM-AI 完全ガイド", "PSPO 完全ガイド", "PSD 完全ガイド", "PAL I 完全ガイド", "PSFS 完全ガイド", "PSK 完全ガイド", "SPS 完全ガイド"]);
    expect(group.seriesGroups.map((item) => item.series.id)).toEqual(["so-scrum-master", "so-product-owner", "so-developer", "so-agile-leader", "so-facilitation", "so-kanban", "so-scaling"]);
  });

  it("種別に属するプログラムを順序込みで引ける", () => {
    expect(programsOfKind("books").map((program) => program.id))
      .toEqual(["management", "leadership", "team", "org-design", "product"]);
  });

  it("表示ラベルを ID から引ける", () => {
    expect(programNavLabel("pmi")).toBe("PMI 認定");
    expect(programCardLabel("pmi")).toBe("PMI");
    expect(seriesNavLabel("sa-scrum-master")).toBe("スクラムマスター");
    expect(seriesCardLabel("sa-scrum-master")).toBe("SCRUM MASTER");
  });

  it("未定義の ID は握りつぶさず例外にする", () => {
    // 表示側で空文字にすると、ラベルの無い項目としてナビ・ハブへ黙って現れる。
    expect(() => findProgram("unknown" as never)).toThrow(/未定義のガイドプログラム/);
    expect(() => programGroup("unknown" as never)).toThrow(/未定義のガイドプログラム/);
    expect(() => seriesNavLabel("unknown" as never)).toThrow(/未定義のガイドシリーズ/);
  });
});
