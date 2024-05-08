<template>
  <Swiper
    class="swiper-base relative banner-clip-path"
    :modules="[ SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperEffectCoverflow]"
    :navigation="useNavergation"
    :pagination="usePagination"
    :slides-per-view="sliderPreview"
    :centeredSlides="true"
    :loop="true"
    :autoplay="{
      delay: 7000,
      disableOnInteraction: true,
    }"
    :effect="'coverflow'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    
  >
    <SwiperSlide v-for="slide in sliderItems" :key="slide.id" class="relative cursor-pointer"  @click="handleClick(slide.id)">
      <NuxtImg :modifiers="{rotate: null}" preload class="w-full h-full" format="webp" sizes='100vw md:500px' :src="getFinishImagePublicUrl(slide.finish_infos[0].gallery[0])" :alt="slide.name_zh"/>
      <div class="w-[300px] flex justify-center absolute top-1/2 translate-y-[-50%] right-1/2 translate-x-[50%] opacity-70 bg-primary-900 py-2 px-5 rounded-md hover:opacity-90">
        <p class="text-white text-overflow-ellipsis">{{ slide.name_zh }}</p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
  sliderItems:Model[]
}>()

const { getFinishImagePublicUrl } = useSupabase()
const { navergateToGallery } = useMyModel()

const usePagination = {
  clickable: true,
  dynamicBullets: true,
}
const useNavergation = true
const sliderPreview = ref(1)

onMounted(()=>{
  init()
})

function init(){
  handleWindowResize()
  window.addEventListener('resize', ()=>{
    handleWindowResize()
  });
}

function handleWindowResize() {
  const windowClientWidth=document.documentElement.clientWidth
  sliderPreview.value=1
  if(windowClientWidth>=640) sliderPreview.value=2
  if(windowClientWidth>=1280) sliderPreview.value=3
}

function handleClick(id:number){
    navergateToGallery(id)
}
</script>