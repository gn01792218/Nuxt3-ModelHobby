<template>
    <UCard class="cursor-pointer bg-main-400"  @click="gottoItem(model.id)">
        <p>{{ model.name_zh }}</p>
        <NuxtImg preload format="webp"  :modifiers="{rotate: null}" v-if="model.main_img" class="w-full md:h-full" width="300" :src="getModelImagePublicUrl(model.main_img)"/>
        <NuxtImg v-else :modifiers="{rotate: null}" src="/imagePlaceHolder.jpg" format="webp" alt="沒有上傳圖片"/>
        <p v-show="model.status === ModelStatus[status]" v-for="status in Object.keys(ModelStatus)" :key="status">{{ status }}</p>
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