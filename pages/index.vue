<template>
    <main class="pt-0 !mt-0">
        <!-- 熱門排行區 -->
        <HomeHighlightBoard />
        <!-- 探索更多模型創作區：篩選 + 展示 -->
        <section class="pt-8">
            <SectionTitle title="探索更多模型創作" icon="i-heroicons-sparkles" />

            <!-- 大地色底：跟上方的藍天(main)區塊做出區隔 -->
            <div class="bg-gradient-to-b from-earth-500 to-earth-800 rounded-3xl shadow-inner p-4 sm:p-8">
                <!-- 選項Filter區：軍事簡報面板風格，跟熱門排行的軍風配色呼應 -->
                <ModelFilterPanel
                    v-model:brand="selectedBrand"
                    v-model:type="selectedType"
                    v-model:scale="selectedScale"
                    :brand-options="brandOptions"
                    :type-options="typeOptions"
                    :scale-options="scaleOptions"
                    @reset="reSetFilter"
                >
                    <template #extra>
                        <div>
                            <p class="mb-2 font-mono text-xs uppercase tracking-widest text-earth-100/70">排序方式</p>
                            <MySelect
                                v-model="selectedSort"
                                :options="sortOptions"
                                select-class="w-auto rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                            />
                        </div>
                    </template>
                </ModelFilterPanel>

                <!-- 展示區，從allfinishedModels列表中根據上面的Filter顯示項目 -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-1">
                    <MyModelGalleryCard
                        v-for="model in filteredModels"
                        :key="model.id"
                        :model="model"
                    />
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import type { Model } from "@/types/model"

const { allfinishedModels } = useMyModel()
const { favoriteCount } = useFavorite()

const {
  brandOptions,
  scaleOptions,
  typeOptions,
  selectedBrand,
  selectedScale,
  selectedType,
  filteredModels: filteredByOptions,
  reSetFilter: reSetOptionFilter,
} = useModelFilter(allfinishedModels)

const sortOptions = ['最新完成在前', '收藏數：多→少', '最早新增在前']
const selectedSort = ref(sortOptions[0])

const filteredModels = computed<Model[]>(() => {
  const result = filteredByOptions.value

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
    reSetOptionFilter()
    selectedSort.value = sortOptions[0]
}
</script>