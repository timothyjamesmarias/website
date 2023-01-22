<script setup lang="ts">
const props = defineProps<{
    placeholder: string;
    value: string;
    name: string;
    modelValue: string;
}>();
const emits = defineEmits<{
    (event: 'update:modelValue', ...args: any[]): void;
}>();
</script>
<template>
    <input 
        type="submit" 
        :placeholder="placeholder" 
        :class="inputClass" 
        :value="value" 
        :name="name" 
        @input="updateValue($event.target.value)" 
        class="bg-green rounded-md py-2 px-4 font-bold uppercase text-gray-700" />
</template>
