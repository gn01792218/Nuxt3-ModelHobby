<template>
    <UModal v-model="isOpen">
        <div class="p-4">
            <UFormGroup label="標題">
                <input class="my-input" placeholder="標題" v-model="createFinishInfo.title" />
            </UFormGroup>
            <UFormGroup label="描述">
                <input class="my-input" placeholder="描述" v-model="createFinishInfo.description" />
            </UFormGroup>
            <UFormGroup label="完成日期">
                <VDatePicker v-model="createFinishInfo.finished_date" />
                <TimeFormator v-if="createFinishInfo.finished_date" :date="createFinishInfo.finished_date" />
            </UFormGroup>
            <div>
                <label for="model_process_imgs">製作圖片</label>
                <input type="file" id="model_process_imgs" @change="(e) =>handleLoadProcessImgsFileList(e, previewProcessImgs)" multiple>
                <div v-for="img in previewProcessImgs" :key="img">
                    <img :src="img" alt="預覽圖">
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false" @click="deleteProcessUploadImg(index)"/>
                </div>
            </div>
            <div>
                <label for="model_finished_imgs">完成圖片</label>
                <input type="file" id="model_finished_imgs"  @change="(e)=>handleLoadGallaryImgsFileList(e, previewGalleryImgs)" multiple>
                <div v-for="img in previewGalleryImgs" :key="img">
                    <img :src="img" alt="預覽圖">
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false" @click="deleteGalleryUploadImg(index)"/>
                </div>
            </div>
            <div class="ml-auto flex">
                <UButton class="block mr-5" label="確認修改" @click="fetchCreateFinishInfo" color="primary" />
                <UButton class="block" label="取消" @click="$emit('close')" color="secondary"
                    variant="outline" />
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { type CreateFinishInfoRequest } from "~/types/finishInfo"
import { useMyModelStore } from '~/store/useMyModelStore';
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { StorageBucket } from "~/types/supabase";

const emit = defineEmits(['success','close'])
const props = defineProps<{
    isOpen: boolean,
    modelId:number
}>()

const { setLoadingState } = useMyModelStore()
const { handleUploadMutipleImgs } = useUploadImage()
const { addMyModelFinishInfo } = useMyModelsAPI()
const { uploadMultipleImagesToSupabaseStorage, removeImageFromSupabaseStorage } = useSupabase()

const isOpen = computed(() => props.isOpen)
const createFinishInfo = ref<CreateFinishInfoRequest>({
    process_imgs:[],
    gallery:[]
})

const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])

const process_imgs_file_list = ref<File[]>([])
const gallery_imgs_file_list = ref<File[]>([])

const deleteProcessImgs = ref<string[]>([])
const deleteGalleryImgs = ref<string[]>([])

async function fetchCreateFinishInfo() {
  setLoadingState(true);
  await fetchUploadImageToSupabaseStorage();
  emit('success', await addMyModelFinishInfo(props.modelId, createFinishInfo.value))
}
async function fetchUploadImageToSupabaseStorage() {
    //先處理要被刪除的圖片
    if(deleteProcessImgs.value.length) deleteProcessImgs.value.forEach(url=>removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images,url))
    if(deleteGalleryImgs.value.length) deleteGalleryImgs.value.forEach(url=>removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images,url))
    //再看看有沒有要新上傳  的圖片
    console.log('有沒有圖片', process_imgs_file_list.value.length)
    if (process_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToSupabaseStorage(process_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_process_img'
        })
        newImgUrls.forEach(imgUrl=>createFinishInfo.value.process_imgs?.push(imgUrl))
        console.log('裝填完成', newImgUrls, createFinishInfo.value.process_imgs)
        process_imgs_file_list.value.length = 0 //釋放圖片資源
    } else {
        createFinishInfo.value.process_imgs = []
    }
    if (gallery_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToSupabaseStorage(gallery_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_gallery_img'
        })
        newImgUrls.forEach(imgUrl=>createFinishInfo.value.gallery?.push(imgUrl))
        gallery_imgs_file_list.value.length = 0 //釋放圖片資源
    } else {
        createFinishInfo.value.gallery = []
    }
}

function handleLoadProcessImgsFileList(e:Event, previewImgs:string[]){
    const newUploadFiles = Array.from(handleUploadMutipleImgs(e, ref(previewImgs))!)
    newUploadFiles.forEach(file=>process_imgs_file_list.value.push(file))
    console.log('取得上傳圖片', process_imgs_file_list.value)
}
function handleLoadGallaryImgsFileList(e:Event, previewImgs:string[]){
    const newUploadFiles = Array.from(handleUploadMutipleImgs(e, ref(previewImgs))!)
    newUploadFiles.forEach(file=>gallery_imgs_file_list.value.push(file))
}
function deleteProcessUploadImg(index:number){
    process_imgs_file_list.value.splice(index,1) //splice會直接改變原本數組
    previewProcessImgs.value.splice(index,1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if(!createFinishInfo.value?.process_imgs?.length) return //原本沒圖片直接離開
    if(!createFinishInfo.value.process_imgs[index]) return  //原本的沒有這張圖片，也離開
    deleteProcessImgs.value?.push(createFinishInfo.value.process_imgs[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    createFinishInfo.value.process_imgs.splice(index,1) //將圖片剃除於原本的陣列
}
function deleteGalleryUploadImg(index:number){
   gallery_imgs_file_list.value.splice(index,1) //splice會直接改變原本數組
   previewGalleryImgs.value.splice(index,1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if(!createFinishInfo.value?.gallery?.length) return //原本沒圖片直接離開
    if(!createFinishInfo.value.gallery[index]) return  //原本的沒有這張圖片，也離開
    deleteGalleryImgs.value?.push(createFinishInfo.value.gallery[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    createFinishInfo.value.gallery.splice(index,1) //將圖片剃除於原本的陣列
}
</script>