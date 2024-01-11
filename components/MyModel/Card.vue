<template>
  <div class="flex justify-center items-center">
    <div class="cursor-pointer" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)">
        <img v-if="modelData.main_img" :src="`${supabaseBaseUrl}/storage/v1/object/public/images/${modelData.main_img}`" :alt="modelData.name_zh">
        <img v-else src="" alt="沒有上傳圖片">
    </div>
    <div>
        <p>{{ modelData.name_zh }}</p>
        <p>{{ modelData.name_en }}</p>
        <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </div>
    <div>
      <button class="border-2 p-5" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)">查看</button>
      <button v-if="user?.id ==='ba5171d3-299b-4f64-983b-7faf1621944d' || user?.id === 'a161fb29-6948-4f8c-94c9-1ac707f5dac1'" class="border-2 p-5" @click="fetchDeleteMyModel"> - 刪除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"
import useFetchMyModels from "~/composables/api/useMyModelsAPI"
import { useMyModelStore } from "~/store/useMyModelStore"
import useSupabase from "~/composables/useSupabase"

const props = defineProps<{
    modelData:Model
}>()
const { supabaseBaseUrl } = useSupabase()
const { deleteMyModel } = useFetchMyModels()
const { setmyModelList } = useMyModelStore()
const { myModelList } = storeToRefs(useMyModelStore())
const user = useSupabaseUser()
const supabase = useSupabaseClient()

async function fetchDeleteMyModel(){
  await deleteMyModel(props.modelData.id!)
  setmyModelList(myModelList.value.filter(model=>model.id !== props.modelData.id))
}
</script>