
<template>
    <section>
        <section>
            <NuxtImg :modifiers="{rotate: null}" format="webp" width="300" :src="getModelImagePublicUrl(currentModel.main_img || '')"/>
            <p>品牌 : {{ currentModel.brand }} ({{ currentModel.article_number }})</p>
            <p class="text-3xl font-extrabold">{{ currentModel?.name_zh }}</p>
            <p class="text-2xl">{{ currentModel?.name_en }}</p>
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
                    <label for="model_name_en">品牌</label>
                    <select name="" id="" v-model="editModel.brand">
                        <option v-for="brand in ModelBrand" :key="brand" :value="brand">{{ brand }}</option>
                    </select>
                </div>
                <div>
                     <label for="model_type">類型</label>
                     <select name="" id="" v-model="editModel.type">
                        <option v-for="modelType in ModelType" :key="modelType" :value="modelType">{{ modelType }}</option>
                     </select>
                  </div>
                <div>
                    <label for="model_name_en">產品編號</label>
                    <input id="model_name_en" type="text" v-model="editModel.article_number">
                </div>
                <div>
                    <label for="model_main_img">封面圖片</label>
                    <input type="file" id="model_main_img" @change="(e)=> main_img_file = handleUploadMutipleImgs(e, ref(previewImg))">
                    <NuxtImg v-show="previewImg[0]" format="webp" width="200" :src="previewImg[0]" alt="預覽圖"/>
                </div>
                <button v-show="currentModel" class="mr-5" @click="fetchUpdateModel">確認修改</button>
                <button v-show="currentModel" @click="resetData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type Model, ModelStatus, ModelBrand, ModelType } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
import { StorageBucket } from "~/types/supabase";
const props = defineProps<{
    modelId: number
}>()
const { user } = useUser()
const { handleUploadMutipleImgs } = useUploadImage()
const { getModelImagePublicUrl, uploadMultipleImagesToSupabaseStorage, removeImageFromSupabaseStorage } = useSupabase()
const { myModelList } = storeToRefs(useMyModelStore())
const { setLoadingState } = useMyModelStore()
const { updateMyModelData } = useMyModelStore()
const { updateMyModel } = useMyModelsAPI()
const currentModel = computed<Model>(() => {
    return myModelList.value.find(model => model.id === props.modelId) as Model
})
const showEditPanel = ref(false)

const editModel = ref<Model>({
    ...currentModel.value,
})
const previewImg = ref<string[]>([getModelImagePublicUrl(currentModel.value.main_img!)])
const main_img_file = ref<FileList | null>(null)

async function fetchUpdateModel() {
    setLoadingState(true)
    //上傳圖片到supabase storage中, 並獲取要存於DB的路徑string
    if(main_img_file.value){ //假如有上傳圖片的話
        //假如原本有圖片，先刪除
        if (currentModel.value?.main_img) removeImageFromSupabaseStorage(StorageBucket.images, currentModel.value.main_img)

        const imgs = await uploadMultipleImagesToSupabaseStorage(main_img_file.value, {
            bucketName: StorageBucket.images,
            modelId: props.modelId!,
            fileNameTitle: 'model_main_img'
        })
        editModel.value.main_img = imgs[0]

        main_img_file.value = null //釋放圖片資源，避免重複上傳
    }
    const updateModel = await updateMyModel(props.modelId, editModel.value)
    updateMyModelData(updateModel)
    showEditPanel.value = false
    setLoadingState(false)
}
function resetData() {
    editModel.value = currentModel.value
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>