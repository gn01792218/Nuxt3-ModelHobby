<template>
    <main>
        <h1 class="font-bold text-xl mb-4">我的收藏</h1>
        <div v-if="!myFavoriteModels.length" class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-steel-600 py-16 text-center">
            <UIcon name="i-heroicons-heart" class="h-12 w-12 text-steel-500" />
            <div>
                <p class="text-primary-400">還沒有收藏任何模型</p>
                <p class="mt-1 text-sm text-primary-600">去逛逛其他模型創作，看到喜歡的就按下愛心收藏吧</p>
            </div>
            <NuxtLink
                to="/"
                class="rounded-sm bg-acent-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-acent-600"
            >
                前往探索模型
            </NuxtLink>
        </div>
        <template v-else>
            <ModelFilterPanel
                v-model:brand="selectedBrand"
                v-model:type="selectedType"
                v-model:scale="selectedScale"
                :brand-options="brandOptions"
                :type-options="typeOptions"
                :scale-options="scaleOptions"
                @reset="reSetFilter"
            />

            <p v-if="!filteredModels.length" class="text-primary-500">沒有符合篩選條件的收藏模型</p>
            <section v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-1">
                <MyModelGalleryCard
                    v-for="model in filteredModels"
                    :key="model.id"
                    :model="model"
                />
            </section>
        </template>
    </main>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"

const { myFavoriteModels } = storeToRefs(useMyModelStore())

const {
    brandOptions,
    scaleOptions,
    typeOptions,
    selectedBrand,
    selectedScale,
    selectedType,
    filteredModels,
    reSetFilter,
} = useModelFilter(myFavoriteModels, { optionsSource: 'models' })
</script>
