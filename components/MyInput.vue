<template>
    <UInput :type="type" v-model="modelValue" />
</template>

<script setup lang="ts">
const props = defineProps<{
    type?: string
}>()
const modelValue = defineModel<string | number | null>({
    set(value) {
        // number 輸入框清空時，UInput 會給空字串而非 null，要轉成 null 避免送出非數字給後端
        if (props.type === 'number' && value === '') return null
        return value
    }
})
</script>
