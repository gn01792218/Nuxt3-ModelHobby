<template>
    <div class="rich-text-content" v-html="sanitizedContent" />
</template>

<script setup lang="ts">
const props = defineProps<{
    content: string | null | undefined
}>()

const sanitizedContent = computed(() => sanitizeDescriptionHtml(props.content))
</script>
