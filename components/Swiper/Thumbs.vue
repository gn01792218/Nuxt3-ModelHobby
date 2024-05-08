<template>
    <Swiper class="w-full max-w-[1280px] h-[250px] md:h-[400px] mb-2 md:mb-5"
        :modules="[SwiperThumbs, SwiperPagination, SwiperController]" 
        @swiper="setMainSwiper"
        @activeIndexChange="onMainSwiperActiveIndexChange"
        :thumbs="{ swiper: thumbsSwiper }" 
        :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
        }" 
        :pagination="{
            clickable: true
        }" 
        :spaceBetween="10">
        <SwiperSlide class="relative" v-for="slide in sliderItems" :key="slide" @click="processOpenImgPanel()">
            <NuxtImg preload class="w-full h-full object-cover md:object-contain" format="webp" sizes="250px md:400px" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
        </SwiperSlide>
    </Swiper>
    <Swiper class="border-2 w-full h-[87px] max-w-[1280px] sm:h-[150px] md:h-[200px] swiper-thumbs "
        :modules="[SwiperFreeMode, SwiperThumbs, SwiperPagination, SwiperNavigation]" 
        @swiper="setThumbsSwiper"
        :navigation="true" 
        :spaceBetween="10" 
        :slidesPerView="4" 
        :freeMode="true" 
        :watchSlidesProgress="true">
        <SwiperSlide class="relative cursor-pointer" v-for="slide in sliderItems" :key="slide">
            <NuxtImg preload class="w-full h-full opacity-50 hover:opacity-100" format="webp" sizes="87px sm:150px md:200px" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
        </SwiperSlide>
    </Swiper>
    <UModal class="w-full flex items-center" v-model="openImgPanel" 
    :ui="{
        container: 'items-center',
        width: 'w-full sm:max-w-2xl',
        padding: 'px-0 sm:p-0',
        overlay: {
            background: 'bg-gray-900/95 dark:bg-gray-900/95',
        },
        background: 'bg-transparent dark:bg-transparent',
    }"
    >
        <Swiper class="w-full"
            :modules="[SwiperPagination, SwiperController,SwiperZoom]" 
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
            <SwiperSlide class="w-full h-full" v-for="slide in sliderItems" :key="slide">
                <NuxtImg preload :placeholder= "15" class="w-full h-full object-contain" format="webp" sizes="400px md:672px" :quality="100" :src="getFinishImagePublicUrl(slide)" :alt="slide"/>
            </SwiperSlide>
        </Swiper>
    </UModal>
</template>

<script setup lang="ts">
defineProps<{
    sliderItems: string[]
}>()

const { getFinishImagePublicUrl } = useSupabase()
const { 
    openImgPanel, 
    thumbsSwiper, 
    mainSwiper, 
    currentIndex, 
    setThumbsSwiper, 
    setMainSwiper, 
    processOpenImgPanel, 
    onMainSwiperActiveIndexChange 
    } = useThumbSwiper()
</script>