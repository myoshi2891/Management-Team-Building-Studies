import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GuideProgramHub from "~/components/GuideProgramHub.vue";
import { GUIDES, GUIDE_PROGRAMS, programGroup } from "~/utils/guide-catalog";

const NuxtLinkStub = {
  props: { to: { type: String, required: true } },
  template: `<a :href="to"><slot /></a>`,
};

const mountHub = (programId: string) =>
  mount(GuideProgramHub, {
    props: { programId },
    global: { stubs: { NuxtLink: NuxtLinkStub, Icon: { template: "<span aria-hidden='true' />" } } },
  });

/*
 * ハブページはナビから移譲された「全ガイドの到達可能性」を担う。
 * ナビはもうガイドを列挙しないため、ここが登録漏れを検知する唯一の経路になる。
 */
describe("GuideProgramHub — プログラム単位のハブページ", () => {
  it("見出し・説明・パンくずでプログラムの位置を示す", () => {
    const wrapper = mountHub("scrum-alliance");

    expect(wrapper.get("h1").text()).toBe("Scrum Alliance 認定");
    expect(wrapper.get("[data-testid='hub-summary']").text()).toBe("CSM・CSPO・CSD・CAL の各体系");
    expect(wrapper.findAll("[data-testid='hub-breadcrumb'] a").map((link) => ({
      label: link.text(),
      href: link.attributes("href"),
    }))).toEqual([
      { label: "ホーム", href: "/" },
      { label: "資格で学ぶ", href: "/certifications" },
    ]);
  });

  it("シリーズ見出しと所属ガイドを順序込みで表示する", () => {
    const wrapper = mountHub("scrum-org");

    expect(wrapper.findAll("[data-testid='hub-series']").map((section) => ({
      heading: section.get("h2").text(),
      guides: section.findAll("[data-testid='guide-card'] h3").map((heading) => heading.text()),
    }))).toEqual([
      {
        heading: "スクラムマスター",
        guides: ["Professional Scrum Master™ - AI Essentials 完全ガイド"],
      },
      {
        heading: "プロダクトオーナー",
        guides: ["Professional Scrum Product Owner™(PSPO I / PSPO II)学習ガイド"],
      },
      {
        heading: "ディベロッパー",
        guides: ["Professional Scrum Developer(PSD I)認定資格 学習ガイド"],
      },
      {
        heading: "アジャイルリーダー",
        guides: ["PAL I(Professional Agile Leadership I)認定試験 学習ガイド"],
      },
      {
        heading: "ファシリテーション",
        guides: ["Professional Scrum Facilitation Skills™ 認定資格 完全対策ガイド"],
      },
      {
        heading: "カンバン",
        guides: ["Professional Scrum with Kanban(PSK I)認定資格 完全ガイド"],
      },
    ]);
  });

  it("ガイド件数を表示する", () => {
    expect(mountHub("pmi").get("[data-testid='hub-count']").text()).toBe("9 ガイド");
  });

  it("全プログラムを合わせると公開ガイド 61 本すべてへ到達できる（登録漏れの検知）", () => {
    /*
     * 弱い契約（件数一致のみ）にすると、同じガイドが 2 か所に出て 1 本消えた場合を素通しする。
     * 遷移先の集合と順序の双方をカタログと突き合わせる。
     */
    const reached = GUIDE_PROGRAMS.flatMap((program) =>
      mountHub(program.id)
        .findAll("[data-testid='guide-card'] a")
        .map((link) => link.attributes("href")),
    );

    expect(reached).toEqual(GUIDES.map((guide) => guide.to));
  });

  it("カードのラベルにシリーズ表記を使う", () => {
    // ハブの見出しがプログラム名なので、カードにはより細かいシリーズ表記を出す。
    const wrapper = mountHub("pmi");

    expect(wrapper.findAll("[data-testid='guide-card'] .guide-category").map((node) => node.text()))
      .toEqual(["CAPM", "CAPM", "CAPM", "CAPM", "CAPM", "PMP", "PMP", "PMP", "PMP"]);
  });

  it("見出し階層をスキップしない", () => {
    // h1 → h2（シリーズ）→ h3（カード）。段跳びはスクリーンリーダーの構造読みを壊す。
    const wrapper = mountHub("career");
    const levels = wrapper.findAll("h1, h2, h3").map((node) => Number(node.element.tagName[1]));

    expect(levels[0]).toBe(1);
    for (const [index, level] of levels.entries()) {
      if (index === 0) continue;
      expect(level - levels[index - 1]!).toBeLessThanOrEqual(1);
    }
  });

  it("未定義のプログラム ID は握りつぶさず例外にする", () => {
    expect(() => mountHub("unknown")).toThrow(/未定義のガイドプログラム/);
  });

  it("表示内容がカタログと一致する（表示側に別のデータ源を持たない）", () => {
    const group = programGroup("team");
    const wrapper = mountHub("team");

    expect(wrapper.findAll("[data-testid='guide-card'] h3").map((node) => node.text()))
      .toEqual(group.guides.map((guide) => guide.title));
  });
});
