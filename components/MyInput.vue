<template>
    <UInput v-model="modelValue" />
</template>

<script setup lang="ts">
const modelValue = defineModel<string | number>()
</script>
