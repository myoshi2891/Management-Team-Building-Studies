<script setup lang="ts">
import { useSeoMeta } from "#imports";

const TOC_IDS = [
  "about-this-guide",
  "overview",
  "what-is-scaling",
  "scaling-myths",
  "why-scaling-fails",
  "when-to-scale",
  "principle-informed-approach",
  "framework-patterns",
  "scaffolding",
  "strategic-alignment",
  "multi-team-multi-site",
  "sustaining-transformation",
  "summary-references"
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
  title: "CASP(Certified Agile Scaling Practitioner)認定資格 完全ガイド | 初学者向けステップバイステップ解説",
  description:
    "Scrum Allianceの Certified Agile Scaling Practitioner(CASP)を初学者向けに解説。定義・失敗要因・原則主導のスケーリング思想・SAFe/LeSS/Spotifyパターン比較・Team Topologiesまで、ステップ解説とMermaid図解、公式ソースURL付きで網羅。",
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

const DIAGRAM_SCALING_GROWTH = `flowchart LR
A["単一のアジャイルチーム\n(Single Agile Team)"] --> B{"プロダクト/組織の\n複雑性が増大"}
B -->|"認知負荷が限界を超える"| C["複数チームへの拡張\n(Scaling)"]
B -->|"複雑性は許容範囲内"| D["単一チームのまま\n改善を継続"]
C --> E["パターンの発見\n(Pattern Discovery)"]
E --> F["価値提供の一貫性維持\n(Consistent Value Delivery)"]
F --> G["戦略の実行とゴール達成\n(Strategy Execution)"]`;

const DIAGRAM_MYTHS_VS_REALITY = `flowchart TD
subgraph Myth["よくある誤解 (Myths)"]
M1["誤解1: 人を増やせば\nスケールできる"]
M2["誤解2: プラクティスを\nそのまま導入すればよい"]
M3["誤解3: スケーリングは\n常に必要である"]
end
subgraph Reality["実態 (Reality)"]
R1["コラボレーション・コミュニケーション・\nクロスファンクショナル性の質を高める"]
R2["プラクティスの背後にある原則を理解し\n文脈に合わせて適応する"]
R3["時にはデスケーリング\n(依存/ムダ/階層の削減)も選択肢"]
end
M1 -.->|"誤解を正す"| R1
M2 -.->|"誤解を正す"| R2
M3 -.->|"誤解を正す"| R3`;

const DIAGRAM_FAILURE_CHAIN = `flowchart TD
A["アジャイルの基礎が\n未成熟な状態でスケール開始"] --> B["機能別サイロの形成"]
A --> C["ジュニア層の急増採用"]
A --> D["手作業プロセスの放置"]
B --> E["依存関係・ハンドオフの増加"]
C --> F["生産性/品質の希薄化"]
D --> G["自動化不足によるボトルネック"]
E --> H["調整コストの急増"]
F --> H
G --> H
H --> I["期待したスケーリング効果が\n実現しない(失敗)"]`;

const DIAGRAM_SCALING_DECISION_TREE = `flowchart TD
Start(["スケーリングを検討中"]) --> Q1{"チームは基本的な\nアジャイル実践に習熟しているか"}
Q1 -->|"いいえ"| N1["まずチームレベルの\nアジャイル基礎固めを優先"]
Q1 -->|"はい"| Q2{"プロダクトの複雑性が\n1チームの認知容量を超えているか"}
Q2 -->|"いいえ"| Q3{"市場競争上、複数チームでの\n並行提供が必要か"}
Q3 -->|"いいえ"| N2["スケーリングは不要\n(現状維持 or デスケール検討)"]
Q3 -->|"はい"| Q4{"手作業プロセスは\n十分に自動化されているか"}
Q2 -->|"はい"| Q4
Q4 -->|"いいえ"| N3["自動化とプロセス基盤の\n整備を先行させる"]
Q4 -->|"はい"| Y1["スケーリングに着手\n(職能横断チームを原則に設計)"]`;

const DIAGRAM_PRINCIPLE_PATTERN_LOOP = `flowchart LR
P1["原則\n(Principles)"] --> P2["パターン\n(Patterns in successful\nagile organizations)"]
P2 --> P3["プラクティス\n(Practices tailored\nto context)"]
P3 --> P4["組織固有の文脈\n(Your Organization's Context)"]
P4 -->|"フィードバック\n(Inspect and Adapt)"| P1
P3 --> S["スキャフォールディング\n(一時的な支援構造)"]
S -->|"組織が成熟したら撤去/更新"| P4`;

const DIAGRAM_FRAMEWORK_PATTERN_LIBRARY = `flowchart TD
SAFe["SAFe\n(ART / Program Increment /\n経済的視点)"] --> Lib["パターンライブラリ\n(自組織の文脈に合わせて\n選択・組み合わせる)"]
LeSS["LeSS\n(単一バックログ/単一PO/\nフィーチャーチーム)"] --> Lib
Spotify["Spotifyモデル\n(Squad/Tribe/Chapter/Guild)"] --> Lib
DAD["DAD\n(ゴール駆動・文脈依存の\nライフサイクル選択)"] --> Lib
S2["Scrum@Scale\n(Scrum of Scrums/MetaScrum/EAT)"] --> Lib
Lib --> Context["組織固有の文脈に適用\n(Principle-Informed Adoption)"]`;

const DIAGRAM_SCAFFOLDING_LIFECYCLE = `flowchart LR
A["変革の課題を特定"] --> B["一時的な支援構造を設計\n(Scaffolding)"]
B --> C["変革の移行期間を支援\n(Support the Transition)"]
C --> D{"組織はこの支援なしで\n自走できるか"}
D -->|"まだ難しい"| E["構造を見直し/調整して継続"]
E --> C
D -->|"自走可能"| F["支援構造を撤去 or\n恒久的な仕組みへ統合"]`;

const DIAGRAM_STRATEGY_CASCADE = `flowchart TD
V["ビジョン/ミッション\n(組織が目指す将来像)"] --> S["エンタープライズ戦略\n(3〜5年規模の方向性)"]
S --> P["ポートフォリオ\n(投資配分・優先順位付け)"]
P --> PR["プログラム/バリューストリーム\n(複数チームの協調単位)"]
PR --> T["チームバックログ\n(スプリント単位の実行)"]
T -.->|"実行から得た学びを\nフィードバック"| S`;

const DIAGRAM_TEAM_TOPOLOGIES_MAP = `flowchart TB
subgraph Stream["ストリーム整合チーム群 (Stream-aligned Teams)"]
S1["チームA\n(職能横断/エンドツーエンド)"]
S2["チームB\n(職能横断/エンドツーエンド)"]
end
PF["プラットフォームチーム\n(Platform Team)"]
EN["イネーブリングチーム\n(Enabling Team)"]
CS["複雑サブシステムチーム\n(Complicated-subsystem Team)"]
S1 -->|"X-as-a-Service:\n基盤を利用"| PF
S2 -->|"X-as-a-Service:\n基盤を利用"| PF
EN -->|"Facilitating:\n技術/実践を伝授"| S1
EN -->|"Facilitating:\n技術/実践を伝授"| S2
S1 -->|"X-as-a-Service:\n専門機能を利用"| CS
S1 -.->|"Collaboration:\n発見フェーズのみ一時的に協働"| S2`;

const DIAGRAM_CONTINUOUS_IMPROVEMENT_LOOP = `flowchart LR
P["計画\n(Plan: 戦略とスケーリング方針)"] --> D["実行\n(Do: マルチチームでの価値提供)"]
D --> C["検査\n(Check: 戦略整合/依存関係/\n持続可能性の点検)"]
C --> A["適応\n(Act: スキャフォールディング/\nチーム構成/パターンの見直し)"]
A --> P
C --> Learn["継続的学習\n(SEU取得/コミュニティ参加)"]
Learn --> P`;
</script>

<template>
  <div class="casp-page">
    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <div class="layout">
      <nav
        id="sidebar"
        class="sidebar"
        :class="{ 'is-open': sidebarOpen }"
        aria-label="目次"
      >
        <div class="sidebar-brand">
          <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
            <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
            <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="brand-text">
            <div class="brand-title">CASP 完全ガイド</div>
            <div class="brand-subtitle">Certified Agile Scaling Practitioner</div>
          </div>
        </div>

        <ul class="sidebar-nav">
          <li class="nav-group-label">はじめに</li>
          <li>
            <a
              href="#about-this-guide"
              :class="{ active: activeId === 'about-this-guide' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:info-circle" aria-hidden="true" />この資料について
            </a>
          </li>
          <li>
            <a
              href="#overview"
              :class="{ active: activeId === 'overview' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:certificate" aria-hidden="true" />0. CASP資格の全体像
            </a>
          </li>

          <li class="nav-group-label">基礎知識: 定義と誤解</li>
          <li>
            <a
              href="#what-is-scaling"
              :class="{ active: activeId === 'what-is-scaling' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:git-branch" aria-hidden="true" />1. スケーリングの定義
            </a>
          </li>
          <li>
            <a
              href="#scaling-myths"
              :class="{ active: activeId === 'scaling-myths' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:list-check" aria-hidden="true" />2. 3つの誤解
            </a>
          </li>

          <li class="nav-group-label">失敗と判断基準</li>
          <li>
            <a
              href="#why-scaling-fails"
              :class="{ active: activeId === 'why-scaling-fails' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:alert-triangle" aria-hidden="true" />3. 失敗する理由
            </a>
          </li>
          <li>
            <a
              href="#when-to-scale"
              :class="{ active: activeId === 'when-to-scale' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:clipboard-check" aria-hidden="true" />4. いつスケールすべきか
            </a>
          </li>

          <li class="nav-group-label">原則とパターン</li>
          <li>
            <a
              href="#principle-informed-approach"
              :class="{ active: activeId === 'principle-informed-approach' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:compass" aria-hidden="true" />5. 原則主導・パターンベース
            </a>
          </li>
          <li>
            <a
              href="#framework-patterns"
              :class="{ active: activeId === 'framework-patterns' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:building-bank" aria-hidden="true" />6. フレームワークのパターン
            </a>
          </li>
          <li>
            <a
              href="#scaffolding"
              :class="{ active: activeId === 'scaffolding' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:building" aria-hidden="true" />7. スキャフォールディング
            </a>
          </li>

          <li class="nav-group-label">戦略とチーム設計</li>
          <li>
            <a
              href="#strategic-alignment"
              :class="{ active: activeId === 'strategic-alignment' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:target" aria-hidden="true" />8. 戦略との整合
            </a>
          </li>
          <li>
            <a
              href="#multi-team-multi-site"
              :class="{ active: activeId === 'multi-team-multi-site' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:users-group" aria-hidden="true" />9. マルチチーム・マルチサイト
            </a>
          </li>

          <li class="nav-group-label">持続可能性とまとめ</li>
          <li>
            <a
              href="#sustaining-transformation"
              :class="{ active: activeId === 'sustaining-transformation' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:refresh" aria-hidden="true" />10. 持続可能な変革
            </a>
          </li>
          <li>
            <a
              href="#summary-references"
              :class="{ active: activeId === 'summary-references' }"
              @click="closeSidebar"
            >
              <Icon name="tabler:flag-3" aria-hidden="true" />11. まとめと参考文献
            </a>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <div class="hero">
          <div class="hero-eyebrow"><Icon name="tabler:award" aria-hidden="true" />Scrum Alliance 資格ガイド</div>
          <h1>Certified Agile Scaling Practitioner (CASP) 完全ガイド</h1>
          <p class="hero-lede">
            初学者のためのステップバイステップ解説 + ベストプラクティス + 参考ソース集
          </p>

          <div class="stat-row">
            <div class="stat-card"><div class="stat-number">13</div><div class="stat-label">章立てセクション数</div></div>
            <div class="stat-card"><div class="stat-number">10</div><div class="stat-label">掲載Mermaid図解</div></div>
            <div class="stat-card"><div class="stat-number">8種</div><div class="stat-label">対象ロール(Transformation Lead 等)</div></div>
            <div class="stat-card"><div class="stat-number">2年</div><div class="stat-label">資格更新サイクル(SEU)</div></div>
          </div>

          <div class="disclaimer-box">
            <Icon name="tabler:info-circle" aria-hidden="true" />
            <span>本ガイドは教育・学習支援を目的とした非公式の解説資料であり、Scrum Alliance 公式のカリキュラム文書そのものではありません。認定の正式な要件・最新情報は必ず<a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">公式サイト</a>でご確認ください。</span>
          </div>
        </div>

        <!-- ===================== 1. About This Guide ===================== -->
        <section id="about-this-guide">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:info-circle" aria-hidden="true" />SECTION 01</div>
          <h2>この資料について</h2>

          <p>本ガイドは、Scrum Alliance が提供する認定資格 <strong>Certified Agile Scaling Practitioner (CASP)</strong> の学習内容を、初学者にもわかりやすいように章立てし、各トピックについて</p>

          <ol>
            <li><strong>ステップバイステップの詳細解説</strong></li>
            <li><strong>Mermaid によるフローチャート/図解</strong></li>
            <li><strong>ベストプラクティス</strong></li>
            <li><strong>根拠となる公式ソース URL</strong></li>
          </ol>

          <p>をセットで提供するものです。CASP は Scrum Alliance の公式ページ上では「Certified Agile Skills - Scaling 1(略称: CAS-Scaling 1 / CASP)」として案内されており、CSM (Certified ScrumMaster) や CAL (Certified Agile Leader) のように詳細な章立てのカリキュラム PDF が一般公開されているわけではありません。公式サイトには "CASP Learning Objectives" という PDF へのリンクがありますが、これは Google ドライブ上でサインインを求められる形式で提供されており、本ガイド作成時点では内容を直接検証できませんでした。そのため本ガイドは、Scrum Alliance が一般公開している<strong>公式コースページ</strong>および<strong>公式リソースライブラリの関連記事(すべて Scrum Alliance 発行)</strong>の内容を一次ソースとして再構成し、業界で広く使われている補助的なフレームワーク・モデル(SAFe、LeSS、Spotify モデル、Team Topologies など)を「パターンの実例」として補足する構成を取っています。</p>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p><strong>対象読者</strong>: Transformation Lead、People Manager、Leadership、Business Analyst、PMO Lead、Scrum Master、Agile Coach/Consultant、Team Lead など、組織のアジャイルスケーリングに関わるすべての人。</p>
            <p><strong>前提条件</strong>: なし(ただしアジャイルの基礎知識があることが推奨されます)。</p>
          </div>
        </section>

        <!-- ===================== 2. Overview ===================== -->
        <section id="overview">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:certificate" aria-hidden="true" />SECTION 02</div>
          <h2>0. CASP資格の全体像</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">CASPとは何か</div>
                <div class="step-desc">
                  <p>CASP (Certified Agile Scaling Practitioner) は、Scrum Alliance が提供する<strong>Agile Skills-Based Certification(アジャイルスキルベース認定)</strong>の一つで、バッジ名は "Certified Agile Skills - Scaling 1" です。CSM や CSPO のように特定のロール(Scrum Master、Product Owner)を認定するものではなく、「組織がアジャイルの能力を複数チームに拡張する際に必要なスキルと考え方」を認定する、スキル横断型の資格として位置づけられています。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">誰のための資格か</div>
                <div class="step-desc">
                  <p>公式ページでは、以下のような役割の人に向いているとされています。</p>
                  <div class="table-wrap">
                    <table>
                      <thead><tr><th>対象ロール</th><th>学ぶ意義</th></tr></thead>
                      <tbody>
                        <tr><td>Transformation Lead</td><td>変革が失敗する典型パターンを知り、スケーリングアプローチを評価できるようになる</td></tr>
                        <tr><td>People Manager</td><td>チームがアジャイルの原則・価値観・プラクティスを理解しながらスケールする支援ができる</td></tr>
                        <tr><td>Leadership(経営層)</td><td>変革を成功させ、組織目標を達成し、変化への適応力を高める</td></tr>
                        <tr><td>Business Analyst</td><td>柔軟なスケーリングにより戦略実行を高速化する方法を理解する</td></tr>
                        <tr><td>PMO Lead</td><td>複数チーム・複数プロダクトにまたがるスケーリング手法を評価・適用できる</td></tr>
                        <tr><td>Scrum Master</td><td>複数の Scrum チームにアジャイルを拡張する持続可能なアプローチの一端を担う</td></tr>
                        <tr><td>Agile Coach / Consultant</td><td>特定フレームワークに縛られず、フレームワークの中にある「パターン」を活用してクライアントを支援する</td></tr>
                        <tr><td>Team Lead</td><td>チームが反復的・漸進的に働きながらマルチチーム開発を支援する方法を知る</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">資格取得後に得られるもの</div>
                <div class="step-desc">
                  <ul>
                    <li><strong>専門性(Expertise)</strong>: 既存の人材・成功しているプラクティス・リソースを使い、持続可能にアジャイルの成果を高める方法</li>
                    <li><strong>成長(Growth)</strong>: 組織内のアジャイルの容量とケイパビリティの拡大</li>
                    <li><strong>適応力(Adaptability)</strong>: スケーリングが失敗する理由と、その課題への対処法</li>
                    <li><strong>複雑性のマネジメント(Manage complexity)</strong>: スケーリングに伴う組織・プロダクトの複雑性に対応するためのツールと自信</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">資格維持の仕組み(SEU)</div>
                <div class="step-desc">
                  <p>Scrum Alliance の認定は「一度取得したら終わり」ではなく、2年ごとに<strong>SEU (Scrum Education Units)</strong>を貯めて更新する必要があります。CASP に関連する公式記事を読んだり動画を視聴したりするだけでも SEU を獲得できる仕組みが用意されています。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>CASP を受講する前に、チームレベルの基礎的なアジャイル/Scrum の実践経験を積んでおく(公式には前提条件はないが、推奨されている)。</li>
              <li>自組織でどのロールの人がスケーリングに関与しているかをまず洗い出し、CASP で学ぶ視点を「誰に」「どう」適用するかを意識しながら学習する。</li>
              <li>資格を取って終わりにせず、SEU を継続的に獲得し、コミュニティ(メンター、ピア、専門家)とつながり続ける。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">Scrum Alliance 公式 CASP ページ</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">Scrum Education Units (SEU) の仕組み</span><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 3. What Is Scaling ===================== -->
        <section id="what-is-scaling">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:git-branch" aria-hidden="true" />SECTION 03</div>
          <h2>1. スケーリングとは何か(定義)</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">公式の定義を理解する</div>
                <div class="step-desc">
                  <p>Scrum Alliance は、スケーリング(Scaling)を次のように定義しています。</p>
                  <div class="callout note" data-testid="callout" data-variant="note">
                    <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
                    <p>アジャイルの能力と振る舞いを複数チームに拡張しながら、提供する価値を高めるためのプラクティスとパターンを見出していくこと。組織のスケーリングの目的は、目標を達成し、戦略をより良く実行することにあるべきである。</p>
                  </div>
                  <p>ポイントは、スケーリングは単に「チームの数を増やすこと」ではなく、<strong>複数チームにアジャイルの本質(価値提供・変化への対応)を拡張しながら、組織固有の成功パターンを発見していくプロセス</strong>だという点です。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">なぜスケーリングが必要になるのか</div>
                <div class="step-desc">
                  <p>単一のアジャイルチームは、密なコミュニケーション、頻繁なフィードバックループ、反復的な開発サイクルによって高いパフォーマンスを発揮します。しかし、プロダクトやサービスの規模・複雑性が増すと、次のような理由から複数チームの関与が必要になります。</p>
                  <ul>
                    <li>プロダクトの範囲や複雑性が1チームの認知容量(Cognitive Load)を超える</li>
                    <li>複数の拠点・部門・専門領域にまたがる開発が必要になる</li>
                    <li>市場からのスピード要求(Time to Market)が高まる</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">スケーリングの本質を見失わない</div>
                <div class="step-desc">
                  <p>スケーリングは「もっと(more)」を追加することではありません。チームの数が増えても、依存関係の調整、目標の整合、品質の担保、プロダクトビジョンの一貫性という課題に体系的に対応できなければ、逆に俊敏性(Agility)が失われてしまいます。真のスケーリングの価値は、複数のアジャイルチームの協調的なエネルギーとイノベーションを活かして、より一貫して・より予測可能に価値を提供できるようになることにあります。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_SCALING_GROWTH" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">単一チームからマルチチームへの拡張</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>スケーリングを「目的」にせず、あくまで「戦略実行とゴール達成の手段」として扱う。</li>
              <li>チーム数を増やす前に、単一チームレベルでアジャイルの原則が機能しているかを確認する。</li>
              <li>スケーリングの初期段階から、「どんなパターンが自組織にフィットするか」を観察・記録する文化を作る。</li>
              <li>複雑性が増えても、フィードバックループの頻度・透明性・協働の質を落とさない設計を優先する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">CASP 公式ページ(スケーリングの定義、学習目標)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">"When to Scale and When Not to Scale"(スケーリングの定義と本質)</span><a href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 4. Scaling Myths ===================== -->
        <section id="scaling-myths">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:list-check" aria-hidden="true" />SECTION 04</div>
          <h2>2. アジャイルスケーリングにまつわる3つの誤解</h2>

          <p>Scrum Alliance のリソースライブラリでは、組織がスケーリングに失敗する背景にある典型的な誤解(Myth)が3つ紹介されています。それぞれを正しく理解することが、CASP の学習の出発点になります。</p>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">誤解1「スケーリング = 人を増やすこと」</div>
                <div class="step-desc">
                  <p>多くの組織は「人を増やせばスケールできる」と考えがちですが、人数の増加は成功を自動的に保証しません。真に重要なのは、<strong>コラボレーションの拡張・コミュニケーションの円滑化・プロセスの合理化・権限を持つクロスファンクショナルチームの育成</strong>です。人数(quantity)ではなく、チームの力学・コミュニケーションスキル・専門性の多様性(quality)へと意識をシフトする必要があります。時期尚早にスケールすると、かえって「スケールアップ問題」を引き起こします。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">誤解2「スケーリング = プラクティスを導入すること」</div>
                <div class="step-desc">
                  <p>SAFe のような大規模フレームワークには多くのプラクティスが含まれていますが、組織固有の文脈を考慮せずにそれらを厳密に導入するだけでは、最適とは言えない結果につながります。真のアジャイルスケーリングとは、プラクティスの背後にある<strong>原則</strong>を理解し、それを自組織の要件・課題に合わせてカスタマイズすることです。繰り返し起きる問題を特定し、それに対応する戦略を採用するという、適応と継続的改善へのマインドシフトが本質です。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">誤解3「スケーリングは常に必要である」</div>
                <div class="step-desc">
                  <p>スケーリングが常に組織にとって唯一の正解だと考えるのも誤解です。実際には「<strong>デスケーリング(de-scaling)</strong>」、つまり依存関係・引き継ぎ(handoff)・ムダ・階層を減らすという方向性にも価値があります。複雑さに厳格にこだわることは、アジャイルの促進どころか阻害要因になり得ます。組織はスケールアップと同時に、デスケールできる機会も見極める必要があります。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_MYTHS_VS_REALITY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">誤解と実態の対比</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>チームを増員する前に、既存チームのコラボレーション品質・コミュニケーションの流れ・サイロの有無を点検する。</li>
              <li>フレームワークのプラクティスを導入する際は「なぜこのプラクティスが存在するのか」という原則を必ずセットで学ぶ。</li>
              <li>定期的に「今の組織にスケーリングは本当に必要か、デスケーリングすべき部分はないか」を問い直すレビューの場を設ける。</li>
              <li>スケーリングの成功指標を「チーム数」ではなく「価値提供の一貫性・予測可能性・顧客満足」に置く。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"Agile Scaling Myths: Beyond Common Misconceptions"</span><a href="https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions</a></li>
              <li><span class="ref-name">"When to Scale and When Not to Scale"(デスケーリングの視点)</span><a href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 5. Why Scaling Fails ===================== -->
        <section id="why-scaling-fails">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:alert-triangle" aria-hidden="true" />SECTION 05</div>
          <h2>3. スケーリングが失敗する理由</h2>

          <p>CASP の学習目標の一つに「なぜアジャイルスケーリングがしばしば失敗するのかを理解する」ことが明記されています。Scrum Alliance の公式コンテンツから読み取れる主な失敗要因を整理します。</p>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">基礎ができていない状態での見切り発車</div>
                <div class="step-desc">
                  <p>チームがまだ基本的なアジャイルプラクティスに習熟していないうちにスケーリングの複雑性を持ち込むのは、「馬の前に荷車を置く」ようなものだとされています。スケーリングは、アジャイルの旅における「進歩の証」として捉えるべきであり、出発点ではありません。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">安易な増員としての機能別サイロ化</div>
                <div class="step-desc">
                  <p>需要の高まりに対応するため、組織はしばしば機能ごとのチーム(Functional Team)を作ってしまいます。一見効率的な分業に見えますが、実際にはタスクがチームをまたいで移動する必要が生じ、ボトルネックと依存関係が増加します。調整コストが急増し、期待したスケーリングの効果が実現しないことがよくあります。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">ジュニア層の急増による生産性の希薄化</div>
                <div class="step-desc">
                  <p>急ぎでチームを拡大するために、経験の浅い人材を大量に採用してしまうケースも失敗要因の一つです。人数が増えても、それに比例して生産性や品質が向上するとは限りません。少数の高い専門性を持つ人材に投資する方が、結果的に多くを達成できることもあります。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">手作業プロセスのボトルネック化</div>
                <div class="step-desc">
                  <p>チームが増え、プロジェクトが複雑化するにつれて、自動化されていない手作業のプロセスが生産性のアキレス腱になります。特に複数チームにまたがる反復的なタスクの自動化が不足していると、一貫性の維持・品質の担保・スピードの確保が困難になります。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_FAILURE_CHAIN" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">失敗の連鎖</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>スケーリングに着手する前に、チームレベルのアジャイル成熟度(基本セレモニー・価値観の定着度)を評価する。</li>
              <li>新しいチームを作る際は、機能別ではなく<strong>クロスファンクショナル(職能横断)</strong>を原則とする。</li>
              <li>採用計画では、経験豊富な人材への投資と、ジュニア層の育成計画のバランスを設計段階で検討する。</li>
              <li>スケーリングの前に、繰り返し発生する手作業プロセス(ビルド、テスト、デプロイ、レポーティング等)の自動化状況を棚卸しする。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"When to Scale and When Not to Scale"(失敗要因: ジュニア採用・サイロ・自動化不足)</span><a href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
              <li><span class="ref-name">"Why Scaling Agility So Often Fails (And What to Do About It)"(動画)</span><a href="https://resources.scrumalliance.org/Video/scaling-agility-fails-and-it" target="_blank" rel="noopener">https://resources.scrumalliance.org/Video/scaling-agility-fails-and-it</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 6. When To Scale ===================== -->
        <section id="when-to-scale">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:clipboard-check" aria-hidden="true" />SECTION 06</div>
          <h2>4. いつスケールすべきか、いつすべきでないか</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">本質的複雑性と偶発的複雑性を見分ける</div>
                <div class="step-desc">
                  <p>スケーリングの中心にあるのは「複雑性」の管理です。複雑性には、プロダクトやプロジェクトの性質上避けられない<strong>本質的複雑性(Essential Complexity)</strong>と、組織が成長する過程で偶発的に生まれる<strong>偶発的複雑性(Accidental Complexity)</strong>の2種類があります。この2つを見分け、それぞれに適した対処法を選べるかどうかが、スケーリングの成否を左右します。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">スケールすべき代表的な状況</div>
                <div class="step-desc">
                  <p><strong>プロダクトの複雑性と認知過負荷</strong>: プロダクトが成長するにつれて、設計・開発・テスト・デプロイ・保守の複雑さが1チームの処理能力を超えることがあります。この場合、複数チームに認知的な負荷を分散させることで、各チームが担当領域に深く集中できるようになります。</p>
                  <p><strong>市場からの競争圧力</strong>: 市場でいち早く、あるいは少なくとも適時に価値を届けることが競争優位につながる状況では、複数チームを並行稼働させることで提供サイクルを加速させ、市場の変化や顧客フィードバックに迅速に対応できます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">スケールが望ましくない代表的な状況</div>
                <div class="step-desc">
                  <ul>
                    <li><strong>ジュニア層への安易な依存</strong>: 人数を増やすだけでは、比例した生産性向上にはつながらない。</li>
                    <li><strong>機能別サイロへの傾向</strong>: 一見効率的だが、ボトルネックと依存関係を増大させる。</li>
                    <li><strong>アジャイル経験の乏しいチーム</strong>: 基礎的なアジャイルプラクティスが定着していない状態でスケールの複雑性を導入するのは時期尚早。</li>
                    <li><strong>手作業プロセスの残存</strong>: 自動化が不十分な状態でチームを増やすと、一貫性と品質の維持が困難になる。</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">意思決定のためのチェックリストとして使う</div>
                <div class="step-desc">
                  <p>CASP ではこれらの視点を、フレームワークを機械的に適用するための判断基準としてではなく、<strong>自組織の文脈の中でスケーリングの是非を検討するための問いかけ</strong>として活用することが推奨されています。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_SCALING_DECISION_TREE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">スケーリング判断のディシジョンフロー</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>スケーリングの意思決定会議では、必ず「本質的複雑性」と「偶発的複雑性」を分けて議論する。</li>
              <li>t 字型人材(T-shaped: 一分野に深い専門性を持ちつつ複数分野に広い知識を持つ人材)の採用・育成を優先する。</li>
              <li>スケーリングを「一度きりの意思決定」ではなく、定期的に見直す継続的な問いとして扱う。</li>
              <li>スケールしないという判断も正当な戦略的選択肢であることをリーダーシップ層に周知する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"When to Scale and When Not to Scale"</span><a href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
              <li><span class="ref-name">"Agile Scaling Myths: Beyond Common Misconceptions"(デスケーリングの視点)</span><a href="https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 7. Principle-Informed Approach ===================== -->
        <section id="principle-informed-approach">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:compass" aria-hidden="true" />SECTION 07</div>
          <h2>5. 原則主導・パターンベースのアプローチ(フレームワーク非依存の思想)</h2>

          <p>CASP の最大の特徴は、<strong>特定のスケーリングフレームワーク(SAFe、Spotify モデル等)を教え込む資格ではない</strong>という点です。Scrum Alliance はこれを「Principle-Informed, Framework-Agnostic Course(原則に基づく、フレームワークに依存しないコース)」と明確に位置づけています。</p>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">なぜ「文脈こそが王様」なのか</div>
                <div class="step-desc">
                  <p>すべての組織は、その歴史・価値観・文化・市場でのポジショニングによって織り成された固有の存在です。既製品のフレームワークは、このような複雑な個別事情を一般化してしまうため、意図せず不整合や<strong>アンチパターン</strong>を助長することがあります。ある大企業にとって改善をもたらしたフレームワークが、異なる力学を持つ中小企業にとっては停滞や阻害要因になることさえあります。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">「原則主導(Principle-Informed)」の考え方</div>
                <div class="step-desc">
                  <p>これは、アジャイルの実践を支える根本的な原則を理解することに重点を置くアプローチです。原則にフォーカスすることで、組織は自らの価値観とビジネス文脈に密接に合致したプラクティスを形作ることができます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">「パターンベース(Patterns-Based)」の考え方</div>
                <div class="step-desc">
                  <p>単一のフレームワークに厳密に従うのではなく、成功しているアジャイル組織に見られる<strong>パターン</strong>を観察し、それを自組織のニーズに合わせて適応させるアプローチです。CASP では SAFe・LeSS・Spotify モデル・DAD などのフレームワークに含まれる「パターン」を認識し、フレームワークそのものの効果を高める視点を養います。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">「スキャフォールディング(Scaffolding)」の考え方</div>
                <div class="step-desc">
                  <p>これは、組織の変革を支えるための<strong>一時的な支援構造</strong>を構築するという発想です。建築現場の足場のように、組織が成熟するにつれて修正されたり撤去されたりすることを前提とした、あくまで一時的な仕組みとして設計します(詳細は第7章)。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">5</div>
              <div class="step-body">
                <div class="step-title">「アジャイルを使ってアジャイルになる(Using Agile to Become Agile)」</div>
                <div class="step-desc">
                  <p>アジャイルを強制的に導入するのではなく、反復・フィードバック・適応というアジャイルの原則そのものを、変革のプロセス自体に適用するという発想です。小さく始め、フィードバックを集め、プロセスを反復的に改善していく、まさに一つのアジャイルチームが行うのと同じアプローチを、組織変革そのものに対して行います。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_PRINCIPLE_PATTERN_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">原則 → パターン → プラクティス → 文脈のループ</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>フレームワークを導入する前に「このフレームワークが解決しようとしている原則的な課題は何か」を言語化する。</li>
              <li>他社事例(例: トヨタのリーン生産方式、Zara の俊敏なサプライチェーン)を「コピー」ではなく「原則の適用例」として学ぶ。</li>
              <li>変革チーム自身が、自らの変革活動に対してスプリント/レトロスペクティブのようなアジャイルの反復サイクルを適用する。</li>
              <li>スキャフォールディングとして導入した構造には、あらかじめ「見直し・撤去のタイミング」を設定しておく。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"Why Certified Agile Scaling Practitioner Is Not a Framework"</span><a href="https://resources.scrumalliance.org/Article/cas-scaling-1-framework" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/cas-scaling-1-framework</a></li>
              <li><span class="ref-name">CASP 公式ページ(パターン認識・スキャフォールディングの言及)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 8. Framework Patterns ===================== -->
        <section id="framework-patterns">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building-bank" aria-hidden="true" />SECTION 08</div>
          <h2>6. 代表的スケーリングフレームワークからパターンを学ぶ</h2>

          <p>CASP は特定のフレームワークを推奨するものではありませんが、公式ページでは学習者が<strong>LeSS、SAFe、Spotify モデル、DAD</strong>などのフレームワークに含まれるパターンを認識し、その効果を高める力を養うことが明記されています。ここでは、それぞれのフレームワークが持つ代表的な「パターン」を、原則学習の補助教材として整理します。</p>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">SAFe (Scaled Agile Framework) のパターン</div>
                <div class="step-desc">
                  <p>SAFe は Dean Leffingwell によって開発された、リーン・アジャイル開発を企業規模で実践するための知識体系です。Team・Program・Large Solution・Portfolio という複数レベルの構造を持ち、<strong>Program Increment (PI)</strong>と呼ばれる共通のケイデンス(cadence)で複数チームの計画・実行を同期させる「ART (Agile Release Train)」という単位が中核パターンです。「経済的視点を持つ」「システム思考を適用する」など10の原則が土台になっています。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">LeSS (Large-Scale Scrum) のパターン</div>
                <div class="step-desc">
                  <p>LeSS は「できるだけ標準の Scrum に近い形でスケールする」ことを志向するフレームワークです。<strong>単一のプロダクトバックログ・単一のプロダクトオーナー・複数のフィーチャーチーム</strong>という、Scrum の骨格をできる限り保ったままチーム数を増やすパターンが特徴です。Scrum Alliance の CASP 公式ページでは、LeSS コースが CASP と相性のよい選択肢として案内されています。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">Spotify モデルのパターン</div>
                <div class="step-desc">
                  <p>Spotify モデルは、Spotify 社内の組織デザインを外部の実践者が事例化したもので、Spotify 自身は「フレームワーク」として提唱していない点に注意が必要です。<strong>Squad(独立して機能を届ける小チーム)・Tribe(Squad の集合)・Chapter(職種ごとの横串)・Guild(関心を共有するコミュニティ)</strong>という組織単位のパターンがよく引用されます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">DAD (Disciplined Agile Delivery) のパターン</div>
                <div class="step-desc">
                  <p>DAD(現在は PMI の Disciplined Agile として展開)は、単一のプロセスを強制するのではなく、<strong>ゴール駆動・文脈依存(context-sensitive)でライフサイクルやプラクティスを選択する</strong>という考え方を提供します。これは CASP の「原則主導・パターンベース」の思想と非常に親和性が高いフレームワークです。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">5</div>
              <div class="step-body">
                <div class="step-title">Scrum@Scale のパターン</div>
                <div class="step-desc">
                  <p>Scrum@Scale は Scrum の生みの親の一人である Jeff Sutherland が提唱するモデルで、<strong>Scrum of Scrums による調整・MetaScrum によるプロダクト側の整合・EAT (Executive Action Team) による組織側の整合</strong>という、Scrum のイベント構造をフラクタル状に拡張するパターンを持ちます。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_FRAMEWORK_PATTERN_LIBRARY" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">複数フレームワークからパターンを抽出する</div>
          </div>

          <h3>比較表: 代表的スケーリングフレームワーク</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>フレームワーク</th><th>主な単位</th><th>調整の仕組み</th><th>得意な文脈</th></tr></thead>
              <tbody>
                <tr><td>SAFe</td><td>ART (Agile Release Train)</td><td>Program Increment(共通ケイデンス)</td><td>大規模・複数プログラムを持つエンタープライズ</td></tr>
                <tr><td>LeSS</td><td>フィーチャーチーム</td><td>単一プロダクトバックログ/単一PO</td><td>Scrum の骨格を保ったまま拡張したい組織</td></tr>
                <tr><td>Spotify モデル</td><td>Squad / Tribe</td><td>Chapter / Guild による横串連携</td><td>プロダクト志向の自律分散型組織(元は Spotify 社内事例)</td></tr>
                <tr><td>DAD (Disciplined Agile)</td><td>チーム(ライフサイクル選択制)</td><td>ゴール駆動の意思決定ガイド</td><td>プロセスの多様性・文脈依存性が高い組織</td></tr>
                <tr><td>Scrum@Scale</td><td>Scrum チームの集合</td><td>Scrum of Scrums / MetaScrum / EAT</td><td>Scrum を土台にフラクタルに拡張したい組織</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>どのフレームワークも「まるごと導入」するのではなく、自組織の課題に直接効くパターンだけを抽出して試す。</li>
              <li>複数フレームワークのパターンを組み合わせる際は、矛盾する前提(例: 単一バックログ vs 複数プログラムの独立性)がないか事前に検討する。</li>
              <li>Spotify モデルのように「実際には特定企業の一事例」であるものは、普遍的な処方箋ではなく参考事例として扱う。</li>
              <li>フレームワーク選定の議論をする際は、CASP の「原則主導・パターンベース」の視点を判断基準として明示的に使う。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"Why Certified Agile Scaling Practitioner Is Not a Framework"(SAFe/Spotify/Scrum@Scale への言及)</span><a href="https://resources.scrumalliance.org/Article/cas-scaling-1-framework" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/cas-scaling-1-framework</a></li>
              <li><span class="ref-name">CASP 公式ページ(LeSS/SAFe/Spotify/DAD への言及、LeSS コースとの連携)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">LeSS(Large-Scale Scrum)公式サイト</span><a href="https://less.works/" target="_blank" rel="noopener">https://less.works/</a></li>
              <li><span class="ref-name">Scaled Agile Framework 公式サイト</span><a href="https://scaledagileframework.com/" target="_blank" rel="noopener">https://scaledagileframework.com/</a></li>
              <li><span class="ref-name">Scrum@Scale 公式サイト</span><a href="https://www.scrumatscale.com/" target="_blank" rel="noopener">https://www.scrumatscale.com/</a></li>
              <li><span class="ref-name">Disciplined Agile(PMI)公式ページ</span><a href="https://www.pmi.org/disciplined-agile" target="_blank" rel="noopener">https://www.pmi.org/disciplined-agile</a></li>
              <li><span class="ref-name">Scrum Alliance の LeSS コース案内ページ</span><a href="https://www.scrumalliance.org/get-certified/scaling/large-scale-scrum" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scaling/large-scale-scrum</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 9. Scaffolding ===================== -->
        <section id="scaffolding">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:building" aria-hidden="true" />SECTION 09</div>
          <h2>7. スキャフォールディング(足場)の活用</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">スキャフォールディングとは何か</div>
                <div class="step-desc">
                  <p>建築工事現場の「足場」を思い浮かべてください。足場は建物そのものではなく、建物が完成するまでの<strong>一時的な支援構造</strong>です。CASP における「スキャフォールディング」も同じ発想で、組織の変革を望ましい方向に進めるための一時的な仕組み・役割・ガバナンス構造を指します。恒久的な官僚機構になってはならず、組織が成熟するにつれて修正または撤去されることが前提です。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">スキャフォールディングの具体例</div>
                <div class="step-desc">
                  <ul>
                    <li>変革初期に設置する<strong>移行支援チーム(Transition Team)</strong></li>
                    <li>複数チームの実践知を共有するための<strong>プラクティス共同体(Community of Practice)</strong></li>
                    <li>複数チーム間の依存関係を一時的に調整する<strong>コーディネーション役割</strong>(例: SAFe の Release Train Engineer のような橋渡し役)</li>
                    <li>変革の進捗をモニタリングするための<strong>暫定ガバナンスボード</strong></li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">なぜ「一時的」であることが重要か</div>
                <div class="step-desc">
                  <p>スキャフォールディングを恒久化してしまうと、それ自体が新たな階層・ムダ・依存関係を生み出し、第2章で見た「誤解2: プラクティスの導入だけでスケーリングが完成する」という罠に陥ります。スキャフォールディングは、組織が自走できる状態(セルフオーガナイズできる状態)に到達するための「補助輪」であり、補助輪はいずれ外すことを前提に設計しなければなりません。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">撤去・進化のタイミングをどう判断するか</div>
                <div class="step-desc">
                  <p>CASP の思想に沿えば、これも「フレームワークのルール」で機械的に判断するのではなく、<strong>組織が実際にその支援構造なしで機能できるようになったかどうか</strong>という観察に基づいて、継続的に見直す必要があります。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_SCAFFOLDING_LIFECYCLE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">スキャフォールディングのライフサイクル</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>すべてのスキャフォールディングに「設置目的」と「撤去/見直しの判断基準」をセットで文書化する。</li>
              <li>スキャフォールディングの責任者を明確にし、定期的なレビュー(例: 四半期ごと)をカレンダーに組み込む。</li>
              <li>一時的な役割・チームであることをメンバー自身にも明示し、キャリアパスの誤解を防ぐ。</li>
              <li>スキャフォールディングが増えすぎていないか(気づけば恒久的な官僚機構になっていないか)を定期的に棚卸しする。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"Why Certified Agile Scaling Practitioner Is Not a Framework"(スキャフォールディングの定義)</span><a href="https://resources.scrumalliance.org/Article/cas-scaling-1-framework" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/cas-scaling-1-framework</a></li>
              <li><span class="ref-name">CASP 公式ページ("Explore the use of scaffolding" の記載)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 10. Strategic Alignment ===================== -->
        <section id="strategic-alignment">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:target" aria-hidden="true" />SECTION 10</div>
          <h2>8. エンタープライズ戦略とスケーリングの整合</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">なぜ戦略との整合が必要か</div>
                <div class="step-desc">
                  <p>CASP の学習目標には「スケーリングの取り組みをエンタープライズ戦略に整合させる(Align scaling efforts with your enterprise strategy)」ことが明記されています。スケーリングそのものは目的ではなく、<strong>組織が戦略をより速く、より効果的に実行するための手段</strong>です。整合が取れていないスケーリングは、チームが忙しく動いているのに組織のゴールに近づいていない、という状態を生み出します。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">戦略を各レベルに伝播させる</div>
                <div class="step-desc">
                  <p>大規模な組織では、経営層が描くビジョン・戦略が、ポートフォリオ・プログラム(バリューストリーム)・チームバックログへと段階的に具体化されていく必要があります。これは SAFe が Portfolio → Large Solution → Program → Team という階層で扱っている構造にも共通するパターンであり、CASP ではこれを特定フレームワークの専売特許としてではなく、<strong>戦略を実行可能な単位に分解していく一般的なパターン</strong>として学びます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">役割ごとの戦略整合の視点</div>
                <div class="step-desc">
                  <ul>
                    <li><strong>PMO Lead</strong>: 複数チーム・複数プロダクトにまたがるスケーリング手法を評価し、戦略実行速度を上げる。</li>
                    <li><strong>Business Analyst</strong>: 柔軟なスケーリングアプローチが、戦略をより速く・より効果的に実行する組織能力をどう改善するかを分析する。</li>
                    <li><strong>Leadership</strong>: 変革を成功させ、組織のゴールを達成し、顧客に結果を届け、急速に変化する環境に適応することに責任を持つ。</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">「戦略実行の速度」を測る</div>
                <div class="step-desc">
                  <p>戦略との整合を評価する際は、単にプロジェクトの進捗ではなく、<strong>戦略的な意思決定から実際の価値提供までのリードタイム</strong>や、<strong>戦略変更に対する組織の適応スピード</strong>を指標として意識することが重要です。</p>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_STRATEGY_CASCADE" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">戦略のカスケード(段階的な具体化)</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>戦略とチームの日々の作業の間に、必ず「なぜこの作業が戦略に貢献するのか」を説明できる中間レイヤー(ポートフォリオ/プログラム/バリューストリーム)を設ける。</li>
              <li>スケーリングの取り組みを評価する際は、アウトプット(完了したチケット数)ではなくアウトカム(戦略目標への貢献度)で測定する。</li>
              <li>戦略が変化した際に、どのレベルまで素早く方向転換できるかを定期的に検証する(戦略のアジリティの点検)。</li>
              <li>PMO・Business Analyst・Leadership など、戦略に関わる異なる役割の間で「スケーリングの目的」の認識を揃える場を設ける。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">CASP 公式ページ("Align your organizational principles with appropriate scaling patterns" 等の記載)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">"Why Certified Agile Scaling Practitioner Is Not a Framework"(組織文脈と戦略の話)</span><a href="https://resources.scrumalliance.org/Article/cas-scaling-1-framework" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/cas-scaling-1-framework</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 11. Multi-Team Multi-Site ===================== -->
        <section id="multi-team-multi-site">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:users-group" aria-hidden="true" />SECTION 11</div>
          <h2>9. マルチチーム・マルチサイトのアジャイル製品開発</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">チーム間の依存関係とコンウェイの法則</div>
                <div class="step-desc">
                  <p>複数チームが1つのプロダクトに関わるようになると、<strong>チーム間の依存関係の管理</strong>が中心的な課題になります。ここで重要になるのが<strong>コンウェイの法則(Conway's Law)</strong>です。これは「システムを設計する組織は、その組織のコミュニケーション構造をそのまま模倣したシステム設計を生み出す」という考え方で、組織構造とソフトウェアアーキテクチャは切り離せない関係にあることを示しています。チーム構成を設計する際は、望ましいアーキテクチャを実現できるコミュニケーション構造になっているかを意識する必要があります。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">Team Topologies に見るチーム設計のパターン</div>
                <div class="step-desc">
                  <p>Team Topologies(Matthew Skelton, Manuel Pais)は、コンウェイの法則を積極的に活用しながら、高速なフロー(Fast Flow)を実現するための4つの基本的なチームタイプと3つのチーム間インタラクションモードを提示しています。CASP の「パターンを認識する」という学習目標に直結する、マルチチーム設計の代表的な考え方です。</p>
                  <ul>
                    <li><strong>ストリーム整合チーム(Stream-aligned team)</strong>: ビジネス上の主要な価値の流れに沿い、他チームを待たずに増分を届けられる職能横断チーム</li>
                    <li><strong>プラットフォームチーム(Platform team)</strong>: ストリーム整合チームの認知負荷を下げる、共通基盤を提供するチーム</li>
                    <li><strong>イネーブリングチーム(Enabling team)</strong>: 他チームが新しい技術やプラクティスを習得する支援をするチーム</li>
                    <li><strong>複雑サブシステムチーム(Complicated-subsystem team)</strong>: 高度な専門知識を要する特定領域を担当するチーム</li>
                  </ul>
                  <p>インタラクションモードは<strong>コラボレーション(Collaboration)・X-as-a-Service・ファシリテーション(Facilitating)</strong>の3種類があり、状況に応じて使い分けます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">t 字型人材とクロスファンクショナルチーム</div>
                <div class="step-desc">
                  <p>マルチチーム開発を成功させる鍵は、<strong>t 字型人材(T-shaped)</strong>、すなわち一つの専門分野に深い知見を持ちながら複数の分野にも幅広い知識を持つ人材の採用と育成です。t 字型人材が揃ったクロスファンクショナルチームは、他チームへの依存を減らし、スムーズな移行とボトルネックの回避を実現します。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">マルチサイト(複数拠点)特有の配慮</div>
                <div class="step-desc">
                  <p>拠点や時差が分かれる場合は、次のような配慮が追加で必要になります。</p>
                  <ul>
                    <li>コアタイム(重複する稼働時間帯)の確保</li>
                    <li>共通の完成の定義(Definition of Done)と品質基準の明文化</li>
                    <li>非同期コミュニケーションを前提としたドキュメント文化の整備</li>
                    <li>拠点をまたぐ調整のための Scrum of Scrums のようなパターンの活用</li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_TEAM_TOPOLOGIES_MAP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">Team Topologies によるチーム間関係</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>チーム構成を設計する前に、目指すアーキテクチャとコンウェイの法則の関係を明示的に議論する。</li>
              <li>4つのチームタイプの中で「ストリーム整合チーム」を組織の標準形として最大化し、その他のチームタイプはそれを支援する位置づけにする。</li>
              <li>チーム間のインタラクションモードは固定せず、発見フェーズは Collaboration、安定運用フェーズは X-as-a-Service へと意図的に移行させる。</li>
              <li>マルチサイト環境では、非同期コミュニケーションを前提としたドキュメント基準を早期に整備する。</li>
              <li>採用・育成計画に t 字型人材の育成パスを明示的に組み込む。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">"When to Scale and When Not to Scale"(t字型人材/クロスファンクショナルチームの重要性)</span><a href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
              <li><span class="ref-name">CASP 公式ページ("multi-team, multi-site agile product development" の学習目標記載)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">Team Topologies 公式サイト</span><a href="https://teamtopologies.com/" target="_blank" rel="noopener">https://teamtopologies.com/</a></li>
              <li><span class="ref-name">コンウェイの法則(Conway's Law)の概説</span><a href="https://en.wikipedia.org/wiki/Conway%27s_law" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Conway%27s_law</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 12. Sustaining Transformation ===================== -->
        <section id="sustaining-transformation">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:refresh" aria-hidden="true" />SECTION 12</div>
          <h2>10. 持続可能な変革を支える仕組み</h2>

          <ol class="step-list">
            <li>
              <div class="step-num">1</div>
              <div class="step-body">
                <div class="step-title">変革を「一度きりのイベント」にしない</div>
                <div class="step-desc">
                  <p>CASP の学習目標には「マルチチーム・マルチサイトのアジャイル製品開発を実現し、持続可能で永続的な変革を推進する(drive sustainable, lasting transformation)」ことが含まれています。スケーリングの取り組みは、プロジェクトのように「完了」するものではなく、組織が変化し続ける限り継続していく活動です。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">2</div>
              <div class="step-body">
                <div class="step-title">継続的な検査と適応(Inspect & Adapt)を組織レベルで回す</div>
                <div class="step-desc">
                  <p>チームレベルのスプリントレトロスペクティブと同じ発想を、組織のスケーリング施策そのものにも適用します。定期的に「今のスケーリングの形は機能しているか」「どのスキャフォールディングを見直すべきか」「戦略との整合は保たれているか」を検査し、次のサイクルに反映させます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">3</div>
              <div class="step-body">
                <div class="step-title">継続的学習の制度化(SEU とコミュニティ)</div>
                <div class="step-desc">
                  <p>Scrum Alliance の認定は、2年ごとの更新に SEU (Scrum Education Units) の取得が必要な設計になっており、「一度きりの資格」ではなく「学び続けることを証明するバッジ」として位置づけられています。CASP 取得者は、書籍・ウェビナー・イベントなど多様な学習機会を通じて SEU を積み上げながら、世界最大級のアジャイル実践者コミュニティのメンバーとして、ピアやメンター、専門家とつながり続けることができます。</p>
                </div>
              </div>
            </li>
            <li>
              <div class="step-num">4</div>
              <div class="step-body">
                <div class="step-title">持続可能性を測る視点</div>
                <div class="step-desc">
                  <ul>
                    <li>スケーリング施策の見直しサイクルが定例化されているか</li>
                    <li>スキャフォールディングの棚卸しが定期的に行われているか(第7章参照)</li>
                    <li>チームの燃え尽き(バーンアウト)や離職率など、持続可能性を脅かす兆候をモニタリングしているか</li>
                    <li>組織が新しい市場変化やテクノロジー変化に対して、スケーリングの形そのものを進化させられているか</li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>

          <div class="diagram-card">
            <div class="diagram-container">
              <div class="mermaid-wrap">
                <ClientOnly>
                  <MermaidDiagram :chart="DIAGRAM_CONTINUOUS_IMPROVEMENT_LOOP" theme="base" :theme-variables="MERMAID_THEME_VARIABLES" />
                </ClientOnly>
              </div>
            </div>
            <div class="diagram-caption">組織レベルの継続的改善サイクル</div>
          </div>

          <div class="callout practice" data-testid="callout" data-variant="practice">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:bulb" aria-hidden="true" />ベストプラクティス</div>
            <ul>
              <li>組織レベルのレトロスペクティブ(例: 四半期ごとの「スケーリング健全性レビュー」)を定例化する。</li>
              <li>SEU の取得状況を個人任せにせず、チームや組織単位で学習機会への参加を奨励する仕組みを作る。</li>
              <li>スケーリングの「形」自体を固定化せず、市場やテクノロジーの変化に応じて再設計する前提を組織文化として共有する。</li>
              <li>燃え尽きや過度な調整コストなど、持続可能性を損なう兆候を早期に検知するための定性的・定量的な指標を設定する。</li>
            </ul>
          </div>

          <div class="callout source" data-testid="callout" data-variant="source">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:external-link" aria-hidden="true" />ソース</div>
            <ul>
              <li><span class="ref-name">CASP 公式ページ(持続可能な変革・コミュニティへの言及)</span><a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">Scrum Education Units (SEU)</span><a href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
              <li><span class="ref-name">Scrum Alliance メンバーシップの価値</span><a href="https://www.scrumalliance.org/member-benefits" target="_blank" rel="noopener">https://www.scrumalliance.org/member-benefits</a></li>
            </ul>
          </div>
        </section>

        <!-- ===================== 13. Summary & References ===================== -->
        <section id="summary-references">
          <div class="section-eyebrow" data-testid="section-eyebrow"><Icon name="tabler:flag-3" aria-hidden="true" />SECTION 13</div>
          <h2>11. まとめ: フレームワーク比較表と参考文献一覧</h2>

          <h3>CASP の思想を1枚にまとめる</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>観点</th><th>CASP が推奨するスタンス</th></tr></thead>
              <tbody>
                <tr><td>フレームワーク選定</td><td>特定フレームワークへの全面依存を避け、パターンを抽出して組み合わせる(原則主導・パターンベース)</td></tr>
                <tr><td>スケーリングの目的</td><td>チーム数の増加ではなく、戦略実行とゴール達成の手段として位置づける</td></tr>
                <tr><td>複雑性への向き合い方</td><td>本質的複雑性と偶発的複雑性を見分け、必要ならデスケーリングも選択肢に入れる</td></tr>
                <tr><td>組織構造</td><td>機能別サイロを避け、クロスファンクショナル・ストリーム整合を志向する(Team Topologies のパターンを参照)</td></tr>
                <tr><td>変革の進め方</td><td>一時的なスキャフォールディングを活用し、アジャイル自体を変革のプロセスに適用する</td></tr>
                <tr><td>持続可能性</td><td>変革を一度きりのイベントにせず、継続的な検査・適応・学習(SEU)の仕組みに組み込む</td></tr>
              </tbody>
            </table>
          </div>

          <h3>章と学習目標の対応表</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>CASP 公式の学習目標</th><th>対応する章</th></tr></thead>
              <tbody>
                <tr><td>スケーリングの定義を理解する</td><td>第1章</td></tr>
                <tr><td>なぜスケーリングが失敗するのかを知る</td><td>第2章・第3章</td></tr>
                <tr><td>スケーリングの取り組みをエンタープライズ戦略に整合させる</td><td>第8章</td></tr>
                <tr><td>マルチチーム・マルチサイトの製品開発を実現し、持続可能な変革を推進する</td><td>第9章・第10章</td></tr>
                <tr><td>フレームワークの中のパターンを認識する(LeSS/SAFe/Spotify/DAD 等)</td><td>第6章</td></tr>
                <tr><td>スキャフォールディングの活用を探る</td><td>第7章</td></tr>
                <tr><td>フレームワーク非依存・原則主導のマインドセットを身につける</td><td>第4章・第5章</td></tr>
              </tbody>
            </table>
          </div>

          <h3>参考文献・ソース一覧</h3>

          <div class="ref-group">
            <h4>Scrum Alliance 公式ソース(一次情報)</h4>
            <ul class="ref-list">
              <li><span class="ref-name">CASP 公式コースページ</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner</a></li>
              <li><span class="ref-name">"Why Certified Agile Scaling Practitioner Is Not a Framework"(著者: Ahmed Avais)</span><a class="ref-url" href="https://resources.scrumalliance.org/Article/cas-scaling-1-framework" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/cas-scaling-1-framework</a></li>
              <li><span class="ref-name">"Agile Scaling Myths: Beyond Common Misconceptions"(著者: Venkatesh Rajamani)</span><a class="ref-url" href="https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/agile-scaling-myths-common-misconceptions</a></li>
              <li><span class="ref-name">"When to Scale and When Not to Scale"(著者: Adrian Perreau de Pinninck)</span><a class="ref-url" href="https://resources.scrumalliance.org/Article/scale-agile" target="_blank" rel="noopener">https://resources.scrumalliance.org/Article/scale-agile</a></li>
              <li><span class="ref-name">"Why Scaling Agility So Often Fails (And What to Do About It)"(動画)</span><a class="ref-url" href="https://resources.scrumalliance.org/Video/scaling-agility-fails-and-it" target="_blank" rel="noopener">https://resources.scrumalliance.org/Video/scaling-agility-fails-and-it</a></li>
              <li><span class="ref-name">Scrum Alliance LeSS コース案内</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scaling/large-scale-scrum" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scaling/large-scale-scrum</a></li>
              <li><span class="ref-name">Scrum Education Units (SEU) について</span><a class="ref-url" href="https://www.scrumalliance.org/get-certified/scrum-education-units" target="_blank" rel="noopener">https://www.scrumalliance.org/get-certified/scrum-education-units</a></li>
              <li><span class="ref-name">Scrum Alliance メンバーシップの価値</span><a class="ref-url" href="https://www.scrumalliance.org/member-benefits" target="_blank" rel="noopener">https://www.scrumalliance.org/member-benefits</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h4>業界標準のスケーリングフレームワーク(パターン学習の補助ソース)</h4>
            <ul class="ref-list">
              <li><span class="ref-name">Scaled Agile Framework (SAFe) 公式サイト</span><a class="ref-url" href="https://scaledagileframework.com/" target="_blank" rel="noopener">https://scaledagileframework.com/</a></li>
              <li><span class="ref-name">LeSS (Large-Scale Scrum) 公式サイト</span><a class="ref-url" href="https://less.works/" target="_blank" rel="noopener">https://less.works/</a></li>
              <li><span class="ref-name">Scrum@Scale 公式サイト</span><a class="ref-url" href="https://www.scrumatscale.com/" target="_blank" rel="noopener">https://www.scrumatscale.com/</a></li>
              <li><span class="ref-name">Disciplined Agile(PMI)公式ページ</span><a class="ref-url" href="https://www.pmi.org/disciplined-agile" target="_blank" rel="noopener">https://www.pmi.org/disciplined-agile</a></li>
            </ul>
          </div>

          <div class="ref-group">
            <h4>組織設計・チームトポロジー関連</h4>
            <ul class="ref-list">
              <li><span class="ref-name">Team Topologies 公式サイト</span><a class="ref-url" href="https://teamtopologies.com/" target="_blank" rel="noopener">https://teamtopologies.com/</a></li>
              <li><span class="ref-name">コンウェイの法則(Conway's Law)概説(Wikipedia)</span><a class="ref-url" href="https://en.wikipedia.org/wiki/Conway%27s_law" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Conway%27s_law</a></li>
            </ul>
          </div>

          <div class="callout note" data-testid="callout" data-variant="note">
            <div class="callout-title" data-testid="callout-label"><Icon name="tabler:info-circle" aria-hidden="true" />補足</div>
            <p><strong>注記</strong>: CASP の詳細な公式カリキュラム文書("CASP Learning Objectives" PDF)は Google ドライブ上でホストされており、閲覧にサインインが必要なため本ガイド作成時点で内容を直接確認できませんでした。最新の正式なカリキュラム内容については、必ず上記の公式コースページから最新のリンクを確認するか、認定トレーナーが実施する公式コースにご参加ください。</p>
          </div>
        </section>

        <footer>
          本ページは Scrum Alliance の公開情報をもとに独自に作成した非公式の学習補助資料です。CASP・Scrum Alliance・Certified Agile Scaling Practitioner は Scrum Alliance, Inc. に帰属する名称です。SAFe は Scaled Agile, Inc.、LeSS は The LeSS Company、Team Topologies は Team Topologies Ltd.、Disciplined Agile は PMI にそれぞれ帰属する名称・商標です。最新の認定要件は必ず<a href="https://www.scrumalliance.org/get-certified/certified-agile-scaling-practitioner" target="_blank" rel="noopener">Scrum Alliance 公式サイト</a>でご確認ください。
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.casp-page {
  --color-paper: #F6F7F9;
  --color-paper-raised: #FFFFFF;
  --color-paper-sunken: #EEF0F4;
  --color-ink: #161B26;
  --color-ink-soft: #4B5566;
  --color-ink-faint: #8A93A3;
  --color-border: #DFE3EA;
  --color-border-strong: #C7CDD9;
  --color-indigo: #2E3F72;
  --color-indigo-dark: #1F2C57;
  --color-indigo-tint: #EEF1F8;
  --color-gold: #B8802A;
  --color-gold-tint: #FAF1DF;
  --color-forest: #1B6E6A;
  --color-forest-tint: #E7F3F2;
  --color-plum: #8C3A5C;
  --color-plum-tint: #F6EAEF;
  --color-success-bg: #EAF4EC;
  --color-success-text: #2F6B3D;
  --color-success-border: #BFE0C6;
  --color-info-bg: #EEF1F8;
  --color-info-text: #2E3F72;
  --color-info-border: #C7D1EA;
  --font-display: "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --sidebar-width: 288px;

  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
  min-height: 100vh;
}

.layout {
  display: flex;
  min-height: calc(100vh - var(--global-nav-height));
}

.sidebar {
  position: fixed;
  top: var(--global-nav-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--global-nav-height));
  overflow-y: auto;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-border);
  padding: 32px 24px 40px;
  z-index: 20;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.seal { flex: none; width: 36px; height: 36px; }

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

.sidebar-nav { list-style: none; margin: 0; padding: 0; }

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

.sidebar-toggle {
  display: none;
  position: fixed;
  top: calc(var(--global-nav-height) + 16px);
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

.main-content {
  flex: 1;
  min-width: 0;
  margin-left: var(--sidebar-width);
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

.disclaimer-box a {
  color: var(--color-indigo);
  text-decoration: underline;
}

section {
  margin: 72px 0;
}

:is(h2, h3, h4) {
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

.domain-card .domain-name { font-size: 16px; color: var(--color-ink-soft); margin-top: 6px; }

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

table { border-collapse: collapse; width: 100%; font-size: 16px; }

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
.callout-title :deep(svg) {
  font-size: 17px;
  flex: none;
}

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
.step-body .step-desc p { margin: 0 0 12px; }
.step-body .step-desc p:last-child { margin-bottom: 0; }
.step-body .step-desc ul, .step-body .step-desc ol { margin: 8px 0 12px; }
.step-body .step-desc .table-wrap { margin: 12px 0; }

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
    margin-left: 0;
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
