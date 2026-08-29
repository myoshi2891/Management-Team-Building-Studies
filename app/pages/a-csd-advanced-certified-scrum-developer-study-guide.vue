<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-guide",
  "what-is-acsd",
  "acsd-requirements",
  "blooms-taxonomy",
  "lean-agile-scrum",
  "collaboration-team-dynamics",
  "architecture-design",
  "refactoring",
  "test-driven-development",
  "integrating-continuously",
  "delivering-continuously",
  "xp-integration-map",
  "best-practices-checklist",
  "career-path",
  "summary",
  "references"
];

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);
const activeId = useActiveHeading(TOC_IDS);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

useSeoMeta({
  title: "A-CSD® (Advanced Certified Scrum Developer) 認定資格 完全ガイド | Scrum Alliance 公式Learning Objectives準拠",
  description:
    "Scrum Alliance® の Advanced Certified Scrum Developer (A-CSD) Learning Objectives (2021年8月版) に基づき、7カテゴリ・全LOをステップバイステップで解説する学習ガイド。",
});

const MERMAID_THEME_VARIABLES = {
  background: "transparent",
  primaryColor: "#EEF1F8",
  primaryBorderColor: "#2E3F72",
  primaryTextColor: "#161B26",
  lineColor: "#2E3F72",
  secondaryColor: "#FAF1DF",
  secondaryBorderColor: "#B8802A",
  tertiaryColor: "#FFFFFF",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
  fontSize: "16px",
};

const DIAGRAM_TRACK_OVERVIEW = `flowchart LR
A["CSD Certified Scrum Developer<br/>基礎 Scrum下での開発実践"] --> B["A-CSD Advanced Certified Scrum Developer<br/>応用 高度な技術・協働スキル"]
B --> C["CSP-D Certified Scrum Professional - Developer<br/>熟達 専門性の証明"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class B hub;
class C done;`;

const DIAGRAM_REQUIREMENTS_FLOW = `flowchart TD
S(["A-CSD 取得を目指す"]) --> R1{"CSD® 有効/失効どちらでも可<br/>またはPSM I / PSM II を<br/>保持しているか?"}
R1 -- いいえ --> G1["まずCSD®コースを受講・取得する<br/>PSM I / PSM II でも可"]
G1 --> R1
R1 -- はい --> R2["承認されたA-CSD®コースを受講する"]
R2 --> R3{"過去5年以内に<br/>Scrum開発者/チームメンバーとして<br/>12か月以上の実務経験があるか?"}
R3 -- いいえ --> G2["実務経験を積んでから申請する"]
R3 -- はい --> R4["コースの事前/事後課題を含む<br/>全コンポーネントを完了する"]
R4 --> DONE(["A-CSD® 認定取得<br/>CSD®も自動更新される"])

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class S,R2,R4 box;
class R1,R3,G1,G2 hub;
class DONE done;`;

const DIAGRAM_BLOOMS_TAXONOMY = `flowchart BT
K["知識 Knowledge<br/>用語や事実を思い出せる"] --> C["理解 Comprehension<br/>意味を説明できる"]
C --> AP["応用 Application<br/>実際の状況で使える"]
AP --> AN["分析 Analysis<br/>要素に分解し関係を見出せる"]
AN --> S["統合 Synthesis<br/>新しい形に組み合わせられる"]
S --> E["評価 Evaluation<br/>価値判断・妥当性評価ができる"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class K,C,AP,AN,S,E box;`;

const DIAGRAM_VALUE_STREAM_FLOW = `flowchart LR
A["要求発生"] -->|"待機時間"| B["開発着手"]
B -->|"実作業時間"| C["コードレビュー"]
C -->|"待機時間"| D["テスト"]
D -->|"実作業時間"| E["リリース"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class A,B,C,D,E box;`;

const DIAGRAM_DOD_EVOLUTION = `flowchart LR
A["現在のDoD"] --> B["スプリントで運用"]
B --> C["レトロスペクティブで<br/>ギャップを振り返る"]
C --> D["DoDを更新する"]
D --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
class A,B,D box;
class C hub;`;

const DIAGRAM_COLLABORATION_SPECTRUM = `flowchart LR
A["Solo Programming<br/>個人作業"] --> B["Code Review<br/>非同期レビュー"]
B --> C["Pair Programming<br/>2人1組でリアルタイム協働"]
C --> D["Mob Programming<br/>チーム全員で1台の画面に向かう"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A box;
class B,C hub;
class D done;`;

const DIAGRAM_SBI_MODEL = `flowchart LR
S["Situation<br/>状況を具体的に示す"] --> B["Behavior<br/>観察した行動を述べる"]
B --> I["Impact<br/>それがもたらした影響を伝える"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class S,B,I box;`;

const DIAGRAM_ARCHITECTURE_APPROACHES = `flowchart TB
subgraph U["Up-Front Architecture 事前設計"]
U1["要件を早期に確定"] --> U2["詳細設計を先に完成"] --> U3["設計通りに実装"]
end
subgraph E["Emergent Architecture 創発的設計"]
E1["最小限の骨格を決める"] --> E2["小さく実装し学習する"] --> E3["学習に基づき設計を進化させる"]
E3 --> E2
end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class U1,U2,U3 box;
class E1,E2,E3 done;`;

const DIAGRAM_REFACTORING_WORKFLOW = `flowchart LR
A["1. 対象コードを<br/>保護するテストがあるか確認"] --> B{"テストは<br/>十分か?"}
B -- いいえ --> C["テストを追加する"]
C --> A
B -- はい --> D["2. 小さな一歩で<br/>リファクタリングを実施"]
D --> E["3. テストを実行し<br/>振る舞いが変わっていないことを確認"]
E --> F{"目的の構造に<br/>到達したか?"}
F -- いいえ --> D
F -- はい --> G["4. コミットする"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,D,E box;
class B,C,F hub;
class G done;`;

const DIAGRAM_TECHNICAL_DEBT_QUADRANT = `flowchart TB
subgraph Deliberate["意図的 Deliberate"]
DP["思慮深く意図的<br/>『今はこれでいく、理由は分かっている』<br/>= しばしば正しいビジネス判断"]
DR["無謀で意図的<br/>『設計する時間がない』"]
end
subgraph Inadvertent["無自覚 Inadvertent"]
IP["思慮深く無自覚<br/>『今ならこう設計するのに』<br/>= 経験を積んだ結果の気づき"]
IR["無謀で無自覚<br/>『レイヤーとは何ですか?』"]
end

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class DP done;
class IP hub;
class DR,IR box;`;

const DIAGRAM_TDD_CYCLE = `flowchart LR
R["Red<br/>失敗するテストを書く"] --> G["Green<br/>テストを通す<br/>最小限の実装をする"]
G --> RF["Refactor<br/>テストを保ったまま<br/>コードを整理する"]
RF --> R

classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
class R hub;
class G done;
class RF box;`;

const DIAGRAM_TEST_PYRAMID = `flowchart TB
E2E["E2E / UIテスト<br/>少数・低速・高コスト"] --> INT["統合テスト<br/>中程度の数・中速"]
INT --> UNIT["単体テスト<br/>多数・高速・低コスト"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class E2E box;
class INT hub;
class UNIT done;`;

const DIAGRAM_CI_BUILD_FLOW = `flowchart LR
A["コードをコミット"] --> B["自動的にビルドが起動"]
B --> C["静的解析・単体テストを実行"]
C --> D{"すべて成功?"}
D -- いいえ --> E["チームに即座に通知<br/>最優先で修正"]
D -- はい --> F["成果物・アーティファクトを生成"]
E --> A

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,C box;
class D,E hub;
class F done;`;

const DIAGRAM_CD_PROGRESSION = `flowchart LR
CI["継続的インテグレーション<br/>頻繁な統合"] --> CD["継続的デリバリー<br/>常にリリース可能"]
CD --> DEPLOY["継続的デプロイメント<br/>自動で本番へ反映"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class CI box;
class CD hub;
class DEPLOY done;`;

const DIAGRAM_XP_INTEGRATION_MAP = `flowchart TB
subgraph Foundation["土台 協働とリーン思考 カテゴリ1・2"]
F1["ワークフローの可視化"]
F2["ペア/モブプログラミング"]
F3["フィードバックの授受"]
end

subgraph Design["設計と実装 カテゴリ3・4・5"]
D1["創発的アーキテクチャ<br/>+ シンプルデザイン原則"]
D2["TDD<br/>Red-Green-Refactor"]
D3["継続的リファクタリング"]
end

subgraph Delivery["統合とデリバリー カテゴリ6・7"]
E1["継続的インテグレーション"]
E2["継続的デリバリー/デプロイ"]
E3["成果のフィードバックループ"]
end

Foundation --> Design --> Delivery
E3 -.->|"学習を次のスプリントへ"| Foundation

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class F1,F2,F3 box;
class D1,D2,D3 hub;
class E1,E2,E3 done;`;

const DIAGRAM_CAREER_PATH = `flowchart LR
A["A-CSD®取得"] --> B["Scrum Education Units SEU<br/>を継続的に蓄積"]
B --> C["2年ごとに認定更新<br/>SEUの提出と更新料の支払い"]
A --> D["実務経験を重ねる"]
D --> E["CSP-D®<br/>Certified Scrum Professional - Developer<br/>に挑戦"]

classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
class A,B,D box;
class C hub;
class E done;`;
</script>

<template>
  <div>
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      :aria-expanded="sidebarOpen"
      aria-controls="sidebar"
      aria-label="目次を開閉する"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div class="layout">
      <aside id="sidebar" class="sidebar" :class="{ 'is-open': sidebarOpen }" aria-label="目次">
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">A-CSD® 完全ガイド</div>
            <div class="brand-subtitle">Advanced Certified Scrum Developer</div>
          </div>
        </div>

        <ul class="sidebar-nav">

      <li class="nav-group-label">はじめに</li>
      <li><a href="#about-guide" :class="{ active: activeId === 'about-guide' }" @click="closeSidebar"><Icon name="tabler:info-circle" aria-hidden="true" />本ガイドの使い方</a></li>
      <li><a href="#what-is-acsd" :class="{ active: activeId === 'what-is-acsd' }" @click="closeSidebar"><Icon name="tabler:certificate" aria-hidden="true" />1. A-CSD®とは何か</a></li>
      <li><a href="#acsd-requirements" :class="{ active: activeId === 'acsd-requirements' }" @click="closeSidebar"><Icon name="tabler:clipboard-check" aria-hidden="true" />2. 受験資格・コース要件</a></li>
      <li><a href="#blooms-taxonomy" :class="{ active: activeId === 'blooms-taxonomy' }" @click="closeSidebar"><Icon name="tabler:list-check" aria-hidden="true" />3. Bloom's Taxonomy</a></li>

      <li class="nav-group-label">学習目標(LO)</li>
      <li><a href="#lean-agile-scrum" :class="{ active: activeId === 'lean-agile-scrum' }" @click="closeSidebar"><Icon name="tabler:route" aria-hidden="true" />4. Lean, Agile &amp; Scrum</a></li>
      <li><a href="#collaboration-team-dynamics" :class="{ active: activeId === 'collaboration-team-dynamics' }" @click="closeSidebar"><Icon name="tabler:users" aria-hidden="true" />5. Collaboration &amp; Team Dynamics</a></li>
      <li><a href="#architecture-design" :class="{ active: activeId === 'architecture-design' }" @click="closeSidebar"><Icon name="tabler:building" aria-hidden="true" />6. Architecture &amp; Design</a></li>
      <li><a href="#refactoring" :class="{ active: activeId === 'refactoring' }" @click="closeSidebar"><Icon name="tabler:tool" aria-hidden="true" />7. Refactoring</a></li>
      <li><a href="#test-driven-development" :class="{ active: activeId === 'test-driven-development' }" @click="closeSidebar"><Icon name="tabler:flask" aria-hidden="true" />8. Test Driven Development</a></li>
      <li><a href="#integrating-continuously" :class="{ active: activeId === 'integrating-continuously' }" @click="closeSidebar"><Icon name="tabler:git-merge" aria-hidden="true" />9. Integrating Continuously</a></li>
      <li><a href="#delivering-continuously" :class="{ active: activeId === 'delivering-continuously' }" @click="closeSidebar"><Icon name="tabler:rocket" aria-hidden="true" />10. Learning by Delivering Continuously</a></li>

      <li class="nav-group-label">統合・実践</li>
      <li><a href="#xp-integration-map" :class="{ active: activeId === 'xp-integration-map' }" @click="closeSidebar"><Icon name="tabler:map-2" aria-hidden="true" />11. XP統合マップ</a></li>
      <li><a href="#best-practices-checklist" :class="{ active: activeId === 'best-practices-checklist' }" @click="closeSidebar"><Icon name="tabler:checkbox" aria-hidden="true" />12. ベストプラクティス総合チェックリスト</a></li>

      <li class="nav-group-label">キャリア・まとめ</li>
      <li><a href="#career-path" :class="{ active: activeId === 'career-path' }" @click="closeSidebar"><Icon name="tabler:timeline" aria-hidden="true" />13. 認定取得後のキャリアパス</a></li>
      <li><a href="#summary" :class="{ active: activeId === 'summary' }" @click="closeSidebar"><Icon name="tabler:flag-3" aria-hidden="true" />14. まとめ</a></li>

      <li class="nav-group-label">参考文献</li>
      <li><a href="#references" :class="{ active: activeId === 'references' }" @click="closeSidebar"><Icon name="tabler:link" aria-hidden="true" />15. 参考文献</a></li>
    
        </ul>
      </aside>

      <div
        v-if="sidebarOpen"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="closeSidebar"
      />

      <main class="main-content">


    <div class="hero">
      <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />SCRUM ALLIANCE® A-CSD® LEARNING OBJECTIVES 準拠</div>
      <h1>Advanced Certified Scrum Developer® (A-CSD®) 完全ガイド</h1>
      <p class="hero-lede">
        本ガイドは、Scrum Alliance® が公開する Advanced Certified Scrum Developer℠ (A-CSD℠) Learning Objectives(2021年8月版)を一次情報源として、各学習目標(Learning Objective, 以下LO)をステップバイステップで解説する初学者向け教材です。ASCIIアートは使用せず、フローチャートは Mermaid、比較・一覧は表で表現しています。各章末に根拠となる一次情報源のURLを明記しています。
      </p>

      <div class="stat-row">
        <div class="stat-card"><div class="stat-number">7</div><div class="stat-label">公式LOカテゴリ数</div></div>
        <div class="stat-card"><div class="stat-number">37</div><div class="stat-label">サブLO項目数(1.1〜7.4)</div></div>
        <div class="stat-card"><div class="stat-number">12ヶ月</div><div class="stat-label">必要な実務経験(過去5年以内)</div></div>
        <div class="stat-card"><div class="stat-number">2年</div><div class="stat-label">認定更新サイクル</div></div>
      </div>

      <div class="disclaimer-box">
        <Icon name="tabler:info-circle" aria-hidden="true" />
        <span>本ガイドは学習補助資料として作成されたものであり、Scrum Alliance®の公式教材や認定コースの代替とはなりません。A-CSD®の取得には、Scrum Alliance®承認のLicensed Training Partner/Certified Educatorによるコース受講が必須です。最新の要件・LOは必ず<a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">公式サイト(scrumalliance.org)</a>でご確認ください。</span>
      </div>
    </div>

    <!-- ===================== About the guide ===================== -->
    <section id="about-guide">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" aria-hidden="true" />SECTION 01</div>
      <h2>本ガイドの使い方</h2>

      <ul>
        <li>対象読者: すでに <strong>CSD®(Certified Scrum Developer)</strong> を保持している、またはこれから A-CSD® を目指す開発者・エンジニア。</li>
        <li>構成: 公式LOの7カテゴリ(Lean/Agile/Scrum、Collaboration &amp; Team Dynamics、Architecture &amp; Design、Refactoring、TDD、Integrating Continuously、Learning by Delivering Continuously)に沿って、各サブ項目を「説明 → ベストプラクティス → 図解 → 出典」の順で解説します。</li>
        <li>各LOの文頭には、Bloom's Taxonomy(ブルームの分類学)による認知レベルの目安を付けています(第3章で詳説)。</li>
        <li>本ガイドは公式教育プロバイダーのコースを代替するものではありません。A-CSD®は認定トレーナーによる対面/オンラインコースの受講が必須です。</li>
      </ul>
    </section>

    <!-- ===================== 1. What is A-CSD ===================== -->
    <section id="what-is-acsd">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 02</div>
      <h2>1. A-CSD® とは何か — Developer Track における位置づけ</h2>

      <h3>1.1 A-CSD® の位置づけ</h3>

      <p>Advanced Certified Scrum Developer® (A-CSD®) は、Scrum Alliance® が提供する<strong>Scrum Developer 認定トラック</strong>の第2段階に位置する資格です。トラックは以下の3段階で構成されます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TRACK_OVERVIEW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CSD → A-CSD → CSP-D という Scrum Developer 認定トラックの3段階</div>
      </div>

      <p>A-CSD®は、CSD®で学んだ基礎(Scrumの枠組みの中でどう開発するか)を土台に、<strong>テスト駆動開発(TDD)・継続的デリバリー・高度なリファクタリング・チームコラボレーション</strong>に踏み込みます。Scrum Alliance公式ページでは、A-CSD®の学習領域として以下が挙げられています。</p>

      <ul>
        <li>テスト駆動開発(TDD)と継続的デリバリーの実践を学び、プロダクト品質とチーム効率を高める</li>
        <li>高度なリファクタリング手法を通じてコードの保守性と適応性を改善する</li>
        <li>チームの結束と効果的なコミュニケーションを促す協働戦略を学ぶ</li>
        <li>生産的でポジティブな職場環境を促進するためのチームダイナミクスを理解する</li>
        <li>Scrumのロール・成果物・イベントについての基礎知識を拡張し、アジャイルの価値観・原則と開発作業を整合させる</li>
        <li>継続的改善のマインドセットを身につけ、アジャイル主導のプロジェクト環境に適応する</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance, "Advanced Certified Scrum Developer (A-CSD)" 公式ページ</a></li>
        </ul>
      </div>

      <h3>1.2 A-CSD と CSD の違い(公式FAQより)</h3>

      <p>Scrum Alliance公式サイトのFAQでは、両者の違いを次のように説明しています。A-CSD®はCSD®で身につけたスキルを深化させ、より高度なアジャイル開発技法・強化されたチーム協働・広範なScrum理解に焦点を当てます。CSD®を取得済みの開発者が、次のステップとして選ぶ資格と位置づけられています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>項目</th><th>CSD®</th><th>A-CSD®</th></tr></thead>
          <tbody>
            <tr><td>トラック上の位置</td><td>第1段階(基礎)</td><td>第2段階(応用)</td></tr>
            <tr><td>前提資格</td><td>Scrum Alliance承認コースの受講のみ</td><td><strong>CSD®(有効/失効いずれでも可)、またはPSM IもしくはPSM IIの保有が必須</strong></td></tr>
            <tr><td>学習の焦点</td><td>Scrumでの開発の基礎、XPプラクティス入門</td><td>TDD・CI/CD・リファクタリング・チームダイナミクスの深化</td></tr>
            <tr><td>実務経験要件</td><td>明示的な年数要件なし</td><td>過去5年以内に<strong>12か月以上</strong>のScrum開発者/チームメンバーとしての実務経験</td></tr>
            <tr><td>次のステップ</td><td>A-CSD®</td><td>CSP-D®(Certified Scrum Professional - Developer)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance, A-CSD公式ページ FAQセクション「How is A-CSD different from CSD?」</a></li>
        </ul>
      </div>

      <h3>1.3 認定の価値(ベストプラクティスの観点)</h3>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>キャリアへの活用。</strong>Scrum Allianceの調査記事「Skills in the New World of Work」によれば、回答者の55%が関連認定を持つ候補者により高い給与を支払う意向を示しています。履歴書や面談で、A-CSD®を「技術力とチーム協働力の両方を認定された証」として位置づけると効果的です。</li>
          <li><strong>CSP-D®への足がかり。</strong>A-CSD®取得はCertified Scrum Professional® Developerに至る一里塚として公式に位置づけられています。長期的なキャリアパスを見据えるなら、CSD® → A-CSD® → CSP-D®の順に計画するのがベストプラクティスです。</li>
          <li><strong>バッジの継続的な価値。</strong>Scrum Allianceは「一度取得したら終わり」ではなく、Scrum Education Units (SEU) による2年ごとの更新を求めます。これは継続学習への姿勢そのものを証明する仕組みであるため、更新のための学習(書籍、ウェビナー、イベント参加など)をキャリア開発計画に組み込むことがベストプラクティスとされています。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance, A-CSD公式ページ「Benefits」および「Certifications with substance」セクション</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 2. Requirements ===================== -->
    <section id="acsd-requirements">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 03</div>
      <h2>2. 受験資格・コース要件(Requirements)</h2>

      <p>A-CSD®を取得するには、公式ページに明記された以下4つの要件をすべて満たす必要があります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_REQUIREMENTS_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">A-CSD® 取得までの要件フロー</div>
      </div>

      <h3>2.1 要件の詳細</h3>

      <ol>
        <li><strong>CSD®またはPSM I / PSM IIの保有。</strong>有効なCSD®でも、失効したCSD®でも要件を満たします。CSD®を持たない場合は、Scrum.orgのPSM IまたはPSM IIの保有でも前提資格を満たせます。CSD®で要件を満たした場合、A-CSD®取得と同時にCSD®は自動的に更新されます。</li>
        <li><strong>承認済みA-CSD®コースの受講。</strong>Individual Educator(認定教育者)ごとに独自のカリキュラム構成を持ちますが、公式LOに定義された学習目標はすべてのコースで共通してカバーされる必要があります。コース検索で「More Details」を確認し、講師ごとの特色を比較することが推奨されています。</li>
        <li><strong>実務経験。</strong>過去5年以内に、Scrum開発者またはScrumチームメンバーとして12か月以上の関連経験があること。</li>
        <li><strong>コースの完了。</strong>事前課題(pre-course work)・事後課題(post-course work)を含む、コースの全構成要素を完了すること。</li>
      </ol>

      <h3>2.2 認定の維持(ベストプラクティス)</h3>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>SEU(Scrum Education Units)の記録を習慣化する。</strong>書籍を読む、ウェビナーを視聴する、カンファレンスに参加するなど、学習機会ごとにSEUを記録しておくと、2年ごとの更新時に慌てずに済みます。</li>
          <li><strong>更新は2年サイクル。</strong>A-CSD®は2年ごとに更新が必要です。通常の更新経路は<strong>SEUの記録の提出と更新料の支払い</strong>の両方を行うことなので、カレンダーにリマインダーを設定しておくことがベストプラクティスです。</li>
          <li><strong>もう1つの更新経路(認定コースによる自動更新)。</strong>SEUの提出だけが唯一の方法ではありません。Scrum Allianceの認定コースを受講して新たな認定を取得した場合、保有する既存の認定は自動的に更新されます。これは同一トラックの上位認定に限らず、別トラックの認定コース(例: 開発者トラックの保有者がCSPO®コースを受講する場合)であっても更新経路になります(同一トラックの例: A-CSD®を取得するとCSD®が、CSP-D®を取得するとCSD®・A-CSD®が更新される)。次に受講したいコースがあるなら、更新タイミングと受講時期を合わせると無駄がありません。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance, A-CSD公式ページ「A-CSD requirements」セクション</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Alliance, "Scrum Education Units"</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">Scrum Alliance, "Renewing Certifications"</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. Bloom's Taxonomy ===================== -->
    <section id="blooms-taxonomy">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 04</div>
      <h2>3. Bloom's Taxonomy の復習 — LO の読み方</h2>

      <p>公式LO文書は、各学習目標が「A-CSD® の学習目標を無事修了した学習者は、〜できるようになる」という前提で書かれていると明記しています。この「できるようになる」の深さを表現するために、<strong>Bloom's Taxonomy(ブルームの分類学)</strong>の6段階が用いられます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_BLOOMS_TAXONOMY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Bloom's Taxonomy の6段階(知識 → 理解 → 応用 → 分析 → 統合 → 評価)</div>
      </div>

      <p>LOの動詞に注目すると、どのレベルが求められているかが分かります。たとえば "describe"(記述する)は理解レベル、"practice"(実践する)や "apply"(適用する)は応用レベル、"compare and contrast"(比較対照する)は分析レベル、"evaluate"(評価する)は評価レベルに相当します。CSD®のLOが主に「知識」「理解」「応用」に集中していたのに対し、A-CSD®のLOには「分析」「統合」「評価」レベルの動詞(evaluate, compare and contrast, demonstrateなど)が多く含まれる点が、A-CSD®がCSD®より高度であることの裏付けです。</p>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf" target="_blank" rel="noopener">Scrum Alliance, "Advanced Certified Scrum Developer (A-CSD) Learning Objectives" (2021年8月版) p.2「A note about Bloom's Taxonomy」</a></li>
        </ul>
      </div>

      <h3>3.1 A-CSD LO 全体構成</h3>

      <p>公式LO文書は、7つのカテゴリで構成されています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>カテゴリ(英語)</th><th>カテゴリ(日本語)</th><th>サブ項目数</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Lean, Agile &amp; Scrum</td><td>リーン・アジャイル・Scrum</td><td>7 (1.1–1.7)</td></tr>
            <tr><td>2</td><td>Collaboration &amp; Team Dynamics</td><td>協働とチームダイナミクス</td><td>6 (2.1–2.6)</td></tr>
            <tr><td>3</td><td>Architecture &amp; Design</td><td>アーキテクチャと設計</td><td>4 (3.1–3.4)</td></tr>
            <tr><td>4</td><td>Refactoring</td><td>リファクタリング</td><td>4 (4.1–4.4)</td></tr>
            <tr><td>5</td><td>Test Driven Development</td><td>テスト駆動開発</td><td>9 (5.1–5.9)</td></tr>
            <tr><td>6</td><td>Integrating Continuously</td><td>継続的インテグレーション</td><td>3 (6.1–6.3)</td></tr>
            <tr><td>7</td><td>Learning by Delivering Continuously</td><td>継続的デリバリーによる学習</td><td>4 (7.1–7.4)</td></tr>
          </tbody>
        </table>
      </div>

      <p>これらのLOは、以下の情報源を基礎として定義されています(公式文書「Purpose」セクションより)。</p>

      <ul>
        <li>Scrum Guide (scrumguides.org)</li>
        <li>Manifesto for Agile Software Development ― 4つの価値と12の原則 (agilemanifesto.org)</li>
        <li>Scrum Values (scrumalliance.org/about-scrum/values)</li>
        <li>Scrum Alliance Scrum Foundations Learning Objectives</li>
        <li>Scrum Alliance Guide Level Feedback</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf" target="_blank" rel="noopener">Scrum Alliance, "Advanced Certified Scrum Developer (A-CSD) Learning Objectives" (2021年8月版) p.1「Purpose」</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 4. Lean, Agile & Scrum ===================== -->
    <section id="lean-agile-scrum">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:route" aria-hidden="true" />SECTION 05</div>
      <h2>4. カテゴリ1 — Lean, Agile &amp; Scrum (LO 1.1–1.7)</h2>

      <p>このカテゴリは、開発者がScrumの枠組みを超えて「リーン思考」で自分たちの仕事の流れそのものを観察・改善できるようになることを目的としています。</p>

      <h3>LO 1.1 — ワークフローを可視化するモデリング技法を適用する [応用]</h3>

      <p><strong>説明</strong>: 「見えないものは改善できない」がリーンの大原則です。開発チームがコード変更・レビュー・テスト・デプロイに至るまでの作業がどのように流れているかを可視化する技法として、代表的なのが<strong>Value Stream Mapping(バリューストリームマッピング)</strong>と<strong>Cumulative Flow Diagram(累積フロー図)</strong>です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_VALUE_STREAM_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">開発ワークフローの待機時間と実作業時間の可視化</div>
      </div>

      <p>バリューストリームマップでは、各工程を「付加価値時間(Value-Add Time)」と「待機時間(Wait Time)」に分けて可視化し、フローエフィシェンシー(付加価値時間 ÷ 総リードタイム)を算出します。多くのソフトウェア開発現場では、このフローエフィシェンシーが数パーセント〜十数パーセントしかないことが可視化によって明らかになり、改善の出発点になります。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>実測データを使う。</strong>チーム全員でホワイトボードや付箋を使い、実際のカンバンボードの動きを1〜2週間観察してからマップを描く(推測ではなく実測データを使う)。</li>
          <li><strong>ステータスを細分化する。</strong>「作業中」のステータスを1つにまとめず、"開発中" "レビュー待ち" "レビュー中" "テスト待ち" のように細分化し、どこで滞留しているかを特定する。</li>
          <li><strong>定期的に更新する。</strong>可視化は一度で終わらせず、レトロスペクティブのたびに更新する定期的な習慣にする。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>手法の一般的な参照として Kanban Guide for Scrum Teams。学習目標の出典は <a href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf" target="_blank" rel="noopener">Scrum Alliance, A-CSD LO 1.1 (2021)</a></li>
        </ul>
      </div>

      <h3>LO 1.2 — 作業システムの改善点を特定するのに役立つ概念を3つ以上説明する [理解]</h3>

      <p><strong>説明</strong>: リーン思考には、作業システムのボトルネックや無駄を発見するための概念群があります。代表的なものを3つ紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>概念</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td><strong>WIP制限 (Work In Progress limit)</strong></td><td>同時に着手できる作業数を制限することで、マルチタスクによるコンテキストスイッチのコストを減らし、フローを速める</td></tr>
            <tr><td><strong>Little's Law(リトルの法則)</strong></td><td>平均サイクルタイム = 平均WIP ÷ 平均スループット。WIPを減らせばサイクルタイムが短縮されることを数学的に示す</td></tr>
            <tr><td><strong>7つの無駄(ムダ)</strong></td><td>製造業由来のリーンの無駄の考え方をソフトウェア開発に翻訳したもの(次のLO 1.3で詳述)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>WIP制限は控えめに始める。</strong>まず「今の実測値-1」程度から始め、チームが窮屈さを感じながら学習する余地を残す。</li>
          <li><strong>Little's Lawは測定を伴わせる。</strong>理論の暗記よりも、実際のチームのサイクルタイムとスループットを継続的に測定し、数値の変化を追うことに価値がある。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 1.2。概念の一般的背景としてリーン生産方式およびカンバン方法論の文献</li>
        </ul>
      </div>

      <h3>LO 1.3 — プロダクト開発環境における3種類以上の無駄と、それをScrumチームのDefinition of Doneでどう対処できるかを議論する [理解]</h3>

      <p><strong>説明</strong>: ソフトウェア開発におけるリーンの「無駄」の代表例を挙げます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>無駄の種類</th><th>ソフトウェア開発での具体例</th><th>DoDでの対処例</th></tr></thead>
          <tbody>
            <tr><td>未完成の作業(Partially Done Work)</td><td>マージされていないブランチ、書きかけのコード</td><td>「mainにマージ済み」をDoDの条件に含める</td></tr>
            <tr><td>余分な機能(Extra Features)</td><td>使われる見込みのない機能の作り込み</td><td>YAGNI原則をDoDのレビュー基準に組み込む</td></tr>
            <tr><td>再学習(Relearning)</td><td>ドキュメント不足による同じ調査の繰り返し</td><td>「READMEを更新済み」をDoDに含める</td></tr>
            <tr><td>引き継ぎ(Handoffs)</td><td>開発者からQAへの引き継ぎ待ち</td><td>「受入テストまで完了している」をDoDに含め、QA待ちの状態を「完了」と数えない</td></tr>
            <tr><td>遅延(Delays)</td><td>コードレビュー待ち、CI待ち</td><td>「コードレビュー承認済み」「CIがグリーン」をDoDの必須条件にする</td></tr>
            <tr><td>欠陥(Defects)</td><td>バグの後戻り作業</td><td>「自動テストがグリーン」をDoDの必須条件にする</td></tr>
            <tr><td>タスクの切り替え(Task Switching)</td><td>複数プロジェクトの掛け持ち</td><td>DoDを満たした項目だけを「完了」と数え、仕掛かりのまま次へ移らない</td></tr>
          </tbody>
        </table>
      </div>

      <p>DoDは<strong>Incrementが満たすべき品質条件</strong>を定義するものであり、「どう進めるか」の取り決めは含みません。上記の無駄に対しては、DoDとは別に<strong>作業ルール(ワーキングアグリーメント)</strong>として次を定めます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>作業ルール</th><th>対処する無駄</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>ペアプログラミング/モブプログラミング</td><td>引き継ぎ</td><td>レビューとテストを作業と同時に行い、引き継ぎ自体を発生させない</td></tr>
            <tr><td>レビューSLA(例: 24時間以内)</td><td>遅延</td><td>レビュー待ち時間の上限をチーム規約として合意する</td></tr>
            <tr><td>WIP制限</td><td>タスクの切り替え</td><td>同時に着手できる項目数に上限を設け、切り替えを構造的に抑える</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>根本原因を深掘りする。</strong>無駄を見つけたら、まず「なぜこの無駄が発生するのか」を5 Whysなどで深掘りしてから、DoDに項目を追加する。DoDに項目を足すだけでは根本原因は解決しないことが多い。</li>
          <li><strong>DoDは段階的に育てる。</strong>一度に完璧にしようとせず、無駄を1つ特定するたびに1項目ずつ育てていく。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 1.3。無駄の分類は Mary &amp; Tom Poppendieck による "Implementing Lean Software Development" の7つの無駄が一般的な参照元</li>
        </ul>
      </div>

      <h3>LO 1.4 — Definition of Done (DoD) を策定し反復的に進化させることを実践し、DoDが進化すべき理由を3つ以上特定する [応用]</h3>

      <p><strong>説明</strong>: Scrum GuideはDefinition of Doneを「Increment(インクリメント)の品質基準に対する正式な記述」と定義し、成果物がScrumチームの基準を満たしているかを検査するために用いると説明しています。DoDはチームの成熟度や製品の状況に応じて進化すべきものであり、一度作って終わりではありません。</p>

      <p><strong>DoDが進化すべき理由(3つの代表例)</strong></p>
      <ol>
        <li><strong>技術的能力の向上</strong>: 自動テストのカバレッジが上がり、以前は手動で確認していた項目が自動化できるようになった。</li>
        <li><strong>プロダクトの成熟</strong>: 新規プロダクトの初期段階では緩やかだった基準を、本番運用が始まってからセキュリティスキャンやパフォーマンステストを追加して厳格化する。</li>
        <li><strong>過去の問題からの学習</strong>: 本番障害やレトロスペクティブで見つかった問題を教訓に、再発防止のための項目を追加する。</li>
      </ol>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_DOD_EVOLUTION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Definition of Done がレトロスペクティブを通じて進化するループ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>チーム全体で合意する。</strong>DoDの変更は必ずScrum Team全体(開発者・Product Owner・Scrum Master)で合意する。一方的な追加は形骸化を招く。</li>
          <li><strong>背景を記録する。</strong>新しいDoD項目を追加したら、なぜ追加したのかという背景をチームのワークスペースに記録し、新しいメンバーが経緯を理解できるようにする。</li>
          <li><strong>単一の定義として保つ。</strong>DoDはIncrementに共通して適用される単一の定義として保つ(Scrum Guide 2020)。粒度別に複数のDoDを並べると、どのIncrementが「完成」なのかの判断が分裂する。</li>
          <li><strong>リリースチェックリストと分離する。</strong>毎スプリントでは不要だがリリース時にのみ必要な確認(ブラウザ互換性テストの全マトリクス実行など)は、DoDに混ぜずリリースチェックリストとして別に管理する。DoDはあくまで「Incrementが利用可能であるための最低条件」に絞る。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Ken Schwaber &amp; Jeff Sutherland, "The Scrum Guide" (2020)</a></li>
          <li>A-CSD LO 1.4</li>
        </ul>
      </div>

      <h3>LO 1.5 — 複数チームで1つのプロダクトを扱う際に生じる課題に対処するための手法を3つ以上議論する [理解]</h3>

      <p><strong>説明</strong>: 単一チームのScrumがうまく機能しても、プロダクトが成長し複数チームが同じプロダクトバックログを扱うようになると、依存関係や重複作業といった新しい課題が生まれます。代表的な対処法を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>手法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>Scrum of Scrums</strong></td><td>各チームの代表者が定期的に集まり、チーム間の依存関係や障害を調整する会議体</td></tr>
            <tr><td><strong>共通のDefinition of Done</strong></td><td>複数チームが同じ品質基準を共有し、統合時の手戻りを防ぐ</td></tr>
            <tr><td><strong>統合の頻度を上げる(トランクベース開発など)</strong></td><td>各チームの変更を頻繁に主幹ブランチへ統合し、コンフリクトを小さく保つ</td></tr>
            <tr><td><strong>コードの共同所有(Collective Code Ownership)の拡張</strong></td><td>チーム間でもコードの所有権を過度に分断しない文化を作る</td></tr>
            <tr><td><strong>依存関係ボード(Dependency Board)</strong></td><td>チーム間の依存関係を可視化し、計画時に早期発見する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>分割の必要性自体を疑う。</strong>複数チーム間の調整コストそのものも「無駄」になり得るため、まず「本当に複数チームに分割する必要があるか」をチーム構成の見直しで検討する。</li>
          <li><strong>アーキテクチャへ投資する。</strong>技術的な依存を減らすアーキテクチャ(疎結合なマイクロサービス、明確なAPI契約など)への投資は、プロセス上の調整コストを恒久的に下げる効果がある。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 1.5。Scrum of Scrumsの一般的な参照として Scrum Alliance / Scrum.org のスケーリング関連リソース</li>
        </ul>
      </div>

      <h3>LO 1.6 — レトロスペクティブの結果として自分やチームが取り入れた改善を1つ以上評価する [評価]</h3>

      <p><strong>説明</strong>: このLOはBloomの「評価」レベルに位置し、単に改善を実施したことを述べるだけでなく、その改善が実際にどのような効果をもたらしたかを<strong>評価</strong>することが求められます。</p>

      <p><strong>評価の観点例</strong></p>
      <ul>
        <li>改善前後で、サイクルタイムや欠陥数などの指標がどう変化したか</li>
        <li>チームの心理的な負荷や満足度がどう変わったか(定性的な観察も含む)</li>
        <li>意図しない副作用が生じなかったか</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>振り返りを継続する。</strong>レトロスペクティブで決めたアクションアイテムは、次のレトロスペクティブで必ず「あの改善はどうだったか」を振り返る時間を設ける(やりっぱなしにしない)。</li>
          <li><strong>ビフォーアフター比較を使う。</strong>改善の評価には、実験の前後で同じ指標を測定する「ビフォーアフター比較」の考え方を使う。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 1.6。継続的改善の枠組みとして <a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum GuideのRetrospectiveイベントの目的規定</a></li>
        </ul>
      </div>

      <h3>LO 1.7 — 開発作業に関するビジネス視点を1つ以上議論する [理解]</h3>

      <p><strong>説明</strong>: 開発者が技術的な正しさだけでなく、ビジネス価値・投資対効果・市場投入までの時間といった経営視点を理解することを求めるLOです。たとえば、「技術的負債を今解消するコスト」と「新機能を今リリースして得られる収益」のトレードオフを、開発者自身がビジネス言語で説明できることが期待されます。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>ビジネスインパクトで説明する。</strong>Product Ownerとの対話で、技術的な提案(リファクタリング、ライブラリの更新など)を行う際は「なぜ今それをやるべきか」をビジネスインパクト(顧客への影響、将来の開発速度への影響)で説明する習慣をつける。</li>
          <li><strong>比喩を使う。</strong>技術的負債の説明にはMartin Fowlerの「Technical Debt Quadrant」のような比喩を使うと、非技術者にも伝わりやすい(第7章で詳述)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 1.7</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 5. Collaboration & Team Dynamics ===================== -->
    <section id="collaboration-team-dynamics">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users" aria-hidden="true" />SECTION 06</div>
      <h2>5. カテゴリ2 — Collaboration &amp; Team Dynamics (LO 2.1–2.6)</h2>

      <p>このカテゴリは、開発者が「一人で書く技術」から「チームで作り上げる技術」へと視野を広げることを目的としています。</p>

      <h3>LO 2.1 — 協働の異なるアプローチを3つ以上比較対照する [分析]</h3>

      <p><strong>説明</strong>: ソフトウェアを共同で作る方法には強度の異なる複数のアプローチがあります。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_COLLABORATION_SPECTRUM" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">ソロプログラミングからモブプログラミングまでの協働の強度スペクトラム</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>知識共有の速さ</th><th>リアルタイム性</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>ソロプログラミング + 非同期コードレビュー</td><td>遅い(レビュー時のみ)</td><td>なし</td><td>定型的な作業、個人の集中が必要なタスク</td></tr>
            <tr><td>ペアプログラミング</td><td>速い(常時)</td><td>高い</td><td>複雑なロジック、知識の属人化を防ぎたい箇所</td></tr>
            <tr><td>モブプログラミング</td><td>最速(チーム全体)</td><td>最高</td><td>難解な問題、チーム全体でのオンボーディング、アーキテクチャ上の重要な意思決定</td></tr>
            <tr><td>非同期レビュー中心(GitHubのPull Requestなど)</td><td>遅い</td><td>なし</td><td>分散チーム、タイムゾーンが異なるメンバー間</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>タスクに応じて使い分ける。</strong>1つの方法に固定せず、タスクの性質に応じて使い分ける(単純なCRUD実装はソロ+レビュー、複雑な並行処理はペアやモブ、というように)。</li>
          <li><strong>意図的に使う。</strong>ペア/モブプログラミングは「常に全員で全部やる」ものではなく、必要な場面を見極めて意図的に使う。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.1。Extreme Programmingにおけるペアプログラミングの原典として Kent Beck, "Extreme Programming Explained"、実践解説として <a href="https://en.wikipedia.org/wiki/Extreme_programming_practices" target="_blank" rel="noopener">Wikipedia "Extreme programming practices"</a></li>
        </ul>
      </div>

      <h3>LO 2.2 — 傾聴と相互理解を改善する技法を1つ以上適用する [応用]</h3>

      <p><strong>説明</strong>: チーム開発における対立の多くは、技術的な正しさの違いではなく「聞けていない」ことに起因します。代表的な傾聴技法を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>アクティブリスニング</strong></td><td>相手の発言を要約して返す("つまり〜ということですね?")ことで理解を確認する</td></tr>
            <tr><td><strong>5 Whys</strong></td><td>表面的な意見の奥にある根本的な関心事を掘り下げる質問法</td></tr>
            <tr><td><strong>ラウンドロビン</strong></td><td>発言の順番を回すことで、声の大きい人だけが話す状況を防ぐ</td></tr>
            <tr><td><strong>サイレントブレインストーミング</strong></td><td>まず各自が付箋に書き出してから共有することで、早期の同調圧力を避ける</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>相手の主張を要約してから反論する。</strong>技術的な議論が平行線になったときほど、まず相手の主張を自分の言葉で要約してから反論する(「あなたの懸念は〜ということだと理解しました。その上で私は〜と考えます」)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.2</li>
        </ul>
      </div>

      <h3>LO 2.3 — フィードバックを与え、受け取ることを実践する [応用]</h3>

      <p><strong>説明</strong>: 効果的なフィードバックには構造があります。代表的なフレームワークがSBIモデル(Situation-Behavior-Impact)です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_SBI_MODEL" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">SBIモデル(状況 → 行動 → 影響)によるフィードバック構造</div>
      </div>

      <p>例: 「昨日のコードレビュー(Situation)で、あなたがPRの意図を1行で説明するコメントを添えてくれた(Behavior)ことで、レビューが5分早く終わった(Impact)。」</p>

      <h4>フィードバックを受け取る側のベストプラクティス</h4>
      <ul>
        <li>防御的にならず、まず「教えてくれてありがとう」と受け止める。</li>
        <li>その場で反論せず、一度持ち帰って検討する余地を自分に与える。</li>
      </ul>

      <h4>フィードバックを与える側のベストプラクティス</h4>
      <ul>
        <li>人格ではなく行動に焦点を当てる("あなたは雑だ"ではなく"このコミットメッセージからは変更意図が読み取れなかった")。</li>
        <li>ポジティブなフィードバックも同じくらい意識的に伝える(ネガティブなものだけがフィードバックではない)。</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.3</li>
        </ul>
      </div>

      <h3>LO 2.4 — 協働的な開発プラクティスを1つ以上適用する [応用]</h3>

      <p><strong>説明</strong>: 「協働的な開発プラクティス」とは、コードを書く行為そのものを個人作業から共同作業に変えるプラクティス群を指します。ペアプログラミング、モブプログラミング、コードレビュー、コラボレーティブリファインメント(バックログの共同精緻化)などが該当します。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>役割を明確にし定期的に交代する。</strong>ペアプログラミングでは「ドライバー(キーボードを操作する人)」と「ナビゲーター(全体を見て指示・レビューする人)」の役割を明確にし、定期的に(例: 25分ごとに)交代する。</li>
          <li><strong>強いスタイルを使う。</strong>モブプログラミングでは「強いスタイル(Strong-Style Pairing)」――ナビゲーターがアイデアを口頭で伝え、ドライバーはそれをタイプするだけに徹する――という運営ルールを使うと、声の大きい人だけがキーボードを独占する事態を防げる。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.4。Strong-Style Pairingの概念はLlewellyn Falco氏の提唱として広く参照される</li>
        </ul>
      </div>

      <h3>LO 2.5 — 使用率(Utilization)・効率性(Efficiency)・有効性(Effectiveness)の違いを説明する [理解]</h3>

      <p><strong>説明</strong>: この3つの概念はしばしば混同されますが、明確に区別する必要があります。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>概念</th><th>定義</th><th>落とし穴</th></tr></thead>
          <tbody>
            <tr><td><strong>使用率 (Utilization)</strong></td><td>メンバーやリソースがどれだけ「稼働」しているかの割合</td><td>使用率100%を目指すとキューが詰まり、待ち行列理論的にリードタイムが急増する</td></tr>
            <tr><td><strong>効率性 (Efficiency)</strong></td><td>投入したリソースに対してどれだけ多くのアウトプットを生み出したか</td><td>効率的だが顧客にとって価値のないものを大量生産するリスクがある</td></tr>
            <tr><td><strong>有効性 (Effectiveness)</strong></td><td>そもそも正しいことをやれているか(目的達成度)</td><td>測定が難しく、しばしば軽視される</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>あえて余白を残す。</strong>チームの稼働率を100%に近づけようとするマネジメントは、待ち行列理論(M/M/1キューモデルなど)の観点から見ると、リードタイムを悪化させる典型的なアンチパターンである。あえて余白(スラック)を残す。</li>
          <li><strong>忙しさと価値を混同しない。</strong>「忙しく見えること」と「価値を生んでいること」は別物であると、開発者自身がチームやステークホルダーに説明できるようにする。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.5。使用率と待ち行列理論の関係については Donald G. Reinertsen, "The Principles of Product Development Flow" が広く参照される一次資料</li>
        </ul>
      </div>

      <h3>LO 2.6 — プロダクトバックログアイテムをスプリントに収まるようサイズ調整する方法を1つ以上実践する [応用]</h3>

      <p><strong>説明</strong>: 大きすぎるプロダクトバックログアイテム(PBI)はスプリント内で完了できず、未完了作業(前述の「無駄」の一種)を生みます。代表的な分割・見積り技法を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>技法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>相対見積り(Planning Poker、T-シャツサイズ)</strong></td><td>絶対時間ではなく相対的な複雑さでサイズを見積もる</td></tr>
            <tr><td><strong>INVESTの原則によるストーリー分割</strong></td><td>Independent, Negotiable, Valuable, Estimable, Small, Testableの観点でPBIを評価し、Smallでなければ分割する</td></tr>
            <tr><td><strong>ワークフローによる分割(Workflow Steps)</strong></td><td>「作成」「更新」「削除」のように操作単位で分割する</td></tr>
            <tr><td><strong>バリエーションによる分割(Business Rule Variations)</strong></td><td>「通常ケース」「例外ケース」のように条件分岐で分割する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>50%ルールで分割を検討する。</strong>PBIがスプリントの50%以上のキャパシティを占めるようであれば、着手前に分割を検討する。</li>
          <li><strong>垂直スライスにする。</strong>分割の際は、分割後の各PBIが単独でリリース可能・テスト可能な「垂直スライス」になるようにする(技術レイヤーごとの水平分割は避ける)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 2.6。INVESTの原則は Bill Wake が提唱し、Mike Cohnの著作を通じて広く普及した基準</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 6. Architecture & Design ===================== -->
    <section id="architecture-design">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building" aria-hidden="true" />SECTION 07</div>
      <h2>6. カテゴリ3 — Architecture &amp; Design (LO 3.1–3.4)</h2>

      <p>このカテゴリは、アジャイルな文脈における設計・アーキテクチャの考え方を扱います。「事前に全てを設計してから作る」ウォーターフォール的な発想と、Scrumの反復的・漸進的な開発は本質的に緊張関係にあります。この緊張をどう扱うかがテーマです。</p>

      <h3>LO 3.1 — 事前設計(Up-Front Architecture)と創発的設計(Emergent Architecture)の違いを3つ以上説明する [理解]</h3>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_ARCHITECTURE_APPROACHES" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">事前設計と創発的設計、それぞれの進め方の違い</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>観点</th><th>事前設計</th><th>創発的設計</th></tr></thead>
          <tbody>
            <tr><td>意思決定のタイミング</td><td>プロジェクト初期にまとめて決定</td><td>必要になった時点で、最新の情報を基に決定(Last Responsible Moment)</td></tr>
            <tr><td>変更への態度</td><td>変更は「設計の失敗」とみなされがち</td><td>変更は前提であり、リファクタリングで吸収する</td></tr>
            <tr><td>前提知識</td><td>ドメインと要件を十分理解している必要がある</td><td>実装しながら理解を深めていける</td></tr>
            <tr><td>リスク</td><td>誤った前提に基づく設計への投資が無駄になるリスク</td><td>場当たり的な設計の蓄積によるアーキテクチャ崩壊のリスク</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>ハイブリッドで判断する。</strong>「すべてを創発に委ねる」のではなく、変更コストが非常に高い決定(データベースの選定、外部システムとの契約、セキュリティモデルなど)は事前に検討し、変更コストの低い決定(クラス内部の構造など)は創発に任せるというハイブリッドが実務的である。</li>
          <li><strong>決定を早めすぎない。</strong>「Last Responsible Moment(決定を先延ばしにできる最後の瞬間まで引き延ばす)」という考え方を採用し、決定を早めすぎない。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 3.1。Last Responsible MomentはMary &amp; Tom Poppendieckの著作を通じて広く参照されるリーン開発の概念</li>
        </ul>
      </div>

      <h3>LO 3.2 — アジャイルなアーキテクチャの検討に情報を与える設計原則を3つ以上説明する [理解]</h3>

      <p><strong>説明</strong>: アジャイル環境での設計判断を導く原則として、代表的な3つ(実際には広く知られる5原則のうち代表例)を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>原則</th><th>頭文字</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td><strong>単一責任の原則 (SRP)</strong></td><td>S</td><td>クラス/モジュールが変更される理由は1つであるべき</td></tr>
            <tr><td><strong>開放閉鎖の原則 (OCP)</strong></td><td>O</td><td>拡張に対して開いていて、修正に対して閉じているべき</td></tr>
            <tr><td><strong>YAGNI (You Aren't Gonna Need It)</strong></td><td>—</td><td>今必要ないものは作らない</td></tr>
            <tr><td><strong>DRY (Don't Repeat Yourself)</strong></td><td>—</td><td>知識の重複を避け、単一の場所に集約する</td></tr>
            <tr><td><strong>関心の分離 (Separation of Concerns)</strong></td><td>—</td><td>異なる関心事(表示ロジック、業務ロジック、永続化など)を分離する</td></tr>
          </tbody>
        </table>
      </div>

      <p>これらはRobert C. Martin(通称"Uncle Bob")が体系化した<strong>SOLID原則</strong>(単一責任・開放閉鎖・リスコフの置換・インターフェース分離・依存性逆転)の一部と、XPが重視するYAGNI・シンプルデザインの原則を組み合わせたものです。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>理由とともに適用する。</strong>原則を教条的に適用するのではなく、「なぜこの原則が今のコードの変更コストを下げるのか」を都度説明できるようにする。</li>
          <li><strong>Rule of Threeで判断する。</strong>YAGNIとSRPはしばしば緊張関係にある(将来の拡張性のために抽象化しすぎると複雑性が増す)。迷ったらシンプルな方を選び、実際に2つ目の要件が出てきた時点で抽象化する("Rule of Three")。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 3.2。SOLID原則はRobert C. Martinの著作・記事群を通じて体系化された設計原則</li>
        </ul>
      </div>

      <h3>LO 3.3 — システム制約を設計・検証する方法を3つ以上説明し、うち1つを実践する [応用]</h3>

      <p><strong>説明</strong>: 「システム制約」とは、パフォーマンス・可用性・セキュリティ・スケーラビリティといった非機能要件を指します。これらをアジャイルに設計・検証する方法を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>方法</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>アーキテクチャ適合度関数(Fitness Functions)</strong></td><td>パフォーマンス・セキュリティなどの非機能要件を自動テストとしてコード化し、CIパイプラインで継続的に検証する</td></tr>
            <tr><td><strong>負荷テスト・パフォーマンステスト</strong></td><td>想定される負荷条件下でシステムを実際に動かし、SLA(応答時間など)を満たすか検証する</td></tr>
            <tr><td><strong>カオスエンジニアリング</strong></td><td>意図的に障害を注入し、システムの回復力を検証する</td></tr>
            <tr><td><strong>アーキテクチャ決定記録(ADR)</strong></td><td>制約に関する意思決定とトレードオフを記録し、後から検証・再考できるようにする</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>自動テストに組み込む。</strong>非機能要件は「最後にまとめて確認する」のではなく、Fitness Functionsのように自動テストの一部として組み込み、リグレッションを早期に検知する。</li>
          <li><strong>DoDに明示する。</strong>非機能要件をDefinition of Doneに明示的に含める(例: 「API応答時間が200ms以内であることを自動テストで確認済み」)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 3.3。Fitness Functionsの概念はNeal Ford, Rebecca Parsons, Patrick Kua, "Building Evolutionary Architectures" で体系化された用語</li>
        </ul>
      </div>

      <h3>LO 3.4 — コード・プロダクト品質メトリクスを3つ以上比較対照する [分析]</h3>

      <p><strong>説明</strong>: コードの品質を定量的に把握するためのメトリクスを紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>メトリクス</th><th>何を測るか</th><th>注意点</th></tr></thead>
          <tbody>
            <tr><td><strong>循環的複雑度 (Cyclomatic Complexity)</strong></td><td>コード内の分岐パスの数。テストに必要な最小ケース数の目安にもなる</td><td>数値だけを追うと、無理な分割でかえって可読性が落ちることがある</td></tr>
            <tr><td><strong>結合度と凝集度 (Coupling &amp; Cohesion)</strong></td><td>モジュール間の依存の強さ(結合度は低いほど良い)、モジュール内の要素のまとまり(凝集度は高いほど良い)</td><td>定性的な判断が必要で、単一の数値化は難しい</td></tr>
            <tr><td><strong>テストカバレッジ (Code Coverage)</strong></td><td>テストによって実行されたコード行の割合</td><td>カバレッジが高くても、アサーションが弱ければ品質は保証されない("カバレッジの罠")</td></tr>
            <tr><td><strong>技術的負債の比率 (Technical Debt Ratio)</strong></td><td>修正に必要な推定コストと、開発に要した推定コストの比率(SonarQubeなどのツールで算出)</td><td>ツールの推定モデルに依存するため、絶対値よりトレンドを見る</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>複数のメトリクスを組み合わせる。</strong>単一のメトリクスに頼らず、複数のメトリクスを組み合わせてコードの健全性を多面的に把握する。</li>
          <li><strong>人事評価に使わない。</strong>メトリクスを「人事評価」に使わない。メトリクスの数値を上げること自体が目的化すると、無意味なテストの水増しなど逆効果な行動を誘発する(グッドハートの法則)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 3.4。循環的複雑度はThomas J. McCabeの1976年の論文が原典</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. Refactoring ===================== -->
    <section id="refactoring">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:tool" aria-hidden="true" />SECTION 08</div>
      <h2>7. カテゴリ4 — Refactoring (LO 4.1–4.4)</h2>

      <p>このカテゴリは、A-CSD®がCSD®から一段深化する象徴的な領域です。CSD®がリファクタリングの「存在と目的」を扱うのに対し、A-CSD®は「非技術者への説明」や「技術的負債の原因分析」まで踏み込みます。</p>

      <h3>LO 4.1 — 保守性のためにシステムをリファクタリングするアプローチを1つ以上実演する [応用]</h3>

      <p><strong>説明</strong>: Martin Fowlerはリファクタリングを「外部から見た振る舞いを変えずに、ソフトウェアの内部構造を変更するプロセス」と定義しています。代表的なリファクタリングのワークフローを示します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_REFACTORING_WORKFLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">安全なリファクタリングのワークフロー</div>
      </div>

      <p>代表的なリファクタリングカタログの技法には、Extract Method(メソッドの抽出)、Extract Class(クラスの抽出)、Rename(名前の変更)、Move Method(メソッドの移動)、Replace Conditional with Polymorphism(条件分岐をポリモーフィズムに置き換える)などがあります。これらはMartin Fowlerの書籍『Refactoring: Improving the Design of Existing Code』で40以上がカタログ化されています。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>コミットを分離する。</strong>リファクタリングと機能追加は同じコミットに混ぜない。「先にリファクタリング、次に機能追加」あるいはその逆の順で、コミットを分離する。</li>
          <li><strong>小さな一歩を積み重ねる。</strong>一度に大きな構造変更を狙わず、常に小さく安全な一歩(コンパイルが通り、テストが通る状態)を積み重ねる。</li>
          <li><strong>IDEの自動リファクタリングを使う。</strong>IDEの自動リファクタリング機能(Rename, Extract Methodなど)を積極的に使い、手作業によるミスを減らす。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://refactoring.com/" target="_blank" rel="noopener">Martin Fowler et al., "Refactoring: Improving the Design of Existing Code" (Addison-Wesley, 1999/2018) ― 書籍公式サイト</a></li>
        </ul>
      </div>

      <h3>LO 4.2 — コード・プロダクトの「におい(smell)」を3つ以上説明し、そのうち1つへのリファクタリングでのアプローチを示す [応用]</h3>

      <p><strong>説明</strong>: 「コードスメル(Code Smell)」とは、Martin Fowlerが「表面的な兆候であり、通常はシステム内のより深い問題に対応するもの」と定義した概念です。バグではありませんが、放置すると保守性を悪化させる警告サインです。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>コードスメル</th><th>兆候</th><th>対応するリファクタリング</th></tr></thead>
          <tbody>
            <tr><td><strong>重複コード (Duplicated Code)</strong></td><td>同じ、あるいは酷似したコード構造が複数箇所に存在する</td><td>Extract Method / Extract Class、Pull Up Method</td></tr>
            <tr><td><strong>長すぎるメソッド (Long Method)</strong></td><td>1つのメソッドが多くのことをやりすぎている</td><td>Extract Method で責務を分割する</td></tr>
            <tr><td><strong>ショットガン手術 (Shotgun Surgery)</strong></td><td>1つの変更のために多数のクラスに少しずつ修正が必要になる</td><td>Move Method / Move Field で関連する責務を1箇所にまとめる</td></tr>
            <tr><td><strong>神クラス (God Class / The Blob)</strong></td><td>1つのクラスがシステムの大部分の責務を抱え込んでいる</td><td>Extract Class で責務ごとに分割する</td></tr>
            <tr><td><strong>原始的な執着 (Primitive Obsession)</strong></td><td>intやStringなどのプリミティブ型で本来はドメインの概念を表現している</td><td>Replace Primitive with Object(値オブジェクトの導入)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>注意信号として扱う。</strong>コードスメルは「即座に直すべきバグ」ではなく「注意信号」として扱う。触っている箇所にスメルがあれば直す(ボーイスカウトルール: "来た時よりも美しく")が、無関係な箇所まで探しに行く必要はない。</li>
          <li><strong>静的解析ツールで自動検出する。</strong>リンター・静的解析ツール(SonarQube、ESLintなど)でスメルの一部を自動検出し、レビューの負荷を下げる。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/CodeSmell.html" target="_blank" rel="noopener">Martin Fowler, "Bliki: CodeSmell"</a></li>
        </ul>
      </div>

      <h3>LO 4.3 — 非技術者のステークホルダーにリファクタリングを説明する [理解]</h3>

      <p><strong>説明</strong>: 開発者にとって自明なリファクタリングの価値も、非技術者には「見た目が何も変わらないのに時間を使う作業」に映りがちです。効果的な説明には比喩が有効です。</p>

      <div class="callout note" data-testid="callout" data-variant="note">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
        <p>説明の型(例): 「新しい家具を部屋に置くたびに部屋の配置を少し整理するようなものです。整理をサボり続けると、いずれ新しい家具を置く場所すらなくなってしまいます。リファクタリングは、次の機能を素早く安全に追加できる状態を保つための、継続的な整理整頓です。」</p>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>目に見えない投資として説明する。</strong>リファクタリングを「コストのかかる別作業」としてではなく、「機能開発の一部として常に発生する、目に見えない投資」として説明する。</li>
          <li><strong>投資対効果を可視化する。</strong>可能であれば、リファクタリング後に「次の機能がどれだけ早く/安全に実装できたか」を実例で示し、投資対効果を可視化する。</li>
          <li><strong>通常業務として組み込む。</strong>ビジネス側に許可を求める形ではなく、通常の開発作業の一部として組み込み、必要な場合のみ大きなリファクタリングについて透明性を持って共有する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 4.3。非技術者への説明アプローチはリファクタリング実践コミュニティで広く共有される手法</li>
        </ul>
      </div>

      <h3>LO 4.4 — 技術的負債を説明し、その原因を3つ以上挙げ、そのうち1つへの対処法を議論する [分析]</h3>

      <p><strong>説明</strong>: <strong>技術的負債(Technical Debt)</strong>は、Ward Cunninghamが考案した比喩で、「設計を疎かにすることは、お金を借りることに似ている」という考え方です。Martin Fowlerはこれをさらに発展させ、「意図的か否か」「思慮深いか無謀か」の2軸で技術的負債を4象限に分類する<strong>Technical Debt Quadrant</strong>を提唱しました。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TECHNICAL_DEBT_QUADRANT" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Martin Fowler の Technical Debt Quadrant(意図的/無自覚 × 思慮深い/無謀)</div>
      </div>

      <p><strong>技術的負債の原因(代表例3つ)</strong></p>
      <ol>
        <li><strong>市場投入の期限プレッシャー</strong>: リリース期日を優先し、意図的に設計を簡略化する(思慮深く意図的な負債)。</li>
        <li><strong>知識・経験の不足</strong>: 良い設計パターンを知らないまま実装してしまう(無謀で無自覚な負債)。</li>
        <li><strong>要件やビジネス環境の変化</strong>: 設計時点では最適だったが、事業方針の変化で前提が崩れた(思慮深く無自覚な負債、あるいは環境変化型)。</li>
      </ol>

      <p><strong>対処法の例(原因1: 期限プレッシャーへの対処)</strong></p>
      <ul>
        <li>負債を負う判断をする際は、チームとProduct Ownerが共同で「なぜ負債を負うのか」「いつ返済するのか」を明示的に合意し、バックログにリファクタリングのアイテムとして記録する(負債を「見えない」ままにしない)。</li>
        <li>スプリントの一定割合(例: 10〜20%)を技術的負債の返済に恒常的に割り当てるルールをチームで運用する。</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>一律に断罪しない。</strong>技術的負債を「悪」と一律に断罪しない。意図的で思慮深い負債は、しばしば合理的なビジネス判断である。問題視すべきは「無自覚・無謀」な負債の蓄積である。</li>
          <li><strong>負債を可視化する。</strong>負債の状態を可視化する(バックログにタグ付けする、静的解析ツールでトレンドを追うなど)ことで、経営層との対話を可能にする。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">Martin Fowler, "Bliki: TechnicalDebtQuadrant"</a></li>
          <li><a href="https://martinfowler.com/bliki/TechnicalDebt.html" target="_blank" rel="noopener">Ward Cunninghamによる技術的負債の比喩の一般的解説(Martin Fowler, "Bliki: TechnicalDebt" にて要約)</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 8. Test Driven Development ===================== -->
    <section id="test-driven-development">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flask" aria-hidden="true" />SECTION 09</div>
      <h2>8. カテゴリ5 — Test Driven Development (LO 5.1–5.9)</h2>

      <p>このカテゴリは公式LOの中で最もサブ項目数が多く(9項目)、A-CSD®の中核をなす技術領域です。TDDを「設計技法」として捉える視点が全体を貫いています。</p>

      <h3>LO 5.1 — TDDの指導原則を3つ以上再言し、それらがなぜ必要かを説明する [理解]</h3>

      <p><strong>説明</strong>: Kent BeckがExtreme Programmingの一部として体系化したTDDは、「Red → Green → Refactor」という短いサイクルの反復です。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TDD_CYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">TDDのRed-Green-Refactorサイクル</div>
      </div>

      <p><strong>指導原則(代表例3つ)となぜ必要か</strong></p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>原則</th><th>なぜ必要か</th></tr></thead>
          <tbody>
            <tr><td><strong>テストを先に書く</strong></td><td>実装前にインターフェースの使い勝手を考えることになり、テスタブルな(=多くの場合、疎結合な)設計が自然と生まれる</td></tr>
            <tr><td><strong>一度に1つの失敗だけを追加する</strong></td><td>小さなステップで進めることで、問題が発生した際の原因箇所を即座に特定できる</td></tr>
            <tr><td><strong>テストが通ったら即座にリファクタリングする</strong></td><td>「動くコード」と「良い設計のコード」を分離して段階的に達成することで、認知負荷を下げる</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>設計行為として捉える。</strong>「テストファースト」を単なる手順ではなく、「これから書くコードにどう使われてほしいか」を先に設計する行為として捉える。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" target="_blank" rel="noopener">Martin Fowler, "Bliki: Test Driven Development"</a></li>
        </ul>
      </div>

      <h3>LO 5.2 — TDDを設計アプローチとして用いてソフトウェアやプロダクトエンティティを設計することを実演する [応用]</h3>

      <p><strong>説明</strong>: TDDは「テスト技法」である以上に「設計技法」です。テストを先に書くことで、そのクラス/関数が呼び出し側からどう見えるべきかを、実装の詳細に引きずられずに考えることができます。これは<strong>Outside-In(外側から内側へ)</strong>や<strong>Inside-Out(内側から外側へ)</strong>という2つのTDDのスタイルとして知られています。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>スタイル</th><th>進め方</th><th>向いている場面</th></tr></thead>
          <tbody>
            <tr><td>Outside-In (London School / Mockist)</td><td>最上位のユースケースからテストを書き、モックで下位の依存を仮に置きながら内側へ実装を進める</td><td>全体のインターフェース設計を先に固めたい場合</td></tr>
            <tr><td>Inside-Out (Classic / Detroit School)</td><td>最下層のドメインロジックからテストを書き、積み上げるように上位を実装する</td><td>ドメインロジックが複雑で、まずコアの正しさを固めたい場合</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>対象の性質で使い分ける。</strong>どちらか一方に固執せず、対象の性質(UIに近いか、ドメインロジックに近いか)によって使い分ける。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 5.2。Outside-In / Inside-Outの区分はSteve Freeman &amp; Nat Pryce, "Growing Object-Oriented Software, Guided by Tests" で広く整理された分類</li>
        </ul>
      </div>

      <h3>LO 5.3 — 5つ以上の単体テストの原則とプラクティスを適用する [応用]</h3>

      <p><strong>説明</strong>: 良い単体テストが備えるべき性質として、広く知られる<strong>F.I.R.S.T.原則</strong>を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>頭文字</th><th>原則</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td>F</td><td>Fast(高速)</td><td>テストは高速に実行できるべき。遅いと開発者が実行を避けるようになる</td></tr>
            <tr><td>I</td><td>Independent(独立)</td><td>テスト同士が互いに依存せず、どの順番で実行しても結果が変わらない</td></tr>
            <tr><td>R</td><td>Repeatable(再現可能)</td><td>環境(ネットワーク、時刻など)に依存せず、何度実行しても同じ結果になる</td></tr>
            <tr><td>S</td><td>Self-Validating(自己検証可能)</td><td>テスト結果はPass/Failで明確に判定でき、人間がログを目視する必要がない</td></tr>
            <tr><td>T</td><td>Timely(適時)</td><td>テスト対象のコードを書く適切なタイミング(TDDでは実装前)で書かれる</td></tr>
          </tbody>
        </table>
      </div>

      <p>これに加え、AAAパターン(Arrange-Act-Assert: 準備・実行・検証の3段構成でテストを記述する)や、1テスト1アサーションの原則も重要な実践です。</p>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>テストダブルの使いすぎに注意する。</strong>テストダブル(モック・スタブ・フェイク)を使いすぎると「実装の詳細に密結合したテスト」になり、リファクタリング時にテストが壊れやすくなる。振る舞いを検証し、実装の詳細を検証しないよう意識する。</li>
          <li><strong>テストコードにも同じ品質基準を適用する。</strong>テストコードにも本番コードと同じ品質基準(命名、DRY原則など)を適用する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 5.3。F.I.R.S.T.原則はTim Ottinger &amp; Jeff Langrによって整理され、Robert C. Martin, "Clean Code" で広く紹介された</li>
        </ul>
      </div>

      <h3>LO 5.4 — テストの品質と有効性を改善する5つ以上の方法を特定し、3つ以上のテストリファクタリングアプローチを適用する [分析]</h3>

      <p><strong>説明</strong>: テストコード自体も、時間とともに保守しづらくなる「テストの負債」を抱えます。</p>

      <p><strong>テストの品質と有効性を改善する方法(代表例)</strong></p>
      <ol>
        <li>テストの意図が名前だけで分かるように命名する(例: <code>should_return_error_when_input_is_negative</code>)</li>
        <li>テストデータビルダー/オブジェクトマザーパターンで、テストデータ生成の重複を削減する</li>
        <li>アサーションメッセージを充実させ、失敗時に原因がすぐ分かるようにする</li>
        <li>Flaky Test(不安定なテスト)をゼロ・トレランスで扱い、見つけ次第修正するか隔離する</li>
        <li>テストの実行時間を計測し、遅いテストを定期的に見直す</li>
      </ol>

      <p><strong>テストリファクタリングアプローチ(代表例3つ)</strong></p>
      <ul>
        <li><strong>Extract Setup</strong>: 複数テストで共通する準備コードをセットアップメソッドに抽出する</li>
        <li><strong>テストの重複除去</strong>: パラメタライズドテスト(Parameterized Test)で同種のテストケースをまとめる</li>
        <li><strong>アサーションの単純化</strong>: カスタムアサーション/マッチャーを作り、可読性を上げる</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>本番コードと同じ厳格さでレビューする。</strong>テストコードのレビューは本番コードのレビューと同じ厳格さで行う。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 5.4。xUnitパターンの体系的整理として Gerard Meszaros, "xUnit Test Patterns: Refactoring Test Code" が広く参照される</li>
        </ul>
      </div>

      <h3>LO 5.5 — テストを分類し、異なるカテゴリに異なるテスト方法を割り当てる概念を1つ以上示す [応用]</h3>

      <p><strong>説明</strong>: 代表的な分類の枠組みが<strong>Test Pyramid(テストピラミッド)</strong>です。Martin Fowlerが2012年に整理したこの概念は、「粒度の広い(=遅く高コストな)テストは少なく、粒度の狭い(=速く安価な)テストは多く」という比率を示します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_TEST_PYRAMID" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">Test Pyramid — E2E・統合テスト・単体テストの比率</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>E2Eテストを最小限に絞る。</strong>E2Eテストの本数を最小限に絞り、大部分の検証は単体テストと統合テストでカバーする。</li>
          <li><strong>教条的に適用しない。</strong>フロントエンド開発の文脈では、Kent C. Doddsが提唱した「Testing Trophy(統合テストを重視する形状)」のような、テストピラミッドの発展形も参考になる。ピラミッドを教条的に適用せず、システムの特性に応じて比率を調整する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/TestPyramid.html" target="_blank" rel="noopener">Martin Fowler, "Bliki: TestPyramid"</a></li>
          <li><a href="https://martinfowler.com/articles/practical-test-pyramid.html" target="_blank" rel="noopener">Martin Fowler, "The Practical Test Pyramid"</a></li>
        </ul>
      </div>

      <h3>LO 5.6 — テストファーストでビジネス視点に立った協働的アプローチの属性を3つ以上挙げる [理解]</h3>

      <p><strong>説明</strong>: ここでの「テストファーストでビジネス視点に立った協働的アプローチ」とは、<strong>受け入れテスト駆動開発(ATDD: Acceptance Test-Driven Development)</strong>や<strong>振る舞い駆動開発(BDD: Behavior-Driven Development)</strong>、および<strong>Specification by Example(例による仕様化)</strong>を指します。</p>

      <p><strong>属性(代表例3つ)</strong></p>
      <ol>
        <li><strong>共通言語(Ubiquitous Language)を使う</strong>: Given-When-Then のような自然言語に近い形式で、開発者・QA・ビジネス側が同じ言葉で仕様を語れるようにする</li>
        <li><strong>3人以上での協働で仕様を作る(Three Amigos)</strong>: Product Owner・開発者・テスターが一緒に受け入れ基準を具体例で洗い出す</li>
        <li><strong>実行可能な仕様(Executable Specification)にする</strong>: 自然言語で書かれた受け入れ基準を、自動テストとして実行できる形式にする(Cucumber, SpecFlowなど)</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>実装前に実施する。</strong>Three Amigosミーティングは、実装が始まる前(スプリントプランニングやリファインメントの段階)で実施し、曖昧な要件を早期に発見する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/bliki/SpecificationByExample.html" target="_blank" rel="noopener">Martin Fowler, "Bliki: SpecificationByExample"</a></li>
        </ul>
      </div>

      <h3>LO 5.7 — ステークホルダーやユーザーとテスト駆動のフィードバックループを実装するアプローチを1つ以上適用する [応用]</h3>

      <p><strong>説明</strong>: LO 5.6の考え方をさらに実践に落とし込み、実際にステークホルダーとのフィードバックループを回す方法を扱います。</p>

      <p><strong>アプローチ例</strong></p>
      <ul>
        <li><strong>受け入れテストのレビューをスプリントレビュー前に実施する</strong>: 実装が終わってからではなく、受け入れ基準の合意時点でステークホルダーの合意を得る</li>
        <li><strong>CI上で受け入れテストの結果を可視化するダッシュボードをステークホルダーと共有する</strong>: 「今、何が動作確認済みか」を常に透明にする</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>複数のタイミングで継続的に求める。</strong>フィードバックは実装完了後に一度だけ求めるのではなく、開発の複数のタイミング(受け入れ基準合意時、実装中のデモ、リリース後)で継続的に求める。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 5.7</li>
        </ul>
      </div>

      <h3>LO 5.8 — 欠落した、またはリソース効率の悪いコンポーネント/サブシステムに対処する技法を1つ以上適用する [応用]</h3>

      <p><strong>説明</strong>: TDDで開発を進めていると、まだ実装されていない依存コンポーネント(外部API、未実装のサービスなど)や、テストの中で使うには重すぎるコンポーネント(実データベースなど)に遭遇します。これに対処する代表的な技法が<strong>テストダブル(Test Double)</strong>です。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>テストダブルの種類</th><th>説明</th></tr></thead>
          <tbody>
            <tr><td><strong>Dummy</strong></td><td>引数を満たすためだけに渡すが、実際には使われないオブジェクト</td></tr>
            <tr><td><strong>Stub</strong></td><td>あらかじめ決められた値を返すだけの簡易な実装</td></tr>
            <tr><td><strong>Spy</strong></td><td>呼び出されたかどうかを記録するStub</td></tr>
            <tr><td><strong>Mock</strong></td><td>呼び出しの期待値を事前に設定し、期待通りに呼ばれたかを検証するオブジェクト</td></tr>
            <tr><td><strong>Fake</strong></td><td>簡易だが実際に動作するロジックを持つ代替実装(インメモリDBなど)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>Fakeや契約テストを併用する。</strong>テストダブルの使いすぎは、実装の詳細に密結合したテストを生み、リファクタリングへの抵抗力を弱める。可能な限り本物に近いFakeを使うか、契約テスト(Contract Test)を併用して、テストダブルと実際の依存の振る舞いに乖離がないことを検証する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/articles/mocksArentStubs.html" target="_blank" rel="noopener">Martin Fowler, "Mocks Aren't Stubs"</a></li>
        </ul>
      </div>

      <h3>LO 5.9 — システムの内部品質を検証・改善することで技術的卓越性にアプローチする方法を3つ以上議論し、そのうち1つを実践する [評価]</h3>

      <p><strong>説明</strong>: このLOはBloomの「評価」レベルに位置づけられ、TDDカテゴリの総括的な位置づけです。「内部品質(Internal Quality)」とは、外部から見えるユーザー向けの振る舞いではなく、コードの構造そのものの健全性を指します。</p>

      <p><strong>アプローチ例(代表3つ)</strong></p>
      <ol>
        <li><strong>ミューテーションテスト(Mutation Testing)</strong>: コードに意図的に小さなバグ(ミューテーション)を注入し、既存のテストスイートがそれを検知できるかを検証することで、テストの「本当の」有効性を評価する</li>
        <li><strong>継続的な静的解析</strong>: SonarQubeなどのツールをCIに組み込み、複雑度・重複・脆弱性のトレンドを継続的に追跡する</li>
        <li><strong>定期的なアーキテクチャレビュー</strong>: チームで定期的にコードベースを俯瞰し、蓄積した技術的負債やアーキテクチャの逸脱を評価する</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>テストの質自体を検証する。</strong>カバレッジの数値だけで満足せず、ミューテーションテストのような「テストの質」自体を検証する仕組みを取り入れる。</li>
          <li><strong>継続的に行う。</strong>内部品質の改善は「別の作業」ではなく、機能開発の一部として継続的に行う(第7章のリファクタリングとの結びつき)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 5.9。ミューテーションテストの一般的な参照として PIT (PITest) などのツールドキュメント、および学術的原典としてRichard Hamlet, "Testing Programs with the Aid of a Compiler" (1977)</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 9. Integrating Continuously ===================== -->
    <section id="integrating-continuously">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-merge" aria-hidden="true" />SECTION 10</div>
      <h2>9. カテゴリ6 — Integrating Continuously (LO 6.1–6.3)</h2>

      <h3>LO 6.1 — 継続的インテグレーションを行う際に対処すべき懸念事項を5つ以上議論する [分析]</h3>

      <p><strong>説明</strong>: Martin Fowlerは継続的インテグレーション(CI)を「チームメンバーが頻繁に、通常は少なくとも1日1回は自分の作業を統合するソフトウェア開発手法であり、各統合は自動化されたビルド(テストを含む)によって検証され、可能な限り早く統合エラーを検出する」と定義しています。CIを機能させるために対処すべき懸念事項を紹介します。</p>

      <p><strong>懸念事項(代表例5つ)</strong></p>
      <ol>
        <li><strong>単一のソースリポジトリの維持</strong>: すべてのコードとテストが単一の場所で管理されていること</li>
        <li><strong>ビルドの自動化</strong>: 手動でのビルド手順が残っていないこと(ワンコマンドでビルド・テストが完結する)</li>
        <li><strong>ビルドの自己テスト化(Self-Testing Build)</strong>: ビルドプロセス自体が自動テストを含み、合否を自己判定できること</li>
        <li><strong>ビルドの高速化</strong>: フィードバックが遅いとCIの価値が減衰するため、ビルド・テストの実行時間を短く保つ工夫(並列実行、テスト分割など)が必要</li>
        <li><strong>本番同等環境でのテスト</strong>: テスト環境が本番構成から乖離していると、統合の問題を見逃す</li>
        <li><strong>可視性の確保</strong>: ビルドの状態(成功/失敗)をチーム全員が常に把握できるようにする(ダッシュボード、通知など)</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>ビルドを壊したら最優先で直す。</strong>「ビルドを壊したら最優先で直す」という文化的規範をチームで明示的に合意する。</li>
          <li><strong>mainブランチを常にデプロイ可能に保つ。</strong>mainブランチは常にデプロイ可能な状態を保つことを絶対のルールとする(トランクベース開発)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">Martin Fowler, "Continuous Integration"</a></li>
        </ul>
      </div>

      <h3>LO 6.2 — 自動化され、自己テストを行い、高速なビルドを作成することを実践する [応用]</h3>

      <p><strong>説明</strong>: LO 6.1で挙げた懸念事項のうち、「自動化」「自己テスト」「高速性」の3要素を実際に構築するLOです。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CI_BUILD_FLOW" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">自動化・自己テスト・高速なビルドパイプラインの流れ</div>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>フェイルファストにする。</strong>ビルドパイプラインを「速いフィードバックを返す段階」と「時間のかかる検証(E2Eテストなど)」に分割し、前段が失敗すれば後段を実行しないようにする(フェイルファスト)。</li>
          <li><strong>ビルド時間の目標値を定める。</strong>ビルド時間の目標値をチームで定める(例: 「コミットからフィードバックまで10分以内」)。目標を超えたら、テストの並列化やスコープの見直しを行う。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">Martin Fowler, "Continuous Integration"(プラクティス一覧: バージョン管理、ビルド自動化、自己テスト、高速なビルドなど)</a></li>
        </ul>
      </div>

      <h3>LO 6.3 — チームとともに継続的インテグレーション(CI)のアプローチを1つ以上適用する [応用]</h3>

      <p><strong>説明</strong>: CIを個人の習慣ではなく、チームのアプローチとして根付かせるための実践を扱います。代表的なCIアプローチとして<strong>トランクベース開発(Trunk-Based Development)</strong>と<strong>Feature Toggle(フィーチャートグル/フラグ)</strong>を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>アプローチ</th><th>概要</th><th>メリット</th></tr></thead>
          <tbody>
            <tr><td><strong>トランクベース開発</strong></td><td>長命なフィーチャーブランチを避け、全員が頻繁に単一の主幹ブランチへ統合する</td><td>マージコンフリクトの最小化、統合頻度の向上</td></tr>
            <tr><td><strong>Feature Toggle</strong></td><td>未完成の機能をコードに含めたままデプロイし、フラグで有効/無効を切り替える</td><td>「完成していない機能」と「デプロイ」を分離できる</td></tr>
            <tr><td><strong>短命なフィーチャーブランチ + プルリクエスト</strong></td><td>ブランチの寿命を1〜2日以内に抑え、頻繁にマージする</td><td>レビューの仕組みを保ちつつ統合頻度を維持できる</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>危険信号の基準を共有する。</strong>フィーチャーブランチを使う場合でも、「1日以上生き続けるブランチは危険信号」という基準をチームで共有する。</li>
          <li><strong>役目を終えたトグルを削除する。</strong>Feature Toggleは便利だが増えすぎるとコードが複雑化するため、役目を終えたトグルは速やかに削除する運用ルールを設ける。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://martinfowler.com/articles/feature-toggles.html" target="_blank" rel="noopener">Martin Fowler, "FeatureToggle"</a>、<a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">"Continuous Integration"</a>におけるトランクベース開発の考え方</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 10. Learning by Delivering Continuously ===================== -->
    <section id="delivering-continuously">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:rocket" aria-hidden="true" />SECTION 11</div>
      <h2>10. カテゴリ7 — Learning by Delivering Continuously (LO 7.1–7.4)</h2>

      <p>このカテゴリは、CIの先にある「継続的デリバリー(Continuous Delivery, CD)」と「継続的デプロイメント(Continuous Deployment)」を扱い、A-CSD® LOの最終カテゴリとして「デリバリーを通じた学習」というテーマで締めくくられます。</p>

      <h3>LO 7.1 — 継続的デリバリー(CD)を定義し、その利点を3つ以上議論する [理解]</h3>

      <p><strong>説明</strong>: Jez Humble &amp; Dave Farleyが体系化した継続的デリバリーは、「ソフトウェアをいつでも安全かつ迅速に本番環境にリリースできる状態に保つプラクティス」と定義されます。継続的インテグレーションが「統合の頻度」を扱うのに対し、継続的デリバリーは「リリース可能な状態を常に保つこと」に焦点を当てます。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CD_PROGRESSION" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">CI → 継続的デリバリー → 継続的デプロイメントの発展段階</div>
      </div>

      <p><strong>利点(代表例3つ)</strong></p>
      <ol>
        <li><strong>市場投入までの時間(Time to Market)の短縮</strong>: 機能を素早く顧客に届けられる</li>
        <li><strong>リリースリスクの低減</strong>: 小さく頻繁なリリースは、大きく稀なリリースよりも1回あたりの変更が小さく、問題発生時の切り分けが容易</li>
        <li><strong>フィードバックループの高速化</strong>: 実際のユーザーからのフィードバックを早期に得て、次の開発判断に活かせる</li>
      </ol>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>デリバリーとデプロイメントを混同しない。</strong>「継続的デリバリー」と「継続的デプロイメント」を混同しない。前者は「リリース可能な状態を保つ」ことで、実際にリリースするかどうかはビジネス判断による。後者はさらに進んで、パイプラインを通過したものを自動的に本番へ反映する。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://continuousdelivery.com/" target="_blank" rel="noopener">Jez Humble &amp; Dave Farley, "Continuous Delivery" 公式サイト</a></li>
        </ul>
      </div>

      <h3>LO 7.2 — 継続的デリバリーのための技術的プラクティスを3つ以上説明する [理解]</h3>

      <p><strong>説明</strong>: 継続的デリバリーを支える技術的な基盤を紹介します。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>プラクティス</th><th>概要</th></tr></thead>
          <tbody>
            <tr><td><strong>デプロイメントパイプライン (Deployment Pipeline)</strong></td><td>コミットから本番リリースまでの各段階(ビルド、単体テスト、統合テスト、性能テスト、本番デプロイ)を自動化されたパイプラインとして表現する</td></tr>
            <tr><td><strong>Infrastructure as Code (IaC)</strong></td><td>インフラ構成をコードとして管理し、環境間の差異(「私の環境では動く」問題)を排除する</td></tr>
            <tr><td><strong>ブルーグリーンデプロイメント / カナリアリリース</strong></td><td>新旧バージョンを並行稼働させたり、一部のトラフィックだけ新バージョンに向けたりすることで、リリースのリスクを段階的に下げる</td></tr>
            <tr><td><strong>自動化されたロールバック</strong></td><td>問題が検知された際に、迅速かつ確実に前バージョンへ切り戻せる仕組みを用意する</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>後段ほど広い範囲を検証する。</strong>パイプラインの各ステージは「後段に行くほど遅く・広い範囲を検証する」ように設計し、早い段階で安価に問題を検出できるようにする(第9章のCIの原則と一貫性を持たせる)。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://continuousdelivery.com/" target="_blank" rel="noopener">Jez Humble &amp; Dave Farley, "Continuous Delivery"</a></li>
          <li><a href="https://docs.cloud.google.com/solutions/devops/devops-tech-version-control" target="_blank" rel="noopener">DORA(DevOps Research and Assessment)の技術的能力に関する解説(継続的デリバリー、継続的インテグレーション等)</a></li>
        </ul>
      </div>

      <h3>LO 7.3 — デリバリーの期待される成果についてフィードバックを組み込むアプローチを1つ以上議論する [応用]</h3>

      <p><strong>説明</strong>: 単に「リリースした」だけでは学習は完結しません。リリースした結果、実際にビジネス上の期待された成果(顧客満足度の向上、コンバージョン率の改善など)が得られたかを確認するフィードバックの仕組みが必要です。</p>

      <p><strong>アプローチ例</strong></p>
      <ul>
        <li><strong>A/Bテスト</strong>: 新機能の一部のユーザーにのみ公開し、既存版との比較で効果を測定する</li>
        <li><strong>プロダクトアナリティクスの活用</strong>: 機能利用状況やユーザー行動データを収集し、仮説通りの成果が出ているかを検証する</li>
        <li><strong>カスタマーフィードバックループの短縮</strong>: リリースノートやユーザーインタビューを通じて、定性的なフィードバックを継続的に集める</li>
      </ul>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>計測・学習まで計画に含める。</strong>「リリース = 完了」という発想から脱却し、リリース後の計測・学習までを開発サイクルの一部として計画に組み込む。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>A-CSD LO 7.3。DORAの調査に基づく「Accelerate: The Science of Lean Software and DevOps」がフィードバックと成果の測定に関する広く参照される研究</li>
        </ul>
      </div>

      <h3>LO 7.4 — 継続的デプロイメントのアプローチを概説する [理解]</h3>

      <p><strong>説明</strong>: 継続的デプロイメント(Continuous Deployment)は継続的デリバリーをさらに一歩進め、パイプラインのすべての自動チェックを通過した変更を、人間の承認を介さずに自動的に本番環境へ反映する手法です。</p>

      <p><strong>継続的デプロイメントを支える指標として、DORA(DevOps Research and Assessment)が特定した4つの主要指標(Four Keys)</strong>が広く参照されます。</p>

      <div class="table-wrap">
        <table>
          <thead><tr><th>指標</th><th>何を測るか</th></tr></thead>
          <tbody>
            <tr><td><strong>デプロイ頻度 (Deployment Frequency)</strong></td><td>どれだけ頻繁に本番へデプロイしているか</td></tr>
            <tr><td><strong>変更のリードタイム (Lead Time for Changes)</strong></td><td>コミットから本番反映までにかかる時間</td></tr>
            <tr><td><strong>変更失敗率 (Change Failure Rate)</strong></td><td>デプロイが本番障害を引き起こした割合</td></tr>
            <tr><td><strong>サービス復旧時間 (Time to Restore Service)</strong></td><td>障害発生から復旧までにかかる時間</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout practice" data-testid="callout" data-variant="practice">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
        <ul>
          <li><strong>土台を整えてから移行する。</strong>継続的デプロイメントに移行する前に、まず堅牢な自動テストスイート・監視・アラート体制・自動ロールバックの仕組みを整える。これらの土台がない状態での自動デプロイ化は、障害の検知・対応が遅れるリスクを高める。</li>
          <li><strong>4指標を継続的に計測する。</strong>DORAの4指標を継続的に計測し、チームの「速度」と「安定性」を両面からモニタリングする。</li>
        </ul>
      </div>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://docs.cloud.google.com/solutions/devops/devops-tech-version-control" target="_blank" rel="noopener">DORA (DevOps Research and Assessment) の4つの主要指標に関するGoogle Cloudのドキュメント</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 11. XP Integration Map ===================== -->
    <section id="xp-integration-map">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:map-2" aria-hidden="true" />SECTION 12</div>
      <h2>11. XPプラクティスとA-CSD LOの統合マップ</h2>

      <p>A-CSD®のLOは、単独の技法の寄せ集めではなく、<strong>Extreme Programming (XP)</strong> の実践群が互いに補強し合う一つのシステムとして設計されています。以下の図は、これまでの章で扱った主要プラクティスがどのように連動しているかを示します。</p>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_XP_INTEGRATION_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">土台(協働・リーン思考)→設計と実装→統合とデリバリー、そして学習の還流</div>
      </div>

      <p><strong>この図が示す重要な洞察</strong></p>

      <ul>
        <li><strong>TDDだけを単独で導入しても効果は限定的です。</strong>テストを書く前提として、ペアプログラミングや頻繁なフィードバックといった協働のプラクティス、そして頻繁に統合できるCI基盤が揃って初めて、TDDの「速いフィードバックループ」という価値が最大化されます。</li>
        <li><strong>リファクタリングはTDDのサイクルの一部であり、CIのビルドがそれを保護します。</strong>テストが常にグリーンであることを保証するCIがなければ、安全なリファクタリングは成立しません。</li>
        <li><strong>継続的デリバリーの先にある「学習」が、リーン思考(カテゴリ1)に還流します。</strong>これがA-CSD® LOのカテゴリ7が「Learning by Delivering Continuously(継続的デリバリーによる学習)」と名付けられている理由です。デリバリーは目的地ではなく、次の改善のための情報収集の手段でもあります。</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li>Extreme Programmingの実践群の全体像は Kent Beck, "Extreme Programming Explained" が原典。各プラクティスの相互関係は <a href="https://en.wikipedia.org/wiki/Extreme_programming_practices" target="_blank" rel="noopener">Wikipedia "Extreme programming practices"</a> でも整理されている</li>
        </ul>
      </div>
    </section>

    <!-- ===================== 12. Best Practices Checklist ===================== -->
    <section id="best-practices-checklist">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:checkbox" aria-hidden="true" />SECTION 13</div>
      <h2>12. ベストプラクティス総合チェックリスト</h2>

      <p>これまでの章で挙げたベストプラクティスを、カテゴリ横断でチェックリスト形式にまとめます。コース受講前の自己診断や、チームの現状把握に活用してください。</p>

      <h3>12.1 リーン・アジャイル・Scrum</h3>
      <ul>
        <li>チームのワークフローを可視化し、待機時間と実作業時間を区別できている</li>
        <li>WIP制限を設定し、マルチタスクによる無駄を意識的に減らしている</li>
        <li>Definition of Doneを定期的に見直し、進化させる仕組みがある</li>
        <li>技術的な提案をビジネス言語(価値・リスク・コスト)で説明できる</li>
      </ul>

      <h3>12.2 協働とチームダイナミクス</h3>
      <ul>
        <li>タスクの性質に応じてソロ・ペア・モブを使い分けている</li>
        <li>SBIモデルなど、構造化されたフィードバックの型を知っている</li>
        <li>チームの「使用率100%」を目指すことの弊害を理解している</li>
        <li>INVESTの原則でプロダクトバックログアイテムを分割できる</li>
      </ul>

      <h3>12.3 アーキテクチャと設計</h3>
      <ul>
        <li>事前設計と創発的設計を状況に応じて使い分けている</li>
        <li>YAGNI・DRY・単一責任の原則などを、教条的にではなく理由とともに適用している</li>
        <li>非機能要件(性能・セキュリティなど)を自動テストで継続的に検証している</li>
        <li>複数のコード品質メトリクスを組み合わせて健全性を把握している</li>
      </ul>

      <h3>12.4 リファクタリング</h3>
      <ul>
        <li>リファクタリングと機能追加のコミットを分離している</li>
        <li>主要なコードスメルを認識し、対応するリファクタリング技法を知っている</li>
        <li>技術的負債を可視化し、Product Ownerと透明に対話している</li>
        <li>技術的負債の返済をスプリントの定常的な活動として組み込んでいる</li>
      </ul>

      <h3>12.5 テスト駆動開発</h3>
      <ul>
        <li>Red-Green-Refactorのサイクルを実践している</li>
        <li>F.I.R.S.T.原則に沿った単体テストを書けている</li>
        <li>テストピラミッドの比率を意識し、E2Eテストに偏り過ぎていない</li>
        <li>Three Amigosなど、テストファーストで協働するプラクティスを取り入れている</li>
      </ul>

      <h3>12.6 継続的インテグレーション・デリバリー</h3>
      <ul>
        <li>mainブランチが常にデプロイ可能な状態を保っている</li>
        <li>ビルドが壊れたら最優先で修正する文化がある</li>
        <li>デプロイメントパイプラインが自動化されている</li>
        <li>DORAの4指標(デプロイ頻度・リードタイム・変更失敗率・復旧時間)を計測している</li>
      </ul>
    </section>

    <!-- ===================== 13. Career Path ===================== -->
    <section id="career-path">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:timeline" aria-hidden="true" />SECTION 14</div>
      <h2>13. 認定取得後のキャリアパス</h2>

      <div class="diagram-card">
        <div class="mermaid-wrap">
          <ClientOnly>
            <MermaidDiagram :chart="DIAGRAM_CAREER_PATH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
            <template #fallback>
              <div class="diagram-loading">図を読み込み中...</div>
            </template>
          </ClientOnly>
        </div>
        <div class="diagram-caption">A-CSD®取得後、SEUの蓄積・更新とCSP-D®への挑戦</div>
      </div>

      <ul>
        <li><strong>CSP-D® (Certified Scrum Professional® Developer)</strong>: A-CSD®の取得は、Scrum Alliance公式ページで明記されている通り、CSP-D®への里程標(milestone)です。CSP-D®は、開発者としてのより高度な専門性を証明する資格として位置づけられています。</li>
        <li><strong>SEU(Scrum Education Units)の蓄積</strong>: 更新に必要なSEUは、書籍、ウェビナー、カンファレンス参加など多様な学習機会から得られます。日々の学習を記録する習慣が、更新時の負担を減らします。</li>
        <li><strong>コミュニティへの参加</strong>: Scrum Allianceのユーザーグループやカンファレンス(Global/Regional Scrum Gathering®)への参加は、SEUの獲得だけでなく、実践者同士のネットワーキングの機会にもなります。</li>
      </ul>

      <div class="callout source" data-testid="callout" data-variant="source">
        <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
        <ul>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">Scrum Alliance, A-CSD公式ページ「Benefits」セクション(CSP-Dへの里程標としての言及)</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">Scrum Alliance, "Certified Scrum Professional for Developers"</a></li>
          <li><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">Scrum Alliance, "Scrum Education Units"</a></li>
        </ul>
      </div>
    </section>

    <!-- ===================== 14. Summary ===================== -->
    <section id="summary">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 15</div>
      <h2>14. まとめ</h2>

      <p>A-CSD®は、CSD®で培った「Scrumの枠組みの中で開発する」基礎スキルを土台に、次の3つの軸で開発者を成長させる資格です。</p>

      <ol>
        <li><strong>技術的卓越性の軸</strong>: TDD、リファクタリング、継続的インテグレーション/デリバリーを通じて、変更に強く、内部品質の高いソフトウェアを継続的に作り出す力</li>
        <li><strong>設計思考の軸</strong>: 事前設計と創発的設計のバランス、SOLID・YAGNIなどの設計原則、技術的負債のマネジメントを通じて、持続可能なアーキテクチャを維持する力</li>
        <li><strong>協働とリーダーシップの軸</strong>: ペア/モブプログラミング、構造化されたフィードバック、チームダイナミクスの理解を通じて、チーム全体の生産性を引き出す力</li>
      </ol>

      <p>これら3つの軸は独立しているのではなく、第11章で示したように相互に補強し合う一つのシステムです。A-CSD®の学習を通じて、単なる技法の暗記ではなく、「なぜその技法が必要なのか」を自分の言葉で(そして非技術者にも)説明できるようになることが、Bloomの高次レベル(分析・統合・評価)を求めるA-CSD® LOの本質的な狙いだと言えます。</p>
    </section>

    <!-- ===================== 15. References ===================== -->
    <section id="references">
      <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:link" aria-hidden="true" />SECTION 16</div>
      <h2>15. 参考文献(出典一覧)</h2>

      <div class="ref-group">
        <h3>Scrum Alliance 公式情報源</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Scrum Alliance, "Advanced Certified Scrum Developer (A-CSD)" 公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/advanced-certified-scrum-developer</a></li>
          <li><span class="ref-name">Scrum Alliance, "Advanced Certified Scrum Developer (A-CSD) Learning Objectives" (2021年8月版, PDF)</span><a class="ref-url" href="https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf" target="_blank" rel="noopener">https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learning%20Objectives/E_A_CSD_LO_2021.pdf</a></li>
          <li><span class="ref-name">Scrum Alliance, "Certified Scrum Developer (CSD)" 公式ページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-developer</a></li>
          <li><span class="ref-name">Scrum Alliance, "Certified Scrum Professional for Developers"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/developer-track/certified-scrum-professional-for-developers</a></li>
          <li><span class="ref-name">Scrum Alliance, "Scrum Education Units"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
          <li><span class="ref-name">Scrum Alliance, "Renewing Certifications"</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/renewing-certifications" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/renewing-certifications</a></li>
          <li><span class="ref-name">Scrum Alliance, "About Scrum: Values"</span><a class="ref-url" href="https://www.scrumalliance.org/about-scrum/values" target="_blank" rel="noopener">https://www.scrumalliance.org/about-scrum/values</a></li>
          <li><span class="ref-name">Scrum Alliance, "Skills in the New World of Work"(認定の市場価値に関する調査記事)</span><a class="ref-url" href="https://resources.scrumalliance.org/Article/share-insights-agile-skills-workplace" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/share-insights-agile-skills-workplace</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>フレームワークの一次資料</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Ken Schwaber &amp; Jeff Sutherland, "The Scrum Guide" (2020年11月版)</span><a class="ref-url" href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">https://scrumguides.org/scrum-guide.html</a></li>
          <li><span class="ref-name">"Manifesto for Agile Software Development"</span><a class="ref-url" href="https://agilemanifesto.org/" target="_blank" rel="noopener">https://agilemanifesto.org/</a></li>
          <li><span class="ref-name">"Manifesto for Agile Software Development" — 12の原則</span><a class="ref-url" href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">https://agilemanifesto.org/principles.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>リファクタリング・技術的負債・コード品質</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Martin Fowler et al., "Refactoring: Improving the Design of Existing Code" 公式サイト</span><a class="ref-url" href="https://refactoring.com/" target="_blank" rel="noopener">https://refactoring.com/</a></li>
          <li><span class="ref-name">Martin Fowler, "Bliki: CodeSmell"</span><a class="ref-url" href="https://martinfowler.com/bliki/CodeSmell.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/CodeSmell.html</a></li>
          <li><span class="ref-name">Martin Fowler, "Bliki: TechnicalDebtQuadrant"</span><a class="ref-url" href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebtQuadrant.html</a></li>
          <li><span class="ref-name">Martin Fowler, "Bliki: TechnicalDebt"</span><a class="ref-url" href="https://martinfowler.com/bliki/TechnicalDebt.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TechnicalDebt.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>テスト駆動開発・テスト戦略</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Martin Fowler, "Bliki: Test Driven Development"</span><a class="ref-url" href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TestDrivenDevelopment.html</a></li>
          <li><span class="ref-name">Martin Fowler, "Bliki: TestPyramid"</span><a class="ref-url" href="https://martinfowler.com/bliki/TestPyramid.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/TestPyramid.html</a></li>
          <li><span class="ref-name">Martin Fowler, "The Practical Test Pyramid"</span><a class="ref-url" href="https://martinfowler.com/articles/practical-test-pyramid.html" target="_blank" rel="noopener">https://martinfowler.com/articles/practical-test-pyramid.html</a></li>
          <li><span class="ref-name">Martin Fowler, "Software Testing Guide"(テスト関連記事の総合案内)</span><a class="ref-url" href="https://martinfowler.com/testing/" target="_blank" rel="noopener">https://martinfowler.com/testing/</a></li>
          <li><span class="ref-name">Martin Fowler, "Bliki: SpecificationByExample"</span><a class="ref-url" href="https://martinfowler.com/bliki/SpecificationByExample.html" target="_blank" rel="noopener">https://martinfowler.com/bliki/SpecificationByExample.html</a></li>
          <li><span class="ref-name">Martin Fowler, "Mocks Aren't Stubs"</span><a class="ref-url" href="https://martinfowler.com/articles/mocksArentStubs.html" target="_blank" rel="noopener">https://martinfowler.com/articles/mocksArentStubs.html</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>継続的インテグレーション・継続的デリバリー</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Martin Fowler, "Continuous Integration"</span><a class="ref-url" href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener">https://martinfowler.com/articles/continuousIntegration.html</a></li>
          <li><span class="ref-name">Martin Fowler, "FeatureToggle"</span><a class="ref-url" href="https://martinfowler.com/articles/feature-toggles.html" target="_blank" rel="noopener">https://martinfowler.com/articles/feature-toggles.html</a></li>
          <li><span class="ref-name">Jez Humble &amp; Dave Farley, "Continuous Delivery" 公式サイト</span><a class="ref-url" href="https://continuousdelivery.com/" target="_blank" rel="noopener">https://continuousdelivery.com/</a></li>
          <li><span class="ref-name">Google Cloud, DORA (DevOps Research and Assessment) 技術的能力に関するドキュメント(継続的デリバリー・継続的インテグレーション・DORAの4指標)</span><a class="ref-url" href="https://docs.cloud.google.com/solutions/devops/devops-tech-version-control" target="_blank" rel="noopener">https://docs.cloud.google.com/solutions/devops/devops-tech-version-control</a></li>
        </ul>
      </div>

      <div class="ref-group">
        <h3>補足: XPプラクティス全般</h3>
        <ul class="ref-list">
          <li><span class="ref-name">Wikipedia, "Extreme programming practices"(XPプラクティス群の概観として補助的に参照)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Extreme_programming_practices" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Extreme_programming_practices</a></li>
        </ul>
      </div>
    </section>

    <footer>
      A-CSD®、CSD®、CSP-D® は Scrum Alliance® の登録商標です。本ページは非公式の学習補助資料であり、Scrum Alliance® とは無関係です。最終更新: 2026年8月。
    </footer>

  
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
  background: var(--color-paper);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height) + 12px);
  left: 16px;
  z-index: 30;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--color-ink);
  cursor: pointer;
}

.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--global-nav-height));
  position: sticky;
  top: var(--global-nav-height);
  overflow-y: auto;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  padding: 32px 24px 40px;
  flex: none;
}

.sidebar-backdrop {
  display: none;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.seal {
  flex: none;
  width: 36px;
  height: 36px;
}

.brand-text .brand-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 19px;
  color: var(--color-ink);
  letter-spacing: 0.02em;
}

.brand-text .brand-subtitle {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 2px;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav .nav-group-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink-faint);
  letter-spacing: 0.06em;
  margin: 22px 0 8px;
  padding-left: 12px;
}

.sidebar-nav .nav-group-label:first-child { margin-top: 0; }

.sidebar-nav li { margin: 2px 0; }

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-ink-soft);
  font-size: 16px;
  line-height: 1.4;
  border-left: 2px solid transparent;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) { font-size: 17px; color: var(--color-ink-faint); flex: none; }

.sidebar-nav a:hover {
  background: var(--color-indigo-tint);
  text-decoration: none;
  color: var(--color-indigo);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
  border-left: 2px solid var(--color-indigo);
}

.sidebar-nav a.active :deep(.iconify),
.sidebar-nav a.active :deep(svg) { color: var(--color-indigo); }

.main-content {
  flex: 1;
  min-width: 0;
  padding: 56px 72px 120px;
  background: var(--color-paper);
}

.hero {
  margin-bottom: 56px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) { font-size: 17px; }

.hero h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 42px;
  line-height: 1.28;
  margin: 0 0 16px;
  color: var(--color-ink);
}

.hero .hero-lede {
  font-size: 18px;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.stat-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 18px 20px;
}

.stat-card .stat-number {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--color-indigo);
  line-height: 1.1;
}

.stat-card .stat-label {
  font-size: 16px;
  color: var(--color-ink-soft);
  margin-top: 6px;
}

.disclaimer-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--color-info-border);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 16px;
  margin-top: 28px;
  line-height: 1.6;
}

.disclaimer-box :deep(.iconify),
.disclaimer-box :deep(svg) {
  flex: none;
  font-size: 20px;
  margin-top: 2px;
}

.disclaimer-box > span {
  flex: 1;
}

section {
  margin: 72px 0;
}

:is(h2, h3) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section:first-of-type { margin-top: 0; }

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink-faint);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) { font-size: 17px; }

h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 29px;
  color: var(--color-ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 21px;
  color: var(--color-ink);
  margin: 40px 0 16px;
}

h4 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 17px;
  color: var(--color-ink);
  margin: 28px 0 12px;
}

p { margin: 0 0 18px; }

ul, ol { margin: 0 0 18px; padding-left: 24px; }
li { margin-bottom: 8px; }

strong { font-weight: 600; color: var(--color-ink); }
em { color: var(--color-ink-soft); }

.domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin: 28px 0 8px;
}

.domain-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 20px;
  border-top: 3px solid var(--d-color);
}

.domain-card .domain-pct {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 30px;
  color: var(--d-color);
}

.domain-card .domain-name {
  font-size: 16px;
  color: var(--color-ink-soft);
  margin-top: 6px;
}

.domain-card.d1 { --d-color: var(--color-indigo); }
.domain-card.d2 { --d-color: var(--color-forest); }
.domain-card.d3 { --d-color: var(--color-gold); }
.domain-card.d4 { --d-color: var(--color-plum); }

.domain-tag {
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.domain-tag.d1 { background: var(--color-indigo-tint); color: var(--color-indigo); }
.domain-tag.d2 { background: var(--color-forest-tint); color: var(--color-forest); }
.domain-tag.d3 { background: var(--color-gold-tint); color: var(--color-gold); }
.domain-tag.d4 { background: var(--color-plum-tint); color: var(--color-plum); }

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  margin: 0 0 24px;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 16px;
}

thead th {
  background: var(--color-paper-sunken);
  text-align: left;
  font-weight: 600;
  color: var(--color-ink);
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-strong);
  white-space: nowrap;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink-soft);
  vertical-align: top;
}

tbody tr:last-child td { border-bottom: none; }
tbody tr:nth-child(even) { background: var(--color-paper); }

td strong, th strong { color: var(--color-ink); }

.callout {
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 20px 24px;
  margin: 28px 0;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  color: var(--color-indigo);
  margin-bottom: 10px;
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) { font-size: 17px; }

.callout ul { margin-bottom: 0; padding-left: 20px; }
.callout p:last-child { margin-bottom: 0; }

.callout.practice { border-left-color: var(--color-gold); }
.callout.practice .callout-title { color: var(--color-gold); }

.callout.source { border-left-color: var(--color-forest); background: var(--color-forest-tint); }
.callout.source .callout-title { color: var(--color-forest); }
.callout.source a { color: var(--color-forest); font-weight: 500; }
.callout.source ul { list-style: none; padding-left: 0; }
.callout.source li { margin-bottom: 6px; font-size: 16px; word-break: break-all; }

.callout.note { border-left-color: var(--color-plum); }
.callout.note .callout-title { color: var(--color-plum); }

.diagram-card {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 12px;
  padding: 28px;
  margin: 28px 0;
}

.diagram-card .diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 14px;
  text-align: center;
}

.mermaid-wrap {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.diagram-loading { color: var(--color-ink-faint); font-size: 16px; padding: 20px 0; text-align: center; }

.step-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
.step-list li { display: flex; gap: 16px; margin-bottom: 0; }

.step-num {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid var(--color-indigo);
  color: var(--color-indigo);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-body .step-title { font-weight: 600; color: var(--color-ink); margin-bottom: 4px; }
.step-body .step-desc { color: var(--color-ink-soft); font-size: 16px; }

.glossary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }

.glossary-item {
  border: 1px solid var(--color-border);
  background: var(--color-paper-raised);
  border-radius: 10px;
  padding: 16px 20px;
}

.glossary-item .g-term { font-weight: 600; color: var(--color-indigo); margin-bottom: 4px; }
.glossary-item .g-def { color: var(--color-ink-soft); font-size: 16px; }

.ref-group { margin-bottom: 28px; }
.ref-group :is(h3, h4) { margin-top: 0; }
.ref-list { list-style: none; margin: 0; padding: 0; }
.ref-list li { padding: 12px 0; border-bottom: 1px solid var(--color-border); font-size: 16px; }
.ref-list li:last-child { border-bottom: none; }
.ref-list .ref-name { color: var(--color-ink); font-weight: 500; display: block; margin-bottom: 2px; }
.ref-list .ref-url { color: var(--color-ink-faint); word-break: break-all; }

footer {
  margin-top: 96px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-faint);
  font-size: 16px;
}

code {
  font-family: var(--font-mono);
  background: var(--color-paper-sunken);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 16px;
  color: var(--color-ink);
}

@media (max-width: 980px) {
  .sidebar-toggle { display: flex; }
  .sidebar {
    position: fixed;
    top: var(--global-nav-height);
    left: 0;
    bottom: 0;
    z-index: 40;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: var(--global-nav-height) 0 0 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 35;
  }
  .main-content {
    padding: 32px 20px 64px;
  }
  .hero h1 { font-size: 32px; }
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .domain-grid { grid-template-columns: repeat(2, 1fr); }
  .glossary-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .stat-row { grid-template-columns: 1fr; }
  .domain-grid { grid-template-columns: 1fr; }
}
</style>
