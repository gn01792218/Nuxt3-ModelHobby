<template>
  <Swiper
    class="relative"
    :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    :navigation="useNavergation"
    :pagination="usePagination"
    :slides-per-view="sliderPreview"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide class="relative" v-for="slide in sliderItems" :key="slide.id">
      <img class="w-full h-full" :src="getFinishImagePublicUrl(slide.finish_infos[0].gallery[0])" :alt="slide.name_zh">
      <div class="w-[300px] cursor-pointer flex justify-center absolute top-1/2 translate-y-[-50%] right-1/2 translate-x-[50%] opacity-70 bg-primary-900 py-2 px-5 rounded-md hover:opacity-90" @click="handleClick(slide.id)">
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
const { navergateToMyModelDetial } = useMyModel()

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
    navergateToMyModelDetial(id)
}


</script>