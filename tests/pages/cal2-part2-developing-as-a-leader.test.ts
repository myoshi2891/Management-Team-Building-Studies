// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import { createMountPage, defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/cal2-part2-developing-as-a-leader.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "CAL2 Part 2: リーダーとしての成長(Developing as a Leader)",
] as const;

const EXPECTED_H2 = [
  "本ガイドの位置づけと学習目標",
  "2.1 個人の成長を阻む障壁を乗り越える(Overcoming Obstacles to Growth)",
  "2.2 自分自身のリーダーシップスタイルを確立する(Developing a Personalized Leadership Approach)",
  "2.3 困難な対話を乗りこなす(Difficult Conversations)",
  "2.4 フィードバックを与え、受け取る(Giving and Receiving Feedback)",
  "2.5 メンバーマネジメントの課題を乗り越える(Challenges of Managing People)",
  "2.6 権限移譲と意思決定(Delegation and Decision-Making)",
  "まとめ: Part 2 フレームワーク統合マップ",
  "用語集",
  "参考文献・ソース一覧",
] as const;

const EXPECTED_H3 = [
  "CAL2 公式カリキュラムにおける Part 2 の位置づけ",
  "このガイドの読み方",
  "ステップバイステップ解説",
  "図解: Fixed Mindset と Growth Mindset の分岐",
  "ステップバイステップ解説",
  "図解: 発達段階とリーダーシップスタイルのマッチング",
  "ステップバイステップ解説",
  "図解: Crucial Conversations のダイアログサイクル",
  "ステップバイステップ解説",
  "図解: Radical Candor の2軸マトリクス",
  "ステップバイステップ解説",
  "図解: Managing Self から Managing Others への転換",
  "ステップバイステップ解説",
  "図解: RAPID の役割と実行フロー",
  "統合的な視点",
] as const;

const EXPECTED_H4 = [
  "公式カリキュラム",
  "2.1 個人の成長の障壁",
  "2.2 パーソナライズされたリーダーシップ",
  "2.3 困難な対話",
  "2.4 フィードバック",
  "2.5 メンバーマネジメントの課題",
  "2.6 権限移譲と意思決定",
] as const;

const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  `flowchart TB
    A["課題 失敗 批判に直面する"] --> B{"どちらの信念で解釈するか"}
    B -->|"Fixed Mindset"| C["能力や知性は固定的だと信じる"]
    C --> D["失敗を自分の限界の証明と解釈する"]
    D --> E["挑戦を避け 防御的になる"]
    E --> F["成長が停滞し 同じ壁に繰り返しぶつかる"]
    F -.->|"時間経過"| A
    B -->|"Growth Mindset"| G["能力や知性は努力で伸ばせると信じる"]
    G --> H["失敗を学習のためのデータと解釈する"]
    H --> I["結果よりも努力とプロセスに焦点を当てる"]
    I --> J["新しい挑戦に取り組み 能力が拡張される"]
    J -.->|"時間経過"| A

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,B hub;
    class C,D,E,F box;
    class G,H,I,J done;`,
  `flowchart LR
    subgraph D["部下の発達段階 SLII Development Level"]
        D1["D1 Enthusiastic Beginner 低い能力 高いコミットメント"]
        D2["D2 Disillusioned Learner 一定の能力 低下したコミットメント"]
        D3["D3 Capable but Cautious Performer 高い能力 不安定なコミットメント"]
        D4["D4 Self-Reliant Achiever 高い能力 高いコミットメント"]
    end
    subgraph S["対応するリーダーシップスタイル SLII"]
        S1["S1 Directing 高指示 低支援"]
        S2["S2 Coaching 高指示 高支援"]
        S3["S3 Supporting 低指示 高支援"]
        S4["S4 Delegating 低指示 低支援"]
    end
    D1 --> S1
    D2 --> S2
    D3 --> S3
    D4 --> S4

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class D1,D2,D3,D4 box;
    class S1,S2,S3,S4 done;`,
  `flowchart TB
    A["Start with Heart 自分が本当に望む結果を明確にする"] --> B["Learn to Look 沈黙 暴力の兆候に気づく"]
    B --> C{"安全性は保たれているか"}
    C -->|"No"| D["Make It Safe 共通の目的と相互の敬意を回復する"]
    D --> B
    C -->|"Yes"| E["Master My Stories 事実と解釈を切り分ける"]
    E --> F["STATE My Path 事実 解釈 質問 暫定的に 反論歓迎"]
    F --> G["Explore Others' Paths AMPPで相手の見解を引き出す"]
    G --> H["Pool of Shared Meaning 共有された意味のプールを形成する"]
    H --> I["Move to Action 誰が 何を いつまでに合意する"]

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F,G box;
    class H,I done;`,
  `flowchart TB
    subgraph Row1["Challenge Directly 高い"]
        direction LR
        Q2["Obnoxious Aggression 不快な攻撃性 Care低 Challenge高"]
        Q1["Radical Candor ラディカル・キャンダー Care高 Challenge高 目指す状態"]
    end
    subgraph Row2["Challenge Directly 低い"]
        direction LR
        Q3["Manipulative Insincerity 操作的な不誠実 Care低 Challenge低"]
        Q4["Ruinous Empathy 破滅的な共感 Care高 Challenge低 陥りやすい罠"]
    end
    Row2 --> Row1

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class Q1 done;
    class Q2,Q3 box;
    class Q4 hub;`,
  `flowchart TB
    A["Individual Contributor 個人の専門性で成果を出す"] --> B{"Passage One Managing Self to Managing Others"}
    B --> C["Skills の転換 計画 委任 コーチング 人選"]
    B --> D["Time Application の転換 実務時間から部下支援 調整時間へ"]
    B --> E["Work Values の転換 自分の成果から部下を通じた成果へ"]
    C --> F["First-Time Manager 他者を通じて成果を出す"]
    D --> F
    E --> F
    F --> G{"典型的な落とし穴"}
    G --> H["Superdoer症候群 実務を抱え込み続ける"]
    G --> I["元同僚との関係の再定義不足"]
    G --> J["低パフォーマンスへの対応の先送り"]
    H --> K["意図的な権限移譲と時間配分の見直し"]
    I --> K
    J --> K
    K --> F

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A,C,D,E,H,I,J box;
    class B,G hub;
    class F,K done;`,
  `graph TD
    I["Input 幅広く意見 情報を収集"]
    R["Recommend 推奨案を作成する役割"]
    AG["Agree 限定的な拒否権を持つ役割"]
    D["Decide 最終決定を下す唯一の役割 Who has the D"]
    P["Perform 決定を実行する役割"]

    I -->|"情報提供"| R
    R -.->|"提案を参照"| AG
    R -.->|"提案を参照"| D
    D -->|"実行依頼"| P

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class R,I,AG,P box;
    class D hub;`,
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/agile-leader-track/cal-2",
  "https://drive.google.com/file/d/1-kc20bahmyfpwxj8immkxsotxyuxa6mg/view",
  "https://online.hbs.edu/blog/post/growth-mindset-vs-fixed-mindset",
  "https://www.mindtools.com/asbakxx/dwecks-fixed-and-growth-mindsets",
  "https://resources.blanchard.com/blanchard-leaderchat/a-situational-approach-to-effective-leadership",
  "https://hbr.org/2000/03/leadership-that-gets-results",
  "https://situational.com/blog/the-history-of-the-situational-leadership-framework",
  "https://www.manager-tools.com/forums/crucial-conversations",
  "https://cruciallearning.com/books/crucial-conversations-book",
  "https://www.cruciallearning.com/blog",
  "https://www.radicalcandor.com/our-approach",
  "https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii",
  "https://www.radicalcandor.com/blog/what-is-radical-candor",
  "https://www.ccl.org/articles/leading-effectively-articles/sbi-feedback-model-a-quick-win-to-improve-talent-conversations-development",
  "https://www.mindtools.com/aa57an9/the-leadership-pipeline-model",
  "https://www.oreilly.com/library/view/the-leadership-pipeline/9780787951726/ch02.html",
  "https://www.bain.com/insights/to-speed-up-rapid-adoption-slow-down",
  "https://www.bain.com/insights/rapid-decision-making",
  "https://www.mindtools.com/av8ceid/bains-rapid-framework",
] as const;

const mountPage = createMountPage(Page);

defineSourceParityContract({
  mountPage,
  expectedH1: EXPECTED_H1,
  expectedH2: EXPECTED_H2,
  expectedH3: EXPECTED_H3,
  expectedH4: EXPECTED_H4,
  expectedH5: EXPECTED_H5,
  expectedH6: EXPECTED_H6,
  expectedMermaidSources: EXPECTED_MERMAID_SOURCES,
  expectedExternalUrls: EXPECTED_EXTERNAL_URLS,
  seoMeta,
  expectedTitle:
    "CAL2 Part 2: リーダーとしての成長(Developing as a Leader)完全ガイド | Certified Agile Leader 2",
  expectedDescription:
    "Certified Agile Leader 2 (CAL2) Part 2「Developing as a Leader」を初学者向けに解説。Growth Mindset、Situational Leadership II、Crucial Conversations、Radical Candor、Leadership Pipeline、RAPIDなど6つのフレームワークをステップバイステップで学ぶ学習ガイド。",
});

describe("CAL2 Part 2 ページ固有のデザイン契約", () => {
  it("D-1: callout が variant ごとに正しい件数で存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll('.callout[data-variant="note"]')).toHaveLength(2);
    expect(wrapper.findAll('.callout[data-variant="practice"]')).toHaveLength(6);
    expect(wrapper.findAll('.callout[data-variant="source"]')).toHaveLength(6);
  });

  it("D-2: 全 callout がラベル要素を持つ", () => {
    const wrapper = mountPage();
    const callouts = wrapper.findAll(".callout");
    expect(callouts.length).toBe(14);
    for (const c of callouts) {
      expect(c.find('[data-testid="callout-label"]').exists()).toBe(true);
    }
  });

  it("D-3: 統計カードが4件存在する", () => {
    const wrapper = mountPage();
    expect(wrapper.findAll(".stat-card")).toHaveLength(4);
  });
});
