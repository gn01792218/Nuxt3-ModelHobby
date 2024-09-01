<template>
    <div class="flex items-center mr-2">
        <input type="text" class="my-input mr-1" v-model="keyword" :placeholde="placeHolder" @keypress.enter="search">
        <UButton color="pink" icon="i-heroicons-magnifying-glass" size="sm" variant="solid" :trailing="false"
            @click="search" />
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"
const props = defineProps<{
    searchSorce: Model[],
    placeHolder:string
}>()

//搜尋相關
const { setOpenSearchPanel, setSearchResult } = useMyModelStore()
const { converTradictionalToSimple } = useChinessConverter()
const keyword = ref('')
function search() {
    setOpenSearchPanel(true)
    setSearchResult(
        props.searchSorce.filter((model:Model) => {
            if (!keyword.value) return false
            const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
            const keywordArray = converTradictionalToSimple(keyword.value.trim().toLowerCase()).split(" ") as string[]
            return keywordArray.some(keyword => modelString.includes(keyword))
        })
    )
}
</script>