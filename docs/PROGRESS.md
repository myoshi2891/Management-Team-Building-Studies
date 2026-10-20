# Nuxt 移行 進捗

(最終更新日: 2026-10-20)

静的 HTML の資格・マネジメント学習ガイドを Nuxt 4（Vue 3）の `app/pages/*.vue` へ移行する作業の進捗記録。
更新のゲート条件は `.claude/rules/migration-progress-sync.md` を参照。

## 現在地

| フィールド | 値 |
|---|---|
| コードコミット HEAD | `5bb5463` — style(pages): expand main-content to full screen width for ppdv guide（本ファイルより前のコード側コミット） |
| 次の作業 | Netlify 公開（netlify.toml 追加済み。§83）→ 公開見合わせ中8本の改稿 → 保守・新規ガイド追加。PPDV (Professional Product Discovery and Validation) の移行完了（§90）。 |
| ビルド状態 | 2026-10-20: `npm run test` ✔ 2292件全件成功（101ファイル）/ `npm run audit:ppdv` ✔ exit 0 / build・generate・静的生成E2Eはユーザー指定により未実施 / 目視確認はユーザー担当 |
| テスト数 | **2292 passed / 0 failed**（101ファイル）— 最新のユニットテスト基準値。新ページの全文・構造・図解・共通契約24件を含む。 |
| 原本照合監査 | ✔ **83 本中 78 本 exit 0**（全要素一致）。`audit:pal-ebm` / `audit:pspbm` の 2 本は事実正確性の是正による意図的な原本差分のみで exit 1（移行漏れではない。「正当な差分の記録」§74）。`audit:csp-sm` / `audit:psm` / `audit:pspo-ai` の 3 本は既存の転写差分で exit 1（2026-10-17 再実測で判明。§83）。CAPM ドメイン1 の意図的逸脱は 2026-08-18 に原本側へ反映して解消済み（「正当な差分の記録」§8） |

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
| `archive/Csp-sm-certified-scrum-professional-scrummaster-study-guide/Csp-sm-certified-scrum-professional-scrummaster-study-guide.html` | `app/pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/A-csm-advanced-certified-scrummaster-study-guide/A-csm-advanced-certified-scrummaster-study-guide.html` | `app/pages/a-csm-advanced-certified-scrummaster-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
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
| `archive/Professional-Scrum-Developer/Professional-Scrum-Developer.html` | `app/pages/professional-scrum-developer.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Pal-i-study-guide/Pal-i-study-guide.html` | `app/pages/pal-i-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-Facilitation-Skills/Professional-Scrum-Facilitation-Skills.html` | `app/pages/professional-scrum-facilitation-skills.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-Product-Owner/Professional-Scrum-Product-Owner.html` | `app/pages/professional-scrum-product-owner.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-with-Kanban/Professional-Scrum-with-Kanban.html` | `app/pages/professional-scrum-with-kanban.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Scaled-professional-scrum-guide/Scaled-professional-scrum-guide.html` | `app/pages/scaled-professional-scrum-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-with-User-Experience/Professional-Scrum-with-User-Experience.html` | `app/pages/professional-scrum-with-user-experience.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Agile-Leadership-Evidence-Based-Management/Professional-Agile-Leadership-Evidence-Based-Management.html` | `app/pages/professional-agile-leadership-evidence-based-management.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-Master/Professional-Scrum-Master.html` | `app/pages/professional-scrum-master.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-Product-Backlog-Management-Skills/Professional-Scrum-Product-Backlog-Management-Skills.html` | `app/pages/professional-scrum-product-backlog-management-skills.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Scrum-Product-Owner-AI-Essentials/Professional-Scrum-Product-Owner-AI-Essentials.html` | `app/pages/professional-scrum-product-owner-ai-essentials.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Professional-Product-Discovery-and-Validation/Professional-Product-Discovery-and-Validation.html` | `app/pages/professional-product-discovery-and-validation.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-experience-version-5-study-guide/Itil-experience-version-5-study-guide.html` | `app/pages/itil-experience-version-5-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-foundation-v5-study-guide/Itil-foundation-v5-study-guide.html` | `app/pages/itil-foundation-v5-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-managing-professional-transition-v5-guide/Itil-managing-professional-transition-v5-guide.html` | `app/pages/itil-managing-professional-transition-v5-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-product-version5-guide/Itil-product-version5-guide.html` | `app/pages/itil-product-version5-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-service-v5-guide/Itil-service-v5-guide.html` | `app/pages/itil-service-v5-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-strategy-v5-guide/Itil-strategy-v5-guide.html` | `app/pages/itil-strategy-v5-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Itil-transformation-v5-study-guide/Itil-transformation-v5-study-guide.html` | `app/pages/itil-transformation-v5-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Mop-foundation-guide/Mop-foundation-guide.html` | `app/pages/mop-foundation-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Msp-foundation-5th-edition-guide/Msp-foundation-5th-edition-guide.html` | `app/pages/msp-foundation-5th-edition-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Msp-practitioner-5th-edition-guide/Msp-practitioner-5th-edition-guide.html` | `app/pages/msp-practitioner-5th-edition-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Prince2-7-foundation-guide/Prince2-7-foundation-guide.html` | `app/pages/prince2-7-foundation-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green |
| `archive/Prince2-7-practitioner-guide/Prince2-7-practitioner-guide.html` | `app/pages/prince2-7-practitioner-guide.vue` | ✅ 全文移行・承認済み商標訂正・原本照合 exit 0・ページ55契約と表示E2E成功（§87） |
| `archive/Prince2-agile-foundation-version2/Prince2-agile-foundation-version2.html` | `app/pages/prince2-agile-foundation-version2.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green（§88） |
| `archive/Prince2-agile-practitioner-v2-study-guide/Prince2-agile-practitioner-v2-study-guide.html` | `app/pages/prince2-agile-practitioner-v2-study-guide.vue` | ✅ 全文移行・原本照合完了（**exit 0**）・契約テスト Green（§89） |
| 原本なし（サイトホーム） | `app/pages/index.vue` | ✅ 学習ライブラリ型ホーム・レスポンシブ対応完了 |

## 共有部品の実装状況

| 部品 | 状態 | 契約テスト |
|---|---|---|
| `app/components/MermaidDiagram.vue` | ✅ 完了 | `tests/components/MermaidDiagram.test.ts`（11 件） |
| `app/plugins/mermaid.client.ts` | ✅ 完了 | `tests/plugins/mermaid.client.test.ts`（3 件・初期化設定の契約）+ 同上（コンポーネントからの再 initialize を禁止） |
| `app/utils/mermaid-loader.ts` | ✅ 完了 | 同上（動的 import の singleton 化） |
| `app/composables/useActiveHeading.ts` | ✅ 完了 | `tests/composables/useActiveHeading.test.ts`（9 件・契約 Q-1） |
| `app/utils/guide-catalog.ts` | ✅ 完了 | `tests/utils/guide-catalog.test.ts`（24 件・ガイド定義の SSoT。種別 → プログラム → シリーズ → ガイドの 4 階層） |
| `app/utils/guide-search.ts` | ✅ 完了 | `tests/utils/guide-search.test.ts`（10 件・絞り込み仕様の SSoT。DOM 非依存の純関数） |
| `app/components/SiteHeader.vue` | ✅ 完了 | `tests/components/SiteHeader.test.ts`（24 件・ハブリンク方式のパネル + フォーカス退避）+ `tests/app.test.ts`（1 件） |
| `app/components/SiteSearch.vue` | ✅ 完了 | `tests/components/SiteSearch.test.ts`（11 件・開閉 / キーボード操作 / combobox の a11y 紐付け） |
| `app/components/GuideCard.vue` | ✅ 完了 | `tests/components/GuideCard.test.ts`（3 件・ホームとハブで共有するカード） |
| `app/components/GuideKindHub.vue` | ✅ 完了 | `tests/components/GuideKindHub.test.ts`（4 件・種別配下のプログラム一覧） |
| `app/components/GuideProgramHub.vue` | ✅ 完了 | `tests/components/GuideProgramHub.test.ts`（8 件・全ガイドの到達可能性を固定する） |
| `e2e/capm.spec.ts` | ✅ 完了 | Playwright スモーク 4 件（静的生成成果物が対象） |
| `e2e/site-header.spec.ts` | ✅ 完了 | Playwright スモーク 15 件（メディアクエリ依存の挙動 + 検索の実遷移。jsdom では再現不能） |
| `app/components/SiteDisclaimer.vue` | ✅ 完了 | `tests/components/SiteDisclaimer.test.ts`（16 件・掲載文の全文一致 + 固定サイドバーへの実測退避）+ `tests/app.test.ts`（1 件・描画順） |
| `e2e/site-disclaimer.spec.ts` | ✅ 完了 | Playwright スモーク 4 件（固定サイドバーによる遮蔽。溢れではないため no-horizontal-scroll では検知できない） |

## 解決した e2e の赤（2026-09-04）

共通ディスクレーマーの追加時に発見した、それ以前から存在した赤。いずれも解消済み。
判定は `app/app.vue` を `9792578` の内容へ戻して同じ spec を回し、同一の失敗が
再現することを確認したうえで行った。

| 失敗 | 原因 | 対処 |
|---|---|---|
| `no-horizontal-scroll.spec.ts` × 3 幅 | Playwright 既定の 30 秒テストタイムアウト超過。1 テストで全ページを巡回する構造のため所要時間はページ数に比例し、実測は単独 27〜28 秒・並列 55〜57 秒だった | タイムアウトをページ数から導出（`PATHS.length × 5 秒`）。固定値だとガイド追加のたびに静かに越えるため（`189de93`） |
| `site-header.spec.ts:133` パネル高さ | `project-management` のパネルが 683px に達し、1280x720 の残り高さ 648px を超えた。シリーズカラムは横方向にしか肥大を吸収できず、最も高いカラム（csm 13 件）が伸びると高さは減らない | ヘッダー直下からの残り高さで頭打ちにし、超えた分を内部スクロールへ逃がす。モバイルのアコーディオンでは解く（`af8c075` / `84f397d`） |
| `site-header.spec.ts:236` モバイルのタップ | ハイドレーション前のタップがネイティブのクリックとして捨てられ、ナビが開かないまま後続のトリガーが不可視でタイムアウト（実測: 3 回に 1 回） | 最初の 1 タップだけ再試行可能にする。アコーディオン側に掛けると二重発火のバグを覆い隠すため掛けない。反復 5 回 × 13 件で 65/65 パス（`84f397d`） |

## 共通ディスクレーマー（2026-09-04）

`app/components/SiteDisclaimer.vue` を `app/app.vue` に 1 行足して全ページ末尾へ出す。
掲載内容はサイト全体の免責（情報の正確性 / 著作権・商標 / 責任の範囲）と著作権表示。
既存 57 ページの `<footer>`（資格団体ごとの商標表記）は役割が異なるため残す。

- 著作権表示は本コンポーネントへ一本化した。ホームの `site-footer` にもあり
  ホームだけ二重に出ていた（`1bba974`）
- ガイドページのサイドバーは `position: fixed` で左端を覆い続けるため、
  その右端を**実測**して退避する。サイドバーを解除するブレークポイントは
  ページごとに不揃い（980px / 1039px / 960px）で、メディアクエリでは外れるページが出る
- 計測は `ResizeObserver` による購読。マウント時の一度きりの計測は、その瞬間に
  スタイルが確定していないと誤った値を焼き付ける（実測: `readyState` が `loading` の間、
  全体 CSS の `box-sizing` が効かずサイドバー右端が 288px ではなく 336px に見えた）（`99b5e62`）
- 遮蔽は「溢れ」ではないため `no-horizontal-scroll.spec.ts` では検知できない。
  `e2e/site-disclaimer.spec.ts` が実ブラウザで重なりを測る

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
  4. `style(psm-ai)`: 原本 HTML のレイアウト・デザインスタイル（全幅レイアウト、カラーパレット、見出しフォント、Callout・免責ボックスの配色、縞模様テーブル等）を完全一致で適用 (`bee5080`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

### §60. Certified Scrum Professional ScrumMaster (CSP-SM) 完全ガイド（csp-sm-certified-scrum-professional-scrummaster-study-guide.vue）の Nuxt 移行（2026-09-04）

- **移行元原本**: `archive/Csp-sm-certified-scrum-professional-scrummaster-study-guide/Csp-sm-certified-scrum-professional-scrummaster-study-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue`
- **原本側の a11y 事前修正（品質契約 Q-3 遵守）**:
  原本 `Csp-sm-certified-scrum-professional-scrummaster-study-guide.html` の `section#references` では `h2` 直下に `h4` が配置されており見出し階層スキップ（h2 -> h4）が発生していた。品質契約 Q-3 を満たすため、移植先 Vue コンポーネントおよびテストにおいて参考文献の 8 見出し（Scrum Alliance 公式情報源、スクラム・アジャイル基礎文献、コーチング・ファシリテーション文献、組織変革・システム思考、チームダイナミクス・心理的安全性の研究、アジャイルメトリクス・エンジニアリングプラクティス、オンラインリソース・コミュニティ、推薦図書リスト）を `h4` から `h3` へ昇格。`audit_source_parity.mjs` でも h4 -> h3 昇格は正式に許可されており、**exit 0** を達成。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `categoryId: "project-management"`, `seriesId: "csm"` として登録（`CASP 完全ガイド` の直後、`CSPO 完全ガイド` の前に配置）。これに伴い `tests/utils/guide-catalog.test.ts` の `MAX_GUIDES_PER_SERIES_COLUMN` を 12 から 13 に緩和。
- **原本照合監査**: `npm run audit:csp-sm` にて **exit 0** を確認（listItems: 108, tableRows: 130, paragraphs: 79, headings: 69, externalLinks: 33, mermaidSources: 15, svgElements: 1, calloutElements: 33 すべて原本と完全一致）。
- **契約テスト**: `tests/pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.test.ts`（24 件全通過、24 個の表構造契約を含む）。
- **TDD Mandatory サイクル**:
  1. `test(csp-sm)`: コントラクトテスト作成・Red 確認 (`dddcac0`)
  2. `feat(csp-sm)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`81bb02c`)
  3. `refactor(csp-sm)`: 原本アーカイブ移動・typecheck & lint パス確認 (`9792578`)
  4. `chore(docs)`: `docs/PROGRESS.md` 更新

### §61. Advanced Certified ScrumMaster (A-CSM) 完全ガイド（a-csm-advanced-certified-scrummaster-study-guide.vue）の Nuxt 移行（2026-09-05）

- **移行元原本**: `archive/A-csm-advanced-certified-scrummaster-study-guide/A-csm-advanced-certified-scrummaster-study-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/a-csm-advanced-certified-scrummaster-study-guide.vue`
- **原本側の a11y 事前修正（品質契約 Q-3 遵守）**:
  原本 `A-csm-advanced-certified-scrummaster-study-guide.html` の `section#references` では `h2` 直下に `h4` が配置されており見出し階層スキップ（h2 -> h4）が発生していた。品質契約 Q-3 を満たすため、移植先 Vue コンポーネントおよびテストにおいて参考文献の 8 見出し（Scrum Alliance 公式リソース、アジャイルコーチング・ファシリテーション推薦図書、チームダイナミクス・心理的安全性、アジャイルエンジニアリング・プラクティス、組織変革・スケーリング、プロダクトマネジメント・POコラボレーション、オンラインコミュニティ・学習プラットフォーム、継続的学習のための推薦ポッドキャスト）を `h4` から `h3` へ昇格。`audit_source_parity.mjs` でも h4 -> h3 昇格は正式に許可されており、**exit 0** を達成。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `categoryId: "project-management"`, `seriesId: "csm"` として登録（`CSP-SM 完全ガイド` の直後、`CSPO 完全ガイド` の前に配置）。これに伴い `tests/utils/guide-catalog.test.ts` の `MAX_GUIDES_PER_SERIES_COLUMN` を 13 から 14 に更新。
- **原本照合監査**: `npm run audit:a-csm` にて **exit 0** を確認（listItems: 104, tableRows: 219, paragraphs: 132, headings: 75, externalLinks: 28, mermaidSources: 23, svgElements: 1, calloutElements: 79 すべて原本と完全一致）。
- **契約テスト**: `tests/pages/a-csm-advanced-certified-scrummaster-study-guide.test.ts`（25 件全通過。表構造契約は持たず、個別仕様契約はサイドバーのドロワー制御と インライン SVG seal の 2 件）。
- **TDD Mandatory サイクル**:
  1. `test(a-csm)`: コントラクトテスト作成・Red 確認 (`677a5ee`)
  2. `feat(a-csm)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`1c1faa4`)
  3. `refactor(a-csm)`: 原本アーカイブ移動・vue 属性順序修正・audit スクリプト追加・typecheck & lint パス確認 (`dba1905`)
  4. `chore(docs)`: `docs/PROGRESS.md` 更新

### §62. Professional Scrum Developer (PSD I) 認定資格 学習ガイド（professional-scrum-developer.vue）の Nuxt 移行（2026-09-07）

- **移行元原本**: `archive/Professional-Scrum-Developer/Professional-Scrum-Developer.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/professional-scrum-developer.vue`
- **原本側の a11y 事前修正（品質契約 Q-3 遵守）**:
  原本 `Professional-Scrum-Developer.html` の `section#references` では `h2` 直下に `h4` が配置されており見出し階層スキップ（h2 -> h4）が発生していた。品質契約 Q-3 を満たすため、原本 HTML 側の 2 見出し（Scrum.org 公式リソース、その他の一次情報・外部リソース）を `h4` から `h3` へ昇格し、CSS セレクタ `.ref-group h4` を `.ref-group h3` に更新。`audit_source_parity.mjs` でも h4 -> h3 昇格は正式に許可されており、**exit 0** を達成。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDES` に `categoryId: "project-management"`, `seriesId: "csm"` として登録（CSM シリーズ末尾に配置）。これに伴い `tests/utils/guide-catalog.test.ts` の `MAX_GUIDES_PER_SERIES_COLUMN` を 14 から 15 に更新。
- **原本照合監査**: `npm run audit:psd` にて **exit 0** を確認（listItems: 132, tableRows: 52, paragraphs: 57, headings: 44, externalLinks: 15, mermaidSources: 8, svgElements: 1, calloutElements: 36 すべて原本と完全一致）。
- **契約テスト**: `tests/pages/professional-scrum-developer.test.ts`（25 件全通過）。
- **TDD Mandatory サイクル**:
  1. `test(psd)`: コントラクトテスト作成・カタログ登録・Red 確認 (`844b532`)
  2. `feat(psd)`: カテゴリー単位で小刻みに実装・Green 確認 (`5631c0c`, `eece8ae`, `8889d9b`, `841027a`, `eca9413`, `569b17c`, `6f69e89`)
  3. `refactor(psd)`: 原本アーカイブ移動・`package.json` に `audit:psd` スクリプト追加 (`d4cf6d1`)
  4. `style(psd)`: 全角スペースの ESLint 修正 (`b1493db`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

### §63. グローバルナビのハブページ方式への再設計とサイト内検索の追加（2026-09-10）

移行ではなく**情報モデルの再設計**。原本 `.md` / `.html` と既存 59 ページの `.vue` は一切触っていないため、
原本照合監査の結果には影響しない（`npm run audit:capm` exit 0 を確認済み）。

- **背景（実測した破綻）**: ナビはカテゴリー → シリーズ → **全ガイド**を列挙するモデルで、
  項目数がガイド数に比例していた。59 本の時点で `project-management` が
  シリーズカラム 6（上限 6）・`csm` シリーズが 15 件（上限 15）に**同時に張り付き**、
  次の 1 本で契約テストが落ちる状態だった。縦は既に一度破綻しており（パネル高 683px →
  内部スクロールへ退避。§「解決した e2e の赤」参照）、シリーズカラムは横にしか肥大を
  吸収できないため最長カラムが伸びる限り高さは減らない。
- **新しい情報モデル**: カテゴリーを **種別（kind）→ プログラム（program）** の 2 段へ割り、
  種別 → プログラム → シリーズ → ガイドの 4 階層にした。
  **ナビはプログラムまでしか列挙しない**（各プログラムがハブページを 1 枚持つ）。
  これにより増加はすべて `program` より下で吸収され、ナビの項目数がガイド総数から独立する。
  Scrum.org の認定が 11 本増えても変わるのは `scrum-org` ハブの中身だけで、
  ナビに 1 行増えるのは新しい認定団体・書籍テーマが現れたときだけになる。
- **ルートは一切変更していない**。既存 59 ページの URL は不変で、分類 ID の付け替えだけを行った。
- **撤廃／新設した契約**:
  `MAX_GUIDES_PER_SERIES_COLUMN`（15）は撤廃（ナビがガイドを列挙しなくなったため代理指標として無意味）。
  `MAX_SERIES_COLUMNS_PER_CATEGORY`（6）は `MAX_SERIES_PER_PROGRAM`（8）へ置換。
  `MAX_PROGRAMS_PER_KIND`（8）を新設。あわせて「パネル内リンク数 = プログラム数 + 1」を
  `tests/components/SiteHeader.test.ts` が機械的に固定する（ガイド数非依存の証明）。
  全ガイドの到達可能性を保証する役割はナビから `tests/components/GuideProgramHub.test.ts` へ移した。
- **ハブページ**: 種別 3 枚（`/certifications` 等）+ プログラム 10 枚（`/certifications/pmi` 等）。
  種別ディレクトリを切ることで 1 セグメントの既存ガイドルート（`/capm` 等）と構造的に衝突しない
  （1 セグメントの動的ルートは 404 を食い潰すため採らない）。実体は
  `GuideKindHub.vue` / `GuideProgramHub.vue` に置き、ルートファイルは薄いラッパにした。
  カードは `GuideCard.vue` へ抽出してホームと共有する（複製するとデザインが分裂する）。
- **サイト内検索**: ハブ方式ではガイドが 1 クリック遠くなるため、その代償を検索で相殺する。
  絞り込み仕様は DOM 非依存の純関数 `app/utils/guide-search.ts` が正。
  **2 段構成**で、クエリ全体のフレーズ一致に当たればそこで打ち切り、当たらなければ
  空白区切りの AND 段へ落とす。AND 段まで常に落とすと「CAPM ド」で navLabel に
  "CAPM" と "ガイド" を含む「CAPM 完全ガイド」まで並び、意図した絞り込みにならない。
  正規化は NFKC + 小文字化（資格の英字略称は全角入力が実在する）。上限 12 件。
  カタログが静的な TS モジュールなので、索引の生成もフェッチも要らない。
- **e2e に残っていた旧モデルの残骸（4 + 1 箇所）**: 種別 ID の切り替え時に
  `project-management` / `engineering-leadership` / `engineering-management` の 3 箇所と、
  モバイルのタップ先（旧メガメニュー前提のガイド URL）が残っており、実行すれば必ず
  タイムアウトする状態だった。加えて `/capm` 閲覧中に点灯する現在地の期待値が
  ガイドのままだった（ハブ方式では所属ハブが `aria-current="true"`（祖先）で点く）。
  いずれもユニットテスト側は新契約を固定済みで、e2e だけが追随していなかった。
- **検証**: `bun run test` 1566 件 ✔ / `bun run typecheck` ✔ / `bun run lint` ✔ /
  `bun run audit:capm` exit 0 ✔ / `NUXT_SITE_URL=... bun run build` exit 0 ✔ /
  `bun run test:e2e` 29 件 ✔（横スクロール禁止は全 73 ページ × 1440 / 1024 / 390px）。
- **TDD Mandatory サイクル**（フェーズ 1〜6。各フェーズで Red → Green に分割）:
  1. `refactor(catalog)`: 4 階層への再構成（表示は変えず差分を分離）
  2. `feat(hub)`: `GuideCard` 抽出 → ハブ実体 → ルート 6 枚 → `nitro.prerender.routes`
  3. `feat(nav)`: ナビをハブリンク方式へ (`a17dde4`) + `fix(nav)` 説明文の折り返し (`4e5c59f`)
  4. `test(search)` (`4e68b9c`) / `test(nav)` (`696f02b`) → `feat(search)` (`87df4fb`)
  5. `refactor(home)`: ホームを種別セクション構成へ
  6. `test(nav)`: e2e の旧 ID 修正と検索スモーク追加 (`c451320`, `32d5ead`) → 本ファイルの `docs(...)`

### §64. Professional Agile Leadership - Evidence-Based Management / PAL-I 認定資格 学習ガイド（pal-i-study-guide.vue）の Nuxt 移行（2026-09-11）

- **移行元原本**: `archive/Pal-i-study-guide/Pal-i-study-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/pal-i-study-guide.vue`
- **原本照合監査**: `npm run audit:pal-i` にて **exit 0** を確認（listItems: 52, tableRows: 29, paragraphs: 30, headings: 23, externalLinks: 5, mermaidSources: 2, svgElements: 1, calloutElements: 6 すべて原本と完全一致）。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDE_SERIES` に `so-agile-leader`（Scrum.org アジャイルリーダー）を追加、`GUIDES` に `programId: "scrum-org"`, `seriesId: "so-agile-leader"` として登録。これにより全体ガイド数は 59 → 60 本、資格ガイド数は 35 → 36 本へ増加。
- **契約テスト**: `tests/pages/pal-i-study-guide.test.ts`（25 件全通過）。関連する `index.test.ts`、`GuideProgramHub.test.ts`、`GuideKindHub.test.ts`、`guide-catalog.test.ts` の期待値もすべて追随更新。
- **TDD Mandatory サイクル**:
  1. `test(pal-i)`: コントラクトテスト作成・Red 確認 (`3f61304`)
  2. `feat(pal-i)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`363365a`)
  3. `refactor(pal-i)`: `package.json` に `audit:pal-i` 追加・型検査 & lint パス確認 (`52d490a`)
  4. `chore(archive)`: 原本 HTML / MD を `archive/Pal-i-study-guide/` へ移動・audit スクリプト参照パス更新 (`3c26c1a`)
  5. `test(catalog)`: `GuideKindHub` の資格件数期待値を 36 ガイドへ追随更新 (`44f8567`)
  6. `chore(docs)`: `docs/PROGRESS.md` 更新

### §65. Professional Scrum Facilitation Skills™ (PSFS) 認定資格 完全対策ガイド（professional-scrum-facilitation-skills.vue）の Nuxt 移行（2026-09-11）

- **移行元原本**: `archive/Professional-Scrum-Facilitation-Skills/Professional-Scrum-Facilitation-Skills.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/professional-scrum-facilitation-skills.vue`
- **原本照合監査**: `npm run audit:psfs` にて **exit 0** を確認（listItems: 140, tableRows: 89, paragraphs: 63, headings: 54, externalLinks: 32, mermaidSources: 9, svgElements: 1, calloutElements: 41 すべて原本と完全一致）。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDE_SERIES` に `so-facilitation`（Scrum.org ファシリテーション）を追加、`GUIDES` に `programId: "scrum-org"`, `seriesId: "so-facilitation"` として登録。これにより全体ガイド数は 60 → 61 本、資格ガイド数は 36 → 37 本へ増加。
- **契約テスト**: `tests/pages/professional-scrum-facilitation-skills.test.ts`（28 件全通過）。関連する `index.test.ts`、`GuideProgramHub.test.ts`、`GuideKindHub.test.ts`、`guide-catalog.test.ts` の期待値もすべて追随更新。
- **見出し昇格対応**: 原本 SECTION 14（参考文献）の `h2 -> h4` スキップ（4件）を契約 Q-3 に従い `h3` へ昇格。原本照合監査 exit 0 を維持。
- **TDD Mandatory サイクル**:
  1. `test(psfs)`: コントラクトテスト作成・Red 確認 (`b4c1664`)
  2. `feat(psfs)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`02f20cf`)
  3. `refactor(psfs)`: `package.json` に `audit:psfs` 追加・型検査 & lint パス確認 (`a818e17`)
  4. `chore(archive)`: 原本 HTML / MD を `archive/Professional-Scrum-Facilitation-Skills/` へ移動・audit スクリプト参照パス更新 (`66e536d`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

### §66. Professional Scrum Product Owner™ (PSPO I / PSPO II) 学習ガイド（professional-scrum-product-owner.vue）の Nuxt 移行（2026-09-11）

- **移行元原本**: `archive/Professional-Scrum-Product-Owner/Professional-Scrum-Product-Owner.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/professional-scrum-product-owner.vue`
- **原本照合監査**: `npm run audit:pspo` にて **exit 0** を確認（listItems: 68, tableRows: 49, paragraphs: 47, headings: 32, externalLinks: 5, mermaidSources: 3, svgElements: 1, calloutElements: 9 すべて原本と完全一致）。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDE_SERIES` に `so-product-owner`（Scrum.org プロダクトオーナー）を追加、`GUIDES` に `programId: "scrum-org"`, `seriesId: "so-product-owner"` として登録。これにより全体ガイド数は 61 → 62 本、資格ガイド数は 37 → 38 本へ増加。
- **契約テスト**: `tests/pages/professional-scrum-product-owner.test.ts`（27 件全通過）。関連する `index.test.ts`、`GuideProgramHub.test.ts`、`GuideKindHub.test.ts`、`guide-catalog.test.ts` の期待値もすべて追随更新。
- **TDD Mandatory サイクル**:
  1. `test(pspo)`: コントラクトテスト作成・Red 確認 (`8a60377`)
  2. `feat(pspo)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`0cdd5b9`)
  3. `refactor(pspo)`: `package.json` に `audit:pspo` 追加・型検査 & lint パス確認 (`ed9a5a0`)
  4. `chore(archive)`: 原本 HTML / MD を `archive/Professional-Scrum-Product-Owner/` へ移動・audit スクリプト参照パス更新 (`7f4cb8a`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

### §67. Professional Scrum with Kanban™ (PSK I) 完全ガイド（professional-scrum-with-kanban.vue）の Nuxt 移行（2026-09-11）

- **移行元原本**: `archive/Professional-Scrum-with-Kanban/Professional-Scrum-with-Kanban.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/professional-scrum-with-kanban.vue`
- **原本照合監査**: `npm run audit:psk` にて **exit 0** を確認（listItems: 78, tableRows: 27, paragraphs: 31, headings: 33, externalLinks: 5, mermaidSources: 5, svgElements: 1, calloutElements: 11 すべて原本と完全一致）。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDE_SERIES` に `so-kanban`（Scrum.org カンバン）を追加、`GUIDES` に `programId: "scrum-org"`, `seriesId: "so-kanban"` として登録。これにより全体ガイド数は 62 → 63 本、資格ガイド数は 38 → 39 本へ増加。
- **契約テスト**: `tests/pages/professional-scrum-with-kanban.test.ts`（28 件全通過）。関連する `index.test.ts`、`GuideProgramHub.test.ts`、`GuideKindHub.test.ts`、`guide-catalog.test.ts` の期待値もすべて追随更新。
- **見出し昇格対応**: 原本 SECTION 07（参考リソース）の `h2 -> h4` スキップ（1件: Scrum.org 公式リソース）をアクセシビリティ階層スキップ是正のため `h3` へ昇格。原本照合監査 exit 0 を維持。
- **TDD Mandatory サイクル**:
  1. `test(psk)`: コントラクトテスト作成・Red 確認 (`556be19`)
  2. `feat(psk)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`a820af4`)
  3. `refactor(psk)`: `package.json` に `audit:psk` 追加・型検査 & lint パス確認 (`6e8de39`)
  4. `chore(archive)`: 原本 HTML / MD を `archive/Professional-Scrum-with-Kanban/` へ移動・audit スクリプト参照パス更新 (`81c4904`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

### §68. Scaled Professional Scrum™ (SPS) 完全ガイド（scaled-professional-scrum-guide.vue）の Nuxt 移行（2026-09-11）

- **移行元原本**: `archive/Scaled-professional-scrum-guide/Scaled-professional-scrum-guide.html`（HTML・MD 共にアーカイブへ移動）
- **移行先ページ**: `app/pages/scaled-professional-scrum-guide.vue`
- **原本照合監査**: `npm run audit:sps` にて **exit 0** を確認（listItems: 102, tableRows: 52, paragraphs: 65, headings: 46, externalLinks: 27, mermaidSources: 9, svgElements: 1, calloutElements: 29 すべて原本と完全一致）。
- **カタログ登録**: `app/utils/guide-catalog.ts` の `GUIDE_SERIES` に `so-scaling`（Scrum.org スケーリング）を追加、`GUIDES` に `programId: "scrum-org"`, `seriesId: "so-scaling"` として登録。これにより全体ガイド数は 63 → 64 本、資格ガイド数は 39 → 40 本へ増加。
- **契約テスト**: `tests/pages/scaled-professional-scrum-guide.test.ts`（29 件全通過）。関連する `index.test.ts`、`GuideProgramHub.test.ts`、`GuideKindHub.test.ts`、`guide-catalog.test.ts` の期待値もすべて追随更新。
- **見出し昇格対応**: 原本 SECTION 12（参考文献・ソース一覧）の `h2 -> h4` スキップ（2件: 一次情報源(Scrum.org 公式), 二次情報源(コミュニティ・実務解説)）をアクセシビリティ階層スキップ是正のため `h3` へ昇格。原本照合監査 exit 0 を維持。
- **TDD Mandatory サイクル**:
  1. `test(sps)`: コントラクトテスト作成・Red 確認 (`942c323`)
  2. `feat(sps)`: ページ実装・カタログ登録・原本照合 exit 0・Green 確認 (`0269531`)
  3. `refactor(sps)`: `package.json` に `audit:sps` 追加・型検査 & lint パス確認 (`137240e`)
  4. `chore(archive)`: 原本 HTML / MD を `archive/Scaled-professional-scrum-guide/` へ移動・audit スクリプト参照パス更新 (`f53596f`)
  5. `chore(docs)`: `docs/PROGRESS.md` 更新

## 次回セッションでの再開プロンプト

```text
Management-Team-Building-Studies: PRINCE2 Practitioner のNuxt移行・原本アーカイブ・承認済み商標訂正・検証完了（§87）。

コードコミット HEAD: 3718b5e
次の作業: Netlify 公開（netlify.toml 追加済み。§83）→ 公開見合わせ中8本の改稿 → 保守・新規ガイド追加。PRINCE2 Practitioner の承認済み商標訂正と移行検証は完了（§87）。
  未移行HTMLはルートの実ファイル3本。PRINCE2 Practitioner の本文未移行セクションは0。
  新規ページの登録先は app/utils/guide-catalog.ts の ALL_GUIDES 1 か所（GUIDES はそこから導出）。
  ここに programId / seriesId を指定して 1 件追加すれば、ホームの種別セクション・
  グローバルナビ・種別ハブ（/certifications 等）・プログラムハブ（/certifications/[program] 等）が
  すべて自動で追随する（契約 N-1〜N-3）。
  グローバルナビのパネルは種別ごとの**プログラム一覧**で、各行がハブページへの導線になる
  （シリーズをカラムに並べる方式ではない）。シリーズはハブページ内の小見出しとして効く。
  programId / seriesId はいずれも省略不可（シリーズを持たないプログラムは存在しない）。
  挿入位置は「種別順（GUIDE_KINDS）→ プログラム順（GUIDE_PROGRAMS）
  → シリーズ順（GUIDE_SERIES）→ 定義順」を守ること。
  tests/utils/guide-catalog.test.ts / tests/pages/index.test.ts /
  tests/components/SiteHeader.test.ts / tests/components/GuideKindHub.test.ts /
  tests/components/GuideProgramHub.test.ts の固定契約も追随更新する。
  1 種別は 8 プログラム・1 プログラムは 8 シリーズが上限
  （tests/utils/guide-catalog.test.ts の MAX_PROGRAMS_PER_KIND / MAX_SERIES_PER_PROGRAM）。
  超えたら閾値ではなくプログラム／シリーズの粒度を分割し直すこと。

完了済み:
  - app/pages/prince2-7-practitioner-guide.vue（原本保存・承認済み商標訂正・検証完了）
  - app/pages/itil-product-version5-guide.vue（ITIL® Product (Version 5) 完全ガイド）
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
  - app/pages/csp-sm-certified-scrum-professional-scrummaster-study-guide.vue（CSP-SM 完全ガイド）
  - app/pages/a-csm-advanced-certified-scrummaster-study-guide.vue（A-CSM 完全ガイド）
  - app/pages/professional-scrum-developer.vue（Professional Scrum Developer (PSD I) 完全ガイド）
  - app/pages/professional-scrum-facilitation-skills.vue（Professional Scrum Facilitation Skills™ 完全ガイド）
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
  - app/pages/pal-i-study-guide.vue（Professional Agile Leadership I (PAL-I) 完全学習ガイド）
  - app/pages/professional-scrum-product-owner.vue（Professional Scrum Product Owner™(PSPO I / PSPO II)学習ガイド）
  - app/pages/professional-scrum-with-kanban.vue（Professional Scrum with Kanban(PSK I)認定資格 完全ガイド）
  - app/pages/scaled-professional-scrum-guide.vue（Scaled Professional Scrum(SPS)認定 完全学習ガイド）
  - app/pages/professional-scrum-with-user-experience.vue（Professional Scrum™ with User Experience(PSU I) 完全ガイド）
  - app/pages/index.vue（学習ライブラリ型ホーム）
  - app/utils/guide-catalog.ts（ガイド定義の SSoT）
  - SiteHeader.vue（全ページ共通グローバルナビ。種別ごとのパネルはハブページへのリンクのみを列挙し、モバイルはアコーディオン）
  - SiteSearch.vue（ヘッダー内のサイト内検索。/ と Cmd/Ctrl+K で開く）
  - MermaidDiagram.vue / useActiveHeading.ts
  - ユニットテスト 1839 件 / E2E 29 件（全ページ x 3 幅の横スクロール禁止ゲートを含む）
  - SiteDisclaimer.vue（全ページ共通の免責事項。app.vue に 1 行。固定サイドバーへは実測退避）
  - test / typecheck / lint はいずれも 2026-09-11 時点で ✔（実測）
  - build は NUXT_SITE_URL の指定が必要（未指定だと sitemap の prerender で失敗）。test:e2e は ✔
  - 全ページ型検査 (nuxi typecheck) / リンター (eslint) / 原本照合監査は全 69 本 exit 0 パス

ベースラインテスト数: ユニット 1839 + E2E 29
```

### §69. PSU（Professional Scrum with User Experience 完全ガイド）原本照合監査 exit 0 と見出し階層是正

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`Professional-Scrum-with-User-Experience.html`）と移行先 Vue SFC（`app/pages/professional-scrum-with-user-experience.vue`）を機械照合し、全要素（リスト 129, 表行 99, 段落 50, 見出し 38, 外部リンク 22, Mermaid 10, Callout 33, SVG 1）が 100% 一致して **exit 0** を達成。
- **参考文献セクションの見出し階層是正（Q-3適合）**: 原本 HTML では `<h2>参考文献・情報源一覧</h2>` の直下に `<h4>`（「Scrum.org 公式」「Scrum Guide」等6件）が置かれており、`h2 -> h4` の見出し階層スキップが存在していた。アクセシビリティ標準（WCAG）および品質契約 Q-3 を満たすため、`audit_source_parity.mjs` の h4→h3 昇格許可機能（アクセシビリティ階層スキップ是正）に基づき、該当の 6 件を `<h3>` に昇格させた。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` に新シリーズ `so-user-experience`（「ユーザーエクスペリエンス」/ "USER EXPERIENCE"）を追加。Scrum.org 認定プログラム内の 8 番目のガイドとして登録した。これにより公開中ガイド総数は 64 → 65 件、資格ガイド総数は 40 → 41 件となった。
- **原本アーカイブ**: `Professional-Scrum-with-User-Experience.html` および `Professional-Scrum-with-User-Experience.md` を `archive/Professional-Scrum-with-User-Experience/` へ移動し、`package.json` の `audit:psu` スクリプトをアーカイブ先パスに設定。

### §70. PAL-EBM（Professional Agile Leadership - Evidence-Based Management 認定 完全ガイド）原本照合監査 exit 0

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Professional-Agile-Leadership-Evidence-Based-Management/Professional-Agile-Leadership-Evidence-Based-Management.html`）と移行先 Vue SFC（`app/pages/professional-agile-leadership-evidence-based-management.vue`）を機械照合し、全要素（リスト 83, 表行 94, 段落 38, 見出し 55, 外部リンク 17, Mermaid 12, Callout 30, SVG 1）が 100% 一致して **exit 0** を達成。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存シリーズ `so-agile-leader`（「アジャイルリーダー」/ "AGILE LEADER"。PAL-I が既に登録済み）に PAL-EBM を追加登録した。Scrum.org 認定プログラム内のガイドとして登録した。これにより公開中ガイド総数は 65 → 66 件、資格ガイド総数は 41 → 42 件となった。
- **原本アーカイブ**: `Professional-Agile-Leadership-Evidence-Based-Management.html` および `Professional-Agile-Leadership-Evidence-Based-Management.md` を `archive/Professional-Agile-Leadership-Evidence-Based-Management/` へ移動し、`package.json` の `audit:pal-ebm` スクリプトをアーカイブ先パスに設定。

### §71. PSM（Professional Scrum Master 認定ガイド）原本照合監査 exit 0 と見出し階層是正

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`Professional-Scrum-Master.html`）と移行先 Vue SFC（`app/pages/professional-scrum-master.vue`）を機械照合し、全要素（リスト 109, 表行 110, 段落 34, 見出し 52, 外部リンク 12, Mermaid 6, Callout 23, SVG 1）が 100% 一致して **exit 0** を達成。
- **参考文献セクションの見出し階層是正（Q-3適合）**: 原本 HTML では `<h2>参考文献・出典</h2>` の直下に `<h4>`（「一次情報源(Scrum.org / 公式スクラムガイド)」「補足情報源(非公式の学習・分析リソース)」の2件）が置かれており、`h2 -> h4` の見出し階層スキップが存在していた。アクセシビリティ標準（WCAG）および品質契約 Q-3 を満たすため、`audit_source_parity.mjs` の h4→h3 昇格許可機能（アクセシビリティ階層スキップ是正）に基づき、該当の 2 件を `<h3>` に昇格させた。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存シリーズ `so-scrum-master`（「スクラムマスター」/ "SCRUM MASTER"。PSM-AI が既に登録済み）に PSM を追加登録した。Scrum.org 認定プログラム内のガイドとして登録した。これにより公開中ガイド総数は 66 → 67 件、資格ガイド総数は 42 → 43 件となった。
- **原本アーカイブ**: `Professional-Scrum-Master.html` および `Professional-Scrum-Master.md` を `archive/Professional-Scrum-Master/` へ移動し、`package.json` の `audit:psm` スクリプトをアーカイブ先パスに設定。

### §72. PSPBM（Professional Scrum Product Backlog Management Skills 認定 完全学習ガイド）原本照合監査 exit 0

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`Professional-Scrum-Product-Backlog-Management-Skills.html`）と移行先 Vue SFC（`app/pages/professional-scrum-product-backlog-management-skills.vue`）を機械照合し、全要素（リスト 115, 表行 87, 段落 49, 見出し 50, 外部リンク 21, Mermaid 5, Callout 37, SVG 1）が 100% 一致して **exit 0** を達成。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存シリーズ `so-product-owner`（「プロダクトオーナー」/ "PRODUCT OWNER"）に PSPBM を追加登録。Scrum.org 認定プログラム内のガイドとして登録した。これにより公開中ガイド総数は 67 → 68 件、資格ガイド総数は 43 → 44 件となった。
- **原本アーカイブ**: `Professional-Scrum-Product-Backlog-Management-Skills.html` および `Professional-Scrum-Product-Backlog-Management-Skills.md` を `archive/Professional-Scrum-Product-Backlog-Management-Skills/` へ移動し、`package.json` の `audit:pspbm` スクリプトをアーカイブ先パスに設定。

### §73. PSPO-AI（Professional Scrum Product Owner - AI Essentials 認定 完全学習ガイド）原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Professional-Scrum-Product-Owner-AI-Essentials/Professional-Scrum-Product-Owner-AI-Essentials.html`）と移行先 Vue SFC（`app/pages/professional-scrum-product-owner-ai-essentials.vue`）を機械照合し、全要素（リスト 72, 表行 95, 段落 66, 見出し 44, 外部リンク 22, Mermaid 11, Callout 21, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション、Heroの stat-row、7つのセクションと参考文献リスト群を漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存シリーズ `so-product-owner`（「プロダクトオーナー」/ "PRODUCT OWNER"）に PSPO-AI を追加登録。Scrum.org 認定プログラム内のガイドとして登録した。これにより公開中ガイド総数は 68 → 69 件、資格ガイド総数は 44 → 45 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/professional-scrum-product-owner-ai-essentials.test.ts` で全 24 件のテストが Green。
- **原本アーカイブ**: `Professional-Scrum-Product-Owner-AI-Essentials.html` および `Professional-Scrum-Product-Owner-AI-Essentials.md` を `archive/Professional-Scrum-Product-Owner-AI-Essentials/` へ移動し、`package.json` の `audit:pspo-ai` スクリプトをアーカイブ先パスに設定。
- **コミット履歴**:
  1. `test(catalog): add failing spec for pspo-ai essentials guide` (`d88726d`)
  2. `feat(catalog): register pspo-ai essentials in guide-catalog and initialize page` (`d55e413`)
  3. `feat(pspo-ai): implement sec 01-02 overview and exam structure` (`92a0950`)
  4. `feat(pspo-ai): implement sec 03 ai theory and primer` (`e479e86`)
  5. `feat(pspo-ai): implement sec 04 ai security and ethics` (`f3841de`)
  6. `feat(pspo-ai): implement sec 05 ai product ownership stances` (`c1abd81`)
  7. `feat(pspo-ai): implement sec 06-08 best practices, exam prep and references` (`207bc65`)
  8. `refactor(pspo-ai): complete source parity and styling verification` (`dd3e2e2`)
  9. `chore(pspo-ai): archive original files and sync progress` (`780db11`)
  10. `style(pspo-ai): expand main content to full width` (`be75454`)
  11. `style(pspo-ai): apply authentic typography, color palette and component styles` (`4d60f7f`)

### §74. コードレビュー指摘に基づく内容正確性の修正（PAL-EBM・PSPBM）

原本と移行先の間で意図的に文言を変更した箇所。`audit:pal-ebm` / `audit:pspbm` は
この差分のみを理由に非 0 で終了するが、いずれも移行漏れではなく事実正確性の是正。

| ページ | 変更内容 | 理由 |
|---|---|---|
| `professional-agile-leadership-evidence-based-management.vue`（§11.1） | 「Scrum Guide(2020年版)では、組織のビジョンからSprint Goalに至るまで目標が階層的につながっていることが強調されている」という記述を削除し、EBMの戦略目標・中間目標・即時実行目標の3層とScrum Product/Sprint Goalが文脈的に整合する旨に修正 | Scrum Guide 2020 はこの組織ビジョン起点の階層を公式には定義していない。該当階層はEBM Guideの概念であり、Scrum Guideの定義として誤帰属していた |
| `professional-scrum-product-backlog-management-skills.vue`（Competencies Framework） | PSPBM Skills の公式 Focus Area を「Product Backlog Management」「Stakeholders & Customers」の2つから、「The Product Backlog」を加えた3つに修正し、表に行を追加 | scrum.org の Managing Products with Agility コンピテンシーページに基づく是正。原本 HTML 自体が古い記載だったため原本と一致しなくなる |

原本 HTML（`archive/.../*.html`）側は本セッションでは更新していない。原本自体の修正が
必要かはユーザー判断を要するため、次回セッションで確認すること。

### §75. ITIL® Experience (Version 5) 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-experience-version-5-study-guide/Itil-experience-version-5-study-guide.html`）と移行先 Vue SFC（`app/pages/itil-experience-version-5-study-guide.vue`）を機械照合し、全要素（リスト 105, 表行 122, 段落 45, 見出し 91, 外部リンク 20, Mermaid 8, Callout 33, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション、Heroの stat-row、13個のセクション（資格概要、試験概要、基礎概念のリフレッシュ、Experience主要概念、体験フレームワーク全体像、体験捕捉、サービスジャーニー、ITILとAI、他フレームワーク連携、ベストプラクティス総まとめ表、試験対策ポイント、用語集、参考文献一覧）を漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下に新規プログラム `peoplecert`（PeopleCert 認定、`/certifications/peoplecert`）、新規シリーズ `pc-itil`（ITIL）およびガイド `/itil-experience-version-5-study-guide` を追加登録（種別の追加は無し）。これにより公開中ガイド総数は 69 → 70 件、資格ガイド総数は 45 → 46 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-experience-version-5-study-guide.test.ts` で全 24 件のテストが Green。
- **原本アーカイブ**: `Itil-experience-version-5-study-guide.html` および `Itil-experience-version-5-study-guide.md` を `archive/Itil-experience-version-5-study-guide/` へ移動し、`package.json` の `audit:itil-v5` スクリプトをアーカイブ先パスに設定。
- **コミット履歴**:
  1. `test(catalog): add failing spec for peoplecert and itil experience v5` (`fb0200f`)
  2. `feat(catalog): register peoplecert and itil experience in guide-catalog` (`96c53c8`)
  3. `test(itil-v5): add comprehensive contract test suite for itil experience v5` (`7993762`)
  4. `feat(itil-v5): initialize page skeleton with hero, toc, seo meta and layout` (`8f228e5`)
  5. `feat(itil-v5): implement sec 00-01 overview and exam structure` (`7c53728`)
  6. `feat(itil-v5): implement sec 02-03 foundations refresh and key concepts` (`83a7a28`)
  7. `feat(itil-v5): implement sec 04 experience framework and role mapping` (`9433fe0`)
  8. `feat(itil-v5): implement sec 05 capturing experience and data quality` (`1f43f76`)
  9. `feat(itil-v5): implement sec 06 service journey and improvement loop` (`aa7e266`)
  10. `feat(itil-v5): implement sec 07-08 ai integration and related frameworks` (`471ed60`)
  11. `feat(itil-v5): implement sec 09-12 best practices, exam tips, glossary and references` (`4aa6159`)
  12. `refactor(itil-v5): complete source parity and styling verification` (`49c9eea`)
  13. `chore(itil-v5): archive original files and add parity audit script` (`71feff0`)
  14. `style(itil-v5): expand main content to full width` (`43d2adc`)
  15. `style(itil-v5): unify sidebar and footer layout with standard guide design` (`71180d2`)
  16. `style(itil-v5): restore complete authentic styles for tables, callouts, diagrams and typography` (`d7beb38`)

### §76. ITIL® Foundation (Version 5) 完全学習ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-foundation-v5-study-guide/Itil-foundation-v5-study-guide.html`）と移行先 Vue SFC（`app/pages/itil-foundation-v5-study-guide.vue`）を機械照合し、全要素（リスト 75, 表行 167, 段落 43, 見出し 43, 外部リンク 19, Mermaid 11, Callout 22, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（3グループのnav-group-label）、Heroの stat-row、免責事項、13個のセクション（このガイドの使い方、出題配点マップ、第1章 主要用語と定義、第2章 4つの側面、第3章 製品・サービスライフサイクル、第4章 ITILバリューシステム、第5章 バリューストリーム、第6章 ITILとAI、第7章 他フレームワークとの関係、第8章 出題形式と学習計画、付録A 用語集、付録B マネジメントプラクティス早見表、付録C 出典・参考文献一覧）およびFooterを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-foundation-v5-study-guide` を追加登録。これにより公開中ガイド総数は 70 → 71 件、資格ガイド総数は 46 → 47 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-foundation-v5-study-guide.test.ts` で全 24 件のテストが Green。
- **原本アーカイブ**: `Itil-foundation-v5-study-guide.html` および `Itil-foundation-v5-study-guide.md` を `archive/Itil-foundation-v5-study-guide/` へ移動し、`package.json` の `audit:itil-foundation-v5` スクリプトをアーカイブ先パスに設定。
- **コミット履歴**:
  1. `test(itil-foundation-v5): add failing contract specs and catalog entry` (`ecb4fc5`)
  2. `feat(itil-foundation-v5): implement hero and layout skeleton` (`34ca258`)
  3. `feat(itil-foundation-v5): implement how-to-use and exam blueprint sections` (`e559d00`)
  4. `feat(itil-foundation-v5): implement chapter 1 key terms and definitions` (`e112dbb`)
  5. `feat(itil-foundation-v5): implement four dimensions and lifecycle sections` (`9792814`)
  6. `feat(itil-foundation-v5): implement ITIL value system section` (`92c1daf`)
  7. `feat(itil-foundation-v5): implement value streams, AI, and other frameworks sections` (`ae1e57c`)
  8. `feat(itil-foundation-v5): implement exam strategy, glossary, practices, and references sections` (`5e7e43a`)
  9. `refactor(itil-foundation-v5): complete source parity and styling verification` (`e54e1ea`)

### §77. ITIL® Managing Professional Transition (Version 5) 認定資格 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-managing-professional-transition-v5-guide/Itil-managing-professional-transition-v5-guide.html`）と移行先 Vue SFC（`app/pages/itil-managing-professional-transition-v5-guide.vue`）を機械照合し、全要素（リスト 114, 表行 105, 段落 65, 見出し 43, 外部リンク 50, Mermaid 9, Callout 27, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（10個のセクション）、Heroの stat-row、免責事項、10個のセクション（この資格について、ITIL (Version 5) 全体像、共通基盤概念、試験1: Transformation、試験2: Product, Service, Experience、共通トピック: ITIL and AI、ITIL と他フレームワークとの関係、試験対策のポイント、学習チェックリスト、参考文献）およびFooterを漏れなく転写。
- **チェックリスト機能の実装**: 学習チェックリスト（18項目）について、localStorage と連携したチェック状態の保持、達成進捗バーのリアルタイム計算（リアクティブ連動）を原本のマークアップ完全維持のもとで Vue 3 実装。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-managing-professional-transition-v5-guide` を追加登録。これにより公開中ガイド総数は 71 → 72 件、資格ガイド総数は 47 → 48 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-managing-professional-transition-v5-guide.test.ts` で全 24 件のテストが Green。
- **原本アーカイブ**: `Itil-managing-professional-transition-v5-guide.html` および `Itil-managing-professional-transition-v5-guide.md` を `archive/Itil-managing-professional-transition-v5-guide/` へ移動し、`package.json` に `audit:itil-mpt-v5` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(itil-mpt-v5): add failing contract specs and catalog entry` (`94eec83`)
  2. `feat(itil-mpt-v5): implement hero and sections 1-2 (about-mpt, evolution)` (`ccd260a`)
  3. `feat(itil-mpt-v5): implement sections 3-4 (foundational concepts, transformation)` (`ceb09aa`)
  4. `feat(itil-mpt-v5): implement section 5 (product, service, experience)` (`032b556`)
  5. `feat(itil-mpt-v5): implement sections 6-7 (ai capability model, other frameworks)` (`e4c0231`)
  6. `feat(itil-mpt-v5): implement sections 8-10 (exam strategy, checklist, references)` (`2e0bc95`)
  7. `refactor(itil-mpt-v5): complete source parity and styling verification` (`fc56ab2`)
  8. `style(itil-mpt-v5): expand main content to full width and unify sidebar and footer with standard guide design` (`6941f49`)
  9. `test(itil-mpt-v5): remove unused MERMAID_DIAGRAM_DECLARATION import and normalizeMermaidSource function` (`3a387a7`)
- **レイアウト・デザインの標準化**:
  - メインコンテンツの横幅制約（`max-width: 900px`）を撤廃し、画面いっぱいにフルワイド展開。
  - サイドバーを `position: sticky` から `position: fixed`（標準ガイド仕様）に統一し、アクティブ項目の左ボーダーやアイコンカラー、レスポンシブ時のオーバーレイとトグルボタンを標準化。
  - フッターを標準フォントサイズ・行間（`font-size: 15px; line-height: 1.6;`）に統一。

### §78. ITIL® Product (Version 5) 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-product-version5-guide/Itil-product-version5-guide.html`）と移行先 Vue SFC（`app/pages/itil-product-version5-guide.vue`）を機械照合し、全要素（リスト 126, 表行 185, 段落 58, 見出し 87, 外部リンク 17, Mermaid 13, Callout 31, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（16個のセクション）、Heroの stat-row、免責事項、16個のセクション（ITIL Productとは何か、試験概要と出題形式、基礎概念、PSLM全体像、Discover、Design、Acquire、Build、Transition、Operate、Deliver、Support、ライフサイクル全体のマネジメント、ITIL・AI・他フレームワーク、学習チェックリスト、参考文献・出典）およびFooterを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-product-version5-guide` を追加登録。これにより公開中ガイド総数は 72 → 73 件、資格ガイド総数は 48 → 49 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-product-version5-guide.test.ts` で全 24 件のテストが Green。
- **原本アーカイブ**: `Itil-product-version5-guide.html` および `Itil-product-version5-guide.md` を `archive/Itil-product-version5-guide/` へ移動し、`package.json` に `audit:itil-product-v5` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(itil-product-v5): add failing contract specs and catalog entry` (`a00aef8`)
  2. `feat(itil-product-v5): implement hero and sections 1-2 (about-product, exam-format)` (`1c2d204`)
  3. `feat(itil-product-v5): implement sections 3-4 (basic-concepts, lifecycle-overview)` (`62f8693`)
  4. `feat(itil-product-v5): implement sections 5-6 (discover, design)` (`c089397`)
  5. `feat(itil-product-v5): implement sections 7-8 (acquire, build)` (`23f404c`)
  6. `feat(itil-product-v5): implement sections 9-10 (transition, operate)` (`88395bf`)
  7. `feat(itil-product-v5): implement sections 11-12 (deliver, support)` (`6844292`)
  8. `feat(itil-product-v5): implement sections 13-14 (lifecycle-management, ai-and-frameworks)` (`bdc08aa`)
  9. `feat(itil-product-v5): implement sections 15-16 (study-checklist, references)` (`592a546`)

### §79. ITIL® Service (Version 5) 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-service-v5-guide/Itil-service-v5-guide.html`）と移行先 Vue SFC（`app/pages/itil-service-v5-guide.vue`）を機械照合し、全要素（表行 192, 段落 78, 見出し 114, 外部リンク 25, Mermaid 20, Callout 20, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（17個のセクション）、Heroの stat-row、免責事項、17個のセクション（本ガイドについて、試験の全体像と認定パスウェイ、ITIL Foundation の復習、PSLMの中核概念、Discover、Design、Acquire、Build、Transition、Operate、Deliver、Support、ライフサイクル全体とAI・他フレームワーク、ベストプラクティス総まとめ、試験対策のポイント、付録: 用語集、参考文献・ソース URL 一覧）およびFooterを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-service-v5-guide` を追加登録。これにより公開中ガイド総数は 73 → 74 件、資格ガイド総数は 49 → 50 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-service-v5-guide.test.ts` で全 23 件のテストが Green。
- **原本アーカイブ**: `Itil-service-v5-guide.html` および `Itil-service-v5-guide.md` を `archive/Itil-service-v5-guide/` へ移動し、`package.json` に `audit:itil-service-v5` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(itil-service-v5): add failing contract specs and catalog entry` (`fe51458`)
  2. `feat(itil-service-v5): implement hero and sections 1-2 (about-guide, exam-overview)` (`84f0b44`)
  3. `feat(itil-service-v5): implement section 3 (foundation-review)` (`f7c2fb5`)
  4. `feat(itil-service-v5): implement sections 4-5 (module1-key-concepts, module2-discover)` (`9e5c078`)
  5. `feat(itil-service-v5): implement sections 6-7 (module3-design, module4-acquire)` (`7556ab3`)
  6. `feat(itil-service-v5): implement sections 8-9 (module5-build, module6-transition)` (`55c167f`)
  7. `feat(itil-service-v5): implement sections 10-11 (module7-operate, module8-deliver)` (`bc6b264`)
  8. `feat(itil-service-v5): implement sections 12-13 (module9-support, module10-lifecycle-ai)` (`3391dd7`)
  9. `feat(itil-service-v5): implement sections 14-17 (summary, exam-tips, glossary, references)` (`e5d8962`)
  10. `style(itil-service-v5): expand main content to full width and pin sidebar to left edge` (`d21d644`)
- **レイアウト・デザインの標準化**:
  - メインコンテンツの横幅制約（`max-width: 1440px; margin: 0 auto;`）を撤廃し、画面いっぱいにフルワイド展開（`margin-left: var(--sidebar-width); max-width: 100%;`）。
  - サイドバーを `position: sticky` から `position: fixed; left: 0;`（標準ガイド仕様）に統一し、アクティブ項目の左ボーダーやアイコンカラー、レスポンシブ時のオーバーレイとトグルボタンを標準化。
  - フッターを標準フォントサイズ・行間（`font-size: 16px; line-height: 1.6;`）に統一。

### §80. ITIL® Strategy (Version 5) 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-strategy-v5-guide/Itil-strategy-v5-guide.html`）と移行先 Vue SFC（`app/pages/itil-strategy-v5-guide.vue`）を機械照合し、全要素（リスト 41, 表行 48, 段落 85, 見出し 57, 外部リンク 16, Mermaid 11, Callout 8, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（14個のセクション＋3個のグループラベル）、Heroの stat-row、免責事項、14個のセクション（本ガイドについて、試験概要、ITIL v5全体像の位置づけ、Module 1: 復習と価値創出、Module 2: 主要概念、Module 3: 4つの側面、Module 4: Strategy Management Model、Module 5: 戦略策定サイクル、Module 6: 戦略実装サイクル、Module 7: 戦略的能力、Module 8: 他フレームワーク統合、ベストプラクティス総括表、試験対策のポイント、参考文献・出典）およびFooterを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-strategy-v5-guide` を追加登録。これにより公開中ガイド総数は 74 → 75 件、資格ガイド総数は 50 → 51 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-strategy-v5-guide.test.ts` で全 25 件のテストが Green。
- **原本アーカイブ**: `Itil-strategy-v5-guide.html` および `Itil-strategy-v5-guide.md` を `archive/Itil-strategy-v5-guide/` へ移動し、`package.json` に `audit:itil-strategy-v5` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(itil-strategy-v5): add failing contract specs and catalog entry` (`8f5e5a6`)
  2. `feat(itil-strategy-v5): implement hero and sections 1-3 (about, overview, v5-context)` (`aa4a718`)
  3. `feat(itil-strategy-v5): implement sections 4-6 (module1-foundation, module2-concepts, module3-four-dimensions)` (`b65e104`)
  4. `feat(itil-strategy-v5): implement sections 7-9 (module4-model, module5-dev-cycle, module6-impl-cycle)` (`e80da63`)
  5. `feat(itil-strategy-v5): implement sections 10-11 (module7-capabilities, module8-integration)` (`b881f71`)
  6. `feat(itil-strategy-v5): implement sections 12-14 (summary, exam-tips, references)` (`0eb7b64`)
  7. `style(itil-strategy-v5): refine typography and verify source parity audit` (`0ea60af`)
  8. `style(itil-strategy-v5): expand main content to full width and hide skip-link off-screen` (`fede458`)
- **レイアウト・デザインの標準化**:
  - メインコンテンツの横幅制約（`max-width: 900px`）を撤廃し、画面いっぱいにフルワイド展開（`max-width: 100%`）。
  - `.skip-link` の初期位置を画面外（`position: fixed; top: -100px;`）に設定し、非フォーカス時にグローバルナビ左上へ黒い線状のアーティファクトが露出する不具合を解消。フォーカス時（Tab キー操作時）のみグローバルナビ下へ降りるアクセシブルな設計に統一。

### §81. ITIL® Transformation (Version 5) 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Itil-transformation-v5-study-guide/Itil-transformation-v5-study-guide.html`）と移行先 Vue SFC（`app/pages/itil-transformation-v5-study-guide.vue`）を機械照合し、全要素（リスト 132, 表行 83, 段落 46, 見出し 55, 外部リンク 15, Mermaid 15, Callout 38, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（16個のセクション＋5個のグループラベル）、Heroの stat-row、免責事項、16個のセクション（本ガイドについて、試験概要と学習目標、ITIL v5 Core Concepts、複雑適応系と組織トランスフォーメーション、Transformation Management Model、ガバナンスと意思決定、トランスフォーメーションパターン、組織能力とアライメント、トランスフォーメーションの実行と適応、測定・フィードバック・価値実現、Transformation Toolkit: 手法とツール、AI & デジタルトランスフォーメーション、他のフレームワーク・プラクティスとの統合、試験対策: 実践シナリオと重要ポイント、用語集、参考文献・公式シラバス対応表）およびFooterを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）、シリーズ `pc-itil`（ITIL）にガイド `/itil-transformation-v5-study-guide` を追加登録。これにより公開中ガイド総数は 75 → 76 件、資格ガイド総数は 51 → 52 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/itil-transformation-v5-study-guide.test.ts` で全 25 件のテストが Green。
- **原本アーカイブ**: `Itil-transformation-v5-study-guide.html` および `Itil-transformation-v5-study-guide.md` を `archive/Itil-transformation-v5-study-guide/` へ移動し、`package.json` に `audit:itil-transformation-v5` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(itil-transformation-v5): add failing contract specs and catalog entry` (`96da4a7`)
  2. `feat(itil-transformation-v5): implement hero and sections 1-4 (intro, exam, concepts, complexity)` (`0042ef9`)
  3. `feat(itil-transformation-v5): implement sections 5-8 (model, governance, patterns, alignment)` (`5c69727`)
  4. `feat(itil-transformation-v5): implement sections 9-11 (execution, measurement, tools-methods)` (`63d10af`)
  5. `feat(itil-transformation-v5): implement sections 12-16 (ai, integration, exam-prep, glossary, references)` (`99c9aa7`)
  6. `style(itil-transformation-v5): refine typography and verify source parity audit` (`beafcc2`)
- **レイアウト・デザインの標準化**:
  - メインコンテンツの横幅制約（`max-width: 900px`）を撤廃し、画面いっぱいにフルワイド展開（`max-width: 100%`）。
  - サイドバーを `position: fixed; left: 0;`（標準ガイド仕様）に統一し、アクティブ項目の左ボーダーやアイコンカラー、レスポンシブ時のオーバーレイとトグルボタンを標準化。
  - 未定義 CSS 変数 `--color-ink-muted` を `--color-ink-soft` に修正し、デザイントークンとの整合性を確保。

### §82. MoP® Foundation 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Mop-foundation-guide/Mop-foundation-guide.html`）と移行先 Vue SFC（`app/pages/mop-foundation-guide.vue`）を機械照合し、全要素（リスト 209, 表行 46, 段落 93, 見出し 46, 外部リンク 39, Mermaid 13, Callout 52, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal）、セクション別ナビゲーション（14個のセクション＋4個のグループラベル）、Heroの stat-row、全14セクション（試験概要、ポートフォリオマネジメントとは何か、MoPフレームワークの全体像、5つの原則、組織のエネルギーと活力ある変革文化、ポートフォリオ定義サイクル、ポートフォリオ・デリバリーサイクル、主要な役割、主要文書、導入・定着・成熟度評価、プラクティス別ベストプラクティス早見表、関連フレームワークとの関係、試験対策のポイント、参考文献・ソース一覧）および商標・免責Footerを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）に新シリーズ `pc-mop`（MoP）およびガイド `/mop-foundation-guide` を追加登録。これにより公開中ガイド総数は 76 → 77 件、資格ガイド総数は 52 → 53 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/mop-foundation-guide.test.ts` で全 27 件のテストが Green。
- **原本アーカイブ**: `Mop-foundation-guide.html` および `Mop-foundation-guide.md` を `archive/Mop-foundation-guide/` へ移動し、`package.json` に `audit:mop-foundation` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(mop): add failing contract tests and catalog specs` (`bafc1f5`)
  2. `feat(mop): setup initial page shell and catalog registration` (`3294ee7`)
  3. `feat(mop): implement sections 1-3 with diagrams and exam table` (`e230940`)
  4. `feat(mop): implement sections 4-5 with principles and energy diagrams` (`fc6fad5`)
  5. `feat(mop): implement sections 6-7 with cycle diagrams and table` (`f97a2a2`)
  6. `feat(mop): implement sections 8-10 with roles, documents, and maturity models` (`41fc670`)
  7. `feat(mop): implement sections 11-14 with summary table, frameworks diagram, and references` (`a6e1579`)

### §83. Netlify 公開準備と公開前の著作権・商標監査（2026-10-17）

- **公開見合わせ（8 本）**: `app/utils/guide-catalog.ts` の `UNPUBLISHED_GUIDE_ROUTES` に登録し、
  `GUIDES` を `ALL_GUIDES` から導出して導線から外した。`nuxt.config.ts` の `pages:extend` で
  ルートごと除去するため、直接アクセス・静的生成・sitemap にも出ない。ページと定義は再公開用に残す。
  - 書籍の章順網羅要約・要約サービス依存: Team Geek / Peopleware / Managing Humans /
    Leadership Challenge Workbook / No Rules Rules
  - Scrum Alliance Learning Objectives 英文の体系的転載: CSPO / CSP-PO / CSP-D
  - 公開ガイド数は 77 → 69（資格 53 → 50、書籍 18 → 13、テーマ 6）
- **法的表示の是正**（原本 `archive/*.html` にも同一修正。原本照合の整合を維持）:
  - ITIL / MoP / PRINCE2 の権利者を PeopleCert group に統一。ライセンス未取得なのに
    「AXELOS の許可を得て使用」とした虚偽表示（Transformation）を削除
  - Scrum.org と Scrum, Inc. の混同（PSD）、Scrum を Scrum Alliance の商標とした誤り（CSM 理論）を修正
  - © の主体を運営者（Management Studies）に統一（統括責任者の手引き / Team Topologies / リーダーの作法 / チームリード術）
  - 商標表記の追加（PSPO / CAPM ドメイン3）。PSPO-AI は移行時に脱落した原本フッターを復元
    （原本照合監査はフッターを照合しないため検知されていなかった）
  - CC BY-SA 4.0 帰属を 11 ページのフッターに追加（Scrum Guide / Nexus / Kanban Guide / EBM Guide）
  - 英文・訳文の引用に出典と「拙訳」を付記（CAF / CSP-SM / 人月の神話 / スクラム 97 の知恵）
  - サイト共通の免責（`SiteDisclaimer.vue`）に書籍の著作権帰属を追記
- **外部リンク**: 問題集・ブレインダンプ系サイト（certempire / passitexams / open-exam-prep / certshero /
  certificationbox / scrum-exams.info / prepforscrum）へのリンクを削除。唯一の出典だった記述
  （PSM II の分析記事、SPS のケーススタディ約 20%）はリンクのみ外して出典名を残した（扱いはユーザー判断待ち）。
  ITIL Foundation の参考文献は番号を振り直し本文の引用番号を追随。
  Google Drive の LO PDF（CAL1 / CAF / CAL2）は Scrum Alliance 公式ページ掲載の公式資料と確認したため維持。
- **回帰防止**: `tests/legal-notices.test.ts`（禁止表現・ダンプ系ドメインへのリンク・CC BY-SA 帰属・資格ページの商標表示）。
- **e2e**: ITIL 3 ページの 390px はみ出しを解消（区切りの無い語に `overflow-wrap: anywhere`、
  Foundation の用語集を狭い幅で 1 カラム化）。
- **Netlify**: `netlify.toml` を追加。固定版 Bun で lockfile どおりに依存を入れてから生成し、
  `NUXT_SITE_URL=$URL` を渡す。プレビュー / ブランチデプロイは `NUXT_SITE_ENV=preview` で noindex
  （ローカルで `NETLIFY=true` を模して生成し、本番 indexable / プレビュー noindex を確認済み）。
- **既存の監査失敗（本作業と無関係）**: `audit:csp-sm`（冒頭段落 1 件）/ `audit:psm`（表行 1 件）/
  `audit:pspo-ai`（リスト項目 2 件）は変更前の HEAD でも exit 1。従来の ✔ 記録が実態と食い違っていた。
- **注意**: GitHub リポジトリは公開設定。リポジトリ直下の原本 .md / .html と、追跡対象の
  archive（ITIL / MoP）は Netlify の公開可否と無関係に GitHub 上で閲覧できる。

### §84. MSP® Foundation 5th edition 完全学習ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Msp-foundation-5th-edition-guide/Msp-foundation-5th-edition-guide.html`）と移行先 Vue SFC（`app/pages/msp-foundation-5th-edition-guide.vue`）を機械照合し、全要素（リスト 127, 表行 52, 段落 54, 見出し 45, 外部リンク 17, Mermaid 10, Callout 32, SVG 1）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーのブランドロゴ（SVG Seal: circle/path）、セクション別ナビゲーション（16個のセクション）、Heroの stat-row、全16セクション（はじめに、試験の全体像、プログラム・プロジェクト・ポートフォリオの違い、MSPフレームワークの全体構造、7つの原則、7つのテーマ、プログラムライフサイクル、ガバナンスと組織構造、ベネフィット管理の実践、リスク・課題・意思決定管理、アシュアランスと三線防御モデル、テーラリング、テーマ・プロセス別ベストプラクティスチェックリスト、よくある落とし穴、用語集、参考文献・ソース一覧）および商標・免責Footerを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）に新シリーズ `pc-msp`（MSP）およびガイド `/msp-foundation-5th-edition-guide` を追加登録。これにより公開中ガイド総数は 69 → 70 件（未公開 8 本除く実公開数）、登録ガイド総数は 77 → 78 件、資格ガイド総数は 53 → 54 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/msp-foundation-5th-edition-guide.test.ts` で全 27 件のテストが Green。
- **法的表示・ダンプ系ドメインの是正（§83 方針準拠）**: 問題集・ブレインダンプ系サイト（`open-exam-prep.com`, `passitexams.com`）の参考文献項目を原本 HTML / Markdown と Vue SFC の双方から削除し、参考文献を 1〜16 にリナンバリング。`tests/legal-notices.test.ts`（4件）を含む全法的要件に適合。
- **原本アーカイブ**: `Msp-foundation-5th-edition-guide.html` および `Msp-foundation-5th-edition-guide.md` を `archive/Msp-foundation-5th-edition-guide/` へ移動し、`package.json` に `audit:msp-foundation` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(msp): add failing contract tests and catalog specs` (`ad5275d`)
  2. `feat(msp): setup initial page shell and catalog registration` (`05696b4`)
  3. `feat(msp): implement sections 1-4 with exam table and framework diagrams` (`e186dc3`)
  4. `feat(msp): implement sections 5-6 with principles and themes diagrams` (`086de12`)
  5. `feat(msp): implement sections 7-8 with lifecycle and governance structures` (`fa6620f`)
  6. `feat(msp): implement sections 9-12 with benefits, assurance, and tailoring` (`f92e5b4`)
  7. `feat(msp): implement sections 13-16 with checklist, glossary, and references` (`70ea017`)

### §85. MSP® Practitioner 5th edition 完全学習ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Msp-practitioner-5th-edition-guide/Msp-practitioner-5th-edition-guide.html`）と移行先 Vue SFC（`app/pages/msp-practitioner-5th-edition-guide.vue`）を機械照合し、全要素（リスト 104, 表行 62, 段落 81, 見出し 22, 外部リンク 13, Mermaid 4, Callout 23）が 100% 一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーの目次ナビゲーション（11セクション）、Heroの stat-row、全11セクション（はじめに:MSPプラクティショナーとは何か、試験概要、MSPの全体構造:3つのレンズ、7つの原則とその実践適用、プログラム組織とガバナンス構造、7つのテーマ詳細解説、7つのプロセス、テーラリング、プラクティショナー試験対策:シナリオ適用のコツ、ベストプラクティス総まとめ表、参考文献・出典）および商標・免責Footerを漏れなく転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）のシリーズ `pc-msp`（MSP）にガイド `/msp-practitioner-5th-edition-guide` を追加登録。これにより公開中ガイド総数は 70 → 71 件（未公開 8 本除く実公開数）、登録ガイド総数は 78 → 79 件、資格ガイド総数は 54 → 55 件となった。
- **契約テスト（S/C/D/Q/N）**: `tests/pages/msp-practitioner-5th-edition-guide.test.ts` で全 27 件のテストが Green。
- **法的表示・ダンプ系ドメインの是正（§83, §84 方針準拠）**: 問題集・ブレインダンプ系サイト（`open-exam-prep.com`）の参考文献項目を原本 HTML / Markdown と Vue SFC の双方から削除し、唯一の出典であった記述はリンクを外して出典名（`Open Exam Prep「Programme Governance Structure」`）を残した。`tests/legal-notices.test.ts`（4件）を含む全法的要件に適合。
- **原本アーカイブ**: `Msp-practitioner-5th-edition-guide.html` および `Msp-practitioner-5th-edition-guide.md` を `archive/Msp-practitioner-5th-edition-guide/` へ移動し、`package.json` に `audit:msp-practitioner` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(msp): add failing contract tests and catalog specs` (`ae52366`)
  2. `feat(msp): setup initial page shell and catalog registration` (`84f58a0`)
  3. `feat(msp): implement sections 1-3 with exam table and three-lenses diagram` (`4c35742`)
  4. `feat(msp): implement sections 4-5 with principles and governance diagram` (`ad2d71b`)
  5. `feat(msp): implement section 6 with themes map diagram and 7 theme modules` (`53f2952`)
  6. `feat(msp): implement sections 7-8 with lifecycle diagram and tailoring` (`d74fc48`)
  7. `feat(msp): implement sections 9-11 with exam tips, best practices table, and references` (`e93c8c9`)

### §86. PRINCE2® 7 Foundation 完全ガイド 原本照合監査 exit 0 と移行完了

- **原本照合監査**: `audit_source_parity.mjs` で原本 HTML（`archive/Prince2-7-foundation-guide/Prince2-7-foundation-guide.html`）と移行先 Vue SFC（`app/pages/prince2-7-foundation-guide.vue`）を機械照合し、全要素（リスト 122→125, 表行 84, 段落 57, 見出し 30, 外部リンク 13, Mermaid 10, Callout 17）が漏れなく一致して **exit 0** を達成。
- **原本構造の忠実な再現とスタイリング**: 原本サイドバーの目次ナビゲーション（14セクション）、Heroの stat-row、全14セクション（試験概要、PRINCE2とは何か、7つの原則、People、7つのプラクティス、マネジメントプロダクト、役割と責任、7つのプロセス、テーラリング、デジタル&データマネジメント、サステナビリティマネジメント、PRINCE2要素の相互関連マッピング、試験対策テクニック、参考文献・出典）および商標・免責Footerを完全転写。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）に新シリーズ `pc-prince2`（PRINCE2）を新設し、ガイド `/prince2-7-foundation-guide` を追加登録。資格ガイド総数は 52 → 53 件となった。
- **契約テスト（S/C/D/Q/固有）**: `tests/pages/prince2-7-foundation-guide.test.ts` で全 28 件のテストが Green。
- **法的表示の是正**: `tests/legal-notices.test.ts`（4件）に基づき、フッターおよび免責文の商標帰属先を旧権利者（AXELOS Limited）から現行権利者（PeopleCert group）へ更新。
- **原本アーカイブ**: `Prince2-7-foundation-guide.html` および `Prince2-7-foundation-guide.md` を `archive/Prince2-7-foundation-guide/` へ移動し、`package.json` に `audit:prince2-7` スクリプトを追加設定。
- **コミット履歴**:
  1. `test(prince2): add failing contract tests and catalog specs` (`137d80c`)
  2. `feat(prince2): register prince2 guide in catalog and update site tests` (`788f83f`)
  3. `feat(prince2): implement hero, exam-overview, and what-is-prince2 sections` (`3ee5194`)
  4. `feat(prince2): implement 7 principles and people sections` (`a166683`)
  5. `feat(prince2): implement 7 practices section with 6 diagrams and 6 tables` (`7e1b0f5`)
  6. `feat(prince2): implement management products and roles-responsibilities sections` (`9c23630`)
  7. `feat(prince2): implement 7 processes section with overall lifecycle flow diagram` (`1c511ce`)
  8. `feat(prince2): implement tailoring, digital, sustainability, and cross-mapping sections` (`925fd18`)
  9. `feat(prince2): implement exam tips, references, and trademark footer` (`98ba2b0`)
  10. `fix(prince2): update trademark attribution to PeopleCert group and align hub guide count` (`171cdd0`)

### §87. PRINCE2® 7 Practitioner のNuxt移行・承認済み商標訂正と検証完了（2026-10-19）

- **移行先**: `app/pages/prince2-7-practitioner-guide.vue`（`/prince2-7-practitioner-guide`）。Hero、目次、原本の11セクション、参考文献、免責フッターを転写。見出し100、段落78、リスト項目172、表32個・169行、外部リンク23、Mermaid 13、callout 24、静的SVG 1が原本監査で一致し、`npm run audit:prince2-practitioner` は **exit 0**。
- **厳密な契約**: 原本から実装前に抽出した固定fixtureを使用し、全セクションの文言・順序・ul/olの区別・リスト階層・表セル・リンク属性・強調要素を検証。全文テキスト、全見出し、全図のソース・順序・ラッパー・themeVariables（円グラフの配色を含む）も照合する。ページ55件すべて成功。実行時に原本を読んで期待値を追随させない。
- **段階実装とコミット**: 骨格・Hero・目次から開始し、11セクションを原本順に各カテゴリーのRed実測・testコミット → 実装・累積原本照合exit 0・テスト成功・featコミットで移植。参考文献着手時に全文契約とブラウザー契約のRedを確認。サイト登録、原本アーカイブ、法的表示検査、ドキュメントも分離した。
- **操作とスタイリング**: 目次は既存の `useActiveHeading` を利用。重複する小見出しにも出現順で一意なidを付けた。モバイルのアンカー既定動作によるフォーカス喪失を検出し、アンカー移動後にスクロールを戻さずトグルへフォーカスを復帰するよう修正した。箇条書きはdisc、番号付きはdecimal、目次・参考文献はnone。原本CSSに合わせ、callout内のulは20px、olは24pxの字下げを保つ。図のレイアウトは共有MermaidDiagramへ委譲し、ページCSSでSVGの幅・高さを上書きしない。未定義CSS変数は0。
- **導線**: `ALL_GUIDES` の既存 `peoplecert` / `pc-prince2` にFoundationの次として追加。公開ガイド72→73、資格ガイド53→54、全ルート87→88。ホーム・種別ハブ・プログラムハブ・検索・ナビの現在地表示を契約で固定した。
- **ビルドなしの実ブラウザー検証**: 自前の開発サーバー（4183番）と一時Playwright設定を使用し、generateを実行しない。新規 `e2e/prince2-practitioner.spec.ts` の6件が成功。1440 / 1024 / 981 / 980 / 390pxで13図のSVG生成、全ノード文字、リスト記号・字下げ、calloutと表見出しの色、見出しサイズ、図の中央寄せ・列幅内への収まり、横方向のはみ出し、モバイル目次操作を検証。既存 `e2e/no-horizontal-scroll.spec.ts` も全88ルート×1440 / 1024 / 390pxで3件成功。静的生成成果物のE2Eは今回未実施。目視確認はユーザー担当。
- **検証結果**: 型検査と変更ファイルのlintは成功。全体lintの既存5エラーは `mop-foundation-guide.vue` の未使用定数1件と `itil-service-v5-guide.test.ts` の未使用import4件。対象外のファイルは改変していない。ユーザー承認後の再検証でユニット全2209件（98ファイル）が成功。ページ・法的表示・原本保存の対象67件、別ランナーの監査9件も成功。型検査・変更ファイルのlintと新ページのブラウザー6件を再実行し、すべて成功した。
- **原本保存**: HTML/Markdownを `archive/Prince2-7-practitioner-guide/` へ移動し、移動前後のSHA-256一致を2契約で固定した。`/archive/` はgitignore対象のため、この2ファイルを明示的にforce-addしてGit追跡を維持した。原本は書き換えていない。
  - `Prince2-7-practitioner-guide.html`: `d7234f1dd762cb8740ed8f19d9357493b475122b8d201279de3a13830bd1b081`
  - `Prince2-7-practitioner-guide.md`: `aa42a61c57b1455ccebe0a3105516ce20a3239a84a1be9f98dec1aaaf5d31a8e`
- **正当な構造差分**: CDNのアイコンをNuxt Icon、Mermaidの手動描画をClientOnly＋既存共有部品、DOMスクリプトの目次をVueの状態管理に置換。固定ヘッダー退避に共有CSS変数を使用し、固定列グリッドをauto-fitにした。原本の参考文献にあるh2→h4のスキップは文言・レベルを維持して共通契約の限定的な許容差分として固定した。
- **Markdown監査（情報提供）**: HTMLは見出し100・表169行、Markdownは見出し98・表170行で構造が異なる。Markdown監査はexit 1（見出し43、リスト12、表行7、段落19の照合差分、Mermaidは同数13だがソース差分あり）。HTML移行の正を変えず、両原本を不変保存した。
- **承認済み商標訂正・原本との差分**: 原本の参考文献末尾の免責段落に残っていた「AXELOS Limited」を、ユーザーの「対応進めて」（2026-10-19）に基づき、Nuxtと固定期待値の当該1箇所だけ「PeopleCert group」へ訂正した。アーカイブ原本2ファイルは変更せず、SHA-256の一致を再確認。`scripts/audit-prince2-practitioner.mjs` が原本の一時コピーの同じ段落1箇所だけを正規化して既存の全文監査を実行し、`npm run audit:prince2-practitioner` はexit 0。段落の全文・唯一性・参考文献の免責事項直下という位置を限定し、条件が変われば失敗する。一般監査スクリプトと法的表示検査を緩める変更は行っていない。
- **検査自体の修正**: 原本フッターの正しい英語表記 `registered trade mark` を既存検査が見落とす別問題をRedで再現し、`trademark` / `trade mark` / 日本語の商標表記を検出するよう修正した。正例3・負例3の追加契約が成功。権利者の検査・旧権利者の禁止表現チェックは維持した。

- **承認後のTDD**: 固定fixtureの商標権利者1箇所ずつを承認内容に合わせて更新し、ページ・法的表示の3件のRedと監査モジュール未実装のRedを実測して `692c6c3` で先にコミット。その後、ページの訂正・限定監査・npmコマンドを実装し、各ゲートの成功を確認して `3718b5e` で独立コミットした。進捗記録はさらに別コミットで同期する。
- **監査の回帰防止**: `npm run test:audit:prince2-practitioner`（Node test runner）で9件成功。承認済み段落以外の全バイト維持、対象段落の欠落・重複・位置違いの拒否、訂正済み実ページの監査成功、他段落の脱落拒否、免責段落の権利者以外の改変拒否、Mermaidソースの改変拒否を検証した。承認済み差分を理由に別の移行漏れを許容しない。

### §88. PRINCE2 Agile® Foundation (Version 2) のNuxt移行完了（2026-10-20）

- **移行先**: `app/pages/prince2-agile-foundation-version2.vue`（`/prince2-agile-foundation-version2`）。Hero、目次、原本の9セクション（Section 0〜8）、参考文献、免責フッターを完全転写。見出し50（H1: 1, H2: 9, H3: 29, H4: 11）、段落68、リスト項目46（原本42+4）、表23個・170行、外部リンク9、Mermaid 8、callout 51（practice: 27, source: 22, note: 2）、静的SVG 1が原本監査で一致し、`npm run audit:prince2-agile-foundation` は **exit 0**。
- **メインコンテンツ全幅化**: ユーザー指示に基づき、`.main-content` の `max-width` 制限を解除（`max-width: none;`）し、画面横幅いっぱいにコンテンツが広がるレイアウトを適用。
- **厳格なTDDと契約テスト**: 原本HTMLから抽出した固定リテラル（`EXPECTED_*`）を用いて `tests/pages/prince2-agile-foundation-version2.test.ts`（28件）を作成。全見出し・外部リンク・TOC・アンカー一意性・Mermaidソース・callout variant/ラベル・SEO・固有UI（4つのstat-card、23個のtable-wrap、disclaimer-box、フッター）を包括検証して Green を達成。
- **原本照合監査スクリプト**: `package.json` に `"audit:prince2-agile-foundation"` を追加し、継続的インテグレーションにおいて機械照合（exit 0）を担保。
- **原本保存**: HTML/Markdownを `archive/Prince2-agile-foundation-version2/` へ移動し、Git追跡を維持。
  - `Prince2-agile-foundation-version2.html`: `faefc0226980b21d508526c4402d12131959a658ccbfa3ac8b779dc10cc7ffb4`
  - `Prince2-agile-foundation-version2.md`: `af075372cd8ac772f9f96c2fcb45d940947ee4d2225f4dedecaebaf3fb727077`
- **法的表示**: フッターの登録商標表記を最新の正当権利者「PeopleCert group」に統一（`tests/legal-notices.test.ts` パス）。

### §89. PRINCE2 Agile® Practitioner (Version 2) のNuxt移行完了（2026-10-20）

- **移行先**: `app/pages/prince2-agile-practitioner-v2-study-guide.vue`（`/prince2-agile-practitioner-v2-study-guide`）。Hero、目次、原本の11セクション（Section 0〜10）および付録3セクション（付録A〜C）、参考文献、免責フッターを完全転写。見出し183（H1: 1, H2: 14, H3: 92, H4: 76）、段落106、リスト項目367、表68個・456行、外部リンク24、Mermaid 20、callout 40（warning: 20, tip: 12, note: 8）、静的SVG 1が原本監査で一致し、`npm run audit:prince2-agile-practitioner` は **exit 0**。
- **メインコンテンツ全幅化**: 既存方針に合わせ、`.main-content` の `max-width` 制限を解除（`max-width: none;`）し、画面横幅いっぱいにコンテンツが広がるレイアウトを適用。
- **Mermaid 20図の完全移植**: 20個のダイアグラム（Agile/PRINCE2関係、ロードマップ、Agilometer、Cynefinフレームワーク、5つのターゲット、5つのフォーカスエリア、6つのアスペクトトレランス、ガイダンスレベル、ロール構造、スクラムとPRINCE2の役割対応、チームマネジメント構造、デリバリーフロー、ワークショップ適用、コンテキストマップ、試験時間配分など）を `MermaidDiagram` コンポーネントおよび `ClientOnly` ラッパーを用いて完全再現。
- **厳格なTDDと契約テスト**: 原本HTMLから抽出した固定リテラル（`EXPECTED_*`）を用いて `tests/pages/prince2-agile-practitioner-v2-study-guide.test.ts`（28件）を作成。全見出し・外部リンク・TOC・アンカー一意性・Mermaidソース・callout variant/ラベル・SEO・固有UI（4つのstat-card、68個のtable-wrap、disclaimer-box、フッター）を包括検証して Green を達成。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `peoplecert`（PeopleCert 認定）のシリーズ `pc-prince2-agile`（PRINCE2 Agile）にガイド `/prince2-agile-practitioner-v2-study-guide` を追加登録。資格ガイド総数は 55 → 56 件となった。
- **原本照合監査スクリプト**: `package.json` に `"audit:prince2-agile-practitioner"` を追加し、継続的インテグレーションにおいて機械照合（exit 0）を担保。
- **原本保存**: HTML/Markdownを `archive/Prince2-agile-practitioner-v2-study-guide/` へ移動し、Git追跡を維持。
  - `Prince2-agile-practitioner-v2-study-guide.html`: `59d6862eada27019191e1e7e38143d1ddd3b175e8daa40f0df8055bc8f70707d`
  - `Prince2-agile-practitioner-v2-study-guide.md`: `da8ff8bf2cd19bc8c7d3eafe6a6d4d0e9d9012b140c20bcb93eb3e448c7d589c`
- **法的表示**: フッターの登録商標表記を最新の正当権利者「PeopleCert group」に統一（`tests/legal-notices.test.ts` パス）。

### §90. Professional Product Discovery and Validation (PPDV) のNuxt移行完了（2026-10-20）

- **移行先**: `app/pages/professional-product-discovery-and-validation.vue`（`/professional-product-discovery-and-validation`）。Hero、目次、原本の8章（第1章〜第8章）、参考文献、免責フッターを完全転写。見出し44（H1: 1, H2: 10, H3: 28, H4: 5）、段落66、リスト項目117、表8個・64行、外部リンク25、Mermaid 9、callout 12（practice: 4, source: 8）、静的SVG 1が原本監査で一致し、`npm run audit:ppdv` は **exit 0**。
- **Mermaid 9図の完全移植**: 9個のダイアグラム（Double Diamond、新規オンボーディング体験ジャーニーマップ、Impact Mapping、Curve of Truth、Build-Measure-Learnループ、Test Card/Learning Cardサイクル、EBMの4つのKey Value Areas、Problem-Solution FitからProduct-Market Fitへの段階、複数スプリントでのDiscoveryとDelivery並行進行）を `MermaidDiagram` コンポーネントおよび `ClientOnly` ラッパーを用いて完全再現。
- **厳格なTDDと契約テスト**: 原本HTMLから抽出した固定リテラルを用いて `tests/pages/professional-product-discovery-and-validation.test.ts`（29件）を作成。全見出し・外部リンク・TOC・アンカー一意性・Mermaidソース・callout variant/ラベル・stepタグ・キッカー・SEO・固有UI（4つのstat-card、disclaimer-box、フッター、このガイドの読み方の章ナビカード、第8章のstep-item・exam-strategy-card・exam-practical-item、参考文献セクションのref-group・ref-itemカード）を包括検証して Green を達成。
- **カタログ体系への追加**: `app/utils/guide-catalog.ts` の既存種別 `certifications`（資格）配下のプログラム `scrum-org`（Scrum.org 認定）のシリーズ `so-product-owner`（Product Owner）にガイド `/professional-product-discovery-and-validation` を追加登録。資格ガイド総数は 56 → 57 件となった。
- **原本照合監査スクリプト**: `package.json` に `"audit:ppdv"` を追加し、継続的インテグレーションにおいて機械照合（exit 0）を担保。
- **原本保存**: HTML/Markdownを `archive/Professional-Product-Discovery-and-Validation/` へ移動し、Git追跡を維持。
  - `Professional-Product-Discovery-and-Validation.html`: `47e4e113b6f9a8be3eaef3cdd92649da83f2ff832dcf5e1f70949811b37456a9`
  - `Professional-Product-Discovery-and-Validation.md`: `bad4996bd2e11940352a6d5e235ebb0f2429ea3172838483e3dbb82af867490d`
- **法的表示**: フッターに Scrum.org 商標帰属文言を追加（`tests/legal-notices.test.ts` パス）。
- **メインコンテンツ全幅化**: ユーザー指示に基づき、`.main-content` の `max-width` 制限を解除（`max-width: none;`、`padding: 48px 64px 96px;`）し、画面横幅いっぱいにコンテンツが広がるレイアウトを適用。
- **第8章（試験対策の進め方）のデザインブラッシュアップ**: 8.1 学習ステップを縦型タイムラインコネクタ付きの `.step-item` カードに整形（`<ol>` 既定マーカーとの二重採番を解消）、8.2 出題傾向への向き合い方をリードボックス（`.exam-trend-lead`）とアイコン付き3列対策カードグリッド（`.exam-strategy-grid` / `.exam-strategy-card`）に刷新、8.3 受験の実務情報をアイコン付き実務カードリスト（`.exam-practical-list` / `.exam-practical-item`）に整備。
- **参考文献・ソース一覧（`#references`）のデザインブラッシュアップ**: 3つのカテゴリグループ（公式ソース / 認定研修パートナー / 原典・一次情報源）ごとに色分けされたアイコン付きヘッダー（`.ref-group-header`）を設け、全20件のリンクを左アクセントボーダー・外部リンクアイコン付きのカード（`.ref-item`）に整形してタイトル（`.ref-name`）とURL（`.ref-url`）の改行・視認性を改善。
- **このガイドの読み方（`#how-to-use`）のデザインブラッシュアップ**: 導入文を左インディゴボーダー付きのリードボックス（`.guide-intro-lead`）に整形し、9つの章構成リストをサイドバーTOCと同じアイコン付き・ページ内アンカー付きのレスポンシブカードグリッド（`.guide-chapter-grid` / `.guide-chapter-card`）に刷新（`<ol>` 既定マーカーと「第N章」の二重採番を解消）、末尾の学習ヒントをゴールド基調のバナー（`.guide-outro-banner`）に整備。
