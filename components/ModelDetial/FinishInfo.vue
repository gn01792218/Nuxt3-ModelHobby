
<template>
    <section class="border-2">
        <div>
            <p>
                完成日期 : {{ finishInfo?.finished_date ? finishInfo?.finished_date : '????/??/??' }}
            </p>
            <div>
                製作過程圖片
                <ul v-for="img in finishInfo?.process_imgs" :key="img">
                    <li>
                        <img :src="getFinishImagePublicUrl(img)" alt="">
                    </li>
                </ul>
            </div>
            <div>
                完成圖片
                <ul v-for="img in finishInfo?.gallery" :key="img">
                    <li>
                        <img :src="getFinishImagePublicUrl(img)" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <button @click="showEditPanelHandel">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <label for="modelSize_height">完成日期</label>
                    <input id="modelSize_height" type="date" v-model="editFinishInfo.finished_date">
                </div>
                <div>
                    <label for="model_process_imgs">製作圖片</label>
                    <input type="file" id="model_process_imgs" @change="handleUploadProcessImgs" multiple>
                    <div v-for="img in previewProcessImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                    </div>
                </div>
                <div>
                    <label for="model_finished_imgs">完成圖片</label>
                    <input type="file" id="model_finished_imgs" @change="handleUploadFinishedImgs" multiple>
                    <div v-for="img in previewGalleryImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                    </div>
                </div>
                <button v-if="!finishInfo" @click="fetchAddModelPurchaseInfo">新增完成資料</button>
                <button v-show="finishInfo" class="mr-5" @click="fetchUpdatePurchaseInfo">確認修改</button>
                <button v-show="finishInfo" @click="resetData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type ModelFinishInfo } from "~/types/model"

const props = defineProps<{
    modelId: number
}>()

const { getModelFinishInfo, addMyModelFinishInfo, updateMyModelFinishInfo } = useMyModelsAPI()
const supabase = useSupabaseClient()
const { getFinishImagePublicUrl, uploadMultipleImagesToSupabaseStorage, removeImageFromSupabaseStorage } = useSupabase()

const showEditPanel = ref(false)
const finishInfo = ref<ModelFinishInfo>()
const editFinishInfo = ref<ModelFinishInfo>({
})

const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])

const process_imgs_file_list = ref<FileList>()
const gallery_imgs_file_list = ref<FileList>()

init()

async function init() {
    const purchaseInfoRes = await getModelFinishInfo(props.modelId)
    if (!purchaseInfoRes) return
    finishInfo.value = purchaseInfoRes
    //修改面板的預覽圖裝載
    finishInfo.value.process_imgs?.forEach(img=>{
        previewProcessImgs.value.push(getFinishImagePublicUrl(img))
    })
    finishInfo.value.gallery?.forEach(img=>{
        previewGalleryImgs.value.push(getFinishImagePublicUrl(img))
    })
    resetData()
}
async function fetchUpdatePurchaseInfo() {
    if(finishInfo.value?.gallery?.length || finishInfo.value?.process_imgs?.length){
        //先刪除supabase storage裡原本的圖片
        if(finishInfo.value?.gallery?.length){
            finishInfo.value?.gallery?.forEach(img=>{
                removeImageFromSupabaseStorage('model_finish_info_images', img)
            })
        }
        if(finishInfo.value?.process_imgs?.length){
            finishInfo.value?.process_imgs?.forEach(img=>{
                removeImageFromSupabaseStorage('model_finish_info_images', img)
            })
        }
    }
    //1.先處理圖片
    await fetchUploadImageToSupabaseStorage()
    await updateMyModelFinishInfo(props.modelId, editFinishInfo.value)
    await fetchModelFinishInfo()
}

async function fetchAddModelPurchaseInfo() {
    //1.先處理圖片
    fetchUploadImageToSupabaseStorage() 
    await addMyModelFinishInfo(props.modelId, editFinishInfo.value)
    await fetchModelFinishInfo()
}
async function fetchModelFinishInfo() {
    finishInfo.value = await getModelFinishInfo(props.modelId)
    showEditPanel.value = false
}
function resetData() {
    editFinishInfo.value.gallery = finishInfo.value?.gallery
    editFinishInfo.value.process_imgs = finishInfo.value?.process_imgs
    editFinishInfo.value.description = finishInfo.value?.description
    editFinishInfo.value.finished_date = finishInfo.value?.finished_date
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
async function handleUploadProcessImgs(event: InputEvent) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (files) {
        previewProcessImgs.value.length = 0
        for (let i = 0; i < files.length; i++) {
            const img = files[i]
            if (img.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    //預覽圖
                    previewProcessImgs.value.push(e.target?.result as string)
                }
                reader.readAsDataURL(img)
                process_imgs_file_list.value = files
            }
        }
    }
}
async function handleUploadFinishedImgs(event: InputEvent) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (files) {
        previewGalleryImgs.value.length = 0
        for (let i = 0; i < files.length; i++) {
            const img = files[i]
            if (img.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    //預覽圖
                    previewGalleryImgs.value.push(e.target?.result as string)
                }
                reader.readAsDataURL(img)
                gallery_imgs_file_list.value = files
            }
        }
    }
}
async function fetchUploadImageToSupabaseStorage() {
    if(process_imgs_file_list.value?.length){
        editFinishInfo.value.process_imgs=await uploadMultipleImagesToSupabaseStorage(process_imgs_file_list.value!, {
          bucketName: 'model_finish_info_images',
          modelId: props.modelId!,
          fileNameTitle: 'model_process_img'
        })
    }else{
        editFinishInfo.value.process_imgs = finishInfo.value?.process_imgs
    }
    if(gallery_imgs_file_list.value?.length){
        editFinishInfo.value.gallery=await uploadMultipleImagesToSupabaseStorage(gallery_imgs_file_list.value!, {
          bucketName: 'model_finish_info_images',
          modelId: props.modelId!,
          fileNameTitle: 'model_gallery_img'
        })
    }else{
        editFinishInfo.value.gallery = finishInfo.value?.gallery
    }
}
</script>