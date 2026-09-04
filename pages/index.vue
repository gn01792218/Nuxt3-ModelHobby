<template>
    <main class="pt-0 !mt-0">
        <!-- 最多人收藏區 -->
         <section v-if="mostFavoritedModels.length" class="pb-5">
            <p class="font-bold mb-2 text-white">最多人收藏</p>
            <div class="flex flex-col md:flex-row md:items-center gap-6">
                <SwiperFavorites :slider-items="mostFavoritedModels" />
                <ul class="flex-1 w-full space-y-1">
                    <li
                        v-for="(model, index) in rankingModels"
                        :key="model.id"
                        class="flex items-center gap-3 cursor-pointer rounded-md p-2 hover:bg-white/10"
                        @click="navergateToGallery(model.id)"
                    >
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary-500 text-white text-xs font-bold">{{ index + 1 }}</span>
                        <NuxtImg
                            class="w-12 h-12 object-cover rounded-md flex-shrink-0"
                            :modifiers="{rotate: null}"
                            format="webp"
                            :src="getModelFinishImagePublicUrl(model.finish_infos[0].gallery[0])"
                            :alt="model.name_zh"
                        />
                        <p class="flex-1 truncate text-white">{{ model.name_zh }}</p>
                        <FavoriteButton class="text-white" :model="model" />
                    </li>
                </ul>
            </div>
         </section>
        <!-- 選項Filter區 -->
         <section class="space-y-6 pb-5">
             <p class="font-bold">選項</p>
            <div class="flex flex-wrap gap-2">
                <MySelect
                    v-model="selectedBrand"
                    :options="brandOptions"
                    placeholder="選擇品牌"
                    label="品牌"
                    class="max-w-sm"
                />
                <MySelect
                    v-model="selectedType"
                    :options="typeOptions"
                    placeholder="選擇類型"
                    label="類型"
                    class="max-w-sm"
                />
            </div>
            <div>
                <p class="font-bold mb-2">排序方式</p>
                <MySelect
                    v-model="selectedSort"
                    :options="sortOptions"
                    select-class="w-auto"
                />
            </div>
            <div>
                <p class="font-bold mb-2">比例</p>
                <UButtonGroup class="flex-wrap">
                    <UButton
                    v-for="scale in scaleOptions"
                    :key="scale"
                    :label="scale"
                    :color="selectedScale === scale ? 'primary' : 'gray'"
                    @click="selectedScale = scale"
                    />
                </UButtonGroup>
            </div>
            <UButton
                label="重置篩選條件"
                @click="reSetFilter"
            />
         </section>
        <!-- 展示區，從allfinishedModels列表中根據上面的Filter顯示項目 -->
         <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-1">
            <MyModelGalleryCard
                v-for="model in filteredModels"
                :key="model.id"
                :model="model"
            />
         </section>
    </main>
</template>
<script setup lang="ts">
import { enumToArray } from '@/utils/enumToArray'
import { ModelBrand, ModelScale, ModelType, type Model } from "@/types/model"
import { useMyModelStore } from "~/store/useMyModelStore"

const { allfinishedModels, navergateToGallery } = useMyModel()
const { favoriteCount } = useFavorite()
const { getModelFinishImagePublicUrl } = useMyModelImg()
const { mostFavoritedModels } = storeToRefs(useMyModelStore())

const rankingModels = computed(() => mostFavoritedModels.value.slice(0, 5))

const brandOptions = enumToArray(ModelBrand)
const scaleOptions = enumToArray(ModelScale)
const typeOptions = enumToArray(ModelType)
const sortOptions = ['最新完成在前', '收藏數：多→少', '最早新增在前']

const selectedBrand = ref('')
const selectedScale = ref('')
const selectedType = ref('')
const selectedSort = ref(sortOptions[0])

const filteredModels = computed<Model[]>(() => {
  const result = allfinishedModels.value.filter(model => {
    const matchBrand = selectedBrand.value ? model.brand === selectedBrand.value : true
    const matchType = selectedType.value ? model.type === selectedType.value : true
    const matchScale = selectedScale.value ? model.scale === selectedScale.value : true
    return matchBrand && matchType && matchScale
  })

  if (selectedSort.value === '收藏數：多→少') {
    return [...result].sort((a, b) => favoriteCount(b) - favoriteCount(a))
  }
  if (selectedSort.value === '最新完成在前') {
    return [...result].sort((a, b) => new Date(b.finish_infos[0]?.finished_date ?? 0).getTime() - new Date(a.finish_infos[0]?.finished_date ?? 0).getTime())
  }
  if (selectedSort.value === '最早新增在前') {
    return [...result].sort((a, b) => a.id - b.id)
  }
  return result
})
function reSetFilter() {
    selectedBrand.value = ''
    selectedScale.value = ''
    selectedType.value = ''
    selectedSort.value = sortOptions[0]
}
</script>