<template>
    <div class="flex items-center mr-2">
        <MyInput type="text" class="mr-1" v-model="keyword" :placeholder="placeHolder" @keypress.enter="search" />
        <UButton color="pink" icon="i-heroicons-magnifying-glass" size="sm" variant="solid" :trailing="false"
            @click="search" />
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { SearchModelType, type Model } from "~/types/model"
const props = defineProps<{
    searchSorce: Model[],
    placeHolder:string,
    searchType:SearchModelType
}>()

//搜尋相關
const { setOpenSearchPanel, setSearchResult, setSearchModelType } = useMyModelStore()
const { matchesKeyword } = useModelKeywordFilter()
const keyword = ref('')
function search() {
    setOpenSearchPanel(true)
    setSearchModelType(props.searchType)
    setSearchResult(
        props.searchSorce.filter((model:Model) => keyword.value.trim() && matchesKeyword(model, keyword.value))
    )
}
</script>