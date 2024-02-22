<template>
    <UTabs :items="tabItems" @change="onTabChange" v-model="currentModeStatusTab">
        <template #未組裝="{ item }">
            <MyModelCardGroup :group-title="item.label" :card-list="unFinishedModels" />
        </template>
        <template #已組裝="{ item }">
            <MyModelCardGroup :group-title="item.label" :card-list="finishedModels" />
        </template>
        <template #未入庫="{ item }">
            <MyModelCardGroup :group-title="item.label" :card-list="unStockInModels" />
        </template>
    </UTabs>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

defineProps<{
    unFinishedModels: Model[],
    finishedModels: Model[],
    unStockInModels: Model[]
}>()

const { setCurrentModelStatusTab } = useMyModelStore()
const { currentModeStatusTab } = storeToRefs(useMyModelStore())
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
]
function onTabChange(index: number) {
    setCurrentModelStatusTab(index)
}
</script>