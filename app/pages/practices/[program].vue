<script setup lang="ts">
import { computed, definePageMeta, useRoute, useSeoMeta } from "#imports";
import { findProgram, programsOfKind } from "~/utils/guide-catalog";

/*
 * ハブページ（/practices/<プログラム>）。
 *
 * 種別ディレクトリ配下の 2 セグメントに置くことで、1 セグメントの既存ガイドルート
 * （/capm など）と構造的に衝突しない。1 セグメントの動的ルートは 404 を食い潰す。
 *
 * validate はこの種別に属さないプログラム ID を弾く。
 * 弾かないと /practices/<別種別のプログラム> が 200 で開き、同じ内容が二重の URL を持つ。
 */
definePageMeta({
  validate: (route) =>
    programsOfKind("practices").some((program) => program.id === String(route.params.program)),
});

const route = useRoute();
const programId = computed(() => String(route.params.program));
const program = computed(() => findProgram(programId.value));

useSeoMeta({
  title: () => `${program.value.navLabel} | Management Studies`,
  description: () => program.value.summary,
});
</script>

<template>
  <GuideProgramHub :program-id="programId" />
</template>
