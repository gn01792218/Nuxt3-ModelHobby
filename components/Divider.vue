<template>
    <UDivider :ui="{ border: { size: { horizontal: 'border-t-[10px]' } } }">
        <div class="flex items-center">
            <UIcon v-if="iconName" :name="iconName" />
            {{ title }}
        </div>
    </UDivider>
</template>

<script lang="ts" setup>
defineProps<{
    title:string,
    iconName?:string
}>()



</script>