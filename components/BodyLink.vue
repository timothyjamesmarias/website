<script setup lang="ts">
const props = defineProps<{
    href: string;
    color: number;
}>();
</script>
<template>
    <NuxtLink :to="href" :class="color % 2 === 0 ?  'link-success' : 'link-primary'" class="">
        <slot />
    </NuxtLink>
</template>
