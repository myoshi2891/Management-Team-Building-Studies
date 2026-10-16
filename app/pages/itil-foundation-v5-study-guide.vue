<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useSeoMeta } from "#imports";
import { useActiveHeading } from "~/composables/useActiveHeading";

useSeoMeta({
  title: "ITIL Foundation (Version 5) 完全学習ガイド | 初学者のためのステップ・バイ・ステップ解説",
  description: "PeopleCert公式シラバスv5.0に準拠したITIL Foundation (Version 5) の完全学習ガイド。7カテゴリー40問の出題範囲を初学者向けに詳細解説し、各項目のベストプラクティスと出典URLを掲載。",
});

const TOC_SECTIONS = [
  { id: "how-to-use", label: "このガイドの使い方", icon: "tabler:route" },
  { id: "exam-blueprint", label: "出題配点マップ", icon: "tabler:chart-pie" },
  { id: "key-terms", label: "第1章 主要用語と定義", icon: "tabler:clipboard-text" },
  { id: "four-dimensions", label: "第2章 4つの側面", icon: "tabler:building-bank" },
  { id: "product-service-lifecycle", label: "第3章 製品・サービスライフサイクル", icon: "tabler:refresh" },
  { id: "value-system", label: "第4章 ITILバリューシステム", icon: "tabler:certificate" },
  { id: "value-streams", label: "第5章 バリューストリーム", icon: "tabler:timeline" },
  { id: "itil-and-ai", label: "第6章 ITILとAI", icon: "tabler:file-text" },
  { id: "other-frameworks", label: "第7章 他フレームワークとの関係", icon: "tabler:git-branch" },
  { id: "exam-strategy", label: "第8章 出題形式と学習計画", icon: "tabler:list-check" },
  { id: "glossary", label: "付録A 用語集", icon: "tabler:book-2" },
  { id: "management-practices", label: "付録B マネジメントプラクティス", icon: "tabler:clipboard-check" },
  { id: "references", label: "付録C 出典・参考文献", icon: "tabler:link" },
] as const;

const sidebarOpen = ref(false);
const sidebarToggle = ref<HTMLButtonElement | null>(null);

function closeSidebar(): void {
  const wasOpen = sidebarOpen.value;
  sidebarOpen.value = false;
  if (wasOpen) nextTick(() => sidebarToggle.value?.focus());
}

const activeId = useActiveHeading(TOC_SECTIONS.map((s) => s.id));
</script>

<template>
  <div class="layout">
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <button
      ref="sidebarToggle"
      type="button"
      class="sidebar-toggle"
      data-testid="sidebar-toggle"
      aria-label="目次を開閉する"
      aria-controls="sidebar"
      :aria-expanded="sidebarOpen ? 'true' : 'false'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="tabler:menu-2" aria-hidden="true" />
    </button>

    <nav class="sidebar" id="sidebar" :class="{ open: sidebarOpen }" aria-label="目次">
      <div class="sidebar-brand">
        <svg class="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#B8802A" stroke-width="1.4"/>
          <circle cx="20" cy="20" r="13" stroke="#B8802A" stroke-width="1"/>
          <path d="M14 20.5L18 24.5L26 15.5" stroke="#2E3F72" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="brand-text">
          <div class="brand-title">ITIL Foundation® 完全ガイド</div>
          <div class="brand-subtitle">PeopleCert Version 5</div>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li v-for="s in TOC_SECTIONS" :key="s.id">
          <a
            :href="`#${s.id}`"
            :class="{ active: activeId === s.id }"
            @click="closeSidebar"
          >
            <Icon :name="s.icon" aria-hidden="true" />
            {{ s.label }}
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <div class="hero">
        <div class="hero-eyebrow">
          <Icon name="tabler:award" aria-hidden="true" />
          <span>PeopleCert公式シラバス v5.0 準拠</span>
        </div>
        <h1>ITIL Foundation (Version 5) 完全学習ガイド</h1>
        <p class="hero-lede">
          本ガイドは、PeopleCert 社が2026年2月に公開した<strong>ITIL&reg; Foundation (Version 5)</strong>公式シラバス(Syllabus v5.0)の7カテゴリー・40問構成に完全準拠し、各出題項目を初学者にもわかりやすい日本語で詳細に解説したものです。英語の専門用語(Product、Service、Value Chain など)はITIL用語として定着しているため、日本語訳と併記する形で原文のまま残しています。
        </p>

        <div class="stat-row">
          <div class="stat-card"><div class="stat-number">40問</div><div class="stat-label">4択客観式(Objective Test)</div></div>
          <div class="stat-card"><div class="stat-number">60分</div><div class="stat-label">非母国語受験者は75分</div></div>
          <div class="stat-card"><div class="stat-number">65%</div><div class="stat-label">合格ライン(26/40問・減点なし)</div></div>
          <div class="stat-card"><div class="stat-number">7カテゴリー</div><div class="stat-label">PeopleCert公式シラバスv5.0準拠</div></div>
        </div>

        <div class="disclaimer-box">
          <Icon name="tabler:info-circle" aria-hidden="true" />
          <span>本ガイドは公開情報をもとに作成した非公式の学習補助教材です。ITIL Foundation (Version 5) は2026年2月にリリースされたばかりの新しい認定のため、試験直前には必ず<a href="https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154" target="_blank" rel="noopener">PeopleCert公式サイト</a>で最新情報をご確認ください。</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: block;
}

/* ===================== Sidebar ===================== */
.sidebar {
  position: fixed;
  top: var(--global-nav-height);
  left: 0;
  width: 288px;
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

.seal {
  flex: none;
  width: 36px;
  height: 36px;
}

.brand-text .brand-title {
  font-family: var(--font-display, serif);
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

.sidebar-nav li {
  margin: 2px 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-ink-soft);
  font-size: 16px;
  line-height: 1.4;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sidebar-nav a:hover {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
}

.sidebar-nav a.active {
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  font-weight: 600;
}

.sidebar-nav a :deep(.iconify),
.sidebar-nav a :deep(svg) {
  font-size: 17px;
  flex: none;
}

.sidebar-overlay {
  display: none;
}

.sidebar-toggle {
  display: none;
}

/* ===================== Main content ===================== */
.main-content {
  margin-left: 288px;
  padding: 48px 56px 96px;
  max-width: 960px;
}

/* ===================== Hero ===================== */
.hero {
  margin-bottom: 56px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--color-border);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: var(--color-indigo-tint);
  color: var(--color-indigo);
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 16px;
}

.hero-eyebrow :deep(.iconify),
.hero-eyebrow :deep(svg) {
  font-size: 16px;
}

h1 {
  font-family: var(--font-display, serif);
  font-size: 36px;
  line-height: 1.25;
  color: var(--color-ink);
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  font-weight: 700;
}

.hero-lede {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-ink-soft);
  margin: 0 0 28px;
}

/* ===================== Stat row ===================== */
.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 28px 0;
}

.stat-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px 20px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 27, 38, 0.05);
}

.stat-number {
  font-family: var(--font-display, serif);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-indigo);
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  color: var(--color-ink-faint);
  margin-top: 4px;
}

/* ===================== Disclaimer Box ===================== */
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

/* ===================== Sections ===================== */
:is(h2, h3, h4) {
  scroll-margin-top: calc(var(--global-nav-height) + 32px);
}

section {
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-indigo);
  margin-bottom: 8px;
}

.section-eyebrow :deep(.iconify),
.section-eyebrow :deep(svg) {
  font-size: 16px;
}

h2 {
  font-family: var(--font-display, serif);
  font-size: 24px;
  line-height: 1.35;
  color: var(--color-ink);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-ink);
  font-weight: 700;
}

h3 {
  font-size: 18px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 32px 0 12px;
  font-weight: 700;
}

h4 {
  font-size: 16px;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 24px 0 8px;
  font-weight: 700;
}

p {
  margin: 0 0 16px;
}

/* Lists styling */
ul {
  list-style-type: disc;
  margin: 0 0 20px 24px;
  padding: 0;
}

ol {
  list-style-type: decimal;
  margin: 0 0 20px 24px;
  padding: 0;
}

li {
  margin-bottom: 8px;
  line-height: 1.65;
}

/* Tables styling */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  background: var(--color-paper-raised);
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

th {
  background: var(--color-paper-sunken);
  color: var(--color-ink);
  font-weight: 600;
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

/* Diagrams */
.diagram-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px 20px;
  margin: 24px 0;
}

.diagram-caption {
  font-size: 16px;
  color: var(--color-ink-faint);
  text-align: center;
  margin-top: 12px;
}

.mermaid-wrap {
  width: 100%;
}

/* Callouts */
.callout {
  border-radius: 10px;
  padding: 20px 24px;
  margin: 24px 0;
  border-left: 4px solid var(--color-indigo);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-border);
}

.callout.practice {
  border-left: 4px solid var(--color-gold);
  background: var(--color-gold-tint);
  border-color: #ECD8B5;
}

.callout.note {
  border-left: 4px solid var(--color-indigo);
  background: var(--color-indigo-tint);
  border-color: var(--color-info-border);
}

.callout.warning {
  border-left: 4px solid var(--color-plum);
  background: var(--color-plum-tint);
  border-color: #E6CCD7;
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.callout.practice .callout-title {
  color: var(--color-gold);
}

.callout.note .callout-title {
  color: var(--color-indigo);
}

.callout.warning .callout-title {
  color: var(--color-plum);
}

.callout-title :deep(.iconify),
.callout-title :deep(svg) {
  font-size: 18px;
}

/* ===================== Responsive ===================== */
@media (max-width: 980px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 15;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-indigo);
    color: #fff;
    border: none;
    box-shadow: 0 4px 16px rgba(46, 63, 114, 0.35);
    z-index: 30;
    cursor: pointer;
  }

  .sidebar-toggle :deep(.iconify),
  .sidebar-toggle :deep(svg) {
    font-size: 22px;
  }

  .main-content {
    margin-left: 0;
    padding: 32px 20px 80px;
  }
}
</style>
