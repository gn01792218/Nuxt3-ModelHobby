<template>
    <UModal v-model="openSearchPanel">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        搜尋結果
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="setOpenSearchPanel(false)" />
                </div>
            </template>
            <section v-if="searchResult.length">
               <MyModelSearchCard
                v-for="model in searchResult" :key="model.id"
                :model="model"
               /> 
            </section>
            <section class="h-[200px] flex justify-center items-center" v-else>
                <p>沒有尋找到東西...</p>
            </section>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"
const props = defineProps<{
    searchResult: Model[]
}>()

const { setOpenSearchPanel } = useMyModelStore()
const { openSearchPanel } = storeToRefs(useMyModelStore())
</script>