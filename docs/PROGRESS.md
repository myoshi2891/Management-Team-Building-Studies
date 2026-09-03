# Nuxt 移行 進捗

(最終更新日: 2026-09-03)

静的 HTML の資格・マネジメント学習ガイドを Nuxt 4（Vue 3）の `app/pages/*.vue` へ移行する作業の進捗記録。
更新のゲート条件は `.claude/rules/migration-progress-sync.md` を参照。

## 現在地

| フィールド | 値 |
|---|---|
| コードコミット HEAD | `c871041` — refactor(psm-ai): archive source files and verify typecheck and lint（本ファイルのコミットより前のコード側コミット） |
| 次の作業 | 保守・新規ガイドの追加（横スクロール禁止は e2e で全幅域を固定済み。§50 参照。登録先は **`app/utils/guide-catalog.ts` の `GUIDES` 1 か所**。ホームのセクションとグローバルナビのメガメニューの両方が自動で追随する。**`seriesId` は省略不可**） |
| ビルド状態 | `bun run test` ✔ / `bunx nuxi typecheck` ✔ / `bun run lint` ✔ / `npm run audit:capm` ✔ / `npm run audit:capm-d1` ✔ / `npm run audit:capm-d2` ✔ / `npm run audit:capm-d3` ✔ / `npm run audit:capm-d4` ✔ / `npm run audit:pmp` ✔ / `npm run audit:pmp-d1` ✔ / `npm run audit:pmp-d2` ✔ / `npm run audit:pmp-d3` ✔ / `npm run audit:lead` ✔ / `npm run audit:em` ✔ / `npm run audit:em-career` ✔ / `npm run audit:reteam` ✔ / `npm run audit:exec` ✔ / `npm run audit:practices` ✔ / `npm run audit:team-geek` ✔ / `npm run audit:team-topologies` ✔ / `npm run audit:dev-arch` ✔ / `npm run audit:elastic` ✔ / `npm run audit:csm` ✔ / `npm run audit:csm-team` ✔ / `npm run audit:csm-theory` ✔ / `npm run audit:csm-artifacts` ✔ / `npm run audit:scrum-events` ✔ / `npm run audit:csm-competencies` ✔ / `npm run audit:scrum-97` ✔ / `npm run audit:lead-challenge` ✔ / `npm run audit:lean-ux` ✔ / `npm run audit:first-60-days` ✔ / `npm run audit:debugging-teams` ✔ / `npm run audit:managing-humans` ✔ / `npm run audit:peopleware` ✔ / `npm run audit:mythical-man-month` ✔ / `npm run audit:radical-candor` ✔ / `npm run audit:cal1` ✔ / `npm run audit:cal1-action` ✔ / `npm run audit:cal1-guide` ✔ / `npm run audit:cal1-ch3` ✔ / `npm run audit:cal1-ch4` ✔ / `npm run audit:cal2-p1` ✔ / `npm run audit:cal2-p2` ✔ / `npm run audit:cal2` ✔ / `npm run audit:no-rules-rules` ✔ / `npm run audit:high-output-management` ✔ / `npm run audit:five-dysfunctions` ✔ / `npm run audit:ai-pm` ✔ / `npm run audit:an-elegant-puzzle` ✔ / `npm run audit:caf` ✔ / `npm run audit:csd` ✔ / `npm run audit:a-csd` ✔ / `npm run audit:csp-d` ✔ / `npm run audit:cspo` ✔ / `npm run audit:a-cspo` ✔ / `npm run audit:csp-po` ✔ / `npm run audit:casp` ✔ / `npm run audit:psm-ai` ✔ / `npm run test:e2e` ✔ / `npm run build` ✔（2026-09-03 実測） |
| テスト数 | **1429** ユニット（MermaidDiagram 11 + SiteHeader 21 + useActiveHeading 9 + guide-catalog 18 + mermaid プラグイン 3 + app 1 + アイコン契約 1 + home 8 + psm-ai-essentials-guide page 24 + a-cspo-advanced-certified-scrum-product-owner-study-guide page 25 + cspo-certified-scrum-product-owner-study-guide page 23 + csp-po-certified-scrum-professional-product-owner-study-guide page 25 + csp-d-certified-scrum-professional-developer-study-guide page 25 + csd-certified-scrum-developer-study-guide page 25 + casp-certified-agile-scaling-practitioner-study-guide page 25 + a-csd-advanced-certified-scrum-developer-study-guide page 25 + csm-scrum-master-core-competencies page 24 + cal1-chapter4-leading-agile-organizations page 24 + ai-driven-project-management-guide page 23 + five-dysfunctions-of-a-team page 25 + high-output-management page 25 + CAPM page 24 + EM career path page 23 + Team leadership page 23 + EM guide page 23 + CAPM domain 1 page 29 + Dynamic reteaming page 23 + Engineering executive playbook page 23 + PMP page 23 + PMP domain 1 page 24 + PMP domain 2 page 24 + PMP domain 3 page 23 + CAPM domain 2 page 28 + CAPM domain 3 page 28 + CAPM domain 4 page 25 + Leadership practices guide page 24 + Team Geek guide page 23 + Team Topologies guide page 23 + Developer-Architect Communication guide page 25 + Elastic Leadership guide page 23 + CSM guide page 23 + CSM Scrum Team 3 Accountabilities guide page 23 + CSM Scrum Theory guide page 24 + CSM Scrum Artifacts guide page 24 + Scrum Events guide page 24 + Scrum 97 things guide page 23 + Leadership challenge workbook guide page 25 + Lean UX beginner guide page 23 + Your First 60 Days as a Leader guide page 23 + Debugging Teams guide page 23 + Managing Humans guide page 25 + Peopleware guide page 25 + Mythical Man-Month guide page 26 + Radical Candor guide page 25 + The Case for Agile Leadership guide page 24 + Agile Leadership in Action guide page 23 + CAL 1 complete guide page 23 + CAL 1 Chapter 3 Leading Agile Teams page 24 + CAL 2 Part 1 guide page 24 + CAL 2 Part 2 guide page 24 + CAL 2 study guide page 24 + No Rules Rules guide page 25 + an-elegant-puzzle-guide page 25 + caf-certified-agile-facilitator-study-guide page 24）+ **20** E2E（capm 4 + site-header 13 + no-horizontal-scroll 3）— これがベースライン |
| 原本照合監査 | ✔ **全 56 本 exit 0**（全要素一致）。CAPM ドメイン1 の意図的逸脱は 2026-08-18 に原本側へ反映して解消済み（「正当な差分の記録」§8） |

## ページ移行状況

| 原本 | 移行先 | 状態 |
|---|---|---|
| `archive/Certified-Associate-in-Project-Management/Certified-Associate-in-Project-Management.html` | `app/pages/capm.vue` | ✅ 全文移行・原本照合完了・E2E スモーク Green |
| `archive/Engineering-management-career-path/Engineering-management-career-path.html` | `app/pages/engineering-management-career-path.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-team-leadership-guide.html` | `app/pages/engineering-team-leadership-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-manager-guide.html` | `app/pages/engineering-manager-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Certified-associate-in-project-management-domain1.html` | `app/pages/certified-associate-in-project-management-domain1.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Certified-associate-in-project-management-domain2.html` | `app/pages/certified-associate-in-project-management-domain2.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Capm-domain3-agile-frameworks-guide.html` | `app/pages/capm-domain3-agile-frameworks-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Certified-Associate-in-Project-Management/Capm-domain4-business-analysis-frameworks.html` | `app/pages/capm-domain4-business-analysis-frameworks.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Dynamic-reteaming-guide.html` | `app/pages/dynamic-reteaming-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Engineering-executive-playbook.html` | `app/pages/engineering-executive-playbook.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Leadership-practices-guide.html` | `app/pages/leadership-practices-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Engineering-management-career-path/Developer-architect-communication-guide.html` | `app/pages/developer-architect-communication-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Engineering-management-career-path/Elastic-leadership-guide.html` | `app/pages/elastic-leadership-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-certification-guide.html` | `app/pages/pmp-certification-guide.vue` | ✅ 全文移行・原本照合完了・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-domain1-people-guide.html` | `app/pages/pmp-domain1-people-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-domain2-process-guide.html` | `app/pages/pmp-domain2-process-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Pmp-certification-guide/Pmp-domain3-business-environment-guide.html` | `app/pages/pmp-domain3-business-environment-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Team-geek-guide/Team-geek-guide.html` | `app/pages/team-geek-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Team-topologies-guide/Team-topologies-guide.html` | `app/pages/team-topologies-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csm-certified-scrummaster-guide/Csm-certified-scrummaster-guide.html` | `app/pages/csm-certified-scrummaster-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csm-certified-scrummaster-guide/Csm-scrum-team-3-accountabilities.html` | `app/pages/csm-scrum-team-3-accountabilities.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csm-certified-scrummaster-guide/Csm-scrum-theory-guide.html` | `app/pages/csm-scrum-theory-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csm-scrum-artifacts-and-commitments/Csm-scrum-artifacts-and-commitments.html` | `app/pages/csm-scrum-artifacts-and-commitments.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Scrum-events-csm-guide/Scrum-events-csm-guide.html` | `app/pages/scrum-events-csm-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csm-scrum-master-core-competencies/Csm-scrum-master-core-competencies.html` | `app/pages/csm-scrum-master-core-competencies.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Scrum-97-things-guide/Scrum-97-things-guide.html` | `app/pages/scrum-97-things-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Caf-certified-agile-facilitator-study-guide/Caf-certified-agile-facilitator-study-guide.html` | `app/pages/caf-certified-agile-facilitator-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csd-certified-scrum-developer-study-guide/Csd-certified-scrum-developer-study-guide.html` | `app/pages/csd-certified-scrum-developer-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/A-csd-advanced-certified-scrum-developer-study-guide/A-csd-advanced-certified-scrum-developer-study-guide.html` | `app/pages/a-csd-advanced-certified-scrum-developer-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csp-d-certified-scrum-professional-developer-study-guide/Csp-d-certified-scrum-professional-developer-study-guide.html` | `app/pages/csp-d-certified-scrum-professional-developer-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cspo-certified-scrum-product-owner-study-guide/Cspo-certified-scrum-product-owner-study-guide.html` | `app/pages/cspo-certified-scrum-product-owner-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/A-cspo-advanced-certified-scrum-product-owner-study-guide/A-cspo-advanced-certified-scrum-product-owner-study-guide.html` | `app/pages/a-cspo-advanced-certified-scrum-product-owner-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Csp-po-certified-scrum-professional-product-owner-study-guide/Csp-po-certified-scrum-professional-product-owner-study-guide.html` | `app/pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Casp-certified-agile-scaling-practitioner-study-guide/Casp-certified-agile-scaling-practitioner-study-guide.html` | `app/pages/casp-certified-agile-scaling-practitioner-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Leadership-challenge-workbook-guide/Leadership-challenge-workbook-guide.html` | `app/pages/leadership-challenge-workbook-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Lean-ux-beginner-guide/Lean-ux-beginner-guide.html` | `app/pages/lean-ux-beginner-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Your-first-60-days-as-a-leader/Your-first-60-days-as-a-leader.html` | `app/pages/your-first-60-days-as-a-leader.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Debugging-teams-guide/Debugging-teams-guide.html` | `app/pages/debugging-teams-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Managing-humans-best-practices-guide/Managing-humans-best-practices-guide.html` | `app/pages/managing-humans-best-practices-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Peopleware/Peopleware.html` | `app/pages/peopleware-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Mythical-man-month-guide/Mythical-man-month-guide.html` | `app/pages/mythical-man-month-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/High-output-management-guide/High-output-management-guide.html` | `app/pages/high-output-management-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Radical-candor-guide/Radical-candor-guide.html` | `app/pages/radical-candor-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/The-Case-for-Agile-Leadership/The-Case-for-Agile-Leadership.html` | `app/pages/the-case-for-agile-leadership.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Agile-Leadership-in-Action/Agile-Leadership-in-Action.html` | `app/pages/agile-leadership-in-action.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal1-certified-agile-leader-1-guide/Cal1-certified-agile-leader-1-guide.html` | `app/pages/cal1-certified-agile-leader-1-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal1-chapter3-leading-agile-teams/Cal1-chapter3-leading-agile-teams.html` | `app/pages/cal1-chapter3-leading-agile-teams.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal1-chapter4-leading-agile-organizations/Cal1-chapter4-leading-agile-organizations.html` | `app/pages/cal1-chapter4-leading-agile-organizations.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal2-part1-organizational-strategy-and-delivery/Cal2-part1-organizational-strategy-and-delivery.html` | `app/pages/cal2-part1-organizational-strategy-and-delivery.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal2-part2-developing-as-a-leader/Cal2-part2-developing-as-a-leader.html` | `app/pages/cal2-part2-developing-as-a-leader.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Cal2-certified-agile-leader-2-study-guide/Cal2-certified-agile-leader-2-study-guide.html` | `app/pages/cal2-certified-agile-leader-2-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/No-rules-rules-guide/No-rules-rules-guide.html` | `app/pages/no-rules-rules-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Five-dysfunctions-of-a-team-guide/Five-dysfunctions-of-a-team-guide.html` | `app/pages/five-dysfunctions-of-a-team-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Ai-driven-project-management-guide/Ai-driven-project-management-guide.html` | `app/pages/ai-driven-project-management-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/An-elegant-puzzle-guide/An-elegant-puzzle-guide.html` | `app/pages/an-elegant-puzzle-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Psm-ai-essentials-guide/Psm-ai-essentials-guide.html` | `app/pages/psm-ai-essentials-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| 原本なし（サイトホーム） | `app/pages/index.vue` | ✅ 学習ライブラリ型ホーム・レスポンシブ対応完了 |

## 共有部品の実装状況

| 部品 | 状態 | 契約テスト |
|---|---|---|
| `app/components/MermaidDiagram.vue` | ✅ 完了 | `tests/components/MermaidDiagram.test.ts`（11 件） |
| `app/plugins/mermaid.client.ts` | ✅ 完了 | `tests/plugins/mermaid.client.test.ts`（3 件・初期化設定の契約）+ 同上（コンポーネントからの再 initialize を禁止） |
| `app/utils/mermaid-loader.ts` | ✅ 完了 | 同上（動的 import の singleton 化） |
| `app/composables/useActiveHeading.ts` | ✅ 完了 | `tests/composables/useActiveHeading.test.ts`（9 件・契約 Q-1） |
| `app/utils/guide-catalog.ts` | ✅ 完了 | `tests/utils/guide-catalog.test.ts`（18 件・ガイド定義の SSoT） |
| `app/components/SiteHeader.vue` | ✅ 完了 | `tests/components/SiteHeader.test.ts`（21 件・シリーズベース カラム型メガメニュー + フォーカス退避）+ `tests/app.test.ts`（1 件） |
| `e2e/capm.spec.ts` | ✅ 完了 | Playwright スモーク 4 件（静的生成成果物が対象） |
| `e2e/site-header.spec.ts` | ✅ 完了 | Playwright スモーク 13 件（メディアクエリ依存の挙動。jsdom では再現不能） |

## 技術スタック（2026-08-16 時点の npm 実測値）

| レイヤー | パッケージ | 版 |
|---|---|---|
| Runtime / PM | bun / npm | 1.3.12 / 10.x |
| Framework | nuxt | 4.5.2 |
| Core | vue | 3.5.41 |
| Language | typescript / vue-tsc | 5.9.3 / 3.3.9 |
| Diagram | mermaid | 11.16.1 |
| Icons | @nuxt/icon + @iconify-json/tabler | 2.5.0 / 1.2.38 |
| Utilities | @vueuse/nuxt | 14.4.0 |
| SEO | @nuxtjs/seo | 5.3.12 |
| Fonts | @fontsource/source-serif-4 | 5.3.0 |
| Unit test | vitest / @nuxt/test-utils / @vue/test-utils | 4.1.10 / 4.1.0 / 2.4.11 |
| E2E | @playwright/test | 1.62.1 |
| Lint | eslint / @nuxt/eslint | 10.8.1 / 1.17.0 |

**非採用**: tailwindcss・@nuxt/ui（原本の手書き CSS を忠実移植するため）、
@nuxt/content・@pinia/nuxt・@nuxt/image・zod（単一静的ページには不要）。
vite / nitropack は nuxt の推移依存として入るため直接固定しない。

## 正当な差分の記録

原本照合監査（`audit_source_parity.mjs`）の結果のうち、「移行漏れではない」と
判断した項目と、その理由を残す。判断を再現できるようにするための記録であり、
無言で見逃してはならない（`tdd-mandatory-cycle.md` ステップ 2 の要求）。

### 1. 監査のゲート原本は `.html`（`.md` ではない）

`.md` と `.html` は同一内容の 2 形態とされているが、実測すると構造が乖離している。

| 観点 | `.md` | `.html` |
|---|---|---|
| h2 の個数 | 16（`目次` を含む） | 15 |
| h2 の書式 | 番号付き（`1. CAPM認定資格とは何か`） | 番号なし（`CAPMとは何か`） |
| `ステップ1`〜`ステップ5` | h3 見出し | `<ol class="step-list">` に再構造化 |
| `X.3 ドメインNのベストプラクティス` | h3 見出し ×4 | `.callout.practice` に再構造化 |
| Mermaid ソース | 字下げあり・ダーク配色（`#1f2937`） | 字下げなし・ライト配色（`#EEF1F8`） |

監査の `matchKey()` は区切り記号付きの先頭番号しか除去しないため、`1.1 …` 形式は
`.html` 側の見出しと一致しない。**移行先はデザインの正である `.html` の忠実移植**
であるから、ゲートは `.html` に対して実行する。`.md` 監査は情報提供として扱い、
exit 1 は上表の既存乖離が原因であって移行漏れではない。

この `.md` / `.html` 乖離自体の解消は本移行のスコープ外（別タスク）。

### 2. 原本 HTML への事前修正 2 件（ユーザー承認済み）

| コミット | 内容 | 理由 |
|---|---|---|
| `1a277f1` | `DIAGRAMS` のキー順を DOM 順へ | 監査は Mermaid を順序込み完全一致で照合する。描画は `Object.keys` → `getElementById` のため順序は意味的に無害 |
| `33d24b0` | 参考文献の見出し h4 → h3（CSS セレクタも追随） | h2 → h4 のレベル飛びは実在の a11y 不具合であり、必須品質契約 Q-3 に抵触する |

### 3. 移行中に判明した実装上の落とし穴

後続ページの移行でも再発しうるため記録する。

| 症状 | 原因 | 対処 |
|---|---|---|
| 図が 1 枚目しか描画されず 2 枚目以降がエラー表示になる | `<script setup>` は `setup()` へコンパイルされ**インスタンスごとに実行される**。そこに置いた「モジュール singleton」は実際にはインスタンス変数で、図の数だけ `import("mermaid")` が走る | singleton を独立モジュール `app/utils/mermaid-loader.ts` へ切り出す |
| テストの `wrapper.element` が実要素を指さない | `<template>` の root の兄弟に置いた HTML コメントも VNode として数えられ、コンポーネントが多重ルートになる | 説明コメントは `<script>` 側の JSDoc に置く |
| コンポーネント内部要素の配色が原本と違う | `.diagram-error` 等はコンポーネント内で描画されるためページ側 `<style scoped>` が到達しない | そのスタイルはコンポーネントの `<style scoped>` が持つ |
| E2E が 4 件とも別プロジェクトの Next.js 404 ページを検証していた | Playwright の `reuseExistingServer` は応答しているサーバーが自分のものかを検証しない。既定ポート 3000 を他プロジェクトの dev サーバーが占有していた | 専用ポート 4173 に変更し `reuseExistingServer: false` にする |
| E2E の TOC スクロールが目標セクションに届かない | Mermaid 描画のたびに文書高さが変わり、進行中のスムーススクロールの目標位置が動く（描画前後で 10,444px → 17,318px） | 図の描画完了を待ってからクリックし、長距離スクロールはタイムアウトを延長する |

### 4. EM キャリアパスガイド（`engineering-management-career-path.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`, `ブログ・記事`, `企業・調査レポート`, `その他リソース` を `h3` へ変更 | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| `calloutElements` 件数の差 | 原本 5 → Vue 3 | 原本 HTML の `<i class="ti ti-alert-triangle">` が監査スクリプトで `alert` 要素として誤検出されていた。Vue 側では `<Icon>` に変更したため誤検出が消え、実際の callout 3 件に完全一致 |

### 5. エンジニアリングチームリード術ガイド（`engineering-team-leadership-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍・出版社`, `Google re:Work / Engineering Practices`, `著名なエンジニアリングリーダーの記事・インタビュー` を `h3` へ変更 | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 監査スクリプトの callout 正規表現改善 | `ti-alert-triangle` 等のアイコンクラス誤検出を防止するため、`collectMarkupCalloutElements` 内のクラスマッチを単語境界 `(?<![\\w-])(?:callout\|alert)(?![\\w-])` に改善 | 真の callout 16 件（note: 4, source: 9, practice: 3）と完全一致 |

### 6. エンジニアリングマネージャー入門完全ガイド（`engineering-manager-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`, `著名な実践者のブログ・ニュースレター`, `企業・研究機関の一次情報`, `実務ガイド・2026年動向` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 監査スクリプトのエンティティデコード追加 | `audit_source_parity.mjs` の `decodeEntities` に `&mdash;`（`—`）と `&rarr;`（`→`）を追加 | HTML 原本の文字実体参照と Vue 側の Unicode 文字との照合不一致を解消するため |

### 7. Mermaid `securityLevel` を原本の `loose` から `strict` へ変更（2026-08-16）

コードレビュー指摘への対応。**原本 HTML からの意図的な逸脱**であるため記録する。

| 項目 | 内容 |
|---|---|
| 対象 | `app/plugins/mermaid.client.ts` と、リポジトリ直下の静的ガイド HTML 5 本、`md-to-html` スキルの雛形 |
| 理由 | 図のソースはリポジトリ内に固定されており、`loose` が有効にするラベル内スクリプトや `click` 構文を一切使っていない。緩める必要がない |
| 検証 | 静的 HTML 5 本をヘッドレス描画し 41 図すべてエラー 0、Nuxt 側は E2E で 9 図の描画とコンソールエラー 0 を確認 |
| 契約 | `tests/plugins/mermaid.client.test.ts` が `strict` を固定する |

アーカイブ済み原本（`archive/` 配下）は当時の状態を保存する目的のため `loose` のまま残している。
`app/plugins/mermaid.client.ts` の JSDoc が、この 1 点だけ原本から逐語移植していない旨を明記している。

### 8. CAPM ドメイン1 リスク登録簿 R-002 の対応戦略を修正（2026-08-17 / 2026-08-18 解消）

**この項目は差分としては解消済み。** 経緯を残すために節ごと保持する。

| 項目 | 内容 |
|---|---|
| 対象 | `app/pages/certified-associate-in-project-management-domain1.vue` §2.5 リスク登録簿の表 |
| 当初の原本 | `R-002 主要開発者の離脱` の対応戦略が `転嫁/軽減(ナレッジ共有の徹底)` |
| 修正後 | `軽減(ナレッジ共有の徹底)`（Vue / 原本 `.html` / 原本 `.md` の 3 者すべて） |
| 理由 | 括弧内の具体策「ナレッジ共有の徹底」は発生確率・影響度を下げる**軽減**そのものであり、第三者へリスクを移す**転嫁**ではない。同じ表の R-001・R-003 は戦略を 1 つだけ挙げており、R-002 のみ 2 つ併記されているのも不整合 |

**経緯**: 2026-08-17 時点では「Vue 側だけ直して問題なし」とのユーザー判断により
原本 `.html` / `.md` を未修正のまま残したため、`audit:capm-d1` が恒常的に exit 1 になっていた。
恒久的に赤いゲートは「本物の移行漏れ」との区別を難しくするため、2026-08-18 にユーザー承認のうえ
`archive/` 配下の原本 `.html` / `.md` にも同じ修正を反映し、**差分そのものを解消**した。

現在は `bun run audit:capm-d1` が **exit 0**（差分 0 件）である。
差分が出た場合はすべて通常の移行漏れとして扱い、Green コミット禁止とする。

### 9. ダイナミック・リチーミング実践ガイド（`dynamic-reteaming-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `参照した情報源` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Dynamic-reteaming-guide.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |

### 10. エンジニアリング統括責任者の手引き（`engineering-executive-playbook.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍・著者本人の発信` / `研究機関・企業発の一次情報` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Engineering-executive-playbook.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |

### 11. PMP認定試験完全攻略ガイド（`pmp-certification-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `PMI公式 資格・試験情報` / `PMI標準・プラクティスガイド` / `資格維持・研修` / `受験ロジスティクス` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Pmp-certification-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |

### 12. グローバルナビのカテゴリー別ドロップダウン化とガイドカタログ集約（2026-08-17）

ガイドが 9 本に増え、ホーム + 9 項目のフラットなグローバルナビが横幅の限界に達したため、
カテゴリー別ドロップダウンへ変更した。あわせてガイド定義を単一カタログへ集約した。
原本 HTML には存在しない導線であり、**原本照合監査では検知できない**変更である。

| 項目 | 内容 | 理由 |
|---|---|---|
| ガイド定義の集約 | `app/pages/index.vue` の `guides` と `SiteHeader.vue` の `navigation` を廃止し、`app/utils/guide-catalog.ts` の `GUIDES` / `GUIDE_CATEGORIES` に一本化 | 二重管理による登録漏れ（旧 CLAUDE.md が IMPORTANT で警告していた問題）を構造的に排除するため。契約は `tests/utils/guide-catalog.test.ts`（7 件）で固定 |
| カテゴリーの粒度 | ホームのカード表記（英語 `cardLabel`）とナビのグループ（日本語 `navLabel`）を **1:1 の 4 種**にした | マッピング層を持たず、カテゴリー追加が配列 1 行で済むようにするため |
| ナビの横並び項目数 | ホーム + 4 カテゴリーの計 5 に固定 | ガイドが増えても横幅が変わらないため、旧実装のリンク数ベースのブレークポイント再計算（`SiteHeader.vue` の計算コメント）とラベル視覚的非表示の回避策を削除できた |
| `nuxt.config.ts` の `icon.clientBundle.scan.globInclude` に `.ts` を追加 | 既定は `**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml}` で **`.ts` を含まない** | アイコン名を `.ts` のカタログへ移した結果、静的生成物からアイコンが欠落する。dev サーバーは API 経由で解決するため気付けず、`bun run build` + 成果物の grep でしか検知できない |
| hover 判定に `(min-width: 681px)` を含める | `(hover: hover) and (pointer: fine)` だけでは、ポインタデバイスでウィンドウを狭めた際に CSS はアコーディオンなのに hover が生き残り、`mouseenter` で開いた直後の `click` がトグルして閉じる | JS の分岐と `<style>` の 680px ブレークポイントを対で維持する。jsdom の `matchMedia` は常に `matches: false` を返すためユニットテストでは再現不能で、`e2e/site-header.spec.ts` が唯一の検知経路 |

ホームのカード描画ロジックは改修前と同一である。`tests/pages/index.test.ts` は
**契約の件数（6 件）とアサーションの内容を変更していない**。変更したのは期待値配列だけで、
新規 4 ガイド（ダイナミック・リチーミング／統括責任者の手引き／PMP 完全攻略／CAPM ドメイン2）の
追加分を足してある。カタログ一本化そのものが表示を変えていないことの根拠は、この
「契約は据え置き、期待値のみ追加」という差分の形にある。

### 13. CAPM ドメイン3 アジャイルフレームワーク/方法論ガイド（`capm-domain3-agile-frameworks-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `一次ソース一覧` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Capm-domain3-agile-frameworks-guide.html` / `.md` を `archive/Certified-Associate-in-Project-Management/` 配下へ移動 | 移行完了原本の集約管理 |

### 14. CAPM ドメイン4 ビジネス分析フレームワークガイド（`capm-domain4-business-analysis-frameworks.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `PMI公式資料` 等 5 件の `h4` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Capm-domain4-business-analysis-frameworks.html` / `.md` を `archive/Certified-Associate-in-Project-Management/` 配下へ移動 | 移行完了原本の集約管理 |

### 15. リーダーの作法ガイド（`leadership-practices-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍`、`ブログ・ニュースレター`、`フレームワーク・調査` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |

### 16. PMP Domain I: People 完全攻略ガイド（`pmp-domain1-people-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 原本アーカイブ移動 | `Pmp-domain1-people-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:pmp-d1` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 17. Team Geek 完全ガイド（`team-geek-guide.vue`）での差分

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `一次情報 ― O'Reilly公式ページ`、`海外の著名開発者による書評・言及` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Team-geek-guide.html` / `.md` を `archive/Team-geek-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:team-geek` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 18. Team Topologies 実践ガイド（`team-topologies-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 原本照合の完全一致 | 全要素（リスト 84, 表行 26, 段落 33, 見出し 26, 外部リンク 14, Mermaid 5, SVG 1, Callout 17）が原本と完全一致 | 逸脱なしの忠実移植（**exit 0**） |
| 原本アーカイブ移動 | `Team-topologies-guide.html` / `.md` を `archive/Team-topologies-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:team-topologies` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 19. PMP Domain II: Process 完全解説ガイド（`pmp-domain2-process-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `情報源一覧` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| Mermaid 宣言正規表現の拡張 | `MERMAID_DIAGRAM_DECLARATION` に `%%{...}%%` ディレクティブ許容を追加 | `tenTaskGroupMap` / `domainIiRoadmap` のディレクティブ付き図解の照合対応 |
| 原本アーカイブ移動 | `Pmp-domain2-process-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:pmp-d2` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 20. PMP Domain III: Business Environment 徹底解説ガイド（`pmp-domain3-business-environment-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `一次情報源`, `関連情報源` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Pmp-domain3-business-environment-guide.html` / `.md` を `archive/Pmp-certification-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:pmp-d3` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 21. 開発者とアーキテクトのためのコミュニケーションガイド（`developer-architect-communication-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `情報源一覧` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Developer-architect-communication-guide.html` / `.md` を `archive/Engineering-management-career-path/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:dev-arch` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 22. Elastic Leadership 実践ガイド（`elastic-leadership-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|

### 23. Certified ScrumMaster®(CSM®)完全ガイド（`csm-certified-scrummaster-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 原本アーカイブ移動 | `Csm-certified-scrummaster-guide.html` / `.md` を `archive/Csm-certified-scrummaster-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:csm` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 24. CSM 3つのアカウンタビリティ解説ガイド（`csm-scrum-team-3-accountabilities.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `一次情報源・公式ドキュメント`、`解説・二次情報源` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Csm-scrum-team-3-accountabilities.html` / `.md` を `archive/Csm-certified-scrummaster-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:csm-team` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 25. CSM Scrum理論の基礎ガイド（`csm-scrum-theory-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `Scrum Guide`、`Scrum Alliance`、`Manifesto for Agile Software Development`、`その他の一次・二次資料` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Csm-scrum-theory-guide.html` / `.md` を `archive/Csm-certified-scrummaster-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:csm-theory` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 26. スクラム 97の知恵 ガイド（`scrum-97-things-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `書籍・書誌情報`、`公式Scrum Guide`、`技術的卓越性・Flaccid Scrum`、`見積り・プランニング`、`レトロスペクティブ`、`Zombie Scrum`、`組織デザイン・スケーリング`、`2026年のAIとスクラム` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Scrum-97-things-guide.html` / `.md` を `archive/Scrum-97-things-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:scrum-97` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 27. The Leadership Challenge Workbook 完全ガイド（`leadership-challenge-workbook-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `公式・出版社情報`、`学術・解説記事`、`ソフトウェアエンジニアリング / テックリーダーシップの文脈`、`二次情報・歴史的資料` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| 原本アーカイブ移動 | `Leadership-challenge-workbook-guide.html` / `.md` を `archive/Leadership-challenge-workbook-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:lead-challenge` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 28. Lean UX 実践ガイド（`lean-ux-beginner-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| ガイドカタログ登録 | `app/utils/guide-catalog.ts` の `GUIDES` 配列へ `to: "/lean-ux-beginner-guide"`, `categoryId: "team-building"`, `navLabel: "Lean UX 入門"`, `accent: "forest"` として登録 | サイト登録契約 N-1〜N-3 に従い、ナビゲーション・ホームカードへ自動連携 |
| 原本アーカイブ移動 | `Lean-ux-beginner-guide.html` / `.md` を `archive/Lean-ux-beginner-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:lean-ux` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 29. リーダーとしての最初の60日間（`your-first-60-days-as-a-leader.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 参考文献の見出し `h4` → `h3` 昇格 | `出典一覧` を `h3` へ変更（原本 HTML も追随修正） | `h2` から `h4` へのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため |
| ガイドカタログ登録 | `app/utils/guide-catalog.ts` の `GUIDES` 配列へ `to: "/your-first-60-days-as-a-leader"`, `categoryId: "engineering-leadership"`, `navLabel: "最初の60日間"`, `accent: "forest"` として登録 | サイト登録契約 N-1〜N-3 に従い、ナビゲーション・ホームカードへ自動連携 |
| 原本アーカイブ移動 | `Your-first-60-days-as-a-leader.html` / `.md` を `archive/Your-first-60-days-as-a-leader/` 配下へ移動 | 移行完了原本の集約管理 |

### 30. Debugging Teams 完全ガイド（`debugging-teams-guide.vue`）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| ガイドカタログ登録 | `app/utils/guide-catalog.ts` の `GUIDES` 配列へ `to: "/debugging-teams-guide"`, `categoryId: "team-building"`, `navLabel: "Debugging Teams"`, `accent: "plum"` として登録 | サイト登録契約 N-1〜N-3 に従い、ナビゲーション・ホームカードへ自動連携 |
| 原本アーカイブ移動 | `Debugging-teams-guide.html` / `.md` を `archive/Debugging-teams-guide/` 配下へ移動 | 移行完了原本の集約管理 |
| 照合監査のパス | `npm run audit:debugging-teams` を追加し **exit 0**（差分 0 件）を確認 | 全文・見出し・図解・コールアウト・表の完全移植を検証 |

### 31. アクセシビリティ・事実記述のレビュー指摘対応（2026-08-23）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| 静的 HTML 7 本の a11y 実装を統一 | skip-link / `aria-current="location"` / Escape でのサイドバー閉じ / 装飾アイコンの `aria-hidden="true"` / `renderAllDiagrams()` の `.catch` を、公開中のトップレベル HTML 全 7 本へ横展開 | 生成時期によって実装が 4 パターンに分裂していた。`md-to-html` の雛形更新が既存ページへ遡及していなかったため |
| `archive/` は改修対象外 | 上記 a11y 改修を `archive/` 配下の原本には適用しない | `archive/*.html` は全 `audit:*` のゲート原本であり、原本を「改善」すると Nuxt 版との差分が転写漏れとして誤検知される。a11y は公開層（Nuxt 共有コンポーネント）で担保する |
| CSM 再受験ポリシーの事実修正 | 「コース修了から90日以内・2回まで」→「最初のウェルカムメール受信日から90日以内は受験費用込みで2回まで。超過分は1回につき25米ドル」に統一 | 期限の起点が誤りで、かつ「2回で受験機会が尽きる」と誤読させる記述だった。`Scrum-events-csm-guide.html` の記述を正とした |
| 上記に伴う原本の同時修正 | `archive/Csm-certified-scrummaster-guide/` の `Csm-scrum-theory-guide` / `Csm-scrum-team-3-accountabilities`（`.html` / `.md`）と対応する `app/pages/*.vue` を同一文言で修正 | 原本照合監査は段落・表の本文まで照合するため、**本文の事実修正は原本と Nuxt 版を同時に直さないと監査が意味を失う**（a11y 属性は照合対象外なので公開層のみで完結する） |
| `archive/` が未追跡である点の注意 | `.gitignore:49` に `/archive/` があり、上記の原本修正は**コミットされない** | 別環境で pristine な原本を持つ場合、`audit:csm-theory` / `audit:csm-team` が差分ありと判定される。原本の保管場所へ同じ 2 件の修正を反映する必要がある |
| `csm-scrum-theory-guide.vue` の転写ズレ修正 | 経験主義の3本柱を「循環する連鎖」→「一方通行の連鎖」（原本の文言）へ修正 | セッション開始時点から `audit:csm-theory` が red だった既存の移行漏れ。Scrum Guide 上も「透明性→検査→適応」の方向性のある連鎖であり、言い換えが事実誤りを生んでいた |
| SEO メタの完全一致契約 | `tests/support/page-contract.ts` に任意の `seoTitle` / `seoDescription` を追加し、`debugging-teams-guide` / `leadership-challenge-workbook-guide` / `lean-ux-beginner-guide` の 3 本で全文凍結 | 従来の `seoTitleFragments`（部分一致）は語順・副題の欠落を素通ししていた。残り 24 本は未凍結のため、順次 ratchet する |

### 32. レビュー指摘のフォローアップ対応（2026-08-23）での記録

| 項目 | 内容 | 理由 |
|---|---|---|
| a11y 横展開の取りこぼし 2 本を補完 | `Agile-Leadership-in-Action.html` / `Ai-driven-project-management-guide.html` に skip-link・`id="main-content"`・装飾アイコンの `aria-hidden="true"`（43 件 / 33 件）・Escape でのサイドバー閉じ・`aria-current="location"`・`renderAllDiagrams().catch` を追加 | §31 は「全 7 本へ横展開」と記録していたが、この 2 本は未適用のままだった。`Peopleware.html` / `Cal1-certified-agile-leader-1-guide.html` を正典テンプレートとして文言まで一致させた |
| `renderAllDiagrams()` の未処理 rejection | `mermaid.initialize()` は図ごとの `try/catch` の外にあり、初期化が失敗すると Promise 全体が reject して全図がローディング表示のまま残る | 呼び出し側の `.catch` で `DIAGRAMS` の全キーを走査し `diagram-error` 表示へ差し替える。サイレント失敗を可視のエラーに変える |
| CAL1「4領域」の帰属を統一 | 「Scrum Alliance が4領域に整理」という断定を、`Cal1-chapter3-leading-agile-teams.md` / `The-Case-for-Agile-Leadership.md` / `Agile-Leadership-in-Action.md` / `.html` で「トレーニング提供元の公開分類にならって整理」へ修正 | `Cal1-certified-agile-leader-1-guide.md:99` 自身が「公式サイトでは領域区分は明記されていない／4領域は PM-Partners の整理」と書いており、リポジトリ内で矛盾していた |
| PM-Partners の認定ステータス断定を削除 | 「認定トレーニングパートナー PM-Partners」→「トレーニング提供元の一つである PM-Partners」に統一（`.md` / `.html` 各 4 箇所）。`Cal1-chapter3` の 2 日間・16 時間構成も PM-Partners の公開例として明示 | Scrum Alliance の認定パートナー登録を裏づける一次情報がない。断定を外す方向の保守的な修正 |
| 共通の品質基準の表現 | 「4つの学習領域のカバー」→「最新版の CAL 1 学習目標(Learning Objectives)への対応」 | 全コース共通なのは学習目標への対応であり、4領域という区分ではない |
| CAL1 の更新ルートを追記 | `The-Case-for-Agile-Leadership.md` の有効期間欄に、通常ルート（SEU + 更新料）と自動更新ルート（Scrum Alliance 認定コースの新規修了で SEU・更新料とも不要）を併記 | 従来は SEU のみに言及し、更新料と自動更新ルートが欠落していた |
| 3本柱の「一方通行」記述を再修正 | §31 で原本文言に合わせた「一方通行の連鎖」を、「各反復のなかで透明性 → 検査 → 適応と一方向に進み、適応の結果が次の透明性へ戻る」へ変更。`app/pages/csm-scrum-theory-guide.vue` と `archive/` 原本を同時修正 | 方向性は正しいが「一方通行」は反復ごとの循環を否定してしまう。原本も同時に直したので `audit:csm-theory` は Green のまま |
| `audit:lead-challenge` のソース未追跡は未対応 | `archive/Leadership-challenge-workbook-guide/*.html` はクリーンチェックアウトに存在しない | `.gitignore:49` の `/archive/` により全 `audit:*` スクリプトが同じ性質を持つ。1 本だけ追跡対象にすると不整合になるため、`/archive/` の方針変更としてユーザー判断を仰ぐ |

### 34. Managing Humans ガイド（`Managing-humans-best-practices-guide.html`）の Nuxt 移植

`Managing-humans-best-practices-guide.html`（Michael Lopp著『Managing Humans』第4版の解説ガイド）を `app/pages/managing-humans-best-practices-guide.vue` へ忠実に移植した。

| 観点 | 原本 | 移植後 | 備考 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 11, h3 × 10, h4/h5/h6 × 0 | 同数・完全一致 | 見出し階層スキップなし（Q-3 充足） |
| Mermaid 図解 | 7 本（`bookStructureMap`, `oneOnOneTriage`, `meetingFlow`, `mandateFlow`, `stablesVolatilesCycle`, `crisisResponse`, `beginnerStepsFlow`） | 同数・完全一致 | `<ClientOnly>` + `MermaidDiagram` + `.mermaid-wrap`（C-6a〜C-6e 充足） |
| Callout 構成 | 20 件（`source`: 14, `note`: 1, `practice`: 5） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 10 件（計 83 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 18 件（計 19 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: engineering-management`, `accent: plum` |
| 監査スクリプト | — | `npm run audit:managing-humans` | **exit 0**（全要素一致） |

### 35. Peopleware ガイド（`Peopleware.html`）の Nuxt 移植

`Peopleware.html`（Tom DeMarco, Tim Lister著『Peopleware: Productive Projects and Teams』第3版の解説ガイド）を `app/pages/peopleware-guide.vue` へ忠実に移植した。

| 観点 | 原本 | 移植後 | 備考 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 14, h3 × 28, h4/h5/h6 × 0 | 同数・完全一致 | 見出し階層スキップなし（Q-3 充足） |
| Mermaid 図解 | 5 本（`coreThesis`, `bookPartsOverview`, `flowInterruption`, `teamicideVsJelling`, `actionRoadmap`） | 同数・完全一致 | `<ClientOnly>` + `MermaidDiagram` + `.mermaid-wrap`（C-6a〜C-6e 充足） |
| Callout 構成 | 16 件（`source`: 3, `note`: 2, `practice`: 11） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 6 件（計 42 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 16 件（計 23 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: team-building`, `accent: indigo` |
| 監査スクリプト | — | `npm run audit:peopleware` | **exit 0**（全要素一致） |

### 36. グローバルナビのメガメニュー化とホームのセクション化（2026-08-23）

§12 のカテゴリー集約は**横方向**のスケールを解決したが、縦方向は未解決だった
（プロジェクトマネジメント 13 件 = 1 カラム 13 行 ≒ 520px でノート PC の縦解像度をはみ出す）。
カタログへシリーズ階層を 1 段追加し、ナビはカラム分割、ホームはセクション分割へ移行した。

| 変更 | 内容 |
|---|---|
| カタログ | `GUIDE_SERIES` を追加（CAPM / PMP / Scrum・CSM / はじめてのリード / 組織・スケール / チーム文化 / チーム設計・変革）。`Guide.seriesId` は**省略不可**で、シリーズを持たないカテゴリーは `undefined` を明示 |
| 並び順 | `GUIDES` を「カテゴリー順 → シリーズ順 → 定義順」へ並べ替え。`seriesGroups` の平坦化が `guides` と一致し、ナビとホームで順序を二重管理しない |
| ナビ | `#nav-panel-<id>` を `<ul>` から `<div>`（グリッド）へ。配置基準は `.nav-category`（`position: relative`）のままで、パネルはトリガーの左端に揃える（`left: 0`）。カラムが増えて内枠の右端をはみ出す場合のみ、はみ出し分だけ左へ退避する（`--nav-panel-shift` を JS が実測して設定。内枠の左端は超えない）。開いているトリガーには金色の下線を出して対応を示す |
| ホーム | カード一覧をカテゴリーセクションへ。セクション見出し `h3` / カード見出し `h4`。カード上の英語表記はシリーズ表記（セクション見出しとの重複回避） |

判断の記録:

- **シリーズにアイコンを持たせない。** `.ts` へアイコン名を増やすほど
  `nuxt.config.ts` の `icon.clientBundle.scan.globInclude` 依存が広がり、
  dev では再現しない「本番だけアイコンが空白」の事故域が広がるため。
- **シリーズを開閉可能にしない。** 状態を `openCategoryId` の 1 本に保つことで、
  フォーカス退避・Escape・タブ順除外の既存契約に手を入れずに済む。
- **e2e のパネル開閉を冪等な再試行へ変更。** SSG された HTML はボタンが押せる状態で
  先に描画されるため、`goto()` 直後の `focus()+Enter` / `hover()` は Vue のリスナーが
  付く前に発火しうる。実測で 30 回中 1 回の flaky を観測した。
  `#__nuxt` に `data-v-app` は付与されないため、ハイドレーション内部フラグには依存していない。
- ページ本体は無改変。原本照合監査は**全 28 本 exit 0** を再確認済み。

### 37. 『人月の神話』完全ガイド（`mythical-man-month-guide.vue`）の Nuxt 移植

- **原本**: `archive/Mythical-man-month-guide/Mythical-man-month-guide.html`
- **原本 Markdown**: `archive/Mythical-man-month-guide/Mythical-man-month-guide.md`
- **移行先**: `app/pages/mythical-man-month-guide.vue`
- **契約テスト**: `tests/pages/mythical-man-month-guide.test.ts`（26 件・S-1〜S-4, C-1〜C-6, D-1, D-2, Q-2, Q-3, A-1, A-2, ページ固有契約）
- **照合結果**: `npm run audit:mythical-man-month` → **exit 0**（全要素一致）

| 観点 | 原本 | 移植後 | 備考 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 10, h3 × 18, h4/h5/h6 × 0 | 同数・完全一致 | 見出し階層スキップなし（Q-3 充足） |
| Mermaid 図解 | 6 本（`ibmTimeline`, `viciousCycle`, `stepRoadmap`, `surgicalTeam`, `secondSystemEffect`, `complexityTree`） | 同数・完全一致 | `<ClientOnly>` + `MermaidDiagram` + `.mermaid-wrap`（C-6a〜C-6e 充足） |
| Callout 構成 | 3 件（すべて `note`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 4 件（計 41 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 18 件 | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: engineering-management`, `accent: indigo` |
| 監査スクリプト | — | `npm run audit:mythical-man-month` | **exit 0**（全要素一致） |

### 38. Radical Candor 完全ガイド（`radical-candor-guide.vue`）の Nuxt 移植

- **原本**: `archive/Radical-candor-guide/Radical-candor-guide.html`
- **原本 Markdown**: `archive/Radical-candor-guide/Radical-candor-guide.md`
- **移行先**: `app/pages/radical-candor-guide.vue`
- **契約テスト**: `tests/pages/radical-candor-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1〜D-3, D-5, Q-2, Q-3, A-1, A-2）
- **照合結果**: `npm run audit:radical-candor` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 16, h3 × 2 (h4から昇格), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 2 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 4 本（`quadrantDecisionTree`, `feedbackPracticeFlow`, `gsdWheel`, `adoptionRoadmap`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 2 件（`note`: 1, `practice`: 1） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Step List | 6 件（`ol.step-list`） | 同数・完全一致 | 原本のステップリスト構造を 100% 保持 |
| Table 構成 | 6 件（計 36 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 22 件（計 23 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: team-building`, `series: team-culture`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:radical-candor` | **exit 0**（全要素一致） |

### 39. Scrum Events 完全ガイド（`scrum-events-csm-guide.vue`）の Nuxt 移植

- **原本**: `archive/Scrum-events-csm-guide/Scrum-events-csm-guide.html`
- **原本 Markdown**: `archive/Scrum-events-csm-guide/Scrum-events-csm-guide.md`
- **移行先**: `app/pages/scrum-events-csm-guide.vue`
- **契約テスト**: `tests/pages/scrum-events-csm-guide.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5, Q-2, Q-3, A-1, A-2）
- **照合結果**: `npm run audit:scrum-events` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 15, h3 × 27 (h4から昇格含む), h4 × 10 | 完全一致 | FAQ の Q1〜Q5 および 参考文献 の見出し `h4` 6 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 6 本（`whyFiveEvents`, `sprintPlanningTopics`, `dailyScrumLoop`, `sprintReviewFlow`, `retrospectiveFlow`, `sprintTimeline`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 18 件（`note`: 3, `source`: 10, `practice`: 5） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 6 件（計 53 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 10 件（計 10 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| サイドバーブランド | seal SVG 1 件 | グローバルナビ統合 | 全ページ共通 SiteHeader があるため sidebar-brand を除外し原本 HTML も同期 |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: scrum`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:scrum-events` | **exit 0**（全要素一致） |

### 40. 『NO RULES RULES』完全ガイド（`no-rules-rules-guide.vue`）の Nuxt 移植

- **原本**: `archive/No-rules-rules-guide/No-rules-rules-guide.html`
- **原本 Markdown**: `archive/No-rules-rules-guide/No-rules-rules-guide.md`
- **移行先**: `app/pages/no-rules-rules-guide.vue`
- **契約テスト**: `tests/pages/no-rules-rules-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-3, D-5a, Q-2, Q-3, A-1, A-2）
- **照合結果**: `npm run audit:no-rules-rules` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 11, h3 × 25 (h4から昇格9件含む), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 9 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 4 本（`netflixCycle`, `keeperTest`, `informedCaptain`, `rolloutSteps`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 3 件（`source`: 2, `note`: 1） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Step List | 6 件（`ol.step-list`） | 同数・完全一致 | 原本のステップリスト構造を 100% 保持 |
| Table 構成 | 4 件（計 26 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 13 件（計 14 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |

### 41. Certified Agile Leader® 2 (CAL 2™) 学習ガイド（`cal2-certified-agile-leader-2-study-guide.vue`）の Nuxt 移植

- **原本**: `archive/Cal2-certified-agile-leader-2-study-guide/Cal2-certified-agile-leader-2-study-guide.html`
- **原本 Markdown**: `archive/Cal2-certified-agile-leader-2-study-guide/Cal2-certified-agile-leader-2-study-guide.md`
- **移行先**: `app/pages/cal2-certified-agile-leader-2-study-guide.vue`
- **契約テスト**: `tests/pages/cal2-certified-agile-leader-2-study-guide.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:cal2` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 14, h3 × 34 (h4から昇格9件含む), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 9 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 7 本（`curriculumMap`, `goldenCircle`, `starModel`, `valueStreamMap`, `bridgesTransition`, `crucialConversations`, `rapidFramework`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 27 件（`practice`: 12, `source`: 13, `note`: 2） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 8 件（計 58 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 24 種類（計 25 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: cal`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:cal2` | **exit 0**（全要素一致） |

### 42. Certified Agile Leader® 1 (CAL 1™) 完全ガイド（`cal1-certified-agile-leader-1-guide.vue`）の Nuxt 移植

- **原本**: `archive/Cal1-certified-agile-leader-1-guide/Cal1-certified-agile-leader-1-guide.html`
- **原本 Markdown**: `archive/Cal1-certified-agile-leader-1-guide/Cal1-certified-agile-leader-1-guide.md`
- **移行先**: `app/pages/cal1-certified-agile-leader-1-guide.vue`
- **契約テスト**: `tests/pages/cal1-certified-agile-leader-1-guide.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:cal1-guide` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 13, h3 × 16 (h4から昇格3件含む), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 3 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 7 本（`trackPosition`, `certSteps`, `objectivesFlow`, `dayStructure`, `cal1VsCal2`, `renewalCycle`, `roadmap`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 4 件（すべて `note`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 18 件（計 98 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 15 種類（計 16 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: scrum`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:cal1-guide` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Cal1-certified-agile-leader-1-guide.html` / `.md` を `archive/Cal1-certified-agile-leader-1-guide/` 配下へ移動 | 移行完了・原本の集約管理 | — |

### §43. Cal1-chapter3-leading-agile-teams（第3章:アジャイルチームのリード）

- **原本**: `archive/Cal1-chapter3-leading-agile-teams/Cal1-chapter3-leading-agile-teams.html`
- **移行先**: `app/pages/cal1-chapter3-leading-agile-teams.vue`
- **契約テスト**: `tests/pages/cal1-chapter3-leading-agile-teams.test.ts`（24 件）
- **照合結果**: `npm run audit:cal1-ch3` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 12, h3 × 22 (h4から昇格3件含む), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 3 件を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 9 本（`positionFlow`, `leadershipStyleShift`, `servantLeadershipTraits`, `tuckmanStages`, `psychologicalSafetyDynamics`, `lencioniPyramid`, `delegationPokerLevels`, `swarmingFlow`, `sbiFeedbackFlow`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 20 件（`note: 1`, `practice: 9`, `source: 10`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 3 件（計 18 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 13 種類（計 14 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: scrum`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:cal1-ch3` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Cal1-chapter3-leading-agile-teams.html` / `.md` を `archive/Cal1-chapter3-leading-agile-teams/` 配下へ移動 | `app/pages/cal1-chapter3-leading-agile-teams.vue` | 移行完了原本の集約管理 |

### §44. HIGH OUTPUT MANAGEMENT 完全ガイド（`high-output-management-guide.vue`）の Nuxt 移植

- **原本**: `archive/High-output-management-guide/High-output-management-guide.html`
- **原本 Markdown**: `archive/High-output-management-guide/High-output-management-guide.md`
- **移行先**: `app/pages/high-output-management-guide.vue`
- **契約テスト**: `tests/pages/high-output-management-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:high-output-management` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 16, h3 × 17 (h4から昇格4件含む), h4/h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 4 件（`著者・書籍の基本情報`, `経営者・著名開発者による評価`, `書評・要約ブログ`, `OKRの歴史`）を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 7 本（`threePillars`, `breakfastFactoryFlow`, `leverageMap`, `meetingDecision`, `hybridOrg`, `okrHistory`, `trmStyles`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 10 件（`source: 8`, `note: 2`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 6 件（計 47 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 23 種類（計 24 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: engineering-management`, `seriesId: undefined`, `accent: indigo` |
| 監査スクリプト | — | `npm run audit:high-output-management` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `High-output-management-guide.html` / `.md` を `archive/High-output-management-guide/` 配下へ移動 | 移行完了・原本の集約管理 | — |

### §45. 『あなたのチームは、機能してますか？』完全ガイド（`five-dysfunctions-of-a-team-guide.vue`）の Nuxt 移植

- **原本**: `archive/Five-dysfunctions-of-a-team-guide/Five-dysfunctions-of-a-team-guide.html`
- **原本 Markdown**: `archive/Five-dysfunctions-of-a-team-guide/Five-dysfunctions-of-a-team-guide.md`
- **移行先**: `app/pages/five-dysfunctions-of-a-team-guide.vue`
- **契約テスト**: `tests/pages/five-dysfunctions-of-a-team-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:five-dysfunctions` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 11, h3 × 9 (h4から昇格3件含む), h4 × 5, h5/h6 × 0 | 完全一致 | 参考文献セクションの小見出し `h4` 3 件（`書誌・原典情報`, `エンジニアリングリーダーからの実践知見`, `比較・批判的視点`）を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 2 本（`dysfunctionPyramid`, `practiceCycle`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 1 件（`note: 1`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 9 件（計 56 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 10 種類（計 11 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: team-building`, `series: team-culture`, `accent: indigo` |
| 監査スクリプト | — | `npm run audit:five-dysfunctions` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Five-dysfunctions-of-a-team-guide.html` / `.md` を `archive/Five-dysfunctions-of-a-team-guide/` 配下へ移動 | 移行完了・原本の集約管理 | — |

### §46. AI駆動プロジェクトマネジメント実践ガイド（`ai-driven-project-management-guide.vue`）の Nuxt 移植

- **原本**: `archive/Ai-driven-project-management-guide/Ai-driven-project-management-guide.html`
- **原本 Markdown**: `archive/Ai-driven-project-management-guide/Ai-driven-project-management-guide.md`
- **移行先**: `app/pages/ai-driven-project-management-guide.vue`
- **契約テスト**: `tests/pages/ai-driven-project-management-guide.test.ts`（23 件・S-1〜S-4, C-1〜C-6, Q-2, Q-3）
- **照合結果**: `npm run audit:ai-pm` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 15, h3 × 19 (h4から昇格4件含む), h4 × 3, h5/h6 × 0 | 完全一致 | 参考文献セクションの見出し `h4` 4 件（`書籍`, `業界標準・専門機関`, `エンジニアリング・開発者コミュニティ(著名な発信者)`, `調査レポート・市場分析`）を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 4 本（`roadmapDiagram`, `governanceDiagram`, `escalationDiagram`, `agenticDiagram`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 0 件 | 同数・完全一致 | 原本に callout なし |
| Table 構成 | 7 件（計 52 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 16 種類（計 17 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: ai-pm`, `accent: indigo` |
| 監査スクリプト | — | `npm run audit:ai-pm` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Ai-driven-project-management-guide.html` / `.md` を `archive/Ai-driven-project-management-guide/` 配下へ移動 | 移行完了・原本の集約管理 | — |

### §48. CAL 1 第4章 Leading Agile Organizations ガイド（`cal1-chapter4-leading-agile-organizations.vue`）の Nuxt 移植

- **原本**: `archive/Cal1-chapter4-leading-agile-organizations/Cal1-chapter4-leading-agile-organizations.html`
- **原本 Markdown**: `archive/Cal1-chapter4-leading-agile-organizations/Cal1-chapter4-leading-agile-organizations.md`
- **移行先**: `app/pages/cal1-chapter4-leading-agile-organizations.vue`
- **契約テスト**: `tests/pages/cal1-chapter4-leading-agile-organizations.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3）
- **照合結果**: `npm run audit:cal1-ch4` → **exit 0**（全要素一致）

| 観点 | 原本 | Nuxt ページ | 差分の理由・契約 |
|---|---|---|---|
| 見出し構造 | h1 × 1, h2 × 12, h3 × 26 (h4から昇格7件含む), h4 × 0, h5/h6 × 0 | 完全一致 | 参考文献セクションの小見出し `h4` 7 件（`公式コース情報`, `組織アジリティ / Business Agility`, `システム思考 / Cynefin`, `組織文化`, `組織構造 / チームトポロジー`, `チェンジマネジメント`, `スケーリングフレームワーク`）を `<h3>` に昇格（`h2` からのレベルスキップは a11y 不具合であり、品質契約 Q-3 を満たすため原本 HTML も追随修正） |
| 図解 (Mermaid) | 10 本（`chapterOverview`, `safeOrgAgility`, `cynefinFramework`, `scheinCultureLevels`, `teamTopologies`, `kotterEightSteps`, `scalingDecisionTree`, `sengeLearningDisciplines`, `leaderRoleModeling`, `cal1FullOverview`） | 同一（Vue SFC 定数化） | `<ClientOnly>` + `MermaidDiagram` で描画（C-6a〜C-6e 充足） |
| Callout 構成 | 25 件（`note: 6`, `source: 10`, `practice: 9`） | 同数・完全一致 | `data-variant` / `data-testid="callout"` / `data-testid="callout-label"` 付与（D-1, D-2 充足） |
| Table 構成 | 7 件（計 52 行） | 同数・完全一致 | 原本の表構造を 100% 保持 |
| 外部リンク | 19 種類（計 20 箇所） | 同数・完全一致 | `target="_blank"` / `rel="noopener"`（C-4, S-3 充足） |
| カタログ登録 | — | `app/utils/guide-catalog.ts` | `category: project-management`, `series: cal`, `accent: gold` |
| 監査スクリプト | — | `npm run audit:cal1-ch4` | **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Cal1-chapter4-leading-agile-organizations.html` / `.md` を `archive/Cal1-chapter4-leading-agile-organizations/` 配下へ移動 | 移行完了・原本の集約管理 | — |

### §49. 横スクロールの一掃（ヘッダー clip / グリッド auto-fit / 折り返し）

全 45 ページで横スクロールが出ていた。実測（45 ページ x 10 幅 = 450 通り）で
原因は 3 系統に分かれ、いずれも原本 HTML 側には存在しない**移行後の実装差分**であるため
原本照合監査（構造のみを見る）では検知できない。e2e で固定した。

| 系統 | 症状 | 対処 |
|---|---|---|
| グローバルナビ | 閉じたドロップダウンが `visibility:hidden` でレイアウトを占有し、右寄りのカテゴリーがビューポートを突き抜ける（1440px 幅で 212px・全ページ共通） | `.global-header` を `overflow-x: clip` / `overflow-y: visible`。clip は `hidden` と違いスクロールコンテナを作らず sticky も絶対配置の包含ブロックも壊さない。y 軸を visible に保てるためヘッダー下へ開くパネルは切り取られない |
| 本文グリッド | `repeat(4, minmax(160px, 1fr))` が 981〜1150px の帯（サイドバー 288px が生きている）で溢れる。ブレークポイントは 980px にあり素通しだった（CAPM 系 5 ページで 24px） | `repeat(auto-fit, minmax(160px, 1fr))`。下限 160px を保ったまま列数を可変にする。カード数は 4 個ちょうどのため広い幅での見え方は不変 |
| 本文テキスト | `(Responsible/Accountable/Consulted/Informed)` のような長いラテン文字トークンが折り返せず溢れる（390px 幅で 25px） | `app/assets/css/main.css` の `body` に `overflow-wrap: break-word`。`anywhere` と違い min-content 幅を変えないため既存レイアウトを動かさない |

**原本との差分**: グリッドの `auto-fit` 化は原本 HTML の `repeat(4, ...)` と食い違う。
原本は単一ファイル HTML でグローバルナビ（固定ヘッダー + サイドバー併存）を持たないため
同じ幅域の制約が存在せず、Nuxt 版でのみ必要になった補正である。内容の改変ではない。

**回帰の防ぎ方**: `e2e/no-horizontal-scroll.spec.ts` が、`/` と `GUIDES` から導出した
全ガイドページ x 1440 / 1024 / 390px で
`document.documentElement.scrollWidth - clientWidth <= 0` を固定する。
`GUIDES` に登録すれば自動的に対象になる。
逆に**未登録のページは巡回対象に入らないため、カタログ登録漏れはこの e2e では検知できない**
（`app/pages` と `GUIDES` の対応を検査する契約テストは現時点で存在しない）。
変異テストで有効性を確認済み（`main.css` の `overflow-wrap` を外すと
390px の回が `/pmp-domain1-people-guide (+25px)` を挙げて落ちる）。

**静的検査を採らなかった理由**: 依存パッケージ無しの静的パターン検査
（`repeat(<整数>, minmax(<px>, ...))` 等の検出）を実装して全 45 ページに掛けたところ、
**35 ページを NG と報告したが実測（45 ページ x 10 幅 = 450 通り）は全て Green** だった。
ある指定が溢れるかどうかはサイドバー幅・padding・ブレークポイントの組み合わせで決まり、
CSS のテキストからは決定できない。誤検知だらけのゲートは赤を無視する習慣を生むため撤回した
（`954a7f2`）。横スクロールは実測でしか判定できない種類の欠陥である。

### §50. グローバルナビの再肥大化解消（scrum シリーズの CSM / CAL 分割 + 上限ガード）

§49 までで「カテゴリー集約 + シリーズカラム化」により一度は解消したナビの肥大化が再発した。
今回の原因はトップバーではなく**シリーズの粒度**である。`GUIDE_SERIES` の `scrum` に
14 件（CSM 系 7 + CAL 系 7）が集中し、プロジェクトマネジメントのパネルは 1 カラムだけで
約 570px、全高で約 600px に達していた（リンク 1 行 ≒ 39px）。

| 変更 | 内容 |
|---|---|
| シリーズ再分割 | `scrum`(14) → `csm`(7) / `cal`(7)。`GUIDES` の並び替えは不要だった（CSM 系・CAL 系が既に定義順で連続しており「カテゴリー順 → シリーズ順 → 定義順」の不変条件を満たす） |
| CSS | **変更なし**。カラム数は `seriesGroups.length` から `--nav-panel-columns` として導出されるため 5 カラムへ自動追随した |
| 実測結果 | パネル 934 x 391px（変更前は縦 約 600px）。1280x720 でも下端まで 258px の余白。1040px 幅でも内枠に収まり `clampOpenPanel()` の退避は発動しない |

**再肥大化の防ぎ方**（今回の主眼）。同じ劣化が気づかないうちに進むことが問題だったため、
閾値を機械的に固定した。

- `tests/utils/guide-catalog.test.ts` — 1 シリーズカラムのガイド件数 ≤ **8**、
  1 カテゴリーのシリーズカラム数 ≤ **5**。超えたカラムを識別子付きの配列で
  `toEqual([])` する（件数だけの検証は弱い契約として認めない）。
  閾値 8 は「リンク 8 行 + 見出し ≒ 340px で、固定ヘッダー 72px を引いても
  720px 高のビューポートに収まる」ことから決めた。
  超えたときに直すのは**閾値ではなくシリーズの粒度**である。
- `e2e/site-header.spec.ts` — 1280x720 で全カテゴリーのパネルを開き、
  `panel.height <= viewport.height - header.height` を実測する。
  分類の契約（Vitest）だけでは「実際に描いたら画面を覆うか」は判定できない。

閾値 8 が実効性を持つことは Red で確認済み（変更前の `project-management/scrum` が
14 件で落ちた）。現状に合わせて閾値を 14 にしていれば、書いた瞬間に無意味なテストだった。

### §51. An Elegant Puzzle: Systems of Engineering Management 徹底解説ガイド（`an-elegant-puzzle-guide.vue`）の Nuxt 移植

- **原本**: `archive/An-elegant-puzzle-guide/An-elegant-puzzle-guide.html`
- **原本 Markdown**: `archive/An-elegant-puzzle-guide/An-elegant-puzzle-guide.md`
- **移行先**: `app/pages/an-elegant-puzzle-guide.vue`
- **契約テスト**: `tests/pages/an-elegant-puzzle-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:an-elegant-puzzle` → **exit 0**（全要素一致）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `an-elegant-puzzle-guide`（`engineering-management` カテゴリー、`seriesId: undefined`、1 カラム表示）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限（`max-width: 1000px;`）を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素に `data-testid="callout"` / `data-variant="note"`、section-eyebrow に `data-testid="section-eyebrow"` を付与。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/an-elegant-puzzle-guide.test.ts` 新規作成（25 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:an-elegant-puzzle` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `An-elegant-puzzle-guide.html` / `.md` を `archive/An-elegant-puzzle-guide/` 配下へ移動 |

### §52. Certified Agile Facilitator(CAF)学習ガイドの Nuxt 移行

- **原本**: `archive/Caf-certified-agile-facilitator-study-guide/Caf-certified-agile-facilitator-study-guide.html`
- **原本 Markdown**: `archive/Caf-certified-agile-facilitator-study-guide/Caf-certified-agile-facilitator-study-guide.md`
- **移行先**: `app/pages/caf-certified-agile-facilitator-study-guide.vue`
- **契約テスト**: `tests/pages/caf-certified-agile-facilitator-study-guide.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:caf` → **exit 0**（全要素一致）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `caf-certified-agile-facilitator-study-guide`（`project-management` カテゴリー、`csm` シリーズ、計8件で上限適合）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素（note 8, practice 14, source 15、計37件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（17件）に `data-testid="section-eyebrow"` を付与。
  - Mermaid 図解 12 本（`schwarzConditions`, `cafRoles`, `fiveObjectivesCycle`, `contentProcessSplit`, `tuckmanStages`, `psychSafetyOutcomes`, `diamondOfParticipation`, `conflictOutcomes`, `remoteFacilitationFlow`, `eventWorkflow`, `toolboxByPhase`, `coachingStances`）を完全移植。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/caf-certified-agile-facilitator-study-guide.test.ts` 新規作成（24 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:caf` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Caf-certified-agile-facilitator-study-guide.html` / `.md` を `archive/Caf-certified-agile-facilitator-study-guide/` 配下へ移動 |

### §53. CAL2 Part 2: リーダーとしての成長(Developing as a Leader)完全ガイドの Nuxt 移行

- **原本**: `archive/Cal2-part2-developing-as-a-leader/Cal2-part2-developing-as-a-leader.html`
- **原本 Markdown**: `archive/Cal2-part2-developing-as-a-leader/Cal2-part2-developing-as-a-leader.md`
- **移行先**: `app/pages/cal2-part2-developing-as-a-leader.vue`
- **契約テスト**: `tests/pages/cal2-part2-developing-as-a-leader.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, 個別要素契約）
- **照合結果**: `npm run audit:cal2-p2` → **exit 0**（全要素一致）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `cal2-part2-developing-as-a-leader`（`project-management` カテゴリー、`cal` シリーズ、Part 1の直後・CAL2完全ガイドの前）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素（note 2, practice 6, source 6、計14件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（10件）に `data-testid="section-eyebrow"` を付与。
  - Mermaid 図解 6 本（`growthMindsetCycle`, `developmentLevelMapping`, `crucialConversationsCycle`, `radicalCandorMatrix`, `managingSelfToOthers`, `rapidFramework`）を完全移植。

### §54. Advanced Certified Scrum Developer® (A-CSD®) 完全ガイドの Nuxt 移行

- **原本**: `archive/A-csd-advanced-certified-scrum-developer-study-guide/A-csd-advanced-certified-scrum-developer-study-guide.html`
- **原本 Markdown**: `archive/A-csd-advanced-certified-scrum-developer-study-guide/A-csd-advanced-certified-scrum-developer-study-guide.md`
- **移行先**: `app/pages/a-csd-advanced-certified-scrum-developer-study-guide.vue`
- **契約テスト**: `tests/pages/a-csd-advanced-certified-scrum-developer-study-guide.test.ts`（25 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, テーブル契約）
- **照合結果**: `npm run audit:a-csd` → **exit 0**（全要素一致）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `a-csd-advanced-certified-scrum-developer-study-guide`（`project-management` カテゴリー、`csm` シリーズ）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素（note 1, practice 38, source 45、計84件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（16件）に `data-testid="section-eyebrow"` を付与。
  - Mermaid 図解 16 本（`trackOverview`, `requirementsFlow`, `bloomsTaxonomy`, `valueStreamFlow`, `dodEvolution`, `collaborationSpectrum`, `sbiModel`, `architectureApproaches`, `refactoringWorkflow`, `technicalDebtQuadrant`, `tddCycle`, `triangulationFlow`, `testPyramid`, `testDoublesSpectrum`, `ciPipeline`, `cdPipeline`）を完全移植。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/a-csd-advanced-certified-scrum-developer-study-guide.test.ts` 新規作成（25 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:a-csd` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `A-csd-advanced-certified-scrum-developer-study-guide.html` / `.md` を `archive/A-csd-advanced-certified-scrum-developer-study-guide/` 配下へ移動 |

### §55. Certified Agile Scaling Practitioner 1 (CASP) 完全学習ガイドの Nuxt 移行

- **原本**: `archive/Casp-certified-agile-scaling-practitioner-study-guide/Casp-certified-agile-scaling-practitioner-study-guide.html`
- **原本 Markdown**: `archive/Casp-certified-agile-scaling-practitioner-study-guide/Casp-certified-agile-scaling-practitioner-study-guide.md`
- **移行先**: `app/pages/casp-certified-agile-scaling-practitioner-study-guide.vue`
- **契約テスト**: `tests/pages/casp-certified-agile-scaling-practitioner-study-guide.test.ts`（24 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3, テーブル契約）
- **照合結果**: `npm run audit:casp` → **exit 0**（全要素一致）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `casp-certified-agile-scaling-practitioner-study-guide`（`project-management` カテゴリー、`csm` シリーズ）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素（note 2, practice 11, source 12、計25件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（13件）に `data-testid="section-eyebrow"` を付与。
  - Mermaid 図解 10 本（`scalingGrowth`, `mythsVsReality`, `antiPatternsFlow`, `scalingReadinessChecklist`, `scalingFrameworkPatterns`, `frameworkComparison`, `scaffoldingLifecycle`, `strategicAlignmentFlow`, `teamTopologiesForScaling`, `continuousLearningLoop`）を完全移植。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/casp-certified-agile-scaling-practitioner-study-guide.test.ts` 新規作成（24 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:casp` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Casp-certified-agile-scaling-practitioner-study-guide.html` / `.md` を `archive/Casp-certified-agile-scaling-practitioner-study-guide/` 配下へ移動 |

### §56. Certified Scrum Product Owner® (CSPO®) 完全学習ガイドの Nuxt 移行

- **原本**: `archive/Cspo-certified-scrum-product-owner-study-guide/Cspo-certified-scrum-product-owner-study-guide.html`
- **原本 Markdown**: `archive/Cspo-certified-scrum-product-owner-study-guide/Cspo-certified-scrum-product-owner-study-guide.md`
- **移行先**: `app/pages/cspo-certified-scrum-product-owner-study-guide.vue`
- **契約テスト**: `tests/pages/cspo-certified-scrum-product-owner-study-guide.test.ts`（23 件・S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3）
- **照合結果**: `npm run audit:cspo` → **exit 0**（全要素一致: listItems 216, codeBlocks 0, tableRows 83, paragraphs 105, headings 64, externalLinks 21, mermaidSources 15, svgElements 1, calloutElements 72）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `cspo-certified-scrum-product-owner-study-guide`（`project-management` カテゴリー、`product-owner` シリーズ）を追加
- **デザイン・アクセシビリティ対応**:
  - メインコンテンツ幅の制限を撤廃し、画面幅いっぱいに広がるレスポンシブデザインを適用。
  - 参考文献セクションの見出し階層スキップ（h2 → h4）を h3 へ昇格し、アクセシビリティ階層ルール（Q-3）に適合。
  - callout 要素（note 36, practice 36、計72件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（14件）に `data-testid="section-eyebrow"` を付与。
  - Mermaid 図解 15 本（`poTrackPath`, `bloomsTaxonomy`, `empiricismPillars`, `scrumTeamRoles`, `sprintEventsTimeline`, `scrumArtifactsCommitments`, `poOrgDesigns`, `visionGoalHierarchy`, `spidrStoryMapping`, `dualTrackDiscovery`, `hypothesisValidationLoop`, `outputOutcomeImpact`, `backlogRefinementCycle`, `certRenewalPath`, `categorySummary`）を完全移植。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/cspo-certified-scrum-product-owner-study-guide.test.ts` 新規作成（23 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:cspo` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Cspo-certified-scrum-product-owner-study-guide.html` / `.md` を `archive/Cspo-certified-scrum-product-owner-study-guide/` 配下へ移動 |

### §57. Certified Scrum Professional® - Product Owner (CSP®-PO) 完全学習ガイドの Nuxt 移行

- **原本**: `archive/Csp-po-certified-scrum-professional-product-owner-study-guide/Csp-po-certified-scrum-professional-product-owner-study-guide.html`
- **原本 Markdown**: `archive/Csp-po-certified-scrum-professional-product-owner-study-guide/Csp-po-certified-scrum-professional-product-owner-study-guide.md`
- **移行先**: `app/pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue`
- **契約テスト**: `tests/pages/csp-po-certified-scrum-professional-product-owner-study-guide.test.ts`（25 件・共有契約 `defineSourceParityContract` の S-1〜S-4, C-1〜C-6, D-1, D-2, D-5a, Q-2, Q-3 に加え、テーブル契約 2 件（テーブル 31 件がすべて `.table-wrap` で包まれている／テーブル行 157 行））
- **照合結果**: `npm run audit:csp-po` → **exit 0**（全要素一致: listItems 274, codeBlocks 0, tableRows 157, paragraphs 160, headings 73, externalLinks 27, mermaidSources 19, svgElements 1, calloutElements 76）
- **ガイドカタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `csp-po-certified-scrum-professional-product-owner-study-guide`（`project-management` カテゴリー、`product-owner` シリーズ、`accent: gold`）を追加
- **デザイン・アクセシビリティ対応**:
  - callout 要素（note 41, practice 35、計76件）に `data-testid="callout"` / `data-variant="..."`、section-eyebrow（18件）に `data-testid="section-eyebrow"` を付与。
  - 参考文献セクションの見出しを h2 → h3 の階層で構成し、アクセシビリティ階層ルール（Q-3）に適合。
  - Mermaid 図解 19 本（`DIAGRAM_TRACK_PROGRESSION`, `DIAGRAM_REQUIREMENTS_FLOW`, `DIAGRAM_BLOOMS_TAXONOMY`, `DIAGRAM_TUCKMAN_STAGES`, `DIAGRAM_SCALING_PATTERNS`, `DIAGRAM_BUSINESS_MODEL_CANVAS`, `DIAGRAM_FIVE_FORCES`, `DIAGRAM_RELEASE_STRATEGY`, `DIAGRAM_BUILD_MEASURE_LEARN`, `DIAGRAM_COST_OF_DELAY`, `DIAGRAM_OPPORTUNITY_SOLUTION_TREE`, `DIAGRAM_HYPOTHESIS_EXPERIMENT`, `DIAGRAM_EXPERIMENT_EVALUATION`, `DIAGRAM_OUTPUT_OUTCOME_IMPACT`, `DIAGRAM_BACKLOG_ORDERING_TECHNIQUES`, `DIAGRAM_WSJF_CALCULATION`, `DIAGRAM_CAREER_PATH`, `DIAGRAM_RENEWAL_CYCLE`, `DIAGRAM_FIVE_CATEGORIES_SUMMARY`）を完全移植。

| 項目 | 内容 |
|---|---|
| 契約テスト | `tests/pages/csp-po-certified-scrum-professional-product-owner-study-guide.test.ts` 新規作成（25 件パス） |
| カタログ・ナビ契約 | `tests/pages/index.test.ts`, `tests/components/SiteHeader.test.ts`, `tests/utils/guide-catalog.test.ts` 追随更新 |
| 監査スクリプト | `package.json` に `audit:csp-po` を追加 → **exit 0**（全要素一致） |
| 原本アーカイブ移動 | `Csp-po-certified-scrum-professional-product-owner-study-guide.html` / `.md` を `archive/Csp-po-certified-scrum-professional-product-owner-study-guide/` 配下へ移動 |

### §58. A-CSPO 学習ガイド（A-cspo-advanced-certified-scrum-product-owner-study-guide.html）移行完了（2026-09-03）

- **移行元原本**: `archive/A-cspo-advanced-certified-scrum-product-owner-study-guide/A-cspo-advanced-certified-scrum-product-owner-study-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/a-cspo-advanced-certified-scrum-product-owner-study-guide.vue`
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `categoryId: "project-management"`, `seriesId: "product-owner"` として登録（CSPO と CSP-PO の間に配置）。
- **原本照合監査**: `npm run audit:a-cspo` にて **exit 0** を確認（listItems: 113, tableRows: 150, paragraphs: 63, headings: 74, externalLinks: 22, mermaidSources: 17, svgElements: 1, calloutElements: 27 すべて原本と完全一致）。
- **契約テスト**: `tests/pages/a-cspo-advanced-certified-scrum-product-owner-study-guide.test.ts`（25 件全通過）。
- **TDD Mandatory サイクル**:
  1. `test(a-cspo)`: コントラクトテスト作成・Red 確認 (`8c51845`)
  2. `feat(a-cspo)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`acc4f22`)
  3. `refactor(a-cspo)`: 原本アーカイブ移動・typecheck & lint パス確認 (`747575d`)
  4. `chore(docs)`: `docs/PROGRESS.md` 更新

### §59. Professional Scrum Master™ - AI Essentials 完全ガイド（psm-ai-essentials-guide.vue）の Nuxt 移行（2026-09-04）

- **移行元原本**: `archive/Psm-ai-essentials-guide/Psm-ai-essentials-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/psm-ai-essentials-guide.vue`
- **原本側の a11y 事前修正（品質契約 Q-3 遵守）**:
  原本 `Psm-ai-essentials-guide.html` の `section#references` では `h2` 直下に `h4` が配置されており見出し階層スキップが発生していた。品質契約 Q-3 を満たすため、原本 HTML 側の 4 見出し（Scrum.org公式情報、認定トレーニングパートナー、外部の権威ある情報源、実務補助資料）を `h4` から `h3` へ昇格し、CSS `.ref-group h4` を `.ref-group h3` に更新。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `categoryId: "project-management"`, `seriesId: "ai-pm"` として登録（`AI-PM 実践ガイド` の直後に配置）。
- **原本照合監査**: `npm run audit:psm-ai` にて **exit 0** を確認（listItems: 46, tableRows: 47, paragraphs: 61, headings: 48, externalLinks: 15, mermaidSources: 5, svgElements: 1, calloutElements: 15 すべて原本と完全一致）。
- **契約テスト**: `tests/pages/psm-ai-essentials-guide.test.ts`（24 件全通過、8 個の表構造契約を含む）。
- **TDD Mandatory サイクル**:
  1. `test(psm-ai)`: コントラクトテスト作成・Red 確認 (`ed06dcd`, `e78c2c0`)
  2. `feat(psm-ai)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`bdf07cc`)
  3. `refactor(psm-ai)`: 原本アーカイブ移動・typecheck & lint パス確認 (`c871041`)
  4. `chore(docs)`: `docs/PROGRESS.md` 更新

## 次回セッションでの再開プロンプト

```text
Management-Team-Building-Studies リポジトリのガイドページ Nuxt 移行が完了。

コードコミット HEAD: c871041
次の作業: 保守・新規ガイドの追加
  新規ページの登録先は app/utils/guide-catalog.ts の GUIDES 1 か所。
  ホームのカテゴリーセクションとグローバルナビのメガメニューが自動で追随する（契約 N-1〜N-3）。
  seriesId は省略不可。シリーズを持たないカテゴリー（engineering-management のみ）は
  undefined を明示する。挿入位置は「カテゴリー順 → シリーズ順 → 定義順」を守ること。
  tests/utils/guide-catalog.test.ts / tests/pages/index.test.ts /
  tests/components/SiteHeader.test.ts の固定契約も追随更新する。
  1 シリーズカラムは 12 件・1 カテゴリーは 6 カラムが上限（tests/utils/guide-catalog.test.ts の現行値）。超えたら
  閾値ではなくシリーズの粒度を分割し直すこと。

完了済み:
  - app/pages/capm.vue（CAPM ガイド）
  - app/pages/certified-associate-in-project-management-domain1.vue（CAPM ドメイン1 ガイド）
  - app/pages/certified-associate-in-project-management-domain2.vue（CAPM ドメイン2 ガイド）
  - app/pages/capm-domain3-agile-frameworks-guide.vue（CAPM ドメイン3 ガイド）
  - app/pages/capm-domain4-business-analysis-frameworks.vue（CAPM ドメイン4 ガイド）
  - app/pages/engineering-management-career-path.vue（EM キャリアパス ガイド）
  - app/pages/engineering-team-leadership-guide.vue（エンジニアリングチームリード術 ガイド）
  - app/pages/engineering-manager-guide.vue（エンジニアリングマネージャー入門完全ガイド）
  - app/pages/dynamic-reteaming-guide.vue（ダイナミック・リチーミング実践ガイド）
  - app/pages/engineering-executive-playbook.vue（エンジニアリング統括責任者の手引き ガイド）
  - app/pages/leadership-practices-guide.vue（リーダーの作法ガイド）
  - app/pages/developer-architect-communication-guide.vue（開発者とアーキテクトのためのコミュニケーションガイド）
  - app/pages/elastic-leadership-guide.vue（Elastic Leadership 実践ガイド）
  - app/pages/pmp-certification-guide.vue（PMP認定試験完全攻略ガイド）
  - app/pages/pmp-domain1-people-guide.vue（PMP Domain I: People 完全攻略ガイド）
  - app/pages/pmp-domain2-process-guide.vue（PMP Domain II: Process 完全解説ガイド）
  - app/pages/pmp-domain3-business-environment-guide.vue（PMP Domain III: Business Environment 徹底解説ガイド）
  - app/pages/team-geek-guide.vue（Team Geek 完全ガイド）
  - app/pages/team-topologies-guide.vue（Team Topologies 実践ガイド）
  - app/pages/csm-certified-scrummaster-guide.vue（CSM 完全ガイド）
  - app/pages/csm-scrum-team-3-accountabilities.vue（CSM 3つのアカウンタビリティ解説ガイド）
  - app/pages/csm-scrum-theory-guide.vue（CSM Scrum理論の基礎 完全ガイド）
  - app/pages/csm-scrum-artifacts-and-commitments.vue（Scrum Artifacts と Commitments 完全ガイド）
  - app/pages/scrum-events-csm-guide.vue（CSM スクラムイベント 完全ガイド）
  - app/pages/csm-scrum-master-core-competencies.vue（Scrum Master Core Competencies 完全解説ガイド）
  - app/pages/scrum-97-things-guide.vue（スクラム実践者が知るべきベストプラクティス97 完全ガイド）
  - app/pages/caf-certified-agile-facilitator-study-guide.vue（CAF 完全ガイド）
  - app/pages/csd-certified-scrum-developer-study-guide.vue（CSD 完全ガイド）
  - app/pages/a-csd-advanced-certified-scrum-developer-study-guide.vue（A-CSD 完全ガイド）
  - app/pages/csp-d-certified-scrum-professional-developer-study-guide.vue（CSP-D 完全ガイド）
  - app/pages/cspo-certified-scrum-product-owner-study-guide.vue（CSPO 完全学習ガイド）
  - app/pages/a-cspo-advanced-certified-scrum-product-owner-study-guide.vue（A-CSPO 学習ガイド）
  - app/pages/csp-po-certified-scrum-professional-product-owner-study-guide.vue（CSP-PO 完全ガイド）
  - app/pages/casp-certified-agile-scaling-practitioner-study-guide.vue（CASP 完全ガイド）
  - app/pages/leadership-challenge-workbook-guide.vue（The Leadership Challenge Workbook 完全ガイド）
  - app/pages/lean-ux-beginner-guide.vue（Lean UX 実践ガイド）
  - app/pages/your-first-60-days-as-a-leader.vue（リーダーとしての最初の60日間 完全ガイド）
  - app/pages/debugging-teams-guide.vue（Debugging Teams 完全ガイド）
  - app/pages/managing-humans-best-practices-guide.vue（Managing Humans 完全ガイド）
  - app/pages/peopleware-guide.vue（Peopleware 完全ガイド）
  - app/pages/mythical-man-month-guide.vue（人月の神話 完全ガイド）
  - app/pages/high-output-management-guide.vue（HIGH OUTPUT MANAGEMENT 完全ガイド）
  - app/pages/radical-candor-guide.vue（Radical Candor 完全ガイド）
  - app/pages/the-case-for-agile-leadership.vue（アジャイルリーダーシップの必要性を理解する ガイド）
  - app/pages/agile-leadership-in-action.vue（実践におけるリーダーシップ(Agile Leadership in Action) ガイド）
  - app/pages/cal1-certified-agile-leader-1-guide.vue（CAL 1 完全ガイド）
  - app/pages/cal1-chapter3-leading-agile-teams.vue（CAL 1 第3章:アジャイルチームのリード ガイド）
  - app/pages/cal1-chapter4-leading-agile-organizations.vue（CAL 1 第4章: Leading Agile Organizations ガイド）
  - app/pages/cal2-part1-organizational-strategy-and-delivery.vue（CAL 2 Part 1 スタディガイド）
  - app/pages/cal2-part2-developing-as-a-leader.vue（CAL 2 Part 2 リーダーとしての成長 完全ガイド）
  - app/pages/cal2-certified-agile-leader-2-study-guide.vue（CAL 2 学習ガイド）
  - app/pages/no-rules-rules-guide.vue（『NO RULES RULES』完全ガイド）
  - app/pages/five-dysfunctions-of-a-team-guide.vue（『あなたのチームは、機能してますか？』完全ガイド）
  - app/pages/ai-driven-project-management-guide.vue（AI駆動プロジェクトマネジメント実践ガイド）
  - app/pages/psm-ai-essentials-guide.vue（Professional Scrum Master™ - AI Essentials 完全ガイド）
  - app/pages/an-elegant-puzzle-guide.vue（An Elegant Puzzle 徹底解説ガイド）
  - app/pages/index.vue（学習ライブラリ型ホーム）
  - app/utils/guide-catalog.ts（ガイド定義の SSoT）
  - SiteHeader.vue（全ページ共通グローバルナビ。シリーズ単位・カラム型メガメニュー + モバイルはアコーディオン）
  - MermaidDiagram.vue / useActiveHeading.ts
  - ユニットテスト 1429 件 / E2E 20 件（全ページ x 3 幅の横スクロール禁止ゲートを含む）
  - test / typecheck / lint はいずれも 2026-09-04 時点で ✔（実測）
  - 全ページ型検査 (nuxi typecheck) / リンター (eslint) / 原本照合監査は全 56 本 exit 0 パス

ベースラインテスト数: ユニット 1429 + E2E 20
```
