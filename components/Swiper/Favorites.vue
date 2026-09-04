<template>
    <div class="relative flex-shrink-0 pt-10">
        <!-- 軍牌掛孔＋鍊條：畫在Swiper外層，才能不被卡牌本身的overflow-hidden裁掉，露出卡牌上緣 -->
        <svg class="pointer-events-none absolute left-1/2 top-0 z-30 h-[76px] w-10 -translate-x-1/2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.5)]" viewBox="0 0 40 76" fill="none">
            <!-- 鍊條頂端的圈環，代表鍊條還向上延伸出畫面外 -->
            <ellipse cx="20" cy="6" rx="5" ry="4" class="stroke-steel-500" stroke-width="2" />
            <!-- 鍊條主幹：珠鍊沿同一條直線排到掛孔 -->
            <line x1="20" y1="10" x2="20" y2="56" class="stroke-steel-500" stroke-width="2" stroke-linecap="round" />
            <g v-for="(bead, index) in chainBeads" :key="index">
                <circle :cx="bead.x" :cy="bead.y" r="2.6" stroke-width="0.6" class="fill-steel-500 stroke-steel-800" />
                <circle :cx="bead.x - 0.8" :cy="bead.y - 0.8" r="0.9" class="fill-steel-100" />
            </g>
            <circle cx="20" cy="60" r="6" stroke-width="2" class="fill-olive-950 stroke-olive-300/50" />
        </svg>

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
                class="relative cursor-pointer overflow-hidden rounded-[1.75rem] bg-olive-950 ring-4 ring-olive-700 shadow-xl shadow-black/40"
                @click="handleClick(slide.id)"
            >
                <NuxtImg
                    class="absolute inset-0 w-full h-full object-cover"
                    :modifiers="{rotate: null}"
                    format="webp"
                    :src="getModelFinishImagePublicUrl(slide.finish_infos[0].gallery[0])"
                    :alt="slide.name_zh"
                />
                <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

                <!-- 軍牌金屬打凸邊框 -->
                <div class="pointer-events-none absolute inset-0 z-20 rounded-[1.75rem] ring-2 ring-inset ring-olive-300/30 shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.45)]" />

                <span class="absolute top-3 left-4 z-10 text-[10px] font-mono uppercase tracking-widest text-olive-200/80 drop-shadow">NO.{{ String(slide.id).padStart(4, '0') }}</span>

                <FavoriteBadge class="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm" :model="slide" variant="flame" />

                <p class="absolute bottom-3 inset-x-3 text-white font-black uppercase tracking-wide drop-shadow text-overflow-ellipsis">{{ slide.name_zh }}</p>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    sliderItems: Model[]
}>()

const { getModelFinishImagePublicUrl } = useMyModelImg()
const { navergateToGallery } = useMyModel()

// 軍牌掛孔上方的鍊條主幹，沿直線（x=20, y:10~56）等距排列的珠鍊座標
const chainBeads = [
    { x: 20, y: 12 },
    { x: 20, y: 19 },
    { x: 20, y: 26 },
    { x: 20, y: 33 },
    { x: 20, y: 40 },
    { x: 20, y: 47 },
    { x: 20, y: 54 },
]

function handleClick(id: number) {
    navergateToGallery(id)
}
</script>
