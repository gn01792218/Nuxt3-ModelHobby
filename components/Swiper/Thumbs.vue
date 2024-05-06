<template>
    <Swiper class="w-full max-w-[1280px] h-[200px] xs:h-[400px] sm:h-[500px]"
        :modules="[SwiperFreeMode, SwiperThumbs, SwiperPagination, SwiperController]" @swiper="setMainSwiper"
        @activeIndexChange="onMainSwiperActiveIndexChange" :thumbs="{ swiper: thumbsSwiper }" :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
        }" :pagination="{
            clickable: true
        }" :spaceBetween="10">
        <SwiperSlide class="relative" v-for="slide in sliderItems" :key="slide" @click="processOpenImgPanel()">
            <NuxtImg preload class="w-full h-full object-contain" format="webp" sizes="380px md:500px" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
        </SwiperSlide>
    </Swiper>
    <Swiper class="border-2 w-full h-[100px] max-w-[1280px] sm:h-[150px] md:h-[200px] swiper-thumbs "
        :modules="[SwiperFreeMode, SwiperThumbs, SwiperPagination, SwiperNavigation]" @swiper="setThumbsSwiper"
        :navigation="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true" :watchSlidesProgress="true">
        <SwiperSlide class="relative cursor-pointer" v-for="slide in sliderItems" :key="slide">
            <NuxtImg loading="lazy" class="w-full h-full opacity-50 hover:opacity-100" format="webp" sizes="87px md:300px" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
        </SwiperSlide>
    </Swiper>
    <UModal class="w-full flex items-center" v-model="openImgPanel" :ui="{
        container: 'items-center',
        padding: 'px-0 sm:p-0',
        overlay: {
            background: 'bg-gray-900/95 dark:bg-gray-900/95',
        },
        background: 'bg-transparent dark:bg-transparent',
    }">
        <Swiper class="w-full max-w-[1280px]"
            :modules="[SwiperFreeMode, SwiperPagination, SwiperController,SwiperZoom]" 
            :initialSlide="currentIndex"
            :controller="{ control: mainSwiper }" 
            :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }" 
            :pagination="{
                clickable: true
            }" 
            :spaceBetween="10" 
            :zoom="true"
            :autoHeight="true"
            >
            <SwiperSlide class="w-full" v-for="slide in sliderItems" :key="slide">
                <NuxtImg preload class="w-full h-full object-contain" format="webp" sizes="400px md:600px" :quality="100" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
            </SwiperSlide>
        </Swiper>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore";


defineProps<{
    sliderItems: string[]
}>()

const { getFinishImagePublicUrl } = useSupabase()
const { setOpenImgPanel } = useMyModelStore()
const { openImgPanel } = storeToRefs(useMyModelStore())

const thumbsSwiper = ref<Swiper | null>(null);
const mainSwiper = ref<Swiper | null>(null);
const currentIndex = ref<number>(0);

const setMainSwiper = (swiper: any) => {
    mainSwiper.value = swiper
}
const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
};

// 由於Modal中的Swiper會每次都重生( NuxtUI的modal機制 )
// 所以要控制modal中的swiper index就得透過 initialSlide 參數來設置
// 這裡當主要的swiper index有變動時，就會更改currentIndex
const onMainSwiperActiveIndexChange = (swiper: Swiper) => {
    currentIndex.value = swiper.activeIndex
}
function processOpenImgPanel() {
    setOpenImgPanel(true)
}
</script>