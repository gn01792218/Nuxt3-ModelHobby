<template>
    <UCard class="cursor-pointer bg-red-400"  @click="navergateToGallery(model.id)">
        <p>{{ model.name_zh }}</p>
        <NuxtImg preload :modifiers="{rotate: null}" format="webp" v-if="model.main_img" width="100" :src="getModelImagePublicUrl(model.main_img)"/>
        <NuxtImg v-else :modifiers="{rotate: null}" src="/imagePlaceHolder.jpg" width="100"  height="200" format="webp" alt="沒有上傳圖片"/>
    </UCard>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelImagePublicUrl } = useSupabase()
const { navergateToGallery } = useMyModel()

</script>