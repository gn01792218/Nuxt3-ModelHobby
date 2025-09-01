<template>
  <UCard v-if="!loadSkeleton" class="bg-main-200 h-full">
    <template #header>
      <p>{{ modelData.name_zh }}</p>
      <p>{{ modelData.name_en }}</p>
      <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </template>
    <div>
      <div class="w-full h-200px md:h-[250px] cursor-pointer object-contain flex justify-center" @click="navergateToMyModelDetial(modelData.id)">
        <NuxtImg v-if="modelData.main_img" loading="lazy" :modifiers="{rotate: null}" format="webp" sizes="266px md:300px"  :src="getModelMainImagePublicUrl(modelData.main_img)"/>
        <NuxtImg v-else loading="lazy" :modifiers="{rotate: null}" src="/imagePlaceHolder.jpg" sizes="266px md:300px" format="webp" alt="沒有上傳圖片"/>
      </div>
      <p class="text-sm text-gray-500 text-right">類型 : {{ modelData.type }}</p>
    </div>
    <template #footer>
      <div>
        <UButton class="mr-5" icon="i-heroicons-pencil-square" size="sm" color="green" variant="soft" :trailing="false"
          @click="navergateToMyModelDetial(modelData.id)" />
        <UButton 
        icon="i-heroicons-trash-solid" size="sm"
          color="red" variant="solid" :trailing="false" @click="fetchDeleteMyModel" />
      </div>
    </template>
  </UCard>
  <MyModelCardSkeleton v-else />
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"
import { StorageBucket } from "~/types/storage"
import useFetchMyModels from "~/composables/api/useMyModelsAPI"

const { loadSkeleton } = useSkeleton()
const { navergateToMyModelDetial, setLoadingState, setAllModelList, allModelList } = useMyModel()

const props = defineProps<{
  modelData: Model
}>()
const { getModelMainImagePublicUrl } = useMyModelImg()
const { removeImageFromS3Storage, processRemoveFinishInfoImgs } = useS3()
const { deleteMyModel } = useFetchMyModels()

function fetchDeleteImg() {
  const { modelData } = props
  //刪除mainimg
  if (modelData.main_img) removeImageFromS3Storage({bucketName: StorageBucket.images, url: modelData.main_img})
  //刪除完成資訊的兩種img
  modelData.finish_infos.forEach(info => {
    processRemoveFinishInfoImgs(info.process_imgs || [], info.gallery || [])
  })
}
async function fetchDeleteMyModel() {
  setLoadingState(true)
  fetchDeleteImg()
  await deleteMyModel(props.modelData.id!)
  setAllModelList(allModelList.value.filter(model => model.id !== props.modelData.id))
  setLoadingState(false)
}
</script>