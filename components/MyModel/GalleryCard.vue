<template>
    <UCard class="cursor-pointer bg-red-400"  @click="navergateToGallery(model.id)">
        <p>{{ model.name_zh }}</p>
        <div class="d-flex mb-5">
            <UBadge class="mr-2" color="gray">{{ model.scale }}</UBadge>
            <UBadge class="mr-2" color="gray">{{ model.brand }}</UBadge>
            <UBadge color="gray">{{ model.type }}</UBadge>
        </div>
        <NuxtImg class="mx-auto w-[80%] h-[80px] sm:h-[100px] lg:h-[120px]" v-if="model.main_img" loading="lazy" :modifiers="{rotate: null}" format="webp"  width="100" :src="getModelMainImagePublicUrl(model.main_img)"/>
        <NuxtImg class="mx-auto w-[80%] h-[80px] sm:h-[100px] lg:h-[120px]" v-else loading="lazy" :modifiers="{rotate: null}" src="/imagePlaceHolder.jpg" width="100"  height="200" format="webp" alt="沒有上傳圖片"/>
    </UCard>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelMainImagePublicUrl } = useMyModelImg()
const { navergateToGallery } = useMyModel()

</script>