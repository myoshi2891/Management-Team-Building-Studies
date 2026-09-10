<script setup lang="ts">
import type { Guide } from "~/utils/guide-catalog";

/*
 * ホームとハブページが共有するガイドカード。
 *
 * マークアップと意匠の正はこのコンポーネント 1 つに置く。
 * 呼び出し側それぞれでカードを書くと、片方だけ直したときに意匠が分裂する
 * （図解レイアウトで実際に起きた失敗。app/components/MermaidDiagram.vue と同じ方針）。
 *
 * グリッド上の配置（grid-column）は呼び出し側の関心なので、ここでは持たない。
 * 親の scoped CSS は子のルート要素へ届くため、配置は呼び出し側の .guide-card 指定で決まる。
 */
withDefaults(defineProps<{
  guide: Guide;
  /** カード上部の小さなラベル。ホームはプログラム表記、ハブはシリーズ表記を渡す。 */
  label: string;
  /**
   * 見出しレベル。呼び出し側の見出し階層に合わせて指定する
   * （ホームは h3 セクション配下なので h4、ハブは h2 シリーズ配下なので h3）。
   * 固定にすると、どちらか一方で見出し階層がスキップする。
   */
  headingLevel?: "h3" | "h4";
}>(), { headingLevel: "h3" });
</script>

<template>
  <article class="guide-card" :class="`guide-card-${guide.accent}`" data-testid="guide-card">
    <NuxtLink :to="guide.to" :aria-label="`${guide.title}を読む`">
      <div class="guide-card-top">
        <span class="guide-icon"><Icon :name="guide.icon" aria-hidden="true" /></span>
        <span class="guide-meta">{{ guide.meta }}</span>
      </div>
      <p class="guide-category">{{ label }}</p>
      <component :is="headingLevel" class="guide-card-title">{{ guide.title }}</component>
      <p class="guide-description">{{ guide.description }}</p>
      <span class="guide-link">ガイドを読む <Icon name="tabler:arrow-up-right" aria-hidden="true" /></span>
    </NuxtLink>
  </article>
</template>

<style scoped>
.guide-card { min-height: 378px; border: 1px solid var(--color-border); background: var(--color-paper-raised); }
.guide-card > a { position: relative; height: 100%; display: flex; flex-direction: column; padding: 31px 32px 27px; color: var(--color-ink); overflow: hidden; }
.guide-card > a::after { content: ""; position: absolute; inset: auto 0 0; height: 4px; background: var(--card-accent, var(--color-indigo)); transform: scaleX(0); transform-origin: left; transition: transform 220ms ease; }
.guide-card > a:hover { text-decoration: none; }
.guide-card > a:hover::after { transform: scaleX(1); }
.guide-card > a:hover .guide-link svg { transform: translate(3px, -3px); }
.guide-card-indigo { --card-accent: var(--color-indigo); }
.guide-card-gold { --card-accent: var(--color-gold); }
.guide-card-forest { --card-accent: var(--color-forest); }
.guide-card-plum { --card-accent: var(--color-plum); }
.guide-card-top { display: flex; justify-content: space-between; align-items: start; margin-bottom: 47px; }
.guide-icon { width: 49px; height: 49px; display: grid; place-items: center; border-radius: 50%; background: var(--color-indigo-tint); color: var(--color-indigo); }
.guide-card-gold .guide-icon { background: var(--color-gold-tint); color: var(--color-gold); }
.guide-card-forest .guide-icon { background: var(--color-forest-tint); color: var(--color-forest); }
.guide-card-plum .guide-icon { background: var(--color-plum-tint); color: var(--color-plum); }
.guide-icon svg { width: 23px; height: 23px; }
.guide-meta { color: var(--color-ink-faint); font-size: 11px; }
.guide-category { margin: 0 0 12px; color: var(--card-accent, var(--color-gold)); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; }
/*
 * 見出しはレベルが可変なので、要素セレクタではなくクラスで当てる
 * （h3/h4 のどちらで描いても同じ見た目になる必要がある）。
 */
.guide-card-title { margin: 0 0 17px; padding: 0; border: 0; font-family: var(--font-display); font-size: 23px; font-weight: 600; line-height: 1.5; }
.guide-description { margin: 0 0 26px; color: var(--color-ink-soft); font-size: 13px; line-height: 1.85; }
.guide-link { display: flex; align-items: center; gap: 8px; margin-top: auto; color: var(--card-accent); font-size: 12px; font-weight: 700; }
.guide-link svg { width: 16px; transition: transform 180ms ease; }

@media (max-width: 720px) {
  .guide-card { min-height: 350px; }
}
</style>
