<template>
  <Swiper
    class="swiper-grid max-w-[1280px]"
    :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperGrid]"
    :navigation="useNavergation"
    :pagination="usePagination"
    :slides-per-view="sliderPreview"
    :grid="{
      rows:gridRow
    }"
    :space-between="spaceBetween"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide class="h-full relative cursor-pointer" v-for="slide in sliderItems" :key="slide.id" @click="handleClick(slide.id)">
      <NuxtImg class="w-full" format="webp" width="300" :src="getFinishImagePublicUrl(slide.finish_infos[0].gallery[0])" :alt="slide.name_zh"/>
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
  clickable: true
}
const useNavergation = true
const sliderPreview = ref(3)
const gridRow = ref(2)
const spaceBetween = ref(10)

onMounted(()=>{
  // init()
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