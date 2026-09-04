<template>
    <div v-if="currentModel">
        <div class="flex items-center justify-center gap-3 border-b-2 border-b-primary-950 pb-2 mb-1">
            <h1 class="text-center text-primary-100 font-bold text-xl">
                {{ currentModel.name_zh }}
            </h1>
            <FavoriteButton :model="currentModel" />
        </div>
        <p class="text-center text-xs text-primary-500 mb-3">作者：{{ authorName }}</p>
        <section v-for="finish_info, index in currentModel.finish_infos" :key="finish_info.id" class="mb-5">
            <p class="text-black font-bold text-lg mb-2 text-center bg-primary-300">
                <span v-if="finish_info.title">
                    塗裝{{ index + 1 }} :
                </span>
                 {{ finish_info.title }}
            </p>
            <p class="text-primary-500 text-center mb-5">
                {{ finish_info.description }}
            </p>
            <SwiperThumbs :slider-items="finish_info.gallery" />
            <p class=" text-xs text-primary-500 text-end mt-2">
                完成於 : {{ formateDateYYYYMM(finish_info.finished_date, '-') }}
            </p>
        </section>

        <section v-if="sameTypeModels.length || sameBrandModels.length || sameScaleModels.length" class="mt-8">
            <SectionTitle title="探索更多" icon="i-heroicons-sparkles" />
            <div v-if="sameTypeModels.length" class="mt-4">
                <p class="mb-2 text-sm font-bold text-primary-300">同類別模型({{ currentModel.type }})</p>
                <div class="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                    <MyModelGalleryCard v-for="model in sameTypeModels" :key="model.id" :model="model" />
                </div>
            </div>
            <div v-if="sameBrandModels.length" class="mt-6">
                <p class="mb-2 text-sm font-bold text-primary-300">同品牌模型({{ currentModel.brand }})</p>
                <div class="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                    <MyModelGalleryCard v-for="model in sameBrandModels" :key="model.id" :model="model" />
                </div>
            </div>
            <div v-if="sameScaleModels.length" class="mt-6">
                <p class="mb-2 text-sm font-bold text-primary-300">同比例模型({{ currentModel.scale }})</p>
                <div class="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                    <MyModelGalleryCard v-for="model in sameScaleModels" :key="model.id" :model="model" />
                </div>
            </div>
        </section>
    </div>
    <GallerySkeketon v-else />
</template>

<script setup lang="ts">
import GallerySkeketon from '~/components/MyModel/GallerySkeketon.vue'

const { formateDateYYYYMM } = useDate()
const { currentModel, sameTypeModels, sameBrandModels, sameScaleModels } = useMyModel()
const { loadSkeleton } = useSkeleton()
const { authorName } = useModelAuthor()
</script>