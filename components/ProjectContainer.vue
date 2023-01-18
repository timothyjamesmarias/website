<script setup lang="ts">
const props = defineProps<{
    src: string;
    name: string;
    description: string;
    href: string;
    list: string[];
    github?: string;
    listcolor: number;
    businesslink?: string;
}>();
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-4 sm:mx-10">
        <NuxtLink :to="href">
            <img :src="src" class="w-full h-full object-cover rounded-lg" />
        </NuxtLink>
        <div>
            <h2 class="text-2xl font-bold" :class="listcolor % 2 === 0 ? 'text-green' : 'text-pink'">{{ name }}</h2>
            <p class="text-lg">{{ description }}<BodyLink v-if="businesslink" :href="businesslink" :color="listcolor">{{ name }}</BodyLink></p>
            <List>
                <ListItem v-for="item in list" :key="item" :color="listcolor">{{ item }}</ListItem>
            </List>
            <div class="flex mt-5">
            <BodyLink :href="href" :color="listcolor">Visit Site</BodyLink>
            <BodyLink v-if="github" :href="github" :color="listcolor" class="ml-6">View on Github</BodyLink>
            </div>
        </div>
    </div>
</template>

