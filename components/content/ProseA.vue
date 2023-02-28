<script setup lang="ts">
const props = defineProps<{
  href: string
}>()
</script>
<template>
  <NuxtLink :to="href" class="link link-primary">
    <slot />
  </NuxtLink>
</template>
