<template>
    <main>
        <!-- 選項Filter區 -->
         <section class="space-y-6 p-6">
             <USelect
                 v-model="selectedBrand"
                 :options="brandOptions"
                 placeholder="選擇品牌"
                 label="品牌"
                 class="max-w-sm"
             />
             <div>
                <p class="font-bold mb-2">類型</p>
                <UButtonGroup class="flex-wrap">
                    <UButton
                    v-for="type in typeOptions"
                    :key="type"
                    :label="type"
                    :color="selectedType === type ? 'primary' : 'gray'"
                    @click="selectedType = type"
                    />
                </UButtonGroup>
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
         <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <MyModelSmallCard
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

const { allfinishedModels } = useMyModel()

const brandOptions = enumToArray(ModelBrand)
const scaleOptions = enumToArray(ModelScale)
const typeOptions = enumToArray(ModelType)

const selectedBrand = ref('')
const selectedScale = ref('')
const selectedType = ref('')

const filteredModels = computed<Model[]>(() => {
  return allfinishedModels.value.filter(model => {
    const matchBrand = selectedBrand.value ? model.brand === selectedBrand.value : true
    const matchType = selectedType.value ? model.type === selectedType.value : true
    const matchScale = selectedScale.value ? model.scale === selectedScale.value : true
    return matchBrand && matchType && matchScale
  })
})
function reSetFilter() {
    selectedBrand.value = ''
    selectedScale.value = ''
    selectedType.value = ''
}
</script>