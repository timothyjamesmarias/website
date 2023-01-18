<script setup lang="ts">
const props = defineProps<{
    href: string;
    color: number;
}>();
</script>
<template>
    <NuxtLink :to="href" :class="color % 2 === 0 ?  'text-green' : 'text-pink'" class="hover:underline">
        <slot />
    </NuxtLink>
</template>
