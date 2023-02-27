<script setup lang="ts">
const props = defineProps<{
    background: string;
}>();
</script>
<template>
    <section :class="background" class="min-h-screen flex items-center justify-center">
        <slot />
    </section>
</template>
