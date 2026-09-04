<template>
    <button
        type="button"
        class="flex items-center gap-1"
        :class="{ 'opacity-60': isPending(model) }"
        :disabled="isPending(model)"
        @click.stop="toggleFavorite(model)"
    >
        <UIcon
            :name="isFavoritedByMe(model) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
            class="h-6 w-6"
            :class="isFavoritedByMe(model) ? 'text-red-500' : 'text-gray-400'"
        />
        <span class="text-sm sm:text-base font-semibold">{{ favoriteCount(model) }}</span>
    </button>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    model: Model
}>()

const { favoriteCount, isFavoritedByMe, isPending, toggleFavorite } = useFavorite()
</script>
