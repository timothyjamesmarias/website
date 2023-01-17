<script setup lang="ts">
const props = defineProps<{
    background: string;
}>();
</script>
<template>
    <section :class="background" class="h-screen">
        <slot />
    </section>
</template>
