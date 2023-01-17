<script setup lang="ts">
const props = defineProps<{
    color: number;
}>();
</script>
<template>
    <li :class="color % 2 === 0 ?  'marker:text-orange' : 'marker:text-green'">
        <slot />
    </li>
</template>
