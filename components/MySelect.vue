<template>
    <USelect
        :model-value="modelValue"
        :options="options"
        :option-attribute="optionAttribute"
        :value-attribute="valueAttribute"
        :select-class="selectClass"
        @update:model-value="onUpdateModelValue"
        @change="onChange"
    />
</template>

<script setup lang="ts">
const props = defineProps<{
    options?: any[]
    optionAttribute?: string
    valueAttribute?: string
    selectClass?: string
}>()
const modelValue = defineModel<any>()
const emit = defineEmits<{ change: [value: any] }>()

// 原生 <select> 的 value 永遠是字串，這裡依 options 把值還原成原始型別（例如數字 enum）
function resolveOptionValue(raw: string) {
    const valueAttribute = props.valueAttribute ?? 'value'
    const matched = (props.options ?? []).find(option => {
        const optionValue = option && typeof option === 'object' ? option[valueAttribute] : option
        return String(optionValue) === raw
    })
    if (matched === undefined) return raw
    return matched && typeof matched === 'object' ? matched[valueAttribute] : matched
}
function onUpdateModelValue(raw: string) {
    modelValue.value = resolveOptionValue(raw)
}
function onChange(raw: string) {
    emit('change', resolveOptionValue(raw))
}
</script>
