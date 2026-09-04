<template>
    <button
        type="button"
        class="flex-shrink-0 whitespace-nowrap rounded-sm px-4 py-1.5 font-mono text-xs uppercase tracking-widest ring-1 transition-colors sm:text-sm"
        :class="active
            ? 'bg-gradient-to-b from-acent-400 to-acent-600 text-white ring-acent-300/60 shadow-md shadow-acent-500/40'
            : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10 hover:text-white/90'"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
defineProps<{
    active?: boolean
}>()
defineEmits<{
    click: []
}>()
</script>
