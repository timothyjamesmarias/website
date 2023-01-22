<script setup lang="ts">
const props = defineProps<{
    background: string;
}>();
</script>
<template>
    <section :class="background" class="min-h-screen flex items-center">
        <slot />
    </section>
</template>
