<script setup lang="ts">
import { useSeoMeta } from "#imports";

/*
 * 種別インデックス。中身は共有コンポーネントが持つ
 * （3 種別ぶんロジックを複製すると、片方だけ直したときに構造が分裂する）。
 */
useSeoMeta({
  title: "資格で学ぶ | Management Studies",
  description: "PMI・Scrum Alliance・Scrum.org の認定資格ガイドを、認定団体ごとにまとめています。",
});
</script>

<template>
  <GuideKindHub kind-id="certifications" />
</template>
