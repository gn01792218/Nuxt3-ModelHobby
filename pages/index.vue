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
                <div class="mb-6 space-y-5 rounded-xl bg-olive-950/40 p-4 ring-1 ring-olive-400/20 sm:p-6">
                    <div class="flex flex-wrap gap-3">
                        <MySelect
                            v-model="selectedBrand"
                            :options="brandOptions"
                            placeholder="選擇品牌"
                            select-class="rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                            class="max-w-[10rem]"
                        />
                        <MySelect
                            v-model="selectedType"
                            :options="typeOptions"
                            placeholder="選擇類型"
                            select-class="rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                            class="max-w-[10rem]"
                        />
                    </div>
                    <div>
                        <p class="mb-2 font-mono text-xs uppercase tracking-widest text-earth-100/70">排序方式</p>
                        <MySelect
                            v-model="selectedSort"
                            :options="sortOptions"
                            select-class="w-auto rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                        />
                    </div>
                    <div>
                        <p class="mb-2 font-mono text-xs uppercase tracking-widest text-earth-100/70">比例</p>
                        <div class="flex flex-wrap gap-2">
                            <ToggleChip
                                v-for="scale in scaleOptions"
                                :key="scale"
                                :active="selectedScale === scale"
                                @click="selectedScale = scale"
                            >
                                {{ scale }}
                            </ToggleChip>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="rounded-sm bg-earth-700/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-earth-50 ring-1 ring-earth-200/30 transition-colors hover:bg-earth-600/60 sm:text-sm"
                        @click="reSetFilter"
                    >
                        重置篩選條件
                    </button>
                </div>

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
import { enumToArray } from '@/utils/enumToArray'
import { ModelBrand, ModelScale, ModelType, type Model } from "@/types/model"

const { allfinishedModels } = useMyModel()
const { favoriteCount } = useFavorite()

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