<script setup>
defineProps({
   href: String, 
})
</script>
<template>
        <NuxtLink :to=href class="text-xl hover:text-blue pr-3">
            <slot />
        </NuxtLink>
</template>
