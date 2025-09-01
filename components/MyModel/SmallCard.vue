<template>
    <UCard class="cursor-pointer bg-main-400"  @click="gottoItem(model.id)">
        <p>{{ model.name_zh }}</p>
        <div class="d-flex mb-5">
            <UBadge class="mr-2" color="gray">{{ model.scale }}</UBadge>
            <UBadge class="mr-2" color="gray">{{ model.brand }}</UBadge>
            <UBadge color="gray">{{ model.type }}</UBadge>
        </div>
        <NuxtImg v-if="model.main_img" loading="lazy" format="webp"  :modifiers="{rotate: null}"  class="w-full md:h-full" width="300" :src="getModelMainImagePublicUrl(model.main_img)"/>
        <NuxtImg v-else loading="lazy" :modifiers="{rotate: null}" src="/imagePlaceHolder.jpg" format="webp" alt="沒有上傳圖片"/>
        <p v-show="model.status === ModelStatus[status]" v-for="status in Object.keys(ModelStatus)" :key="status">{{ status }}</p>
    </UCard>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model, ModelStatus } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelMainImagePublicUrl } = useMyModelImg()
const { setOpenSearchPanel } = useMyModelStore()
const { navergateToMyModelDetial } = useMyModel()

function gottoItem(modelId: number) {
    setOpenSearchPanel(false)
    navergateToMyModelDetial(modelId)
}
</script>