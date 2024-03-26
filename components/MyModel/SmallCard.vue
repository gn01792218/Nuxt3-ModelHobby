<template>
    <UCard class="cursor-pointer"  @click="gottoItem(model.id)">
        <p>{{ model.name_zh }}</p>
        <img class="w-[100px]" :src="getModelImagePublicUrl(model.main_img)" :alt="model.name_zh">
        <p v-show="model.status === ModelStatus.已組裝">已組裝</p>
        <p v-show="model.status === ModelStatus.未入庫">未入庫</p>
        <p v-show="model.status === ModelStatus.未組裝">未組裝</p>
    </UCard>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model, ModelStatus } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelImagePublicUrl } = useSupabase()
const { setOpenSearchPanel } = useMyModelStore()
const { navergateToMyModelDetial } = useMyModel()

function gottoItem(modelId: number) {
    setOpenSearchPanel(false)
    navergateToMyModelDetial(modelId)
}
</script>