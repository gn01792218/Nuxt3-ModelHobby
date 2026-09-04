<template>
    <div>
        <div class="flex items-center gap-2">
            <UIcon :name="icon" class="w-6 h-6 sm:w-7 sm:h-7" :class="iconClass" />
            <h2 class="text-2xl sm:text-4xl font-serif font-black tracking-widest bg-gradient-to-r from-primary-200 via-white to-primary-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(83,177,221,0.45)]">
                {{ title }}
            </h2>
        </div>
        <div class="w-14 h-1 rounded-full bg-gradient-to-r from-primary-400 to-acent-500 mt-2 mb-6" />
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    title: string
    icon: string
    iconClass?: string
}>(), {
    iconClass: 'text-acent-500'
})
</script>
