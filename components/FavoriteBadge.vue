<template>
    <span class="flex items-center gap-1">
        <UIcon
            :name="iconName"
            :class="iconColorClass"
        />
        <span class="text-sm">{{ favoriteCount(model) }}</span>
    </span>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

const props = defineProps<{
    model: Model
    variant?: 'heart' | 'flame'
}>()

const { favoriteCount, isFavoritedByMe } = useFavorite()

const iconName = computed(() => {
    if (props.variant === 'flame') return 'i-heroicons-fire-solid'
    return isFavoritedByMe(props.model) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'
})
const iconColorClass = computed(() => {
    if (props.variant === 'flame') return 'text-orange-500'
    return isFavoritedByMe(props.model) ? 'text-red-500' : 'text-gray-400'
})
</script>
