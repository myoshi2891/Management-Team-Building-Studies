// 期待値は原本 HTML から機械生成した凍結リテラル。
// 実行時に原本を読み込んではならない（テストが原本の写しになり転写漏れを検知できなくなる）。
// 実装に合わせて書き換えることは禁止（.claude/rules/tdd-mandatory-cycle.md 核心原則 5）。
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { vi, describe, it, expect } from "vitest";
import { defineSourceParityContract } from "../support/page-contract";
import Page from "~/pages/a-cspo-advanced-certified-scrum-product-owner-study-guide.vue";

// useSeoMeta の引数を捕まえて契約 Q-2 で検証する。
const { seoMeta } = vi.hoisted(() => ({ seoMeta: vi.fn() }));
mockNuxtImport("useSeoMeta", () => seoMeta);

const EXPECTED_H1 = [
  "Advanced Certified Scrum Product Owner (A-CSPO®) 学習ガイド"
] as const;

const EXPECTED_H2 = [
  "この章立てについて",
  "第1章 A-CSPO資格の概要とProduct Owner Trackにおける位置づけ",
  "第2章 受験要件と認定への道のり",
  "第3章 Bloom's Taxonomyの読み方",
  "第4章 CSPOからの橋渡し: Scrum基礎の要点整理",
  "第5章 Core Competencies1 プロダクトオーナーシップの本質とマインドセット(LO 1.1〜1.3)",
  "第6章 Core Competencies2 ステークホルダーとの協働技術(LO 1.4〜1.8)",
  "第7章 Core Competencies3 開発者との協働と技術的負債(LO 1.9〜1.10)",
  "第8章 Core Competencies4 複数チームでのプロダクトオーナーシップ(LO 1.11〜1.13)",
  "第9章 Advanced Goal Setting and Planning(LO 2.1〜2.4)",
  "第10章 Empathizing with Customers and Users(LO 3.1〜3.2)",
  "第11章 Advanced Product Assumption Validation(LO 4.1〜4.5)",
  "第12章 Product Backlog Management(LO 5.1〜5.5)",
  "第13章 ベストプラクティス総まとめチェックリスト",
  "第14章 よくある誤解・アンチパターン",
  "第15章 認定後のキャリアパス",
  "まとめ",
  "参考資料・出典一覧"
] as const;

const EXPECTED_H3 = [
  "1.1 A-CSPOとは何か",
  "1.2 CSPOとの違い",
  "1.3 対象者",
  "1.4 プロダクトオーナーとスクラムマスターの関係",
  "2.1 公式要件",
  "2.2 要件を満たすまでの流れ",
  "2.3 なぜ「12ヶ月の実務経験」が要件になっているのか",
  "3.1 なぜBloom's Taxonomyを理解する必要があるのか",
  "3.2 6段階の分類",
  "3.3 A-CSPOの学習目標のレベル感",
  "4.1 Scrum Theory(スクラム理論)の要点",
  "4.2 Scrum Team・イベント・作成物の全体像",
  "4.3 プロダクトバックログの本質(復習)",
  "5.1 学習目標",
  "5.2 プロダクトオーナーシップの重要性を分析する(1.1)",
  "5.3 成功するプロダクトオーナーのマインドセット(1.2)",
  "5.4 最新のスクラム定義の採用がもたらす影響(1.3)",
  "6.1 学習目標",
  "6.2 ステークホルダーと関わる技術(1.4)",
  "6.3 プロダクトオーナーがファシリテーターであるべきでない場面(1.5)",
  "6.4 ファシリテーティブ・リスニングの技術(1.6)",
  "6.5 オープンディスカッションへの代替手法(1.7)",
  "6.6 ステークホルダーとの最終意思決定のファシリテーション(1.8)",
  "7.1 学習目標",
  "7.2 技術的負債とは何か",
  "7.3 プロダクトオーナーが技術的負債に慎重であるべき理由(1.9)",
  "7.4 技術的負債の4象限(Technical Debt Quadrant)",
  "7.5 技術的負債を減らす開発プラクティス(1.10)",
  "8.1 学習目標",
  "8.2 スクラムのスケーリングアプローチ(1.11)",
  "8.3 依存関係を可視化・管理・削減する技術(1.12)",
  "8.4 フィーチャーチームとコンポーネントチーム(1.13)",
  "9.1 学習目標",
  "9.2 プロダクトビジョンから日々のバックログへのつながり",
  "9.3 目的の特定・戦略定義の技術(2.2)",
  "9.4 プロダクトプラン・フォーキャストの作成(2.3)",
  "9.5 戦略・アイデア・機能・前提の可視化と伝達(2.4)",
  "10.1 学習目標",
  "10.2 開発者を顧客・ユーザーに直接つなげる(3.1)",
  "10.3 プロダクトディスカバリーの技術(3.2)",
  "11.1 学習目標",
  "11.2 プロダクトオーナーに影響しうる認知バイアス(4.1)",
  "11.3 Sprint Reviewの効果性を査定する(4.2)",
  "11.4 前提検証をスクラムフレームワークに組み込む(4.3)",
  "11.5 ターゲット顧客に関する仮説の開発(4.4)",
  "11.6 仮説を検証する計画の作成(4.5)",
  "12.1 学習目標",
  "12.2 価値のモデル化・測定技術(5.1)",
  "12.3 プロダクトゴールを支える順序付け技術(5.2)",
  "12.4 「レディ」なバックログ項目を確保する方法(5.3)",
  "12.5 複数の情報源からのフィードバック統合(5.4)",
  "12.6 バックログリファインメントの改善(5.5)",
  "15.1 A-CSPOの次に位置する資格",
  "15.2 資格の維持とScrum Education Units(SEU)",
  "15.3 なぜ「学び続ける資格」なのか"
] as const;

const EXPECTED_H4 = [] as const;
const EXPECTED_H5 = [] as const;
const EXPECTED_H6 = [] as const;

const EXPECTED_MERMAID_SOURCES = [
  "flowchart LR\nA[\"CSPO\n基礎を学ぶ\"] --> B[\"12ヶ月以上の\n実務経験\"]\nB --> C[\"A-CSPO\n応用力を鍛える\"]\nC --> D[\"CSP-PO\n実務家として認められる\"]\nD --> E[\"SEUによる\n継続的な更新\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E box;",
  "flowchart TD\nS[\"Start\"] --> A[\"CSPOを保有している？\"]\nA -- No --> A1[\"先にCSPOコースを受講\"]\nA1 --> A\nA -- Yes --> B[\"直近5年以内に\nPO実務経験12ヶ月以上ある？\"]\nB -- No --> B1[\"PO業務の経験を積む\"]\nB1 --> B\nB -- Yes --> C[\"A-CSPO認定コースを受講\"]\nC --> D[\"事前/事後課題を完了\"]\nD --> E[\"ライセンス契約に同意し\nプロフィールを完成\"]\nE --> F[\"A-CSPO取得\"]\nF --> G[\"2年ごとにSEUで更新\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass S,A,B,C,D,E box;\nclass A1,B1 hub;\nclass F,G done;",
  "flowchart BT\nK[\"Knowledge\n知識\"] --> C[\"Comprehension\n理解\"]\nC --> App[\"Application\n応用\"]\nApp --> An[\"Analysis\n分析\"]\nAn --> S[\"Synthesis\n統合\"]\nS --> E[\"Evaluation\n評価\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclass K,C box;\nclass App,An hub;\nclass S,E done;",
  "flowchart TB\nsubgraph Team[\"Scrum Team\"]\nPO[\"Product Owner\"]\nSM[\"Scrum Master\"]\nDEV[\"Developers\"]\nend\nsubgraph Artifacts[\"Artifacts と Commitments\"]\nPB[\"Product Backlog\nProduct Goal\"]\nSB[\"Sprint Backlog\nSprint Goal\"]\nINC[\"Increment\nDefinition of Done\"]\nend\nsubgraph Events[\"Events\"]\nSP[\"Sprint Planning\"]\nDS[\"Daily Scrum\"]\nSR[\"Sprint Review\"]\nRETRO[\"Sprint Retrospective\"]\nend\nPO --> PB\nPB --> SP\nSP --> SB\nTeam --> SB\nSB --> DS\nDS --> INC\nINC --> SR\nSR --> RETRO\nRETRO --> PB\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass PO,SM,DEV,PB,SB,INC,SP,DS,SR,RETRO box;",
  "flowchart TD\nA[\"意見が出そろう\"] --> B[\"評価基準を\n先に合意する\"]\nB --> C[\"基準に沿って\n選択肢を絞り込む\"]\nC --> D[\"合意形成技術を選ぶ\"]\nD --> E1[\"フィストトゥファイブ\"]\nD --> E2[\"ローマ式投票\"]\nD --> E3[\"決定者を明確にした上での相談\"]\nE1 --> F[\"決定を記録し\n合意内容を全員に共有\"]\nE2 --> F\nE3 --> F\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,B,C,F box;\nclass D,E1,E2,E3 hub;",
  "flowchart TB\nsubgraph Deliberate[\"意図的 - Deliberate\"]\nDP[\"思慮深い\nリリースを優先し\n後で返済すると\n合意した近道\"]\nDR[\"無謀\n設計をきちんと\nやる時間がないから\nこのまま進める\"]\nend\nsubgraph Inadvertent[\"偶発的 - Inadvertent\"]\nIP[\"思慮深い\n今ならこうすべきだったと\n後から気づいた設計\"]\nIR[\"無謀\nそもそも設計の\n原則を知らなかった\"]\nend\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass DP done;\nclass IP,DR,IR box;",
  "flowchart TD\nA[\"依存関係の存在に気づく\"] --> B[\"可視化する\"]\nB --> B1[\"依存関係ボード\nCross-team Dependency Board\"]\nB --> B2[\"ストーリーマップ上での\nチーム横断表示\"]\nB --> C[\"管理する\"]\nC --> C1[\"Nexus統合チームによる\n定期的な調整\"]\nC --> C2[\"共通のDefinition of Done\"]\nB --> D[\"削減する\"]\nD --> D1[\"プロダクトバックログの\n順序を見直し\n依存の強い項目を近づける\"]\nD --> D2[\"チーム構成そのものを\n見直す(フィーチャーチーム化)\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,B,C,D box;\nclass B1,B2,C1,C2,D1,D2 hub;",
  "flowchart TB\nV[\"プロダクトビジョン\nなぜこのプロダクトが存在するか\"] --> S[\"プロダクト戦略\nどの市場・顧客に\nどう価値を届けるか\"]\nS --> G[\"プロダクトゴール\n次に到達したい\n具体的な状態\"]\nG --> R[\"ロードマップ\nNow / Next / Later\"]\nR --> PB[\"プロダクトバックログ\n順序付けされた\n具体的な作業項目\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass V,S,G,R,PB box;",
  "flowchart LR\nWhy[\"Why\n達成したい\nビジネスゴール\"] --> Who[\"Who\nゴールに影響を\n与えるアクター\"]\nWho --> How[\"How\nアクターに\n起こしたい\nインパクト\"]\nHow --> What[\"What\nインパクトを\n実現するための\nデリバラブル\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass Why,Who,How,What box;",
  "flowchart LR\nP[\"問題を発見する\"] --> D[\"顧客インタビュー\"]\nP --> O[\"行動観察\nオブザベーション\"]\nD --> H[\"仮説を立てる\"]\nO --> H\nH --> T[\"プロトタイプ・\nモックアップで検証\"]\nT --> L[\"学びをバックログに反映\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass P,D,O,H,T,L box;",
  "flowchart LR\nB[\"Build\n最小限の実験\nまたは\nMVPを作る\"] --> M[\"Measure\n実際の\n利用データ・反応を\n測定する\"]\nM --> L[\"Learn\n検証された学びを\n得る\"]\nL --> D{\"仮説は\n支持されたか\"}\nD -- Yes --> Persevere[\"Persevere\nこのまま前進する\"]\nD -- No --> Pivot[\"Pivot\n方向転換する\"]\nPersevere --> B\nPivot --> B\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass B,M,L,Persevere,Pivot box;\nclass D hub;",
  "flowchart TD\nH[\"仮説を1文で書く\"] --> M[\"成功/失敗を判断する\n測定可能な指標を決める\"]\nM --> E[\"最小限の実験方法を選ぶ\nインタビュー / プロトタイプ / A/Bテスト\"]\nE --> Th[\"判定基準を\n実験前に決めておく\"]\nTh --> Run[\"実験を実施する\"]\nRun --> Result[\"結果を評価し\n次のアクションを決める\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass H,M,E,Th,Run,Result box;",
  "flowchart LR\nBV[\"ビジネス価値\"] --> CoD[\"Cost of Delay\n遅延コスト\"]\nTC[\"時間的緊急度\"] --> CoD\nRR[\"リスク低減・\n機会創出\"] --> CoD\nCoD --> WSJF[\"WSJF =\nCost of Delay\n÷\nJob Size\"]\nJS[\"Job Size\n所要期間\"] --> WSJF\nWSJF --> Order[\"優先順位が\n高いものから着手\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass BV,TC,RR,CoD,JS,WSJF,Order box;",
  "flowchart TD\nA[\"プロダクトバックログ\nリファインメントを\n定期的に実施\"] --> B[\"上位項目から順に\n詳細化する\"]\nB --> C[\"受け入れ基準を\n明文化する\"]\nC --> D[\"見積もり可能な\n粒度まで分割する\"]\nD --> E[\"チームで\n準備完了の基準を\n合意しておく\"]\nE --> F[\"Sprint Planningで\n即座に着手できる\n状態を維持\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass A,B,C,D,E,F box;",
  "flowchart TB\nACSPO[\"A-CSPO\n5つの学習目標カテゴリー\"] --> C1[\"1. Product Owner\nCore Competencies\"]\nACSPO --> C2[\"2. Advanced Goal\nSetting and Planning\"]\nACSPO --> C3[\"3. Empathizing with\nCustomers and Users\"]\nACSPO --> C4[\"4. Advanced Product\nAssumption Validation\"]\nACSPO --> C5[\"5. Product Backlog\nManagement\"]\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass ACSPO hub;\nclass C1,C2,C3,C4,C5 box;",
  "flowchart LR\nCSPO[\"CSPO\"] --> ACSPO[\"A-CSPO\"]\nACSPO --> CSPPO[\"CSP-PO\"]\nCSPPO --> CTC[\"CTC / CEC など\nトレーナー・コーチ系\n資格への発展も可能\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclass CSPO,ACSPO,CSPPO,CTC box;",
  "flowchart TD\nA[\"A-CSPO取得\"] --> B[\"学習活動を継続する\"]\nB --> B1[\"書籍を読む\"]\nB --> B2[\"ウェビナーを視聴する\"]\nB --> B3[\"カンファレンスに参加する\"]\nB1 --> C[\"SEUを蓄積する\"]\nB2 --> C\nB3 --> C\nC --> D[\"2年ごとに\n資格を更新する\"]\nD --> B\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;\nclass A,C,D box;\nclass B,B1,B2,B3 hub;"
] as const;

const EXPECTED_EXTERNAL_URLS = [
  "https://www.scrumalliance.org/get-certified/product-owner-track/advanced-certified-scrum-product-owner",
  "https://www.scrumalliance.org/media/certifications/los/adv_cspo_learning_objectives_2022.pdf",
  "https://assets.scrumalliance.org/media/certifications/los/scrum_foundations_learning_objectives_2022.pdf",
  "https://scrumguides.org",
  "https://martinfowler.com/bliki/technicaldebt.html",
  "https://martinfowler.com/bliki/technicaldebtquadrant.html",
  "https://www.scrum.org/resources/online-nexus-guide",
  "https://www.impactmapping.org",
  "https://jpattonassociates.com/story-mapping-quick-ref",
  "https://appliedframeworks.com/blog/fourteen-cognitive-biases-common-to-product-owners",
  "https://theleanstartup.com/principles",
  "https://en.wikipedia.org/wiki/kano_model",
  "https://framework.scaledagile.com/wsjf",
  "https://resources.scrumalliance.org/article/manage-large-product-backlog",
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-professional-product-owner",
  "https://www.scrumalliance.org/get-certified/scrum-education-units",
  "https://agilemanifesto.org",
  "https://www.scrumalliance.org/about-scrum/values",
  "https://www.scrumalliance.org/get-certified/product-owner-track",
  "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner",
  "https://www.scrumalliance.org/get-certified/renewing-certifications"
] as const;

const { mountPage } = defineSourceParityContract({
  Page,
  expectedH1: EXPECTED_H1,
  expectedH2: EXPECTED_H2,
  expectedH3: EXPECTED_H3,
  expectedH4: EXPECTED_H4,
  expectedH5: EXPECTED_H5,
  expectedH6: EXPECTED_H6,
  expectedMermaidSources: EXPECTED_MERMAID_SOURCES,
  expectedExternalUrls: EXPECTED_EXTERNAL_URLS,
});

describe("A-CSPO ガイド ページ個別契約", () => {
  it("D-1: callout の種類と件数が原本と一致する (practice: 14, source: 13)", () => {
    const wrapper = mountPage();
    const practices = wrapper.findAll('.callout[data-variant="practice"], .callout.practice');
    const sources = wrapper.findAll('.callout[data-variant="source"], .callout.source');
    expect(practices.length).toBe(14);
    expect(sources.length).toBe(13);
  });

  it("Q-2: SEO メタ情報が設定されている", () => {
    mountPage();
    expect(seoMeta).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("A-CSPO"),
        description: expect.stringContaining("Scrum Alliance"),
      })
    );
  });
});
