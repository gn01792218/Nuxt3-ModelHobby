<template>
    <section>
        <section>
            <NuxtImg :modifiers="{rotate: null}" format="webp" width="300" :src="getModelMainImagePublicUrl(currentModel?.main_img || '')"/>
            <p>品牌 : {{ currentModel?.brand }} ({{ currentModel?.article_number }})</p>
            <p class="text-3xl font-extrabold">{{ currentModel?.name_zh }}</p>
            <p class="text-2xl">{{ currentModel?.name_en }}</p>
        </section>
        <div>
            <button @click="showEditPanelHandel()">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <select name="" id="" v-model="editModel.status">
                        <option v-for="status, index in Object.keys(ModelStatus).filter(key => isNaN(Number(key)))" :key="status" :value="ModelStatus[status]">{{ ModelStatus[index] }}</option>
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
                    <input type="file" id="model_main_img" @change="async (e)=> main_img_file =await handleUploadMutipleImgs(e, ref(previewImg))">
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
import { StorageBucket } from "~/types/storage";
const props = defineProps<{
    currentModel: Model
}>()

const { handleUploadMutipleImgs } = useUploadImage()
const { getModelMainImagePublicUrl } = useMyModelImg()
const { uploadMultipleImagesToS3, removeImageFromS3Storage } = useS3()
const { setLoadingState } = useMyModelStore()
const { updateMyModelData } = useMyModelStore()
const { updateMyModel } = useMyModelsAPI()

const showEditPanel = ref(false)

const editModel = ref<Model>({
    ...props.currentModel
})
const previewImg = ref<string[]>([])
const main_img_file = ref<FileList | null>(null)

async function fetchUpdateModel() {
    setLoadingState(true)
    //上傳圖片到supabase storage中, 並獲取要存於DB的路徑string
    if(main_img_file.value){ //假如有上傳圖片的話
        //假如原本有圖片，先刪除
        if (props.currentModel?.main_img) removeImageFromS3Storage({bucketName:StorageBucket.images, url:props.currentModel?.main_img})

        const imgs = await uploadMultipleImagesToS3(main_img_file.value, {
            bucketName: StorageBucket.images,
            modelId: props.currentModel.id!,
            fileNameTitle: 'model_main_img'
        })
        editModel.value.main_img = imgs[0]

        main_img_file.value = null //釋放圖片資源，避免重複上傳
    }
    const updateModel = await updateMyModel(props.currentModel.id, editModel.value)
    updateMyModelData(updateModel)
    showEditPanel.value = false
    setLoadingState(false)
}
function resetData() {
    editModel.value = props.currentModel
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
    editModel.value = props.currentModel
    previewImg.value = [getModelMainImagePublicUrl(props.currentModel?.main_img!)]
}
</script>