
<template>
    <section>
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
                    <input type="file" id="model_process_imgs" @change="(e) =>handleuploadProcessImgs(e, previewProcessImgs)" multiple>
                    <div v-for="img,index in previewProcessImgs" :key="img" class="flex">
                        <img :src="img" alt="預覽圖">
                        <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false" @click="deleteProcessUploadImg(index)"/>
                    </div>
                </div>
                <div>
                    <label for="model_finished_imgs">完成圖片</label>
                    <input type="file" id="model_finished_imgs" @change="(e)=>handleuploadGallaryImgs(e, previewGalleryImgs)" multiple>
                    <div v-for="img,index in previewGalleryImgs" :key="img" class="flex">
                        <img :src="img" alt="預覽圖">
                        <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false" @click="deleteGalleryUploadImg(index)"/>
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
import { type Model, type ModelFinishInfo } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
import { StorageBucket } from "~/types/supabase";

const props = defineProps<{
    modelId: number,
    currentModel:Model
}>()
const { setLoadingState } = useMyModelStore()
const { addMyModelFinishInfo, updateMyModelFinishInfo } = useMyModelsAPI()
const { getFinishImagePublicUrl, uploadMultipleImagesToSupabaseStorage, removeImageFromSupabaseStorage } = useSupabase()
const { handleUploadMutipleImgs } = useUploadImage()

const showEditPanel = ref(false)
const finishInfo = ref<ModelFinishInfo>()
const editFinishInfo = ref<ModelFinishInfo>({
})

const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])

const process_imgs_file_list = ref<File[]>([])
const gallery_imgs_file_list = ref<File[]>([])

const deleteProcessImgs = ref<string[]>([])
const deleteGalleryImgs = ref<string[]>([])

init()

async function init() {
    finishInfo.value = props.currentModel?.finish_info!
    //修改面板的預覽圖裝載
    finishInfo.value.process_imgs?.forEach(img => {
        previewProcessImgs.value.push(getFinishImagePublicUrl(img))
    })
    finishInfo.value.gallery?.forEach(img => {
        previewGalleryImgs.value.push(getFinishImagePublicUrl(img))
    })
    resetData()
}
async function fetchUpdatePurchaseInfo() {
    setLoadingState(true)
    await fetchUploadImageToSupabaseStorage()
    finishInfo.value = await updateMyModelFinishInfo(props.modelId, editFinishInfo.value)
    showEditPanel.value = false
    setLoadingState(false)
}
async function fetchAddModelPurchaseInfo() {
    setLoadingState(true)
    //1.先處理圖片
    await fetchUploadImageToSupabaseStorage()
    finishInfo.value = await addMyModelFinishInfo(props.modelId, editFinishInfo.value)
    showEditPanel.value = false
    setLoadingState(false)
}

function resetData() {
    editFinishInfo.value = finishInfo.value!
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
async function fetchUploadImageToSupabaseStorage() {
    //先處理要被刪除的圖片
    if(deleteProcessImgs.value.length) deleteProcessImgs.value.forEach(url=>removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images,url))
    if(deleteGalleryImgs.value.length) deleteGalleryImgs.value.forEach(url=>removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images,url))
    //再看看有沒有要新上傳  的圖片
    if (process_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToSupabaseStorage(process_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_process_img'
        })
        newImgUrls.forEach(imgUrl=>editFinishInfo.value.process_imgs?.push(imgUrl))
        process_imgs_file_list.value.length = 0 //釋放圖片資源
    } else {
        editFinishInfo.value.process_imgs = finishInfo.value?.process_imgs
    }
    if (gallery_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToSupabaseStorage(gallery_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_gallery_img'
        })
        newImgUrls.forEach(imgUrl=>editFinishInfo.value.gallery?.push(imgUrl))
        gallery_imgs_file_list.value.length = 0 //釋放圖片資源
    } else {
        editFinishInfo.value.gallery = finishInfo.value?.gallery
    }
}
function deleteProcessUploadImg(index:number){
    process_imgs_file_list.value.splice(index,1) //splice會直接改變原本數組
    previewProcessImgs.value.splice(index,1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if(!finishInfo.value?.process_imgs?.length) return //原本沒圖片直接離開
    if(!finishInfo.value.process_imgs[index]) return  //原本的沒有這張圖片，也離開
    deleteProcessImgs.value?.push(finishInfo.value.process_imgs[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    finishInfo.value.process_imgs.splice(index,1) //將圖片剃除於原本的陣列
}
function deleteGalleryUploadImg(index:number){
   gallery_imgs_file_list.value.splice(index,1) //splice會直接改變原本數組
   previewGalleryImgs.value.splice(index,1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if(!finishInfo.value?.gallery?.length) return //原本沒圖片直接離開
    if(!finishInfo.value.gallery[index]) return  //原本的沒有這張圖片，也離開
    deleteGalleryImgs.value?.push(finishInfo.value.gallery[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    finishInfo.value.gallery.splice(index,1) //將圖片剃除於原本的陣列
}
function handleuploadProcessImgs(e:Event, previewImgs:string[]){
    const newUploadFiles = Array.from(handleUploadMutipleImgs(e, ref(previewImgs))!)
    newUploadFiles.forEach(file=>process_imgs_file_list.value.push(file))
}
function handleuploadGallaryImgs(e:Event, previewImgs:string[]){
    const newUploadFiles = Array.from(handleUploadMutipleImgs(e, ref(previewImgs))!)
    newUploadFiles.forEach(file=>gallery_imgs_file_list.value.push(file))
}
</script>