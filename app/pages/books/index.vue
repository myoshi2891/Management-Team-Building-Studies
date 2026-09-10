<script setup lang="ts">
import { useSeoMeta } from "#imports";

/*
 * 種別インデックス。中身は共有コンポーネントが持つ
 * （3 種別ぶんロジックを複製すると、片方だけ直したときに構造が分裂する）。
 */
useSeoMeta({
  title: "書籍で学ぶ | Management Studies",
  description: "マネジメント・リーダーシップ・チームづくりの名著を、テーマごとにまとめています。",
});
</script>

<template>
  <GuideKindHub kind-id="books" />
</template>
