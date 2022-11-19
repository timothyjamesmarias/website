<script setup lang="ts">
defineProps({
   post: {
    Type: Array,
    default: undefined,
    required: true,
   }, 
})
console.log(article)
</script>
<template>
    <div class="rounded-lg">
        <NuxtLink to=post._path>
            <div class="text-white">
                {{ post.title }}
            </div>
        </NuxtLink>
    </div>
</template>
