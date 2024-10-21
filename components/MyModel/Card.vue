<template>
  <UCard v-if="!loadSkeleton" class="bg-main-200 h-full">
    <template #header>
      <p>{{ modelData.name_zh }}</p>
      <p>{{ modelData.name_en }}</p>
      <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </template>
    <div>
      <div class="w-full h-200px md:h-[250px] cursor-pointer object-contain flex justify-center" @click="navergateToMyModelDetial(modelData.id)">
        <NuxtImg v-if="modelData.main_img" loading="lazy" :modifiers="{rotate: null}" format="webp" sizes="266px md:300px"  :src="getModelImagePublicUrl(modelData.main_img)"/>
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
import { StorageBucket } from "~/types/supabase"
import useFetchMyModels from "~/composables/api/useMyModelsAPI"
import { useMyModelStore } from "~/store/useMyModelStore"
import useSupabase from "~/composables/useSupabase"

const { loadSkeleton } = useSkeleton()
const { navergateToMyModelDetial } = useMyModel()

const props = defineProps<{
  modelData: Model
}>()
const { getModelImagePublicUrl, removeImageFromSupabaseStorage } = useSupabase()
const { deleteMyModel } = useFetchMyModels()
const { setmyModelList, setLoadingState } = useMyModelStore()
const { myModelList } = storeToRefs(useMyModelStore())
const { user } = useUser()
function fetchDeleteImg() {
  const { modelData } = props
  //刪除mainimg
  if (modelData.main_img) removeImageFromSupabaseStorage(StorageBucket.images, modelData.main_img)
  //刪除完成資訊的兩種img
  modelData.finish_infos.forEach(info => {
    if (info?.process_imgs?.length) {
      info.process_imgs.forEach(img => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img))
    }
    if (info?.gallery?.length) {
      info.gallery.forEach(img => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img))
    }
  })
}
async function fetchDeleteMyModel() {
  setLoadingState(true)
  await deleteMyModel(props.modelData.id!)
  fetchDeleteImg()
  setmyModelList(myModelList.value.filter(model => model.id !== props.modelData.id))
  setLoadingState(false)
}
</script>