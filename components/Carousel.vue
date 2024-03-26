<template>
    <UCarousel ref="carouselRef" v-if="modelList" v-slot="{ item }" :items="modelList" 
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3', 
    indicators: {
        wrapper: 'relative bottom-10 mt-[50px]'
      } 
      }" 
        class="banner-clip-path rounded-lg overflow-hidden min-h-[300px]" :arrows="usePreNextButton" :indicators="useInddicators">
        <img :src="getModelImagePublicUrl(item.main_img)" class="w-full" draggable="false" @click="handleClick(item.id)">
    </UCarousel>
</template>
<script lang="ts" setup>
import { type Model } from "~/types/model"

defineProps<{
    modelList:Model[],
}>()

onMounted(()=>{
    autoPlay()
})

const { getModelImagePublicUrl } = useSupabase()
const { navergateToMyModelDetial } = useMyModel()
const carouselRef = ref()
const useInddicators = true
const usePreNextButton = true

function handleClick(id:number){
    navergateToMyModelDetial(id)
}
function autoPlay(){
    setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
}

</script>