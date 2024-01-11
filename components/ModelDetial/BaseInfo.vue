
<template>
    <section class="border-2">
        <section>
            <img :src="`${supabaseBaseUrl}/storage/v1/object/public/images/${currentModel.main_img}`" alt="">
            <p>{{ modelId }}</p>
            <p>{{ currentModel?.name_zh }}</p>
            <p>{{ currentModel?.name_en }}</p>
        </section>
        <div>
            <button @click="showEditPanelHandel">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <select name="" id="" v-model="editModel.status">
                        <option :value="ModelStatus.未入庫">未入庫</option>
                        <option :value="ModelStatus.未組裝">未組裝</option>
                        <option :value="ModelStatus.已組裝">已組裝</option>
                    </select>
                </div>
                <div>
                    <label for="model_name_zh">中文名稱</label>
                    <input id="model_name_zh" type="text" v-model="editModel.name_zh">
                </div>
                <div>
                    <label for="model_name_en">英文名稱</label>
                    <input id="model_name_en" type="text" v-model="editModel.name_en">
                </div>
                <div>
                    <label for="model_main_img">封面圖片</label>
                    <input type="file" id="model_main_img" @change="handleUploadImg">
                    <img v-show="previewImg" :src="previewImg" alt="預覽圖">
                </div>
                <button v-show="currentModel" class="mr-5" @click="fetchUpdateModel">確認修改</button>
                <button v-show="currentModel" @click="resetData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type Model, ModelStatus } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
const props = defineProps<{
    modelId: number
}>()

const supabase = useSupabaseClient()
const { supabaseBaseUrl } = useSupabase()
const { myModelList } = storeToRefs(useMyModelStore())
const { updateMyModelData } = useMyModelStore()
const { updateMyModel, getMyModel } = useMyModelsAPI()
const currentModel = computed<Model>(() => {
    return myModelList.value.find(model => model.id === props.modelId) as Model
})
const showEditPanel = ref(false)

const editModel = ref<Model>({
    name_zh: currentModel.value.name_zh,
    name_en: currentModel.value.name_en,
    status: currentModel.value.status,
    main_img: currentModel.value.main_img
})
const previewImg = ref(`${supabaseBaseUrl}/storage/v1/object/public/images/${currentModel.value.main_img}`)
const main_img_file = ref<File>()

async function uploadSpabaseStorage():Promise<string>{
   if(!main_img_file.value) return ''

   const fileName = `model_main_img_${crypto.randomUUID()}`
   const { data, error } = await supabase.storage.from("images").upload(`public/${fileName}`, main_img_file.value)
   if(error) throw createError({
      ...error,
      message:'無法上傳圖片',
   })
   return data.path
}
async function handleUploadImg(event:InputEvent){
    const input = event.target as HTMLInputElement
    if(input.files){
        const img = input.files[0]
        const reader = new FileReader()
        reader.onload = (e)=>{
            //預覽圖
            previewImg.value = e.target?.result as string
        }
        reader.readAsDataURL(img)
      main_img_file.value = img
    }
  }

async function fetchUpdateModel() {
    if(currentModel.value?.main_img){
        //先刪除supabase storage裡原本的圖片
        await supabase.storage.from('images').remove([currentModel.value.main_img])
    }
    //上傳圖片到supabase storage中, 並獲取要存於DB的路徑string
    editModel.value.main_img = await uploadSpabaseStorage()
    await updateMyModel(props.modelId, editModel.value)
    await fetchMyModel()
}

async function fetchMyModel() {
    const model = await getMyModel(props.modelId)
    updateMyModelData(model)
    showEditPanel.value = false
}
function resetData() {
    editModel.value.name_en = currentModel.value!.name_en
    editModel.value.name_zh = currentModel.value!.name_zh
    editModel.value.status = currentModel.value!.status
    editModel.value.main_img = currentModel.value!.main_img
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>