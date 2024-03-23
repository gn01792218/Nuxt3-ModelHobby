<template>
    <UCarousel ref="carouselRef" v-if="modelList" v-slot="{ item }" :items="modelList" :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }" indicators
        class="banner-clip-path rounded-lg overflow-hidden bg-white min-h-[300px]" arrows>
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
const carouselRef = ref()

function handleClick(id:string){
    navigateTo(`/MyModel/ModelDetail-${id}`)
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