<script setup lang="ts">
const props = defineProps<{
    src: string;
    name: string;
    description: string;
    href: string;
    list: string[];
    github?: string;
}>();
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2">
        <img :src="src" class="w-full rounded-lg" />
        <div>
            <h2 class="text-2xl font-bold">{{ name }}</h2>
            <p class="text-lg">{{ description }}</p>
            <List>
                <ListItem v-for="item in list" :key="item">{{ item }}</ListItem>
            </List>
            <a :href="href" class="text-blue-500 hover:underline">Visit Site</a>
            <a v-if="github" :href="github" class="text-blue-500 hover:underline">View on Github</a>
        </div>
    </div>
</template>

