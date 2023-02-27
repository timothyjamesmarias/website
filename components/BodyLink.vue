<script setup lang="ts">
const props = defineProps<{
    href: string;
    color: number;
}>();
</script>
<template>
    <NuxtLink :to="href" :class="color % 2 === 0 ?  '' : ''" class="">
        <slot />
    </NuxtLink>
</template>
