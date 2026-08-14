// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
//   見出し配列: audit_source_parity.mjs --emit-headings の出力を貼り付け
//   その他:     同じ正規化規則で抽出したもの
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { MERMAID_DIAGRAM_DECLARATION } from "../../.claude/skills/fix-mermaid/scripts/mermaid-diagram-types.mjs";
import Page from "~/pages/capm.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAPM® 認定資格 完全ガイド",
] as const;

const EXPECTED_H2 = [
  "CAPMとは何か",
  "認定資格取得までのロードマップ(5ステップ)",
  "受験資格(Eligibility Requirements)",
  "試験の概要(フォーマット・出題形式)",
  "試験内容概要(ECO)とドメイン別出題比率",
  "プロジェクトマネジメントの基礎と主要概念",
  "予測型・計画重視の手法",
  "アジャイルフレームワーク・手法",
  "ビジネス分析フレームワーク",
  "用語集(初学者向けグロッサリー)",
  "試験当日の心得とリテイクポリシー",
  "資格維持(CCRプログラムとPDU)",
  "学習ロードマップ例(6週間プラン)",
  "まとめ",
  "参考文献・出典(Sources)",
] as const;

const EXPECTED_H3 = [
  "CAPM取得で目指せるキャリアパス",
  "CAPMとPMBOK® Guideの関係",
  "23時間の教育要件を満たす方法",
  "申請処理",
  "試験の基本情報",
  "出題形式(5種類)",
  "ドメイン別出題比率",
  "ドメインとPMI標準文書の対応関係",
  "タスク構成",
  "主要概念の解説(初学者向け)",
  "タスク構成",
  "主要概念の解説(初学者向け)",
  "タスク構成",
  "主要概念の解説(初学者向け)",
  "タスク構成",
  "ビジネス分析の基本プロセスフロー",
  "主要概念の解説(初学者向け)",
  "予測型・適応型アプローチにおけるBAの役割の違い",
  "試験当日の心得(ベストプラクティス)",
  "リテイク(再受験)ポリシー",
  "PMI公式(CAPM関連)",
  "PMI公式標準・実務ガイド",
  "PMI倫理綱領",
  "アジャイル関連の公式ソース",
  "その他",
] as const;

const EXPECTED_H4 = [
  "プロジェクト・プログラム・ポートフォリオの違い",
  "プロジェクトと定常業務(オペレーション)の違い",
  "予測型アプローチと適応型アプローチの違い",
  "課題・リスク・前提・制約の違い",
  "PMI倫理綱領(Code of Ethics and Professional Conduct)",
  "リーダーシップとマネジメントの違い",
  "感情的知性(EQ)",
  "組織構造と予測型アプローチの適合性",
  "WBS(Work Breakdown Structure: 作業分解構成図)",
  "クリティカルパス法(Critical Path Method, CPM)",
  "スケジュール差異とコスト差異の計算(EVM基礎)",
  "品質マネジメント計画とプロジェクトマネジメント計画",
  "アジャイルの基本思想",
  "予測型 vs 適応型のメリット・デメリット比較",
  "イテレーション計画とWBSの変換",
  "代表的な適応型(アジャイル)フレームワークの比較",
  "Scrumのサイクル",
  "Kanbanのフロー",
  "タスクの優先順位付け",
  "ステークホルダーの役割の違い",
  "要求収集の技法とシナリオのマッチング",
  "要求トレーサビリティマトリクス(RTM: Requirements Traceability Matrix)",
  "プロダクトロードマップとリリース計画",
  "受け入れ基準とプロダクト/プロジェクトの提供準備の判断",
] as const;

const EXPECTED_H5 = [
] as const;

const EXPECTED_H6 = [
] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart TB\nA[\"ステップ1 受験資格の確認と学習準備\"] --> B[\"ステップ2 申請書の作成と提出\"]\nB --> C[\"ステップ3 受験料の支払いと試験予約\"]\nC --> D[\"ステップ4 試験対策の学習\"]\nD --> E[\"ステップ5 試験本番\"]\n\nclassDef step fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E step;",
  "flowchart LR\nQ[\"CAPM試験の出題形式\"] --> Q1[\"多肢選択式\"]\nQ --> Q2[\"ドラッグアンドドロップ\"]\nQ --> Q3[\"ホットスポット\"]\nQ --> Q4[\"アニメーション動画\"]\nQ --> Q5[\"コミックストリップ\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass Q hub;\nclass Q1,Q2,Q3,Q4,Q5 box;",
  "pie showData\ntitle CAPM試験 ドメイン別出題比率\n\"ドメイン1 PM基礎と主要概念\" : 36\n\"ドメイン2 予測型計画重視の手法\" : 17\n\"ドメイン3 アジャイルフレームワーク手法\" : 20\n\"ドメイン4 ビジネス分析フレームワーク\" : 27",
  "flowchart TB\nPF[\"ポートフォリオ 組織戦略に沿って管理される集合\"] --> PG[\"プログラム 関連する複数プロジェクトの調整管理\"]\nPF --> PJ3[\"単独プロジェクトC\"]\nPG --> PJ1[\"プロジェクトA\"]\nPG --> PJ2[\"プロジェクトB\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass PF,PG,PJ1,PJ2,PJ3 box;",
  "flowchart TB\nS[\"プロジェクトスコープ\"] --> D1[\"デリバラブル1\"]\nS --> D2[\"デリバラブル2\"]\nD1 --> W1[\"ワークパッケージ1-1\"]\nD1 --> W2[\"ワークパッケージ1-2\"]\nD2 --> W3[\"ワークパッケージ2-1\"]\nD2 --> W4[\"ワークパッケージ2-2\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass S,D1,D2,W1,W2,W3,W4 box;",
  "flowchart LR\nPB[\"プロダクトバックログ\"] --> SP[\"スプリントプランニング\"]\nSP --> SB[\"スプリントバックログ\"]\nSB --> DS[\"デイリースクラム\"]\nDS --> INC[\"インクリメント\"]\nINC --> SR[\"スプリントレビュー\"]\nSR --> RETRO[\"スプリントレトロスペクティブ\"]\nRETRO --> SP\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass PB,SP,SB,DS,INC,SR,RETRO box;",
  "flowchart LR\nBL[\"バックログ\"] --> TODO[\"To Do WIP制限あり\"]\nTODO --> DOING[\"進行中 WIP制限あり\"]\nDOING --> REVIEW[\"レビュー WIP制限あり\"]\nREVIEW --> DONE[\"完了\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass BL,TODO,DOING,REVIEW box;\nclass DONE done;",
  "flowchart LR\nE[\"要求の引き出し\"] --> A[\"分析\"]\nA --> DOC[\"文書化\"]\nDOC --> V[\"妥当性確認\"]\nV --> M[\"管理とトレーサビリティ\"]\nM -.->|\"継続的なフィードバック\"| E\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass E,A,DOC,V,M box;",
  "flowchart TB\nW1[\"Week1 ドメイン1 PM基礎と主要概念\"] --> W2[\"Week2 ドメイン1後半とドメイン2前半\"]\nW2 --> W3[\"Week3 ドメイン2 WBSとCPM\"]\nW3 --> W4[\"Week4 ドメイン3 アジャイル手法比較\"]\nW4 --> W5[\"Week5 ドメイン4 ビジネス分析\"]\nW5 --> W6[\"Week6 総復習と模擬試験\"]\n\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass W1,W2,W3,W4,W5,W6 box;",
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.pmi.org/certifications/certified-associate-capm",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf",
  "https://www.pmi.org/dcpdp/sku/el068",
  "https://www.pmi.org/learning/authorized-training-partners",
  "https://www.pmi.org/about/ethics/guidelines",
  "https://www.pmi.org/-/media/pmi/documents/public/pdf/ethics/pmi-code-of-ethics.pdf",
  "https://www.pmi.org/standards/pmbok",
  "https://www.pmi.org/standards",
  "https://www.pmi.org/standards/agile",
  "https://scrumguides.org/",
  "https://kanban.university/kanban-guide/",
  "https://framework.scaledagile.com/",
  "https://agilemanifesto.org/",
  "https://agilemanifesto.org/principles.html",
  "https://www.pmi.org/standards/business-analysis",
  "https://www.pmi.org/standards/business-analysis-second-edition",
  "https://www.pmi.org/certifications/certification-resources/maintain",
  "https://ccrs.pmi.org/",
  "https://www.forbes.com/advisor/education/certifications/capm-certification-salary/",
] as const;

const EXPECTED_TOC_IDS = [
  "what-is-capm",
  "roadmap",
  "eligibility",
  "exam-format",
  "eco-overview",
  "domain1",
  "domain2",
  "domain3",
  "domain4",
  "glossary",
  "exam-day",
  "ccr",
  "study-plan",
  "summary",
  "references",
] as const;

const EXPECTED_SECTION_EYEBROWS = [
  "SECTION 01", "SECTION 02", "SECTION 03", "SECTION 04", "SECTION 05",
  "SECTION 06", "SECTION 07", "SECTION 08", "SECTION 09", "SECTION 10",
  "SECTION 11", "SECTION 12", "SECTION 13", "SECTION 14", "SECTION 15",
] as const;

/** 原本の `.callout.<variant>` の出現数。variant 名は原本のクラス名をそのまま使う。 */
const EXPECTED_CALLOUT_VARIANTS = { practice: 10, source: 11, note: 1 } as const;

const EXPECTED_CALLOUT_LABELS = ["ベストプラクティス", "ソース", "補足"] as const;

const EXPECTED_STEP_TAGS = ["1", "2", "3", "4", "5"] as const;

const EXPECTED_DOMAIN_TAGS = [
  "ドメイン1 · 36%",
  "ドメイン2 · 17%",
  "ドメイン3 · 20%",
  "ドメイン4 · 27%",
] as const;

/** 図解ラッパー内の MermaidDiagram を素の <pre> に置換して chart 値を読み取る。 */
const MermaidStub = {
  props: { chart: { type: String, required: true } },
  template: `<pre data-testid="mermaid">{{ chart }}</pre>`,
};

const mountPage = () =>
  mount(Page, {
    global: {
      stubs: {
        // ClientOnly を素通しにしないと図解が 0 件になる。
        ClientOnly: { template: "<div><slot /></div>" },
        MermaidDiagram: MermaidStub,
      },
    },
  });

/** 末尾スラッシュの有無を吸収して URL を比較する。 */
const normalizeUrl = (url: string) => url.replace(/\/$/, "");

function texts(wrapper: ReturnType<typeof mountPage>, selector: string): string[] {
  return wrapper.findAll(selector).map((el) => el.text().trim());
}

describe("pages/capm.vue — 原本照合契約 (S)", () => {
  it("S-1: h2 が原本と完全一致する（順序込み）", () => {
    expect(texts(mountPage(), "h2")).toEqual([...EXPECTED_H2]);
  });

  it("S-2: h3 が原本と完全一致する（順序込み）", () => {
    expect(texts(mountPage(), "h3")).toEqual([...EXPECTED_H3]);
  });

  it("S-2b: h4 が原本と完全一致する（順序込み）", () => {
    expect(texts(mountPage(), "h4")).toEqual([...EXPECTED_H4]);
  });

  it("S-2c: 原本に無い h5 / h6 を作らない", () => {
    const wrapper = mountPage();
    expect(texts(wrapper, "h5")).toEqual([...EXPECTED_H5]);
    expect(texts(wrapper, "h6")).toEqual([...EXPECTED_H6]);
  });

  it("S-3: 原本の外部リンク URL が全件存在する", () => {
    const actual = new Set(
      mountPage()
        .findAll("a[href^='http']")
        .map((el) => normalizeUrl(el.attributes("href") ?? "")),
    );
    const missing = EXPECTED_EXTERNAL_URLS.filter((url) => !actual.has(normalizeUrl(url)));
    expect(missing).toEqual([]);
  });

  it("S-4: 全 h2/h3 が一意な id を持ち、TOC のアンカーが実在の見出しを指す", () => {
    const wrapper = mountPage();
    const ids = wrapper.findAll("h2, h3").map((el) => el.attributes("id"));

    expect(ids.filter((id) => !id)).toEqual([]);
    expect(new Set(ids).size).toBe(ids.length);

    const headingIds = new Set(ids);
    const unresolved = wrapper
      .findAll("a[href^='#']")
      .map((el) => (el.attributes("href") ?? "").slice(1))
      .filter((id) => !headingIds.has(id));
    expect(unresolved).toEqual([]);
  });
});

describe("pages/capm.vue — コンテンツ契約 (C)", () => {
  it("C-1: h1 のテキストが原本と完全一致する", () => {
    expect(texts(mountPage(), "h1")).toEqual([...EXPECTED_H1]);
  });

  it("C-2: サイドバー TOC が原本と同じ順序・同じアンカーを持つ", () => {
    const hrefs = mountPage()
      .findAll(".sidebar-nav a")
      .map((el) => el.attributes("href"));
    expect(hrefs).toEqual(EXPECTED_TOC_IDS.map((id) => `#${id}`));
  });

  it("C-3: 初期状態で先頭の TOC 項目がアクティブになっている", () => {
    const active = mountPage().findAll(".sidebar-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.attributes("href")).toBe(`#${EXPECTED_TOC_IDS[0]}`);
  });

  it("C-4: 外部リンク全件が target=_blank かつ rel に noopener を含む", () => {
    const offenders = mountPage()
      .findAll("a[href^='http']")
      .filter((el) => {
        const rel = el.attributes("rel") ?? "";
        return el.attributes("target") !== "_blank" || !rel.split(/\s+/).includes("noopener");
      })
      .map((el) => el.attributes("href"));
    expect(offenders).toEqual([]);
  });

  it("C-5: 内部リンクに .html 拡張子が含まれない", () => {
    const offenders = mountPage()
      .findAll("a")
      .map((el) => el.attributes("href") ?? "")
      .filter((href) => !href.startsWith("http") && href.includes(".html"));
    expect(offenders).toEqual([]);
  });

  it("C-6a: 全図解の chart が原本の Mermaid ソースと完全一致する（順序込み）", () => {
    expect(texts(mountPage(), '[data-testid="mermaid"]')).toEqual([...EXPECTED_MERMAID_SOURCES]);
  });

  it("C-6b: 全図解が .mermaid-wrap に包まれている", () => {
    const wrapper = mountPage();
    const all = wrapper.findAll('[data-testid="mermaid"]').length;
    expect(all).toBe(EXPECTED_MERMAID_SOURCES.length);
    expect(wrapper.findAll('.mermaid-wrap [data-testid="mermaid"]')).toHaveLength(all);
  });

  it("C-6c: 各図解が空でなく、共有定義にある図種別の宣言から始まる", () => {
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      expect(chart.length).toBeGreaterThan(0);
      expect(chart).toMatch(MERMAID_DIAGRAM_DECLARATION);
    }
  });

  it("C-6d: 禁止構文 block-beta を使っていない", () => {
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      expect(chart).not.toContain("block-beta");
    }
  });

  it("C-6e: 図解のソースが左端揃え（先頭行にインデントが無い）", () => {
    // 先頭インデントはブラウザでだけ図を全滅させる。静的に弾く。
    for (const chart of texts(mountPage(), '[data-testid="mermaid"]')) {
      const firstLine = chart.split("\n").find((l) => l.trim().length > 0) ?? "";
      expect(firstLine).toBe(firstLine.trimStart());
    }
  });
});

describe("pages/capm.vue — デザイン契約 (D)", () => {
  it("D-1: callout が原本と同じ variant 構成で存在する", () => {
    const wrapper = mountPage();
    const actual: Record<string, number> = {};
    for (const el of wrapper.findAll('[data-testid="callout"]')) {
      const variant = el.attributes("data-variant") ?? "";
      actual[variant] = (actual[variant] ?? 0) + 1;
    }
    expect(actual).toEqual({ ...EXPECTED_CALLOUT_VARIANTS });
  });

  it("D-2: 全 callout がラベル子要素を持ち、ラベル文言が原本の 3 種に収まる", () => {
    const wrapper = mountPage();
    const callouts = wrapper.findAll('[data-testid="callout"]');
    expect(callouts.length).toBeGreaterThan(0);

    for (const callout of callouts) {
      const label = callout.find('[data-testid="callout-label"]');
      expect(label.exists()).toBe(true);
      expect(EXPECTED_CALLOUT_LABELS).toContain(label.text().trim());
    }
  });

  it("D-3: step タグが原本と同じ内容・同じ順序で存在する", () => {
    expect(texts(mountPage(), '[data-testid="step-tag"]')).toEqual([...EXPECTED_STEP_TAGS]);
  });

  it("D-5a: セクション見出しのキッカーが原本と完全一致する", () => {
    expect(texts(mountPage(), '[data-testid="section-eyebrow"]')).toEqual([
      ...EXPECTED_SECTION_EYEBROWS,
    ]);
  });

  it("D-5b: ドメインタグが原本と完全一致する（出題比率の数値を含む）", () => {
    expect(texts(mountPage(), '[data-testid="domain-tag"]')).toEqual([...EXPECTED_DOMAIN_TAGS]);
  });
});

describe("pages/capm.vue — 品質契約 (Q)", () => {
  it("Q-2: useSeoMeta の title / description が空でなく、title が h1 と整合する", () => {
    seoMeta.mockClear();
    mountPage();

    expect(seoMeta).toHaveBeenCalledTimes(1);
    const meta = seoMeta.mock.calls[0]?.[0] as { title?: string; description?: string };

    expect(meta?.title ?? "").not.toBe("");
    expect(meta?.description ?? "").not.toBe("");
    // h1 が「CAPM® 認定資格 完全ガイド」なので、title もこの資格を指していること。
    expect(meta?.title).toContain("CAPM");
    expect(meta?.title).toContain("認定資格");
  });

  it("Q-3: 見出し階層が飛ばない（h1 → h3 のようなスキップが無い）", () => {
    const levels = mountPage()
      .findAll("h1, h2, h3, h4, h5, h6")
      .map((el) => Number(el.element.tagName.slice(1)));

    let previous = 0;
    const skips: string[] = [];
    for (const level of levels) {
      if (previous && level > previous + 1) skips.push(`h${previous} -> h${level}`);
      previous = level;
    }
    expect(skips).toEqual([]);
  });
});
