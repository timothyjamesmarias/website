<script setup lang="ts">
const props = defineProps<{
  title: string;
  date: string;
  description: string;
}>();
</script>
<template>
<article class="bg-base-300 p-10 my-10 rounded-lg">
  <h2 class="text-2xl ">{{ props.title }}</h2>
  <p class="">{{ props.date }}</p>
  <p class="">{{ props.description }}</p>
</article>
</template>
