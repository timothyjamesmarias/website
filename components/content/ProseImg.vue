<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>
<template>
    <img :src="src" :alt="alt" :width="width" :height="height" class="rounded-md shadow-sm">
</template>
