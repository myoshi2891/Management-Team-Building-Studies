<script setup lang="ts">
useSeoMeta({
  title: "マネジメント／チームビルディング 資格学習ガイド",
  description: "マネジメント・チームビルディング関連の資格学習ガイド一覧。",
});
</script>

<template>
  <main class="home">
    <h1>資格学習ガイド</h1>
    <ul>
      <li>
        <NuxtLink to="/capm">CAPM®（Certified Associate in Project Management）認定資格 完全ガイド</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 56px 24px 120px;
}
</style>
