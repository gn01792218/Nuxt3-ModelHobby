<template>
  <UCard v-if="!loadSkeleton" class="bg-red-100">
    <template #header>
      <p>{{ modelData.name_zh }}</p>
      <p>{{ modelData.name_en }}</p>
      <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </template>
    <div>
      <div class="w-full md:h-[250px] cursor-pointer" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)">
        <img class="w-full md:h-full" v-if="modelData.main_img" :src="getModelImagePublicUrl(modelData.main_img)" :alt="modelData.name_zh">
        <img v-else src="" alt="沒有上傳圖片">
      </div>
    </div>
    <template #footer>
      <div>
          <UButton class="mr-5" icon="i-heroicons-pencil-square" size="sm" color="green" variant="soft"
            :trailing="false" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)"/>
          <UButton
                v-if="user?.id === 'ba5171d3-299b-4f64-983b-7faf1621944d' || 
                user?.id === 'a161fb29-6948-4f8c-94c9-1ac707f5dac1' || 
                user?.id === '66a7e0cc-99e5-4cbf-8bc7-72021b26b362'"
            icon="i-heroicons-trash-solid"
            size="sm"
            color="red"
            variant="solid"
            :trailing="false"
            @click="fetchDeleteMyModel"
          />
      </div>
    </template>
  </UCard>
  <MyModelCardSkeleton v-else/>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"
import { StorageBucket } from "~/types/supabase"
import useFetchMyModels from "~/composables/api/useMyModelsAPI"
import { useMyModelStore } from "~/store/useMyModelStore"
import useSupabase from "~/composables/useSupabase"

const { loadSkeleton } = useSkeleton()

const props = defineProps<{
  modelData: Model
}>()
const { getModelImagePublicUrl, removeImageFromSupabaseStorage } = useSupabase()
const { deleteMyModel } = useFetchMyModels()
const { setmyModelList, setLoadingState } = useMyModelStore()
const { myModelList } = storeToRefs(useMyModelStore())
const user = useSupabaseUser()
function fetchDeleteImg() {
  const { modelData } = props
  //刪除mainimg
  if (modelData.main_img) removeImageFromSupabaseStorage(StorageBucket.images, modelData.main_img)
  //刪除完成資訊的兩種img
  if (modelData.finish_info?.process_imgs?.length) {
    modelData.finish_info.process_imgs.forEach(img => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img))
  }
  if (modelData.finish_info?.gallery?.length) {
    modelData.finish_info.gallery.forEach(img => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img))
  }
}
async function fetchDeleteMyModel() {
  setLoadingState(true)
  await deleteMyModel(props.modelData.id!)
  fetchDeleteImg()
  setmyModelList(myModelList.value.filter(model => model.id !== props.modelData.id))
  setLoadingState(false)
}
</script>