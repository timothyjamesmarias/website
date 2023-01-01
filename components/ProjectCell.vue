<script setup lang="ts">
const props = defineProps({
    src: {
        Type: String,
        default: '',
    },
    name: {
        Type: String,
        default: '',
        required: true
    },
    description: {
        Type: String,
        default: '',
        required: false
    },
    href: {
        Type: String,
        default: '',
        required: true
    },
    list: {
        Type: Array,
        default: [],
        required: false
    },
    github: {
        Type: String,
        default: '',
        required: false
    }
})
</script>

<template>
<a :href=href>
<div class="rounded-lg bg-zinc-800 border border-white">
   <img :src="src" class="object-cover rounded-t-lg" />
   <div class="min-h-fit p-4">
        <h2 class="p-1">{{ props.name }}</h2>
        <p class="p-1">{{ props.description }}</p> 
        <a :href="github" class="p-1">Github</a>
        <ul>
          <li v-for="item in props.list" :key="item">
            {{ item }}
          </li>
        </ul>
   </div>
</div>
</a>
</template>
