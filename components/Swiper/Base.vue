<template>
  <Swiper
    class="relative banner-clip-path w-full h-[500px]"
    :modules="[ SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    :navigation="useNavergation"
    :pagination="usePagination"
    :slides-per-view="sliderPreview"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide class="relative cursor-pointer" v-for="slide in sliderItems" :key="slide.id" @click="handleClick(slide.id)">
      <img class="w-full h-full" :src="getFinishImagePublicUrl(slide.finish_infos[0].gallery[0])" :alt="slide.name_zh">
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