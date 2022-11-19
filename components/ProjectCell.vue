<script setup lang="ts">
const props = defineProps({
    src: {
        Type: String,
        default: '',
        required: true
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
    }
})
</script>

<template>
<a :href=href>
<div class="group rounded-lg relative">
   <img :src="src" class="object-cover rounded-lg absolute group-hover:z-0" />
   <div class="hidden absolute rounded-lg w-full group-hover:block bg-black group-hover:z-10 opacity-80">
        <h2 class="text-lg text-white p-1">{{ props.name }}</h2>
        <p class="text-md text-main p-1">{{ props.description }}</p> 
   </div>
</div>
</a>
</template>
