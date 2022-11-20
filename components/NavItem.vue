<script setup>
defineProps({
   href: String, 
})
</script>
<template>
        <NuxtLink :to=href class="text-xl text-white hover:text-blue font-prompt pr-3">
            <slot />
        </NuxtLink>
</template>
