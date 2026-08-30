<template>
    <UTabs :items="tabItems" @change="onTabChange" v-model="currentModeStatusTab">
        <template #未組裝="{ item }">
            <div class="flex justify-end mb-2">
                <UInput v-model="filterKeyword" icon="i-heroicons-magnifying-glass" placeholder="搜尋此分類" class="w-full sm:w-64" />
            </div>
            <MyModelCardGroup :group-title="item.label" :card-list="filteredUnFinishedModels" />
        </template>
        <template #已組裝="{ item }">
            <div class="flex justify-end mb-2">
                <UInput v-model="filterKeyword" icon="i-heroicons-magnifying-glass" placeholder="搜尋此分類" class="w-full sm:w-64" />
            </div>
            <MyModelCardGroup :group-title="item.label" :card-list="filteredFinishedModels" />
        </template>
        <template #未入庫="{ item }">
            <div class="flex justify-end mb-2">
                <UInput v-model="filterKeyword" icon="i-heroicons-magnifying-glass" placeholder="搜尋此分類" class="w-full sm:w-64" />
            </div>
            <MyModelCardGroup :group-title="item.label" :card-list="filteredUnStockInModels" />
        </template>
        <template #已賣出="{ item }">
            <div class="flex justify-end mb-2">
                <UInput v-model="filterKeyword" icon="i-heroicons-magnifying-glass" placeholder="搜尋此分類" class="w-full sm:w-64" />
            </div>
            <MyModelCardGroup :group-title="item.label" :card-list="filteredSelledModels" />
        </template>
    </UTabs>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

const props = defineProps<{
    unFinishedModels: Model[],
    finishedModels: Model[],
    unStockInModels: Model[],
    selledModels: Model[]
}>()

const { setCurrentModelStatusTab } = useMyModelStore()
const { currentModeStatusTab } = storeToRefs(useMyModelStore())
const { filterModelsByKeyword } = useModelKeywordFilter()

const filterKeyword = ref('')
const filteredUnFinishedModels = computed(() => filterModelsByKeyword(props.unFinishedModels, filterKeyword.value))
const filteredFinishedModels = computed(() => filterModelsByKeyword(props.finishedModels, filterKeyword.value))
const filteredUnStockInModels = computed(() => filterModelsByKeyword(props.unStockInModels, filterKeyword.value))
const filteredSelledModels = computed(() => filterModelsByKeyword(props.selledModels, filterKeyword.value))
const tabItems = [//這裡的順序影響tab的排列順序
    {
        slot: '未組裝',
        label: '未組裝'
    },
    {
        slot: '已組裝',
        label: '已組裝'
    },
    {
        slot: '未入庫',
        label: '未入庫',
    },
    {
        slot: '已賣出',
        label: '已賣出',
    },
]
function onTabChange(index: number) {
    setCurrentModelStatusTab(index)
}
</script>