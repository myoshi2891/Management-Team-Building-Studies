<script setup lang="ts">
import { useSeoMeta } from "#imports";

/*
 * 種別インデックス。中身は共有コンポーネントが持つ
 * （3 種別ぶんロジックを複製すると、片方だけ直したときに構造が分裂する）。
 */
useSeoMeta({
  title: "テーマで学ぶ | Management Studies",
  description: "特定の資格・書籍に紐づかない、役割と実務のテーマ解説をまとめています。",
});
</script>

<template>
  <GuideKindHub kind-id="practices" />
</template>
