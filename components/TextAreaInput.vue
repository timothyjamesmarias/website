<script setup lang="ts">
const props = defineProps<{
    type: string;
    placeholder: string;
    value: string;
    name: string;
    modelValue: string;
}>();

const emits = defineEmits<{
    (event: 'update:modelValue', ...args: any[]): void;
}>();

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <textarea 
        :type="type" 
        :placeholder="placeholder" 
        :class="inputClass" 
        :value="value" 
        :name="name" 
        @input="updateValue($event.target.value)" 
        class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:border-purple focus:ring focus:ring-purple"
        >
    </textarea>
</template>

