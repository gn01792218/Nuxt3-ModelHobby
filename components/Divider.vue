<template>
    <UDivider :ui="{ border: { size: { horizontal: 'border-t-[10px]' } } }">
        <div class="flex items-center">
            <UIcon v-if="iconName" :name="iconName" class="text-acent-100"/>
            <span class="text-acent-100">{{ title }}</span>
        </div>
    </UDivider>
</template>

<script lang="ts" setup>
defineProps<{
    title:string,
    iconName?:string
}>()
</script>