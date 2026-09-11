<script setup lang="ts">
import { computed } from "#imports";
import { GUIDES, findKind, programsOfKind } from "~/utils/guide-catalog";

/*
 * 種別インデックス（/certifications など）。
 * その種別に属するハブ（プログラム）の一覧を出す、ナビのパネルの拡大版。
 */
const props = defineProps<{ kindId: string }>();

// 未定義の ID は findKind() が例外にする。
const kind = computed(() => findKind(props.kindId));

const programs = computed(() =>
  programsOfKind(kind.value.id).map((program) => ({
    ...program,
    // 件数はカタログから導出する。手書きするとガイドが増えるたびに静かにずれる。
    count: GUIDES.filter((guide) => guide.programId === program.id).length,
  })),
);

const total = computed(() => programs.value.reduce((sum, program) => sum + program.count, 0));
</script>

<template>
  <div class="hub-page">
    <header class="hub-heading">
      <nav class="hub-breadcrumb" data-testid="hub-breadcrumb" aria-label="パンくずリスト">
        <NuxtLink to="/">ホーム</NuxtLink>
      </nav>
      <p class="section-kicker">{{ kind.cardLabel }}</p>
      <h1>{{ kind.navLabel }}</h1>
      <p class="hub-summary" data-testid="hub-summary">{{ kind.summary }}</p>
      <p class="hub-count" data-testid="hub-count">{{ total }} ガイド</p>
    </header>

    <div class="program-grid">
      <article v-for="program in programs" :key="program.id" class="program-card" data-testid="program-card">
        <NuxtLink :to="program.to" :aria-label="`${program.navLabel}のガイド一覧を見る`">
          <span class="program-icon"><Icon :name="program.icon" aria-hidden="true" /></span>
          <h2>{{ program.navLabel }}</h2>
          <p class="program-summary">{{ program.summary }}</p>
          <span class="program-count" data-testid="program-card-count">{{ program.count }} ガイド</span>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<style scoped>
.hub-page { width: min(1180px, calc(100% - 48px)); margin-inline: auto; padding-block: 78px 110px; }

.hub-heading { max-width: 720px; margin-bottom: 52px; }
.hub-breadcrumb { display: flex; align-items: center; gap: 10px; margin-bottom: 26px; color: var(--color-ink-faint); font-size: 12px; }
.hub-heading h1 { margin: 0 0 18px; padding: 0; border: 0; font-size: clamp(32px, 4vw, 44px); line-height: 1.35; }
.section-kicker { margin: 0 0 10px; color: var(--color-gold); font-size: 11px; font-weight: 700; letter-spacing: 0.18em; }
.hub-summary { margin: 0 0 14px; color: var(--color-ink-soft); font-size: 15px; line-height: 1.85; }
.hub-count { margin: 0; color: var(--color-ink-faint); font-size: 12px; letter-spacing: 0.08em; }

.program-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; }
.program-card { grid-column: span 4; border: 1px solid var(--color-border); background: var(--color-paper-raised); }
.program-card > a { position: relative; height: 100%; display: flex; flex-direction: column; padding: 30px 30px 26px; color: var(--color-ink); }
.program-card > a:hover { text-decoration: none; }
.program-card > a::after { content: ""; position: absolute; inset: auto 0 0; height: 4px; background: var(--color-indigo); transform: scaleX(0); transform-origin: left; transition: transform 220ms ease; }
.program-card > a:hover::after { transform: scaleX(1); }
.program-icon { width: 46px; height: 46px; display: grid; place-items: center; margin-bottom: 28px; border-radius: 50%; background: var(--color-indigo-tint); color: var(--color-indigo); }
.program-icon svg { width: 22px; height: 22px; }
.program-card h2 { margin: 0 0 12px; padding: 0; border: 0; font-family: var(--font-display); font-size: 21px; font-weight: 600; line-height: 1.45; }
.program-summary { margin: 0 0 22px; color: var(--color-ink-soft); font-size: 13px; line-height: 1.8; }
.program-count { margin-top: auto; color: var(--color-ink-faint); font-size: 12px; letter-spacing: 0.08em; }

@media (max-width: 960px) {
  .program-card { grid-column: span 6; }
}

@media (max-width: 720px) {
  .hub-page { width: min(100% - 32px, 1180px); padding-block: 58px 84px; }
  .program-card { grid-column: 1 / -1; }
}
</style>
