<script setup lang="ts">
import { useSeoMeta } from "#imports";

const guides = [
  {
    to: "/capm",
    category: "PROJECT MANAGEMENT",
    title: "CAPM® 認定資格 完全ガイド",
    description: "PMI公式情報をもとに、受験資格・4つの出題領域・学習計画までを一つの流れで理解できます。",
    meta: "15セクション",
    icon: "tabler:certificate",
    accent: "indigo",
  },
  {
    to: "/certified-associate-in-project-management-domain1",
    category: "PROJECT MANAGEMENT",
    title: "CAPM® ドメイン1: プロジェクトマネジメント基礎と主要概念",
    description: "PMI公式CAPM Exam Content Outlineに基づく、ドメイン1(PM基礎と主要概念・配点36%)の初学者向け解説ガイド。",
    meta: "9セクション",
    icon: "tabler:award",
    accent: "gold",
  },
  {
    to: "/engineering-management-career-path",
    category: "ENGINEERING MANAGEMENT",
    title: "エンジニアのためのマネジメントキャリアパス",
    description: "テックリードからCTOまで。役割の違いと、マネージャーとしての最初の90日を体系的に学びます。",
    meta: "12セクション",
    icon: "tabler:route",
    accent: "forest",
  },
  {
    to: "/engineering-team-leadership-guide",
    category: "ENGINEERING LEADERSHIP",
    title: "エンジニアリングチームのリード術 完全ガイド",
    description: "効果的なチーム作りの科学的根拠から、1on1、委譲、コードレビュー文化まで、実践できるベストプラクティスを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:users-group",
    accent: "plum",
  },
  {
    to: "/engineering-manager-guide",
    category: "ENGINEERING MANAGEMENT",
    title: "エンジニアリングマネージャー入門完全ガイド",
    description: "James Stanier著『Become an Effective Software Engineering Manager』を主軸に、新任EMのスタートダッシュから心理的安全性、AI時代の役割まで体系的に学びます。",
    meta: "14セクション",
    icon: "tabler:school",
    accent: "indigo",
  },
  {
    to: "/dynamic-reteaming-guide",
    category: "TEAM BUILDING",
    title: "ダイナミック・リチーミング実践ガイド",
    description: "Heidi Helfand著『Dynamic Reteaming』に基づく、チームのエコサイクル、5つの基本パターン、実践ステップとアンチパターンを体系的に学びます。",
    meta: "11セクション",
    icon: "tabler:refresh",
    accent: "forest",
  },
] as const;

const learningThemes = [
  { number: "01", title: "体系的に理解する", description: "点在する知識を、全体像から詳細へ進む一貫したストーリーに整理します。", icon: "tabler:books" },
  { number: "02", title: "実務の判断に活かす", description: "用語の暗記で終わらず、現場の状況に応じて選択するための視点を育てます。", icon: "tabler:bulb" },
  { number: "03", title: "次のキャリアを描く", description: "資格や役職を目的にせず、自分らしい成長への道筋として捉え直します。", icon: "tabler:chart-arrows-vertical" },
] as const;

useSeoMeta({
  title: "Management Studies | マネジメント学習ガイド",
  description: "プロジェクトマネジメントとエンジニアリングマネジメントを、体系的かつ実践的に学べるガイドライブラリ。",
});
</script>

<template>
  <div class="home-page">
    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-glow hero-glow-one" aria-hidden="true" />
        <div class="hero-glow hero-glow-two" aria-hidden="true" />
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="hero-eyebrow"><span />MANAGEMENT LEARNING LIBRARY</p>
            <h1 id="hero-title">マネジメントを、<br><em>実践できる知識</em>に。</h1>
            <p class="hero-lede">資格取得からキャリアの選択まで。信頼できる情報を、理解しやすい学習ガイドとして届けます。</p>
            <a class="hero-cta" href="#guides">ガイドを見つける <Icon name="tabler:arrow-down" aria-hidden="true" /></a>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="visual-grid" />
            <div class="orbit orbit-large" />
            <div class="orbit orbit-small" />
            <div class="visual-center"><span>KNOWLEDGE</span><strong>理解</strong><small>から実践へ</small></div>
            <div class="visual-note note-one"><i />LEARN</div>
            <div class="visual-note note-two"><i />LEAD</div>
            <div class="visual-note note-three"><i />GROW</div>
          </div>
        </div>
      </section>

      <section id="guides" class="guide-section" aria-labelledby="guide-title">
        <div class="section-heading">
          <div><p class="section-kicker">CURATED GUIDES</p><h2 id="guide-title">公開中のガイド</h2></div>
          <p>関心のあるテーマから、学びを始めましょう。</p>
        </div>

        <div class="guide-grid">
          <article v-for="guide in guides" :key="guide.to" class="guide-card" :class="`guide-card-${guide.accent}`" data-testid="guide-card">
            <NuxtLink :to="guide.to" :aria-label="`${guide.title}を読む`">
              <div class="guide-card-top">
                <span class="guide-icon"><Icon :name="guide.icon" aria-hidden="true" /></span>
                <span class="guide-meta">{{ guide.meta }}</span>
              </div>
              <p class="guide-category">{{ guide.category }}</p>
              <h3>{{ guide.title }}</h3>
              <p class="guide-description">{{ guide.description }}</p>
              <span class="guide-link">ガイドを読む <Icon name="tabler:arrow-up-right" aria-hidden="true" /></span>
            </NuxtLink>
          </article>

          <div class="guide-card guide-card-coming">
            <div class="coming-icon"><Icon name="tabler:plus" aria-hidden="true" /></div>
            <p class="guide-category">MORE TO COME</p>
            <h3>学びの領域を<br>拡張していきます</h3>
            <p>チームビルディング、組織設計、リーダーシップなどのガイドを順次追加予定です。</p>
          </div>
        </div>
      </section>

      <section id="approach" class="approach-section" aria-labelledby="approach-title">
        <div class="approach-intro">
          <p class="section-kicker">OUR APPROACH</p>
          <h2 id="approach-title">知識を、現場で使える形へ</h2>
          <p>一つひとつのガイドは、読むだけで終わらない学びを目指して設計しています。</p>
        </div>
        <div class="theme-list">
          <article v-for="theme in learningThemes" :key="theme.number" class="theme-item">
            <span class="theme-number">{{ theme.number }}</span>
            <span class="theme-icon"><Icon :name="theme.icon" aria-hidden="true" /></span>
            <div><h3 data-testid="learning-theme">{{ theme.title }}</h3><p>{{ theme.description }}</p></div>
          </article>
        </div>
      </section>

      <section class="closing-message" aria-label="学習を始める">
        <div><p class="section-kicker">START YOUR JOURNEY</p><p class="closing-title">次の一歩は、<br>理解することから始まる。</p></div>
        <a href="#guides">公開中のガイドを見る <Icon name="tabler:arrow-up" aria-hidden="true" /></a>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-mark" aria-hidden="true">M</span>
          <p><strong>Management Studies</strong><br><span>よりよいチームをつくるための学習ライブラリ</span></p>
        </div>
        <nav aria-label="フッターナビゲーション">
          <NuxtLink to="/capm">CAPM</NuxtLink>
          <NuxtLink to="/engineering-management-career-path">EM Career</NuxtLink>
          <NuxtLink to="/engineering-team-leadership-guide">Team Lead</NuxtLink>
          <NuxtLink to="/engineering-manager-guide">EM Guide</NuxtLink>
        </nav>
        <small>© 2026 Management Studies</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-page { min-height: 100vh; overflow: hidden; background: var(--color-paper); }
.hero-inner, .guide-section, .approach-section, .closing-message, .footer-inner { width: min(1180px, calc(100% - 48px)); margin-inline: auto; }
.brand-mark { width: 39px; height: 39px; display: grid; place-items: center; border: 1px solid var(--color-gold); border-radius: 50%; color: var(--color-indigo-dark); font-family: var(--font-display); font-size: 20px; font-weight: 700; line-height: 1; }
.site-footer nav { display: flex; align-items: center; gap: 32px; }
.site-footer nav a { color: var(--color-ink-soft); font-size: 13px; font-weight: 600; letter-spacing: 0.04em; }

.hero { position: relative; min-height: 650px; display: grid; align-items: center; background: linear-gradient(135deg, #f7f8fa 0%, #f2f4f8 52%, #f7f6f2 100%); }
.hero::after { content: ""; position: absolute; inset: auto 0 0; height: 1px; background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent); }
.hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(390px, 0.92fr); align-items: center; gap: 72px; padding-block: 84px 92px; }
.hero-eyebrow, .section-kicker { margin: 0 0 22px; color: var(--color-gold); font-size: 11px; font-weight: 700; letter-spacing: 0.18em; }
.hero-eyebrow { display: flex; align-items: center; gap: 12px; }
.hero-eyebrow span { width: 34px; height: 1px; background: var(--color-gold); }
.hero h1 { max-width: 700px; margin: 0; color: var(--color-ink); font-family: var(--font-display); font-size: clamp(48px, 5.4vw, 76px); font-weight: 600; line-height: 1.2; letter-spacing: -0.045em; }
.hero h1 em { color: var(--color-indigo); font-style: normal; }
.hero-lede { max-width: 580px; margin: 30px 0 34px; color: var(--color-ink-soft); font-size: 17px; line-height: 2; }
.hero-cta { display: inline-flex; align-items: center; gap: 28px; min-height: 50px; padding: 0 20px 0 22px; border: 1px solid var(--color-indigo); color: var(--color-indigo-dark); font-size: 13px; font-weight: 700; letter-spacing: 0.05em; transition: color 180ms ease, background 180ms ease, transform 180ms ease; }
.hero-cta:hover { background: var(--color-indigo); color: white; text-decoration: none; transform: translateY(-2px); }
.hero-cta svg { width: 17px; height: 17px; }
.hero-visual { position: relative; width: min(100%, 470px); aspect-ratio: 1; justify-self: end; }
.visual-grid { position: absolute; inset: 10%; opacity: 0.46; background-image: linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px); background-size: 35px 35px; mask-image: radial-gradient(circle, black, transparent 68%); }
.orbit { position: absolute; border: 1px solid rgba(46, 63, 114, 0.2); border-radius: 50%; }
.orbit::before { content: ""; position: absolute; width: 7px; height: 7px; border-radius: 50%; background: var(--color-gold); box-shadow: 0 0 0 6px var(--color-gold-tint); }
.orbit-large { inset: 5%; animation: orbit 34s linear infinite; }
.orbit-large::before { top: 15%; right: 11%; }
.orbit-small { inset: 20%; border-color: rgba(27, 110, 106, 0.25); animation: orbit 26s linear infinite reverse; }
.orbit-small::before { bottom: 8%; left: 22%; background: var(--color-forest); box-shadow: 0 0 0 6px var(--color-forest-tint); }
.visual-center { position: absolute; inset: 31%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--color-border-strong); border-radius: 50%; background: rgba(255, 255, 255, 0.88); box-shadow: 0 26px 70px rgba(31, 44, 87, 0.12); }
.visual-center span { color: var(--color-gold); font-size: 8px; font-weight: 700; letter-spacing: 0.18em; }
.visual-center strong { margin-top: 7px; font-family: var(--font-display); font-size: 34px; }
.visual-center small { color: var(--color-ink-faint); font-size: 11px; letter-spacing: 0.12em; }
.visual-note { position: absolute; display: flex; align-items: center; gap: 9px; padding: 8px 13px; border: 1px solid var(--color-border); background: rgba(255, 255, 255, 0.82); color: var(--color-ink-soft); font-size: 9px; font-weight: 700; letter-spacing: 0.14em; box-shadow: 0 9px 28px rgba(31, 44, 87, 0.06); }
.visual-note i { width: 5px; height: 5px; border-radius: 50%; background: var(--color-gold); }
.note-one { top: 15%; left: 1%; }
.note-two { top: 47%; right: -1%; }
.note-two i { background: var(--color-indigo); }
.note-three { bottom: 11%; left: 9%; }
.note-three i { background: var(--color-forest); }
.hero-glow { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }
.hero-glow-one { width: 300px; height: 300px; top: -130px; right: 12%; background: rgba(238, 241, 248, 0.75); }
.hero-glow-two { width: 180px; height: 180px; bottom: -100px; left: 5%; background: rgba(250, 241, 223, 0.6); }

.guide-section { padding-block: 112px 126px; }
.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 40px; margin-bottom: 45px; }
.section-heading h2, .approach-intro h2 { margin: 0; padding: 0; border: 0; font-size: clamp(34px, 4vw, 46px); line-height: 1.35; }
.section-heading .section-kicker { margin-bottom: 10px; }
.section-heading > p { margin: 0 0 7px; color: var(--color-ink-soft); font-size: 14px; }
.guide-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; }
.guide-card { min-height: 378px; border: 1px solid var(--color-border); background: var(--color-paper-raised); }
.guide-card:not(.guide-card-coming) { grid-column: span 4; }
/* 公開ガイドと同じ 4 カラム幅で流し込み、最終行の余りを埋める */
.guide-card-coming { grid-column: span 4; min-height: 180px; }
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
.guide-card h3 { margin: 0 0 17px; font-size: 23px; line-height: 1.5; }
.guide-description { margin: 0 0 26px; color: var(--color-ink-soft); font-size: 13px; line-height: 1.85; }
.guide-link { display: flex; align-items: center; gap: 8px; margin-top: auto; color: var(--card-accent); font-size: 12px; font-weight: 700; }
.guide-link svg { width: 16px; transition: transform 180ms ease; }
.guide-card-coming { padding: 31px 23px; display: flex; flex-direction: column; justify-content: center; background: transparent; border-style: dashed; }
.coming-icon { width: 40px; height: 40px; display: grid; place-items: center; margin-bottom: 36px; border: 1px solid var(--color-border-strong); border-radius: 50%; color: var(--color-ink-faint); }
.coming-icon svg { width: 18px; }
.guide-card-coming h3 { font-size: 19px; }
.guide-card-coming > p:last-child { margin: 0; color: var(--color-ink-faint); font-size: 12px; line-height: 1.8; }

.approach-section { display: grid; grid-template-columns: minmax(270px, 0.75fr) minmax(0, 1.25fr); gap: 100px; padding-block: 105px; border-top: 1px solid var(--color-border); }
.approach-intro .section-kicker { margin-bottom: 17px; }
.approach-intro > p:last-child { max-width: 390px; margin-top: 24px; color: var(--color-ink-soft); font-size: 14px; line-height: 1.9; }
.theme-list { border-top: 1px solid var(--color-border-strong); }
.theme-item { display: grid; grid-template-columns: 42px 48px 1fr; gap: 23px; align-items: start; padding: 28px 0; border-bottom: 1px solid var(--color-border); }
.theme-number { padding-top: 3px; color: var(--color-gold); font-family: var(--font-mono); font-size: 11px; }
.theme-icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: var(--color-paper-sunken); color: var(--color-indigo); }
.theme-icon svg { width: 20px; height: 20px; }
.theme-item h3 { margin: 0 0 7px; font-size: 20px; }
.theme-item p { margin: 0; color: var(--color-ink-soft); font-size: 13px; line-height: 1.8; }

.closing-message { position: relative; min-height: 280px; display: flex; align-items: center; justify-content: space-between; gap: 40px; margin-bottom: 110px; padding: 55px 65px; overflow: hidden; background: var(--color-indigo-dark); color: white; }
.closing-message::after { content: "M"; position: absolute; top: -100px; right: 7%; color: rgba(255, 255, 255, 0.035); font-family: var(--font-display); font-size: 340px; line-height: 1; }
.closing-message .section-kicker { margin-bottom: 12px; color: #d6b574; }
.closing-title { position: relative; z-index: 1; margin: 0; font-family: var(--font-display); font-size: clamp(30px, 4vw, 43px); line-height: 1.45; }
.closing-message a { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.6); color: white; font-size: 13px; }
.closing-message a:hover { text-decoration: none; border-color: white; }

.site-footer { border-top: 1px solid var(--color-border); background: var(--color-paper-raised); }
.footer-inner { min-height: 165px; display: grid; grid-template-columns: 1fr auto auto; gap: 50px; align-items: center; }
.footer-brand { display: flex; align-items: center; gap: 14px; }
.footer-brand p { margin: 0; line-height: 1.45; }
.footer-brand strong { font-family: var(--font-display); font-size: 16px; }
.footer-brand span { color: var(--color-ink-faint); font-size: 11px; }
.footer-inner > small { color: var(--color-ink-faint); font-size: 10px; }
@keyframes orbit { to { transform: rotate(360deg); } }

@media (max-width: 960px) {
  .hero { min-height: auto; }
  .hero-inner { grid-template-columns: 1fr; gap: 30px; padding-block: 76px 70px; }
  .hero-copy { max-width: 700px; }
  .hero-visual { width: min(74vw, 440px); justify-self: center; }
  .guide-card:not(.guide-card-coming) { grid-column: span 6; }
  .guide-card-coming { grid-column: span 6; min-height: 210px; }
  .approach-section { gap: 50px; }
  .footer-inner { grid-template-columns: 1fr auto; }
  .footer-inner > small { grid-column: 1 / -1; margin-top: -35px; }
}

@media (max-width: 720px) {
  .hero-inner, .guide-section, .approach-section, .closing-message, .footer-inner { width: min(100% - 32px, 1180px); }
  .hero-inner { padding-block: 62px 54px; }
  .hero h1 { font-size: clamp(41px, 12vw, 58px); }
  .hero-lede { font-size: 15px; }
  .hero-visual { width: min(94vw, 390px); }
  .visual-note { padding: 6px 9px; }
  .guide-section { padding-block: 82px 92px; }
  .section-heading { display: block; margin-bottom: 32px; }
  .section-heading > p { margin-top: 14px; }
  .guide-card:not(.guide-card-coming), .guide-card-coming { grid-column: 1 / -1; }
  .guide-card { min-height: 350px; }
  .guide-card-coming { min-height: 230px; }
  .approach-section { grid-template-columns: 1fr; gap: 42px; padding-block: 78px; }
  .theme-item { grid-template-columns: 28px 42px 1fr; gap: 13px; }
  .closing-message { min-height: 340px; align-items: flex-start; flex-direction: column; justify-content: center; margin-bottom: 70px; padding: 42px 30px; }
  .footer-inner { grid-template-columns: 1fr; gap: 24px; align-content: center; padding-block: 42px; }
  .footer-inner > small { grid-column: auto; margin-top: 0; }
}

@media (max-width: 430px) {
  .brand-mark { width: 34px; height: 34px; }
  .hero h1 { font-size: 39px; }
  .hero-visual { width: 330px; max-width: 100%; }
  .visual-center strong { font-size: 27px; }
  .guide-card > a { padding-inline: 25px; }
}

@media (prefers-reduced-motion: reduce) {
  .orbit { animation: none; }
  .hero-cta, .guide-link svg { transition: none; }
}
</style>
