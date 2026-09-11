<script setup lang="ts">
import { computed } from "#imports";
import { findKind, programGroup, seriesCardLabel } from "~/utils/guide-catalog";

/*
 * プログラム単位のハブページ本体（/certifications/pmi など）。
 *
 * グローバルナビはガイドを列挙しないため、**全ガイドの到達可能性はこのページが担う**。
 * 登録漏れの検知は tests/components/GuideProgramHub.test.ts が
 * 「全プログラムを合わせると GUIDES と一致する」形で固定している。
 */
const props = defineProps<{ programId: string }>();

// 未定義の ID は programGroup() が例外にする。ここで握りつぶすと空のハブが黙って出る。
const group = computed(() => programGroup(props.programId));
const kind = computed(() => findKind(group.value.program.kindId));
</script>

<template>
  <div class="hub-page">
    <header class="hub-heading">
      <nav class="hub-breadcrumb" data-testid="hub-breadcrumb" aria-label="パンくずリスト">
        <NuxtLink to="/">ホーム</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink :to="kind.to">{{ kind.navLabel }}</NuxtLink>
      </nav>
      <p class="section-kicker">{{ group.program.cardLabel }}</p>
      <h1>{{ group.program.navLabel }}</h1>
      <p class="hub-summary" data-testid="hub-summary">{{ group.program.summary }}</p>
      <p class="hub-count" data-testid="hub-count">{{ group.guides.length }} ガイド</p>
    </header>

    <section
      v-for="column in group.seriesGroups"
      :key="column.series.id"
      class="hub-series"
      data-testid="hub-series"
      :aria-labelledby="`hub-series-${column.series.id}`"
    >
      <div class="hub-series-heading">
        <p class="section-kicker">{{ column.series.cardLabel }}</p>
        <h2 :id="`hub-series-${column.series.id}`">{{ column.series.navLabel }}</h2>
      </div>

      <div class="guide-grid">
        <GuideCard
          v-for="guide in column.guides"
          :key="guide.to"
          :guide="guide"
          :label="seriesCardLabel(guide.seriesId)"
          heading-level="h3"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hub-page { width: min(1180px, calc(100% - 48px)); margin-inline: auto; padding-block: 78px 110px; }

.hub-heading { max-width: 720px; margin-bottom: 58px; }
.hub-breadcrumb { display: flex; align-items: center; gap: 10px; margin-bottom: 26px; color: var(--color-ink-faint); font-size: 12px; }
.hub-heading h1 { margin: 0 0 18px; padding: 0; border: 0; font-size: clamp(32px, 4vw, 44px); line-height: 1.35; }
.section-kicker { margin: 0 0 10px; color: var(--color-gold); font-size: 11px; font-weight: 700; letter-spacing: 0.18em; }
.hub-summary { margin: 0 0 14px; color: var(--color-ink-soft); font-size: 15px; line-height: 1.85; }
.hub-count { margin: 0; color: var(--color-ink-faint); font-size: 12px; letter-spacing: 0.08em; }

.hub-series + .hub-series { margin-top: 58px; }
.hub-series-heading { display: flex; align-items: baseline; gap: 16px; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid var(--color-border); }
.hub-series-heading .section-kicker { margin: 0; }
.hub-series-heading h2 { margin: 0; padding: 0; border: 0; font-size: 21px; line-height: 1.4; }

/* 配置だけを担当する。カードの意匠は GuideCard.vue が持つ。 */
.guide-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; }
.guide-grid :deep(.guide-card) { grid-column: span 4; }

@media (max-width: 960px) {
  .guide-grid :deep(.guide-card) { grid-column: span 6; }
}

@media (max-width: 720px) {
  .hub-page { width: min(100% - 32px, 1180px); padding-block: 58px 84px; }
  .hub-series-heading { flex-wrap: wrap; gap: 6px 14px; }
  .guide-grid :deep(.guide-card) { grid-column: 1 / -1; }
}
</style>
