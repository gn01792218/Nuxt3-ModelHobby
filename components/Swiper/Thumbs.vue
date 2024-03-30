<template>
    <Swiper 
    class="w-full max-w-[1280px] h-[200px] xs:h-[400px] sm:h-[500px]"
    :modules="[SwiperFreeMode, SwiperThumbs, SwiperPagination]" :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
    }"
    :pagination="{
        clickable:true
    }" 
    :loop="true" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }">
        <SwiperSlide class="relative" v-for="slide in sliderItems" :key="slide">
            <img class="w-full h-full object-contain" :src="getFinishImagePublicUrl(slide)"
                :alt="slide">
        </SwiperSlide>
    </Swiper>
    <Swiper
    class="border-2 w-full h-[100px] max-w-[1280px] sm:h-[150px] md:h-[200px] swiper-thumbs "
     :modules="[SwiperFreeMode, SwiperThumbs, SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        @swiper="setThumbsSwiper" :loop="true" :navigation="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
        :watchSlidesProgress="true">
        <SwiperSlide class="relative cursor-pointer" v-for="slide in sliderItems" :key="slide">
            <img class="w-full h-full opacity-50 hover:opacity-100" :src="getFinishImagePublicUrl(slide)"
                :alt="slide">
        </SwiperSlide>
    </Swiper>

</template>

<script setup lang="ts">

defineProps<{
    sliderItems: string[]
}>()

const { getFinishImagePublicUrl } = useSupabase()
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper:any) => {
    thumbsSwiper.value = swiper;
};

</script>