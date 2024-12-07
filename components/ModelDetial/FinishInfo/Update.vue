<template>
    <UModal v-model="isOpen">
        <h1>更新面板</h1>
        <div class="p-4" v-if="finishInfo">
            <UFormGroup label="標題">
                <input class="my-input" placeholder="標題" v-model="finishInfo.title" />
            </UFormGroup>
            <UFormGroup label="描述">
                <input class="my-input" placeholder="描述" v-model="finishInfo.description" />
            </UFormGroup>
            <UFormGroup label="完成日期">
                <VDatePicker v-model="finishInfo.finished_date" />
                <TimeFormator v-if="finishInfo.finished_date" :date="finishInfo.finished_date" />
            </UFormGroup>
            <div>
                <label for="model_process_imgs">製作圖片</label>
                <input type="file" id="model_process_imgs"
                    @change="async (e) =>await handleLoadProcessImgsFileList(e, previewProcessImgs)" multiple>
                <div v-for="img, index in previewProcessImgs" :key="img">
                    <NuxtImg :modifiers="{rotate: null}" format="webp" width="200" :src="img" alt="預覽圖"/>
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false"
                        @click="deleteProcessUploadImg(index)" />
                </div>
            </div>
            <div>
                <label for="model_finished_imgs">完成圖片</label>
                <input type="file" id="model_finished_imgs"
                    @change="async (e) =>await handleLoadGallaryImgsFileList(e, previewGalleryImgs)" multiple>
                <div v-for="img, index in previewGalleryImgs" :key="img">
                    <NuxtImg :modifiers="{rotate: null}" format="webp" width="200" :src="img" alt="預覽圖"/>
                    
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false"
                        @click="deleteGalleryUploadImg(index)" />
                </div>
            </div>
            <div class="ml-auto flex">
                <UButton class="block mr-5" label="確認修改" @click="fetchUpdateFinishInfo" color="primary" />
                <UButton class="block" label="取消" @click="$emit('close')" color="secondary" variant="outline" />
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { StorageBucket } from "~/types/supabase";
import type { UpdateFinishInfoRequest, ModelFinishInfo } from '~/types/finishInfo';

const emit = defineEmits(['success', 'close'])
const props = defineProps<{
    isOpen: boolean,
    modelId: number,
    finishInfo: ModelFinishInfo | null,
}>()

const { setLoadingState } = useMyModelStore()
const { 
    finishInfo, 
    previewProcessImgs,
    previewGalleryImgs,
    process_imgs_file_list, 
    gallery_imgs_file_list,
    deleteProcessImgs,
    deleteGalleryImgs,
    handleLoadProcessImgsFileList, 
    handleLoadGallaryImgsFileList,
    deleteProcessUploadImg,
    deleteGalleryUploadImg,
 } = useMyModelImg()
const { handleUploadMutipleImgs } = useUploadImage()
const { updateMyModelFinishInfo } = useMyModelsAPI()
const { getFinishImagePublicUrl, uploadMultipleImagesToSupabaseStorage, removeImageFromSupabaseStorage } = useSupabase()

const isOpen = computed(() => props.isOpen)
onMounted(()=>{
    finishInfo.value = props.finishInfo!
})

watch(() => props.finishInfo, () => {  //更新previewImg
    if(!props.finishInfo) return alert('注意:沒有更新資料')
    if(props.finishInfo.process_imgs?.length) previewProcessImgs.value = props.finishInfo.process_imgs.map(img=> getFinishImagePublicUrl(img))
    if(props.finishInfo.gallery?.length) previewGalleryImgs.value = props.finishInfo.gallery.map(img=>getFinishImagePublicUrl(img))
},{immediate:true})

async function fetchUpdateFinishInfo() {
    if(!props.finishInfo) return alert('注意:沒有更新資料')
    setLoadingState(true);
    await fetchUploadImageToSupabaseStorage();
    await updateMyModelFinishInfo(props.finishInfo.id, props.finishInfo)
    emit('success')
}

async function fetchUploadImageToSupabaseStorage() {
    if(!props.finishInfo) return 
    //先處理要被刪除的圖片
    if (deleteProcessImgs.value.length) deleteProcessImgs.value.forEach(url => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, url))
    if (deleteGalleryImgs.value.length) deleteGalleryImgs.value.forEach(url => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, url))
    //再看看有沒有要新上傳  的圖片
    const promises:Promise<string[]>[] = []
    if (process_imgs_file_list.value?.length) {
        promises.push(uploadMultipleImagesToSupabaseStorage(process_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_process_img'
        }))
    }else promises.push(new Promise((res)=>res([])))

    if (gallery_imgs_file_list.value?.length) {
        promises.push(uploadMultipleImagesToSupabaseStorage(gallery_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_gallery_img'
        }))
    }else promises.push(new Promise((res)=>res([])))

    const imageResArray = await Promise.all(promises)
    imageResArray[0].forEach(imgUrl => props.finishInfo?.process_imgs?.push(imgUrl))
    imageResArray[1].forEach(imgUrl => props.finishInfo?.gallery?.push(imgUrl))
    if(imageResArray[0].length) process_imgs_file_list.value.length = 0 //釋放圖片資源
    if(imageResArray[1].length) gallery_imgs_file_list.value.length = 0 //釋放圖片資源
}
</script>