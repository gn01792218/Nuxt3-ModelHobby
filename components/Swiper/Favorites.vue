<template>
    <Swiper
        class="swiper-favorites"
        :modules="[SwiperEffectCards]"
        :effect="'cards'"
        :grab-cursor="true"
        style="width: 240px; height: 320px;"
    >
        <SwiperSlide
            v-for="slide in sliderItems"
            :key="slide.id"
            class="relative cursor-pointer rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10 bg-gray-100"
            @click="handleClick(slide.id)"
        >
            <NuxtImg
                class="absolute inset-0 w-full h-full object-cover"
                :modifiers="{rotate: null}"
                format="webp"
                :src="getModelFinishImagePublicUrl(slide.finish_infos[0].gallery[0])"
                :alt="slide.name_zh"
            />
            <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            <FavoriteButton class="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm" :model="slide" />

            <p class="absolute bottom-3 inset-x-3 text-white font-medium drop-shadow text-overflow-ellipsis">{{ slide.name_zh }}</p>
        </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    sliderItems: Model[]
}>()

const { getModelFinishImagePublicUrl } = useMyModelImg()
const { navergateToGallery } = useMyModel()

function handleClick(id: number) {
    navergateToGallery(id)
}
</script>
