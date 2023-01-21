<script setup lang="ts">
const props = defineProps<{
    type: string;
    placeholder: string;
    value: string;
    name: string;
}>();
const emits = defineEmits<{
    (event: "input", ...args: any[]): void;
}>();
</script>
<template>
    <input 
        :type="type" 
        :placeholder="placeholder" 
        :class="inputClass" 
        :value="value" 
        :name="name" 
        @input="updateValue($event.target.value)" 
        class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:border-gray-500"
        />
</template>
