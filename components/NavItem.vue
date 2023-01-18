<script setup>
defineProps({
   href: String, 
})
</script>
<template>
        <NuxtLink :to=href class="text-3xl hover:text-purple">
            <slot />
        </NuxtLink>
</template>
